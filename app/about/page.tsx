"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import arrowSectionBG2 from "../assets/images/arrow-section-bg.jpg";
import arrowSectionImage from "../assets/images/arrow-section-image2.jpg";
import timelineBG from "../assets/images/history-bg.jpg";
import introBG5 from "../assets/images/intro-bg-5.jpg";
import introBG6 from "../assets/images/intro-bg-6.jpg";
import introBG3 from "../assets/images/intro-bg3.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ArrowSliderSection from "../components/history/ArrowSliderSection";
import ContentSection from "../components/history/ContentSection";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import ImageOnlySection from "../components/history/ImageOnlySection";
import ImageOnlySection2 from "../components/history/ImageOnlySection2";
import Introduction from "../components/history/Introduction";
import LambOfferingSection from "../components/history/LambOfferingSection";
import MoveToJerusalem from "../components/history/MoveToJerusalem";
import OnlyTextSection from "../components/history/OnlyTextSection";
import OnlyTextSection2 from "../components/history/OnlyTextSection2";
import RabbisTimeline2 from "../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../components/history/RabbisTimeline3";
import SingleVideoSection from "../components/history/SingleVideoSection";
import TitleSection from "../components/history/TitleSection";
import LoadingEffect from "../components/LoadingEffect";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function About() {
  const IntroData1 = [
    {
      title: `סלבודקא`,
      subtitle: `תרל"ז - תרע"ד`,
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
  const IntroData4 = [
    {
      title: `פרעות תרפ״ט`,
      subtitle: ``,
    },
  ];
  const HistoryData = [
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
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Router
  const pathname = usePathname();

  // Load Page
  useEffect(() => {
    document.fonts.ready.then(() => {
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true") {
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
            "-=0.5",
          )
          .to(
            ".header-right",
            {
              opacity: 1,
              x: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=0.5",
          );
      }
    });
  }, [animationPlayed]);

  // Container width
  const panel = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);

  // Page Section Animation
  useGSAP(() => {
    let verticalSection = null;
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;

      // Vertical Section
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 10,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
        },
      });
      if (wrapper.current) {
        verticalSection.to(wrapper.current, {
          x: () => (wrapper.current?.offsetWidth || 0) - window.innerWidth,
          ease: "none",
        });
      }
      // History Content
      //const historyTitle = TextSplitLines(".history-content .hiscont-title");
    }
    // Return
    return () => {
      if (verticalSection) {
        verticalSection.kill();
      }
    };
  }, [pathname]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header animationStatus={false} />
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[1000vw] h-screen`}
            >
              <ContentSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline2
                animWidthText={0.1}
                extraClass={
                  "min-w-[405vw] w-[405vw] h-screen will-change-transform"
                }
                bgImage={timelineBG}
              />
              <OnlyTextSection2
                animWidthText={0.1}
                extraClass={
                  "min-w-[32.5vw] w-[32.5vw] h-screen will-change-transform"
                }
              />
              <ImageOnlySection2
                animWidthText={0.1}
                extraClass={
                  "min-w-[55.5vw] w-[55.5vw] h-screen will-change-transform"
                }
              />
              <RabbisTimeline3
                animWidthText={0.1}
                extraClass={
                  "min-w-[125vw] w-[125vw] h-screen will-change-transform"
                }
                bgImage={undefined}
              />
              <ArrowSliderSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[70vw] w-[70vw] h-screen will-change-transform"
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
                  "min-w-[50vw] w-[50vw] h-screen will-change-transform"
                }
              />
              <SingleVideoSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[26vw] w-[26vw] h-screen will-change-transform"
                }
              />
              <Introduction
                animated={isAllAnimationComplete}
                bgImage={introBG6}
                data={IntroData6}
                extraClass={
                  "panel-section min-w-[78vw] w-[78vw] will-change-transform"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-60"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animationStatus={false}
              />
              <OnlyTextSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen will-change-transform"
                }
              />
              <HistoryQuoteSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen will-change-transform"
                }
                data={HistoryData}
                boxClass="max-w-[40vw]"
                bgImage={undefined}
              />
              <MoveToJerusalem
                animWidthText={0.1}
                extraClass={
                  "min-w-[170vw] w-[170vw] h-screen will-change-transform"
                }
              />
              <TitleSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[50vw] w-[50vw] h-screen will-change-transform"
                }
                leftShape={true}
                rightShape={false}
              />
              <Introduction
                animated={isAllAnimationComplete}
                bgImage={introBG5}
                data={IntroData5}
                extraClass={
                  "panel-section min-w-screen w-screen will-change-transform"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#43493B] opacity-80"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animationStatus={false}
              />
              <LambOfferingSection
                animWidthText={0.1}
                extraClass={
                  "min-w-[146vw] w-[146vw] h-screen will-change-transform"
                }
              />
              <Introduction
                animated={isAllAnimationComplete}
                bgImage={introBG3}
                data={IntroData4}
                extraClass={
                  "panel-section min-w-[75vw] w-[75vw] will-change-transform"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-40"
                bgClass=""
                bgOverlay={""}
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animationStatus={false}
              />
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <SlidingArrow />
    </div>
  );
}
