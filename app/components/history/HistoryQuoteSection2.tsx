import BackgroundImage from "@/app/ui/BackgroundImage";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  boxClass: string;
  data?: any;
  offsetTopTimeline?: number;
  panel?: React.RefObject<HTMLDivElement | null>;
  offsetTopAdded?: boolean;
}

export default function HistoryQuoteSection2(props: ChildProps) {
  // Path
  const pathname = usePathname();
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !quote.current ||
        !props.offsetTopAdded ||
        window.innerWidth < 1024
      ) {
        return;
      }
      document.fonts.ready.then(() => {
        // Section Text
        gsap.set(quote.current, { opacity: 1, x: "-5vw" });
        let splititle;
        SplitText.create(quote.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              duration: 0.7,
              yPercent: 100,
              opacity: 0,
              stagger: 0.03,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(wrapper.current) -
                    window.innerWidth * 0.5
                  );
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(splititle);
            return splititle;
          },
        });
        // Section Box
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(wrapper.current) -
                window.innerWidth * 0.7
              );
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(quote.current, {
          x: "20vw",
          ease: "none",
        });
        animations.push(tl);
      });

      // Return animations
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.offsetTopAdded] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center h-screen relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="quote-background w-full h-full absolute top-0 left-0 z-10 overflow-hidden">
        <BackgroundImage
          bgImage={props.bgImage}
          overlayClass={"opacity-0"}
          panel={""}
          animated={false}
          offsetTopTimeline={props.offsetTopTimeline}
          offsetTopAdded={props.offsetTopAdded}
        />
      </div>
      <div
        className={`section-row w-full h-full flex px-[8vw] py-[7vh] lg:px-[2vw] lg:py-[5vh] items-center justify-center relative z-30`}
      >
        <div
          ref={quote}
          dir="ltr"
          className={`bg-[#E2D7C3] w-full lg:w-[29.3vw] text-[#000000] text-[25px] sm:text-[35px] lg:text-[45px] leading-[0.8em] px-[8vw] lg:px-[5vw] py-[7vh] lg:py-[5vh] flex flex-col min-h-53.5 justify-center lg:ml-[40vw] text-right ${props.boxClass}`}
        >
          {parse(props?.data?.content)}
        </div>
      </div>
    </section>
  );
}
