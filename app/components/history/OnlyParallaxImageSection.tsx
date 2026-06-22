import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "@/app/ui/plugins";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  image: StaticImageData | any;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function OnlyParallaxImageSection(props: ChildProps) {
  // Select Background Element
  const background = useRef(null);
  // Route
  const pathname = usePathname();
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // GSAP Context for Animations
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      if (typeof window === "undefined" || !background.current) {
        return;
      }
      // Banner Background
      if (background.current) {
        gsap.set(background.current, { scale: 1.4, x: "20vw" });
        gsap.to(background.current, {
          x: "-30vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(background.current) -
                window.innerWidth * 1.5
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
            },
            scrub: 2,
          },
        });
      }

      // Return Animations
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: background, dependencies: [pathname, props.image] },
  );
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      <div ref={background} className="section-wrapper w-full h-screen">
        <Image
          className="w-full object-cover object-center h-full"
          src={props.image?.sizes?.large || props?.image?.src}
          width={props?.image?.width}
          height={props?.image?.height}
          blurDataURL={
            CreateShimmerDataUrl(props?.image?.width, props?.image?.height) ||
            props?.image?.blurDataURL
          }
          placeholder={"blur"}
          loading="lazy"
          alt="Image Background"
        />
      </div>
    </section>
  );
}
