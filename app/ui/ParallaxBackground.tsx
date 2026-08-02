"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import GetRightPosition from "./GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  overlayLeft: boolean;
  overlayLeftColor: string;
  animatePosition: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function ParallaxBackground(props: ChildProps) {
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
        if (window.innerWidth > 1024) {
          gsap.set(background.current, { scale: 1.2, x: "20vw" });
          gsap.to(background.current, {
            x: "-20vw",
            ease: "none",
            scrollTrigger: {
              start: () => {
                return (
                  getTimelineOffset() + GetRightPosition(background.current)
                );
              },
              end: () => {
                return "+=" + window.innerWidth * 2;
              },
              scrub: 2,
            },
          });
        }
      }
    },
    { scope: background, dependencies: [pathname] },
  );
  return (
    <div
      ref={background}
      className={`parallax-background absolute top-0 left-0 w-full h-full lg:h-screen bg-black z-10 transition-none`}
    >
      {props.overlayLeft && (
        <div
          style={{
            backgroundImage: `linear-gradient(to right, ${props.overlayLeftColor}, ${props.overlayLeftColor}00)`,
          }}
          className="absolute left-0 top-0 w-25 h-full z-30"
        ></div>
      )}
      <Image
        className="parallax-image w-full object-cover object-center h-full relative z-10"
        src={props?.bgImage?.src}
        width="1920"
        height="1080"
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Parallax Background"
      />
    </div>
  );
}
