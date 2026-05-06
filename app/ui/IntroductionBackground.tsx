import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
interface ChildProps {
  bgImage: any;
  panel?: RefObject<HTMLDivElement | null>;
  timeline?: string;
  overlayClass: string;
  imagePosition: string;
  bgClass: string;
  animatePosition: number;
}

export default function IntroductionBackground(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Seciton Animation
  useGSAP(
    () => {
      if (typeof window === "undefined") {
        return;
      }

      const setupAnimation = () => {
        if (!background.current || props.animatePosition <= 0) {
          return;
        }

        // Banner Background
        gsap.set(background.current, { scale: 1.2, x: "10vw" });
        gsap.to(background.current, {
          x: "-30vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return getTimelineOffset();
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
            },
            scrub: 2,
          },
        });

        // Ensure triggers recalculate after all assets are loaded.
        ScrollTrigger.refresh();
      };

      if (document.readyState === "complete") {
        setupAnimation();
        return;
      }

      const onLoad = () => {
        setupAnimation();
      };

      window.addEventListener("load", onLoad, { once: true });

      return () => {
        window.removeEventListener("load", onLoad);
      };
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
