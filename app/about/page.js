"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import LoadingEffect from "../components/LoadingEffect";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP
} from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function About() {
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

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
      }, "-=0.5");
    }
  });
  }, [animationPlayed]);

  // Container width
  const panel = useRef(null);
  const wrapper = useRef(null);

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
          end: "+="+ (window.innerHeight * 6),
          scrub: scurbScale,
          pin: true,
        }
      });
      verticalSection.to(wrapper.current, {
        x: () => ((wrapper.current.offsetWidth)  - window.innerWidth),
        ease: "slow.inOut",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current.offsetTop,
          end: "+="+ ((window.innerHeight * 6) - 300),
          scrub: scurbScale,
        }
      });

    }
    // Return
    return () => {
      verticalSection.kill()
    };
  }, {scope: panel});

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
          <div ref={panel} id="panel-wrapper" className="w-screen h-screen flex items-end justify-end">
              <div ref={wrapper} id="section-wrapper" className={`section-wrapp flex flex-nowrap flex-row-reverse w-[510vw] h-screen`}>
              
              <MarkOfTheRoad2 animWidthText={0.1} extraClass={"min-w-[210vw] w-[210vw] h-screen"} />
              <section className="w-screen h-screen"></section>
              <section className="w-screen h-screen"></section>
              <section className="w-screen h-screen"></section>
              <section className="w-screen h-screen"></section>
              </div>
          </div>
      </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
    </div>
  );
}
