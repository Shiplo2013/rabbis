import { gsap, ScrollTrigger, useGSAP } from "@/app/ui/plugins";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  image: StaticImageData;
}

export default function OnlyParallaxImageSection(props: ChildProps) {
  // Select Background Element
  const background = useRef(null);
  // Route
  const pathname = usePathname();
  // GSAP Context for Animations
  useGSAP(
    () => {
      // Banner Background
      gsap.set(background.current, { scale: 1.4, x: "20vw" });
      gsap.to(background.current, {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
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
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      <div ref={background} className="section-wrapper w-full h-screen">
        <Image
          className="w-full object-cover object-center h-full"
          src={props?.image?.src}
          width={props?.image?.width}
          height={props?.image?.height}
          blurDataURL={props?.image?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Image Background"
        />
      </div>
    </section>
  );
}
