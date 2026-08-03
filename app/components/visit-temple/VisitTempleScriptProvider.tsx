"use client";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useAppState } from "../../components/AppContext";
import Introduction from "../../components/visit-temple/Introduction";
import VisitTempleSection from "../../components/visit-temple/VisitTempleSection";
import BigTitleSplitLines from "../../ui/BigTitleSplitLines";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type VisitTempleAcf = {
  introduction?: {
    title?: string;
    image?: any;
    background: any;
  };
  video_section?: {
    video?: string;
    poster?: any;
  };
  temple_tabs?: [
    {
      tab_title?: string;
      title?: string;
      subtitle?: string;
      text?: string;
      gallery_images?: any[];
      gallery?: any[];
      videos?: any[];
    },
  ];
};

type GalleryOrientation = "portrait" | "landscape" | "square" | "unknown";

type GalleryAnalysisItem = {
  tabIndex: number;
  itemIndex: number;
  src: string;
  width: number | null;
  height: number | null;
  orientation: GalleryOrientation;
};

type GalleryAnalysisByTab = {
  tabIndex: number;
  images: GalleryAnalysisItem[];
};

function detectOrientation(
  width: number | null,
  height: number | null,
): GalleryOrientation {
  if (!width || !height || width <= 0 || height <= 0) {
    return "unknown";
  }

  if (width === height) {
    return "square";
  }

  return width > height ? "landscape" : "portrait";
}

function readGalleryDimensions(item: any): {
  width: number | null;
  height: number | null;
} {
  const widthCandidates = [
    item?.sizes?.large?.width,
    item?.sizes?.medium?.width,
    item?.width,
    item?.media_details?.sizes?.large?.width,
    item?.media_details?.width,
  ];

  const heightCandidates = [
    item?.sizes?.large?.height,
    item?.sizes?.medium?.height,
    item?.height,
    item?.media_details?.sizes?.large?.height,
    item?.media_details?.height,
  ];

  const width =
    widthCandidates.find(
      (value): value is number =>
        typeof value === "number" && Number.isFinite(value) && value > 0,
    ) ?? null;

  const height =
    heightCandidates.find(
      (value): value is number =>
        typeof value === "number" && Number.isFinite(value) && value > 0,
    ) ?? null;

  return { width, height };
}

function buildGalleryAnalysisByTab(
  visitTempleAcf: VisitTempleAcf,
): GalleryAnalysisByTab[] {
  const tabs = Array.isArray(visitTempleAcf?.temple_tabs)
    ? visitTempleAcf.temple_tabs
    : [];

  return tabs.map((tab: any, tabIndex: number) => {
    const gallery = Array.isArray(tab?.gallery) ? tab.gallery : [];

    const images = gallery.map((item: any, itemIndex: number) => {
      const { width, height } = readGalleryDimensions(item);
      return {
        tabIndex,
        itemIndex,
        src: item?.sizes?.large || item?.url || "",
        tabSrc: item?.sizes?.medium_large || item?.url || "",
        mobileSrc: item?.sizes?.medium || item?.url || "",
        width,
        height,
        orientation: detectOrientation(width, height),
      };
    });

    return {
      tabIndex,
      images,
    };
  });
}

export default function VisitTempleScriptProvider({ data }: { data: any }) {
  // Router Path
  const pathname = usePathname();
  const [visitTempleData, setVisitTempleData] = useState<any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [containerWidth, setContainerWidth] = useState(sectionWidth + 100);
  const [error, setError] = useState<string | null>(null);
  const {
    animationPlayed,
    setAnimationPlayed,
    isLoading,
    setIsLoading,
    templeTabData,
    setTempleTabData,
    templeActiveTab,
    setTempleActiveTab,
  } = useAppState();
  const [activeTab, setActiveTab] = useState(0);
  const [tabGalleryData, setTabGalleryData] = useState<GalleryAnalysisByTab[]>(
    [],
  );

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setVisitTempleData(data);
    templeTabData.length === 0 &&
      setTempleTabData(
        data?.acf?.temple_tabs.map((tab: any) => ({
          tab_title: tab.tab_title,
        })) || [],
      );
  }, [data]);

  useEffect(() => {
    if (!visitTempleData?.acf) {
      return;
    }
    const galleryAnalysisByTab = buildGalleryAnalysisByTab(visitTempleData.acf);
    setTabGalleryData(galleryAnalysisByTab);
    let minSectionWidth = 25.6 + 32 + 308 / window.innerWidth + 17 + 10;
    galleryAnalysisByTab[activeTab]?.images.forEach((tab) => {
      if (tab.orientation === "landscape") {
        minSectionWidth += 32;
      } else {
        minSectionWidth += 22;
      }
    });
    setSectionWidth(minSectionWidth);
    setContainerWidth(minSectionWidth + 100);
    setPageDataFetched(true);
    setIsLoading(false);
  }, [visitTempleData]);

  // Page Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (
      typeof window !== "undefined" &&
      panel.current &&
      wrapper.current &&
      window.innerWidth > 1024
    ) {
      setPageContentAnimation();
      // Overflow body
      const progress = document.getElementById(
        "progress",
      ) as HTMLElement | null;
      const waveLine = document.getElementById(
        "wave-line",
      ) as HTMLElement | null;
      const arrowButton = document.getElementById(
        "arrow-button",
      ) as HTMLElement | null;
      waveLine?.classList.remove("hidden");
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * (containerWidth / 100),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.to(progress, { width: `${100 * self.progress}%` });
            }
            if (waveLine) {
              if (self.progress > 0.97) {
                gsap.to(waveLine, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              } else {
                gsap.to(waveLine, {
                  opacity: 1,
                  duration: 0.1,
                  delay: 0,
                });
              }
            }
          },
        },
      });
      timeline.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current?.offsetTop,
          end: "+=" + window.innerWidth * (containerWidth / 100),
          scrub: scurbScale,
        },
      });
      animations.push(timeline);
    }
    // Return

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname, pageDataFetched, activeTab, containerWidth]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const page = document.querySelector(
          "#page-wrapper",
        ) as HTMLElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLElement | null;
        const introTitle = document.querySelector(
          ".first-intro h1.intro-title",
        ) as HTMLElement | null;
        const introImage = main.current?.querySelector(
          ".first-intro .intro-image",
        );
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        );
        let splitIntroTitle;
        if (introTitle) {
          splitIntroTitle = BigTitleSplitLines(introTitle);
          gsap.set(introTitle, {
            perspective: 400,
          });
          gsap.set(splitIntroTitle, {
            yPercent: 150,
            opacity: 0,
          });
        }
        if (introImage) {
          gsap.set(introImage, {
            x: "10vw",
            opacity: 0,
          });
        }
        // Set localStorage variable
        const userVisit = localStorage.getItem("hasVisited");
        if (userVisit === "true" && animationPlayed && pageDataFetched) {
          // Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Set Animation Played to true
              setIsAllAnimationComplete(true);
            },
          });
          if (page) {
            tl.to(page, {
              opacity: 1,
              ease: "none",
              duration: 0.5,
              delay: 0,
            });
          }
          if (headerLeft) {
            tl.to(headerLeft, {
              autoAlpha: 1,
              ease: "none",
              duration: 1,
            });
          }
          if (headerRight) {
            tl.to(
              headerRight,
              {
                autoAlpha: 1,
                ease: "none",
                duration: 1,
              },
              "-=1",
            );
          }
          // Intro Title Animation
          if (introTitle && splitIntroTitle) {
            tl.to(
              splitIntroTitle,
              {
                yPercent: 0,
                opacity: 1,
                duration: 3,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
              },
              "-=1.5",
            );
          }
          // Intro Image Animation
          if (introImage) {
            tl.to(
              introImage,
              {
                x: "0vw",
                opacity: 1,
                duration: 3,
                delay: 0,
                ease: "expo.inOut",
              },
              "-=1.5",
            );
          }
          // Wave Line Animation
          const waveLine = document.getElementById(
            "wave-mask",
          ) as HTMLElement | null;
          if (waveLine) {
            tl.to(
              waveLine,
              {
                translateY: 0,
                opacity: 1,
                ease: "expo.inOut",
                duration: 3,
                delay: 0,
              },
              "-=2.5",
            );
          }
          if (bannerBackgroundOverlay) {
            tl.to(
              bannerBackgroundOverlay,
              {
                translateY: "-100%",
                delay: 0,
                duration: 3,
                ease: "expo.inOut",
              },
              "-=2.5",
            );
          }
          animations.push(tl);
        }
      });
    }

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
    // Page Content Animation
    const introImage = main.current?.querySelector(".first-intro .intro-image");
    if (introImage) {
      const introImageAnimation = gsap.to(introImage, {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
      animations.push(introImageAnimation);
    }
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  };

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      verticalSection?.pause();
    } else {
      verticalSection?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    visitTempleData && (
      <main
        ref={main}
        id="page"
        dir="ltr"
        className="main relative overflow-hidden z-10"
      >
        <div
          ref={panel}
          id="panel-wrapper"
          className="w-screen lg:h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            style={
              {
                "--container-width": `${containerWidth}vw`,
              } as React.CSSProperties
            }
            className={`section-wrapp w-screen flex flex-wrap flex-col lg:flex-nowrap lg:flex-row-reverse lg:w-(--container-width) lg:h-screen items-center will-change-transform`}
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={visitTempleData?.acf?.introduction?.background}
              bgOverlay={""}
              data={visitTempleData?.acf?.introduction}
              extraClass={
                "first-intro panel-section will-change-transform min-w-screen w-screen"
              }
              panel={panel}
              bgPosition=""
              overlayClass="bg-[#000000] opacity-0"
              bgClass=""
              audioControl={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <Suspense
              fallback={
                <div className={`w-[${sectionWidth}vw] h-screen bg-black`}>
                  Loading...
                </div>
              }
            >
              <VisitTempleSection
                style={
                  {
                    "--section-width": `${sectionWidth}vw`,
                  } as React.CSSProperties
                }
                extraClass={`w-full lg:w-(--section-width) lg:min-w-(--section-width) panel-section will-change-transform`}
                animWidthText={0.8}
                sectionData={{
                  videoSection: visitTempleData?.acf?.video_section,
                  templeTabs: visitTempleData?.acf?.temple_tabs,
                }}
                sectionWidth={sectionWidth}
                tabGalleryData={tabGalleryData}
              />
            </Suspense>
          </div>
        </div>
      </main>
    )
  );
}
