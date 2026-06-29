"use client";
import HistoryTimeline2 from "@/app/ui/HistoryTimeline2";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { default as arrowSectionBG } from "../../../assets/images/arrow-section-bg.jpg";
import sectionImage from "../../../assets/images/arrow-section-image.jpg";
import arrowSectionImage from "../../../assets/images/arrow-section-image2.jpg";
import IntroBG2 from "../../../assets/images/intro-bg.jpg";
import IntroBGoverlay from "../../../assets/images/intro-bg2.png";
import introBG3 from "../../../assets/images/intro-bg3.jpg";
import PostImage1 from "../../../assets/images/rabbis-image-1.jpg";
import PostImage2 from "../../../assets/images/rabbis-image-2.jpg";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import ArrowSliderSection from "../../../components/history/ArrowSliderSection";
import EvidenceOfPeriod from "../../../components/history/EvidenceOfPeriod";
import Introduction from "../../../components/history/Introduction";
import IntroductionContent from "../../../components/history/IntroductionContent";
import LambOfferingSection from "../../../components/history/LambOfferingSection";
import MarkOfTheRoad3 from "../../../components/history/MarkOfTheRoad3";
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
  const timeline3Ref = useRef<HTMLDivElement>(null);
  const panel3 = useRef<HTMLDivElement>(null);
  const wrapper3 = useRef<HTMLDivElement>(null);
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
  const IntroData3 = {
    title: chroniclesPageData?.acf?.timeline_3?.introduction?.title || `חברון`,
    subtitle:
      chroniclesPageData?.acf?.timeline_3?.introduction?.subtitle ||
      `תרפ"ד – תרפ"ט`,
    background:
      chroniclesPageData?.acf?.timeline_3?.introduction?.background || IntroBG2,
    overlay:
      chroniclesPageData?.acf?.timeline_3?.introduction
        ?.background_overlay_image || false,
  };
  const IntroContentData = {
    title:
      chroniclesPageData?.acf?.timeline_3?.intro_banner?.title || `פרעות תרפ״ט`,
    subtitle: ``,
  };

  //Arrow Slider Data
  const SliderData = {
    text1:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.arrow_slider
        ?.slide_1 ||
      `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
    text2:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.arrow_slider
        ?.slide_2 ||
      `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    background:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.background ||
      arrowSectionBG,
    floatingImage:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section
        ?.floating_image || arrowSectionImage,
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
  const [timelinePeriod3, setTimelinePeriod3] =
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
    let timeline3 = null;
    if (typeof window !== "undefined" && main.current && page.current) {
      const scurbScale = 2;

      // Set History Timeline Active
      activeTimeline(".intro-1");
      completeTimeline(".intro-1");
      activeTimeline(".intro-2");
      completeTimeline(".intro-2");
      // Intro Line 1
      const introLine1 = document.querySelector(
        `.history-timeline .intro-1 .progress-line .border-line`,
      );
      const introLine2 = document.querySelector(
        `.history-timeline .intro-2 .progress-line .border-line`,
      );
      setProgressLineWidth(introLine1, `100%`);
      setProgressLineWidth(introLine2, `100%`);
      // Intro Line 3
      const introLine3 = document.querySelector(
        `.history-timeline .intro-3 .progress-line .border-line`,
      );

      // Timeline Section  3
      timeline3 = gsap.timeline({
        scrollTrigger: {
          trigger: panel3.current,
          start: "top top",
          end: "+=" + window.innerWidth * 9.398,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Third Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-3");
              completeTimeline(".intro-3");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine3, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine3, "0%");
              inActiveTimeline(".intro-3");
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
      timeline3.to(wrapper3.current, {
        x: () =>
          wrapper3.current
            ? wrapper3.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel3.current,
          start: timeline3Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 9.398 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod3(timeline3);
    }
    // Return
    return () => {
      timelinePeriod3?.kill();
    };
  }, [pathname, pageDataFetched]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      timelinePeriod3?.pause();
    } else {
      timelinePeriod3?.resume();
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
            {/* Third Panel Start Here */}
            <div ref={timeline3Ref} className="timeline3" id="timeline3">
              <div
                ref={panel3}
                className="w-screen h-screen flex items-end justify-end"
              >
                <div
                  ref={wrapper3}
                  className={`section-wrapp flex flex-nowrap flex-row-reverse w-[939.8vw] min-w-[939.8vw] h-screen will-change-transform`}
                >
                  <Introduction
                    animated={isAllAnimationComplete}
                    bgImage={IntroBG2}
                    data={IntroData3}
                    extraClass={
                      "first-intro panel-section will-change-transform min-w-screen w-screen"
                    }
                    panel={timeline3Ref}
                    bgPosition=""
                    overlayClass="hidden"
                    bgClass="opacity-40"
                    bgOverlay={IntroBGoverlay}
                    audioControl={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    animationStatus={isAllAnimationComplete}
                    timeline="timeline3"
                  />
                  <Suspense
                    fallback={
                      <div className="min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <ArrowSliderSection
                      animWidthText={0}
                      extraClass={
                        "min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform"
                      }
                      bgImage={arrowSectionBG}
                      bgClass=""
                      bgPosition="center"
                      overlayClass="hidden"
                      slideData={SliderData}
                      sectionImage={sectionImage}
                      panel={timeline3Ref}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <EvidenceOfPeriod
                      animWidthText={14.65}
                      extraClass={
                        "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline3Ref}
                      videoControl={setIsVideoPopupOpen}
                      data={
                        chroniclesPageData?.acf?.timeline_3
                          ?.evidence_of_period || []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <TitleSection
                      animWidthText={15}
                      extraClass={
                        "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                      }
                      leftShape={false}
                      rightShape={false}
                      panel={timeline3Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_3?.title_section || ""
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <RabbisPeriodSection
                      animWidthText={15.9}
                      extraClass={
                        "min-w-screen w-screen h-screen panel-section will-change-transform"
                      }
                      panel={timeline3Ref}
                      activeMenu={activeRabbisMenu}
                      activeMenuFunction={setActiveRabbisMenu}
                      data={
                        chroniclesPageData?.acf?.timeline_3
                          ?.past_rabbis_section || []
                      }
                      rabbisData={SetListOfRabbis}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <MarkOfTheRoad3
                      animWidthText={17}
                      extraClass={
                        "min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline3Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_3?.mark_of_the_road ||
                        []
                      }
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <IntroductionContent
                      animated={isAllAnimationComplete}
                      bgImage={
                        chroniclesPageData?.acf?.timeline_3?.intro_banner
                          ?.background || introBG3
                      }
                      data={IntroContentData}
                      extraClass={
                        "panel-section will-change-transform min-w-screen w-screen"
                      }
                      panel={timeline3Ref}
                      timeline="timeline3"
                      bgPosition=""
                      overlayClass="bg-[#000000] opacity-40"
                      bgClass=""
                      bgOverlay={""}
                      audioControl={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                      animWidthText={19.9}
                    />
                  </Suspense>
                  <Suspense
                    fallback={
                      <div className="min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform bg-black" />
                    }
                  >
                    <LambOfferingSection
                      animWidthText={20.65}
                      extraClass={
                        "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                      }
                      panel={timeline3Ref}
                      data={
                        chroniclesPageData?.acf?.timeline_3
                          ?.lamb_offering_section || []
                      }
                    />
                  </Suspense>
                </div>
              </div>
            </div>
            {/* Third Panel End Here */}
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
