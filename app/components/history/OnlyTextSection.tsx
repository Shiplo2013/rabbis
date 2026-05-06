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
}

export default function OnlyTextSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section data
  const textData = [
    {
      text: `<p>כאשר צר המקום מלהכיל את ריבוי התלמידים, גמלה בלב ראשי הישיבה ההכרעה – לחפש כר נרחב, שקט ושליו, אשר יכיל ברווחה את שורות התלמידים ההולכות ומתרבות. מקום מרוחק משאון העיר והמולה סואנת, אשר יאפשר שקיעה מלאה באור התורה וטהרתה.</p><p>ואז, בתשרי תשל"ו, נחנכה ברוב הוד והדר קריית הישיבה החדשה בגבעת מרדכי. היה זה רגע מכונן ומרגש בתולדות הישיבה. אלפים מבוגרי הישיבה לדורותיהם נהרו למעמד המרומם של חנוכת הבית,  לראות בגיל ובהדרת כבוד את הבית אשר נבנה לתפארת, בית שיכיל אלפי בחורים שיוכלו מעתה להגות בתורה בלב שקט ונפש חפצה, כמעין המתגבר שאין לו הפסק.</p>`,
      quote: `מאותו יום ואילך, החלה תקופה פריחה חדשה: הישיבה מתרחבת, פורחת, ומגיעה לממדים אדירים, כשכמעט אלפיים בחורים חובשים את ספסליה. היא הופכת לחוד החנית של עולם התורה, אות ומופת לישיבה גדולה ונשגבה, אשר ממנה תצא תורה ומוסר לכל קצווי ארץ הקודש`,
    },
  ];

  // Section Animation
  useGSAP(
    () => {
      // Selector
      const smallText = wrapper.current?.querySelector(".small-text");
      const bigText = wrapper.current?.querySelector(".big-text");
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
                stagger: 0.01,
                delay: -0.5,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(wrapper.current) -
                      window.innerWidth * 0.5
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              return text;
            },
          });
        }
        // Section Big text
        if (bigText) {
          gsap.set(bigText, { opacity: 1 });
          let bitText;
          SplitText.create(bigText, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              bitText = gsap.from(self.lines, {
                duration: 2,
                yPercent: 120,
                delay: 0,
                stagger: 0.01,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(wrapper.current) -
                      window.innerWidth * 0.5
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              return bitText;
            },
          });
        }
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-[#5A7C4E] flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-wrapper w-full h-full pr-[7vw] pl-[5.7vw] py-[6.5vh] justify-end flex flex-col">
        <div
          dir="ltr"
          className="small-text text-[#FBF4E6] text-[21px] leading-[1.4em] text-right w-full"
        >
          {parse(textData[0].text)}
        </div>
        <div
          dir="ltr"
          className="big-text text-[#FBF4E6] text-[28px] leading-[1em] mt-6 text-right w-full"
        >
          {parse(textData[0].quote)}
        </div>
      </div>
    </section>
  );
}
