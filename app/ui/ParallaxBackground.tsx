import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "./plugins";

interface ChildProps {
  bgImage: any;
}

export default function ParallaxBackground(props: ChildProps) {
  const background = useRef(null);
  useGSAP(
    () => {
      //   // Banner Background
      //   gsap.to(background.current, {
      //     x: "-20vw",
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: background.current,
      //       start: "left right",
      //       end: "right left",
      //       scrub: 2,
      //     },
      //   });
    },
    { scope: background },
  );
  return (
    <div
      ref={background}
      className={`parallax-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className="parallax-image w-full object-cover object-center h-full"
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
