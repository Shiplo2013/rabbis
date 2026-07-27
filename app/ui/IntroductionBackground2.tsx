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

export default function IntroductionBackground2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Get Intro Right Position
  function getRightPosition(selector: any) {
    const intro = selector;
    if (!intro) return 0;
    const introObj = intro.getBoundingClientRect();
    const introRight = Math.floor(window.innerWidth - introObj.right);
    return introRight;
  }
  // Selector
  const background = useRef<HTMLDivElement>(null);
  // Seciton Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window !== "undefined" &&
        background.current &&
        props.animatePosition > 0 &&
        props.offsetTopAdded &&
        window.innerWidth > 1024
      ) {
        // Banner Background
        gsap.set(background.current, { scale: 1.4, x: "20vw" });
        const bannerAnimation = gsap.to(background.current, {
          x: "-20vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                getRightPosition(background.current) -
                window.innerWidth * 0.5
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
            },
            scrub: 2,
          },
        });
        animations.push(bannerAnimation);
      }
      // Return function to kill animations on unmount or dependency change
      return () => {
        animations.forEach((animation) => animation.kill());
      };
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
        src={props.bgImage.url || props?.bgImage?.src}
        width={`${props?.bgImage?.width > 1920 ? props?.bgImage?.width : "1920"}`}
        height={`${props?.bgImage?.width > 1080 ? props?.bgImage?.width : "1080"}`}
        blurDataURL={
          CreateShimmerDataUrl(props?.bgImage?.width, props?.bgImage?.height) ||
          props?.bgImage?.blurDataURL
        }
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
