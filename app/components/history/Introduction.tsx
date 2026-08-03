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
  timeline: string;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; subtitle: string; background: any; overlay: any };
  offsetTopTimeline: number;
  offsetTopAdded: boolean;
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   console.log(
  //     "Introduction props.offsetTopTimeline:",
  //     props.offsetTopTimeline,
  //   );
  // }, [props.offsetTopTimeline]);
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
    >
      {props.data?.background && (
        <div className="intro-background absolute top-0 left-0 w-full h-full z-10">
          <IntroductionBackground
            bgImage={props?.data?.background}
            overlayClass={props.overlayClass}
            imagePosition={props.bgPosition}
            bgClass={props.bgClass}
            animatePosition={0.1}
            panel={props.panel}
            timeline={props.timeline}
          />
          <div className="intro-bg-mask absolute top-0 left-0 w-full h-full bg-black z-30"></div>
        </div>
      )}
      {props.data?.overlay && (
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Image
            className={`w-full object-contain h-full relative`}
            src={props?.data?.overlay?.src || props?.data?.overlay?.url || ""}
            width={`${props?.data?.overlay?.width > 1920 ? props?.data?.overlay?.width : "1920"}`}
            height={`${props?.data?.overlay?.height > 1080 ? props?.data?.overlay?.height : "1080"}`}
            blurDataURL={CreateShimmerDataUrl(
              props?.data?.overlay?.width > 1920
                ? props?.data?.overlay?.width
                : 1920,
              props?.data?.overlay?.height > 1080
                ? props?.data?.overlay?.height
                : 1080,
            )}
            placeholder={"blur"}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
            alt="Introduction Background Overlay"
          />
        </div>
      )}
      <div dir="rtl" className="flex items-center w-full h-full relative z-30">
        <div className="section-wrapper text-center">
          <h1 className="intro-title text-[18vw] sm:text-[124px] lg:text-[204px] text-[#AC832E] leading-[0.7em] overflow-hidden relative z-20 py-7.5 flex justify-center">
            <span className="block text">{parse(props.data?.title)}</span>
          </h1>
          <h4 className="intro-content overflow-hidden text-[6vw] sm:text-[35px] lg:text-[55px] leading-[1em] text-[#FBF4E6] sm:mt-2 lg:mt-[5vh] relative z-30">
            <span className="block text">{parse(props.data?.subtitle)}</span>
          </h4>
        </div>
      </div>
    </section>
  );
}
