import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  animWidthText: number;
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel: any;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; subtitle: string }[];
}

export default function Introduction2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLHeadingElement>(null);
  // Section animation
  useGSAP(
    () => {
      if (typeof window !== "undefined" && wrapper.current) {
        document.fonts.ready.then(() => {
          // Section Title
          if (title.current) {
            gsap.set(title.current, { opacity: 1 });
            let splititle;
            SplitText.create(title.current, {
              type: "lines",
              linesClass: "line direction-rtl2",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 100,
                  opacity: 0,
                  stagger: 0.05,
                  ease: "expo.out",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth * props.animWidthText;
                    },
                    toggleActions: "restart pause play reverse",
                  },
                });
                return splititle;
              },
            });
          }
          // Section Subtitle
          if (subtitle.current) {
            gsap.set(subtitle.current, { opacity: 1 });
            let splitSubtitle;
            SplitText.create(subtitle.current, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splitSubtitle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 120,
                  stagger: 0.025,
                  ease: "expo.out",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth * props.animWidthText;
                    },
                    toggleActions: "restart pause play reverse",
                  },
                });
                return splitSubtitle;
              },
            });
          }
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
      data-scroll-section={props.animWidthText}
    >
      {props.bgImage !== "" && (
        <IntroductionBackground
          bgImage={props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
          animatePosition={props.animWidthText}
        />
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
        <div className="section-wrapper text-center">
          <h1
            ref={title}
            className="text-[204px] text-[#AC832E] leading-[0.7em] overflow-hidden relative z-20 py-7.5"
          >
            {parse(props.data[0].title)}
          </h1>
          <h4
            ref={subtitle}
            className="overflow-hidden text-[55px] leading-[1em] text-[#FBF4E6] mt-[5vh] relative z-30"
          >
            {parse(props.data[0].subtitle)}
          </h4>
        </div>
      </div>
    </section>
  );
}
