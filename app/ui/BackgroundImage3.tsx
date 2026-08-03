import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  bgImage: any;
  start: number;
  panel: any;
}

export default function BackgroundImage3(props: ChildProps) {
  // Selectors
  const background = useRef<HTMLDivElement>(null);

  // Routers
  const pathname = usePathname();

  // Section Animation
  useGSAP(
    () => {
      // Banner Background
      if (background.current && window.innerWidth > 1024) {
        gsap.set(background.current, { scale: 1.4, x: "20vw" });
        gsap.to(background.current, {
          x: "-10vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * props.start;
            },
            end: () => {
              return "+=" + window.innerWidth * 1.5;
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
    >
      <Image
        className="bg-image w-full object-cover object-center h-full"
        src={props?.bgImage?.url || props.bgImage.src}
        width={1920}
        height={1080}
        blurDataURL={CreateShimmerDataUrl(1920, 1080)}
        placeholder={"blur"}
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
        alt="Section Background"
      />
    </div>
  );
}
