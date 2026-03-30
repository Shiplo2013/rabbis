import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./plugins";

gsap.registerPlugin(ScrollTrigger);

interface ChildProps {
  bgImage: any;
  animWidth: number;
}

export default function AnimatedBackground(props: ChildProps) {
  // Selectors
  const background = useRef(null);

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
            return window.innerWidth * (props.animWidth - 0.2);
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
      className={`background-wrapper absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className="background-image w-full object-cover object-center h-full"
        src={props?.bgImage?.src}
        width="1920"
        height="1080"
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Section Background"
      />
      <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>
    </div>
  );
}
