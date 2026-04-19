"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Rabbis1 from "../assets/images/rabbis1.jpg";
import Rabbis2 from "../assets/images/rabbis2.jpg";
import Rabbis3 from "../assets/images/rabbis3.jpg";
import Rabbis4 from "../assets/images/rabbis4.jpg";
import Rabbis5 from "../assets/images/rabbis5.jpg";
import Rabbis6 from "../assets/images/rabbis6.jpg";
import Rabbis7 from "../assets/images/rabbis7.jpg";
import Rabbis8 from "../assets/images/rabbis8.jpg";
import introImage1 from "../assets/images/visit-temple/temple.png";
import Wave from "../assets/images/wave.svg";
import IntroBG from "../assets/images/yeshiva-graduates-bg.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import Introduction from "../components/visit-temple/Introduction";
import VisitTempleSection from "../components/visit-temple/VisitTempleSection";
import BigTitleSplitLines from "../ui/BigTitleSplitLines";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Rabbis() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const IntroData1 = [
    {
      title: `לבקר<br/>בהיכלו`,
      image: introImage1,
    },
  ];
  // Rabbis Data
  const RabbisSection1 = [
    {
      sectionTitle: "ראשי הישיבה",
      sectionContent: [
        {
          title: `מרן ראש הישיבה<br/> הגאון רבי פרבשטיין משה<br/> מרדכי שליט״א`,
          image: Rabbis1,
        },
        {
          title: `מרן ראש הישיבההגאון רבי שלמה כץ שליט"א`,
          image: Rabbis2,
        },
        {
          title: `מרן ראש הישיבההגאון רבי יוסף חברוני שליט"א`,
          image: Rabbis3,
        },
      ],
    },
  ];
  const RabbisSection2 = [
    {
      sectionTitle: "מנהל רוחני",
      sectionContent: [
        {
          title: `מרן המשגיחהגאון רבי חיים יצחק קפלן שליט"א`,
          image: Rabbis4,
        },
      ],
    },
  ];
  const RabbisSection3 = [
    {
      sectionTitle: "רמים",
      sectionContent: [
        {
          title: `הגאון רבי אברהם לויסון שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי איתן יפהן שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי חיים אהרון רלבג שליט"א`,
          image: Rabbis6,
        },
        {
          title: `הגאון רבי  נחום  בר חיים שליט"א`,
          image: Rabbis7,
        },
        {
          title: `הגאון רבי חנוך הרטמן שליט"א`,
          image: Rabbis8,
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

  const introData = JSON.stringify(IntroData1);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerHeight * 3,
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
          end: "+=" + (window.innerHeight * 3 - 500),
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
          const introTitle = main.current?.querySelector(
            ".first-intro h1.intro-title",
          );
          const introImage = main.current?.querySelector(
            ".first-intro .intro-image",
          );
          const bannerBackgroundOverlay = main.current?.querySelector(
            ".first-intro .intro-background .intro-bg-mask",
          );
          let splitIntroTitle;
          if (introTitle) {
            splitIntroTitle = BigTitleSplitLines(introTitle);
            gsap.set(introTitle, {
              perspective: 400,
            });
            gsap.set(splitIntroTitle, {
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
                setPageContentAnimation();
              },
            });
            if (main.current) {
              tl.to(main.current, {
                opacity: 1,
                ease: "none",
                duration: 0.5,
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
                  duration: 0,
                },
                "-=1",
              );
            }
            // Intro Title Animation
            if (introTitle && splitIntroTitle) {
              tl.to(
                splitIntroTitle,
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
            // Intro Image Animation
            if (introImage) {
              tl.from(
                introImage,
                {
                  x: "10vw",
                  opacity: 0,
                  duration: 3,
                  delay: 0,
                  ease: "expo.inOut",
                },
                "-=1.5",
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
    const introImage = main.current?.querySelector(".first-intro .intro-image");
    if (introImage) {
      gsap.to(introImage, {
        x: "-30vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[400vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={IntroBG}
                bgOverlay={""}
                data={introData}
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
              <VisitTempleSection
                extraClass="w-screen panel-section will-change-transform"
                animWidthText={0.5}
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
            className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
          ></div>
        </div>
      </div>
    </div>
  );
}
