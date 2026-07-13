"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { useEffect, useRef, useState } from "react";
import PostImage1 from "../../assets/images/community-post1.jpg";
import PostImage2 from "../../assets/images/community-post2.jpg";
import PostImage3 from "../../assets/images/community-post3.jpg";
import IntroBG from "../../assets/images/news-bg.png";

import { usePathname } from "next/navigation";
import Introduction from "../../components/news/Introduction";
import NewsContentSection from "../../components/news/NewsContentSection";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type NewsPageData = {
  acf: {
    introduction: {
      title: string;
      content: string;
      background: any;
    };
  };
};

type NewsPostData = {
  title: string;
  excerpt: string;
  slug: string;
  gallery: {
    type?: string;
    image?: any;
    video?: any;
  }[];
};

type NewsScriptProviderProps = {
  data: NewsPageData;
  postsData: NewsPostData[];
};

export default function NewsScriptProvider({
  data,
  postsData,
}: NewsScriptProviderProps) {
  const [pageData, setPageData] = useState<NewsPageData | null>(null);
  const [pagePosts, setPagePosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const pathname = usePathname();

  // Static Data
  const staticData: NewsPageData = {
    acf: {
      introduction: {
        title: "עד שבחברון",
        content: "חדשות הישיבה",
        background: IntroBG,
      },
    },
  };
  const staticPosts: NewsPostData[] = [
    {
      title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
      excerpt: `עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם`,
      slug: "news-post-1",
      gallery: [
        { type: "image", image: PostImage1, video: false },
        { type: "image", image: PostImage2, video: false },
        { type: "image", image: PostImage3, video: false },
      ],
    },
    {
      title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
      excerpt: `עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם`,
      slug: "news-post-2",
      gallery: [
        { type: "image", image: PostImage1, video: false },
        { type: "image", image: PostImage2, video: false },
        { type: "image", image: PostImage3, video: false },
      ],
    },
  ];

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setPageData(data);
    const rawPosts = Array.isArray(postsData) ? postsData : postsData || [];
    const posts =
      rawPosts?.map((post: any) => {
        const gallery = post.acf?.gallery?.filter(
          (item: any) => item.type === "image",
        );
        return {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          gallery: gallery?.slice(0, 3),
        };
      }) || [];
    setPagePosts(posts);
  }, [data]);

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Set Page Data Fetched
  useEffect(() => {
    if (!pageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [pageData, animationPlayed]);

  // Update Section Width on Data Change
  useEffect(() => {
    if (!pageData || !pagePosts) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const newSectionWidth =
        20 + pagePosts?.length * 53 + pagePosts?.length * 12.5;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [pageData, pagePosts]);

  // Page Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
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
      animations.push(timeline);
      setVerticalSection(timeline);
    }
    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Timeline[] = [];
    if (
      typeof window !== "undefined" &&
      panel.current &&
      main.current &&
      !isAllAnimationComplete
    ) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLDivElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLDivElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLDivElement | null;
        // Banner Button
        const introTitle = main.current?.querySelector(
          ".first-intro .intro-title",
        ) as HTMLDivElement | null;
        // Banner Button
        const introContent = main.current?.querySelector(
          ".first-intro .intro-content",
        ) as HTMLDivElement | null;
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        ) as HTMLDivElement | null;
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

          animations.push(tl);
        }
      });
    }

    // Cleanup function to kill animations on unmount
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // On Mouse Move
  useGSAP(() => {
    const viewRef = document.getElementById(
      "view-button",
    ) as HTMLDivElement | null;
    const xSetter = gsap.quickSetter(viewRef, "x", "px");
    const ySetter = gsap.quickSetter(viewRef, "y", "px");

    window.addEventListener("mousemove", (e) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    });
    // Show view on mouse hover
    const imageItems = main.current?.querySelectorAll(".news-image");
    imageItems?.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(viewRef, { opacity: 1, scale: 1, duration: 0.3 });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(viewRef, { opacity: 0, scale: 0, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      imageItems?.forEach((item) => {
        item.removeEventListener("mouseenter", () => {
          gsap.to(viewRef, { opacity: 1, scale: 1, duration: 0.3 });
        });
        item.removeEventListener("mouseleave", () => {
          gsap.to(viewRef, { opacity: 0, scale: 0, duration: 0.3 });
        });
      });
    };
  }, [pathname, pageDataFetched]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
    // Page Content Animation
    const sidebar = main.current?.querySelector(
      ".sheet-sidebar .sheet-sidebar-wrapper",
    );
    // Animations
    if (sidebar) {
      gsap.set(sidebar, {
        yPercent: 100,
        opacity: 0,
      });
      const sidebarAnim = gsap.to(sidebar, {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth * 0.3;
          },
          //toggleActions: "restart pause resume reverse",
        },
      });
      animations.push(sidebarAnim);
    }

    // Page images animation
    const postNews = main.current?.querySelectorAll(".single-news");
    const postImages = main.current?.querySelectorAll(".single-news-image");
    const postContent = main.current?.querySelectorAll(".single-news-content");

    // Animate each post content
    postContent?.forEach((postContentItem) => {
      if (postContentItem) {
        gsap.set(postContentItem, {
          xPercent: -50,
          opacity: 0,
        });
        const postContentAnim = gsap.to(postContentItem, {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          duration: 1,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return (
                GetRightPosition(postContentItem) - window.innerWidth * 0.7
              );
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(postContentAnim);
      }
    });

    // Animate each post image
    postImages?.forEach((postImage) => {
      if (postImage) {
        gsap.set(postImage, {
          xPercent: -50,
          opacity: 0,
        });
        const postImageAnim = gsap.to(postImage, {
          xPercent: 0,
          opacity: 1,
          ease: "none",
          duration: 1,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return GetRightPosition(postImage) - window.innerWidth * 0.7;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(postImageAnim);
      }
      const images = postImage.querySelectorAll(".news-image");
      // Set Initial State for each image
      images.forEach((image, index) => {
        if (index === 0) {
          gsap.set(image, {
            rotate: -2.38,
          });
        }
        if (index === 1) {
          gsap.set(image, {
            rotate: 9,
          });
        }
        if (index === 2) {
          gsap.set(image, {
            rotate: -8,
          });
        }
        // Set index on hover
        image.addEventListener("mouseenter", () => {
          if (postImage.classList.contains("mouse-entered")) {
            gsap.to(image, {
              zIndex: 50,
              duration: 0.1,
              delay: 0,
              ease: "none",
            });
            gsap.to(image, {
              scale: 1.05,
              duration: 0.5,
              delay: 0.1,
              ease: "none",
            });
          }
        });
        image.addEventListener("mouseleave", () => {
          if (postImage.classList.contains("mouse-entered")) {
            gsap.to(image, {
              zIndex: index === 0 ? 50 : 10,
              duration: 0.1,
              delay: 0,
              ease: "none",
            });
            gsap.to(image, {
              scale: 1,
              duration: 0.5,
              delay: 0.1,
              ease: "none",
            });
          }
        });
      });
      // Move image on hoverover and set z-index
      postImage.addEventListener("mouseenter", () => {
        images.forEach((image, index) => {
          if (index === 0) {
            gsap.to(image, {
              scale: 1.05,
              duration: 2,
              ease: "expo.inOut",
            });
          }
          if (index === 1) {
            gsap.to(image, {
              marginLeft: "-50%",
              duration: 2,
              ease: "expo.inOut",
            });
          }
          if (index === 2) {
            gsap.to(image, {
              marginLeft: "50%",
              duration: 2,
              ease: "expo.inOut",
            });
          }
          // Add class to post image
          setTimeout(() => {
            postImage.classList.add("mouse-entered");
          }, 1500);
        });
      });
      postImage.addEventListener("mouseleave", () => {
        images.forEach((image, index) => {
          if (index === 0) {
            gsap.to(image, {
              scale: 1,
              duration: 2,
              ease: "expo.inOut",
            });
          }
          if (index === 1) {
            gsap.to(image, {
              marginLeft: "0",
              duration: 2,
              ease: "expo.inOut",
            });
          }
          if (index === 2) {
            gsap.to(image, {
              marginLeft: "0",
              duration: 2,
              ease: "expo.inOut",
            });
          }
          // Remove class from post image
          setTimeout(() => {
            postImage.classList.remove("mouse-entered");
          }, 1500);
        });
      });
    });
    // Other Animation
    var mouse = { x: 0, y: 0, moved: false };
    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    });
    function parallaxIt(target: any, movement: number) {
      gsap.to(target, {
        x: ((mouse.x - window.innerWidth / 2) / window.innerWidth) * movement,
        y: ((mouse.y - window.innerHeight / 2) / window.innerHeight) * movement,
        duration: 1,
      });
    }
    // Animate on mouse move
    window.addEventListener("mousemove", function () {
      if (mouse.moved) {
        postImages?.forEach((postImage) => {
          postImage.querySelectorAll(".news-image").forEach((image, index) => {
            if (index === 0) {
              parallaxIt(image, 20);
            }
            if (index === 1) {
              parallaxIt(image, -30);
            }
            if (index === 2) {
              parallaxIt(image, 30);
            }
          });
        });
      }
      mouse.moved = false;
    });

    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  };

  // Set Body Overflow Hidden
  useGSAP(() => {
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

  if (!pageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">News Not Found</h1>
          <p className="text-gray-600">
            The requested news post could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    pageData && (
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
            className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${sectionWidth}vw] h-screen items-center will-change-transform`}
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={IntroBG}
              bgOverlay={""}
              data={
                pageData?.acf?.introduction
                  ? pageData?.acf?.introduction
                  : staticData?.acf?.introduction
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
            <NewsContentSection
              extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[10vh] px-[10vw]`}
              animWidthText={1}
              data={pagePosts}
            />
          </div>
        </div>
      </main>
    )
  );
}
