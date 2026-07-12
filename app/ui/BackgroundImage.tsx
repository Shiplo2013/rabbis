import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
import GetRightPosition from "./GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

gsap.registerPlugin(ScrollTrigger);
interface ChildProps {
  animated: boolean;
  bgImage: any;
  panel: any;
  overlayClass: string;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function BackgroundImage(props: ChildProps) {
  // Select Background Element
  const background = useRef<HTMLDivElement>(null);
  // Route
  const pathname = usePathname();
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // GSAP Context for Animations
  useGSAP(
    () => {
      // Banner Background
      if (background.current && props.animated && props.offsetTopAdded) {
        gsap.set(background.current, { scale: 1.2 });
        gsap.to(background.current, {
          x: "-50vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(background.current) -
                window.innerWidth
              );
            },
            end: () => "+=" + window.innerWidth * 2,
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
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className="bg-image w-full object-cover object-center h-full"
        src={
          props?.bgImage?.sizes?.intro_background ||
          props?.bgImage?.src ||
          props?.bgImage ||
          ""
        }
        width="1920"
        height="1080"
        blurDataURL={CreateShimmerDataUrl(1920, 1080)}
        placeholder={"blur"}
        loading="lazy"
        alt="Section Background"
      />
      <div
        className={`bg-overlay absolute top-0 left-0 w-full h-full bg-black z-20 ${props.overlayClass}`}
      ></div>
    </div>
  );
}
