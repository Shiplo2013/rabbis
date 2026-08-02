"use client";
import GetRightPosition from "@/app/ui/GetRightPosition";
import IntroductionBackground2 from "@/app/ui/IntroductionBackground2";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  animWidthText: number;
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel?: RefObject<HTMLDivElement | null>;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; subtitle: string };
  timeline?: string;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function IntroductionContent(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLHeadingElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Section animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window !== "undefined" &&
        wrapper.current &&
        props.offsetTopAdded
      ) {
        document.fonts.ready.then(() => {
          // Section Title
          if (title.current && props?.data?.title !== "") {
            gsap.set(title.current, { opacity: 1 });
            let splititle;
            SplitText.create(title.current, {
              type: "lines",
              linesClass: "line direction-rtl2",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 1,
                  yPercent: 100,
                  opacity: 0,
                  stagger: 0.05,
                  ease: "expo.out",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(wrapper.current) +
                            window.innerWidth * 0.3
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
                    },
                    toggleActions: "restart pause play reverse",
                  },
                });
                animations.push(splititle);
                return splititle;
              },
            });
          }
          // Section Subtitle
          if (subtitle.current && props?.data?.subtitle !== "") {
            gsap.set(subtitle.current, { opacity: 1 });
            let splitSubtitle;
            SplitText.create(subtitle.current, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splitSubtitle = gsap.from(self.lines, {
                  duration: 1,
                  yPercent: 120,
                  stagger: 0.025,
                  ease: "expo.out",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(wrapper.current) +
                            window.innerWidth * 0.3
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
                    },
                    toggleActions: "restart pause play reverse",
                  },
                });
                animations.push(splitSubtitle);
                return splitSubtitle;
              },
            });
          }
        });
      }

      // Return function to kill animations on unmount or dependency change
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props?.offsetTopAdded] },
  );
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
      data-scroll-section={props.animWidthText}
    >
      {props.bgImage !== "" && (
        <IntroductionBackground2
          bgImage={props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
          animatePosition={props.animWidthText}
          panel={props.panel}
          timeline={props.timeline}
          offsetTopTimeline={props.offsetTopTimeline}
          offsetTopAdded={props.offsetTopAdded}
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
          {props?.data?.title && (
            <h1
              ref={title}
              className="text-[64px] sm:text-[100px] lg:text-[204px] text-[#AC832E] leading-[0.7em] overflow-hidden relative z-20 py-7.5"
            >
              {parse(props?.data?.title)}
            </h1>
          )}
          {props?.data?.subtitle && (
            <h4
              ref={subtitle}
              className="overflow-hidden text-[55px] leading-[1em] text-[#FBF4E6] mt-[5vh] relative z-30"
            >
              {parse(props?.data?.subtitle)}
            </h4>
          )}
        </div>
      </div>
    </section>
  );
}
