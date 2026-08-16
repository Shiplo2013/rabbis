"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import { useInView } from "react-intersection-observer";
import CyclePicturesSection from "../../components/cycle-pictures/CyclePicturesSection";
import Introduction from "../../components/cycle-pictures/Introduction";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CyclePicturesScriptProvider({
  data,
}: {
  data: { pageData: any; postsData: any; categoryData: any };
}) {
  // Selectors
  const [picturesPageData, setPicturesPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(200);
  const [sectionWidth, setSectionWidth] = useState(100);
  const [error, setError] = useState<string | null>(null);
  // Router Path
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(-1);
  const [totalPostPages, setTotalPostPages] = useState(1);
  const [currentPositions, setCurrentPositions] = useState(0);
  const [postDataLoaded, setPostDataLoaded] = useState(false);
  // Animation State
  const {
    isLoading,
    setIsLoading,
    animationPlayed,
    setAnimationPlayed,
    cycleCategories,
    setCycleCategories,
    cycleActiveCategory,
  } = useAppState();
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);
  const verticalSectionRef = useRef<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [allPosts, setAllPosts] = useState<any | []>([]);
  const [postPerPage, setPostPerPage] = useState(100);
  const [postsPerLoad, setPostsPerLoad] = useState(12);
  const [postLoadCount, setPostLoadCount] = useState(1);
  const [postLoadLimit, setPostLoadLimit] = useState(
    Math.ceil(Number(data?.postsData?.posts?.length || 0) / postsPerLoad),
  );
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [noPostsFound, setNoPostsFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(
    Number(data?.postsData?.totalPage ?? 1) > 1,
  );
  const [totalPages, setTotalPages] = useState(
    Number(data?.postsData?.totalPage ?? 1),
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [verticalPosts, setVerticalPosts] = useState<any[]>([]);
  const [normalPosts, setNormalPosts] = useState<any[]>([]);
  const { ref: readMoreRef, inView: isReadMoreInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setPicturesPageData({
      introduction: data.pageData?.acf?.introduction,
      posts: data.postsData?.posts,
      parentCategories: data.categoryData,
    });
    setAllPosts(data.postsData?.posts || []);
    setCycleCategories(data.categoryData);
  }, [data]);

  // All posts data loaded
  useEffect(() => {
    if (!allPosts) {
      return;
    }
    setVerticalPosts(allPosts?.slice(0, 2) || []);
    setNormalPosts(allPosts?.slice(2, postsPerLoad * postLoadCount) || []);
    setIsLoadingMore(false);
  }, [allPosts, postLoadCount]);

  // Load More Posts when inView is true
  useEffect(() => {
    if (isReadMoreInView) {
      setIsLoadingMore(true);
      setPostLoadCount((prevCount) => prevCount + 1);
    }
  }, [isReadMoreInView]);

  // On Category select
  useEffect(() => {
    if (cycleActiveCategory === -1) {
      setAllPosts(data.postsData?.posts || []);
    } else {
      const filteredPosts = data.postsData?.posts?.filter((post: any) => {
        const postCategoryId = post?.committee_cat?.[0] || 0;
        return postCategoryId === cycleActiveCategory;
      });
      if (filteredPosts?.length === 0) {
        setNoPostsFound(true);
        setAllPosts([]);
      } else {
        setNoPostsFound(false);
        setAllPosts(filteredPosts);
      }
    }

    window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
  }, [cycleActiveCategory]);

  // Page data loaded
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

    // Return
    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [postDataLoaded]);

  // Page Section Animation
  useGSAP(() => {
    setPageContentAnimation();
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
      const pagination = document.getElementById(
        "posts-pagination",
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
          //invalidateOnRefresh: true,
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
            if (pagination) {
              if (self.progress > 0.3 && self.progress < 0.97) {
                gsap.to(pagination, {
                  autoAlpha: 1,
                  duration: 0.1,
                  delay: 0,
                });
              }
              if (self.progress > 0.97) {
                gsap.to(pagination, {
                  autoAlpha: 0,
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
        //invalidateOnRefresh: true,
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
  }, [pathname, pageDataFetched, containerWidth]);

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
          if (headerRight && window.innerWidth > 1024) {
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
              "<",
            );
          }
          if (introContent && splitContent) {
            tl.to(
              splitContent,
              {
                yPercent: 0,
                opacity: 1,
                duration: 3,
                delay: 0.2,
                stagger: 0.05,
                ease: "expo.inOut",
              },
              "<",
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
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const sidebar = document.getElementById(
      "cycle-sidebar",
    ) as HTMLDivElement | null;

    // Animations
    if (sidebar && window.innerWidth > 1024) {
      gsap.set(sidebar, {
        x: 340,
      });
      // Sidebar Animation
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowWidth = window.innerWidth * 1.8;
        const pageHeight = main?.current?.offsetHeight;

        if (scrollTop > windowWidth) {
          gsap.to(sidebar, {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebar, {
            x: 340,
            duration: 0.5,
            ease: "power2.out",
          });
        }
        // Hide sidebar when reaching the end of the page
        if (scrollTop > (pageHeight || 0) - window.innerHeight) {
          gsap.to(sidebar, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebar, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      gsap.set(sidebar, {
        autoAlpha: 0,
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

  // Hide header-left on scroll down, show on scroll up (only for this page)
  useGSAP(() => {
    if (!isAllAnimationComplete || !main.current) {
      return;
    }

    const headerLeft = document.querySelector(
      "#header .header-left",
    ) as HTMLElement | null;

    if (!headerLeft) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isHidden = false;
    const deltaThreshold = 6;

    const showHeaderLeft = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(headerLeft, {
        y: "0%",
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const hideHeaderLeft = () => {
      if (isHidden) return;
      isHidden = true;
      gsap.to(headerLeft, {
        y: "-120%",
        autoAlpha: 0,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < deltaThreshold) {
        return;
      }

      if (currentScrollY <= 10 || diff < 0) {
        showHeaderLeft();
      } else if (diff > 0) {
        hideHeaderLeft();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.set(headerLeft, { clearProps: "transform,opacity,visibility" });
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
          className="w-screen lg:h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            style={
              {
                "--container-width": `${containerWidth}vw`,
              } as React.CSSProperties
            }
            className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-(--container-width) lg:h-screen items-center will-change-transform`}
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
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass={`w-full lg:min-w-(--section-width) lg:w-(--section-width) lg:h-screen panel-section will-change-transform py-[10vh] lg:py-[5vw] px-[8vw] lg:px-15`}
              animWidthText={1}
              sectionData={verticalPosts}
              parentCategories={cycleCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              totalPostPages={totalPostPages}
            />
          </div>
        </div>
        <div className="normal-scrolling w-full lg:min-h-[50vh] bg-[#1A1A1A] px-[8vw] lg:px-14.5 pb-[10vh] will-change-transform">
          <div className="wrapper w-full flex flex-col items-center justify-center gap-y-[10vh] relative lg:pr-85">
            <div
              className={`normal-posts flex flex-row flex-wrap gap-x-15 gap-y-15 justify-end`}
            >
              {normalPosts?.map((post: any, index: number) => {
                return (
                  <Fragment key={`sheet-entry-${index}`}>
                    <SingleCyclePicture key={index} data={post} />
                  </Fragment>
                );
              })}
            </div>
            {postLoadCount! < postLoadLimit! && (
              <div
                ref={readMoreRef}
                className={`sheet-readmore w-full lg:min-w-50 flex items-center justify-center ${isLoadingMore ? "animate-pulse" : "animate-bounce"}`}
              >
                <button
                  className="text-[25px] sm:text-[35px] lg:text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500 disabled:cursor-not-allowed"
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "טְעִינָה..." : "טוען פריטים נוספים"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    )
  );
}
