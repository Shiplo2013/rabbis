"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  default as arrowSectionBG,
  default as arrowSectionBG2,
} from "../assets/images/arrow-section-bg.jpg";
import sectionImage from "../assets/images/arrow-section-image.jpg";
import arrowSectionImage from "../assets/images/arrow-section-image2.jpg";
import timelineBG from "../assets/images/history-bg.jpg";
import introBG5 from "../assets/images/intro-bg-5.jpg";
import introBG6 from "../assets/images/intro-bg-6.jpg";
import introBG7 from "../assets/images/intro-bg-7.jpg";
import IntroBG2 from "../assets/images/intro-bg.jpg";
import IntroBGoverlay from "../assets/images/intro-bg2.png";
import introBG3 from "../assets/images/intro-bg3.jpg";
import IntroBG from "../assets/images/introduction-bg.jpg";
import NewsSectionBG from "../assets/images/new-section-bg2.jpg";
import OnlyImage from "../assets/images/only-image.jpg";
import OnlyImage2 from "../assets/images/only-image2.jpg";
import QuoteSectionBG from "../assets/images/quote-section-bg.jpg";
import HistoryImage1 from "../assets/images/single-image.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ArrowSliderSection from "../components/history/ArrowSliderSection";
import ContentSection2 from "../components/history/ContentSection2";
import EvidenceOfPeriod from "../components/history/EvidenceOfPeriod";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import HistoryQuoteSection2 from "../components/history/HistoryQuoteSection2";
import ImageOnlySection from "../components/history/ImageOnlySection";
import ImageOnlySection2 from "../components/history/ImageOnlySection2";
import ImageWithTextSection from "../components/history/ImageWithTextSection";
import Introduction from "../components/history/Introduction";
import Introduction2 from "../components/history/Introduction2";
import LambOfferingSection from "../components/history/LambOfferingSection";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import MarkOfTheRoad3 from "../components/history/MarkOfTheRoad3";
import MarkOfTheRoad4 from "../components/history/MarkOfTheRoad4";
import MoveToJerusalem from "../components/history/MoveToJerusalem";
import NewsPapperSection from "../components/history/NewsPapperSection";
import OnlyImageSection from "../components/history/OnlyImageSection";
import OnlyParallaxImageSection from "../components/history/OnlyParallaxImageSection";
import OnlyTextSection from "../components/history/OnlyTextSection";
import OnlyTextSection2 from "../components/history/OnlyTextSection2";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import RabbisTimeline2 from "../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../components/history/RabbisTimeline3";
import RabbisTimeline4 from "../components/history/RabbisTimeline4";
import SingleVideoSection from "../components/history/SingleVideoSection";
import TitleSection from "../components/history/TitleSection";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";
import TitleSplitChars from "../ui/TitleSplitChars";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function Page() {
  // Page Selectors
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const isHistoryHidden = useRef(false);
  const isHeaderLeftHidden = useRef(false);
  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title: `תרל"ז - תרע"ד`,
    },
    {
      id: 2,
      title: `תרע"ד - תרפ"ד`,
    },
    {
      id: 3,
      title: `תרפ"ד - תרפ"ט`,
    },
    {
      id: 4,
      title: `תרפ"ט - תשל"ו`,
    },
    {
      id: 5,
      title: `תשל״ו - תשנ״ז`,
    },
    {
      id: 6,
      title: `תשנ"ז - הווה`,
    },
  ];
  // Page Data
  const IntroData1 = [
    {
      title: `סלבודקא`,
      subtitle: `תרל"ז - תרע"ד`,
    },
  ];
  const IntroData2 = [
    {
      title: `מלחמת העולם<br/>הראשונה`,
      subtitle: `תרע"ד - תרפ"ד`,
    },
  ];
  const IntroData3 = [
    {
      title: `חברון`,
      subtitle: `תרפ"ד – תרפ"ט`,
    },
  ];
  const IntroData4 = [
    {
      title: `פרעות תרפ״ט`,
      subtitle: ``,
    },
  ];
  const IntroData5 = [
    {
      title: `ירושלים של מעלה`,
      subtitle: `תרפ"ט - תשל"ו`,
    },
  ];
  const IntroData6 = [
    {
      title: `גבעת<br/>מרדכי`,
      subtitle: `תשל״ו - תשנ״ז`,
    },
  ];
  const IntroData7 = [
    {
      title: `הרחיבי מקום<br/>אוהלך`,
      subtitle: `תשנ"ז - הווה`,
    },
  ];
  const QuoteData = [
    {
      content: `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`,
    },
  ];
  const QuoteData2 = [
    {
      content: `<p><strong>שנת תשכ"ז:</strong> מינוי רבי רפאל אהרן יפהן לר"מ</p><p><strong>שנת תשכ"ח:</strong> רבי מרדכי חברוני לר"מ</p>`,
    },
  ];
  const QuoteData3 = [
    {
      content: `<p><strong>שנת תשפ"ב</strong><br/> הרחבת בית המדרש</p>`,
    },
  ];

  //Arrow Slider Data
  const SliderData = [
    {
      text1: `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
      text2: `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    },
  ];
  //Arrow Slider Data
  const SliderData2 = [
    {
      text1: `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
      text2: `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    },
  ];
  // Router Path
  const pathname = usePathname();
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Load Page
  useGSAP(() => {
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
      if (userVisit === "true" && animationPlayed) {
        // Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
          },
        });
        tl.to(main.current, {
          opacity: 1,
          ease: "none",
          duration: 0.5,
          delay: 0,
        });
        tl.to(page.current, {
          opacity: 1,
          ease: "none",
          duration: 0,
          delay: 0,
        })
          .to(".header-left", {
            opacity: 1,
            ease: "none",
            duration: 1,
          })
          .to(
            ".header-right",
            {
              opacity: 1,
              ease: "none",
              duration: 1,
            },
            "-=1",
          );
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
      }
    });
  }, [animationPlayed]);

  // Get Intro Right Position
  function getRightPosition(selector: string) {
    const intro = document.querySelector(selector);
    if (!intro) return 0;
    const introObj = intro.getBoundingClientRect();
    const introRight = Math.floor(window.innerWidth - introObj.right);
    return introRight;
  }

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

  // Incomplete Timeline
  function incompleteTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("complete");
    if (hasActiveClass) {
      intro.classList.remove("complete");
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
    let timeline = null;
    if (typeof window !== "undefined" && panel) {
      const scurbScale = 2;
      // Select Part 1 timeline
      const intro2Right = getRightPosition(".second-intro");
      // Select Part 2 timeline
      const intro3Right = getRightPosition(".third-intro");
      // Select Part 3 timeline
      const intro4Right = getRightPosition(".fourth-intro");
      // Select Part 4 timeline
      const intro5Right = getRightPosition(".fifth-intro");
      // Select Part 5 timeline
      const intro6Right = getRightPosition(".sixth-intro");

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

      // Vertical Section
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 44.84,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // First Chapter
            const offsetRight = getRightPosition(".second-intro");
            if (offsetRight > 0 && offsetRight < intro2Right) {
              activeTimeline(".intro-1");
              completeTimeline(".intro-1");

              const introPercent = Math.round(
                ((intro2Right - offsetRight) / intro2Right) * 100,
              );
              gsap.set(introLine1, {
                width: `${introPercent}%`,
              });
            } else {
              inActiveTimeline(".intro-1");
            }
            // Second Chapter
            const offsetRight2 = getRightPosition(".third-intro");
            if (offsetRight2 > 0 && offsetRight2 < intro3Right - intro2Right) {
              const chapterWidth = intro3Right - intro2Right;
              const currentPost = chapterWidth - offsetRight2;
              activeTimeline(".intro-2");
              completeTimeline(".intro-2");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.set(introLine2, {
                width: `${introPercent}%`,
              });
            } else {
              inActiveTimeline(".intro-2");
            }
            // Third Chapter
            const offsetRight3 = getRightPosition(".fourth-intro");
            if (offsetRight3 > 0 && offsetRight3 < intro4Right - intro3Right) {
              const chapterWidth = intro4Right - intro3Right;
              const currentPost = chapterWidth - offsetRight3;
              activeTimeline(".intro-3");
              completeTimeline(".intro-3");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.set(introLine3, {
                width: `${introPercent}%`,
              });
            } else {
              inActiveTimeline(".intro-3");
            }
            // Fourth Chapter
            const offsetRight4 = getRightPosition(".fifth-intro");
            if (offsetRight4 > 0 && offsetRight4 < intro5Right - intro4Right) {
              const chapterWidth = intro5Right - intro4Right;
              const currentPost = chapterWidth - offsetRight4;
              activeTimeline(".intro-4");
              completeTimeline(".intro-4");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.set(introLine4, {
                width: `${introPercent}%`,
              });
            } else {
              inActiveTimeline(".intro-4");
            }
            // Fifth Chapter
            const offsetRight5 = getRightPosition(".sixth-intro");
            if (offsetRight5 > 0 && offsetRight5 < intro6Right - intro5Right) {
              const chapterWidth = intro6Right - intro5Right;
              const currentPost = chapterWidth - offsetRight5;
              activeTimeline(".intro-5");
              completeTimeline(".intro-5");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.set(introLine5, {
                width: `${introPercent}%`,
              });
            } else {
              inActiveTimeline(".intro-5");
            }
            // Sixth Chapter
            if (offsetRight5 < 0) {
              completeTimeline(".intro-6");
              activeTimeline(".intro-6");
            } else {
              inActiveTimeline(".intro-6");
            }

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
      timeline.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current?.offsetTop,
          end: "+=" + (window.innerWidth * 44.84 - 500),
          scrub: scurbScale,
        },
      });
      setVerticalSection(timeline);
    }
    // Return
    return () => {
      verticalSection?.kill();
    };
  }, [pathname]);

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
    document.body.classList.remove("!overflow-auto");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
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

  return (
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
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[4484.6vw] h-screen will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={""}
                bgOverlay={""}
                data={IntroData1}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-40"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <ContentSection2
                animWidthText={0.4}
                extraClass={
                  "min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={0.9}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={1.8}
                extraClass={
                  "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                }
              />
              <SingleImageSection
                animWidthText={2.7}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
                image={HistoryImage1}
              />
              <MarkOfTheRoad
                animWidthText={3}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline
                animWidthText={4.6}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <HistoryQuoteSection
                animWidthText={6.1}
                bgImage={""}
                extraClass={
                  "min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"
                }
                data={QuoteData}
                boxClass="translate-x-[6vw]"
              />
              <Introduction2
                animWidthText={6.9}
                animated={isAllAnimationComplete}
                bgImage={IntroBG}
                bgOverlay={""}
                data={IntroData2}
                extraClass={
                  "second-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#57717A] opacity-70"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <NewsPapperSection
                animWidthText={7.8}
                extraClass={
                  "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                }
                bgImage={NewsSectionBG}
              />
              <TitleSection
                animWidthText={8.6}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={9.5}
                extraClass={
                  "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                }
              />
              <MarkOfTheRoad2
                animWidthText={10.3}
                extraClass={
                  "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction2
                animated={isAllAnimationComplete}
                bgImage={IntroBG2}
                data={IntroData3}
                extraClass={
                  "third-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="hidden"
                bgClass="opacity-40"
                bgOverlay={IntroBGoverlay}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animWidthText={13}
              />
              <ArrowSliderSection
                animWidthText={14}
                extraClass={
                  "min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform"
                }
                bgImage={arrowSectionBG}
                bgClass=""
                bgPosition="center"
                overlayClass="hidden"
                SlideData={SliderData}
                sectionImage={sectionImage}
              />
              <EvidenceOfPeriod
                animWidthText={14.65}
                extraClass={
                  "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={15}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={15.9}
                extraClass={
                  "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                }
              />
              <MarkOfTheRoad3
                animWidthText={17}
                extraClass={
                  "min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction2
                animated={isAllAnimationComplete}
                bgImage={introBG3}
                data={IntroData4}
                extraClass={
                  "panel-section will-change-transform min-w-[75vw] w-[75vw]"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-40"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animWidthText={19.9}
              />
              <LambOfferingSection
                animWidthText={20.65}
                extraClass={
                  "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction2
                animated={isAllAnimationComplete}
                bgImage={introBG5}
                data={IntroData5}
                extraClass={
                  "fourth-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#43493B] opacity-80"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animWidthText={22.3}
              />
              <MoveToJerusalem
                animWidthText={23.3}
                extraClass={
                  "min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={24.3}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={false}
              />
              <RabbisPeriodSection
                animWidthText={25.3}
                extraClass={
                  "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline2
                animWidthText={26.1}
                extraClass={
                  "min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <HistoryQuoteSection
                animWidthText={30.3}
                bgImage={""}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                data={QuoteData2}
                boxClass="max-w-[40vw]"
              />
              <Introduction2
                animated={isAllAnimationComplete}
                bgImage={introBG6}
                data={IntroData6}
                extraClass={
                  "fifth-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-60"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animWidthText={31.2}
              />
              <OnlyTextSection
                animWidthText={31.6}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
              />
              <ArrowSliderSection
                animWidthText={32.3}
                extraClass={
                  "min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform"
                }
                bgImage={arrowSectionBG2}
                bgClass=""
                bgPosition="center"
                overlayClass="hidden"
                SlideData={SliderData2}
                sectionImage={arrowSectionImage}
              />
              <ImageOnlySection
                animWidthText={32.6}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
              />
              <SingleVideoSection
                animWidthText={33.2}
                extraClass={
                  "min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={33.4}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={false}
              />
              <RabbisPeriodSection
                animWidthText={34.2}
                extraClass={
                  "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline3
                animWidthText={35.1}
                extraClass={
                  "min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <Introduction2
                animated={isAllAnimationComplete}
                bgImage={introBG7}
                data={IntroData7}
                extraClass={
                  "sixth-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-20"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animWidthText={36.6}
              />
              <OnlyTextSection2
                animWidthText={37.2}
                extraClass={
                  "min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"
                }
              />
              <ImageOnlySection2
                animWidthText={38}
                extraClass={
                  "min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline4
                extraClass={
                  "panel-section will-change-transform min-w-[210vw] w-[210vw]"
                }
                animWidthText={38.4}
              />
              <OnlyParallaxImageSection
                extraClass={
                  "panel-section will-change-transform min-w-[61.8vw] w-[61.8vw]"
                }
                image={OnlyImage}
                animWidthText={40}
              />
              <MarkOfTheRoad4
                animWidthText={41.2}
                extraClass={
                  "min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform"
                }
              />
              <ImageWithTextSection
                extraClass={
                  "min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform"
                }
                animWidthText={42.7}
              />
              <OnlyImageSection
                extraClass={
                  "panel-section will-change-transform min-w-[35.8vw] w-[35.8vw]"
                }
                image={OnlyImage2}
                animWidthText={43.5}
              />
              <HistoryQuoteSection2
                extraClass={
                  "panel-section will-change-transform min-w-[75vw] w-[75vw]"
                }
                animWidthText={44.2}
                bgImage={QuoteSectionBG}
                boxClass={""}
                data={QuoteData3}
              />
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <HistoryTimeline
        wrapperRef={history}
        progressRef={progress}
        timelineData={TimelineData}
      />
      <SlidingArrow />
    </div>
  );
}
