import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  data: string;
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const [pageData, setPageData] = useState(JSON.parse(props.data));

  // Console
  useEffect(() => {
    console.log(pageData[0].image);
  }, [pageData]);
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
            className="intro-title text-[320px] text-[#AC832E] font-bold leading-[0.7em] overflow-hidden relative z-20 py-13"
          >
            {parse(pageData[0].title)}
          </h1>
          <div className="intro-image absolute right-[14.5vw] top-[16vh] w-[17.70vw] h-[63.5vh] z-10 will-change-transform">
            <Image
              className="w-full h-full object-cover"
              src={pageData[0].image?.src}
              width={`393`}
              height={`590`}
              alt="Introduction Image"
              blurDataURL={pageData[0].image?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
