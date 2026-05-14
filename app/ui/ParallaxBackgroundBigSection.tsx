"use client";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import GetRightPosition from "./GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  animatePosition: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function ParallaxBackgroundBigSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Animation
  useGSAP(
    () => {
      if (props.animatePosition !== 0) {
        // Banner Background
        gsap.set(background.current, { scale: 1.2, x: "100vw" });
        gsap.to(background.current, {
          x: "-100vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(background.current) +
                window.innerWidth * 0.4
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 5;
            },
            scrub: 2,
          },
        });
      }
    },
    { scope: background, dependencies: [pathname] },
  );

  return (
    <div
      ref={background}
      style={{ backgroundImage: `url(${props.bgImage.src})` }}
      className={`parallax-background bg-contain bg-repeat-y absolute top-0 right-0 w-full h-screen bg-black z-10 transition-none`}
    ></div>
  );
}
