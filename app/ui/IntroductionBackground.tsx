import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
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
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function IntroductionBackground(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const timeline = props.panel;
  // Selector
  const background = useRef<HTMLDivElement>(null);

  // Seciton Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (
      typeof window === "undefined" ||
      !background.current ||
      props.animatePosition <= 0
    ) {
      return;
    }

    if (!background.current || props.animatePosition <= 0) {
      return;
    }
    // Get Offset Top of Timeline
    const getTimelineOffset = () => {
      return (
        props.offsetTopTimeline ||
        (timeline?.current ? timeline.current.offsetTop : 0)
      );
    };

    // Banner Background
    gsap.set(background.current, { scale: 1.2, x: "10vw" });
    const animation = gsap.to(background.current, {
      x: "-20vw",
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
    animations.push(animation);

    // Return Cleanup Function
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname]);
  return (
    <div
      ref={background}
      className={`introduction-background ${props.bgClass} absolute top-0 left-0 w-full h-full bg-black z-10 transition-none select-none pointer-events-none`}
    >
      {props?.bgImage && (
        <Image
          className={`w-full object-cover ${props.imagePosition === "bottom" ? "object-bottom" : "object-center"} h-full relative z-10`}
          src={
            props?.bgImage?.sizes?.intro_background ||
            props?.bgImage?.url ||
            props?.bgImage?.src ||
            ""
          }
          width={`${props?.bgImage?.width > 1920 ? props?.bgImage?.width : "1920"}`}
          height={`${props?.bgImage?.height > 1080 ? props?.bgImage?.height : "1080"}`}
          blurDataURL={CreateShimmerDataUrl(
            props?.bgImage?.width || 1920,
            props?.bgImage?.height || 1080,
          )}
          placeholder={"blur"}
          loading="lazy"
          alt="Introduction Background"
        />
      )}
      {props?.bgImage && (
        <div
          className={`absolute top-0 left-0 w-full h-full z-30 ${props.overlayClass}`}
        ></div>
      )}
    </div>
  );
}
