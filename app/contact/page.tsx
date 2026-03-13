"use client";
import { useEffect, useState } from "react";
import IntroBG from "../assets/images/introduction-bg.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Introduction from "../components/history/Introduction";
import LoadingEffect from "../components/LoadingEffect";
import { gsap } from "../ui/plugins";

export default function Contact() {
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
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
  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <main
        id="page"
        dir="ltr"
        className="main opacity-0 relative overflow-hidden z-10"
      >
        <div className="h-screen w-screen flex items-center justify-center relative">
          <Introduction
            animated={isAllAnimationComplete}
            bgImage={IntroBG}
            extraClass={"panel-section min-w-screen w-screen"}
            audioControl={function (): void {
              throw new Error("Function not implemented.");
            }}
            panel={undefined}
            data={[]}
          />
        </div>
        <div className="h-screen w-screen flex items-center justify-center"></div>
      </main>
      <Footer className={"relative z-20"} />
    </div>
  );
}
