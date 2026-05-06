"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  overlayLeft: boolean;
  overlayLeftColor: string;
  animatePosition: number;
}

export default function ParallaxBackground(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Animation
  useGSAP(
    () => {
      if (props.animatePosition !== 0) {
        // Banner Background
        gsap.set(background.current, { scale: 1.2, x: "30vw" });
        gsap.to(background.current, {
          x: "-20vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animatePosition - 0.5);
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
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
      className={`parallax-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
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
