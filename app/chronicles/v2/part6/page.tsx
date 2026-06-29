"use client";
import Introduction from "@/app/components/history/Introduction";
import HistoryTimeline2 from "@/app/ui/HistoryTimeline2";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import introBG7 from "../../../assets/images/intro-bg-7.jpg";
import OnlyImage from "../../../assets/images/only-image.jpg";
import OnlyImage2 from "../../../assets/images/only-image2.jpg";
import QuoteSectionBG from "../../../assets/images/quote-section-bg.jpg";
import PostImage1 from "../../../assets/images/rabbis-image-1.jpg";
import PostImage2 from "../../../assets/images/rabbis-image-2.jpg";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HistoryQuoteSection2 from "../../../components/history/HistoryQuoteSection2";
import ImageOnlySection2 from "../../../components/history/ImageOnlySection2";
import ImageWithTextSection from "../../../components/history/ImageWithTextSection";
import MarkOfTheRoad4 from "../../../components/history/MarkOfTheRoad4";
import NotificationPopup from "../../../components/history/NotificationPopup";
import OnlyImageSection from "../../../components/history/OnlyImageSection";
import OnlyParallaxImageSection from "../../../components/history/OnlyParallaxImageSection";
import OnlyTextSection2 from "../../../components/history/OnlyTextSection2";
import RabbisTimeline4 from "../../../components/history/RabbisTimeline4";
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
  const timeline6Ref = useRef<HTMLDivElement>(null);
  const panel6 = useRef<HTMLDivElement>(null);
  const wrapper6 = useRef<HTMLDivElement>(null);
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
  const IntroData6 = {
    title:
      chroniclesPageData?.acf?.timeline_6?.introduction?.title ||
      `הרחיבי מקום<br/>אוהלך`,
    subtitle:
      chroniclesPageData?.acf?.timeline_6?.introduction?.subtitle ||
      `תשנ"ז - הווה`,
    background:
      chroniclesPageData?.acf?.timeline_6?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_6?.introduction
        ?.background_overlay_image || false,
  };
  const QuoteData3 = {
    content:
      chroniclesPageData?.acf?.timeline_6?.quote_section?.text ||
      `<p><strong>שנת תשפ"ב</strong><br/> הרחבת בית המדרש</p>`,
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
  const [timelinePeriod6, setTimelinePeriod6] =
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
    let timeline6 = null;
    if (typeof window !== "undefined" && main.current && page.current) {
      const scurbScale = 2;

      // Set History Timeline Active
      activeTimeline(".intro-1");
      completeTimeline(".intro-1");
      activeTimeline(".intro-2");
      completeTimeline(".intro-2");
      activeTimeline(".intro-3");
      completeTimeline(".intro-3");
      activeTimeline(".intro-4");
      completeTimeline(".intro-4");
      activeTimeline(".intro-5");
      completeTimeline(".intro-5");
      // Intro Line 1
      const introLine1 = document.querySelector(
        `.history-timeline .intro-1 .progress-line .border-line`,
      );
      // Intro Line 2
      const introLine2 = document.querySelector(
        `.history-timeline .intro-2 .progress-line .border-line`,
      );
      // Intro Line 3
      const introLine3 = document.querySelector(
        `.history-timeline .intro-3 .progress-line .border-line`,
      );
      // Intro Line 4
      const introLine4 = document.querySelector(
        `.history-timeline .intro-4 .progress-line .border-line`,
      );
      // Intro Line 5
      const introLine5 = document.querySelector(
        `.history-timeline .intro-5 .progress-line .border-line`,
      );
      setProgressLineWidth(introLine1, `100%`);
      setProgressLineWidth(introLine2, `100%`);
      setProgressLineWidth(introLine3, `100%`);
      setProgressLineWidth(introLine4, `100%`);
      setProgressLineWidth(introLine5, `100%`);

      // Timeline Section 6
      timeline6 = gsap.timeline({
        scrollTrigger: {
          trigger: panel6.current,
          start: "top top",
          end: "+=" + window.innerWidth * 5.53,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
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
      timeline6.to(wrapper6.current, {
        x: () =>
          wrapper6.current
            ? wrapper6.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel6.current,
          start: timeline6Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 5.53 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod6(timeline6);
    }
    // Return
    return () => {
      timelinePeriod6?.kill();
    };
  }, [pathname, pageDataFetched]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      timelinePeriod6?.pause();
    } else {
      timelinePeriod6?.resume();
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

  // Video Popup Control
  useGSAP(() => {
    const videoPopup = document.querySelector(".video-popup");
    if (isVideoPopupOpen) {
      // Page Overflow Hidden
      document.body.classList.remove("!overflow-auto");
      document.body.classList.add("!overflow-hidden");
      if (videoPopup) {
        gsap.to(videoPopup, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "none",
          pointerEvents: "auto",
        });
      }
    } else {
      // Page Overflow Auto
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      if (videoPopup) {
        gsap.to(videoPopup, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "none",
          pointerEvents: "none",
        });
      }
    }
  }, [isVideoPopupOpen]);

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
            {/* Sixth Panel Start Here */}
            <div ref={timeline6Ref} className="timeline6" id="timeline6">
              <div
                ref={panel6}
                className="w-screen h-screen flex items-end justify-end"
              >
                <div
                  ref={wrapper6}
                  className={`section-wrapp flex flex-nowrap flex-row-reverse w-[837.6vw] min-w-[837.6vw] h-screen will-change-transform`}
                >
                  <Introduction
                    animated={isAllAnimationComplete}
                    bgImage={introBG7}
                    data={IntroData6}
                    extraClass={
                      "first-intro panel-section will-change-transform min-w-screen w-screen"
                    }
                    panel={timeline6Ref}
                    timeline="timeline6"
                    bgPosition=""
                    overlayClass="bg-[#000000] opacity-20"
                    bgClass=""
                    bgOverlay={""}
                    audioControl={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    animationStatus={isAllAnimationComplete}
                  />
                  <Suspense
                    fallback={
                      <div className="min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <OnlyTextSection2
                      animWidthText={37.2}
                      extraClass={
                        "min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline6Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_6?.text_section || ""
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <ImageOnlySection2
                      animWidthText={38}
                      extraClass={
                        "min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline6Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_6?.single_image || ""
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <RabbisTimeline4
                      extraClass={
                        "panel-section will-change-transform min-w-[210vw] w-[210vw]"
                      }
                      animWidthText={38.4}
                      panel={timeline6Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_6?.card_section || []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[61.8vw] w-[61.8vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <OnlyParallaxImageSection
                      extraClass={
                        "panel-section will-change-transform min-w-[61.8vw] w-[61.8vw]"
                      }
                      image={
                        chroniclesPageData?.acf?.timeline_6?.parallax_image ||
                        OnlyImage
                      }
                      animWidthText={40}
                      panel={timeline6Ref}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <MarkOfTheRoad4
                      animWidthText={41.2}
                      extraClass={
                        "min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline6Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_6?.mark_of_the_road ||
                        []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <ImageWithTextSection
                      extraClass={
                        "min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform"
                      }
                      animWidthText={42.7}
                      panel={timeline6Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_6
                          ?.image_with_text_section || []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[35.8vw] w-[35.8vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <OnlyImageSection
                      extraClass={
                        "panel-section will-change-transform min-w-[35.8vw] w-[35.8vw]"
                      }
                      image={
                        chroniclesPageData?.acf?.timeline_6?.only_image ||
                        OnlyImage2
                      }
                      animWidthText={43.5}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[75vw] w-[75vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <HistoryQuoteSection2
                      extraClass={
                        "panel-section will-change-transform min-w-[75vw] w-[75vw]"
                      }
                      animWidthText={44.2}
                      bgImage={
                        chroniclesPageData?.acf?.timeline_6?.quote_section
                          ?.background || QuoteSectionBG
                      }
                      boxClass={""}
                      data={QuoteData3}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
            {/* Sixth Panel End Here */}
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
