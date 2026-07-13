"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import { useAppState } from "../../components/AppContext";
import Introduction from "../../components/zatzel/Introduction";
import ZatzelContentSection from "../../components/zatzel/ZatzelContentSection";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ZatzelScriptProvider({
  data,
  postData,
}: {
  data: any;
  postData: any;
}) {
  // Selectors
  const [zatzelPageData, setZatzelPageData] = useState<null | any>(null);
  const { zatzelPosts, setZatzelPosts } = useAppState();
  const { zatzelPopupIndex, setZatzelPopupIndex } = useAppState();
  const { zatzelActivePopup, setZatzelActivePopup } = useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const updateSectionWidth = () => {
    const postCount = data?.acf?.sections.reduce(
      (acc: any, section: any) => acc + section.section_posts.length,
      0,
    );
    const newSectionWidth =
      postCount * 20.26 +
      (postCount - 1) * 5 +
      (30 + 280 / 19.2) +
      (data?.acf?.sections.length - 1) * 10; // 20.26vw per post + 5vw gap + 24vw for padding + 10vw per section
    const roundWidth = newSectionWidth.toFixed(2);
    return roundWidth;
  };
  const [containerWidth, setContainerWidth] = useState<number>(
    parseFloat(updateSectionWidth()) + 100,
  );
  const [sectionWidth, setSectionWidth] = useState<number>(
    parseFloat(updateSectionWidth()),
  );
  const [error, setError] = useState<string | null>(null);
  // Router Path
  const pathname = usePathname();

  // Animation State
  const { animationPlayed, setAnimationPlayed, isLoading, setIsLoading } =
    useAppState();
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [zatzelVerticalSection, setZatzelVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const [cardPopupTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );

  // Default Data
  const defaultZatzelPageData = {
    introduction: {
      title: "זכרון להולכים",
      content:
        "במשך מאה וחמישים שנות ממלכת התורה, כנסת ישראל לדורותיה, הצמיחה הישיבה דורות של תלמידים אשר האירו את העולם בתורתם, בחכמתם ובמעשיהם הטובים. במדור זה נציב נר זיכרון לדמויות בוגרי הישיבה אשר הלכו לעולמם, למען תהיה דמותם חקוקה בליבנו. זכרם יעמוד לנגד עינינו כעמוד אש וענן, להאיר לנו את הדרך, להדריך את צעדינו ולהמשיך ולהנחיל את מורשת התורה לדורות הבאים.",
    },
    sections: [
      {
        sectionTitle: "זכרון להולכים",
        sectionContent: [],
      },
    ],
  };

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided to ZatzelScriptProvider.");
      return;
    }
    setZatzelPageData({
      introduction:
        data?.acf?.introduction || defaultZatzelPageData.introduction,
      sections: data?.acf?.sections || defaultZatzelPageData.sections,
    });
    setZatzelPosts({
      sections: postData.length ? postData : defaultZatzelPageData.sections,
    });
  }, [data, postData]);

  useEffect(() => {
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [zatzelPageData, zatzelPosts, animationPlayed]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && main.current) {
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
            // Arrow Button
            if (self.progress > 0.97) {
              if (arrowButton) {
                gsap.to(arrowButton, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (arrowButton) {
                gsap.to(arrowButton, {
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
      setZatzelVerticalSection(timeline);
    }
    // Return
    return () => {
      if (zatzelVerticalSection) {
        zatzelVerticalSection.kill();
      }
    };
  }, [!isLoading]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && main.current) {
      document.fonts.ready.then(() => {
        zatzelVerticalSection?.pause();
        // Selectors
        const page = document.querySelector(
          "#page-wrapper",
        ) as HTMLDivElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLDivElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLDivElement | null;
        // Banner Button
        const introTitle = document.querySelector(
          ".first-intro .intro-title",
        ) as HTMLDivElement | null;
        // Banner Button
        const introContent = document.querySelector(
          ".first-intro .intro-content",
        ) as HTMLDivElement | null;
        const bannerBackgroundOverlay = document.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        ) as HTMLDivElement | null;
        // Page
        if (page) {
          gsap.set(page, { opacity: 0 });
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
        if (userVisit === "true" && pageDataFetched && animationPlayed) {
          // Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Set Animation Played to true
              setIsAllAnimationComplete(true);
              zatzelVerticalSection?.resume();
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
          const waveMaskElement = document.querySelector(
            "#wave-mask",
          ) as HTMLDivElement | null;
          if (waveMaskElement) {
            tl.to(
              waveMaskElement,
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
    const sheetReadmore = main.current?.querySelector(".sheet-readmore");
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    );

    // Animations
    if (sidebar) {
      gsap.from(sidebar, {
        yPercent: 100,
        opacity: 0,
        ease: "expo.inOut",
        duration: 3,
        delay: -1,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 0.3;
          },
          toggleActions: "restart none none reverse",
        },
      });
    }
    // Contents
    const zatzelContent = main.current?.querySelectorAll(".zatzel-cat-section");
    document.fonts.ready.then(() => {
      if (zatzelContent) {
        zatzelContent.forEach((section) => {
          const sectionTitle = section.querySelector(".zatzel-cat-title h2");
          const sectionItems = section.querySelectorAll(".single-zatzel-post");
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
                toggleActions: "restart none none reverse",
              },
            });
          }
          if (sectionItems) {
            sectionItems.forEach((item) => {
              const postTitle = item.querySelector(".post-text .post-title");
              const postExcerpt = item.querySelector(
                ".post-text .post-excerpt",
              );
              // Post Title
              if (postExcerpt) {
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
                    toggleActions: "restart none none reverse",
                  },
                });
              }
              // Post Title
              if (postTitle) {
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
                    toggleActions: "restart none none reverse",
                  },
                });
              }
            });
          }
        });
      }
    });

    // Arrow Button Animation
    const arrowButton = document.getElementById(
      "arrow-button",
    ) as HTMLDivElement | null;
    const arrowWrapper = arrowButton?.querySelector(".rabbis-arrow");
    if (arrowWrapper) {
      gsap.set(arrowWrapper, {
        xPercent: -100,
      });
      gsap.to(arrowWrapper, {
        xPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1.5,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 1;
          },
          toggleActions: "restart pause resume reverse",
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
            return GetRightPosition(sheetReadmore) - window.innerWidth * 0.4;
          },
          toggleActions: "restart pause resume reverse",
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
      zatzelVerticalSection?.pause();
    } else {
      zatzelVerticalSection?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Popup Animation
  useGSAP(() => {
    // Popup Animation
    const cardButton = main.current?.querySelectorAll(".single-zatzel-post");
    const popupCard = document.getElementById(
      "zatzel-popup",
    ) as HTMLDivElement | null;
    // Card Popup Elements
    const popupOverlay = popupCard?.querySelector(".overlay");
    const popupWrapper = popupCard?.querySelector(".popup-wrapper");
    const closeButton = popupCard?.querySelector("button.close-btn");

    // Card Popup Animation
    if (popupCard) {
      cardPopupTimeline.to(popupCard, {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
        ease: "none",
      });
    }
    // Overlay
    if (popupOverlay) {
      cardPopupTimeline.to(popupOverlay, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        delay: 0,
        ease: "none",
      });
    }
    // Animate Popup Content
    if (popupWrapper) {
      gsap.set(popupWrapper, {
        x: () => popupWrapper.clientWidth + 50,
      });
      cardPopupTimeline.to(
        popupWrapper,
        {
          x: 0,
          duration: 1.5,
          delay: 0.5,
          ease: "expo.inOut",
        },
        "-=1",
      );
    }
    // Card Button click Event
    if (cardButton) {
      cardButton?.forEach((button) => {
        button.addEventListener("click", () => {
          const index = button.getAttribute("data-index");
          const catIndex = button
            .closest(".zatzel-cat-section")
            ?.getAttribute("data-index");
          if (index && catIndex) {
            setZatzelPopupIndex({
              catIndex: parseInt(catIndex),
              postIndex: parseInt(index),
            });
          }
          setZatzelActivePopup(true);
          document.body.classList.add("!overflow-hidden");
          document.body.classList.remove("!overflow-auto");
        });
      });
    }
    // Close Popup on Overlay Click
    if (popupOverlay) {
      popupOverlay?.addEventListener("click", () => {
        setZatzelActivePopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
    if (closeButton) {
      closeButton?.addEventListener("click", () => {
        setZatzelActivePopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
  }, [pathname, pageDataFetched]);

  // Play Card Popup Animation
  useGSAP(() => {
    zatzelActivePopup ? cardPopupTimeline.play() : cardPopupTimeline.reverse();
  }, [zatzelActivePopup]);

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

  if (!zatzelPageData) {
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
    zatzelPageData && (
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
              data={
                zatzelPageData.introduction ||
                defaultZatzelPageData.introduction
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
            <ZatzelContentSection
              extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]`}
              animWidthText={1}
              sectionData={
                zatzelPosts.sections || defaultZatzelPageData.sections
              }
            />
          </div>
        </div>
      </main>
    )
  );
}
