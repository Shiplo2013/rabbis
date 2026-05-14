"use client";
import Introduction from "@/app/components/past-rabbis/single/Introduction";
import RabbisHeader from "@/app/components/RabbisHeader";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import ContentBorder from "@/app/ui/ContentBorder";
import ContentParts from "@/app/ui/ContentParts";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import PostNavigation from "@/app/ui/past-rabbis/PostNavigation";
import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";
import QuoteSection from "@/app/ui/QuoteSection";
import parse from "html-react-parser";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import IntroBG from "../../assets/images/past-rabbis-bg.jpg";
import Wave from "../../assets/images/wave.svg";
import Footer from "../../components/Footer";
import LoadingEffect from "../../components/LoadingEffect";
import ContentSection from "../../components/past-rabbis/single/ContentSection";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type RabbiPost = {
  id: number;
  slug: string;
  link: string;
  title: string;
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
    },
  ];
};

export default function Page() {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<RabbiPost | null>(null);
  const [allPosts, setAllPosts] = useState<AllPosts | null | any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDataFetched, setPageDataFetched] = useState(false);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadRabbisPageData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/past-rabbis/posts/${slug}`, {
          cache: "no-store",
        });
        const response2 = await fetch("/api/past-rabbis/posts", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load rabbis page data.");
        }

        if (!response2.ok) {
          throw new Error("Failed to load rabbis posts data.");
        }

        const data = await response.json();
        const data2 = await response2.json();

        if (isMounted) {
          setPost(data);
          setAllPosts(data2);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setPageDataFetched(true);
      }
    };

    loadRabbisPageData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    console.log(post);
    console.log(allPosts);
  }, [post]);

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

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
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const movingButtonRef = useRef<HTMLDivElement>(null);
  const popupCardRef = useRef<HTMLDivElement>(null);
  const popupBookRef = useRef<HTMLDivElement>(null);
  const popupContent = useRef<HTMLDivElement>(null);
  const popupBookContent = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

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
  useGSAP(
    () => {
      if (typeof window !== "undefined" && panel.current && wrapper.current) {
        document.fonts.ready.then(() => {
          // Selectors
          const rabbisHeader = main.current?.querySelector(".rabbis-header");
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
            if (main.current) {
              tl.to(main.current, {
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
    },
    { scope: main, dependencies: [animationPlayed, pathname, pageDataFetched] },
  );

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
  };

  // On Mouse Move
  useGSAP(
    () => {
      if (movingButtonRef.current) {
        const xSetter = gsap.quickSetter(movingButtonRef.current, "x", "px");
        const ySetter = gsap.quickSetter(movingButtonRef.current, "y", "px");

        window.addEventListener("mousemove", (e) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        });
        // Show view on mouse hover
        const pageNav = main.current?.querySelector(".rabbis-navigation");
        if (pageNav) {
          pageNav.addEventListener("mouseenter", () => {
            gsap.to(movingButtonRef.current, {
              opacity: 1,
              scaleY: 1,
              duration: 0.3,
            });
          });
          pageNav.addEventListener("mouseleave", () => {
            gsap.to(movingButtonRef.current, {
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
              gsap.to(movingButtonRef.current, {
                opacity: 1,
                scaleY: 2,
                duration: 0.3,
              });
            });
            pageNav.addEventListener("mouseleave", () => {
              gsap.to(movingButtonRef.current, {
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
      document.body.classList.remove("!overflow-hidden", "overflow-hidden");
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
    const popupOverlay = popupCardRef.current?.querySelector(".overlay");
    const popupWrapper = popupCardRef.current?.querySelector(".popup-wrapper");
    const closeButton = popupCardRef.current?.querySelector("button.close-btn");
    // Book Popup Elements
    const popupBookOverlay = popupBookRef.current?.querySelector(".overlay");
    const popupBookWrapper =
      popupBookRef.current?.querySelector(".popup-wrapper");
    const closeBookButton =
      popupBookRef.current?.querySelector("button.close-btn");

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
    // Book Popup Animation
    if (popupBookRef.current) {
      bookPopupTimeline.to(popupBookRef.current, {
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
    // Set content height
    if (popupContent.current) {
      setContentHeight(popupContent?.current?.offsetHeight || 0);
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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
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
      <div ref={main} id="main" className="relative">
        <LoadingEffect animated={setAnimationPlayed} />
        <RabbisHeader link={`/past-rabbis`} data={allPosts?.posts} />
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
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[330vw] h-screen items-center will-change-transform`}
              >
                <Introduction
                  animated={isAllAnimationComplete}
                  animationStatus={isAllAnimationComplete}
                  bgImage={IntroBG}
                  bgOverlay={""}
                  data={{
                    title: post?.title,
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
                  }}
                />
              </div>
            </div>
            <div
              dir="rtl"
              className="content-bottom bg-[#F5F0EB] w-full flex justify-center flex-col items-center pt-[7vh] pr-25"
            >
              <div className="wrapper w-[80%] max-w-282.5">
                <ContentBorder extraClass="" />
                {post?.acf?.content_2 && (
                  <ContentParts
                    extraClass="mt-11.5"
                    data={post?.acf?.content_2}
                  />
                )}
                {post?.acf?.blockquote && (
                  <QuoteSection
                    extraClass="mb-16 mt-16"
                    data={post?.acf?.blockquote}
                  />
                )}
                {post?.acf?.content_3 && (
                  <ContentParts
                    extraClass="mt-11.5"
                    data={post?.acf?.content_3}
                  />
                )}
                {post?.acf?.content_3 && <ContentBorder extraClass="mt-10" />}
                {post?.acf?.content_4 && (
                  <ContentParts
                    extraClass="mt-11.5"
                    data={post?.acf?.content_4}
                  />
                )}
                {post?.acf?.content_5 && (
                  <ContentParts
                    extraClass="mt-11.5"
                    data={post?.acf?.content_5}
                  />
                )}
                {post?.acf?.content_6 && (
                  <ContentParts
                    extraClass="mt-11.5"
                    data={post?.acf?.content_6}
                  />
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
          <Footer className={"relative z-20"} />
        </SmoothWrapper>

        {post?.acf?.popup_1 && (
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
                  <div className="title mb-[5vh]">
                    <h3 className="text-[55px] leading-[70%] text-[#D1A941] font-bold">
                      {parse(post?.acf?.popup_1?.title || "")}
                    </h3>
                  </div>
                  <div className="content text-[21px] leading-[1.4em] text-black">
                    {parse(post?.acf?.popup_1?.text || "")}
                  </div>
                </SimpleBar>
              </div>
              <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
                <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
              </button>
            </div>
            <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
          </div>
        )}

        {post?.acf?.popup_2 && (
          <div
            ref={popupBookRef}
            className="popup fixed top-0 right-0 w-screen h-screen z-99 opacity-0 invisible"
          >
            <div className="popup-wrapper bg-[#FBF4E6] w-150 h-full relative z-50 py-[9.3vh] px-[3.8vw]">
              <div
                ref={popupBookContent}
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
                  <div className="title mb-[5vh]">
                    <h3 className="text-[55px] leading-[70%] text-[#D1A941] font-bold">
                      {parse(post?.acf?.popup_2?.title || "")}
                    </h3>
                  </div>
                  <div className="book-image mb-9.5">
                    <div className="w-77 h-auto">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src={post?.acf?.popup_2?.image_1?.url || ""}
                        alt="Book Image"
                        width={400}
                        height={400}
                        blurDataURL={CreateShimmerDataUrl(400, 400)}
                        placeholder="blur"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="content text-[21px] leading-[1.4em] text-black mb-10">
                    <div className="title mb-7">
                      <h4 className="text-[34px] leading-[70%] font-medium">
                        {parse(post?.acf?.popup_2?.text_group_1?.title || "")}
                      </h4>
                    </div>
                    <div className="text flex flex-col gap-y-4">
                      {parse(post?.acf?.popup_2?.text_group_1?.text || "")}
                    </div>
                  </div>
                  <div className="book-image mb-9.5">
                    <div className="w-77 h-auto">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src={post?.acf?.popup_2?.image_2?.url || ""}
                        alt="Book Image"
                        width={400}
                        height={400}
                        blurDataURL={CreateShimmerDataUrl(400, 400)}
                        placeholder="blur"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="content text-[21px] leading-[1.4em] text-black">
                    <div className="title mb-7">
                      <h4 className="text-[34px] leading-[70%] font-medium">
                        {parse(post?.acf?.popup_2?.text_group_2?.title || "")}
                      </h4>
                    </div>
                    <div className="text flex flex-col gap-y-4">
                      {parse(post?.acf?.popup_2?.text_group_2?.text || "")}
                    </div>
                  </div>
                </SimpleBar>
              </div>
              <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
                <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
              </button>
            </div>
            <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
          </div>
        )}

        <div
          ref={movingButtonRef}
          className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
        >
          <span className="text block text-black text-[20px] leading-[1em] font-bold">
            מעבר לדמות ההוד הבאה
          </span>
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
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#F5F0EB] z-10"
            ></div>
          </div>
        </div>
      </div>
    )
  );
}
