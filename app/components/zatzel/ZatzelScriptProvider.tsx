"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import { useAppState } from "../../components/AppContext";
import Introduction from "../../components/zatzel/Introduction";
import ZatzelContentSection from "../../components/zatzel/ZatzelContentSection";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import SingleZatzelGraduate from "./SingleZatzelGraduate";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ZatzelPost {
  title: string;
  image: any;
  yearOfDeath: string;
  id: number;
}

// Default/fallback data: a static constant with no dependency on props or
// state, so it is hoisted to module scope instead of being recreated (and
// needing to be listed as an effect dependency) on every render.
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

export default function ZatzelScriptProvider({
  data,
  postData,
}: {
  data: any;
  postData: any;
}) {
  // Selectors
  const [zatzelPageData, setZatzelPageData] = useState<null | any>(null);
  const [allPosts, setAllPosts] = useState<{ sections: any[] }>({
    sections: [],
  });
  const { zatzelPosts, setZatzelPosts } = useAppState();
  //const { zatzelPopupIndex, setZatzelPopupIndex } = useAppState();
  const {
    zatzelActivePopup,
    setZatzelActivePopup,
    zatzelSearchedData,
    setZatzelSearchedData,
    zatzelSelectedDate,
  } = useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const [sectionWidth, setSectionWidth] = useState<number>(100);
  // error is a pure derivation of the data prop (true exactly when data is
  // missing), so it is computed during render instead of mirrored into
  // state via an effect that "adjusts" it on every data change.
  const error = !data ? "No data provided to ZatzelScriptProvider." : null;
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

  // Post States
  //const [postPerPage, setPostPerPage] = useState(100);
  const postsPerLoad = useRef(12);
  const [postLoadCount, setPostLoadCount] = useState(1);
  // const [isPostLoaded, setIsPostLoaded] = useState(false);
  // const [noPostsFound, setNoPostsFound] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [hasMorePosts, setHasMorePosts] = useState(
  //   Number(postData?.[0]?.totalPages ?? 1) > 1,
  // );
  // const [totalPages, setTotalPages] = useState(
  //   Number(postData?.[0]?.totalPages ?? 1),
  // );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // postLoadLimit/verticalPosts/normalPosts are pure derivations of
  // allPosts/postLoadCount; computed during render instead of mirrored
  // into state via an effect (avoids an avoidable render chain every time
  // allPosts changes).
  const postLoadLimit = Math.ceil(
    Number(allPosts?.sections?.[0]?.sectionContent?.length || 0) /
      postsPerLoad.current,
  );
  const verticalPosts: {
    sectionTitle: string;
    sectionContent: ZatzelPost[];
  } | null = allPosts?.sections?.[0]
    ? {
        sectionTitle: allPosts.sections[0].sectionTitle,
        sectionContent: allPosts.sections[0].sectionContent?.slice(0, 4) || [],
      }
    : null;
  const normalPosts =
    allPosts?.sections?.[0]?.sectionContent?.slice(
      4,
      postsPerLoad.current * postLoadCount,
    ) || [];
  const { ref: readMoreRef, inView: isReadMoreInView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  // Popup Timeline
  const cardPopupTimeline = useRef<gsap.core.Timeline | null>(null);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
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
    setAllPosts({
      sections: postData.length ? postData : defaultZatzelPageData.sections,
    });
  }, [data, postData, isLoading]);

  // Set Page Data Fetched
  useEffect(() => {
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
    // zatzelPageData/zatzelPosts have a single producer (the data effect
    // above) and, once set, never revert, so this effect is not guarded on
    // them; re-running it only when animationPlayed changes avoids an
    // avoidable extra render chain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPlayed, zatzelPageData]);

  // Page Section Animation
  useGSAP(() => {
    if (!panel.current && !wrapper.current) return;
    if (
      typeof window !== "undefined" &&
      panel.current &&
      main.current &&
      window.innerWidth > 1024
    ) {
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
                  autoAlpha: 0,
                  duration: 0.1,
                  delay: 0,
                });
              }
            } else {
              if (arrowButton) {
                gsap.to(arrowButton, {
                  autoAlpha: 1,
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
  }, [pathname, pageDataFetched, animationPlayed]);

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
  useGSAP(() => {
    if (!main.current && !panel.current && !wrapper.current) return;
    // Page Content Animation
    const sidebar = document.getElementById(
      "zatzel-sidebar",
    ) as HTMLDivElement | null;
    // Sidebar Animation
    const handleScroll = () => {
      if (!sidebar) return;

      const scrollTop = window.scrollY;
      const windowWidth = window.innerWidth * 1.8;
      const pageHeight = main?.current?.offsetHeight;

      sidebar.style.willChange = "transform, opacity";
      gsap.to(sidebar, {
        x: scrollTop > windowWidth ? 0 : 340,
        autoAlpha: scrollTop > (pageHeight || 0) - window.innerHeight ? 0 : 1,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          sidebar.style.willChange = "";
        },
      });
    };

    // Animations
    if (sidebar && window.innerWidth > 1024) {
      gsap.set(sidebar, {
        x: 340,
      });
      window.addEventListener("scroll", handleScroll);
    } else {
      gsap.set(sidebar, {
        autoAlpha: 0,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sidebar) {
        gsap.killTweensOf(sidebar);
        sidebar.style.willChange = "";
      }
    };
  }, [pathname, pageDataFetched]);

  // Load More Posts when inView is true
  useEffect(() => {
    if (isReadMoreInView) {
      setPostLoadCount((currenValue) => currenValue + 1);
      // normalPosts is derived from allPosts/postLoadCount directly during
      // render, so the next batch of posts is already visible in the same
      // render pass; there is no actual async loading period here, so
      // resolve the loading-more indicator immediately instead of relying
      // on the removed mirror effect to flip it back on a later render.
      setIsLoadingMore(false);
    }
  }, [isReadMoreInView]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

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
  }, [isAllAnimationComplete, zatzelVerticalSection]);

  // Hide header-left on scroll down, show on scroll up (only for this page)
  useGSAP(() => {
    if (!isAllAnimationComplete || !main.current || window.innerWidth < 1024) {
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

  // Popup Animation
  useGSAP(() => {
    // Gsap Timeline
    cardPopupTimeline.current = gsap.timeline({ paused: true });
    // Popup Animation
    const popupCard = document.getElementById(
      "zatzel-popup",
    ) as HTMLDivElement | null;
    // Card Popup Elements
    const popupOverlay = popupCard?.querySelector(".overlay");
    const popupWrapper = popupCard?.querySelector(".popup-wrapper");

    // Card Popup Animation
    if (popupCard) {
      cardPopupTimeline?.current?.to(popupCard, {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
        ease: "none",
      });
    }
    // Overlay
    if (popupOverlay) {
      cardPopupTimeline?.current?.to(popupOverlay, {
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
      cardPopupTimeline?.current?.to(
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
    // Clean up timeline on unmount
    return () => {
      cardPopupTimeline?.current?.kill();
    };
  }, [pathname, pageDataFetched]);

  // On Active popup
  useEffect(() => {
    if (zatzelActivePopup) {
      document.body.classList.add("!overflow-hidden");
      document.body.classList.remove("!overflow-auto");
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
    }
  }, [zatzelActivePopup]);

  // Play Card Popup Animation
  useGSAP(() => {
    zatzelActivePopup
      ? cardPopupTimeline?.current?.play()
      : cardPopupTimeline?.current?.reverse();
  }, [zatzelActivePopup]);

  // Filter Posts by Selected Date
  useEffect(() => {
    if (zatzelSelectedDate !== null && zatzelSelectedDate !== undefined) {
      const filteredSections = postData.map((section: any) => {
        const filteredContent = section.sectionContent.filter(
          (post: { yearOfDeath: string }) => {
            const postDate = new Date(post.yearOfDeath);
            return (
              postDate.getTime() === new Date(zatzelSelectedDate).getTime()
            );
          },
        );
        return {
          ...section,
          sectionContent: filteredContent,
        };
      });
      const hasMatches =
        filteredSections.length > 0 &&
        filteredSections.some(
          (section: any) => section.sectionContent.length > 0,
        );
      setAllPosts({ sections: hasMatches ? filteredSections : [] });
      window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
    } else {
      setAllPosts({
        sections: postData.length ? postData : defaultZatzelPageData.sections,
      });
      window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
    }
  }, [zatzelSelectedDate, postData]);

  // Filter Posts by Searched Data
  useEffect(() => {
    if (zatzelSearchedData !== null && zatzelSearchedData !== undefined) {
      const filteredSections = postData.map((section: any) => {
        const filteredContent = section.sectionContent.filter(
          (post: { title: string }) => {
            return post.title.includes(zatzelSearchedData);
          },
        );
        return {
          ...section,
          sectionContent: filteredContent,
        };
      });
      const hasMatches =
        filteredSections.length > 0 &&
        filteredSections.some(
          (section: any) => section.sectionContent.length > 0,
        );
      setAllPosts({ sections: hasMatches ? filteredSections : [] });
      window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
    } else {
      setAllPosts({
        sections: postData.length ? postData : defaultZatzelPageData.sections,
      });
      window.scrollTo({ top: window.innerWidth * 1.9, behavior: "smooth" });
    }
  }, [zatzelSearchedData, postData]);

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
          <h1 className="text-2xl font-bold">Zatzel Page Not Found</h1>
          <p className="text-gray-600">
            The requested zatzel page could not be found.
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
            className={`section-wrapp flex lg:flex-nowrap lg:flex-row-reverse lg:w-(--container-width) lg:h-screen items-center flex-col`}
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
              extraClass={"first-intro panel-section min-w-screen w-screen"}
              panel={panel}
              bgPosition=""
              overlayClass="bg-[#000000] opacity-0"
              bgClass=""
              audioControl={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
            <ZatzelContentSection
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass={`w-full lg:min-w-(--section-width) lg:w-(--section-width) lg:h-screen panel-section py-[10vw] lg:py-[5vw] px-[8vw] lg:px-14.5`}
              animWidthText={1}
              sectionData={verticalPosts || defaultZatzelPageData.sections[0]}
              setSearchedData={setZatzelSearchedData}
              setZatzelPosts={setZatzelPosts}
              allPosts={allPosts}
            />
          </div>
        </div>
        <div className="normal-scrolling w-full lg:min-h-[50vh] bg-[#1A1A1A] px-[8vw] lg:px-14.5 pb-[10vh]">
          <div className="wrapper w-full flex flex-col items-center justify-center gap-y-[10vh] relative lg:pr-85">
            <div
              className={`normal-posts w-full flex flex-row flex-wrap gap-x-10 gap-y-10 lg:gap-y-15 justify-end`}
            >
              {normalPosts?.map((post: any, index: number) => {
                return (
                  <SingleZatzelGraduate
                    key={post?.id}
                    dataIndex={post?.id}
                    data={post}
                    catIndex={0}
                  />
                );
              })}
            </div>
            {postLoadCount! < postLoadLimit! && (
              <div
                ref={readMoreRef}
                className={`sheet-readmore w-full lg:min-w-50 flex items-center justify-center ${isLoadingMore ? "animate-pulse" : "animate-bounce"}`}
              >
                <button
                  type="button"
                  className="text-[25px] sm:text-[35px] lg:text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-colors duration-500 disabled:cursor-not-allowed"
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
