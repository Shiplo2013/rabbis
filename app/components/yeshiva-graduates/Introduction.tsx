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
  data: { title: string; images: { image1: any; image2: any; image3: any } }[];
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
          <div className="intro-left-mask absolute top-0 left-0 w-[7vw] h-full bg-linear-to-r from-[#1A1A1A] to-[#1a1a1a00] z-20 will-change-transform"></div>
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
        <div className="section-wrapper text-right flex flex-col items-end gap-x-[3.75vw] relative">
          <h1 className="intro-title text-[208px] text-[#AC832E] leading-[0.6em] overflow-hidden relative py-7.5 font-bold z-30">
            {parse(props.data[0].title)}
          </h1>
          <div className="intro-images absolute bottom-0 left-[28vw] -mb-[5vh] w-89 h-133.5 z-10 will-change-transform">
            {props.data[0].images.image1 && (
              <div className="image image1 w-77.75 h-116.5 absolute top-0 right-0 z-10 origin-center will-change-transform">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={props.data[0].images.image1?.src}
                  width="311"
                  height="466"
                  blurDataURL={props.data[0].images.image1?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Rabbis"
                />
              </div>
            )}
            {props.data[0].images.image2 && (
              <div className="image image2 w-89 h-133.5 absolute top-0 left-0 z-30 ml-[4vw] origin-center will-change-transform">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={props.data[0].images.image2?.src}
                  width="356"
                  height="534"
                  blurDataURL={props.data[0].images.image2?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Rabbis"
                />
              </div>
            )}
            {props.data[0].images.image3 && (
              <div className="image image3 w-83.75 h-125.75 absolute top-0 left-0 z-20 origin-center will-change-transform">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={props.data[0].images.image3?.src}
                  width="335"
                  height="503"
                  blurDataURL={props.data[0].images.image3?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Rabbis"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
