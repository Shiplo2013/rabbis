"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import introImage1 from "../../assets/images/graduates-banner-image1.png";
import introImage2 from "../../assets/images/graduates-banner-image2.png";
import introImage3 from "../../assets/images/graduates-banner-image3.png";
import IntroBG from "../../assets/images/yeshiva-graduates-bg.jpg";

import { useAppState } from "../../components/AppContext";
import GraduateListSection from "../../components/yeshiva-graduates/GraduatesListSection";
import Introduction from "../../components/yeshiva-graduates/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function YeshivaGraduatesScriptProvider({
  data,
}: {
  data: any;
}) {
  // Router Path
  const pathname = usePathname();
  const [pageData, setPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const { animationPlayed, setAnimationPlayed, isLoading, setIsLoading } =
    useAppState();
  const [sectionWidth, setSectionWidth] = useState(200);
  const [containerWidth, setContainerWidth] = useState(300);
  const [error, setError] = useState<string | null>(null);

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Set Page Data Fetched
  useEffect(() => {
    if (!data?.acf) {
      setError("Page data is missing or invalid.");
      return;
    }
    console.log("YeshivaGraduatesScriptProvider - Page Data:", data);
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (!pageData?.acf) {
      return;
    }
    // Set Page Data Fetched
    setPageDataFetched(true);
    setIsLoading(false);
  }, [pageData]);

  // // Adjust Section Widths based on window size
  useEffect(() => {
    if (!pageData) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const newSectionWidth =
        pageData?.acf?.graduate_posts?.length * 19.27 +
          (pageData?.acf?.graduate_posts?.length - 1) * 3.3 +
          10 +
          38 || 200;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [pageData]);

  // Page Data
  const IntroData1 = [
    {
      title: pageData?.acf?.introduction?.title || `כנסת<br/>הבוגרים`,
      images: {
        image1: pageData?.acf?.introduction?.floating_image_1 || introImage1,
        image2: pageData?.acf?.introduction?.floating_image_2 || introImage2,
        image3: pageData?.acf?.introduction?.floating_image_3 || introImage3,
      },
    },
  ];
  // Rabbis Data
  const GraduateData = pageData?.acf?.graduate_posts || [
    {
      title: `קהילות`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
    {
      title: `ראיונות`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
    {
      title: `ביטאון`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
    {
      title: `בוגרים זצ״ל`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
    {
      title: `כנס הבוגרים`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
    {
      title: `תמונות מחזור`,
      content: `תלמידי ישיבת חברון, לאורך כל תולדותיה, המשיכו לשמר את הקשר העמוק ואת דיבוק החברים גם לאחר נישואיהם, המשך משפט קריאה ללחיצה`,
    },
  ];

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
            if (waveLine) {
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
  }, [pathname, pageDataFetched]);

  useEffect(() => {
    if (isAllAnimationComplete) {
      setPageContentAnimation();
    }
  }, [isAllAnimationComplete]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      setPageContentAnimation();
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLElement | null;
        // Banner Button
        const introTitle = main.current?.querySelector(
          ".first-intro h1.intro-title",
        );
        // Banner Button
        const introContent = main.current?.querySelector(
          ".first-intro .intro-content",
        );
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        );
        const introImages = main.current?.querySelector(
          ".first-intro .intro-images",
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
        // If intro image found
        if (introImages) {
          gsap.set(introImages, {
            opacity: 0,
          });
        }
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
          if (pageWrapper) {
            tl.to(pageWrapper, {
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
          const waveLine = document.getElementById(
            "wave-mask",
          ) as HTMLElement | null;
          if (waveLine) {
            tl.to(
              waveLine,
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
          if (introImages) {
            tl.to(introImages, {
              opacity: 1,
              duration: 0.5,
              delay: -1,
              onComplete: () => {
                const animations: gsap.core.Animation[] = [];
                const image1 = introImages?.querySelector(
                  ".image1",
                ) as HTMLElement | null;
                const image2 = introImages?.querySelector(
                  ".image2",
                ) as HTMLElement | null;
                const image3 = introImages?.querySelector(
                  ".image3",
                ) as HTMLElement | null;
                const image1Animation = gsap.to(image1, {
                  rotate: "1.52deg",
                  delay: 0,
                  duration: 2,
                  ease: "expo.inOut",
                });
                const image2Animation = gsap.to(image2, {
                  rotate: "-10.18deg",
                  delay: 0,
                  duration: 2,
                  ease: "expo.inOut",
                });
                const image3Animation = gsap.to(image3, {
                  y: "5vh",
                  rotate: "-6.2deg",
                  delay: 0,
                  duration: 2,
                  ease: "expo.inOut",
                });
                animations.push(
                  image1Animation,
                  image2Animation,
                  image3Animation,
                );
              },
            });
          }
        }
      });
    }
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
    const sheetContent = main.current?.querySelectorAll(
      ".sheet-content .single-graduate",
    ) as NodeListOf<HTMLElement> | null;
    const sheetReadmore = main.current?.querySelector(
      ".graduate-readmore",
    ) as HTMLElement | null;
    const introImages = main.current?.querySelector(
      ".first-intro .intro-images",
    ) as HTMLElement | null;

    // Animations
    if (introImages) {
      const image1 = introImages?.querySelector(
        ".image1",
      ) as HTMLElement | null;
      const image2 = introImages?.querySelector(
        ".image2",
      ) as HTMLElement | null;
      const image3 = introImages?.querySelector(
        ".image3",
      ) as HTMLElement | null;
      const image1Animation = gsap.to(image1, {
        x: "15vw",
        delay: 0,
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 1.5;
          },
          scrub: 2,
        },
      });
      const image2Animation = gsap.to(image2, {
        x: "-25vw",
        delay: 0,
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 1.5;
          },
          scrub: 2,
        },
      });
      const image3Animation = gsap.to(image3, {
        x: "7vw",
        delay: 0,
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 1.5;
          },
          scrub: 2,
        },
      });
      animations.push(image1Animation, image2Animation, image3Animation);
    }
    // Contents
    if (sheetContent) {
      sheetContent.forEach((section, index) => {
        // Custom Content Item
        if (section) {
          gsap.set(section, {
            xPercent: -50,
            opacity: 0,
          });
          const sectionAnimation = gsap.to(section, {
            xPercent: 0,
            opacity: 1,
            ease: "slow(0.1,1,false)",
            duration: 1.5,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return GetRightPosition(section) - window.innerWidth * 0.5;
              },
              toggleActions: "restart none none reverse",
            },
          });
          animations.push(sectionAnimation);
        }
      });
    }
    // ReadMore Button
    if (sheetReadmore) {
      gsap.set(sheetReadmore, {
        xPercent: -50,
        opacity: 0,
      });
      const sheetReadmoreAnimation = gsap.to(sheetReadmore, {
        xPercent: 0,
        opacity: 1,
        ease: "slow(0.1,1,false)",
        duration: 2,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 2.3;
          },
          toggleActions: "restart none none reverse",
        },
      });
      animations.push(sheetReadmoreAnimation);
    }

    // Return
    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
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

  return (
    pageData && (
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
            className="sections-wrapper flex flex-wrap lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-(--container-width) h-auto lg:h-screen items-center will-change-transform"
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={pageData?.acf?.introduction?.background || IntroBG}
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

            <GraduateListSection
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass="w-full lg:min-w-(--section-width) lg:w-(--section-width) h-auto lg:h-screen panel-section will-change-transform py-[5vh] lg:py-[5vw] px-10 sm:px-[5vw] lg:pl-0 lg:pr-[6.25vw]"
              GraduateData={GraduateData}
              animWidthText={1}
              pageLinks={pageData?.acf?.page_links || []}
            />
          </div>
        </div>
      </main>
    )
  );
}
