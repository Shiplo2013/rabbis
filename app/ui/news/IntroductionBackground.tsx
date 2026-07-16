import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "../plugins";

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
  apiImage?: any;
}

export default function IntroductionBackground(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const timeline = props.panel;
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(
    props?.apiImage
      ? props?.apiImage?.sizes?.intro_background ||
          props?.apiImage?.sizes?.large
      : props?.bgImage?.sizes?.intro_background ||
          props?.bgImage?.sizes?.large ||
          "",
  );
  const fallbackSrc = props?.bgImage?.src || props?.bgImage?.url || "";
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
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-900 absolute top-0 left-0 z-20"></div>
      )}
      {props?.bgImage && (
        <Image
          className={`w-full object-cover ${props.imagePosition === "bottom" ? "object-bottom" : "object-center"} h-full relative z-10`}
          src={imgSrc}
          onError={() => setImgSrc(fallbackSrc)}
          onLoad={() => setLoading(false)}
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
