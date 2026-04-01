"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Introduction from "../components/history/Introduction";
import SingleVideoSection from "../components/history/SingleVideoSection";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function EndOfHistory() {
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
          ".first-intro .intro-title",
        );
        // Subtitle
        const headingContent = document.querySelector(
          ".first-intro .intro-content",
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
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const history = useRef<HTMLDivElement>(null);

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
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current?.offsetTop,
          end: "+=" + (window.innerWidth * 6 - 500),
          scrub: scurbScale,
        },
      });
    }
    // Return
    return () => {
      verticalSection?.kill();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
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

  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      document.fonts.ready.then(() => {
        // // Section Title 1
        // let splititle;
        // SplitText.create(".demoText", {
        //   type: "lines",
        //   linesClass: "line",
        //   autoSplit: true,
        //   mask: "lines",
        //   onSplit: (self) => {
        //     splititle = gsap.from(self.lines, {
        //       duration: 0.3,
        //       yPercent: 100,
        //       stagger: 0.03,
        //       ease: "none",
        //     });
        //     return splititle;
        //   },
        // });
        // // Section Title 1
        // let splititle2;
        // SplitText.create(".demoText2", {
        //   type: "lines",
        //   linesClass: "line",
        //   autoSplit: true,
        //   mask: "lines",
        //   onSplit: (self) => {
        //     splititle2 = gsap.from(self.lines, {
        //       duration: 3,
        //       yPercent: 100,
        //       stagger: 0.025,
        //       ease: "expo.out",
        //     });
        //     return splititle2;
        //   },
        // });
      });
    }
  }, [pathname]);
  return (
    <div ref={main} className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header animationStatus={false} />
      <SmoothWrapper>
        <main
          ref={page}
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[600vw] h-screen will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                bgImage={""}
                bgOverlay={""}
                data={IntroData1}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={panel}
                bgPosition=""
                overlayClass="hidden"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                animationStatus={false}
              />
              <SingleVideoSection
                animWidthText={0.6}
                extraClass={
                  "min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"
                }
              />
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <SlidingArrow />
    </div>
  );
}
