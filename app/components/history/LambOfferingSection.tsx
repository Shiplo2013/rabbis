import GetRightPosition from "@/app/ui/GetRightPosition";
import ParallaxBackground from "@/app/ui/ParallaxBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import Draggable from "react-draggable";
import bookIcon from "../../assets/images/lamb-book-icon.png";
import LambImage1 from "../../assets/images/lamb-image1.jpg";
import LambImage2 from "../../assets/images/lamb-image2.jpg";
import LambImage3 from "../../assets/images/lamb-image3.jpg";
import contentBG from "../../assets/images/lamb-offering-bg.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

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
  onMouseMove: any;
  onMouseEnter: any;
  onMouseLeave: any;
}

export default function LambOfferingSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const { notificationData, setNotificationData, setOpenNotificationPopup } =
    useAppState();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const [draggingImage, setDraggingImage] = useState<1 | 2 | 3 | null>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };

  // Section Data
  const sectionData = [
    {
      notificationText:
        props?.data?.notification?.notification_title ||
        `קטעים של חוברת ר יצחק הוטנר על נטבחי חברון`,
      title: props?.data?.section_content?.title || `ואיה השה לעולה`,
      text1:
        props?.data?.section_content?.text_1 ||
        `במהלך שנותיה הראשונות בחברון התאפיינה הישיבה ביחסי שכנות טובים עם בני ישמעאל תושבי המקום. היא אף קיימה יחסי גומלין עסקיים כשאכסניות הבחורים נותנים פרנסה למשכירים כמו גם שירותים נוספים שסייעו להם בשנות ההתאקלמות לשרוד ולפרוח והעסיקו רבים מהשכנים הערביים. אך כל זאת לא הכין את הלב למכת התופת, שהחרידה כליל את הישיבה עם פרוץ המאורעות בשנת תרפ"ט.<br/>ביום שישי יז באב, הוחשכו השמיים בעננים שחורים של הרס ואש, והחלו שורה של מאורעות דמים שנחקקו בזיכרון ההיסטוריה תחת השם 'מאורעות תרפט'. באותם רגעים של אימה, נחתה על הישיבה מכה קשה ובלתי נתפסת בטבח שבו נעקדו על קידוש השם עשרים ושישה מבניה. נפשות תמימות אצילי דעת ונסיכי אדם ותלמידי חכמים יקרים, נפלו שדודים על דף הגמרא אל מול אגרוף רשע של בני השפחה שקמו עליהם להורגם במיתות משונות וביסורים גדולים.<br/>בתוך התופת שפקדה את ישיבת חברון, נִגלָה הדרו של הרוח הסלבודקאית במלוא תפארתו.`,
      text2:
        props?.data?.section_content?.text_2 ||
        `בחורי הישיבה, בשעת נשימתם האחרונה ובעוד אמירת שמע ישראל נלחשת בין ההריסות, חוצצים היו בגופם בין הסכנה לבין חבריהם, מקיימים במסירות נפש את אשר קנו וספגו אל קירבם במשנתה המוסרית של כנסת ישראל. גם בעודם גוססים,  לא משו ממידתם, לא הרפו מאצילות המידות אשר ספגו בין כתלי בית היוצר הגדול.<br/>ר' ירוחם ממיר אמר על התנהגות פלאית זו כי רק תלמידי הסבא יכולים היו להגיע למידה כזו של מסירות נפש בעד חבריהם רגע לפני מיתתם.<br/>בצורה טראגית זו נסתיימה לה תקופה רוויה הוד של חמש שנות תורה וגדלות בעיר האבות.<br/>בטרם כבו הלהבות, כבר החלה התנערות מעפר. הישיבה, בראשות הגאון ר’ משה מרדכי אפשטיין זצ"ל, אספה את שארית כוחותיה, נשאה עמה את השרידים – בגוף וברוח – ופנתה לעיר הקודש ירושלים.<br/>שם, בתוככי פלטרין של מלך, פתחה פרק חדש – לאחות את השברים, להשיב עטרה ליושנה, ולבנות מחדש את אם הישיבות בשכונת גאולה בלב עיר הקודש  ירושלים ת"ו`,
    },
  ];
  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window !== "undefined" &&
        wrapper.current &&
        props.offsetTopAdded &&
        window.innerWidth >= 1024
      ) {
        // Selectors
        const imagesAll = wrapper?.current?.querySelector(".section-image");
        const notification = wrapper?.current?.querySelector(".notifiaction");
        const image1 = wrapper.current?.querySelector(".image1");
        const image2 = wrapper.current?.querySelector(".image2");
        const image3 = wrapper.current?.querySelector(".image3");
        // Image Animation
        if (image1) {
          const imageAnim = gsap.from(image1, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(imagesAll) -
                      window.innerWidth * 0.1
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
          animations.push(imageAnim);
        }
        if (image2) {
          const image2Anim = gsap.from(image2, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(imagesAll) -
                      window.innerWidth * 0.1
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
          animations.push(image2Anim);
        }
        if (image3) {
          const image3Anim = gsap.from(image3, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(imagesAll) -
                      window.innerWidth * 0.1
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
          animations.push(image3Anim);
        }
        // Notification Animation
        if (notification) {
          const notificationIcon = notification?.querySelector(".notify-icon");
          // Notification
          gsap.set(notification, {
            opacity: 0,
          });
          const notificationAnim = gsap.to(notification, {
            opacity: 1,
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(notification) +
                      window.innerWidth * 0.2
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
              },
              toggleActions: "restart pause play reverse",
            },
          });
          animations.push(notificationAnim);
          // Notification Icon
          gsap.set(notificationIcon, {
            y: 20,
            x: -30,
            rotate: -15,
            opacity: 0,
          });
          const notificationIconAnim = gsap.to(notificationIcon, {
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0,
            ease: "expo.inOut",
            scrollTrigger: {
              start: () => {
                return window.innerWidth > 1024
                  ? getTimelineOffset() +
                      GetRightPosition(notification) +
                      window.innerWidth * 0.2
                  : (wrapper.current?.getBoundingClientRect().top || 0) +
                      window.scrollY;
              },
              toggleActions: "restart none none reverse",
            },
          });
          animations.push(notificationIconAnim);
        }
        // // Image Animations
        // if (image1) {
        //   gsap.set(image1, {
        //     x: -150,
        //   });
        // }
        // if (image2) {
        //   gsap.set(image2, {
        //     x: 150,
        //   });
        // }
        // if (image3) {
        //   gsap.set(image3, {
        //     x: 250,
        //   });
        // }
        // // timeline for images
        // if (image1) {
        //   gsap.to(image1, {
        //     x: -50,
        //     rotate: 7,
        //     ease: "easeIn",
        //     scrollTrigger: {
        //       start: () => {
        //         return (
        //           getTimelineOffset() +
        //           GetRightPosition(imageContainer) -
        //           window.innerWidth * 0.8
        //         );
        //       },
        //       end: () => "+=" + window.innerWidth * 2,
        //       scrub: 2,
        //     },
        //   });
        // }
        // if (image2) {
        //   gsap.to(image2, {
        //     x: -300,
        //     ease: "easeIn",
        //     scrollTrigger: {
        //       start: () => {
        //         return (
        //           getTimelineOffset() +
        //           GetRightPosition(imagesAll) -
        //           window.innerWidth * 0.2
        //         );
        //       },
        //       end: () => "+=" + window.innerWidth * 2,
        //       scrub: 2,
        //     },
        //   });
        // }
        // if (image3) {
        //   gsap.to(image3, {
        //     x: -150,
        //     rotate: -15,
        //     ease: "easeIn",
        //     scrollTrigger: {
        //       start: () => {
        //         return (
        //           getTimelineOffset() +
        //           GetRightPosition(imageContainer) -
        //           window.innerWidth * 0.8
        //         );
        //       },
        //       end: () => "+=" + window.innerWidth * 2,
        //       scrub: 2,
        //     },
        //   });
        // }
        // Sectino Text Animation
        const sectionTitle = wrapper.current?.querySelector(
          ".section-content .title",
        );
        const sectionText1 = wrapper.current?.querySelector(
          ".section-content .text1",
        );
        const sectionText2 = wrapper.current?.querySelector(
          ".section-content .text2",
        );

        document.fonts.ready.then(() => {
          // Section Title
          if (sectionTitle) {
            gsap.set(sectionTitle, { opacity: 1 });
            let splititle;
            SplitText.create(sectionTitle, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 150,
                  stagger: 0,
                  ease: "expo.inOut",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(sectionTitle) -
                            window.innerWidth * 0.1
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
                    },
                    end: () => "+=" + window.innerWidth * 0.5,
                    toggleActions: "restart none none reverse",
                    scrub: 2,
                  },
                });
                animations.push(splititle);
                return splititle;
              },
            });
          }
          // Section Text 1
          if (sectionText1) {
            gsap.set(sectionText1, { opacity: 1 });
            let splititle;
            SplitText.create(sectionText1, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 150,
                  stagger: 0,
                  ease: "expo.inOut",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(sectionText1) -
                            window.innerWidth * 0.1
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
                    },
                    end: () => "+=" + window.innerWidth * 0.5,
                    toggleActions: "restart none none reverse",
                    scrub: 2,
                  },
                });
                animations.push(splititle);
                return splititle;
              },
            });
          }
          // Section Text 2
          if (sectionText2) {
            gsap.set(sectionText2, { opacity: 1 });
            let splititle;
            SplitText.create(sectionText2, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 150,
                  stagger: 0,
                  ease: "expo.inOut",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(sectionText2) -
                            window.innerWidth * 0.1
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
                    },
                    end: () => "+=" + window.innerWidth * 0.5,
                    toggleActions: "restart none none reverse",
                    scrub: 2,
                  },
                });
                animations.push(splititle);
                return splititle;
              },
            });
          }
        });
      }

      // Return function to kill animations on unmount or dependency change
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props?.offsetTopAdded] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      onMouseMove={props.onMouseMove}
      className={`${props.extraClass} bg-black flex items-center overflow-hidden relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <ParallaxBackground
        bgImage={contentBG}
        overlayLeft={false}
        overlayLeftColor={""}
        animatePosition={props.animWidthText}
        panel={props.panel}
      />
      <div className="content-wrapper w-full h-full px-[8vw] lg:pr-[11.7vw] lg:pl-[9.6vw] py-[7vh] lg:pt-[7vh] lg:pb-[12vh] relative z-30 flex items-center gap-y-[7vh] gap-x-[12vw] flex-col lg:flex-row">
        <div className="section-image w-full lg:w-[50vw] self-end relative pt-[10vh] sm:pt-[20vh] lg:pt-0 pb-20 lg:pb-0">
          <Draggable
            nodeRef={image1Ref}
            onStart={() => setDraggingImage(1)}
            onStop={() => setDraggingImage(null)}
          >
            <div
              ref={image1Ref}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              className="image1 w-[80%] sm:w-100 h-auto lg:w-[31.35vw] lg:h-[40.15vh] absolute bottom-[15vh] lg:bottom-[19vh] right-0 lg:-right-[6.66vw] z-10 cursor-grab active:cursor-grabbing select-none touch-none"
              style={{ zIndex: draggingImage === 1 ? 50 : undefined }}
              onDoubleClick={(e) => e.preventDefault()}
            >
              <Image
                className="w-full object-cover object-center h-full user-select-none"
                src={LambImage1?.src}
                width={"644"}
                height={"425"}
                draggable={false}
                blurDataURL={LambImage1?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
          </Draggable>
          <div
            ref={image2Ref}
            className="image2 notification-button w-[70%] sm:w-90 h-auto lg:w-[26.25vw] lg:h-[38.54vh] relative z-30 cursor-pointer select-none touch-none"
            style={{ zIndex: draggingImage === 2 ? 50 : undefined }}
            onDoubleClick={(e) => e.preventDefault()}
          >
            <Image
              className="w-full object-cover object-center h-full user-select-none"
              src={LambImage2?.src}
              width={"644"}
              height={"425"}
              draggable={false}
              blurDataURL={LambImage2?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <Draggable
            nodeRef={image3Ref}
            onStart={() => setDraggingImage(3)}
            onStop={() => setDraggingImage(null)}
          >
            <div
              ref={image3Ref}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              className="image3 w-[60%] sm:w-80 h-auto lg:w-[25vw] lg:h-[60vh] absolute bottom-[9vh] right-[35vw] lg:right-[20vw] -rotate-[7.84deg] cursor-grab active:cursor-grabbing select-none touch-none"
              style={{ zIndex: draggingImage === 3 ? 50 : undefined }}
              onDoubleClick={(e) => e.preventDefault()}
            >
              <Image
                className="w-full object-cover object-center h-full user-select-none"
                src={LambImage3?.src}
                width={"644"}
                height={"425"}
                draggable={false}
                blurDataURL={LambImage3?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
          </Draggable>
          <div
            onClick={() => {
              setNotificationData(
                props?.data?.notification?.notification_popup,
              );
              setOpenNotificationPopup(true);
            }}
            className="notifiaction notification-button py-5 p-5 lg:px-8 w-full sm:w-108 bg-[#5A7C4E] absolute pl-15 lg:pl-19 mx-auto bottom-0 lg:bottom-[6.38vh] right-0 lg:right-[21vw] z-40 cursor-pointer select-none"
          >
            <div className="notify-icon w-20 sm:w-30 h-auto lg:w-50.5 lg:h-33.75 absolute top-4 sm:top-0 left-0 -translate-x-1/2">
              <Image
                className="w-full object-cover object-center h-full"
                src={bookIcon.src}
                width={"202"}
                height={"135"}
                blurDataURL={bookIcon?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Book Icon"}
              />
            </div>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.25em]">
              {parse(sectionData[0].notificationText)}
            </p>
          </div>
        </div>
        <div
          dir="ltr"
          className="section-content w-full lg:w-[58vw] flex flex-col gap-y-8 lg:gap-y-[4.8vh] text-right"
        >
          <div className="content-top">
            <h2 className="title 2xl:text-[58px] sm:text-[42px] text-[32px] leading-[0.7em] text-[#CD5E41]">
              {parse(sectionData[0]?.title)}
            </h2>
          </div>
          <div className="content-bottom 2xl:text-[21px] sm:text-[18px] text-[16px] flex gap-x-[5.2vw] flex-col lg:flex-row gap-y-10">
            <div className="text1 w-full lg:w-1/2">
              {parse(sectionData[0]?.text2)}
            </div>
            <div className="text2 w-full lg:w-1/2">
              {parse(sectionData[0]?.text1)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
