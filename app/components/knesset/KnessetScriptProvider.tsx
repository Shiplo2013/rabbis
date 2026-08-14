"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import { wpFetch } from "@/app/lib/wpFetch";
import CustomContentItem from "@/app/ui/CustomContentItem";
import { useInView } from "react-intersection-observer";
import CustomsContentSection from "../../components/knesset/CustomsContentSection";
import Introduction from "../../components/knesset/Introduction";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function KnessetScriptProvider({
  data,
}: {
  data: { pageData: any; categoriesData: any; postsData: any };
}) {
  // Selectors
  const [knessetPageData, setKnessetPageData] = useState<null | any>(null);
  const [knessetPostsData, setKnessetPostsData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [postLoading, setPostLoading] = useState(true);
  // Router Path
  const pathname = usePathname();

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [containerWidth, setContainerWidth] = useState(200);
  const [sectionWidth, setSectionWidth] = useState(100);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentScrollPos, setCurrentScrollPos] = useState(0);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // App States
  const {
    knessetCategoryData,
    setKnessetCategoryData,
    knessetSearchQuery,
    knessetActiveCategory,
  } = useAppState();

  // Posts Data
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
    setKnessetPageData(data.pageData);
    setKnessetCategoryData(data.categoriesData);
    setKnessetPostsData(data.postsData?.posts || []);
  }, [data]);

  // Set Posts Data when sheetPostsData changes
  useEffect(() => {
    if (!knessetPostsData) {
      return;
    }
    setVerticalPosts(knessetPostsData?.slice(0, 3) || []);
    setNormalPosts(
      knessetPostsData?.slice(3, postsPerLoad * postLoadCount) || [],
    );
    setIsLoadingMore(false);
  }, [knessetPostsData, postLoadCount]);

  // Search and Category Filter
  useEffect(() => {
    if (
      (knessetActiveCategory !== null && knessetActiveCategory !== "0") ||
      (knessetSearchQuery !== "" && knessetSearchQuery !== null)
    ) {
      if (
        knessetActiveCategory !== null &&
        knessetActiveCategory !== "0" &&
        (knessetSearchQuery === "" || knessetSearchQuery === null)
      ) {
        const filteredPosts = data?.postsData?.posts?.filter((post: any) => {
          return post.knesset_cat?.[0] === Number(knessetActiveCategory);
        });
        setKnessetPostsData(filteredPosts || []);
        setVerticalPosts(knessetPostsData?.slice(0, 3) || []);
        setNormalPosts(
          knessetPostsData?.slice(3, postsPerLoad * postLoadCount) || [],
        );
      }
      if (
        knessetSearchQuery !== "" &&
        knessetSearchQuery !== null &&
        (knessetActiveCategory === null || knessetActiveCategory === "0")
      ) {
        const filteredPosts = data?.postsData?.posts?.filter((post: any) => {
          return (
            post.title?.rendered
              .toLowerCase()
              .includes(knessetSearchQuery.toLowerCase()) ||
            post?.excerpt?.rendered
              .toLowerCase()
              .includes(knessetSearchQuery.toLowerCase())
          );
        });
        setKnessetPostsData(filteredPosts);
        setVerticalPosts(filteredPosts?.slice(0, 3) || []);
        setNormalPosts(
          filteredPosts?.slice(3, postsPerLoad * postLoadCount) || [],
        );
      }
      if (
        knessetActiveCategory !== null &&
        knessetActiveCategory !== "0" &&
        knessetSearchQuery !== "" &&
        knessetSearchQuery !== null
      ) {
        const filteredPosts = data?.postsData?.posts?.filter((post: any) => {
          return (
            post.knesset_cat?.[0] === Number(knessetActiveCategory) &&
            (post.title?.rendered
              .toLowerCase()
              .includes(knessetSearchQuery.toLowerCase()) ||
              post?.excerpt?.rendered
                .toLowerCase()
                .includes(knessetSearchQuery.toLowerCase()))
          );
        });
        setKnessetPostsData(filteredPosts || []);
        setVerticalPosts(filteredPosts?.slice(0, 3) || []);
        setNormalPosts(
          filteredPosts?.slice(3, postsPerLoad * postLoadCount) || [],
        );
      }
    } else {
      setKnessetPostsData(data?.postsData?.posts || []);
      setVerticalPosts(knessetPostsData?.slice(0, 3) || []);
      setNormalPosts(
        knessetPostsData?.slice(3, postsPerLoad * postLoadCount) || [],
      );
    }

    window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
  }, [knessetActiveCategory, knessetSearchQuery]);

  // Set Section Width
  useEffect(() => {
    if (!knessetPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
      setPostLoading(false);
    }
  }, [knessetPageData, animationPlayed]);

  // Get more posts
  const LoadMorePosts = () => {
    if (isLoadingMore || !hasMorePosts || currentPage >= totalPages) return;
    setIsLoadingMore(true);
    let isMounted = true;

    const getPostsData = async () => {
      try {
        const postsUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?orderby=menu_order&order=asc&_fields=id,title,slug,excerpt,acf.subtitle&per_page=${postPerPage}&page=${currentPage + 1}`;

        const response = await wpFetch(postsUrl, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load knesset of customs page data.");
        }
        const data = await response.json();

        if (isMounted) {
          if (data?.posts?.length < postPerPage) {
            setHasMorePosts(false);
          }

          setKnessetPostsData((prevPosts: any) => [
            ...prevPosts,
            ...(data?.posts || []),
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoadingMore(false);
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    getPostsData();
  };

  // Load More Posts when inView is true
  useEffect(() => {
    if (isReadMoreInView) {
      setIsLoadingMore(true);
      setPostLoadCount((prevCount) => prevCount + 1);

      if (postLoadCount! === postLoadLimit! && hasMorePosts) {
        LoadMorePosts();
      }
    }
  }, [isReadMoreInView]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      setPageContentAnimation();
    }
    // Return
  }, [pageDataFetched]);

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
  }, [pageDataFetched]);

  // Revalidate Timeline
  useEffect(() => {
    if (verticalSection && currentScrollPos > 0) {
      let currentProgress = verticalSection.progress();
      verticalSection.invalidate().restart();
      verticalSection.progress(currentProgress).play();
    }
  }, [containerWidth, verticalSection]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const page = document.getElementById(
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
          ".first-intro .intro-title",
        ) as HTMLElement | null;
        // Banner Button
        const introContent = main.current?.querySelector(
          ".first-intro .intro-content",
        ) as HTMLElement | null;
        const introContentButton = main.current?.querySelector(
          ".first-intro .readmore-button",
        ) as HTMLElement | null;
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        ) as HTMLElement | null;
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
        // Intro Content Button
        if (introContentButton) {
          gsap.set(introContentButton, {
            yPercent: 150,
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
          if (introContentButton) {
            tl.to(
              introContentButton,
              {
                yPercent: 0,
                opacity: 1,
                duration: 3,
                delay: 0,
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
    const sidebar = document.getElementById(
      "knesset-sidebar",
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

  // Change logo on scroll to 200px
  useEffect(() => {
    const handleScroll = () => {
      const logo = document.getElementById("logo-light");
      const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
      if (window.scrollY > 200) {
        logoImage?.classList.remove("white-image");
      } else {
        logoImage?.classList.add("white-image");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

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

  if (!knessetPageData) {
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
    knessetPageData && (
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
                "--section-width": `${containerWidth}vw`,
              } as React.CSSProperties
            }
            className={`section-wrapp w-full flex lg:flex-nowrap flex-col lg:flex-row-reverse lg:w-(--section-width) lg:h-screen items-center will-change-transform`}
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={IntroBG}
              bgOverlay={""}
              data={knessetPageData}
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
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass={`w-full lg:min-w-(--section-width) lg:w-(--section-width) lg:h-screen panel-section will-change-transform py-12 px-[10vw] sm:py-[5vw] sm:px-[10vw] sm:px-[6.25vw] lg:px-14.5`}
              animWidthText={1}
              data={verticalPosts}
              categories={knessetPageData?.categoriesData || []}
              activeCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onSearchSubmit={setSubmittedSearch}
              setPostLoading={setPostLoading}
              postLoading={postLoading}
              setCurrentScrollPos={setCurrentScrollPos}
            />
          </div>
        </div>
        <div className="normal-scrolling w-full lg:min-h-[50vh] bg-[#F5F0EB] px-[8vw] lg:px-14.5 pb-[10vh] will-change-transform">
          <div className="wrapper w-full flex flex-col items-center justify-center gap-y-[10vh] relative lg:pr-85">
            <div
              className={`normal-posts flex flex-row flex-wrap gap-x-10 gap-y-12 justify-end`}
            >
              {normalPosts?.map((post: any, index: number) => {
                return (
                  <Fragment key={`knesset-entry-${index}`}>
                    <CustomContentItem
                      key={index}
                      data={post}
                      postLoading={postLoading}
                    />
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
