"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import CustomsContentSection from "../components/knesset/CustomsContentSection";
import Introduction from "../components/knesset/Introduction";
import LoadingEffect from "../components/LoadingEffect";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Selectors
  const [knessetPageData, setKnessetPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  // Router Path
  const pathname = usePathname();

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
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
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadKnessetPageData = async () => {
      try {
        const response = await fetch("/api/the-knesset-of-customs", {
          cache: "no-store",
        });
        const response3 = await fetch(
          "/api/the-knesset-of-customs/categories",
          {
            cache: "no-store",
          },
        );
        const normalizedSearch = submittedSearch.trim();
        const normalizedCategory = selectedCategory?.trim();
        const postsUrl = normalizedSearch
          ? `/api/the-knesset-of-customs/posts?search=${encodeURIComponent(normalizedSearch)}${normalizedCategory ? `&knesset_cat=${encodeURIComponent(normalizedCategory)}` : ""}`
          : normalizedCategory
            ? `/api/the-knesset-of-customs/posts?knesset_cat=${encodeURIComponent(normalizedCategory)}`
            : "/api/the-knesset-of-customs/posts";
        const response2 = await fetch(postsUrl, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load the knesset of customs page data.");
        }

        if (!response2.ok) {
          throw new Error("Failed to load the knesset of customs posts data.");
        }

        if (!response3.ok) {
          throw new Error(
            "Failed to load the knesset of customs categories data.",
          );
        }

        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        if (isMounted) {
          setKnessetPageData({
            pageData: data,
            postsData: data2,
            categoriesData: data3,
          });
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setError("Failed to load the knesset of customs page data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setPostLoading(false);
        }
      }
    };

    loadKnessetPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname, submittedSearch, selectedCategory]);

  useEffect(() => {
    if (!knessetPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);

      const updateSectionWidth = () => {
        const newSectionWidth =
          knessetPageData?.postsData?.posts?.length * 25.4 +
          (knessetPageData?.postsData?.posts?.length - 1) * 3.2 +
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
            gsap.to(progress.current, { width: `${100 * self.progress}%` });
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
        const headerLeft = main.current?.querySelector(".header-left");
        const headerRight = main.current?.querySelector(".header-right");
        const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
        rabbisContent?.forEach((section) => {
          section.classList.add("opacity-0");
        });
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
      });
    }
  }, [pageDataFetched]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const sheetContent = main.current?.querySelectorAll(
      ".sheet-content .custom-content-item",
    );
    const subscribeForm = main.current?.querySelector(
      ".sheet-content .subscribe-form",
    );
    const sheetReadmore = main.current?.querySelector(".sheet-readmore");
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    );

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

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
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
                  categories={knessetPageData?.categoriesData?.terms || []}
                  activeCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                  onSearchSubmit={setSubmittedSearch}
                  setPostLoading={setPostLoading}
                  postLoading={postLoading}
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
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#F5F0EB] z-10"
            ></div>
          </div>
        </div>
      </div>
    )
  );
}
