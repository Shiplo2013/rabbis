"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import CustomsContentSection from "../../components/knesset/CustomsContentSection";
import Introduction from "../../components/knesset/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
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
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [postLoading, setPostLoading] = useState(true);
  // Router Path
  const pathname = usePathname();

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    console.log(data, "data");
    setKnessetPageData(data);
  }, [data]);
  // Search and Category Filter
  //   useEffect(() => {
  //     let isMounted = true;

  //     const loadKnessetPageData = async () => {
  //       const response = fetch("/api/the-knesset-of-customs", {
  //         cache: "no-store",
  //       });
  //       const response3 = fetch("/api/the-knesset-of-customs/categories", {
  //         cache: "no-store",
  //       });
  //       const normalizedSearch = submittedSearch.trim();
  //       const normalizedCategory = selectedCategory?.trim();
  //       const postsUrl = normalizedSearch
  //         ? `/api/the-knesset-of-customs/posts?search=${encodeURIComponent(normalizedSearch)}${normalizedCategory ? `&knesset_cat=${encodeURIComponent(normalizedCategory)}` : ""}`
  //         : normalizedCategory
  //           ? `/api/the-knesset-of-customs/posts?knesset_cat=${encodeURIComponent(normalizedCategory)}`
  //           : "/api/the-knesset-of-customs/posts";
  //       const response2 = fetch(postsUrl, {
  //         cache: "no-store",
  //       });
  //       try {
  //         const [pageData1, pageData2, pageData3] = await Promise.all([
  //           response,
  //           response3,
  //           response2,
  //         ]);

  //         if (!pageData1.ok) {
  //           throw new Error("Failed to load the knesset of customs page data.");
  //         }

  //         if (!pageData2.ok) {
  //           throw new Error("Failed to load the knesset of customs posts data.");
  //         }

  //         if (!pageData3.ok) {
  //           throw new Error(
  //             "Failed to load the knesset of customs categories data.",
  //           );
  //         }

  //         const data = await pageData1.json();
  //         const data2 = await pageData2.json();
  //         const data3 = await pageData3.json();

  //         if (isMounted) {
  //           setKnessetPageData({
  //             pageData: data,
  //             postsData: data2,
  //             categoriesData: data3,
  //           });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         if (isMounted) {
  //           setError("Failed to load the knesset of customs page data.");
  //         }
  //       } finally {
  //         if (isMounted) {
  //           setIsLoading(false);
  //           setPostLoading(false);
  //         }
  //       }
  //     };

  //     loadKnessetPageData();

  //     return () => {
  //       isMounted = false;
  //     };
  //   }, [submittedSearch, selectedCategory]);

  useEffect(() => {
    if (!knessetPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
      setPostLoading(false);

      const updateSectionWidth = () => {
        const newSectionWidth =
          knessetPageData?.postsData?.length * 25.4 +
          (knessetPageData?.postsData?.length - 1) * 3.2 +
          100 +
          48;

        setSectionWidth(newSectionWidth);
        setContainerWidth(newSectionWidth + 100);
      };

      updateSectionWidth();
      window.addEventListener("resize", updateSectionWidth);
      return () => {
        window.removeEventListener("resize", updateSectionWidth);
      };
    }
  }, [knessetPageData, animationPlayed]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      setPageContentAnimation();
    }
    // Return
  }, [pageDataFetched]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
  }, [pageDataFetched]);

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

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const sheetContent = main.current?.querySelectorAll(
      ".sheet-content .custom-content-item",
    ) as NodeListOf<HTMLElement> | null;
    const subscribeForm = main.current?.querySelector(
      ".sheet-content .subscribe-form",
    ) as HTMLElement | null;
    const sheetReadmore = main.current?.querySelector(
      ".sheet-readmore",
    ) as HTMLElement | null;
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    ) as HTMLElement | null;

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
      sheetContent.forEach((section, index) => {
        // Custom Content Item
        if (section) {
          gsap.from(section, {
            xPercent: -50,
            opacity: 0,
            ease: "slow(0.1,1,false)",
            duration: 1.5,
            delay: 0,
            scrollTrigger: {
              start: () => {
                return GetRightPosition(section) - window.innerWidth * 0.5;
              },
              //toggleActions: "restart pause resume reverse",
            },
          });
        }
      });
    }
    // Subscribe From
    if (subscribeForm) {
      gsap.set(subscribeForm, {
        xPercent: -50,
        opacity: 0,
      });
      gsap.to(subscribeForm, {
        xPercent: 0,
        opacity: 1,
        ease: "slow(0.1,1,false)",
        duration: 2,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 1.5;
          },
          //toggleActions: "restart pause resume reverse",
        },
      });
    }
    // ReadMore Button
    if (sheetReadmore) {
      gsap.set(sheetReadmore, {
        xPercent: -50,
        opacity: 0,
      });
      gsap.to(sheetReadmore, {
        xPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 2.5;
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
              data={knessetPageData?.pageData}
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
              extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]`}
              animWidthText={1}
              data={knessetPageData?.postsData}
              categories={knessetPageData?.categoriesData || []}
              activeCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onSearchSubmit={setSubmittedSearch}
              setPostLoading={setPostLoading}
              postLoading={postLoading}
            />
          </div>
        </div>
      </main>
    )
  );
}
