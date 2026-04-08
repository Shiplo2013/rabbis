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
  overlayClass: string;
  imagePosition: string;
  bgClass: string;
  animatePosition: number;
}

export default function VerticalBackgroundImage(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Seciton Animation
  useGSAP(
    () => {
      if (props.animatePosition > 0) {
        // Banner Background
        gsap.set(background.current, { scale: 1.2 });
        gsap.to(background.current, {
          y: "20vw",
          ease: "none",
          delay: 0,
          scrollTrigger: {
            trigger: ".introduction-background",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: background, dependencies: [pathname] },
  );
  return (
    <div
      ref={background}
      className={`introduction-background ${props.bgClass} absolute top-0 left-0 w-full h-full bg-black z-10 transition-none select-none pointer-events-none`}
    >
      <Image
        className={`w-full object-cover ${props.imagePosition === "bottom" ? "object-bottom" : "object-center"} h-full relative z-10`}
        src={props?.bgImage?.src}
        width={`${props?.bgImage?.width > 1920 ? props?.bgImage?.width : "1920"}`}
        height={`${props?.bgImage?.width > 1080 ? props?.bgImage?.width : "1080"}`}
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Introduction Background"
      />
      <div
        className={`absolute top-0 left-0 w-full h-full z-30 ${props.overlayClass}`}
      ></div>
    </div>
  );
}
