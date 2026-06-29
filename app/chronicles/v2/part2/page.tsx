"use client";
import Introduction from "@/app/components/history/Introduction";
import HistoryTimeline2 from "@/app/ui/HistoryTimeline2";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import IntroBG from "../../../assets/images/introduction-bg.jpg";
import NewsSectionBG from "../../../assets/images/new-section-bg2.jpg";
import PostImage1 from "../../../assets/images/rabbis-image-1.jpg";
import PostImage2 from "../../../assets/images/rabbis-image-2.jpg";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import MarkOfTheRoad2 from "../../../components/history/MarkOfTheRoad2";
import NewsPapperSection from "../../../components/history/NewsPapperSection";
import NotificationPopup from "../../../components/history/NotificationPopup";
import RabbisPeriodSection from "../../../components/history/RabbisPeriodSection";
import TitleSection from "../../../components/history/TitleSection";
import VideoPopup from "../../../components/history/VideoPopup";
import LoadingEffect from "../../../components/LoadingEffect";
import RabbisHamburgerMenuHome from "../../../ui/past-rabbis/RabbisHamburgerMenuHome";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../../ui/plugins";
import SlidingArrow from "../../../ui/SlidingArrow";
import SmoothWrapper from "../../../ui/SmoothWrapper";
import TextSplitLines from "../../../ui/TextSplitLines";
import TitleSplitChars from "../../../ui/TitleSplitChars";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  const [chroniclesPageData, setChroniclesPageData] = useState<any | []>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Static Data Fallback
  const staticData = {};

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const loadChroniclesPageData = async () => {
      try {
        const response = await fetch("/api/chronicles", {
          //next: { revalidate: 3000 },
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          //throw new Error("Failed to load chronicles page data.");
          fetchError = true;
        }

        const data = fetchError ? staticData : await response.json();

        if (isMounted) {
          setChroniclesPageData(data);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load chronicles page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadChroniclesPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);
  // Set Page Data Fetched
  useEffect(() => {
    if (!chroniclesPageData) {
      return;
    }
    setPageDataFetched(true);
  }, [chroniclesPageData]);

  // Page Selectors
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const timeline2Ref = useRef<HTMLDivElement>(null);
  const panel2 = useRef<HTMLDivElement>(null);
  const wrapper2 = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const isHistoryHidden = useRef(false);
  const isHeaderLeftHidden = useRef(false);
  const [listOfRabbis, SetListOfRabbis] = useState<any[]>([]);

  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title:
        chroniclesPageData?.acf?.timeline_1?.introduction?.subtitle ||
        `תרל"ז - תרע"ד`,
      link: `/chronicles/v2`,
    },
    {
      id: 2,
      title:
        chroniclesPageData?.acf?.timeline_2?.introduction?.subtitle ||
        `תרע"ד - תרפ"ד`,
      link: `/chronicles/v2/part2`,
    },
    {
      id: 3,
      title:
        chroniclesPageData?.acf?.timeline_3?.introduction?.subtitle ||
        `תרפ"ד - תרפ"ט`,
      link: `/chronicles/v2/part3`,
    },
    {
      id: 4,
      title:
        chroniclesPageData?.acf?.timeline_4?.introduction?.subtitle ||
        `תרפ"ט - תשל"ו`,
      link: `/chronicles/v2/part4`,
    },
    {
      id: 5,
      title:
        chroniclesPageData?.acf?.timeline_5?.introduction?.subtitle ||
        `תשל״ו - תשנ״ז`,
      link: `/chronicles/v2/part5`,
    },
    {
      id: 6,
      title:
        chroniclesPageData?.acf?.timeline_6?.introduction?.subtitle ||
        `תשנ"ז - הווה`,
      link: `/chronicles/v2/part6`,
    },
  ];
  // Page Data
  const IntroData2 = {
    title:
      chroniclesPageData?.acf?.timeline_2?.introduction?.title ||
      `מלחמת העולם<br/>הראשונה`,
    subtitle:
      chroniclesPageData?.acf?.timeline_2?.introduction?.subtitle ||
      `תרע"ד - תרפ"ד`,
    background:
      chroniclesPageData?.acf?.timeline_2?.introduction?.background || IntroBG,
    overlay:
      chroniclesPageData?.acf?.timeline_2?.introduction
        ?.background_overlay_image || false,
  };

  // Hamburger Menu
  const RabbisMenu = [
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
  ];
  // Rabbis Menu State
  const [activeRabbisMenu, setActiveRabbisMenu] = useState(false);
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Video Popup
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  // Vertical Section State
  const [timelinePeriod2, setTimelinePeriod2] =
    useState<gsap.core.Timeline | null>(null);

  const setProgressLineWidth = (target: Element | null, value: string) => {
    if (target instanceof HTMLElement) {
      target.style.width = value;
    }
  };

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    document.fonts.ready.then(() => {
      // Selectors
      const headerLeft = main.current?.querySelector(".header-left");
      const headerRight = main.current?.querySelector(".header-right");
      // Set Title
      const headingTitle = page.current?.querySelector(
        ".first-intro .intro-title",
      );
      // Subtitle
      const headingContent = page.current?.querySelector(
        ".first-intro .intro-content",
      );
      const headingBackgroundMask = page.current?.querySelector(
        ".first-intro .intro-background .intro-bg-mask",
      );
      // Page Timeline
      const headingTitleSpan = headingTitle?.querySelector("span");
      const headingContentSpan = headingContent?.querySelector("span");
      const timelineRef = history.current?.querySelector(".timeline");
      let splitTitle, splitContent;
      if (headingTitleSpan) {
        splitTitle = TitleSplitChars(headingTitleSpan);
        gsap.set(headingTitleSpan, {
          perspective: 400,
        });
        gsap.set(splitTitle, {
          yPercent: 150,
          opacity: 0,
        });
      }
      if (headingContentSpan) {
        splitContent = TextSplitLines(headingContentSpan);
        gsap.set(headingContentSpan, {
          perspective: 400,
        });
        gsap.set(splitContent, {
          yPercent: 150,
          opacity: 0,
        });
      }
      if (timelineRef) {
        gsap.set(history.current, { opacity: 1 });
        gsap.set(timelineRef, { yPercent: 100 });
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
            delay: 0,
          });
        }
        if (page.current) {
          tl.to(page.current, {
            opacity: 1,
            ease: "none",
            duration: 0,
            delay: 0,
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
        if (headingTitleSpan && splitTitle) {
          tl.to(
            splitTitle,
            {
              yPercent: 0,
              opacity: 1,
              duration: 3,
              delay: 0,
              stagger: 0.03,
              ease: "expo.inOut",
            },
            "-=1",
          );
        }
        if (headingContentSpan && splitContent) {
          tl.to(
            splitContent,
            {
              yPercent: 0,
              opacity: 1,
              duration: 3,
              delay: 0,
              stagger: 0.03,
              ease: "expo.inOut",
            },
            "-=2.5",
          );
        }
        if (timelineRef) {
          tl.to(
            timelineRef,
            {
              yPercent: 0,
              delay: 0,
              duration: 3,
              ease: "expo.inOut",
            },
            "-=3",
          );
        }
        if (headingBackgroundMask) {
          tl.to(
            headingBackgroundMask,
            {
              yPercent: -100,
              delay: 0,
              duration: 3,
              ease: "expo.inOut",
            },
            "-=2",
          );
        }
        animations.push(tl);
      }
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // Complete Timeline Function
  function completeTimeline(selector: string) {
    // Timeline Complete
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("complete");
    if (!hasActiveClass) {
      intro.classList.add("complete");
    }
  }

  // Active Timeline
  function activeTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (!hasActiveClass) {
      intro.classList.add("active");
    }
  }

  function toggleHeaderLeftOnScroll() {
    const headerLeft = main.current?.querySelector(".header-left");
    if (!headerLeft) return;

    const shouldHide = window.scrollY > 200;
    if (shouldHide === isHeaderLeftHidden.current) return;
    isHeaderLeftHidden.current = shouldHide;

    gsap.to(headerLeft, {
      autoAlpha: shouldHide ? 0 : 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  // Inactive Timeline
  function inActiveTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (hasActiveClass) {
      intro.classList.remove("active");
    }
  }

  // Page Section Animation
  useGSAP(() => {
    //ScrollTrigger.normalizeScroll(true);
    let timeline2 = null;
    if (typeof window !== "undefined" && main.current && page.current) {
      const scurbScale = 2;

      // Set History Timeline Active
      activeTimeline(".intro-1");
      completeTimeline(".intro-1");
      // Intro Line 1
      const introLine1 = document.querySelector(
        `.history-timeline .intro-1 .progress-line .border-line`,
      );
      setProgressLineWidth(introLine1, `100%`);
      // Intro Line 2
      const introLine2 = document.querySelector(
        `.history-timeline .intro-2 .progress-line .border-line`,
      );
      // Timeline Section  2
      timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: panel2.current,
          start: "top top",
          end: "+=" + window.innerWidth * 5.88,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Second Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-2");
              completeTimeline(".intro-2");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine2, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine2, "0%");
              inActiveTimeline(".intro-2");
            }
            // Hide History Timeline on Last Chapter
            const shouldHideHistory = self.progress > 0.99;
            if (
              history.current &&
              shouldHideHistory !== isHistoryHidden.current
            ) {
              isHistoryHidden.current = shouldHideHistory;
              gsap.set(history.current, {
                autoAlpha: shouldHideHistory ? 0 : 1,
                pointerEvents: shouldHideHistory ? "none" : "auto",
              });
            }
          },
        },
      });
      timeline2.to(wrapper2.current, {
        x: () =>
          wrapper2.current
            ? wrapper2.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel2.current,
          start: timeline2Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 5.88 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod2(timeline2);
    }
    // Return
    return () => {
      timelinePeriod2?.kill();
    };
  }, [pathname, pageDataFetched]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      timelinePeriod2?.pause();
    } else {
      timelinePeriod2?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Header Left Toggle on Scroll
  useEffect(() => {
    if (!isAllAnimationComplete) return;

    toggleHeaderLeftOnScroll();
    window.addEventListener("scroll", toggleHeaderLeftOnScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", toggleHeaderLeftOnScroll);
    };
  }, [isAllAnimationComplete]);

  // Default Effect
  useEffect(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      setIsLoading(true);
      if (main.current) {
        gsap.to(main.current, {
          opacity: 0,
          duration: 0.1,
        });
      }
      if (page.current) {
        gsap.to(page.current, {
          opacity: 0,
          duration: 0,
          onComplete: () => {
            window.scrollTo(0, 0);
          },
        });
      }
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
    chroniclesPageData && (
      <div ref={main} id="page" className="relative">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header animationStatus={isAllAnimationComplete} />
        <SmoothWrapper>
          <main
            ref={page}
            id="page"
            dir="ltr"
            className="main opacity-0 relative z-10"
          >
            {/* Second Panel Start Here */}
            <div ref={timeline2Ref} className="timeline2" id="timeline2">
              <div
                ref={panel2}
                className="w-screen h-screen flex items-end justify-end"
              >
                <div
                  ref={wrapper2}
                  className={`section-wrapp flex flex-nowrap flex-row-reverse w-[588vw] min-w-[588vw] h-screen will-change-transform`}
                >
                  <Introduction
                    animated={isAllAnimationComplete}
                    animationStatus={isAllAnimationComplete}
                    bgImage={""}
                    bgOverlay={""}
                    data={IntroData2}
                    extraClass={
                      "first-intro panel-section will-change-transform min-w-screen w-screen"
                    }
                    panel={timeline2Ref}
                    bgPosition=""
                    overlayClass="bg-[#000000] opacity-40"
                    bgClass=""
                    audioControl={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    timeline={"timeline1"}
                  />
                  <Suspense
                    fallback={
                      <div className="min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <NewsPapperSection
                      animWidthText={8.2}
                      panel={timeline2Ref}
                      extraClass={
                        "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                      }
                      bgImage={NewsSectionBG}
                      data={
                        chroniclesPageData?.acf?.timeline_2
                          ?.news_paper_section || []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <TitleSection
                      animWidthText={9.1}
                      extraClass={
                        "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                      }
                      leftShape={false}
                      rightShape={false}
                      panel={timeline2Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_2?.title_section || ""
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <RabbisPeriodSection
                      animWidthText={10.2}
                      extraClass={
                        "min-w-screen w-screen h-screen panel-section will-change-transform"
                      }
                      panel={timeline2Ref}
                      activeMenu={activeRabbisMenu}
                      activeMenuFunction={setActiveRabbisMenu}
                      data={
                        chroniclesPageData?.acf?.timeline_2
                          ?.past_rabbis_section || []
                      }
                      rabbisData={SetListOfRabbis}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <MarkOfTheRoad2
                      animWidthText={11.4}
                      panel={timeline2Ref}
                      extraClass={
                        "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                      }
                      data={
                        chroniclesPageData?.acf?.timeline_2?.mark_of_the_road ||
                        []
                      }
                    />
                  </Suspense>
                </div>
              </div>
            </div>
            {/* Second Panel End Here */}
          </main>
          {pageDataFetched && (
            <Suspense fallback={<div className="w-screen h-screen bg-black" />}>
              <Footer className={"relative z-20"} />
            </Suspense>
          )}
        </SmoothWrapper>
        {pageDataFetched && (
          <Suspense>
            <HistoryTimeline2
              wrapperRef={history}
              progressRef={progress}
              timelineData={TimelineData}
            />
          </Suspense>
        )}
        {pageDataFetched && (
          <Suspense>
            <NotificationPopup />
          </Suspense>
        )}
        {pageDataFetched && (
          <Suspense>
            <RabbisHamburgerMenuHome
              extraClass="hidden"
              data={JSON.stringify(RabbisMenu)}
              data2={listOfRabbis}
              activeMenu={activeRabbisMenu}
              activeMenuFunction={setActiveRabbisMenu}
            />
          </Suspense>
        )}
        {pageDataFetched && (
          <Suspense>
            <VideoPopup
              videoControl={{ isVideoPopupOpen, setIsVideoPopupOpen }}
            />
          </Suspense>
        )}
        {pageDataFetched && (
          <Suspense>
            <SlidingArrow />
          </Suspense>
        )}
      </div>
    )
  );
}
