import TextSplitLines from "@/app/ui/TextSplitLines";
import { usePathname } from "next/dist/client/components/navigation";
import { useRef } from "react";
import sectionBg from "../../assets/images/section-bg2.jpg";
import AnimatedBackground from "../../ui/AnimatedBackground";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidth: number;
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
            return window.innerWidth * (props.animWidth - 0.7);
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
      className={`${props.extraClass} home-section4 h-screen bg-no-repeat bg-center bg-cover flex items-center relative overflow-hidden`}
      data-scroll-section={props.animWidth}
    >
      <AnimatedBackground bgImage={sectionBg} animWidth={props.animWidth} />
      <div
        className={`section-content w-full h-auto flex items-center justify-center p-[5%] relative z-40`}
      >
        <div
          dir="ltr"
          className="text text-[35px] leading-[0.9] text-[#EEECDD] font-medium w-[60%]"
        >
          <p>
            מיום היווסדה נושאת הישיבה הקדושה את רוח הרוממות והגדלות שנטעו
            מייסדיה.
          </p>
          <p>
            היא ממשיכה עד היום להבעיר את שלהבת התורה והמוסר בלב אלפי תלמידיה
            ובוגריה.
          </p>
          <p>
            דרכה המיוחדת - המשלבת גדלות, עומק, בהירות ושאר רוח - מלווה את
            הצועדים בדרכה ומעמידה שדרת תלמידי חכמים נאמנים למורשתה.
          </p>
        </div>
      </div>
    </section>
  );
}
