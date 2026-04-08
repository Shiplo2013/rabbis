import ThemeButton from "@/app/ui/ThemeButton";
import VerticalBackgroundImage from "@/app/ui/VerticalBackgroundImage";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";

interface IntroContent {
  title: string;
  button: {
    text: string;
    link: string;
  };
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
  data: IntroContent[];
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
          <VerticalBackgroundImage
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
        <div className="intro-wrapper text-right flex flex-col items-end gap-x-[3.75vw] w-full px-[10vw]">
          <h1 className="intro-title text-[208px] text-[#AC832E] leading-[0.6em] overflow-hidden relative z-20 py-7.5 font-bold">
            {parse(props.data[0]?.title)}
          </h1>
          <div className="donation-button place-self-start overflow-hidden">
            <ThemeButton
              buttonLink={props.data[0]?.button.link}
              svgIconClass={""}
              extraClass="bg-[#D4AF37] py-1.25 px-7 rounded-none"
              fontSize="text-[40px]"
              text={props.data[0]?.button.text}
              textColor="text-black"
              hoverBgColor="bg-black"
              hoverTextColor="group-hover:text-[#D4AF37]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
