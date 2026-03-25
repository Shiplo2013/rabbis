"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { default as arrowSectionBG, default as arrowSectionBG2 } from "../assets/images/arrow-section-bg.jpg";
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
import ContentSection from "../components/history/ContentSection";
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
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
import SlidingArrow from "../ui/SlidingArrow";

gsap.registerPlugin(ScrollTrigger)

export default function ChroniclesHistory() {
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
    }
  ]
  const IntroData1 = [{
    title: `סלבודקא`,
    subtitle: `תרל"ז - תרע"ד`,
  }]
  const IntroData2 = [{
    title: `מלחמת העולם<br/>הראשונה`,
    subtitle: `תרע"ד - תרפ"ד`,
  }]
  const IntroData3 = [{
    title: `חברון`,
    subtitle: `תרפ"ד – תרפ"ט`,
  }]
  const IntroData4 = [{
    title: `פרעות תרפ״ט`,
  }]
  const IntroData5 = [{
    title: `ירושלים של מעלה`,
    subtitle: `תרפ"ט - תשל"ו`,
  }]
  const IntroData6 = [{
    title: `גבעת<br/>מרדכי`,
    subtitle: `תשל״ו - תשנ״ז`,
  }]
  const IntroData7 = [{
    title: `הרחיבי מקום<br/>אוהלך`,
    subtitle: `תשנ"ז - הווה`,
  }]
  const QuoteData = [{
    content: `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`
  }]
  const QuoteData2 = [{
    content: `<p><strong>שנת תשכ"ז:</strong> מינוי רבי רפאל אהרן יפהן לר"מ</p><p><strong>שנת תשכ"ח:</strong> רבי מרדכי חברוני לר"מ</p>`
  }]

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

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  const mainContainer = useRef(null);
  const panel = useRef(null);
  const wrapper = useRef(null);
  const history = useRef(null);
  const progress = useRef(null);
  // User Router
  const pathname = usePathname();
  const {contextSafe} = useGSAP();

  // Get Intro Right Position
  function getRightPosition(selector) {
      const intro = document.querySelector(selector);
      const introObj = intro.getBoundingClientRect();
      const introRight = Math.floor(window.innerWidth - introObj.right);
      return introRight;
  }

  // Complete Timeline Function
  function completeTimeline(selector) {
    // Timeline Complete
    const intro = document.querySelector(`.history-timeline ${selector}`);
    const hasActiveClass = intro.classList.contains("complete");
    if(!hasActiveClass) {
      intro.classList.add("complete");
    }
  }

  // Incomplete Timeline
  function incompleteTimeline(selector) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    const hasActiveClass = intro.classList.contains("complete");
    if(hasActiveClass) {
      intro.classList.remove("complete");
    }
  }

  // Active Timeline
  function activeTimeline(selector) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    const hasActiveClass = intro.classList.contains("active");
    if(!hasActiveClass) {
      intro.classList.add("active");
    }
  }

  // Inactive Timeline
  function inActiveTimeline(selector) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    const hasActiveClass = intro.classList.contains("active");
    if(hasActiveClass) {
      intro.classList.remove("active");
    }
  }

  // Load Page 
  useGSAP(() => {
    document.fonts.ready.then(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Set Title
      const headingTitle = document.querySelector('.first-intro .split-title');
      // Subtitle 
      const headingContent = document.querySelector('.first-intro .split-content');
      // Page Timeline
      gsap.set(headingTitle.querySelector("span"), {opacity: 0, yPercent: 100});
      gsap.set(headingContent.querySelector("span"), {opacity: 0, yPercent: 100});
      gsap.set(history.current, {opacity: 0, y: 50});
      // Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Set Animation Played to true
          setIsAllAnimationComplete(true);
        }
      });
      tl.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      })
      .to(".header-left", {
        opacity: 1,
        y: 0,
        ease: "easeInOut",
        duration: 1,
      }, "-=1")
      .to(".header-right", {
        opacity: 1,
        x: 0,
        ease: "easeInOut",
        duration: 1,
      }, "-=1")
      .to(headingTitle.querySelector("span"), {
        duration: 0.8,
        yPercent: 0,
        opacity: 1,
        ease: "easeInOut",
      }, "-=0.4")
      .to(headingContent.querySelector("span"), {
        duration: 0.8,
        yPercent: 0,
        opacity: 1,
        ease: "easeInOut",
      }, "-=0.4")
    .to(history.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "easeInOut",
    }, "-=0.4");
    }
  });
  }, [animationPlayed]);

  // Page Section Animation
  useGSAP(() => {
    ScrollTrigger.normalizeScroll(true);
    if (typeof window !== 'undefined' && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = true;
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
      const introLine1 = document.querySelector(`.history-timeline .intro-1 .progress-line .border-line`);
      // Intro Line 2
      const introLine2 = document.querySelector(`.history-timeline .intro-2 .progress-line .border-line`);
      // Intro Line 3
      const introLine3 = document.querySelector(`.history-timeline .intro-3 .progress-line .border-line`);
      // Intro Line 4
      const introLine4 = document.querySelector(`.history-timeline .intro-4 .progress-line .border-line`);
      // Intro Line 5
      const introLine5 = document.querySelector(`.history-timeline .intro-5 .progress-line .border-line`);
      
      // New Scrolling
      ScrollTrigger.create({
        trigger: panel.current,
        start: 'top top',
        end: () => "+=" + (wrapper.current.scrollWidth),
      });
      let sections = gsap.utils.toArray(".panel-section");
      gsap.set(sections, {x: () => { return -(wrapper.current.scrollWidth - (window.innerWidth)) }});
      gsap.to(sections, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper.current,
          pin: panel.current,
          //pinSpacing: true,
          scrub: 2,
          end: () => "+=" + (wrapper.current.scrollWidth),
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
        }
      });
      // History Content
      //const historyTitle = TextSplitLines(".history-content .hiscont-title");
      
    }
    // Return
    return () => {
      ScrollTrigger.refresh();
    };
  }, [pathname]);

  // Scroll Top On realod
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div 
    ref={mainContainer}
    id="page"
    className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
        <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-row-reverse w-[3775vw] h-screen items-center will-change-transform`}
            >
              <Introduction animated={isAllAnimationComplete} bgImage={""} bgOverlay={""} data={IntroData1} extraClass={"first-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel}  bgPosition="" overlayClass="hidden" bgClass="" />
              <ContentSection animWidthText={0.1} extraClass={"min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"} />
              <TitleSection animWidthText={2} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} leftShape={true} rightShape={true} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"} />
              <SingleImageSection animWidthText={0.1} extraClass={"min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"} image={HistoryImage1} />
              <MarkOfTheRoad animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"} />
              <RabbisTimeline animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"} bgImage={timelineBG} />
              <HistoryQuoteSection animWidthText={0.1} extraClass={"min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"} data={QuoteData} boxClass="translate-x-[6vw]" />
              <Introduction animated={isAllAnimationComplete} bgImage={IntroBG} bgOverlay={""} data={IntroData2} extraClass={"second-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="bg-[#57717A] opacity-70" bgClass="" />
              <NewsPapperSection animWidthText={0.1} extraClass={"min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"} bgImage={NewsSectionBG} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} leftShape={true} rightShape={true} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"} />
              <MarkOfTheRoad2 animWidthText={0.1} extraClass={"min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"} />
              <Introduction animated={isAllAnimationComplete} bgImage={IntroBG2} data={IntroData3} extraClass={"third-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="hidden" bgClass="opacity-40" bgOverlay={IntroBGoverlay} />
              <ArrowSliderSection animWidthText={0.1} extraClass={"min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform"} bgImage={arrowSectionBG} bgClass="" bgPosition="center" overlayClass="hidden" SlideData={SliderData} sectionImage={sectionImage} />
              <EvidenceOfPeriod animWidthText={0.1} extraClass={"min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} leftShape={true} rightShape={true} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"} />
              <MarkOfTheRoad3 animWidthText={0.1} extraClass={"min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"} />
              <Introduction animated={isAllAnimationComplete} bgImage={introBG3} data={IntroData4} extraClass={"panel-section will-change-transform min-w-[75vw] w-[75vw]"} panel={panel} bgPosition="" overlayClass="bg-[#000000] opacity-40" bgClass="" bgOverlay={""} />
              <LambOfferingSection animWidthText={0.1} extraClass={"min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"} />
              <Introduction animated={isAllAnimationComplete} bgImage={introBG5} data={IntroData5} extraClass={"fourth-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="bg-[#43493B] opacity-80" bgClass="" bgOverlay={""} />
              <MoveToJerusalem animWidthText={0.1} extraClass={"min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} leftShape={true} rightShape={false} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"} />
              <RabbisTimeline2 animWidthText={0.1} extraClass={"min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"} bgImage={timelineBG} />
              <HistoryQuoteSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} data={QuoteData2} boxClass="max-w-[40vw]" />
              <Introduction animated={isAllAnimationComplete} bgImage={introBG6} data={IntroData6} extraClass={"fifth-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="bg-[#000000] opacity-60" bgClass="" bgOverlay={""} />
              <OnlyTextSection animWidthText={0.1} extraClass={"min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"} />
              <ArrowSliderSection animWidthText={0.1} extraClass={"min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform"} bgImage={arrowSectionBG2} bgClass="" bgPosition="center" overlayClass="hidden" SlideData={SliderData} sectionImage={arrowSectionImage} />
              <ImageOnlySection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} />
              <SingleVideoSection animWidthText={0.1} extraClass={"min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"} leftShape={true} rightShape={false} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen panel-section will-change-transform"} />
              <RabbisTimeline3 animWidthText={0.1} extraClass={"min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"} />
              <Introduction animated={isAllAnimationComplete} bgImage={introBG7} data={IntroData7} extraClass={"sixth-intro panel-section will-change-transform min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="bg-[#000000] opacity-20" bgClass="" bgOverlay={""} />
              <OnlyTextSection2 animWidthText={0.1} extraClass={"min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"} />
              <ImageOnlySection2 animWidthText={0.1} extraClass={"min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"} />
            </div>
          </div>
        </main>
      <Footer className={"relative z-20"} />
      <HistoryTimeline wrapperRef={history} progressRef={progress} timelineData={TimelineData} />
      <SlidingArrow />
    </div>
  );
}
