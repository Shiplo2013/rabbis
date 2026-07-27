import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  start: number;
  panel: any;
}

export default function BackgroundImage4(props: ChildProps) {
  // Selectors
  const background = useRef<HTMLDivElement>(null);

  // Routers
  const pathname = usePathname();

  // Section Animation
  useGSAP(
    () => {
      if (background.current && window.innerWidth > 1024) {
        // Banner Background
        gsap.set(background.current, { scale: 1.4, x: "20vw" });
        gsap.to(background.current, {
          x: "-10vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * props.start;
            },
            end: () => {
              return "+=" + background.current?.offsetWidth;
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
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none pointer-events-none select-none`}
      style={{
        backgroundImage: `url(${props?.bgImage?.url || props.bgImage.src})`,
      }}
    ></div>
  );
}
