"use client";
import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import TextSplitLines from "@/app/ui/TextSplitLines";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import Draggable from "react-draggable";
import image1 from "../../assets/images/news-section-image1.jpg";
import image2 from "../../assets/images/news-section-image2.jpg";
import image3 from "../../assets/images/news-section-image3.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  panel: RefObject<HTMLDivElement | null>;
  data: any;
  offsetTopTimeline?: number;
}

export default function NewsPapperSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const [draggingImage, setDraggingImage] = useState<1 | 2 | 3 | null>(null);

  // Section Data
  const text1 =
    props.data?.content_1 ||
    `מלחמת העולם הראשונה טלטלה את מוסדות תבל והרעידה את כל מערכי החיים הרגילים. עולם התורה נפגע שבעתיים, כאשר הישיבות הקדושות ששכנו באזורים מוכי קרבות נאלצו לסגור את שעריהן ולנוע מזרחה, בחיפוש אחר מקום מבטחים שבו יוכלו להמשיך ללמוד באין מפריע. תקופה זו הייתה מאתגרת ורבת תהפוכות במיוחד עבור ישיבת סלבודקא כנסת ישראל.`;
  const text2 =
    props?.data?.content_2 ||
    `מיקומה הגיאוגרפי של סלבודקא, פרברה של קובנה השוכנת בטבורו של איזור מוקף מבצרים רבים, אילצו את ראשי הישיבה, תלמידיה ורבניה לעקור מארץ מגוריהם, לשאת את ארון הספרים על שכמם ולנדוד במסעות מפרכים דרך ערים וגבולות, אף בתנאי קור ורעב, גם תוך חשד תמידי מפני גזירות השלטון או פלישות צבאות ונפנופי חרב המלחמה.`;
  const smallText =
    props?.data?.content_3 ||
    `ואולם, דווקא מתוך המשבר נולדה עמידה רוחנית מרשימה: בני הישיבה לא עזבו את תלמודם, לא חדלו מתפילה ובכל מקום שנעצרו בו, הקימו בית מדרש חדש, זמני ככל שיהיה אך הרוח הגדולה פועמת בו כמו בבית המדרש הישן.<br/>התחנה הראשונה לנדודיה היתה בעיר מינסק, שם נרשמו מפגשי תורה מרתקים עם בתי מדרש מגוונים ואסכולות מחשבות שונות. בעיר זו התרחש גם המפגש ההיסטורי בין מרן ה"חזון איש" למרן "הסבא מסלבודקא" זצ"ל. בלימוד מעמיק ובשיח תורני נלבנו יחדיו דרכים ושיטות בעבודת ה', ברוח המוסר ובגדלות התורה.`;
  const bigText =
    props?.data?.content_4 ||
    `בהמשך, עקרה הישיבה לאוקראינה, שם התבססה מספר שנים בעיר קרמנצ'וג. תקופה זו הייתה בבחינת "תורה שלמדי באף"  אף על רקע הטלטלות, האתגרים והאתגרים הרבים, לא חדלה הישיבה ממלאכתה הרוחנית. קול התורה לא שקט, אלא הלך והתחזק, גם בימי צר ומצוק עד לסיום המלחמה בשנת תרע"ט אז שבה הישיבה לכור מחצבתה סלבודקא.`;

  // Seciton Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      // Image Animations
      const image1 = wrapper.current?.querySelector(".image1");
      const image2 = wrapper.current?.querySelector(".image2");
      const image3 = wrapper.current?.querySelector(".image3");
      const content1 = wrapper.current?.querySelector(".content-text1");
      const content2 = wrapper.current?.querySelector(".content-text2");
      const content3 = wrapper.current?.querySelector(".content-text3");
      const content4 = wrapper.current?.querySelector(".content-text4");
      if (image1Ref.current) {
        gsap.set(image1Ref.current, {
          y: 0,
          opacity: 1,
        });
        const image1Animation = gsap.to(image1Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(image1Ref.current) -
                    window.innerWidth * 0.5
                : (wrapper.current?.getBoundingClientRect().top || 0) +
                    window.scrollY;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(image1Animation);
      }
      if (image2Ref.current) {
        gsap.set(image2Ref.current, {
          y: 100,
          opacity: 0,
        });
        const image2Animation = gsap.to(image2Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(image2Ref.current) -
                    window.innerWidth * 0.5
                : (wrapper.current?.getBoundingClientRect().top || 0) +
                    window.scrollY;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(image2Animation);
      }
      if (image3Ref.current) {
        gsap.set(image3Ref.current, {
          y: 100,
          opacity: 0,
        });
        const image3Animation = gsap.to(image3Ref.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(image3Ref.current) -
                    window.innerWidth * 0.5
                : (wrapper.current?.getBoundingClientRect().top || 0) +
                    window.scrollY;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(image3Animation);
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
          const content1Animation = gsap.to(content1Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(content1) -
                      window.innerWidth * 0.5
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
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
          animations.push(content1Animation);
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
          const content2Animation = gsap.to(content2Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(content2) -
                      window.innerWidth * 0.5
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
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
          animations.push(content2Animation);
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
          const content3Animation = gsap.to(content3Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(content3) -
                      window.innerWidth * 0.5
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
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
          animations.push(content3Animation);
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
          const content4Animation = gsap.to(content4Split, {
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(content4) -
                      window.innerWidth * 0.5
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
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
          animations.push(content4Animation);
        }
      });

      // Return function to kill animations on unmount or dependency change
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.data] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      {props.bgImage !== "" && (
        // <ImageRevealWithParallaxBG
        //   bgImage={props.bgImage}
        //   overlayLeft={false}
        //   overlayLeftColor={""}
        //   animatePosition={props.animWidthText - 0.3}
        //   panel={props.panel}
        // />
        <BackgroundImage2
          bgImage={props.bgImage}
          start={props.animWidthText - 0.3}
          panel={props.panel}
        />
      )}
      <div
        dir="rtl"
        className="flex items-center w-full h-full relative z-30 px-[11.7vw] py-[8vh] sm:py-[10vh] lg:py-[4vw] gap-x-[18.3vw] text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] flex-col lg:flex-row gap-y-8 lg:gap-y-0"
      >
        <div className="news-section-right w-full lg:w-[70%] flex flex-col gap-y-[7vh] sm:gap-y-[9.6vh]">
          <div className="news-section-images flex justify-center relative">
            {props?.data?.image_1 && (
              <Draggable
                nodeRef={image1Ref}
                onStart={() => setDraggingImage(1)}
                onStop={() => setDraggingImage(null)}
              >
                <div
                  ref={image1Ref}
                  className="image1 w-full h-auto sm:w-137 sm:h-93.5 absolute right-0 bottom-0 rotate-[9.24deg] translate-x-[2vw] translate-y-[1vh] cursor-grab active:cursor-grabbing select-none"
                  style={{ zIndex: draggingImage === 1 ? 50 : undefined }}
                  onDoubleClick={(e) => e.preventDefault()}
                >
                  <Image
                    className="w-full object-cover object-center h-full user-select-none"
                    src={props?.data?.image_1?.large?.url || image1.src}
                    width={548}
                    height={374}
                    draggable={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={
                      image1?.blurDataURL || CreateShimmerDataUrl(548, 374)
                    }
                    alt="Image 1"
                  />
                </div>
              </Draggable>
            )}

            {props?.data?.image_2 && (
              <Draggable
                nodeRef={image2Ref}
                onStart={() => setDraggingImage(2)}
                onStop={() => setDraggingImage(null)}
              >
                <div
                  ref={image2Ref}
                  className={`image2 w-full h-auto sm:w-139.5 sm:h-93 relative -translate-x-[2vw] cursor-grab active:cursor-grabbing select-none`}
                  style={{ zIndex: draggingImage === 2 ? 50 : undefined }}
                  onDoubleClick={(e) => e.preventDefault()}
                >
                  <Image
                    className="w-full object-cover object-center h-full user-select-none"
                    src={props?.data?.image_2?.large?.url || image2.src}
                    width={558}
                    height={372}
                    draggable={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={
                      image2?.blurDataURL || CreateShimmerDataUrl(558, 372)
                    }
                    alt="Image 2"
                  />
                </div>
              </Draggable>
            )}
            {props?.data?.image_3 && (
              <Draggable
                nodeRef={image3Ref}
                onStart={() => setDraggingImage(3)}
                onStop={() => setDraggingImage(null)}
              >
                <div
                  ref={image3Ref}
                  className={`image3 w-full h-auto sm:w-104.75 sm:h-76 absolute top-0 left-0 -translate-x-[5vw] translate-y-[1.75vh] cursor-grab active:cursor-grabbing select-none`}
                  style={{ zIndex: draggingImage === 3 ? 50 : undefined }}
                  onDoubleClick={(e) => e.preventDefault()}
                >
                  <Image
                    className="w-full object-cover object-center h-full user-select-none"
                    src={props?.data?.image_3?.large?.url || image3.src}
                    width={548}
                    height={374}
                    draggable={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={
                      image3?.blurDataURL || CreateShimmerDataUrl(548, 374)
                    }
                    alt="Image 3"
                  />
                </div>
              </Draggable>
            )}
          </div>
          <div
            dir="ltr"
            className="news-section-text flex gap-x-[6.4vw] text-right flex-col lg:flex-row gap-y-8"
          >
            <div className="section-text w-full lg:w-1/2">
              <div className="content-text2">{parse(text1)}</div>
            </div>
            <div className="section-text w-full lg:w-1/2">
              <div className="content-text1">{parse(text2)}</div>
            </div>
          </div>
        </div>
        <div
          dir="ltr"
          className="news-section-left w-full lg:w-[30%] flex flex-col gap-y-8 text-right"
        >
          <div className="content-text3">{parse(smallText)}</div>
          <div className="content-text4 text-[20px] sm:text-[24px] lg:text-[28px] leading-[1em]">
            {parse(bigText)}
          </div>
        </div>
      </div>
    </section>
  );
}
