import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useAppState } from "../AppContext";

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
  data: IntroData;
}

type IntroData = {
  title: string;
  content: string;
  acf?: { read_more_button?: { text?: string; link?: string } };
};

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const introData = (props.data as IntroData) || [];
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, setIsLoading } = useAppState();

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

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
        <div className="section-wrapper text-right flex flex-col items-end gap-x-[3.75vw]">
          <h1 className="intro-title text-[208px] text-[#AC832E] leading-[0.6em] overflow-hidden relative z-20 py-7.5 font-bold">
            {parse(introData?.title)}
          </h1>
          <h4 className="intro-content overflow-hidden text-[28px] leading-[1em] text-[#FBF4E6] mt-3 relative z-30 max-w-188.75">
            {parse(introData?.content)}
          </h4>
          {introData?.acf?.read_more_button && (
            <div className="readmore mt-4 overflow-hidden relative z-30">
              <a
                href={introData.acf.read_more_button.link}
                onClick={handleLinkClick}
                className="readmore-button text-[#AC832E] text-[28px] leading-[1em] flex items-center gap-x-2.5 relative z-30 flex-row-reverse hover:text-white group"
              >
                <span className="text transition-all duration-300">
                  {introData.acf.read_more_button.text}
                </span>
                <span className="icon w-6 [&>svg>path]:fill-[#AC832E] [&>svg>path]:transition-all [&>svg>path]:duration-300 group-hover:[&>svg>path]:fill-white">
                  <ArrowLeft2 />
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
