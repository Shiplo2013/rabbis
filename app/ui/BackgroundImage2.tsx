import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
import GetRightPosition from "./GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  start: number;
  panel: any;
}

export default function BackgroundImage2(props: ChildProps) {
  // Selectors
  const background = useRef<HTMLDivElement>(null);

  // Routers
  const pathname = usePathname();
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      if (typeof window === "undefined" || !background.current) {
        return;
      }
      // Banner Background
      if (background.current) {
        gsap.set(background.current, { scale: 1.4, x: "20vw" });
        const animation = gsap.to(background.current, {
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
        animations.push(animation);
      }

      // Return animations
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: background, dependencies: [pathname] },
  );
  return (
    <div
      ref={background}
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none pointer-events-none select-none`}
    >
      <Image
        className="bg-image w-full object-cover object-center h-full"
        src={props?.bgImage?.sizes?.intro_background || props.bgImage.src}
        width="1920"
        height="1080"
        blurDataURL={CreateShimmerDataUrl(1920, 1080)}
        placeholder={"blur"}
        loading="lazy"
        alt="Section Background"
      />
    </div>
  );
}
