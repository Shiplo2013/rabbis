"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import arrowSectionBG from "../assets/images/arrow-section-bg.jpg";
import ArrowSliderSection from "../components/history/ArrowSliderSection";
import EvidenceOfPeriod from "../components/history/EvidenceOfPeriod";
import Introduction from "../components/history/Introduction";
import LoadingEffect from "../components/LoadingEffect";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP
} from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";
import TitleSplit from "../ui/TitleSplit";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function About() {  
  const IntroData1 = [{
    title: `סלבודקא`,
    subtitle: `תרל"ז - תרע"ד`,
  }]
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

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
      }, "-=0.5");
    }
  });
  }, [animationPlayed]);

  // Container width
  const panel = useRef(null);
  const wrapper = useRef(null);
  const main = useRef(null);

  // Page Section Animation
  useGSAP(() => {
    let verticalSection = null;
    if (typeof window !== 'undefined' && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;

      const sections = gsap.utils.toArray(".panel-section");
      console.log(sections)
      
      // Vertical Section
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+="+ (window.innerHeight * sections.length),
          scrub: scurbScale,
          pin: true,
          markers: true,
        }
      });
      verticalSection.to(sections[0], {
        x: window.innerWidth+(window.innerWidth/2),
        duration: 2,
        delay: 0,
      })
      .to(sections[1], {
        x: (window.innerWidth+sections[1].offsetWidth)+(window.innerWidth/2),
        duration: ((window.innerWidth+sections[1].offsetWidth)/(window.innerWidth/2)),
        delay: 0,
        onUpdate: function() {
          gsap.to(sections[1].querySelector(".section-image"), {
            x: "-200px",
            scrollTrigger: {
              trigger: sections[1],
              start: "top right",
              end: "top left"
            }
          })
        }
      }, "-=2")
      .to(sections[2], {
        x: (window.innerWidth+sections[2].offsetWidth)+(window.innerWidth/2),
        duration: ((window.innerWidth+sections[1].offsetWidth)/(window.innerWidth/2)),
        delay: 0,
      }, "-=2");

    }
    // Return
    return () => {
      verticalSection.kill()
    };
  }, {scope: main});

  return (
    <div 
    ref={main}
    className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <SmoothWrapper>
      <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
      >
          <div ref={panel} id="panel-wrapper" className="w-screen h-screen flex items-end justify-end bg-black">
          </div>
      </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <div ref={wrapper} id="section-wrapper" className={`section-wrapp w-screen h-screen overflow-hidden fixed top-0 left-0`}>
            <Introduction animated={isAllAnimationComplete} bgImage={""} bgOverlay={""} data={IntroData1} extraClass={"panel-section min-w-screen w-screen"} panel={panel}  bgPosition="" overlayClass="hidden" bgClass="" />
            
            <ArrowSliderSection animWidthText={0.1} extraClass={"panel-section min-w-[65.8vw] w-[65.8vw] h-screen absolute top-0 right-full"} bgImage={arrowSectionBG} bgClass="" bgPosition="center" overlayClass="hidden" />
            <EvidenceOfPeriod animWidthText={0.1} extraClass={"panel-section min-w-[90vw] w-[90vw] h-screen absolute top-0 right-full"} />
            <section className="panel-section w-screen h-screen"></section>
            <section className="panel-section w-screen h-screen"></section>
            <section className="panel-section w-screen h-screen"></section>
            <section className="panel-section w-screen h-screen"></section>
          </div>
      <SlidingArrow />
    </div>
  );
}
