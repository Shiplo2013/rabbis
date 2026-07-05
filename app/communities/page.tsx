"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import CommunitesPostCat from "../components/communites/CommunitiesPostCat";
import Introduction from "../components/communites/Introduction";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";
import TitleSplitChars from "../ui/TitleSplitChars";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  const [communityPageData, setCommunityPageData] = useState<any | []>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const fetchJsonWithRetry = async (url: string, retries = 2) => {
      let attempt = 0;

      while (attempt <= retries) {
        try {
          const response = await fetch(url, { cache: "no-store" });
          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }
          return await response.json();
        } catch (err) {
          if (attempt === retries) {
            throw err;
          }
          attempt += 1;
        }
      }

      throw new Error("Unreachable");
    };

    const loadCommunityPageData = async () => {
      try {
        if (isMounted) {
          setError(null);
        }

        const data = await fetchJsonWithRetry("/api/communities");
        // Second Response
        const categories = Array.isArray(data?.acf?.select_categories)
          ? data.acf.select_categories
          : [];

        const validCategories = categories.filter((category: any) =>
          Boolean(category?.term_id),
        );

        const validCategoryQuery = validCategories.map(
          async (category: any) => {
            const categoryId = category?.term_id;
            const categoryTitle = category?.name;
            try {
              const result = (await fetchJsonWithRetry(
                `/api/communities/posts?communities_cat=${categoryId}&per_page=20`,
              )) as { posts?: any[] };

              return {
                categoryId,
                categoryTitle,
                posts: Array.isArray(result.posts) ? result.posts : [],
              };
            } catch {
              console.warn(
                `Failed to load posts for category ${categoryId} (${categoryTitle ?? "unknown"})`,
              );
              return null;
            }
          },
        );

        const response2 = fetch("/api/header", {
          cache: "force-cache",
        });

        const [postsByCategory, headerData] = await Promise.all([
          Promise.all(validCategoryQuery),
          response2,
        ]);

        if (!headerData.ok) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }
        const header = fetchError ? null : await headerData.json();

        const successfulCategories = postsByCategory.filter(
          (
            item,
          ): item is { categoryId: any; categoryTitle: any; posts: any[] } =>
            item !== null,
        );

        const failedCount =
          validCategories.length - successfulCategories.length;

        // Do not block the page when only some categories fail.
        // Show an error only if we had valid categories and none of them loaded.
        if (
          isMounted &&
          validCategories.length > 0 &&
          successfulCategories.length === 0
        ) {
          setError(`Failed to load posts for all categories (${failedCount}).`);
        }

        if (isMounted) {
          setCommunityPageData({
            pageData: data,
            postsData: successfulCategories,
          });
          setHeaderData(header);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          // Keep the page usable even when upstream APIs fail temporarily.
          setCommunityPageData({ pageData: null, postsData: [] });
          setError(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCommunityPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!communityPageData) {
      return;
    }
    setPageDataFetched(true);

    const updateSectionWidth = () => {
      const newSectionWidth =
        communityPageData?.postsData.length * 24.3 +
        (communityPageData?.postsData.length - 1) * 15 +
        30 +
        communityPageData?.postsData
          .map((item: any) => item.posts.length - 1)
          .reduce((a: number, b: number) => a + b, 0) *
          5;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [communityPageData]);

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
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
            if (progress.current) {
              gsap.to(progress.current, { width: `${100 * self.progress}%` });
            }
            if (waveLine.current) {
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
  }, [pageDataFetched]);

  // Load Page
  useEffect(() => {
    // Selectors
    const headerLeft = main.current?.querySelector(".header-left");
    const headerRight = main.current?.querySelector(".header-right");
    // Banner Button
    const introTitle = main.current?.querySelector(".first-intro .intro-title");
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
      splitTitle = TitleSplitChars(introTitle);
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
    }
  }, [pageDataFetched]);

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
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
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

  return (
    communityPageData && (
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
                  data={communityPageData?.pageData}
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
                <section
                  className={`panel-section will-change-transform min-w-screen w-[${sectionWidth}vw] px-[15vw] box-border`}
                >
                  <div className="w-full flex justify-end gap-x-[15vw]">
                    {communityPageData?.postsData &&
                      communityPageData?.postsData?.map(
                        (categoryData: any, index: number) => (
                          <CommunitesPostCat
                            key={index}
                            postsContent={categoryData}
                            className={`will-change-transform rabbis-section-${index}`}
                          />
                        ),
                      )}
                  </div>
                </section>
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
    )
  );
}
