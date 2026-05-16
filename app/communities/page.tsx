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
import GetRightPosition from "../ui/GetRightPosition";
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
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadCommunityPageData = async () => {
      try {
        const response = await fetch("/api/communities", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load community page data.");
        }

        const data = await response.json();
        // Second Response
        const categories = data?.acf?.select_categories ?? [];

        const postsByCategory = await Promise.all(
          categories.map(async (category: any) => {
            const categoryId = category?.term_id;
            const categoryTitle = category?.name;
            const response = await fetch(
              `/api/communities/posts?communities_cat=${categoryId}&per_page=20`,
              { cache: "no-store" },
            );

            if (!response.ok) {
              throw new Error(
                `Failed to load posts for category ${categoryId}`,
              );
            }

            const result = await response.json();

            return {
              categoryId,
              categoryTitle,
              posts: result.posts,
            };
          }),
        );

        if (isMounted) {
          setCommunityPageData({ pageData: data, postsData: postsByCategory });
        }
      } catch (error) {
        console.error(error);
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
    const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
    rabbisContent?.forEach((section) => {
      section.classList.add("opacity-0");
    });
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

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    document.fonts.ready.then(() => {
      // Page Content Animation
      const rabbisContent = main.current?.querySelectorAll(
        ".community-cat-section",
      );
      if (rabbisContent) {
        rabbisContent.forEach((section) => {
          const sectionTitle = section.querySelector(".community-cat-title h2");
          const sectionItems = section.querySelectorAll(
            ".single-community-post",
          );
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
                  return GetRightPosition(section) - window.innerWidth * 0.5;
                },
                toggleActions: "restart pause resume reverse",
              },
            });
          }
          if (sectionItems) {
            sectionItems.forEach((item) => {
              const postTitle = item.querySelector(".post-text .post-title");
              const postExcerpt = item.querySelector(
                ".post-text .post-location",
              );
              const postOverlay = item.querySelector(".post-image-overlay");
              // Post Title
              const postExcerptSplit = TextSplitLines(postExcerpt);
              gsap.set(postExcerpt, {
                perspective: 400,
              });
              gsap.set(postExcerptSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(postExcerptSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              // Post Title
              const postTitleSplit = TextSplitLines(postTitle);
              gsap.set(postTitle, {
                perspective: 400,
              });
              gsap.set(postTitleSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(postTitleSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              // Image Overlay
              gsap.to(postOverlay, {
                yPercent: -100,
                ease: "expo.inOut",
                duration: 1.5,
                delay: 0,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth * 0.5;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
            });
          }
        });
      }
    });
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
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
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
    communityPageData && (
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
