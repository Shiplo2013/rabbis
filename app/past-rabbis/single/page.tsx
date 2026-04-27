"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/past-rabbis-bg.jpg";
import PostImage1 from "../../assets/images/rabbis-image-1.jpg";
import Wave from "../../assets/images/wave.svg";
import Footer from "../../components/Footer";

import ContentSection from "@/app/components/past-rabbis/single/ContentSection";
import RabbisHeader from "@/app/components/RabbisHeader";
import LoadingEffect from "../../components/LoadingEffect";
import Introduction from "../../components/past-rabbis/single/Introduction";
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
