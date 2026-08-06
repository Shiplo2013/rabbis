"use client";
import SheetContentSection from "@/app/components/sheets/SheetContentSection";
import { wpFetch } from "@/app/lib/wpFetch";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import SheetContentItem from "@/app/ui/SheetContentItem";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";
import Introduction from "../../components/sheets/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CommunitiesSheetsScriptProvider({
  data,
}: {
  data: {
    pageData: any;
    postsData: {
      posts: any;
      totalPage: string | null;
    };
    categoriesTree: any;
  };
}) {
  // Router Path
  const pathname = usePathname();
  const [sheetPageData, setSheetPageData] = useState<any | []>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [postPerPage, setPostPerPage] = useState(10);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [activeCategory, setActiveCategory] = useState(0);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [noPostsFound, setNoPostsFound] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
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

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data available.");
      return;
    }
    setSheetPageData(data);
    setVerticalPosts(data?.postsData?.posts.slice(0, 6) || []);
    setNormalPosts(data?.postsData?.posts.slice(6) || []);
  }, [data]);

  // // Reset page when category changes
  // useEffect(() => {
  //   setCurrentPage(1);
  //   setCatPostsData(null);
  //   setHasMorePosts(false);
  // }, [activeCategory, selectedCategoryId]);

  // Get posts by active category index
  // useEffect(() => {
  //   if (!sheetPageData) {
  //     return;
  //   }

  //   let isMounted = true;
  //   if (currentPage === 1) {
  //     setIsPostLoaded(false);
  //   } else {
  //     setIsLoadingMore(true);
  //   }

  //   const loadPostsByCategory = async () => {
  //     try {
  //       const selectedCategory =
  //         sheetPageData?.categoriesTree?.[activeCategory];
  //       const childIds = (selectedCategory?.children || [])
  //         .map((child: { id: number }) => child?.id)
  //         .filter(Boolean);
  //       const categoryIds = selectedCategoryId
  //         ? [selectedCategoryId]
  //         : selectedCategory?.id
  //           ? [selectedCategory.id, ...childIds]
  //           : [];

  //       const postsUrl = categoryIds.length
  //         ? `/api/communities/sheets/posts?magazines_cat=${categoryIds.join(",")}&per_page=5&page=${currentPage}`
  //         : `/api/communities/sheets/posts?per_page=5&page=${currentPage}`;

  //       const response2 = await fetch(postsUrl, {
  //         cache: "no-store",
  //       });

  //       if (!response2.ok) {
  //         throw new Error("Failed to load community page data.");
  //       }

  //       const data2 = await response2.json();

  //       // Fallback: if selected category has no posts, show latest 5 posts.
  //       if (categoryIds.length && !(data2?.posts?.length > 0)) {
  //         setNoPostsFound(true);
  //       } else {
  //         setNoPostsFound(false);
  //       }

  //       if (isMounted) {
  //         setCatPostsData(data2?.posts || []);
  //         const page = data2?.pagination?.page ?? 1;
  //         const totalPages = data2?.pagination?.total_pages ?? 1;
  //         setHasMorePosts(page < totalPages);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       if (isMounted) {
  //         setIsPostLoaded(true);
  //         setIsLoadingMore(false);
  //       }
  //     }
  //   };

  //   loadPostsByCategory();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [activeCategory, selectedCategoryId]);

  // Load more posts when currentPage changes
  useEffect(() => {
    if (selectedCategoryId === null) return; // Skip initial load
    let isMounted = true;
    setIsLoadingMore(true);

    const loadMorePosts = async () => {
      try {
        const selectedCategory =
          sheetPageData?.categoriesTree?.[activeCategory];
        const childIds = (selectedCategory?.children || [])
          .map((child: { id: number }) => child?.id)
          .filter(Boolean);
        const categoryIds = selectedCategoryId
          ? [selectedCategoryId]
          : selectedCategory?.id
            ? [selectedCategory.id, ...childIds]
            : [];

        const postsUrl = categoryIds.length
          ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines?magazines_cat=${categoryIds.join(
              ",",
            )}&per_page=${postPerPage}&page=${currentPage}`
          : `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines?per_page=${postPerPage}&page=${currentPage}`;

        const response = await wpFetch(postsUrl, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load community page data.");
        }
        const data = await response.json();

        if (isMounted) {
          if (data?.posts?.length < postPerPage) {
            setHasMorePosts(false);
          }
          setVerticalPosts(data?.postsData?.posts.slice(0, 6) || []);
          setNormalPosts(data?.postsData?.posts.slice(6) || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoadingMore(false);
        }
      }
    };

    loadMorePosts();
  }, [selectedCategoryId]);

  // Get more posts
  const LoadMorePosts = () => {
    if (isLoadingMore || !hasMorePosts || currentPage >= totalPages) return;
    setIsLoadingMore(true);
    let isMounted = true;

    const getPostsData = async () => {
      try {
        const postsUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,acf&per_page=${postPerPage}&page=${currentPage + 1}`;

        const response = await wpFetch(postsUrl, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load community page data.");
        }
        const data = await response.json();

        if (isMounted) {
          if (data?.posts?.length < postPerPage) {
            setHasMorePosts(false);
          }

          setNormalPosts((prevPosts) => [...prevPosts, ...(data || [])]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoadingMore(false);
          setCurrentPage((prevPage) => prevPage + 1);
          // Refresh vertical section animation after loading more posts
          if (verticalSection) {
            verticalSection.clear();
            ScrollTrigger.refresh();
            verticalSection.restart();
          }
        }
      }
    };

    getPostsData();
  };

  // Update section width on window resize
  useEffect(() => {
    if (!sheetPageData) {
      return;
    }
    setPageDataFetched(true);
    setIsLoading(false);

    const updateSectionWidth = () => {
      const newSectionWidth =
        12.5 + // Section padding
        11.35 + // Sidebar filters
        6 * 18 + // Each post width
        6 * 3.2 + // Gap between posts
        5.8 + // content gap
        26.35 + // Subscriber form width
        5.8 + // content gap
        10.41; // Readmore button width
      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [sheetPageData]);

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (
      typeof window !== "undefined" &&
      panel.current &&
      wrapper.current &&
      window.innerWidth > 1024
    ) {
      setPageContentAnimation();
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
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
    // Page Content Animation
    const sheetContent = document.querySelectorAll(
      ".sheet-content .sheet-item",
    ) as NodeListOf<HTMLDivElement> | null;
    const subscribeForm = document.querySelector(
      ".sheet-content .subscribe-form",
    ) as HTMLDivElement | null;
    const sheetReadmore = document.querySelector(
      ".sheet-readmore",
    ) as HTMLDivElement | null;
    const sidebar = document.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    ) as HTMLDivElement | null;

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
          //toggleActions: "restart pause resume reverse",
        },
      });
    }
    // Contents
    if (sheetContent) {
      sheetContent.forEach((section) => {
        const imageOverlay = section.querySelector(
          ".sheet-image-overlay",
        ) as HTMLDivElement | null;
        const sheetButtons = section.querySelector(
          ".sheet-icons",
        ) as HTMLDivElement | null;
        // Image Overlay
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return GetRightPosition(section) - window.innerWidth * 0.5;
            },
            //toggleActions: "restart pause resume reverse",
          },
        });
        if (imageOverlay) {
          tl.to(imageOverlay, {
            yPercent: -100,
            ease: "expo.inOut",
            duration: 1.5,
            delay: 0,
          });
        }
        // Sheets Buttons
        if (sheetButtons) {
          gsap.set(sheetButtons, {
            yPercent: 100,
            opacity: 0,
          });
          tl.to(
            sheetButtons,
            {
              yPercent: 0,
              opacity: 1,
              ease: "expo.inOut",
              duration: 1.5,
              delay: 0,
            },
            "-=1",
          );
        }
      });
    }
    // Subscribe From
    if (subscribeForm) {
      gsap.set(subscribeForm, {
        yPercent: 100,
        opacity: 0,
      });
      gsap.to(subscribeForm, {
        yPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 2,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 1.4;
          },
          //toggleActions: "restart pause resume reverse",
        },
      });
    }
    // ReadMore Button
    if (sheetReadmore) {
      gsap.set(sheetReadmore, {
        yPercent: 100,
        opacity: 0,
      });
      gsap.to(sheetReadmore, {
        yPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 2.6;
          },
          //toggleActions: "restart pause resume reverse",
        },
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

  if (!sheetPageData) {
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
    sheetPageData && (
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
              data={{
                title: sheetPageData?.pageData?.acf?.title || "",
                content: sheetPageData?.pageData?.acf?.content || "",
              }}
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
            <SheetContentSection
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass={`w-full lg:min-w-(--section-width) lg:w-(--section-width) lg:h-screen panel-section will-change-transform py-[6vh] sm:py-[10vh] lg:py-[5vw] px-[8vw] lg:px-[6.25vw]`}
              animWidthText={1}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onSelectCategoryId={setSelectedCategoryId}
              data={{
                posts: verticalPosts || [],
                categoriesTree: sheetPageData?.categoriesTree || [],
                isPostLoaded: isPostLoaded,
                noPostsFound: noPostsFound,
              }}
              hasMorePosts={hasMorePosts}
              isLoadingMore={isLoadingMore}
              onLoadMore={LoadMorePosts}
              setIsPostLoaded={setIsPostLoaded}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
        <div className="normal-scrolling w-full min-h-screen bg-black px-[5vw] py-[8vh]">
          <div className="wrapper w-full max-w-400 flex flex-col items-center justify-center gap-y-[10vh]">
            <div
              className={`normal-posts flex flex-row flex-wrap gap-x-[3.2vw] gap-y-[5vh]`}
            >
              {normalPosts?.map((post: any, index: number) => {
                return (
                  <SheetContentItem key={`normal-post-${index}`} data={post} />
                );
              })}
            </div>
            {hasMorePosts && currentPage! < totalPages! && (
              <div
                className={`sheet-readmore w-full lg:w-50 lg:min-w-50 flex items-center justify-center ${isLoadingMore ? "animate-pulse" : "animate-bounce"}`}
              >
                <button
                  className="text-[25px] sm:text-[35px] lg:text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (LoadMorePosts) {
                      LoadMorePosts();
                    }
                  }}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "טְעִינָה..." : "טען עוד"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    )
  );
}
