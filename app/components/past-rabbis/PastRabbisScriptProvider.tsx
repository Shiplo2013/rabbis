"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CustomsContentSection from "../../components/past-rabbis/CustomsContentSection";
import Introduction from "../../components/past-rabbis/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PastRabbisScriptProvider({ data }: { data: any }) {
  // Selectors
  const [rabbisPageData, setRabbisPageData] = useState<null | any>(null);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [footerData, setFooterData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  // Router Path
  const pathname = usePathname();

  // Animation State
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
    if (!data) {
      setError("No data provided.");
      return;
    }
    setRabbisPageData(data);
  }, [data]);

  // Page Data Loaded
  useEffect(() => {
    if (!rabbisPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [rabbisPageData, animationPlayed]);

  useEffect(() => {
    if (!rabbisPageData?.pageData || !rabbisPageData?.posts) {
      return;
    }

    const updateSectionWidth = () => {
      const newSectionWidth =
        rabbisPageData?.posts.length * 58.4 +
        (rabbisPageData?.posts.length - 1) * 10 +
        100;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [rabbisPageData?.pageData, rabbisPageData?.posts]);

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

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
          ".first-intro .intro-title",
        );
        // Banner Button
        const introContent = main.current?.querySelectorAll(
          ".first-intro .intro-content>p",
        );
        // Past Rabbis
        const firstRabbis = main.current?.querySelector(
          ".rabbis-section .rabbis-item:first-child",
        );
        if (firstRabbis) {
          gsap.set(firstRabbis, {
            opacity: 0,
          });
        }
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
          // First Rabbis
          if (firstRabbis) {
            tl.to(
              firstRabbis,
              {
                marginRight: "-13vw",
                opacity: 1,
                delay: 0,
                duration: 3,
                ease: "expo.inOut",
              },
              "-=2.5",
            );
          }
          // Wave Mask Animation
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
        }
      });
    }
  }, [animationPlayed, pageDataFetched]);

  // Set Page Content Animation
  useGSAP(() => {
    // Page Content Animation
    const firstRabbis = main.current?.querySelector(
      ".rabbis-section .rabbis-item:first-child",
    );
    const RabbisItem = main.current?.querySelectorAll(
      ".rabbis-section .rabbis-item:not(:first-child)",
    );

    // First Rabbis
    if (firstRabbis) {
      gsap.to(firstRabbis, {
        x: "0vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return window.innerWidth * 1;
          },
          scrub: 2,
        },
      });
    }

    // Contents
    if (RabbisItem) {
      RabbisItem.forEach((section, index) => {
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
                return GetRightPosition(section) - window.innerWidth * 0.7;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
        }
      });
    }
  }, [pathname, pageDataFetched]);

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

  if (!rabbisPageData) {
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
    rabbisPageData && (
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
              bgImage={""}
              bgOverlay={""}
              data={
                rabbisPageData?.pageData?.acf?.introduction
                  ? [rabbisPageData?.pageData?.acf?.introduction]
                  : []
              }
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
              data={rabbisPageData?.posts}
            />
          </div>
        </div>
      </main>
    )
  );
}
