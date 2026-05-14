import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
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
  data: any;
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const rabbisPosts = props.data || {};
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
        className="flex items-center w-full h-full relative z-30 py-[5vh] px-[5vw] justify-center"
      >
        <div className="rabbis-intro-wrapper text-center flex flex-col items-center gap-x-[3.75vw] text-[#AC832E]">
          <div className="rabbis-image w-[27.1vw] h-[57.2vh] relative opacity-0">
            <Image
              className="w-full h-full object-cover object-center"
              src={rabbisPosts?.thumbnail?.url || rabbisPosts?.thumbnail?.src}
              width={522}
              height={532}
              alt={`${parse(rabbisPosts?.title)}`}
              blurDataURL={CreateShimmerDataUrl(522, 532)}
              placeholder="blur"
              loading="lazy"
            />
          </div>
          <h1 className="intro-title text-[55px] leading-[0.7em] overflow-hidden relative z-20 pt-3 mt-[5vh]">
            {parse(rabbisPosts?.title)}
          </h1>
          <div className="intro-content overflow-hidden text-[33px] leading-[70%] py-1 mt-3 relative z-30 max-w-208 [&>p:not(:last-child)]:mb-5">
            {parse(rabbisPosts.time)}
          </div>
        </div>
      </div>
    </section>
  );
}
