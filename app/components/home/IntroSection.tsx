import TextSplitLines2 from "@/app/ui/TextSplitLines2";
import { usePathname } from "next/dist/client/components/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function IntroSection(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

  // Page Animations
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Select Text
      const introTitle = wrapper.current?.querySelector(".intro-title");
      if (!introTitle) return;
      // Section Title 2
      const splitTitle = TextSplitLines2(introTitle);
      gsap.set(introTitle, {
        perspective: 400,
      });
      gsap.set(splitTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitTitle, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * (props.animWidthText - 0.7);
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
        yPercent: 0,
        opacity: 1,
        delay: 0,
        ease: "expo.inOut",
        duration: 3,
      });
    });
  }, [pathname]);
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} bg-black flex items-center`}
      data-scroll-section={props.animWidthText}
    >
      <div className="w-full h-full p-[10%] pr-[20%] flex items-center justify-center">
        <h2 className="intro-title text-[135px] text-[#CD5E41] leading-[0.7em] text-right max-w-108">
          להחיות רוח שפלים ולהחיות לב נדכאים
        </h2>
      </div>
    </section>
  );
}
