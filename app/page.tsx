"use client";
import gsap from "gsap";
import { useEffect } from "react";
import HomeBanner from "./components/home/HomeBanner";
import IntroSection from "./components/home/IntroSection";

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

  return (
    <>
      <HomeBanner />
      <IntroSection />
    </>
  );
}
