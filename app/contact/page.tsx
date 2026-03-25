"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Contact() {
  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title: `תרל"ז - תרע"ד`,
    },
    {
      id: 2,
      title: `תרע"ד - תרפ"ד`,
    },
    {
      id: 3,
      title: `תרפ"ד - תרפ"ט`,
    },
    {
      id: 4,
      title: `תרפ"ט - תשל"ו`,
    },
    {
      id: 5,
      title: `תשל״ו - תשנ״ז`,
    },
    {
      id: 6,
      title: `תשנ"ז - הווה`,
    },
  ];
  // Page Data
  const IntroData1 = [
    {
      title: `סלבודקא`,
      subtitle: `תרל"ז - תרע"ד`,
    },
  ];
  // Router Path
  const pathname = usePathname();
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Load Page
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true") {
        // Set Title
        const headingTitle = document.querySelector(
          ".first-intro .split-title",
        );
        // Subtitle
        const headingContent = document.querySelector(
          ".first-intro .split-content",
        );
        // Page Timeline
        const headingTitleSpan = headingTitle?.querySelector("span");
        const headingContentSpan = headingContent?.querySelector("span");
        if (headingTitleSpan) {
          gsap.set(headingTitleSpan, {
            opacity: 0,
            yPercent: 100,
          });
        }
        if (headingContentSpan) {
          gsap.set(headingContentSpan, {
            opacity: 0,
            yPercent: 100,
          });
        }
        if (history.current) {
          gsap.set(history.current, { opacity: 0, y: 50 });
        }
        // Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
          },
        });
        tl.to("#page", {
          opacity: 1,
          ease: "easeInOut",
          duration: 1,
          delay: 0,
        })
          .to(
            ".header-left",
            {
              opacity: 1,
              y: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=1",
          )
          .to(
            ".header-right",
            {
              opacity: 1,
              x: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=1",
          );
        if (headingTitleSpan) {
          tl.to(
            headingTitleSpan,
            {
              duration: 0.8,
              yPercent: 0,
              opacity: 1,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
        if (headingContentSpan) {
          tl.to(
            headingContentSpan,
            {
              duration: 0.8,
              yPercent: 0,
              opacity: 1,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
        if (history.current) {
          tl.to(
            history.current,
            {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: "easeInOut",
            },
            "-=0.4",
          );
        }
      }
    });
  }, [animationPlayed]);

  // Container width
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Get Intro Right Position
  function getRightPosition(selector: string) {
    const intro = document.querySelector(selector);
    if (!intro) return 0;
    const introObj = intro.getBoundingClientRect();
    const introRight = Math.floor(window.innerWidth - introObj.right);
    return introRight;
  }

  // Complete Timeline Function
  function completeTimeline(selector: string) {
    // Timeline Complete
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("complete");
    if (!hasActiveClass) {
      intro.classList.add("complete");
    }
  }

  // Incomplete Timeline
  function incompleteTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("complete");
    if (hasActiveClass) {
      intro.classList.remove("complete");
    }
  }

  // Active Timeline
  function activeTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (!hasActiveClass) {
      intro.classList.add("active");
    }
  }

  // Inactive Timeline
  function inActiveTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (hasActiveClass) {
      intro.classList.remove("active");
    }
  }

  // Page Section Animation
  useGSAP(() => {
    ScrollTrigger.normalizeScroll(true);
    let verticalSection = null;
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;
      // Select Part 1 timeline
      const intro2Right = getRightPosition(".second-intro");
      // Select Part 2 timeline
      const intro3Right = getRightPosition(".third-intro");
      // Select Part 3 timeline
      const intro4Right = getRightPosition(".fourth-intro");
      // Select Part 4 timeline
      const intro5Right = getRightPosition(".fifth-intro");
      // Select Part 5 timeline
      const intro6Right = getRightPosition(".sixth-intro");

      // Intro Line 1
      const introLine1 = document.querySelector(
        `.history-timeline .intro-1 .progress-line .border-line`,
      );
      // Intro Line 2
      const introLine2 = document.querySelector(
        `.history-timeline .intro-2 .progress-line .border-line`,
      );
      // Intro Line 3
      const introLine3 = document.querySelector(
        `.history-timeline .intro-3 .progress-line .border-line`,
      );
      // Intro Line 4
      const introLine4 = document.querySelector(
        `.history-timeline .intro-4 .progress-line .border-line`,
      );
      // Intro Line 5
      const introLine5 = document.querySelector(
        `.history-timeline .intro-5 .progress-line .border-line`,
      );

      // Vertical Section
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 6,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // First Chapter
            const offsetRight = getRightPosition(".second-intro");
            if (offsetRight > 0 && offsetRight < intro2Right) {
              activeTimeline(".intro-1");
              completeTimeline(".intro-1");

              const introPercent = Math.round(
                ((intro2Right - offsetRight) / intro2Right) * 100,
              );
              gsap.to(introLine1, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
              });
            } else {
              inActiveTimeline(".intro-1");
            }
            // Second Chapter
            const offsetRight2 = getRightPosition(".third-intro");
            if (offsetRight2 > 0 && offsetRight2 < intro3Right - intro2Right) {
              const chapterWidth = intro3Right - intro2Right;
              const currentPost = chapterWidth - offsetRight2;
              activeTimeline(".intro-2");
              completeTimeline(".intro-2");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.to(introLine2, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
              });
            } else {
              inActiveTimeline(".intro-2");
            }
            // Third Chapter
            const offsetRight3 = getRightPosition(".fourth-intro");
            if (offsetRight3 > 0 && offsetRight3 < intro4Right - intro3Right) {
              const chapterWidth = intro4Right - intro3Right;
              const currentPost = chapterWidth - offsetRight3;
              activeTimeline(".intro-3");
              completeTimeline(".intro-3");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.to(introLine3, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
              });
            } else {
              inActiveTimeline(".intro-3");
            }
            // Fourth Chapter
            const offsetRight4 = getRightPosition(".fifth-intro");
            if (offsetRight4 > 0 && offsetRight4 < intro5Right - intro4Right) {
              const chapterWidth = intro5Right - intro4Right;
              const currentPost = chapterWidth - offsetRight4;
              activeTimeline(".intro-4");
              completeTimeline(".intro-4");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.to(introLine4, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
              });
            } else {
              inActiveTimeline(".intro-4");
            }
            // Fifth Chapter
            const offsetRight5 = getRightPosition(".sixth-intro");
            if (offsetRight5 > 0 && offsetRight5 < intro6Right - intro5Right) {
              const chapterWidth = intro6Right - intro5Right;
              const currentPost = chapterWidth - offsetRight5;
              activeTimeline(".intro-5");
              completeTimeline(".intro-5");
              const introPercent = Math.round(
                (currentPost / chapterWidth) * 100,
              );
              gsap.to(introLine5, {
                width: `${introPercent}%`,
                delay: 0,
                duration: 0.1,
              });
            } else {
              inActiveTimeline(".intro-5");
            }
            // Sixth Chapter
            if (offsetRight5 < 0) {
              completeTimeline(".intro-6");
              activeTimeline(".intro-6");
            } else {
              inActiveTimeline(".intro-6");
            }

            if (self.progress > 0.99) {
              gsap.to(history.current, {
                display: "none",
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(history.current, {
                display: "block",
                duration: 0.1,
                delay: 0,
              });
            }
          },
        },
      });
      verticalSection.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
      });
    }
    // Return
    return () => {
      verticalSection?.kill();
    };
  }, [pathname]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      document.fonts.ready.then(() => {
        // Section Title 1
        let splititle;
        SplitText.create(".demoText", {
          type: "lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              duration: 0.6,
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: "expo.out",
            });
            return splititle;
          },
        });
        // Section Title 1
        let splititle2;
        SplitText.create(".demoText2", {
          type: "lines",
          linesClass: "line",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle2 = gsap.from(self.lines, {
              duration: 0.6,
              yPercent: 100,
              opacity: 0,
              stagger: 0.1,
              ease: "expo.out",
            });
            return splititle2;
          },
        });
      });
    }
  }, [pathname]);
  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <SmoothWrapper>
        <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[600vw] h-screen`}
            >
              <section className="h-screen w-[80vw] min-w-[80vw] flex items-center justify-center flex-col relative">
                <div className="w-full h-full flex items-center justify-center gap-x-[5vw] px-[10.4vw]">
                  <div className="text-[21px] w-1/2">
                    <div className="demoText">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected
                        humour, or non-characteristic words etc.
                      </p>
                    </div>
                  </div>
                  <div className="demoText2 text-[25px] w-1/2">
                    <p>
                      סלבודקא שימשה כמרכזה של תנועת המוסר, וממנה התפשטה השפעתה
                      לרוב הישיבות ברחבי רוסיה ופולין. יסודותיה של התנועה נטועים
                      עמוק בשיטת הנהגתו וברוחו הגדולה של רבי ישראל מסלנט זצ"ל.
                    </p>
                    <p>
                      ראשיתו של מפעל אדירים זה בשנת תרל"ז (1877), עם ייסודו של
                      'כולל אברכים' בקובנה. הכולל, אשר היוה חידוש בזמנו פעל
                      בנשיאותו של רבי ישראל מסלנט, שימש כמסגרת תורנית לעילויים
                      וגדולי תורה ברוח תנועת המוסר. בין פועליו הבולטים היה רבי
                      נתן צבי פינקל, אברך צעיר ואיש חזון, שפעל במסגרת זו ללא
                      לאות להגדיל תורה ולהאדירה. כעבור שלוש שנים, יזם רבי נתן
                      צבי את הרחבת המוסד גם עבור בני הנעורים, ופנה להיוועץ בדבר
                      עם רבי ישראל.
                    </p>
                    <p>
                      בתשובתו, הורה לו רבי ישראל כי המטרה המרכזית שעליה יש
                      להתמקד בהקמת הישיבה היא "לְהַחֲיוֹת רוּחַ שְׁפָלִים
                      וּלְהַחֲיוֹת לֵב נִדְכָּאִים".
                    </p>
                  </div>
                </div>
              </section>
              <div className="h-screen w-screen flex items-center justify-center flex-col relative">
                <div className="w-screen h-screen flex items-center justify-center gap-x-[5vw] px-[10vw]">
                  <div className="text-[25px] w-1/2">
                    <div className="demoText">
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected
                        humour, or non-characteristic words etc.
                      </p>
                    </div>
                  </div>
                  <div className="demoText2 text-[25px] w-1/2">
                    <p>
                      סלבודקא שימשה כמרכזה של תנועת המוסר, וממנה התפשטה השפעתה
                      לרוב הישיבות ברחבי רוסיה ופולין. יסודותיה של התנועה נטועים
                      עמוק בשיטת הנהגתו וברוחו הגדולה של רבי ישראל מסלנט זצ"ל.
                    </p>
                    <p>
                      ראשיתו של מפעל אדירים זה בשנת תרל"ז (1877), עם ייסודו של
                      'כולל אברכים' בקובנה. הכולל, אשר היוה חידוש בזמנו פעל
                      בנשיאותו של רבי ישראל מסלנט, שימש כמסגרת תורנית לעילויים
                      וגדולי תורה ברוח תנועת המוסר. בין פועליו הבולטים היה רבי
                      נתן צבי פינקל, אברך צעיר ואיש חזון, שפעל במסגרת זו ללא
                      לאות להגדיל תורה ולהאדירה. כעבור שלוש שנים, יזם רבי נתן
                      צבי את הרחבת המוסד גם עבור בני הנעורים, ופנה להיוועץ בדבר
                      עם רבי ישראל.
                    </p>
                    <p>
                      בתשובתו, הורה לו רבי ישראל כי המטרה המרכזית שעליה יש
                      להתמקד בהקמת הישיבה היא "לְהַחֲיוֹת רוּחַ שְׁפָלִים
                      וּלְהַחֲיוֹת לֵב נִדְכָּאִים".
                    </p>
                  </div>
                </div>
              </div>
              <RabbisPeriodSection
                animWidthText={0.1}
                extraClass={"min-w-screen w-screen h-screen"}
              />
              <div className="h-screen w-screen flex items-center justify-center"></div>
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <HistoryTimeline
        wrapperRef={history}
        progressRef={progress}
        timelineData={TimelineData}
      />
      <SlidingArrow />
    </div>
  );
}
