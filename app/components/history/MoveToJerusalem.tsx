import GetRightPosition from "@/app/ui/GetRightPosition";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import mtjImage1 from "../../assets/images/move-to-jerusalem1.jpg";
import mtjImage2 from "../../assets/images/move-to-jerusalem2.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function MoveToJerusalem(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section Content
  const moveToJerusalemText = `מתוך האפר קמה הישיבה לבניין מחודש, זוהר ונישא.<br/>תלמידי הישיבה הוותיקים, יחד עם בחורים מבני היישוב הישן, מתלכדים סביב אורה של הישיבה הקדושה, וממשיכים ביתר שאת את המפעל הגדול של תורה ומוסר, כאילו לא נעקרה ממקומה מעולם.<br/>מן היום ההוא והלאה, נושאת הישיבה את שמה "ישיבת חברון", שם זה נחרת לנצח באותיות של זהב, זכר לקדושים ולטהורים אשר עלו בסערה השמימה על קידוש ה', בידי בני עוולה.<br/>בראש המחנה ניצב מרן רבי יחזקאל סרנא, כמלך בגדוד, מנהיג את הישיבה ביד רמה וברוח נדירה, ומצעידה לפסגות חדשות. מאות בני תורה, מכל קצווי הארץ, מתדפקים על שערי ההיכל  לבוא, להסתופף, ולהצטרף אל ליגיון של מלך.<br/>לצידו עומדים עמודי התורה ראשי הישיבה הגאון רבי אהרן כהן והגאון רבי משה חברוני, שותפיו לדרך, המסייעים בעדו במסירות ובהשראה.<br/>יחד, נדבך אחר נדבך, הם בונים את מבצר התורה האיתן, ההולך ונישא לעין כל – עד שהוא הופך תוך זמן קצר למרכז תורה מבהיק, המאציל מזיו קדושתו על כל ארץ הקודש כולה`;

  // Section Animation
  useGSAP(
    () => {
      // Selectors
      const image1 = wrapper?.current?.querySelector(".image1");
      const image2 = wrapper?.current?.querySelector(".image2");
      const button = wrapper?.current?.querySelector(".period-button");
      const text = wrapper?.current?.querySelector(".section-text");
      // Image 1
      if (image1) {
        gsap.set(image1, {
          y: 100,
          opacity: 0,
        });
        gsap.to(image1, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(image1) -
                window.innerWidth * 0.7
              );
            },
            toggleActions: "restart pause play reverse",
          },
        });
        gsap.to(image1, {
          xPercent: 60,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(image1) -
                window.innerWidth * 0.7
              );
            },
            end: () => "+=" + window.innerWidth * 2.5,
            scrub: 2,
          },
        });
      }
      // Button
      if (button) {
        gsap.to(button, {
          x: "-30vw",
          rotate: 360,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(button) -
                window.innerWidth * 0.5
              );
            },
            end: () => "+=" + window.innerWidth * 3,
            scrub: 2,
          },
        });
      }
      // Image 2
      if (image2) {
        gsap.set(image2, {
          y: 100,
          xPercent: 30,
          opacity: 0,
        });
        gsap.to(image2, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(image2) -
                window.innerWidth * 0.5
              );
            },
            toggleActions: "restart pause play reverse",
          },
        });
        gsap.to(image2, {
          xPercent: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(image2) -
                window.innerWidth * 0.5
              );
            },
            end: () => "+=" + window.innerWidth * 2.5,
            scrub: 2,
          },
        });
      }
      // Text
      document.fonts.ready.then(() => {
        // Section Title
        if (text) {
          gsap.set(text, { opacity: 1 });
          let splititle;
          SplitText.create(text, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splititle = gsap.from(self.lines, {
                duration: 2,
                yPercent: 120,
                stagger: 0.025,
                ease: "expo.out",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(text) -
                      window.innerWidth * 0.5
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              return splititle;
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
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="widget-wrapper w-full h-full flex items-center">
        <div className="content-wrapper flex pr-[35vw] items-center">
          <div className="image1 ml-11 relative will-change-transform">
            <div className="relative h-143.5 w-188.75">
              <Image
                className="w-full object-cover object-center h-full"
                src={mtjImage1.src}
                width={755}
                height={574}
                loading="lazy"
                placeholder="blur"
                blurDataURL={mtjImage1?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="period-button absolute bottom-0 right-0 -mr-[10vw] -mb-11 group will-change-transform">
              <ThemeButton
                extraClass="w-38.25 h-38.25 flex item-center justify-center border-[4px] border-[#D1A941] text-[33px] leading-[0.8em] p-6 text-center font-bold -rotate-[9.97deg] group-hover:rotate-0 transition-all duration-500"
                bgColor="bg-[#ffffff]"
                textColor="text-[#000000]"
                hoverBgColor="bg-[#C3A13F]"
                text={`המעבר לירושלים`}
                svgIconClass={""}
              />
            </div>
          </div>
          <div className="image2 ml-[9.1vw] will-change-transform">
            <div className="relative h-140 w-236.5">
              <Image
                className="w-full object-cover object-center h-full"
                src={mtjImage2.src}
                width={946}
                height={560}
                loading="lazy"
                placeholder="blur"
                blurDataURL={mtjImage2?.blurDataURL}
                alt="Image 1"
              />
            </div>
          </div>
          <div
            dir="ltr"
            className="section-text text-[21px] leading-[1.4em] text-[#FBF4E6] w-[26.3vw] text-right"
          >
            <p>{parse(moveToJerusalemText)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
