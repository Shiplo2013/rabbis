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
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import RabbisSection from "../ui/rabbis/RabbisSection";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
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
  useEffect(() => {
    // Selectors
    const headerLeft = main.current?.querySelector(".header-left");
    const headerRight = main.current?.querySelector(".header-right");
    const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
    rabbisContent?.forEach((section) => {
      section.classList.add("opacity-0");
    });
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true" && animationPlayed) {
      // Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Set Animation Played to true
          setIsAllAnimationComplete(true);
          setPageContentAnimation();
          rabbisContent?.forEach((section) => {
            section.classList.add("opacity-100");
          });
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
    }
  }, [animationPlayed]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
    document.fonts.ready.then(() => {
      if (rabbisContent) {
        rabbisContent.forEach((section) => {
          const sectionTitle = section.querySelector(
            ".rabbis-section-title h2",
          );
          const sectionItems = section.querySelectorAll(".single-rabbis");
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
                  return GetRightPosition(section) - window.innerWidth;
                },
              },
            });
          }
          if (sectionItems) {
            sectionItems.forEach((item) => {
              const rabbisText = item.querySelector(".rabbis-text");
              const rabbisOverlay = item.querySelector(".rabbis-image-overlay");
              const rabbisTextSplit = TextSplitLines(rabbisText);
              gsap.set(rabbisText, {
                perspective: 400,
              });
              gsap.set(rabbisTextSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(rabbisTextSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth;
                  },
                },
              });
              gsap.to(rabbisOverlay, {
                yPercent: -100,
                ease: "expo.inOut",
                duration: 1.5,
                delay: 0,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth;
                  },
                },
              });
            });
          }
        });
      }
    });
    // Wave Line Animation
    if (waveMask.current) {
      gsap.to(waveMask.current, {
        translateY: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 3,
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

  useEffect(() => {
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[400vw] h-screen items-center will-change-transform`}
            >
              <section
                className={`min-w-[15vw] will-change-transform`}
              ></section>
              <RabbisSection
                rabbisContent={RabbisSection1}
                className={"will-change-transform rabbis-section-1"}
              />
              <section
                className={`min-w-[10vw] will-change-transform`}
              ></section>
              <RabbisSection
                rabbisContent={RabbisSection2}
                className={"will-change-transform rabbis-section-2"}
              />
              <section
                className={`min-w-[10vw] will-change-transform`}
              ></section>
              <RabbisSection
                rabbisContent={RabbisSection3}
                className={"will-change-transform rabbis-section-3"}
              />
              <section
                className={`min-w-[15vw] will-change-transform`}
              ></section>
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
