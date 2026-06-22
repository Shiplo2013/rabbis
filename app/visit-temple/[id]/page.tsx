"use client";
import TabMenu from "@/app/components/visit-temple/TabMenu";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Wave from "../../assets/images/wave.svg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingEffect from "../../components/LoadingEffect";
import Introduction from "../../components/visit-temple/Introduction";
import VisitTempleSection from "../../components/visit-temple/VisitTempleSection";
import BigTitleSplitLines from "../../ui/BigTitleSplitLines";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

export default function Page() {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const [visitTempleData, setVisitTempleData] = useState<any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [containerWidth, setContainerWidth] = useState(sectionWidth + 100);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(id ? parseInt(id) : 0);
  const [tabGalleryData, setTabGalleryData] = useState<GalleryAnalysisByTab[]>(
    [],
  );

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadVisitTempleData = async () => {
      try {
        const response = await fetch("/api/visit-temple", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load visit temple page data.");
        }

        const data = await response.json();

        if (isMounted) {
          setVisitTempleData(data);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load visit temple page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadVisitTempleData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!visitTempleData?.acf) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
    }
  }, [visitTempleData, animationPlayed]);

  useEffect(() => {
    if (!visitTempleData?.acf) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const galleryAnalysisByTab = buildGalleryAnalysisByTab(
        visitTempleData.acf,
      );
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
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [visitTempleData]);

  // Page Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      setPageContentAnimation();
      // Overflow body
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
            gsap.to(progress.current, { width: `${100 * self.progress}%` });
            if (self.progress > 0.97) {
              gsap.to(waveLine.current, {
                opacity: 0,
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(waveLine.current, {
                opacity: 1,
                duration: 0.1,
                delay: 0,
              });
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
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const headerLeft = main.current?.querySelector(".header-left");
        const headerRight = main.current?.querySelector(".header-right");
        const introTitle = main.current?.querySelector(
          ".first-intro h1.intro-title",
        );
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
          if (main.current) {
            tl.to(main.current, {
              opacity: 1,
              ease: "none",
              duration: 0.5,
            });
          }
          if (headerLeft) {
            tl.to(headerLeft, {
              opacity: 1,
              ease: "none",
              duration: 1,
            });
          }
          if (headerRight) {
            tl.to(
              headerRight,
              {
                opacity: 1,
                ease: "none",
                duration: 1,
              },
              "-=1",
            );
          }
          if (page.current) {
            tl.to(
              page.current,
              {
                opacity: 1,
                ease: "none",
                duration: 0,
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
          if (waveMask.current) {
            tl.to(
              waveMask.current,
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
  }, [pageDataFetched]);

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

  // Active Tab Change Animation
  useEffect(() => {
    const animations: gsap.core.Animation[] = [];

    const scrollAnimation = gsap.to(window, {
      scrollTo: window.innerWidth * 1.45,
      duration: 0.5,
      ease: "power3.inOut",
    });
    animations.push(scrollAnimation);
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [isAllAnimationComplete]);

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      setIsLoading(true);
      gsap.to(main.current, {
        opacity: 0,
        duration: 0.1,
      });
      gsap.to(page.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          window.scrollTo(0, 0);
        },
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
      <div ref={main} id="main" className="relative">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header animationStatus={isAllAnimationComplete} />
        <SmoothWrapper>
          <main
            ref={page}
            id="page"
            dir="ltr"
            className="main relative overflow-hidden z-10 opacity-0"
          >
            <div
              ref={panel}
              id="panel-wrapper"
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper}
                id="section-wrapper"
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${containerWidth}vw] h-screen items-center will-change-transform`}
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
                <VisitTempleSection
                  extraClass={`w-[${sectionWidth}vw] panel-section will-change-transform`}
                  animWidthText={0.8}
                  sectionData={{
                    videoSection: visitTempleData?.acf?.video_section,
                    templeTabs: visitTempleData?.acf?.temple_tabs,
                  }}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  sectionWidth={sectionWidth}
                  tabGalleryData={tabGalleryData}
                />
              </div>
            </div>
          </main>
          <Footer className={"relative z-20"} />
        </SmoothWrapper>
        <TabMenu
          data={visitTempleData?.acf?.temple_tabs}
          activeTab={activeTab}
        />
        <div
          ref={waveLine}
          className="wave-line fixed bottom-10 right-1/2 w-30 h-6 translate-x-1/2 overflow-hidden z-30"
        >
          <div
            ref={waveMask}
            style={{
              maskImage: `url(${Wave.src})`,
            }}
            className="mask w-full h-full absolute top-0 left-0 mask-no-repeat mask-center bg-(--theme-color) mask-contain translate-y-full"
          >
            <div
              ref={progress}
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
            ></div>
          </div>
        </div>
      </div>
    )
  );
}
