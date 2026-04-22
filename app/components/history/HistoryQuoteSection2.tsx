import BackgroundImage2 from "@/app/ui/BackgroundImage2";
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
  data: { content: string }[];
}

export default function HistoryQuoteSection2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLDivElement>(null);
  // Section Animation
  useGSAP(
    () => {
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
                  return window.innerWidth * props.animWidthText;
                },
                toggleActions: "restart pause play reverse",
              },
            });
            return splititle;
          },
        });
        // Section Box
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animWidthText - 0.5);
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(quote.current, {
          x: "20vw",
          ease: "none",
        });
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center h-screen relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="quote-background w-full h-full absolute top-0 left-0 z-10 overflow-hidden">
        <BackgroundImage2
          bgImage={props.bgImage}
          start={props.animWidthText}
          panel={""}
        />
      </div>
      <div
        className={`section-row w-full h-full flex px-[2vw] py-[5vh] items-center justify-center relative z-30`}
      >
        <div
          ref={quote}
          dir="ltr"
          className={`bg-[#E2D7C3] w-[29.3vw] text-[#000000] text-[45px] leading-[0.8em] px-[5vw] py-[5vh] flex flex-col min-h-53.5 justify-center ml-[40vw] text-right ${props.boxClass}`}
        >
          {parse(props?.data[0]?.content)}
        </div>
      </div>
    </section>
  );
}
