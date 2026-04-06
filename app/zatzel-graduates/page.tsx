"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import PostImage1 from "../assets/images/zatzel-graduate1.jpg";
import LoadingEffect from "../components/LoadingEffect";
import Introduction from "../components/zatzel/Introduction";
import ZatzelContentSection from "../components/zatzel/ZatzelContentSection";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const IntroData1 = [
    {
      title: `זכרון להולכים`,
      content: `במשך מאה וחמישים שנות ממלכת התורה, כנסת ישראל לדורותיה, הצמיחה הישיבה דורות של תלמידים אשר האירו את העולם בתורתם, בחכמתם ובמעשיהם הטובים. במדור זה נציב נר זיכרון לדמויות בוגרי הישיבה אשר הלכו לעולמם, למען תהיה דמותם חקוקה בליבנו. זכרם יעמוד לנגד עינינו כעמוד אש וענן, להאיר לנו את הדרך, להדריך את צעדינו ולהמשיך ולהנחיל את מורשת התורה לדורות הבאים.`,
    },
  ];
  // Pictures Data
  const PostContent = [
    {
      catTitle: `מחזור תרע״ד`,
      catPosts: [
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
      ],
    },
    {
      catTitle: `מחזור תרע״ד`,
      catPosts: [
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
        {
          title: `שנת פטירה: כ"ו בסיוון ה'תשע"א`,
          content: `מרן הגאון רבי מיכל יהודה ליפקוביץ זצ״ל`,
          image: PostImage1,
        },
      ],
    },
  ];
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
          end: "+=" + window.innerWidth * 3.6,
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
          end: "+=" + (window.innerWidth * 3.6 - 500),
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
          const headerLeft = main.current?.querySelector(".header-left");
          const headerRight = main.current?.querySelector(".header-right");
          // Banner Button
          const introTitle = main.current?.querySelector(
            ".first-intro .intro-title",
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
          if (userVisit === "true") {
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
            if (headerLeft) {
              tl.to(headerLeft, {
                opacity: 1,
                ease: "none",
                duration: 1,
              });
            }
            if (headerRight) {
              tl.to(
                headerRight,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=1",
              );
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
    const sheetReadmore = main.current?.querySelector(".sheet-readmore");
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    );

    // Animations
    if (sidebar) {
      gsap.from(sidebar, {
        xPercent: 100,
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
    // Contents
    const zatzelContent = main.current?.querySelectorAll(".zatzel-cat-section");
    document.fonts.ready.then(() => {
      if (zatzelContent) {
        zatzelContent.forEach((section) => {
          const sectionTitle = section.querySelector(".zatzel-cat-title h2");
          const sectionItems = section.querySelectorAll(".single-zatzel-post");
          if (sectionTitle) {
            const splitTitle = TextSplitLines(sectionTitle);
            gsap.set(splitTitle, {
              perspective: 400,
            });
            gsap.set(splitTitle, {
              yPercent: 150,
              opacity: 0,
            });
            gsap.to(splitTitle, {
              yPercent: 0,
              opacity: 1,
              delay: 0,
              stagger: 0.05,
              ease: "expo.inOut",
              duration: 1.5,
              scrollTrigger: {
                start: () => {
                  return GetRightPosition(section) - window.innerWidth * 0.5;
                },
                toggleActions: "restart pause resume reverse",
              },
            });
          }
          if (sectionItems) {
            sectionItems.forEach((item) => {
              const postTitle = item.querySelector(".post-text .post-title");
              const postExcerpt = item.querySelector(
                ".post-text .post-excerpt",
              );
              const postOverlay = item.querySelector(".post-image-overlay");
              // Post Title
              const postExcerptSplit = TextSplitLines(postExcerpt);
              gsap.set(postExcerpt, {
                perspective: 400,
              });
              gsap.set(postExcerptSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(postExcerptSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              // Post Title
              const postTitleSplit = TextSplitLines(postTitle);
              gsap.set(postTitle, {
                perspective: 400,
              });
              gsap.set(postTitleSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(postTitleSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              // Image Overlay
              gsap.to(postOverlay, {
                yPercent: -100,
                ease: "expo.inOut",
                duration: 1.5,
                delay: 0,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
            });
          }
        });
      }
    });
    // ReadMore Button
    if (sheetReadmore) {
      gsap.set(sheetReadmore, {
        xPercent: -50,
        opacity: 0,
      });
      gsap.to(sheetReadmore, {
        xPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return GetRightPosition(sheetReadmore) - window.innerWidth * 0.4;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
  };

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      verticalSection?.pause();
    } else {
      verticalSection?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  useGSAP(() => {
    document.body.classList.add("overflow-hidden");
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
      <Header animationStatus={isAllAnimationComplete} />
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[360vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={IntroBG}
                bgOverlay={""}
                data={IntroData1}
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
              <ZatzelContentSection
                extraClass="min-w-[260vw] w-[260vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]"
                animWidthText={1}
                sectionData={PostContent}
              />
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
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
            className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#1A1A1A] z-10"
          ></div>
        </div>
      </div>
    </div>
  );
}
