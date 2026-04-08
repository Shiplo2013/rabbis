import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import { useRef } from "react";
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
}

export default function BackgroundImage(props: ChildProps) {
  // Select Background Element
  const background = useRef(null);
  // Route
  const pathname = usePathname();
  // GSAP Context for Animations
  useGSAP(
    () => {
      // Banner Background
      gsap.set(background.current, { scale: 1.2 });
      gsap.to(background.current, {
        x: "-50vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return GetRightPosition(background.current);
          },
          end: () => {
            return GetRightPosition(background.current) + window.innerWidth * 2;
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
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
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
      <div
        className={`bg-overlay absolute top-0 left-0 w-full h-full bg-black z-20 ${props.overlayClass}`}
      ></div>
    </div>
  );
}
