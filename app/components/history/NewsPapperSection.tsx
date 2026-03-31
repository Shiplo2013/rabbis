import IntroductionBackground from "@/app/ui/IntroductionBackground";
import TextSplitLines from "@/app/ui/TextSplitLines";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import image1 from "../../assets/images/news-section-image1.jpg";
import image2 from "../../assets/images/news-section-image2.jpg";
import image3 from "../../assets/images/news-section-image3.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
}

export default function NewsPapperSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  // Section Data
  const text1 = `מלחמת העולם הראשונה טלטלה את מוסדות תבל והרעידה את כל מערכי החיים הרגילים. עולם התורה נפגע שבעתיים, כאשר הישיבות הקדושות ששכנו באזורים מוכי קרבות נאלצו לסגור את שעריהן ולנוע מזרחה, בחיפוש אחר מקום מבטחים שבו יוכלו להמשיך ללמוד באין מפריע. תקופה זו הייתה מאתגרת ורבת תהפוכות במיוחד עבור ישיבת סלבודקא כנסת ישראל.`;
  const text2 = `מיקומה הגיאוגרפי של סלבודקא, פרברה של קובנה השוכנת בטבורו של איזור מוקף מבצרים רבים, אילצו את ראשי הישיבה, תלמידיה ורבניה לעקור מארץ מגוריהם, לשאת את ארון הספרים על שכמם ולנדוד במסעות מפרכים דרך ערים וגבולות, אף בתנאי קור ורעב, גם תוך חשד תמידי מפני גזירות השלטון או פלישות צבאות ונפנופי חרב המלחמה.`;
  const smallText = `ואולם, דווקא מתוך המשבר נולדה עמידה רוחנית מרשימה: בני הישיבה לא עזבו את תלמודם, לא חדלו מתפילה ובכל מקום שנעצרו בו, הקימו בית מדרש חדש, זמני ככל שיהיה אך הרוח הגדולה פועמת בו כמו בבית המדרש הישן.<br/>התחנה הראשונה לנדודיה היתה בעיר מינסק, שם נרשמו מפגשי תורה מרתקים עם בתי מדרש מגוונים ואסכולות מחשבות שונות. בעיר זו התרחש גם המפגש ההיסטורי בין מרן ה"חזון איש" למרן "הסבא מסלבודקא" זצ"ל. בלימוד מעמיק ובשיח תורני נלבנו יחדיו דרכים ושיטות בעבודת ה', ברוח המוסר ובגדלות התורה.`;
  const bigText = `בהמשך, עקרה הישיבה לאוקראינה, שם התבססה מספר שנים בעיר קרמנצ'וג. תקופה זו הייתה בבחינת "תורה שלמדי באף"  אף על רקע הטלטלות, האתגרים והאתגרים הרבים, לא חדלה הישיבה ממלאכתה הרוחנית. קול התורה לא שקט, אלא הלך והתחזק, גם בימי צר ומצוק עד לסיום המלחמה בשנת תרע"ט אז שבה הישיבה לכור מחצבתה סלבודקא.`;

  // Seciton Animation
  useGSAP(
    () => {
      // Image Animations
      const image1 = wrapper.current?.querySelector(".image1");
      const image2 = wrapper.current?.querySelector(".image2");
      const image3 = wrapper.current?.querySelector(".image3");
      const content1 = wrapper.current?.querySelector(".content-text1");
      const content2 = wrapper.current?.querySelector(".content-text2");
      const content3 = wrapper.current?.querySelector(".content-text3");
      const content4 = wrapper.current?.querySelector(".content-text4");
      if (image1) {
        gsap.set(image1, {
          x: -150,
        });
      }
      if (image2) {
        gsap.set(image2, {
          x: 150,
        });
      }
      if (image3) {
        gsap.set(image3, {
          x: 250,
        });
      }
      // timeline for images
      if (image1) {
        gsap.to(image1, {
          x: 50,
          rotate: -5,
          ease: "easeIn",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animWidthText - 0.5);
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
      }
      if (image2) {
        gsap.to(image2, {
          x: -100,
          ease: "easeIn",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animWidthText - 0.5);
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
      }
      if (image3) {
        gsap.to(image3, {
          x: -100,
          rotate: -10,
          ease: "easeIn",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animWidthText - 0.5);
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
      }
      // Text Aniamtions
      document.fonts.ready.then(() => {
        // Section content 1
        if (content1) {
          const content1Split = TextSplitLines(content1);
          gsap.set(content1, {
            perspective: 400,
          });
          gsap.set(content1Split, {
            yPercent: 150,
            opacity: 0,
          });
          gsap.to(content1Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth * props.animWidthText;
              },
              toggleActions: "restart pause resume reverse",
            },
            yPercent: 0,
            opacity: 1,
            delay: -1,
            stagger: 0.02,
            ease: "expo.inOut",
            duration: 3,
          });
        }
        // Section content 2
        if (content2) {
          const content2Split = TextSplitLines(content2);
          gsap.set(content2, {
            perspective: 400,
          });
          gsap.set(content2Split, {
            yPercent: 150,
            opacity: 0,
          });
          gsap.to(content2Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth * (props.animWidthText + 0.2);
              },
              toggleActions: "restart pause resume reverse",
            },
            yPercent: 0,
            opacity: 1,
            delay: -1,
            stagger: 0.02,
            ease: "expo.inOut",
            duration: 3,
          });
        }
        // Section content 3
        if (content3) {
          const content3Split = TextSplitLines(content3);
          gsap.set(content3, {
            perspective: 400,
          });
          gsap.set(content3Split, {
            yPercent: 150,
            opacity: 0,
          });
          gsap.to(content3Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth * (props.animWidthText + 0.6);
              },
              toggleActions: "restart pause resume reverse",
            },
            yPercent: 0,
            opacity: 1,
            delay: -1,
            stagger: 0.02,
            ease: "expo.inOut",
            duration: 2,
          });
        }
        // Section content 4
        if (content4) {
          const content4Split = TextSplitLines(content4);
          gsap.set(content4, {
            perspective: 400,
          });
          gsap.set(content4Split, {
            yPercent: 150,
            opacity: 0,
          });
          gsap.to(content4Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth * (props.animWidthText + 0.6);
              },
              toggleActions: "restart pause resume reverse",
            },
            yPercent: 0,
            opacity: 1,
            delay: -0.5,
            stagger: 0.02,
            ease: "expo.inOut",
            duration: 2,
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
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      {props.bgImage !== "" && (
        <IntroductionBackground
          bgImage={props.bgImage}
          overlayClass={"hidden"}
          imagePosition="bottom"
          bgClass=""
          animatePosition={props.animWidthText}
        />
      )}
      <div
        dir="rtl"
        className="flex items-center w-full h-full relative z-30 px-[11.7vw] py-[4vw] gap-x-[18.3vw] text-[21px] leading-[1.4em]"
      >
        <div className="news-section-right w-[70%] flex flex-col gap-y-[9.6vh]">
          <div className="news-section-images flex justify-center relative">
            <div className="image1 w-137 h-93.5 absolute right-0 bottom-0 rotate-[9.24deg] translate-x-[2vw] translate-y-[1vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image1.src}
                width={548}
                height={374}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image1?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="image2 w-139.5 h-93 relative z-30 -translate-x-[2vw]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image2.src}
                width={558}
                height={372}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image2?.blurDataURL}
                alt="Image 1"
              />
            </div>
            <div className="image3 w-104.75 h-76 absolute top-0 left-0 z-40 -translate-x-[5vw] translate-y-[1.75vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={image3.src}
                width={548}
                height={374}
                loading="lazy"
                placeholder="blur"
                blurDataURL={image3?.blurDataURL}
                alt="Image 1"
              />
            </div>
          </div>
          <div
            dir="ltr"
            className="news-section-text flex gap-x-[6.4vw] text-right"
          >
            <div className="section-text w-1/2">
              <div className="content-text2">{parse(text1)}</div>
            </div>
            <div className="section-text w-1/2">
              <div className="content-text1">{parse(text2)}</div>
            </div>
          </div>
        </div>
        <div
          dir="ltr"
          className="news-section-left w-[30%] flex flex-col gap-y-8 text-right"
        >
          <div className="content-text3">{parse(smallText)}</div>
          <div className="content-text4 text-[28px] leading-[1em]">
            {parse(bigText)}
          </div>
        </div>
      </div>
    </section>
  );
}
