"use client";
import { useEffect, useRef, useState } from "react";
import timelineBG from "../assets/images/history-bg.jpg";
import IntroBG from "../assets/images/introduction-bg.jpg";
import HistoryImage1 from "../assets/images/single-image.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ContentSection from "../components/history/ContentSection";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import Introduction from "../components/history/Introduction";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import TitleSection from "../components/history/TitleSection";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import { gsap, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
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

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  const panel = useRef(null);
  const wrapper = useRef(null);
  const history = useRef(null);
  const progress = useRef(null);

  // Load Page 
  useEffect(() => {
    document.fonts.ready.then(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Set Title
      const headingTitle = TitleSplit('.split-title', 'chars');
      // Subtitle 
      const headingContent = TitleSplit('.split-content', 'words');
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
          end: "+="+ (window.innerHeight * 10),
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
        ease: "slow.inOut",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current.offsetTop,
          end: "+="+ ((window.innerHeight * 10) - 300),
          scrub: scurbScale,
        }
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
  // Load Page
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Timeline
      const tl = gsap.timeline();
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
  }, []);
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[1000vw] h-screen items-center`}
            >
              <Introduction animated={isAllAnimationComplete} bgImage={""} data={IntroData1} extraClass={"panel-section min-w-screen w-screen"} panel={panel} />
              <ContentSection animWidthText={0.1} extraClass={"min-w-[80vw] w-[80vw] h-screen"} />
              <TitleSection animWidthText={0.1} extraClass={"min-w-[50vw] w-[50vw] h-screen"} />
              <RabbisPeriodSection animWidthText={0.1} extraClass={"min-w-[90vw] w-[90vw] h-screen"} />
              <SingleImageSection animWidthText={0.1} extraClass={"min-w-[32vw] w-[32vw] h-screen"} image={HistoryImage1} />
              <MarkOfTheRoad animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen"} />
              <RabbisTimeline animWidthText={0.1} extraClass={"min-w-[150vw] w-[150vw] h-screen"} bgImage={timelineBG} />
              <HistoryQuoteSection animWidthText={0.1} extraClass={"min-w-[45vw] w-[45vw] h-screen"} />
              <Introduction animated={isAllAnimationComplete} bgImage={IntroBG} data={IntroData2} extraClass={"panel-section min-w-screen w-screen"} panel={panel} />
              <section className="w-screen h-screen"></section>
              <section className="w-screen h-screen"></section>
            </div>
          </div>
        </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <HistoryTimeline wrapperRef={history} progressRef={progress} timelineData={TimelineData} />
    </div>
  );
}
