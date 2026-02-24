"use client";
import {
  gsap,
  useGSAP,
  ScrollToPlugin,
  ScrollTrigger,
} from "../app/ui/plugins";
import { useEffect, useRef } from "react";
import HomeBanner from "./components/home/HomeBanner";
import IntroSection from "./components/home/IntroSection";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      gsap.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      });
    }
  }, []);

  // Animation
  useGSAP(() => {
    const scrubValue = 0.5;
    let panelWrapper = document.getElementById("panel-wrapper");
    if (panelWrapper !== null) {
      ScrollTrigger.create({
        trigger: "#panel-wrapper",
        start: "top top",
        end: () => panelWrapper.scrollWidth - window.innerWidth,
        pin: true,
        anticipatePin: 1,
        scrub: scrubValue,
        invalidateOnRefresh: true,
      });
    }
  }, []);

  return (
    <div id="panel-wrapper">
      <div className="flex flex-nowrap w-[150vw]">
        <HomeBanner />
        <IntroSection />
      </div>
    </div>
  );
}
