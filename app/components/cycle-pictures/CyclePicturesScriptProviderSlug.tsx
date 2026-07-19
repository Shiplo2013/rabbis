"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";
import CyclePicturesSection from "./CyclePicturesSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CyclePicturesScriptProviderSlug() {
  // Selectors
  const [picturesPageData, setPicturesPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params.slug;
  const [activeCategory, setActiveCategory] = useState(-1);
  const [postPagination, setPostPagination] = useState(1);
  const [totalPostPages, setTotalPostPages] = useState(1);
  const [currentPositions, setCurrentPositions] = useState(0);
  const [postDataLoaded, setPostDataLoaded] = useState(false);
  // Animation State
  const {
    isLoading,
    setIsLoading,
    animationPlayed,
    setAnimationPlayed,
    cyclePostNavigation,
    setCyclePostNavigation,
  } = useAppState();
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
    console.log("Cycle Post Navigation:", cyclePostNavigation);
    if (
      !cyclePostNavigation ||
      !cyclePostNavigation.postsData ||
      !cyclePostNavigation.categoryData
    ) {
      setError("No data provided.");
      window.location.href = "/cycle-pictures";
      return;
    }
    window.scrollTo(0, 0);
    setPicturesPageData({
      posts: cyclePostNavigation.postsData[Number(slug) - 1] || null,
      parentCategories: cyclePostNavigation.categoryData,
    });
    setTotalPostPages(cyclePostNavigation.postsData?.length || 1);
  }, [cyclePostNavigation]);

  useEffect(() => {
    if (!picturesPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [picturesPageData, animationPlayed]);

  useEffect(() => {
    const animations: gsap.core.Animation[] = [];
    // Selectors
    const pageWrapper = document.getElementById(
      "page-wrapper",
    ) as HTMLDivElement | null;
    const headerLeft = document.querySelector(
      ".header-left",
    ) as HTMLDivElement | null;
    const headerRight = document.querySelector(
      ".header-right",
    ) as HTMLDivElement | null;
    const bannerBackgroundOverlay = main.current?.querySelector(
      ".first-intro .intro-background .intro-bg-mask",
    );
    if (pageWrapper) {
      const mainAnim = gsap.to(pageWrapper, {
        opacity: 1,
        ease: "none",
        duration: 0.5,
        delay: 0,
      });
      animations.push(mainAnim);
    }
    if (headerLeft) {
      const headerLeftAnim = gsap.to(headerLeft, {
        autoAlpha: 1,
        ease: "none",
        duration: 1,
      });
      animations.push(headerLeftAnim);
    }
    if (headerRight) {
      const headerRightAnim = gsap.to(headerRight, {
        autoAlpha: 1,
        ease: "none",
        duration: 0,
      });
      animations.push(headerRightAnim);
    }
    // Wave Line Animation
    const waveMask = document.getElementById(
      "wave-mask",
    ) as HTMLDivElement | null;
    if (waveMask) {
      const waveMaskAnim = gsap.to(waveMask, {
        translateY: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 0,
        delay: 0,
      });
      animations.push(waveMaskAnim);
    }
    if (bannerBackgroundOverlay) {
      const bannerBackgroundOverlayAnim = gsap.to(bannerBackgroundOverlay, {
        translateY: "-100%",
        delay: 0,
        duration: 0,
        ease: "expo.inOut",
      });
      animations.push(bannerBackgroundOverlayAnim);
    }

    gsap.to(window, {
      scrollTo: postPagination * window.innerWidth,
      duration: 0,
      ease: "none",
    });

    // Return
    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [postDataLoaded]);

  useEffect(() => {
    if (!picturesPageData) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const newSectionWidth =
        10 +
        picturesPageData?.posts?.length * 44.27 +
        picturesPageData?.posts?.length +
        1 * 10 +
        (200 / 19.2) * 2;

      setSectionWidth(newSectionWidth < 100 ? 100 : newSectionWidth);
      setContainerWidth(newSectionWidth < 100 ? 100 : newSectionWidth);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [picturesPageData]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      setPageContentAnimation();
      // Overflow body
      const progress = document.getElementById(
        "progress",
      ) as HTMLElement | null;
      const waveLine = document.getElementById(
        "wave-line",
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
                gsap.to(waveLine, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              } else {
                gsap.to(waveLine, {
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
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && main.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLDivElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLDivElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLDivElement | null;
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
          // Wave Line Animation
          const waveMask = document.getElementById(
            "wave-mask",
          ) as HTMLDivElement | null;
          if (waveMask) {
            tl.to(
              waveMask,
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
          animations.push(tl);
        }
      });
    }
    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    //const animations: gsap.core.Animation[] = [];
    // Page Content Animation
    // const sidebar = main.current?.querySelector(
    //   ".sheet-sidebar .sheet-sidebar-wrapper",
    // );
    // Animations
    // if (sidebar) {
    //   const sideAnimation = gsap.from(sidebar, {
    //     xPercent: 100,
    //     opacity: 0,
    //     ease: "expo.inOut",
    //     duration: 3,
    //     delay: 0,
    //   });
    //   animations.push(sideAnimation);
    // }
    // Contents
    // if (sheetContent) {
    //   sheetContent.forEach((section, index) => {
    //     console.log("Animating Section:", GetRightPosition(section));
    //     // Custom Content Item
    //     if (section) {
    //       gsap.set(section, {
    //         xPercent: -50,
    //         opacity: 0,
    //       });
    //       const contentAnimation = gsap.to(section, {
    //         xPercent: 0,
    //         opacity: 1,
    //         ease: "slow(0.1,1,false)",
    //         duration: 1.5,
    //         delay: 0,
    //         scrollTrigger: {
    //           trigger: section,
    //           start: () => {
    //             return GetRightPosition(section) - window.innerWidth * 0.5;
    //           },
    //           toggleActions: "restart pause resume reverse",
    //         },
    //       });
    //       animations.push(contentAnimation);
    //     }
    //   });
    // }
    // // ReadMore Button
    // if (sheetReadmore) {
    //   gsap.set(sheetReadmore, {
    //     xPercent: -50,
    //     opacity: 0,
    //   });
    //   const readmoreAnimation = gsap.to(sheetReadmore, {
    //     xPercent: 0,
    //     opacity: 1,
    //     ease: "expo.inOut",
    //     duration: 1,
    //     delay: 0,
    //     scrollTrigger: {
    //       trigger: sheetReadmore,
    //       start: () => {
    //         return GetRightPosition(sheetReadmore) - window.innerWidth * 0.5;
    //       },
    //       toggleActions: "restart pause resume reverse",
    //     },
    //   });
    //   animations.push(readmoreAnimation);
    // }
    // Return Animation Complete Promise
    // return () => {
    //   animations.forEach((animation) => animation.kill());
    // };
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

  // On

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

  if (!picturesPageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Pictures Not Found</h1>
          <p className="text-gray-600">
            The requested pictures could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    picturesPageData && (
      <main
        ref={main}
        id="page"
        dir="ltr"
        className="main relative overflow-hidden z-10"
      >
        <div
          ref={panel}
          id="panel-wrapper"
          className="w-screen h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${containerWidth}vw] h-screen items-center will-change-transform`}
          >
            <CyclePicturesSection
              extraClass={`min-w-screen w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]`}
              animWidthText={1}
              sectionData={picturesPageData.posts}
              parentCategories={picturesPageData.parentCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              postPagination={postPagination}
              totalPostPages={totalPostPages}
              setPostPagination={setPostPagination}
            />
          </div>
        </div>
      </main>
    )
  );
}
