import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

interface ChildProps {
  extraClass: string;
  animated: boolean;
  animationStatus: boolean;
  audioControl: () => void;
  panel: any;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; content: string };
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
    >
      {props.bgImage !== "" && (
        <div className="intro-background absolute top-0 left-0 w-full h-full z-10">
          <IntroductionBackground
            bgImage={props.bgImage}
            overlayClass={props.overlayClass}
            imagePosition={props.bgPosition}
            bgClass={props.bgClass}
            animatePosition={0.1}
          />
          <div className="intro-bg-mask absolute top-0 left-0 w-full h-full bg-black z-30 will-change-transform"></div>
        </div>
      )}
      {props.bgOverlay !== "" && (
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Image
            className={`w-full object-contain h-full relative`}
            src={props?.bgOverlay?.src}
            width={`${props?.bgOverlay?.width > 1920 ? props?.bgOverlay?.width : "1920"}`}
            height={`${props?.bgOverlay?.width > 1080 ? props?.bgOverlay?.width : "1080"}`}
            blurDataURL={props?.bgOverlay?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Introduction Background Overlay"
          />
        </div>
      )}
      <div
        dir="ltr"
        className="flex items-center w-full h-full relative z-30 py-[5vh] px-[5vw]"
      >
        <div className="intro-wrapper text-right flex flex-col items-end gap-x-[3.75vw] w-full px-[5vw]">
          <h1 className="intro-title text-[64px] leading-[0.4em] sm:text-[128px] lg:text-[208px] text-[#AC832E] sm:leading-[0.7em] lg:leading-[0.6em] overflow-hidden relative z-20 pt-11 font-bold">
            {parse(props.data.title)}
          </h1>
          <h4 className="intro-content overflow-hidden text-[16px] sm:text-[20px] lg:text-[28px] leading-[1em] text-[#FBF4E6] mt-10 relative z-30 max-w-239">
            {parse(props.data.content)}
          </h4>
        </div>
      </div>
    </section>
  );
}
