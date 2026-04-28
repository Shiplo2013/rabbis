"use client";
import Introduction from "@/app/components/past-rabbis/single/Introduction";
import RabbisHeader from "@/app/components/RabbisHeader";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import ContentBorder from "@/app/ui/ContentBorder";
import ContentParts from "@/app/ui/ContentParts";
import PostNavigation from "@/app/ui/past-rabbis/PostNavigation";
import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";
import QuoteSection from "@/app/ui/QuoteSection";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/past-rabbis-bg.jpg";
import PostImage1 from "../../assets/images/rabbis-image-1.jpg";
import Wave from "../../assets/images/wave.svg";
import Footer from "../../components/Footer";
import LoadingEffect from "../../components/LoadingEffect";
import ContentSection from "../../components/past-rabbis/single/ContentSection";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const pageData = {
    intro: {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      content: `י"ז בכסלו תקצ"ו - ו' בחשוון תרפ"ו`,
      image: PostImage1,
    },
    content1: {
      title: `המסע לפולין ולליטא`,
      text: `<p>בשנת תרצ"ו (1936), בהיותו בן שמונה עשרה, לקחו רבי אליעזר יהודה פינקל זצוק"ל, עמו לישיבת מיר שבפולין שהיתה בראשותו, כשהחזו״א שילם לו את הוצאות הנסיעה. במיר למד במשך כשנה וחצי בחברותא עם גדולי בחורי הישיבה דאז, הגאון רבי אריה לייב מאלין זצ"ל, ורבי נפתלי וסרמן הי"ד, בנו של הגאון רבי אלחנן וסרמן הי"ד. לימים סיפר הרב וולבה: שהוא זוכר שרבי אברהם הגיע כבחור צעיר מארץ ישראל. הוא בלט מיד בהתמדתו המופלאה בלימוד, דבר שהרשים מאוד את כולם בישיבה, מכיוון שלא היו בה בחורים כה צעירים, ובפרט לא מארץ ישראל.</p><p>לזמן קיץ נסע ללמוד בישיבת 'כנסת ישראל' בסלבודקה, בדרכו עבר דרך וילנא ונכנס לרבי חיים עוזר גרודזינסקי ושוחח עמו בלימוד במשך כשעתיים. בהמשך דרכו ביקר בקלצק אצל רבי אהרן קוטלר זצ"ל, וניהל עמו ויכוח של כמה שעות, האם סברא מסוימת כתובה בתוספות. רבי אהרון התרשם ממנו מאוד וביקש שישאר בקלצק, וחצי שנה יקבל בתמורה כוס חלב כל יום... אולם רבי אברהם רצה לשוב לארץ, והספיק לשוב בסמוך לפרוץ מלחמת העולם השניה.</p>`,
    },
    quote: `
          גדולי הדור העריכו מאוד את ישרותו ולמדנותו: החזון איש שלח לשמוע את
          שיעוריו, הרב מבריסק הזמינו לשמוע את שיעוריו, ורבי איסר זלמן מלצר למד
          עמו בחברותא ורשם מהערותיו
        `,
    content2: {
      title: `קרבתו הנדירה לגדולי הדור`,
      text: `<p>לצד התמדתו הגדולה, התאפיין רבי אברהם יהודה בקרבה מיוחדת לגדולי הדור, שהעריכוהו מאוד. כבר בבני ברק, התקרב מאוד למרן החזון איש, שהעריך את ישרותו בלימודו ולמד עמו בחברותא, ואף שלח תלמידים לשמוע את שיעוריו בישיבת חברון. הוא אף היה מבאי ביתו של הגרי"ז מבריסק שהזמינו לשמוע את שיעוריו שנמסרו ליחידי סגולה, ואף הזמינו באופן אישי לחתונת אחד מבניו. בנו של הגרי"ז, הגרי"ד, סיפר כי רבי אברהם ידע לשאול שאלות חריפות ומדויקות בשיעורו של אביו. כמו כן התקרב מאוד לרבי איסר זלמן מלצר זצ"ל, ולמד עמו בחברותא, בין השאר למדו ירושלמי זרעים, וחלק מדברי תורתו נרשמו בשמו בכתביו. גם הגאון מטשיבין זצ"ל השתעשע עמו בדברי תורה.</p>`,
    },
    content3: {
      title: `כהונתו כראש ישיבת חברון ודרכו הייחודית`,
      text: `<p>בשובו לארץ ישראל, חזר לישיבת חברון, ולאחר מספר שנים לקחו מרן ראש הישיבה, הגאון רבי יחזקאל סרנא זצ"ל, לחתן לבתו הרבנית חנה, הנישואים התקיימו בחודש אלול תש״ב (1942).</p><p>בשנת תש"ז (1947) ארבע שנים לאחר נישואיו, החל למסור "שיעור על הדף" בישיבה, ובשנת תשכ"א (1961), החל למסור "שיעור כללי" בישיבה, יחד עם הגאון רבי שמחה זיסל ברוידא זצ"ל, וכיהן בראשותה למעלה משלושים שנה. הוא היה הראשון בישיבה שמסר שיעורים בעברית, לטובת בחורים שלא ידעו את שפת האידיש.</p><p>בשיעוריו התמזגו באופן פלאי עמקות וסברה ישרה מתורתם של גדולי הדור, החזון איש, הגרי"ז מבריסק, רבי ברוך בער ליבוביץ', ורבי איסר זלמן מלצר. יחד עם ניתוח עמוק ובהיר של הסוגיה, ובקיאות עצומה בכל חלקי השולחן ערוך. הוא לא ראה את חשיבות השיעור בהעברת חידושיו, אלא לעורר את הבחורים וליישר את שכלם. ה"רתחא דאורייתא" אפיינה את שיעוריו, והוא ניהל דיון פתוח עם התלמידים. הוא ידע להקשיב בשתיקה ובענווה לכל הגה של תלמיד צעיר, גם בתחילת דרכו התורנית.</p><p>הנביעה הבלתי פוסקת של חידושי תורה, נראתה כל העת, את שיעור הפתיחה הראשון שמסר בישיבה הכין יחד עם בנו ראש הישיבה כיום רבי משה מרדכי שליט"א. לבקשת חמיו רבי יחזקאל סרנא, הוא מסר לו את השיעור קודם שמסרו בישיבה, ואולם בבואו לשיעור מסר שיעור אחר לגמרי, כשנשאל על כך הסביר: "וכי משום שאתמול זה מה שיצא לי בסוגיה, מחוייב אני גם היום ללמוד כך"?</p><p>בנוסף לשעורים במסכתות הנלמדות, מסר ״חבורות״ בקדשים, בזרעים, וב״פרי מגדים״ שהיה שגור על לשונו.</p>`,
    },
    content4: {
      title: `ונפשי כעפר לכל תהיה - ענוותנותו`,
      text: `<p>נהג בפשטות מדהימה, ללא גינוני כבוד חיצוניים. הוא דיבר עם כל אדם, גם עם אנשים מאוד פשוטים כאילו הוא שוה אליו. פעם ניגש אליו ילד קטן מבית דתי מהשכונה, וביקש ממנו שילמד עמו את החומר שלמד בבית הספר, וראש הישיבה ישב ולמד עמו בפשטות ובטבעיות. למראה מודעות פטירתו, מירר אחד מילדי השכונה בבכי ואמר: "החבר שלי נפטר."</p>`,
    },
    content5: {
      title: `מנהיגותו ומורשתו התורנית`,
      text: `<p>כשם שבלימודו בנה את יסודותיו על סברא ישרה ומקורית, כך גם בהשקפתו עמד כצוק איתן. הוא לא נהה אחר דעתם של אחרים אלא גיבש דעה תורנית מקורית משלו. מרן הרב שך זצ"ל התבטא פעם לאחר אספת ראשי ישיבות, כי "הרבה דיברו, אבל רק אחד דיבר כמו למדן מופלג, והוא רבי אברהם," ובפעם אחרת התבטא כי: "כל היושבים יחד אינם מגיעים אל רבי אברהם".</p><p>ספריו 'כנסת אברהם' על המועדים ועל מסכת יבמות, מביאים את שיעוריו המעמיקים בענייני חיובי המצוות ודיני המועדים ובסוגיות העמוקות ביבמות. בספר באה לידי ביטוי דרכו המיוחדת, בחשיפת יסודותיהן העמוקים של הסוגיות, על פי דברי הראשונים ונושאי כלי השולחן ערוך, עד בירור ההלכה למעשה.</p><p>בא' בשבט תשנ"ז (09/01/1997) נפטר לאחר מחלה קצרה</p>`,
    },
    navigation: {
      prevPost: {
        image: PostImage1,
        title: `הרחב קריאה`,
        link: `/`,
      },
      nextPost: {
        image: PostImage1,
        title: `הרחב קריאה`,
        link: `/`,
      },
    },
  };

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const movingButtonRef = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      setPageContentAnimation();
      // Overflow body
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 3,
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            gsap.to(progress.current, { width: `${100 * self.progress}%` });
            if (self.progress > 0.97) {
              gsap.to(waveLine.current, {
                opacity: 0,
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(waveLine.current, {
                opacity: 1,
                duration: 0.1,
                delay: 0,
              });
            }
          },
        },
      });
      timeline.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current?.offsetTop,
          end: "+=" + (window.innerWidth * 3 - 500),
          scrub: scurbScale,
        },
      });
      setVerticalSection(timeline);
    }
    // Return
    return () => {
      if (verticalSection) {
        verticalSection.kill();
      }
    };
  }, [pathname]);

  // Load Page
  useGSAP(
    () => {
      if (typeof window !== "undefined" && panel) {
        document.fonts.ready.then(() => {
          // Selectors
          const rabbisHeader = main.current?.querySelector(".rabbis-header");
          // Banner Button
          const introTitle = main.current?.querySelector(
            ".first-intro .intro-title",
          );
          // Rabbis Image
          const rabbisImage = main.current?.querySelector(
            ".first-intro .rabbis-image",
          );
          // Banner Button
          const introContent = main.current?.querySelector(
            ".first-intro .intro-content",
          );
          const bannerBackgroundOverlay = main.current?.querySelector(
            ".first-intro .intro-background .intro-bg-mask",
          );
          // Split Title 1
          let splitTitle;
          if (introTitle) {
            splitTitle = BigTitleSplitLines(introTitle);
            gsap.set(introTitle, {
              perspective: 400,
            });
            gsap.set(splitTitle, {
              yPercent: 150,
              opacity: 0,
            });
          }
          // Split Title 2
          let splitContent;
          if (introContent) {
            splitContent = TextSplitLines(introContent);
            gsap.set(introContent, {
              perspective: 400,
            });
            gsap.set(splitContent, {
              yPercent: 150,
              opacity: 0,
            });
          }
          // Set localStorage variable
          const userVisit = localStorage.getItem("hasVisited");
          if (userVisit === "true" && animationPlayed) {
            // Timeline
            const tl = gsap.timeline({
              onComplete: () => {
                // Set Animation Played to true
                setIsAllAnimationComplete(true);
              },
            });
            if (main.current) {
              tl.to(main.current, {
                opacity: 1,
                ease: "none",
                duration: 0.5,
                delay: 0,
              });
            }
            if (rabbisHeader) {
              tl.to(rabbisHeader, {
                opacity: 1,
                ease: "none",
                duration: 1,
              });
            }
            if (page.current) {
              tl.to(
                page.current,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=1",
              );
            }
            if (rabbisImage) {
              tl.to(
                rabbisImage,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=1",
              );
            }
            if (introTitle && splitTitle) {
              tl.to(
                splitTitle,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 3,
                  delay: 0,
                  stagger: 0.05,
                  ease: "expo.inOut",
                },
                "-=1.5",
              );
            }
            if (introContent && splitContent) {
              tl.to(
                splitContent,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 3,
                  delay: 0,
                  stagger: 0.05,
                  ease: "expo.inOut",
                },
                "-=2.5",
              );
            }
            // Wave Line Animation
            if (waveMask.current) {
              tl.to(
                waveMask.current,
                {
                  translateY: 0,
                  opacity: 1,
                  ease: "expo.inOut",
                  duration: 3,
                  delay: 0,
                },
                "-=2.5",
              );
            }
            if (bannerBackgroundOverlay) {
              tl.to(
                bannerBackgroundOverlay,
                {
                  translateY: "-100%",
                  delay: 0,
                  duration: 3,
                  ease: "expo.inOut",
                },
                "-=2.5",
              );
            }
          }
        });
      }
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const rabbisMenu = main.current?.querySelectorAll(
      ".rabbis-content .rabbis-menu .rabbis-menu-item",
    );
    const rabbisText1 = main.current?.querySelector(
      ".rabbis-content .rabbis-text1",
    );
    const rabbisTitle = main.current?.querySelector(
      ".rabbis-content .rabbis-title",
    );
    const rabbisText2Title = main.current?.querySelector(
      ".rabbis-content .rabbis-text2 .title>h5",
    );
    const rabbisText2 = main.current?.querySelectorAll(
      ".rabbis-content .rabbis-text2 .text p",
    );

    // Animations
    if (rabbisMenu) {
      gsap.from(rabbisMenu, {
        yPercent: 100,
        opacity: 0,
        ease: "expo.inOut",
        duration: 3,
        delay: -1,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 0.3;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }

    // Rabbis Text 1
    if (rabbisText1) {
      let splitText1 = BigTitleSplitLines(rabbisText1);
      gsap.set(rabbisText1, {
        perspective: 400,
      });
      gsap.set(splitText1, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitText1, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 0.5;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }

    // Rabbis Title
    if (rabbisTitle) {
      let splitTitle = BigTitleSplitLines(rabbisTitle);
      gsap.set(rabbisTitle, {
        perspective: 400,
      });
      gsap.set(splitTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitTitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 1;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }

    // // Rabbis Title
    // if (rabbisText2Title) {
    //   let splitText2Title = TextSplitLines(rabbisText2Title);
    //   gsap.set(rabbisText2Title, {
    //     perspective: 400,
    //   });
    //   gsap.set(splitText2Title, {
    //     yPercent: 150,
    //     opacity: 0,
    //   });
    //   gsap.to(splitText2Title, {
    //     yPercent: 0,
    //     opacity: 1,
    //     duration: 3,
    //     delay: 0,
    //     stagger: 0.05,
    //     ease: "expo.inOut",
    //     scrollTrigger: {
    //       start: () => {
    //         return window.innerWidth * 1.8;
    //       },
    //       toggleActions: "restart pause resume reverse",
    //     },
    //   });
    // }

    // // Rabbis Text 2
    // if (rabbisText2) {
    //   rabbisText2.forEach((text) => {
    //     let split = TextSplitLines(text);
    //     gsap.set(text, {
    //       perspective: 400,
    //     });
    //     gsap.set(split, {
    //       yPercent: 150,
    //       opacity: 0,
    //     });
    //     gsap.to(split, {
    //       yPercent: 0,
    //       opacity: 1,
    //       duration: 3,
    //       delay: 0,
    //       stagger: 0.05,
    //       ease: "expo.inOut",
    //       scrollTrigger: {
    //         start: () => {
    //           return window.innerWidth * 1.8;
    //         },
    //         toggleActions: "restart pause resume reverse",
    //       },
    //     });
    //   });
    // }
  };

  // On Mouse Move
  useGSAP(
    () => {
      const xSetter = gsap.quickSetter(movingButtonRef.current, "x", "px");
      const ySetter = gsap.quickSetter(movingButtonRef.current, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      // Show view on mouse hover
      const pageNav = main.current?.querySelector(".rabbis-navigation");
      if (pageNav) {
        pageNav.addEventListener("mouseenter", () => {
          gsap.to(movingButtonRef.current, {
            opacity: 1,
            scaleY: 1,
            duration: 0.3,
          });
        });
        pageNav.addEventListener("mouseleave", () => {
          gsap.to(movingButtonRef.current, {
            opacity: 0,
            scaleY: 0,
            duration: 0.3,
          });
        });
      }

      return () => {
        window.addEventListener("mousemove", (e) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        });
        if (pageNav) {
          pageNav.addEventListener("mouseenter", () => {
            gsap.to(movingButtonRef.current, {
              opacity: 1,
              scaleY: 2,
              duration: 0.3,
            });
          });
          pageNav.addEventListener("mouseleave", () => {
            gsap.to(movingButtonRef.current, {
              opacity: 0,
              scaleY: 0,
              duration: 0.3,
            });
          });
        }
      };
    },
    { scope: main, dependencies: [pathname] },
  );

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      verticalSection?.pause();
    } else {
      verticalSection?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      gsap.to(main.current, {
        opacity: 0,
        duration: 0.1,
      });
      gsap.to(page.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          window.scrollTo(0, 0);
        },
      });
    };
  }, []);
  return (
    <div ref={main} id="main" className="relative">
      <LoadingEffect animated={setAnimationPlayed} />
      <RabbisHeader link={`/past-rabbis`} />
      <SmoothWrapper>
        <main
          ref={page}
          id="page"
          dir="ltr"
          className="main relative overflow-hidden z-10 opacity-0"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[330vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={IntroBG}
                bgOverlay={""}
                data={JSON.stringify(pageData.intro)}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-0"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <ContentSection
                extraClass="rabbis-content min-w-[230vw] w-[230vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]"
                animWidthText={1}
              />
            </div>
          </div>
          <div
            dir="rtl"
            className="content-bottom bg-[#F5F0EB] w-full flex justify-center flex-col items-center pt-[7vh] pr-25"
          >
            <div className="wrapper w-[80%] max-w-282.5">
              <ContentBorder extraClass="" />
              <ContentParts
                extraClass="mt-11.5"
                data={JSON.stringify(pageData.content1)}
              />
              <QuoteSection extraClass="mb-16 mt-16" data={pageData.quote} />
              <ContentParts
                extraClass="mt-11.5"
                data={JSON.stringify(pageData.content2)}
              />
              <ContentBorder extraClass="mt-10" />
              <ContentParts
                extraClass="mt-11.5"
                data={JSON.stringify(pageData.content3)}
              />
              <ContentParts
                extraClass="mt-11.5"
                data={JSON.stringify(pageData.content4)}
              />
              <ContentParts
                extraClass="mt-11.5"
                data={JSON.stringify(pageData.content5)}
              />
              <div className="rabbis-options mt-25">
                <RabbisOptions extraClass="flex gap-x-[4vw]" />
              </div>
              <div className="rabbis-navigation w-[calc(100vw-100px)] relative right-1/2 translate-x-1/2">
                <PostNavigation
                  extraClass="mt-[8.6vh]"
                  data={JSON.stringify(pageData.navigation)}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>

      <div
        ref={movingButtonRef}
        className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
      >
        <span className="text block text-black text-[20px] leading-[1em] font-bold">
          מעבר לדמות ההוד הבאה
        </span>
      </div>
      <div
        ref={waveLine}
        className="wave-line fixed bottom-10 right-1/2 w-30 h-6 translate-x-1/2 overflow-hidden z-30"
      >
        <div
          ref={waveMask}
          style={{
            maskImage: `url(${Wave.src})`,
          }}
          className="mask w-full h-full absolute top-0 left-0 mask-no-repeat mask-center bg-(--theme-color) mask-contain translate-y-full"
        >
          <div
            ref={progress}
            className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#F5F0EB] z-10"
          ></div>
        </div>
      </div>
    </div>
  );
}
