import TextSplitLines from "@/app/ui/TextSplitLines";
import parse from "html-react-parser";
import { usePathname } from "next/dist/client/components/navigation";
import { useRef } from "react";
import AnimatedBackground from "../../ui/AnimatedBackground";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidth: number;
  sectionData: {
    content?: string;
    background_image?: any;
  };
}

export default function HomeSection4(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

  // Section Animations
  useGSAP(() => {
    document.fonts.ready.then(() => {
      const text = wrapper.current?.querySelector(".section-content .text");
      if (!text) return;
      const textSplit = TextSplitLines(text);
      gsap.set(text, {
        perspective: 400,
      });
      gsap.set(textSplit, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(textSplit, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth > 1024
              ? window.innerWidth * (props.animWidth - 0.7)
              : (wrapper.current?.getBoundingClientRect().top || 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
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
      dir="rtl"
      className={`${props.extraClass} home-section4 h-auto min-h-[60vh] lg:h-screen bg-no-repeat bg-center bg-cover flex items-center relative overflow-hidden`}
      data-scroll-section={props.animWidth}
    >
      <AnimatedBackground
        bgImage={props.sectionData?.background_image}
        animWidth={props.animWidth}
      />
      <div
        className={`section-content w-full h-auto flex items-center justify-center p-[5%] relative z-40`}
      >
        <div
          dir="ltr"
          className="text text-[25px] sm:text-[35px] leading-[0.9] text-[#EEECDD] font-medium w-[80%] lg:w-[60%]"
        >
          {parse(props.sectionData?.content || "")}
        </div>
      </div>
    </section>
  );
}
