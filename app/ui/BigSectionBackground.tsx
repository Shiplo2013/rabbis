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
  overlayClass: string;
  imagePosition: string;
  bgClass: string;
  animatePosition: number;
  panel?: RefObject<HTMLDivElement | null>;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function BigSectionBackground(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Seciton Animation
  useGSAP(
    () => {
      if (props.animatePosition !== 0 && props.offsetTopAdded) {
        // Banner Background
        gsap.set(background.current, { scale: 1.2, x: "20vw" });
        gsap.to(background.current, {
          x: "-30vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(background.current) -
                window.innerWidth * 1.2
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 3.2;
            },
            scrub: 2,
          },
        });
      }
    },
    { scope: background, dependencies: [pathname, props.offsetTopAdded] },
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
