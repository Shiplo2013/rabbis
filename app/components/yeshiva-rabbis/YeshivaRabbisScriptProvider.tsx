"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAppState } from "../../components/AppContext";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import RabbisSection from "../../ui/rabbis/RabbisSection";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function YeshivaRabbisScriptProvider({
  data,
  postsData,
}: {
  data: any;
  postsData: any;
}) {
  // Selectors
  const [rabbisPageData, setRabbisPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const updateSectionWidth = () => {
    const postCount = data?.acf?.section.reduce(
      (acc: any, section: any) => acc + section.section_posts.length,
      0,
    );
    const newSectionWidth =
      postCount * 17.5 +
      (postCount - 1) * 5 +
      24 +
      (data?.acf?.section.length - 1) * 10; // 17.5vw per post + 5vw gap + 24vw for padding + 10vw per section

    return newSectionWidth;
  };
  const [containerWidth, setContainerWidth] = useState<number>(
    parseFloat(updateSectionWidth().toFixed(2)),
  );
  const [sectionWidth, setSectionWidth] = useState<number>(
    parseFloat(updateSectionWidth().toFixed(2)),
  );
  const [error, setError] = useState<string | null>(null);
  const { animationPlayed, setAnimationPlayed, isLoading, setIsLoading } =
    useAppState();
  // Router Path
  const pathname = usePathname();
  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    if (!postsData || !data) {
      setError("No data provided to Yeshiva Rabbis.");
      return;
    }
    setRabbisPageData(postsData);
  }, [data, postsData]);

  useEffect(() => {
    if (!rabbisPageData) {
      return;
    }
    setPageDataFetched(true);
    setIsLoading(false);
  }, [rabbisPageData]);

  // Page Section Animation
  useGSAP(() => {
    if (
      typeof window !== "undefined" &&
      panel.current &&
      wrapper.current &&
      window.innerWidth > 1024
    ) {
      // Overflow body
      const progress = document.getElementById(
        "progress",
      ) as HTMLElement | null;
      const waveLine = document.getElementById(
        "wave-line",
      ) as HTMLElement | null;
      const arrowButton = document.getElementById(
        "arrow-button",
      ) as HTMLElement | null;
      waveLine?.classList.remove("hidden");
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * (containerWidth / 100),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            if (progress) {
              gsap.to(progress, { width: `${100 * self.progress}%` });
            }
            if (self.progress > 0.97) {
              if (waveLine) {
                gsap.to(waveLine, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (waveLine) {
                gsap.to(waveLine, {
                  opacity: 1,
                  duration: 0.1,
                  delay: 0,
                });
              }
            }
            // Arrow Button
            if (self.progress > 0.97) {
              if (arrowButton) {
                gsap.to(arrowButton, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (arrowButton) {
                gsap.to(arrowButton, {
                  opacity: 1,
                  duration: 0.1,
                  delay: 0,
                });
              }
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
          end: "+=" + (window.innerWidth * (containerWidth / 100) - 500),
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
  }, [!isLoading]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && main.current) {
      // Selectors
      const page = document.querySelector("#page-wrapper");
      const headerLeft = document.querySelector(".header-left");
      const headerRight = document.querySelector(".header-right");
      // Page
      if (page) {
        gsap.set(page, { opacity: 0 });
      }
      const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true" && animationPlayed && pageDataFetched) {
        // Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
          },
        });
        if (page) {
          tl.to(page, {
            opacity: 1,
            ease: "none",
            duration: 0.5,
            delay: 0,
          });
        }
        if (headerLeft) {
          tl.to(headerLeft, {
            autoAlpha: 1,
            ease: "none",
            duration: 1,
            delay: 0,
          });
        }
        if (headerRight) {
          tl.to(
            headerRight,
            {
              autoAlpha: 1,
              ease: "none",
              duration: 1,
            },
            "-=1",
          );
        }
        // Wave Line Animation
        const waveMaskElement = document.querySelector("#wave-mask");
        if (waveMaskElement) {
          tl.to(
            waveMaskElement,
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
    }
    setPageContentAnimation();
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
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
            const animation = gsap.to(splitTitle, {
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
            animations.push(animation);
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
              const animation = gsap.to(rabbisTextSplit, {
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
              animations.push(animation);
              const overlayAnimation = gsap.to(rabbisOverlay, {
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
              animations.push(overlayAnimation);
            });
          }
        });
      }
    });
    // Arrow Button Animation
    const arrowButton = document.getElementById(
      "arrow-button",
    ) as HTMLDivElement | null;
    const arrowWrapper = arrowButton?.querySelector(
      ".rabbis-arrow",
    ) as HTMLDivElement | null;
    if (arrowWrapper) {
      gsap.set(arrowWrapper, {
        xPercent: -100,
      });
      const arrowAnimation = gsap.to(arrowWrapper, {
        xPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1.5,
        delay: 0,
      });
      animations.push(arrowAnimation);
    }
    // Wave Line Animation
    const waveLine = document.getElementById("wave-line");
    if (waveLine) {
      const waveLineAnimation = gsap.to(waveLine, {
        translateY: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 3,
      });
      animations.push(waveLineAnimation);
    }

    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
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

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!rabbisPageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Rabbi Not Found</h1>
          <p className="text-gray-600">
            The requested rabbi post could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    rabbisPageData && (
      <main
        ref={main}
        id="page"
        dir="ltr"
        className="main relative overflow-hidden z-10"
      >
        <div
          ref={panel}
          id="panel-wrapper"
          className="w-screen h-auto lg:h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            style={
              {
                "--container-width": `${containerWidth}vw`,
              } as React.CSSProperties
            }
            className="section-wrapp flex lg:flex-nowrap lg:flex-row-reverse w-full lg:w-(--container-width) lg:h-screen items-center will-change-transform"
          >
            <section
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              className="rabbis-sections w-full lg:w-(--section-width) lg:min-w-(--section-width) will-change-transform flex lg:justify-baseline flex-col lg:flex-row-reverse items-center gap-15 sm:gap-[10vw] px-[10vw] pt-30 pb-15 sm:pb-25 lg:py-0 lg:px-[12vw] lg:h-full"
            >
              {rabbisPageData?.map((section: any, index: number) => (
                <RabbisSection
                  key={index}
                  rabbisContent={[section]}
                  className={`will-change-transform rabbis-section-${index + 1}`}
                />
              ))}
            </section>
          </div>
        </div>
      </main>
    )
  );
}
