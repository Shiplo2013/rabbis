import Image from "next/image";
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

export default function BackgroundImage2(props: ChildProps) {
  // Selectors
  const background = useRef<HTMLDivElement>(null);

  // Routers
  const pathname = usePathname();

  // Section Animation
  useGSAP(
    () => {
      // Banner Background
      gsap.set(background.current, { scale: 1.4, x: "20vw" });
      gsap.to(background.current, {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.start;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
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
        src={props?.bgImage?.src}
        width="1920"
        height="1080"
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Section Background"
      />
    </div>
  );
}
