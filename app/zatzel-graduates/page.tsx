"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import parse from "html-react-parser";
import SimpleBar from "simplebar-react";
import ArrowLeftIcon2 from "../assets/icons/ArrowLeftIcon2";
import LoadingEffect from "../components/LoadingEffect";
import Introduction from "../components/zatzel/Introduction";
import ZatzelContentSection from "../components/zatzel/ZatzelContentSection";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Selectors
  const [zatzelPageData, setZatzelPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [footerData, setFooterData] = useState<any | null>(null);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Router Path
  const pathname = usePathname();

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
  const popupCardRef = useRef<HTMLDivElement>(null);
  const ArrowButtonRef = useRef<HTMLDivElement>(null);
  const [activePostion, setActivePosition] = useState(0);
  const popupContent = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [activePopup, setActivePopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState({
    catIndex: 0,
    postIndex: 0,
  });
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
    sections: {
      section_title: "זכרון להולכים",
      section_posts: [],
    },
  };

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const loadZatzelGraduatesPageData = async () => {
      const response = fetch("/api/zatzel-graduates", {
        cache: "no-store",
      });
      const response2 = fetch("/api/header", {
        cache: "force-cache",
      });
      const response3 = fetch("/api/footer", {
        cache: "force-cache",
      });
      try {
        const [pageData, headerData, footerData] = await Promise.all([
          response,
          response2,
          response3,
        ]);

        if (!pageData.ok || !headerData.ok || !footerData.ok) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }

        const data = fetchError ? null : await pageData.json();
        const header = fetchError ? null : await headerData.json();
        const footer = fetchError ? null : await footerData.json();

        const sections = Array.isArray(data?.acf?.sections)
          ? data.acf.sections
          : [];

        const mappedSections = await Promise.all(
          sections.map(async (section: any) => {
            const sectionPostIds = (section?.section_posts || [])
              .map((post: any) => post?.ID || post?.id || post)
              .filter(Boolean);

            if (!sectionPostIds.length) {
              return {
                sectionTitle: section?.section_title || "",
                sectionContent: [],
              };
            }

            const sectionPostsResponse = await fetch(
              `/api/zatzel-graduates/posts?include=${sectionPostIds.join(",")}&orderby=include&per_page=100&_fields=id,slug,acf`,
              { cache: "no-store" },
            );

            if (!sectionPostsResponse.ok) {
              return {
                sectionTitle: section?.section_title || "",
                sectionContent: [],
              };
            }

            const sectionPostsData = await sectionPostsResponse.json();
            const sectionContent = (sectionPostsData?.posts || []).map(
              (post: any) => ({
                title: post?.acf?.title || post?.title || "",
                image: post?.acf?.thumbnail || "",
                yearOfDeath: post?.acf?.year_of_death || "",
                popup: post?.acf?.popup || "",
              }),
            );

            return {
              sectionTitle: section?.section_title || "",
              sectionContent,
            };
          }),
        );

        if (isMounted) {
          setZatzelPageData({
            introduction:
              data?.acf?.introduction || defaultZatzelPageData.introduction,
            sections: mappedSections.length
              ? mappedSections
              : defaultZatzelPageData.sections,
          });
          setHeaderData(header);
          setFooterData(footer);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load zatzel graduates page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadZatzelGraduatesPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!zatzelPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
    }
  }, [zatzelPageData, animationPlayed]);

  useEffect(() => {
    if (!zatzelPageData) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const postCount = zatzelPageData.sections.reduce(
        (acc: any, section: any) => acc + section.sectionContent.length,
        0,
      );
      const newSectionWidth =
        postCount * 20.26 +
        (postCount - 1) * 5 +
        (30 + 280 / 19.2) +
        (zatzelPageData?.sections.length - 1) * 10; // 20.26vw per post + 5vw gap + 24vw for padding + 10vw per section

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [zatzelPageData]);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && main.current) {
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
            // Arrow Button
            if (self.progress > 0.9) {
              if (ArrowButtonRef.current) {
                gsap.to(ArrowButtonRef.current, {
                  opacity: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (ArrowButtonRef.current) {
                gsap.to(ArrowButtonRef.current, {
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
    if (typeof window !== "undefined" && panel.current && main.current) {
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
        }
      });
    }
  }, [pathname, pageDataFetched]);

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
    const arrowWrapper =
      ArrowButtonRef?.current?.querySelector(".rabbis-arrow");
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
      verticalSection?.pause();
    } else {
      verticalSection?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Section Scroll Animation
  useEffect(() => {
    if (containerWidth) {
      const maxScroll = (containerWidth / 100) * 1920;
      if (activePostion > maxScroll) {
        setActivePosition(maxScroll);
      } else {
        window.scrollTo(0, activePostion);
      }
    }
  }, [activePostion, containerWidth]);

  // Popup Animation
  useGSAP(() => {
    // Popup Animation
    const cardButton = main.current?.querySelectorAll(".single-zatzel-post");
    // Card Popup Elements
    const popupOverlay = popupCardRef.current?.querySelector(".overlay");
    const popupWrapper = popupCardRef.current?.querySelector(".popup-wrapper");
    const closeButton = popupCardRef.current?.querySelector("button.close-btn");

    // Card Popup Animation
    if (popupCardRef.current) {
      cardPopupTimeline.to(popupCardRef.current, {
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
            setPopupIndex({
              catIndex: parseInt(catIndex),
              postIndex: parseInt(index),
            });
          }
          setActivePopup(true);
          document.body.classList.add("!overflow-hidden");
          document.body.classList.remove("!overflow-auto");
        });
      });
    }
    // Close Popup on Overlay Click
    if (popupOverlay) {
      popupOverlay?.addEventListener("click", () => {
        setActivePopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
    if (closeButton) {
      closeButton?.addEventListener("click", () => {
        setActivePopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }

    // Set content height
    if (popupContent.current) {
      setContentHeight(popupContent?.current?.offsetHeight || 0);
    }
  }, [pathname, pageDataFetched]);

  // Play Card Popup Animation
  useGSAP(() => {
    activePopup ? cardPopupTimeline.play() : cardPopupTimeline.reverse();
  }, [activePopup]);

  // Scroll Position on Page Change
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY < 1920) {
  //       setActivePosition(window.scrollY);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup listener on unmount
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [pageDataFetched]);

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
        delay: 0,
      });
      gsap.to(page.current, {
        opacity: 0,
        duration: 0,
        delay: 0,
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
                    zatzelPageData.sections || defaultZatzelPageData.sections
                  }
                />
              </div>
            </div>
          </main>
          <Footer data={footerData} className={"relative z-20"} />
        </SmoothWrapper>

        {zatzelPageData?.sections[popupIndex?.catIndex]?.sectionContent[
          popupIndex?.postIndex
        ]?.popup && (
          <div
            ref={popupCardRef}
            className="popup fixed top-0 right-0 w-screen h-screen z-99 opacity-0 invisible"
          >
            <div className="popup-wrapper bg-[#FBF4E6] w-150 h-full relative z-50 py-[9.3vh] px-[3.8vw]">
              <div
                ref={popupContent}
                className="popup-content w-full h-full relative z-30"
              >
                <SimpleBar
                  style={{
                    maxHeight: contentHeight,
                    paddingRight: 30,
                    marginRight: -30,
                  }}
                  autoHide={false}
                >
                  {zatzelPageData?.sections[popupIndex?.catIndex]
                    ?.sectionContent[popupIndex?.postIndex]?.popup?.title && (
                    <div className="title mb-[5vh] flex items-center gap-x-5">
                      <h3 className="text-[55px] leading-[70%] text-[#D1A941] font-bold max-w-[60%]">
                        {parse(
                          zatzelPageData?.sections[popupIndex?.catIndex]
                            ?.sectionContent[popupIndex?.postIndex]?.popup
                            ?.title || "",
                        )}
                      </h3>
                      <div className="thumbnail min-w-49 w-49 h-41">
                        <Image
                          src={
                            zatzelPageData?.sections[popupIndex?.catIndex]
                              ?.sectionContent[popupIndex?.postIndex]?.image
                              ?.sizes?.medium || ""
                          }
                          alt="Popup Thumbnail"
                          width={196}
                          height={205}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                  {zatzelPageData?.sections[popupIndex?.catIndex]
                    ?.sectionContent[popupIndex?.postIndex]?.popup?.content && (
                    <div className="content text-[21px] leading-[1.4em] text-black [&>p:not(:last-child)]:mb-6">
                      {parse(
                        zatzelPageData?.sections[popupIndex?.catIndex]
                          ?.sectionContent[popupIndex?.postIndex]?.popup
                          ?.content || "",
                      )}
                    </div>
                  )}
                </SimpleBar>
              </div>
              <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-x-1/2 -translate-y-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
                <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
              </button>
            </div>
            <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
          </div>
        )}

        <div
          ref={ArrowButtonRef}
          className="rabbis-arrow-wrapper fixed top-0 left-0 z-50 h-screen w-[20vw]"
        >
          <div className="rabbis-arrow w-full h-full flex items-center justify-center bg-linear-to-r from-black to-[rgba(0,0,0,0)] opacity-0">
            <button
              onClick={() =>
                setActivePosition(activePostion + window.innerWidth * 0.5)
              }
              className="next-button w-20 h-20 border-2 border-[#C3A13F] rounded-full bg-black p-5 cursor-pointer"
            >
              <ArrowLeftIcon2 />
            </button>
          </div>
        </div>
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
