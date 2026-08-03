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
  data: { title: string; text: string }[];
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
            alt="Introduction Background Overlay"
          />
        </div>
      )}
      <div dir="ltr" className="flex items-center w-full h-full relative z-30">
        <div className="intro-wrapper w-full text-right flex flex-col items-end gap-x-[3.75vw] px-[8vw] lg:px-[15vw]">
          <h1 className="intro-title text-[72px] sm:text-[128px] lg:text-[208px] text-[#AC832E] leading-[0.3em] sm:leading-[0.6em] overflow-hidden relative z-20 pt-11 font-bold">
            {parse(props.data[0].title)}
          </h1>
          <div className="intro-content overflow-hidden text-[18px] sm:text-[22px] lg:text-[28px] leading-[90%] text-[#FBF4E6] mt-5 sm:mt-10 relative z-30 max-w-208 [&>p:not(:last-child)]:mb-5">
            {parse(props.data[0].text)}
          </div>
        </div>
      </div>
    </section>
  );
}
