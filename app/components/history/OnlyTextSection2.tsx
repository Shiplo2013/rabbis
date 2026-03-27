import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function OnlyTextSection2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  // Section data
  const textData = [
    {
      text: `<p>בשנת תשנ"ז נחנך ברוב פאר והדר היכל הישיבה החדש והמפואר המסוגל להכיל כ1500 לומדים. במעמד חנוכת הבית השתתפו גדולי הדור, ראשי הישיבה, ואלפי בוגריה הישיבה מכל הדורות, שבאו להשתתף ביום חגה של הישיבה ההולכת ופורחת למימדים חדשים באיכות ובכמות. חנוכת היכל בית המדרש החדש סימלה תחילתה של תקופה חדשה, וזאת מיד לאחר פטירתו של ראש הישיבה הגר"א פרבשטיין זצ"ל, ומנויים של ראשי הישיבה שליט"א. וכך שרשרת הזהב שהחלה בסלבודקא, המשיכה בחברון, ועברה לירושלים בשכונת גאולה, ומשם לגבעת מרדכי, ממשיכה להוסיף עוד חוליות, בדמות תלמידים רבים הצועדים לאורה ובדרכה ומבקשים להסתופף בצילה הגדול.</p>`,
    },
  ];

  // Section Animation
  useGSAP(
    () => {
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
                duration: 2,
                yPercent: 120,
                stagger: 0.025,
                ease: "expo.out",
                scrollTrigger: {
                  start: () => {
                    return (
                      GetRightPosition(wrapper.current) - window.innerWidth / 2
                    );
                  },
                },
              });
              return text;
            },
          });
        }
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#CD5E41] flex items-center relative z-20`}
    >
      <div className="section-wrapper w-full h-full pr-[7vw] pl-[5.7vw] py-[6.5vh] justify-center flex flex-col">
        <div className="small-text text-[#FBF4E6] text-[21px] leading-[1.4em] flex flex-col gap-y-6">
          {parse(textData[0].text)}
        </div>
      </div>
    </section>
  );
}
