"use client";
import { useAppState } from "@/app/components/AppContext";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Introduction from "../../components/visit-temple/Introduction";
import VisitTempleSection from "../../components/visit-temple/VisitTempleSection";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

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

export default function VisitTempleScriptProviderID({ data }: { data: any }) {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const id = params?.id as string;
  const [visitTempleData, setVisitTempleData] = useState<any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [containerWidth, setContainerWidth] = useState(sectionWidth + 100);
  const [error, setError] = useState<string | null>(null);
  const [tabGalleryData, setTabGalleryData] = useState<GalleryAnalysisByTab[]>(
    [],
  );

  // Animation State
  const {
    animationPlayed,
    setAnimationPlayed,
    isLoading,
    setIsLoading,
    templeActiveTab,
    setTempleActiveTab,
    templeTabData,
    setTempleTabData,
  } = useAppState();
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
      setError("No data available.");
      return;
    }
    if (!data?.acf) {
      setError("Invalid data format.");
      return;
    }
    setVisitTempleData(data);
    templeTabData.length === 0 &&
      setTempleTabData(
        data?.acf?.temple_tabs.map((tab: any) => ({
          tab_title: tab.tab_title,
        })) || [],
      );
    setTempleActiveTab(id ? parseInt(id) : 0);
  }, [data]);

  useEffect(() => {
    if (!visitTempleData?.acf) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
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
      galleryAnalysisByTab[templeActiveTab]?.images.forEach((tab) => {
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
  }, [visitTempleData, templeActiveTab]);

  // Page Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    if (pageDataFetched) {
      setIsAllAnimationComplete(true);
    }
    const bannerBackgroundOverlay = main.current?.querySelector(
      ".first-intro .intro-background .intro-bg-mask",
    );
    if (bannerBackgroundOverlay) {
      gsap.to(bannerBackgroundOverlay, {
        translateY: "-100%",
        delay: 0,
        duration: 0,
      });
    }
  }, [pageDataFetched, animationPlayed]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
    // Page Content Animation
    const introImage = main.current?.querySelector(
      ".first-intro .intro-image",
    ) as HTMLElement | null;
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

  useEffect(() => {
    window.scrollTo({ top: window.innerWidth, behavior: "auto" });
  }, [!isLoading]);

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
              sectionWidth={sectionWidth}
              tabGalleryData={tabGalleryData}
            />
          </div>
        </div>
      </main>
    )
  );
}
