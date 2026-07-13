"use client";
import Introduction from "@/app/components/past-rabbis/single/Introduction";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import ContentBorder from "@/app/ui/ContentBorder";
import ContentParts from "@/app/ui/ContentParts";
import PostNavigation from "@/app/ui/past-rabbis/PostNavigation";
import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";
import QuoteSection from "@/app/ui/QuoteSection";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/past-rabbis-bg.jpg";
import ContentSection from "../../components/past-rabbis/single/ContentSection";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RabbiPost = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: string;
  excerpt: string;
  acf: {
    title: string;
    time: string;
    blockquote: string;
    thumbnail: any;
    quotes: string;
    content_1: {
      title: string;
      text_left: string;
      text_right: string;
    };
    content_2: {
      title: string;
      text: string;
    };
    content_3: {
      title: string;
      text: string;
    };
    content_4: {
      title: string;
      text: string;
    };
    content_5: {
      title: string;
      text: string;
    };
    content_6: {
      title: string;
      text: string;
    };
    popup_1: {
      title: string;
      text: string;
    };
    popup_2: {
      title: string;
      image_1: any;
      image_2: any;
      text_group_1: {
        title: string;
        text: string;
      };
      text_group_2: {
        title: string;
        text: string;
      };
    };
  };
};

type AllPosts = {
  pagination: any;
  posts: [
    {
      id: number;
      title: string;
      slug: string;
      acf: {
        title: { rendered: string };
        time: string;
        blockquote: string;
        thumbnail: any;
        quotes: string;
        content_1: {
          title: string;
          text_left: string;
          text_right: string;
        };
        content_2: {
          title: string;
          text: string;
        };
        content_3: {
          title: string;
          text: string;
        };
        content_4: {
          title: string;
          text: string;
        };
        content_5: {
          title: string;
          text: string;
        };
        content_6: {
          title: string;
          text: string;
        };
        popup_1: {
          title: string;
          text: string;
        };
        popup_2: {
          title: string;
          image_1: any;
          image_2: any;
          text_group_1: {
            title: string;
            text: string;
          };
          text_group_2: {
            title: string;
            text: string;
          };
        };
      };
    },
  ];
};

export default function PastRabbisScriptProviderSlug({ data }: { data: any }) {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<RabbiPost | null>(null);
  const [allPosts, setAllPosts] = useState<AllPosts | null | any>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    isLoading,
    setIsLoading,
    animationPlayed,
    setAnimationPlayed,
    setCurrentRabbisPost,
    allRabbisPosts,
    setAllRabbisPosts,
  } = useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setPost(data.postsData);
    setCurrentRabbisPost(data.postsData);
    setAllPosts(data.allPostsData);
    if (data.allPostsData && data.allPostsData.length > 0) {
      setAllRabbisPosts(data.allPostsData);
    }
  }, [data]);

  // Page Data Loade
  useEffect(() => {
    if (!post) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [post, allPosts, animationPlayed]);

  // Popup State
  const [activeCardPopup, setActiveCardPopup] = useState(false);
  const [activeBookPopup, setActiveBookPopup] = useState(false);
  const [cardPopupTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );
  const [bookPopupTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
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
          end: "+=" + window.innerWidth * 3,
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
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.querySelector(
          "#page-wrapper",
        ) as HTMLDivElement | null;
        const rabbisHeader = document.querySelector(
          ".rabbis-header",
        ) as HTMLDivElement | null;
        // Banner Button
        const introTitle = main.current?.querySelector(
          ".first-intro .intro-title",
        );
        // Rabbis Image
        const rabbisImage = main.current?.querySelector(
          ".first-intro .rabbis-image",
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
          if (rabbisHeader) {
            tl.to(rabbisHeader, {
              opacity: 1,
              ease: "none",
              duration: 1,
            });
          }
          if (rabbisImage) {
            tl.to(
              rabbisImage,
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
  }, [animationPlayed, pageDataFetched]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
  };

  // On Mouse Move
  useGSAP(
    () => {
      const movingButtonRef = document.getElementById(
        "moving-button",
      ) as HTMLDivElement | null;
      if (movingButtonRef) {
        const xSetter = gsap.quickSetter(movingButtonRef, "x", "px");
        const ySetter = gsap.quickSetter(movingButtonRef, "y", "px");

        window.addEventListener("mousemove", (e) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        });
        // Show view on mouse hover
        const pageNav = main.current?.querySelector(".rabbis-navigation");
        if (pageNav) {
          pageNav.addEventListener("mouseenter", () => {
            gsap.to(movingButtonRef, {
              opacity: 1,
              scaleY: 1,
              duration: 0.3,
            });
          });
          pageNav.addEventListener("mouseleave", () => {
            gsap.to(movingButtonRef, {
              opacity: 0,
              scaleY: 0,
              duration: 0.3,
            });
          });
        }

        return () => {
          window.addEventListener("mousemove", (e) => {
            xSetter(e.clientX);
            ySetter(e.clientY);
          });
          if (pageNav) {
            pageNav.addEventListener("mouseenter", () => {
              gsap.to(movingButtonRef, {
                opacity: 1,
                scaleY: 2,
                duration: 0.3,
              });
            });
            pageNav.addEventListener("mouseleave", () => {
              gsap.to(movingButtonRef, {
                opacity: 0,
                scaleY: 0,
                duration: 0.3,
              });
            });
          }
        };
      }
    },
    { scope: main, dependencies: [pathname] },
  );

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
    // Popup Animation
    const cardButton = main.current?.querySelectorAll(
      ".rabbis-menu-item.card-button",
    );
    const bookButton = main.current?.querySelectorAll(
      ".rabbis-menu-item.book-button",
    );
    // Card Popup Elements
    const popupCardRef = document.getElementById(
      "popup-card",
    ) as HTMLDivElement | null;
    const popupOverlay = popupCardRef?.querySelector(".overlay");
    const popupWrapper = popupCardRef?.querySelector(".popup-wrapper");
    const closeButton = popupCardRef?.querySelector("button.close-btn");
    // Book Popup Elements
    const popupBookRef = document.getElementById(
      "popup-book",
    ) as HTMLDivElement | null;
    const popupBookOverlay = popupBookRef?.querySelector(".overlay");
    const popupBookWrapper = popupBookRef?.querySelector(".popup-wrapper");
    const closeBookButton = popupBookRef?.querySelector("button.close-btn");

    // Card Popup Animation
    if (popupCardRef) {
      cardPopupTimeline.to(popupCardRef, {
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
    // Book Popup Animation
    if (popupBookRef) {
      bookPopupTimeline.to(popupBookRef, {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
        ease: "none",
      });
    }
    // Overlay
    if (popupBookOverlay) {
      bookPopupTimeline.to(popupBookOverlay, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        delay: 0,
        ease: "none",
      });
    }
    // Animate Popup Content
    if (popupBookWrapper) {
      gsap.set(popupBookWrapper, {
        x: () => popupBookWrapper.clientWidth + 50,
      });
      bookPopupTimeline.to(
        popupBookWrapper,
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
          setActiveCardPopup(true);
          document.body.classList.add("!overflow-hidden");
          document.body.classList.remove("!overflow-auto");
        });
      });
    }
    // Close Popup on Overlay Click
    if (popupOverlay) {
      popupOverlay?.addEventListener("click", () => {
        setActiveCardPopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
    if (closeButton) {
      closeButton?.addEventListener("click", () => {
        setActiveCardPopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
    // Book Button click Event
    if (bookButton) {
      bookButton?.forEach((button) => {
        button.addEventListener("click", () => {
          setActiveBookPopup(true);
          document.body.classList.add("!overflow-hidden");
          document.body.classList.remove("!overflow-auto");
        });
      });
    }
    // Close Book Popup on Overlay Click
    if (popupBookOverlay) {
      popupBookOverlay?.addEventListener("click", () => {
        setActiveBookPopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
    if (closeBookButton) {
      closeBookButton?.addEventListener("click", () => {
        setActiveBookPopup(false);
        document.body.classList.remove("!overflow-hidden");
        document.body.classList.add("!overflow-auto");
      });
    }
  }, [pathname, pageDataFetched]);
  // Play Card Popup Animation
  useGSAP(() => {
    activeCardPopup ? cardPopupTimeline.play() : cardPopupTimeline.reverse();
  }, [activeCardPopup]);
  // Play Book Popup Animation
  useGSAP(() => {
    activeBookPopup ? bookPopupTimeline.play() : bookPopupTimeline.reverse();
  }, [activeBookPopup]);

  // On Pathname Change
  useEffect(() => {
    const headerLeft = document.querySelector(
      "#header .header-left",
    ) as HTMLDivElement | null;
    const headerRight = document.querySelector(
      "#header .header-right",
    ) as HTMLDivElement | null;
    if (headerLeft) {
      gsap.set(headerLeft, {
        autoAlpha: 0,
        duration: 0,
      });
    }
    if (headerRight) {
      gsap.set(headerRight, {
        autoAlpha: 0,
        duration: 0,
      });
    }
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

  if (!post) {
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
    post && (
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
            className={`section-wrapp flex flex-nowrap flex-row-reverse w-[330vw] h-screen items-center will-change-transform`}
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={IntroBG}
              bgOverlay={""}
              data={{
                title: post?.title?.rendered || post?.acf?.title,
                time: post?.acf?.time,
                thumbnail: post?.acf?.thumbnail,
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
            <ContentSection
              extraClass="rabbis-content min-w-[230vw] w-[230vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]"
              animWidthText={1}
              data={{
                title: post?.acf?.title,
                blockquote: post?.acf?.quotes,
                content_1: post?.acf?.content_1,
                popup_1_title: post?.acf?.popup_1?.title,
              }}
              setActiveCardPopup={setActiveCardPopup}
            />
          </div>
        </div>
        <div
          dir="rtl"
          className="content-bottom bg-[#F5F0EB] w-full flex justify-center flex-col items-center pt-[7vh] pb-[7vh] pr-25"
        >
          <div className="wrapper w-[80%] max-w-282.5">
            <ContentBorder extraClass="" />
            {post?.acf?.content_2 && (
              <ContentParts extraClass="mt-11.5" data={post?.acf?.content_2} />
            )}
            {post?.acf?.blockquote && (
              <QuoteSection
                extraClass="mb-16 mt-16"
                data={post?.acf?.blockquote}
              />
            )}
            {post?.acf?.content_3 && (
              <ContentParts extraClass="mt-11.5" data={post?.acf?.content_3} />
            )}
            {post?.acf?.content_3 && <ContentBorder extraClass="mt-10" />}
            {post?.acf?.content_4 && (
              <ContentParts extraClass="mt-11.5" data={post?.acf?.content_4} />
            )}
            {post?.acf?.content_5 && (
              <ContentParts extraClass="mt-11.5" data={post?.acf?.content_5} />
            )}
            {post?.acf?.content_6 && (
              <ContentParts extraClass="mt-11.5" data={post?.acf?.content_6} />
            )}
            <div className="rabbis-options mt-25">
              <RabbisOptions extraClass="flex gap-x-[4vw]" />
            </div>

            {allPosts?.posts && (
              <div className="rabbis-navigation w-[calc(100vw-100px)] relative right-1/2 translate-x-1/2">
                <PostNavigation
                  extraClass="mt-[8.6vh]"
                  currentPostId={post?.id}
                  posts={allPosts?.posts}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    )
  );
}
