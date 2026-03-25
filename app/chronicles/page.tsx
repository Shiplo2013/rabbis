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
import HistoryImage1 from "../assets/images/single-image.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ArrowSliderSection from "../components/history/ArrowSliderSection";
import ContentSection2 from "../components/history/ContentSection2";
import EvidenceOfPeriod from "../components/history/EvidenceOfPeriod";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import ImageOnlySection from "../components/history/ImageOnlySection";
import ImageOnlySection2 from "../components/history/ImageOnlySection2";
import Introduction from "../components/history/Introduction";
import LambOfferingSection from "../components/history/LambOfferingSection";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import MarkOfTheRoad3 from "../components/history/MarkOfTheRoad3";
import MoveToJerusalem from "../components/history/MoveToJerusalem";
import NewsPapperSection from "../components/history/NewsPapperSection";
import OnlyTextSection from "../components/history/OnlyTextSection";
import OnlyTextSection2 from "../components/history/OnlyTextSection2";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import RabbisTimeline2 from "../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../components/history/RabbisTimeline3";
import SingleVideoSection from "../components/history/SingleVideoSection";
import TitleSection from "../components/history/TitleSection";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Contact() {
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

  // Load Page
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true") {
        // Set Title
        const headingTitle = document.querySelector(
          ".first-intro .split-title",
        );
        // Subtitle
        const headingContent = document.querySelector(
          ".first-intro .split-content",
        );
        // Page Timeline
        const headingTitleSpan = headingTitle?.querySelector("span");
        const headingContentSpan = headingContent?.querySelector("span");
        if (headingTitleSpan) {
          gsap.set(headingTitleSpan, {
            opacity: 0,
            yPercent: 100,
          });
        }
        if (headingContentSpan) {
          gsap.set(headingContentSpan, {
            opacity: 0,
            yPercent: 100,
          });
        }
        if (history.current) {
          gsap.set(history.current, { opacity: 0, y: 50 });
        }
        // Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
          },
        });
        tl.to("#page", {
          opacity: 1,
          ease: "easeInOut",
          duration: 1,
          delay: 0,
        })
          .to(
            ".header-left",
            {
              opacity: 1,
              y: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=1",
          )
          .to(
            ".header-right",
            {
              opacity: 1,
              x: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=1",
          );
        if (headingTitleSpan) {
          tl.to(
            headingTitleSpan,
            {
              duration: 0.8,
              yPercent: 0,
              opacity: 1,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
        if (headingContentSpan) {
          tl.to(
            headingContentSpan,
            {
              duration: 0.8,
              yPercent: 0,
              opacity: 1,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
        if (history.current) {
          tl.to(
            history.current,
            {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
      }
    });
  }, [animationPlayed]);

  // Container width
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

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
    ScrollTrigger.normalizeScroll(true);
    let verticalSection = null;
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
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
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 50,
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
              gsap.to(introLine1, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
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
              gsap.to(introLine2, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
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
              gsap.to(introLine3, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
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
              gsap.to(introLine4, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
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
              gsap.to(introLine5, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
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

            if (self.progress > 0.99) {
              gsap.to(history.current, {
                display: "none",
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(history.current, {
                display: "block",
                duration: 0.1,
                delay: 0,
              });
            }
          },
        },
      });
      verticalSection.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
      });
    }
    // Return
    return () => {
      verticalSection?.kill();
    };
  }, [pathname]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useGSAP(() => {
    document.fonts.ready.then(() => {
      //   // Section Title 1
      //   const splititle = TextSplitLines(".demoText");
      //   gsap.to(splititle, {
      //     yPercent: 0,
      //     duration: 1,
      //     ease: "power3",
      //     stagger: 0.05,
      //     scrollTrigger: {
      //       start: () => {
      //         return window.innerWidth * 2;
      //       },
      //     },
      //   });
      //   // Section Title 2
      //   const splititle2 = TextSplitLines(".demoText2");
      //   gsap.to(splititle2, {
      //     yPercent: 0,
      //     duration: 1,
      //     ease: "power3",
      //     stagger: 0.05,
      //     scrollTrigger: {
      //       start: () => {
      //         return window.innerWidth * 2.5;
      //       },
      //     },
      //   });
    });
  }, [pathname]);
  return (
    <div id="page" className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <SmoothWrapper>
        <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[3775vw] h-screen`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                bgImage={""}
                bgOverlay={""}
                data={IntroData1}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="hidden"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <ContentSection2
                animWidthText={0.6}
                extraClass={
                  "min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={1.2}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"
                }
              />
              <SingleImageSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
                image={HistoryImage1}
              />
              <MarkOfTheRoad
                animWidthText={0.1}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline
                animWidthText={0.1}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <HistoryQuoteSection
                animWidthText={0.1}
                bgImage={""}
                extraClass={
                  "min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"
                }
                data={QuoteData}
                boxClass="translate-x-[6vw]"
              />
              <Introduction
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
                animWidthText={0.1}
                extraClass={
                  "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                }
                bgImage={NewsSectionBG}
              />
              <TitleSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"
                }
              />
              <MarkOfTheRoad2
                animWidthText={0.1}
                extraClass={
                  "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction
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
              />
              <ArrowSliderSection
                animWidthText={0.1}
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
                animWidthText={0.1}
                extraClass={
                  "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={true}
              />
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"
                }
              />
              <MarkOfTheRoad3
                animWidthText={0.1}
                extraClass={
                  "min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction
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
              />
              <LambOfferingSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                }
              />
              <Introduction
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
              />
              <MoveToJerusalem
                animWidthText={0.1}
                extraClass={
                  "min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={false}
              />
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline2
                animWidthText={0.1}
                extraClass={
                  "min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <HistoryQuoteSection
                animWidthText={0.1}
                bgImage={""}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                data={QuoteData2}
                boxClass="max-w-[40vw]"
              />
              <Introduction
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
              />
              <OnlyTextSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
              />
              <ArrowSliderSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform"
                }
                bgImage={arrowSectionBG2}
                bgClass=""
                bgPosition="center"
                overlayClass="hidden"
                SlideData={SliderData}
                sectionImage={arrowSectionImage}
              />
              <ImageOnlySection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
              />
              <SingleVideoSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"
                }
              />
              <TitleSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                }
                leftShape={true}
                rightShape={false}
              />
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline3
                animWidthText={0.1}
                extraClass={
                  "min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <Introduction
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
              />
              <OnlyTextSection2
                animWidthText={0.1}
                extraClass={
                  "min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"
                }
              />
              <ImageOnlySection2
                animWidthText={0.1}
                extraClass={
                  "min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"
                }
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
