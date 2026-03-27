"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import timelineBG from "../assets/images/history-bg.jpg";
import NewsSectionBG from "../assets/images/new-section-bg2.jpg";
import HistoryImage1 from "../assets/images/single-image.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EvidenceOfPeriod from "../components/history/EvidenceOfPeriod";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import LambOfferingSection from "../components/history/LambOfferingSection";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import MoveToJerusalem from "../components/history/MoveToJerusalem";
import NewsPapperSection from "../components/history/NewsPapperSection";
import OnlyTextSection from "../components/history/OnlyTextSection";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import RabbisTimeline2 from "../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../components/history/RabbisTimeline3";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
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
  const QuoteData = [
    {
      content: `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`,
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

  // Page Section Animation
  useGSAP(() => {
    ScrollTrigger.normalizeScroll(true);
    let verticalSection = null;
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;

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
              duration: 0.3,
              yPercent: 100,
              stagger: 0.03,
              ease: "none",
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
              duration: 3,
              yPercent: 100,
              stagger: 0.025,
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
              <section className="h-screen w-screen min-w-screen flex items-center justify-center flex-col relative">
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
              <RabbisTimeline3
                animWidthText={29.7}
                extraClass={
                  "min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <OnlyTextSection
                animWidthText={26.5}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
              />
              <RabbisTimeline2
                animWidthText={23}
                extraClass={
                  "min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <MoveToJerusalem
                animWidthText={20}
                extraClass={
                  "min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"
                }
              />

              <LambOfferingSection
                animWidthText={1}
                extraClass={
                  "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                }
              />
              <EvidenceOfPeriod
                animWidthText={13.5}
                extraClass={
                  "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                }
              />
              <MarkOfTheRoad2
                animWidthText={9.5}
                extraClass={
                  "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                }
              />
              <NewsPapperSection
                animWidthText={0.5}
                extraClass={
                  "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                }
                bgImage={NewsSectionBG}
              />
              <RabbisTimeline
                animWidthText={1.5}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
                bgImage={timelineBG}
              />
              <MarkOfTheRoad
                animWidthText={1.5}
                extraClass={
                  "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                }
              />
              <HistoryQuoteSection
                animWidthText={1.9}
                bgImage={""}
                extraClass={
                  "min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"
                }
                data={QuoteData}
                boxClass="translate-x-[6vw]"
              />
              <RabbisPeriodSection
                animWidthText={3.6}
                extraClass={"min-w-screen w-screen h-screen"}
              />
              <SingleImageSection
                animWidthText={0.8}
                extraClass={
                  "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                }
                image={HistoryImage1}
              />
              <div className="h-screen w-screen flex items-center justify-center"></div>
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
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <SlidingArrow />
    </div>
  );
}
