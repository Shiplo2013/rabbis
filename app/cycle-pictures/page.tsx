"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import CyclePicturesSection from "../components/cycle-pictures/CyclePicturesSection";
import Introduction from "../components/cycle-pictures/Introduction";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Selectors
  const [picturesPageData, setPicturesPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Router Path
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(-1);
  const [postPagination, setPostPagination] = useState(1);
  const [totalPostPages, setTotalPostPages] = useState(1);
  const [currentPositions, setCurrentPositions] = useState(0);
  const [postDataLoaded, setPostDataLoaded] = useState(false);
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

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const loadPicturesPageData = async () => {
      const response = fetch("/api/cycle-pictures", {
        cache: "no-store",
      });
      const response2 = fetch("/api/cycle-pictures/posts?per_page=6", {
        cache: "no-store",
      });
      const response3 = fetch("/api/cycle-pictures/categories", {
        cache: "no-store",
      });
      const response4 = fetch("/api/header", {
        cache: "force-cache",
      });
      try {
        const [pageData, postsData, categoriesData, headerData] =
          await Promise.all([response, response2, response3, response4]);

        if (
          !pageData.ok ||
          !postsData.ok ||
          !categoriesData.ok ||
          !headerData.ok
        ) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }

        const data = fetchError ? null : await pageData.json();
        const posts = fetchError ? null : await postsData.json();
        const categories = fetchError ? null : await categoriesData.json();
        const header = fetchError ? null : await headerData.json();

        if (isMounted) {
          setPicturesPageData({
            introduction: data?.acf?.introduction || [],
            posts: posts || [],
            parentCategories: categories?.parents || [],
          });
          setTotalPostPages(posts?.pagination?.total_pages || 1);
          setPostPagination(posts?.pagination?.page || 1);
          setHeaderData(header);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load pictures page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPicturesPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!picturesPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
    }
  }, [picturesPageData, animationPlayed]);

  // On Post Pagenation change
  useEffect(() => {
    setCurrentPositions(window.scrollY);

    if (postPagination === 1) {
      return;
    }
    const loadMorePosts = async () => {
      try {
        setIsLoading(true);
        setPostDataLoaded(false);
        setPageDataFetched(false);

        const response = await fetch(
          `/api/cycle-pictures/posts?per_page=6&page=${postPagination}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load more posts.");
        } else {
          const newPosts = await response.json();
          setPicturesPageData((prevData: any) => ({
            ...prevData,
            posts: {
              ...prevData.posts,
              posts: [...prevData.posts.posts, ...newPosts.posts],
              pagination: newPosts.pagination,
            },
          }));
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load more posts.");
      } finally {
        setIsLoading(false);
        setPageDataFetched(true);
        setPostDataLoaded(true);
      }
    };

    loadMorePosts();
  }, [postPagination]);

  useEffect(() => {
    const animations: gsap.core.Animation[] = [];
    // Selectors
    const headerLeft = main.current?.querySelector(".header-left");
    const headerRight = main.current?.querySelector(".header-right");
    const bannerBackgroundOverlay = main.current?.querySelector(
      ".first-intro .intro-background .intro-bg-mask",
    );
    if (main.current) {
      const mainAnim = gsap.to(main.current, {
        opacity: 1,
        ease: "none",
        duration: 0.5,
        delay: 0,
      });
      animations.push(mainAnim);
    }
    if (headerLeft) {
      const headerLeftAnim = gsap.to(headerLeft, {
        opacity: 1,
        ease: "none",
        duration: 1,
      });
      animations.push(headerLeftAnim);
    }
    if (headerRight) {
      const headerRightAnim = gsap.to(headerRight, {
        opacity: 1,
        ease: "none",
        duration: 0,
      });
      animations.push(headerRightAnim);
    }
    if (page.current) {
      const pageAnim = gsap.to(page.current, {
        opacity: 1,
        ease: "none",
        duration: 0,
      });
      animations.push(pageAnim);
    }
    // Wave Line Animation
    if (waveMask.current) {
      const waveMaskAnim = gsap.to(waveMask.current, {
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
        picturesPageData?.posts?.posts?.length * 44.27 +
        picturesPageData?.posts?.posts?.length +
        1 * 10 +
        (200 / 19.2) * 2;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
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
            if (progress.current) {
              gsap.to(progress.current, { width: `${100 * self.progress}%` });
            }
            if (self.progress > 0.97) {
              if (waveLine.current) {
                gsap.to(waveLine.current, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (waveLine.current) {
                gsap.to(waveLine.current, {
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
    if (
      typeof window !== "undefined" &&
      panel.current &&
      main.current &&
      page.current &&
      !isAllAnimationComplete
    ) {
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
          animations.push(tl);
        }
      });
    }
    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname, pageDataFetched, animationPlayed]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
    // Page Content Animation
    const sheetContent = main.current?.querySelectorAll(
      ".sheet-content .single-cycle-picture",
    );
    const sheetReadmore = main.current?.querySelector(".sheet-readmore");
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    );

    // Animations
    if (sidebar) {
      const sideAnimation = gsap.from(sidebar, {
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
      animations.push(sideAnimation);
    }
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

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      setIsLoading(true);
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
      <div ref={main} id="main" className="relative">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header data={headerData} animationStatus={isAllAnimationComplete} />
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
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${containerWidth}vw] h-screen items-center will-change-transform`}
              >
                <Introduction
                  animated={isAllAnimationComplete}
                  animationStatus={isAllAnimationComplete}
                  bgImage={IntroBG}
                  bgOverlay={""}
                  data={picturesPageData.introduction}
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
                <CyclePicturesSection
                  extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]`}
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
    )
  );
}
