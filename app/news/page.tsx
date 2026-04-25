"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import PostImage1 from "../assets/images/community-post1.jpg";
import PostImage2 from "../assets/images/community-post2.jpg";
import PostImage3 from "../assets/images/community-post3.jpg";
import IntroBG from "../assets/images/news-bg.png";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import ViewIcon2 from "../assets/icons/ViewIcon2";
import LoadingEffect from "../components/LoadingEffect";
import Introduction from "../components/news/Introduction";
import NewsContentSection from "../components/news/NewsContentSection";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const IntroData1 = [
    {
      title: `עד שבחברון`,
      content: `חדשות הישיבה`,
    },
  ];
  // Rabbis Data
  const NewsPostsData = [
    {
      title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
      summary: `עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם`,
      link: `/news/single`,
      images: [PostImage1, PostImage2, PostImage3],
    },
    {
      title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
      summary: `עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם`,
      link: `/news/single`,
      images: [PostImage1, PostImage2, PostImage3],
    },
  ];

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
  const viewRef = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
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
  }, [pathname]);

  // Load Page
  useGSAP(
    () => {
      if (typeof window !== "undefined" && panel) {
        document.fonts.ready.then(() => {
          // Selectors
          const headerLeft = main.current?.querySelector(".header-left");
          const headerRight = main.current?.querySelector(".header-right");
          const rabbisContent =
            main.current?.querySelectorAll(".rabbis-section");
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
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // On Mouse Move
  useGSAP(
    () => {
      const xSetter = gsap.quickSetter(viewRef.current, "x", "px");
      const ySetter = gsap.quickSetter(viewRef.current, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      // Show view on mouse hover
      const imageItems = main.current?.querySelectorAll(".news-image");
      imageItems?.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(viewRef.current, { opacity: 1, scale: 1, duration: 0.3 });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(viewRef.current, { opacity: 0, scale: 0, duration: 0.3 });
        });
      });

      return () => {
        window.addEventListener("mousemove", (e) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        });
        imageItems?.forEach((item) => {
          item.removeEventListener("mouseenter", () => {
            gsap.to(viewRef.current, { opacity: 1, scale: 1, duration: 0.3 });
          });
          item.removeEventListener("mouseleave", () => {
            gsap.to(viewRef.current, { opacity: 0, scale: 0, duration: 0.3 });
          });
        });
      };
    },
    { scope: main, dependencies: [pathname] },
  );

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
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
          toggleActions: "restart pause resume reverse",
        },
      });
    }

    // Page images animation
    const postImages = main.current?.querySelectorAll(".single-news-image");
    const postContent = main.current?.querySelectorAll(".single-news-content");

    // Animate each post content
    postContent?.forEach((postContentItem) => {
      if (postContentItem) {
        gsap.set(postContentItem, {
          xPercent: -50,
          opacity: 0,
        });
        gsap.to(postContentItem, {
          xPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 3,
          delay: 0.5,
          scrollTrigger: {
            start: () => {
              return (
                GetRightPosition(postContentItem) - window.innerWidth * 0.5
              );
            },
            toggleActions: "restart pause resume reverse",
          },
        });
      }
    });

    // Animate each post image
    postImages?.forEach((postImage) => {
      if (postImage) {
        gsap.set(postImage, {
          xPercent: -50,
          opacity: 0,
        });
        gsap.to(postImage, {
          xPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 3,
          delay: -1,
          scrollTrigger: {
            start: () => {
              return GetRightPosition(postImage) - window.innerWidth * 0.3;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
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
  return (
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[300vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={IntroBG}
                bgOverlay={""}
                data={IntroData1}
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
                extraClass="min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform py-[10vh] px-[6.25vw]"
                animWidthText={1}
                sectionData={JSON.stringify(NewsPostsData)}
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
      <div
        ref={viewRef}
        id="view-button"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 select-none pointer-events-none opacity-0 scale-0"
      >
        <button className="w-25 h-25 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer">
          <span className="block w-12 h-auto">
            <ViewIcon2 />
          </span>
        </button>
      </div>
    </div>
  );
}
