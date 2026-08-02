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
  panel?: RefObject<HTMLDivElement | null>;
  data?: any;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function OnlyTextSection2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };

  // Section data
  const textData = [
    {
      text:
        props.data ||
        `<p>בשנת תשנ"ז נחנך ברוב פאר והדר היכל הישיבה החדש והמפואר המסוגל להכיל כ1500 לומדים. במעמד חנוכת הבית השתתפו גדולי הדור, ראשי הישיבה, ואלפי בוגריה הישיבה מכל הדורות, שבאו להשתתף ביום חגה של הישיבה ההולכת ופורחת למימדים חדשים באיכות ובכמות. חנוכת היכל בית המדרש החדש סימלה תחילתה של תקופה חדשה, וזאת מיד לאחר פטירתו של ראש הישיבה הגר"א פרבשטיין זצ"ל, ומנויים של ראשי הישיבה שליט"א. וכך שרשרת הזהב שהחלה בסלבודקא, המשיכה בחברון, ועברה לירושלים בשכונת גאולה, ומשם לגבעת מרדכי, ממשיכה להוסיף עוד חוליות, בדמות תלמידים רבים הצועדים לאורה ובדרכה ומבקשים להסתופף בצילה הגדול.</p>`,
    },
  ];

  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !props.offsetTopAdded ||
        window.innerWidth < 1024
      ) {
        return;
      }
      // Selector
      const smallText = wrapper.current?.querySelector(".small-text");
      // Animation
      document.fonts.ready.then(() => {
        // Section text
        if (smallText) {
          gsap.set(smallText, { opacity: 1 });
          let text;
          SplitText.create(smallText, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              text = gsap.from(self.lines, {
                duration: 1,
                yPercent: 120,
                stagger: 0.025,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return window.innerWidth > 1024
                      ? getTimelineOffset() +
                          GetRightPosition(wrapper.current) -
                          window.innerWidth * 0.8
                      : (wrapper.current?.getBoundingClientRect().top || 0) +
                          window.scrollY;
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              animations.push(text);
              return text;
            },
          });
        }
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
      dir="ltr"
      className={`${props.extraClass} bg-[#CD5E41] flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-wrapper w-full h-full px-[8vw] lg:pr-[7vw] lg:pl-[5.7vw] py-[6.5vh] justify-center flex flex-col">
        <div className="small-text text-[#FBF4E6] text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] text-right">
          {parse(textData[0].text)}
        </div>
      </div>
    </section>
  );
}
