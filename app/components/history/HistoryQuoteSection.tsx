import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  boxClass: string;
  data: { content: string }[];
  panel?: RefObject<HTMLDivElement | null>;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function HistoryQuoteSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !props.offsetTopAdded
      ) {
        return;
      }

      document.fonts.ready.then(() => {
        // Section Text
        if (quote.current) {
          gsap.set(quote.current, { opacity: 1, x: "-10vw" });
          const texts = quote.current.querySelectorAll("p");
          let splititle;
          SplitText.create(texts, {
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
                      GetRightPosition(quote.current) +
                      window.innerWidth * 0.1
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
                  GetRightPosition(quote.current) -
                  window.innerWidth
                );
              },
              end: () => "+=" + window.innerWidth * 2,
              scrub: 2,
            },
          });
          tl.to(quote.current, {
            x: "15vw",
            ease: "none",
          });
          animations.push(tl);
        }
      });
      // Return function to kill animations on unmount or dependency change
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
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div
        className={`section-row w-full h-full flex px-[2vw] py-[5vh] items-center justify-center relative z-30`}
      >
        <div
          ref={quote}
          dir="ltr"
          className={`bg-[#E2D7C3] w-full text-[#000000] text-[45px] leading-[0.8em] px-[5vw] py-[5vh] flex flex-col min-h-[46.8vh] justify-center  text-right ${props.boxClass} [&>p:not(:last-child)]:mb-[3vh]`}
        >
          {parse(props?.data[0]?.content)}
        </div>
      </div>
    </section>
  );
}
