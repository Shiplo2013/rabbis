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
            return window.innerWidth * props.animWidthText;
          },
          toggleActions: "restart pause play reverse",
        },
        yPercent: 0,
        opacity: 1,
        delay: -1,
        stagger: 0.02,
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
      <div className="w-full pr-[32%] pt-[10%] pb-[10%] pl-[23%]">
        <h2 className="intro-title text-[135px] text-[#CD5E41] leading-[0.7em] text-right">
          להחיות רוח שפלים ולהחיות לב נדכאים
        </h2>
      </div>
    </section>
  );
}
