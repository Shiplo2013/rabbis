import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "./plugins";

interface ChildProps {
  bgImage: any;
  overlayClass: string;
  imagePosition: string;
  bgClass: string;
}

export default function IntroductionBackground(props: ChildProps) {
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
      className={`introduction-background ${props.bgClass} absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className={`w-full object-cover ${props.imagePosition === "bottom" ? "object-bottom" : "object-center"} h-full relative z-10`}
        src={props?.bgImage?.src}
        width={`${props?.bgImage?.width > 1920 ? props?.bgImage?.width : "1920"}`}
        height={`${props?.bgImage?.width > 1080 ? props?.bgImage?.width : "1080"}`}
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Introduction Background"
      />
      <div
        className={`absolute top-0 left-0 w-full h-full z-30 ${props.overlayClass}`}
      ></div>
    </div>
  );
}
