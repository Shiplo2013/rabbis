"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PostImage1 from "../assets/images/rabbis-image-1.jpg";
import PostImage2 from "../assets/images/rabbis-image-2.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import LoadingEffect from "../components/LoadingEffect";
import CustomsContentSection from "../components/past-rabbis/CustomsContentSection";
import Introduction from "../components/past-rabbis/Introduction";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const IntroData1 = [
    {
      title: `מזקנים אתבונן`,
      content: `<p>מיום שהעתיקה את גחלת סלובודקה הקדושה אל אדמת הקודש,נשאה הישיבה את דגל ההדר, עמל התורה וגדלות האדם.בצל גדולי הדור ומחנכים דגולים, נבנו בה דורות של תלמידי חכמים,שהרקידו את אולמות ההלכה, העמידו תלמידים, והאירו בתורה כל פינה בארץ.</p><p>חברון היא לא רק ישיבה, היא שושלת של נשמה, מוסר וגבורה רוחנית,שמהדהדת עד היום בלבבות אלפי תלמידים ובכל בית מדרש שזוכה לאורה.</p>`,
    },
  ];
  // Rabbis Data
  const PastRabbis = [
    {
      title: `רבי נתן צבי פינקל`,
      excerpt: `י"ז בכסלו תקצ"ו - ו' בחשוון תרפ"ו`,
      image: PostImage1,
      link: "/past-rabbis/single",
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      excerpt: `י"ז בכסלו תקצ"ו - ו' בחשוון תרפ"ו`,
      image: PostImage2,
      link: "/past-rabbis/single",
    },
    {
      title: `רבי נתן צבי פינקל`,
      excerpt: `י"ז בכסלו תקצ"ו - ו' בחשוון תרפ"ו`,
      image: PostImage1,
      link: "/past-rabbis/single",
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      excerpt: `י"ז בכסלו תקצ"ו - ו' בחשוון תרפ"ו`,
      image: PostImage2,
      link: "/past-rabbis/single",
    },
  ];

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [sectionWidth, setSectionWidth] = useState(
    PastRabbis.length * 58.4 + (PastRabbis.length - 1) * 10,
  );
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
          end: "+=" + window.innerWidth * ((sectionWidth + 100) / 100),
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
          end: "+=" + (window.innerWidth * ((sectionWidth + 100) / 100) - 500),
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
  }, [pathname, sectionWidth]);

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
          const introContent = main.current?.querySelectorAll(
            ".first-intro .intro-content>p",
          );
          // Past Rabbis
          const firstRabbis = main.current?.querySelector(
            ".rabbis-section .rabbis-item:first-child",
          );
          if (firstRabbis) {
            gsap.set(firstRabbis, {
              opacity: 0,
            });
          }
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
            // First Rabbis
            if (firstRabbis) {
              tl.to(
                firstRabbis,
                {
                  marginRight: "-13vw",
                  opacity: 1,
                  delay: 0,
                  duration: 3,
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
          }
        });
      }
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const firstRabbis = main.current?.querySelector(
      ".rabbis-section .rabbis-item:first-child",
    );
    const RabbisItem = main.current?.querySelectorAll(
      ".rabbis-section .rabbis-item:not(:first-child)",
    );

    // First Rabbis
    if (firstRabbis) {
      gsap.to(firstRabbis, {
        x: "-10vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return window.innerWidth * 1;
          },
          scrub: 2,
        },
      });
    }

    // Contents
    if (RabbisItem) {
      RabbisItem.forEach((section, index) => {
        // Custom Content Item
        if (section) {
          gsap.from(section, {
            xPercent: -50,
            opacity: 0,
            ease: "slow(0.1,1,false)",
            duration: 1.5,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return GetRightPosition(section) - window.innerWidth * 0.7;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
        }
      });
    }
  };

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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${sectionWidth + 100}vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={""}
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
              <CustomsContentSection
                extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]`}
                animWidthText={1}
                data={JSON.stringify(PastRabbis)}
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
            className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#F5F0EB] z-10"
          ></div>
        </div>
      </div>
    </div>
  );
}
