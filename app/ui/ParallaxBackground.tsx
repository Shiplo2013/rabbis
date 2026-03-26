import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "./plugins";

interface ChildProps {
  bgImage: any;
  overlayLeft: boolean;
  overlayLeftColor: string;
  animatePosition: number;
}

export default function ParallaxBackground(props: ChildProps) {
  const background = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (props.animatePosition !== 0) {
        // Banner Background
        gsap.set(background.current, { scale: 1.2, x: "30vw" });
        gsap.to(background.current, {
          x: "-20vw",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animatePosition - 0.5);
            },
            end: () => {
              return window.innerWidth * (props.animatePosition + 2);
            },
            scrub: 2,
          },
        });
      }
    },
    { scope: background },
  );
  return (
    <div
      ref={background}
      className={`parallax-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      {props.overlayLeft && (
        <div
          style={{
            backgroundImage: `linear-gradient(to right, ${props.overlayLeftColor}, ${props.overlayLeftColor}00)`,
          }}
          className="absolute left-0 top-0 w-25 h-full z-30"
        ></div>
      )}
      <Image
        className="parallax-image w-full object-cover object-center h-full relative z-10"
        src={props?.bgImage?.src}
        width="1920"
        height="1080"
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Parallax Background"
      />
    </div>
  );
}
