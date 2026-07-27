import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

interface IntroData {
  title?: string;
  image?: any;
  background?: any;
}

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
  data: IntroData | string | null;
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const introData = props.data as IntroData;
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
      <div dir="ltr" className="flex items-center w-full h-full relative z-30">
        <div className="section-wrapper text-right flex justify-center flex-row-reverse items-center gap-x-[3.75vw]">
          <h1
            dir="rtl"
            className="intro-title text-[85px] leading-[0.9em] sm:text-[150px] lg:text-[320px] text-[#AC832E] font-bold sm:leading-[0.9em] lg:leading-[0.7em] overflow-hidden relative z-20 py-13 [&>.direction-rtl3-mask]:leading-[0.5em] sm:[&>.direction-rtl3-mask]:leading-[0.6em]"
          >
            {parse(introData?.title || "")}
          </h1>
          <div className="intro-image absolute right-[1vw] lg:right-[14.5vw] top-[35vh] sm:top-[30vh] lg:top-[16vh] w-40 sm:w-60 h-auto lg:w-[17.70vw] lg:h-[63.5vh] z-10 will-change-transform">
            <Image
              className="w-full h-full object-cover"
              src={introData?.image?.src || introData?.image?.url}
              width={`393`}
              height={`590`}
              alt="Introduction Image"
              blurDataURL={CreateShimmerDataUrl(393, 590)}
              placeholder={"blur"}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
