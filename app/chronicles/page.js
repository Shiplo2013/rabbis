"use client";
import { useEffect, useRef, useState } from "react";
import arrowSectionBG from "../assets/images/arrow-section-bg.jpg";
import timelineBG from "../assets/images/history-bg.jpg";
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
import Introduction from "../components/history/Introduction";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import MarkOfTheRoad3 from "../components/history/MarkOfTheRoad3";
import NewsPapperSection from "../components/history/NewsPapperSection";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import TitleSection from "../components/history/TitleSection";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import { gsap, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";
import TitleSplit from "../ui/TitleSplit";


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

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  const panel = useRef(null);
  const wrapper = useRef(null);
  const history = useRef(null);
  const progress = useRef(null);

  const {contextSafe} = useGSAP();

  // Load Page 
  useGSAP(() => {
    document.fonts.ready.then(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Set Title
      const headingTitle = TitleSplit('.first-intro .split-title', 'chars');
      // Subtitle 
      const headingContent = TitleSplit('.first-intro .split-content', 'words');
      // Page Timeline
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
      }, "-=0.5")
      .to(".header-right", {
        opacity: 1,
        x: 0,
        ease: "easeInOut",
        duration: 1,
      }, "-=0.5")
      .to(headingTitle, {
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.1
      }, "-=0.5")
      .to(headingContent, {
        duration: 0.3,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.07
      }, "-=0.5")
    .to(history.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "back.easeIn",
    }, "-=0.5");
    }
  });
  }, [animationPlayed]);

  // Page Section Animation
  useGSAP(() => {
    let verticalSection = null;
    if (typeof window !== 'undefined' && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;
      
      // Vertical Section
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+="+ (window.innerHeight * 30),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            //gsap.to(progress.current, { width: `${(100*self.progress)}%` });
            if(self.progress === 1) {
              gsap.to(history.current, {display: "none", duration: 0.1, delay: 0});
            } else {
              gsap.to(history.current, {display: "block", duration: 0.1, delay: 0});
            }
          }
        }
      });
      verticalSection.to(wrapper.current, {
        x: () => ((wrapper.current.offsetWidth)  - window.innerWidth),
        //duration: 50,
        ease: "sine.out"
      });
      // History Content Section
    //   const historyTitle = TitleSplit(".hiscont-title");
    //   gsap.to(historyTitle, {
    //         scrollTrigger: {
    //             trigger: ".historyTitle",
    //             toggleActions: "restart pause resume reverse",
    //             start: "left center",
    //             containerAnimation: verticalSection,
    //             scrub: true,
    //             markers: true,
    //             horizontal: true,
    //             invalidateOnRefresh: true,
    //         },
    //         duration: 0.5,
    //         yPercent: 0,
    //         opacity: 1,
    //         //rotationX: 180,
    //         //transformOrigin: "0% 50%",
    //         ease: "slow.inOut",
    //         stagger: 0.05,
    //     });
    }
    // Return
    return () => {
      verticalSection.kill()
    };
  }, {scope: panel});

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <div className="relative overflow-hidden">
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[2200vw] h-screen items-center`}
            >
              <Introduction animated={isAllAnimationComplete} bgImage={""} bgOverlay={""} data={IntroData1} extraClass={"first-intro panel-section min-w-screen w-screen"} panel={panel}  bgPosition="" overlayClass="hidden" bgClass="" />
              <ContentSection animWidthText={0.1} extraClass={"min-w-[80vw] w-[80vw] h-screen"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen"} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen"} />
              <SingleImageSection animWidthText={0.1} extraClass={"min-w-[32vw] w-[32vw] h-screen"} image={HistoryImage1} />
              <MarkOfTheRoad animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen"} />
              <RabbisTimeline animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen"} bgImage={timelineBG} />
              <HistoryQuoteSection animWidthText={0.1} extraClass={"min-w-[45vw] w-[45vw] h-screen"} />
              <Introduction animated={isAllAnimationComplete} bgImage={IntroBG} bgOverlay={""} data={IntroData2} extraClass={"panel-section min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="bg-[#57717A] opacity-70" bgClass="" />
              <NewsPapperSection animWidthText={0.1} extraClass={"min-w-[128vw] w-[128vw] h-screen"} bgImage={NewsSectionBG} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen"} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen"} />
              <MarkOfTheRoad2 animWidthText={0.1} extraClass={"min-w-[210vw] w-[210vw] h-screen"} />
              <Introduction animated={isAllAnimationComplete} bgImage={IntroBG2} data={IntroData3} extraClass={"panel-section min-w-screen w-screen"} panel={panel} bgPosition="" overlayClass="hidden" bgClass="opacity-40" bgOverlay={IntroBGoverlay} />
              <ArrowSliderSection animWidthText={0.1} extraClass={"min-w-[65.8vw] w-[65.8vw] h-screen"} bgImage={arrowSectionBG} bgClass="" bgPosition="center" overlayClass="hidden" />
              <EvidenceOfPeriod animWidthText={0.1} extraClass={"min-w-[93vw] w-[93vw] h-screen"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen"} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen"} />
              <MarkOfTheRoad3 animWidthText={0.1} extraClass={"min-w-[285vw] w-[285vw] h-screen"} />
              <Introduction animated={isAllAnimationComplete} bgImage={introBG3} data={IntroData4} extraClass={"panel-section min-w-[75vw] w-[75vw]"} panel={panel} bgPosition="" overlayClass="bg-[#000000] opacity-40" bgClass="" bgOverlay={""} />
              <section className="w-screen h-screen"></section>
            </div>
          </div>
        </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <HistoryTimeline wrapperRef={history} progressRef={progress} timelineData={TimelineData} />
      <SlidingArrow />
      
    </div>
  );
}
