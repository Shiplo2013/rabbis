"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import Introduction from "../../components/past-rabbis/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";
import CustomsContentSection2 from "./CustomsContentSection2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PastRabbisScriptProvider2({ data }: { data: any }) {
  // Selectors
  const [rabbisPageData, setRabbisPageData] = useState<null | any>(null);
  const [rabbisPosts, setRabbisPosts] = useState<null | any>(data?.posts);
  const [containerWidth, setContainerWidth] = useState<number>(200);
  const [sectionWidth, setSectionWidth] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);
  const {
    isLoading,
    setIsLoading,
    animationPlayed,
    setAnimationPlayed,
    pastRabbisSearchQuery,
  } = useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Router Path
  const pathname = usePathname();
  const router = useRouter();

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  // Combined Scrolling
  const [postPerPage, setPostPerPage] = useState(100);
  const [postsPerLoad, setPostsPerLoad] = useState(5);
  const [postLoadCount, setPostLoadCount] = useState(1);
  const [postLoadLimit, setPostLoadLimit] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [verticalPosts, setVerticalPosts] = useState<any | null>(null);
  const [normalPosts, setNormalPosts] = useState<any[]>([]);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setRabbisPageData(data);
    setRabbisPosts(data?.posts);
  }, [data]);

  // Set post data
  useEffect(() => {
    if (!rabbisPosts) return;
    setPostLoadLimit(
      Math.ceil(Number(rabbisPosts?.length || 0) / postsPerLoad),
    );
    setVerticalPosts(rabbisPosts?.slice(0, 1) || []);
    setNormalPosts(rabbisPosts?.slice(1, rabbisPosts?.length) || []);
    setIsLoadingMore(false);
  }, [rabbisPosts]);

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

  // Page Section Animation
  useGSAP(() => {
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
          ".first-intro .intro-content",
        );
        // Past Rabbis
        // const firstRabbis = main.current?.querySelector(
        //   ".rabbis-section .rabbis-item:first-child",
        // );
        // if (firstRabbis) {
        //   gsap.set(firstRabbis, {
        //     opacity: 0,
        //   });
        // }
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
          //   if (firstRabbis) {
          //     tl.to(
          //       firstRabbis,
          //       {
          //         marginTop: "-10vh",
          //         opacity: 1,
          //         delay: 0,
          //         duration: 3,
          //         ease: "expo.inOut",
          //       },
          //       "-=2.5",
          //     );
          //   }
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

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Set Page Content Animation
  useGSAP(() => {
    // Page Content Animation
    const sidebar = document.getElementById(
      "pastrabbis-sidebar",
    ) as HTMLDivElement | null;
    const firstRabbis = main.current?.querySelector(
      ".rabbis-section .rabbis-item:first-child",
    );
    const RabbisItem = main.current?.querySelectorAll(
      ".rabbis-section .rabbis-item:not(:first-child)",
    );

    // Animations
    if (sidebar && window.innerWidth > 1024) {
      gsap.set(sidebar, {
        x: 340,
      });
      // Sidebar Animation
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowWidth = window.innerWidth * 1.8;
        const pageHeight = main?.current?.offsetHeight;

        if (scrollTop > windowWidth) {
          gsap.to(sidebar, {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebar, {
            x: 340,
            duration: 0.5,
            ease: "power2.out",
          });
        }
        // Hide sidebar when reaching the end of the page
        if (scrollTop > (pageHeight || 0) - window.innerHeight) {
          gsap.to(sidebar, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(sidebar, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      gsap.set(sidebar, {
        autoAlpha: 0,
      });
    }

    // First Rabbis
    if (firstRabbis && window.innerWidth > 1024) {
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
    } else {
      if (firstRabbis) {
        gsap.set(firstRabbis, {
          y: "0vw",
        });
      }
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

  // Hide header-left on scroll down, show on scroll up (only for this page)
  useGSAP(() => {
    if (!isAllAnimationComplete || !main.current) {
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

  // Rabbis Search Result
  useEffect(() => {
    if (pastRabbisSearchQuery !== null && pastRabbisSearchQuery !== "") {
      const filteredContent = rabbisPageData?.posts.filter(
        (post: { title: { rendered: string } }) => {
          return post.title.rendered.includes(pastRabbisSearchQuery);
        },
      );
      setRabbisPosts(filteredContent);
      window.scrollTo({ top: window.innerWidth * 1.8, behavior: "smooth" });
    } else {
      setRabbisPosts(rabbisPageData?.posts);
      window.scrollTo({ top: window.innerWidth * 1.8, behavior: "smooth" });
    }
  }, [pastRabbisSearchQuery]);

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

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
            className={`section-wrapp flex lg:flex-nowrap lg:flex-row-reverse lg:w-(--container-width) lg:h-screen items-center will-change-transform flex-col`}
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
            <CustomsContentSection2
              style={
                {
                  "--section-width": `${sectionWidth}vw`,
                } as React.CSSProperties
              }
              extraClass={`w-full lg:min-w-(--section-width) lg:w-(--section-width) lg:h-screen panel-section will-change-transform pt-[5vh] pb-[8vh] lg:pt-[5vw] lg:pb-[10vh] px-[8vw] lg:px-[6.25vw]`}
              animWidthText={1}
              data={verticalPosts || []}
            />
          </div>
        </div>
        <div className="normal-scrolling w-full lg:min-h-[50vh] bg-black px-[8vw] lg:px-14.5 pb-[10vh] will-change-transform">
          <div className="wrapper w-full flex flex-col items-center justify-center gap-y-[15vh] relative lg:pr-70">
            <div
              className={`normal-posts w-full flex flex-row flex-wrap gap-x-10 gap-y-10 lg:gap-y-[12vh] justify-end`}
            >
              {normalPosts?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    data-id={item.id}
                    className={`rabbis-item w-full h-full flex items-end justify-center gap-y-12 sm:gap-y-[8vh] gap-x-[3.3vw] will-change-transform flex-col lg:flex-row-reverse`}
                  >
                    <div className="rabbis-image w-full lg:w-[27.1vw] relative">
                      <div className="image w-full h-auto lg:h-[57.2vh] relative">
                        <Link
                          href={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                          onClick={handleLinkClick}
                        >
                          <Image
                            className="w-full h-full object-cover object-center"
                            src={
                              item?.acf?.thumbnail?.sizes?.medium_large ||
                              item?.acf?.thumbnail?.url ||
                              item?.acf?.thumbnail?.src
                            }
                            width={522}
                            height={532}
                            alt={
                              item?.acf?.thumbnail?.alt ||
                              item?.title?.rendered ||
                              "Past Rabbi"
                            }
                            blurDataURL={CreateShimmerDataUrl(522, 532)}
                            placeholder="blur"
                            loading="lazy"
                          />
                        </Link>
                      </div>
                      <div className="read-more absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-30">
                        <ThemeButton
                          extraClass="rounded-none py-4 sm:py-5 px-5 lg:px-10 items-center leading-[80%] min-w-40 sm:min-w-60 justify-center"
                          text="הרחב קריאה"
                          textColor="text-black"
                          hoverBgColor="bg-[#111111]"
                          hoverTextColor="group-hover:text-white"
                          bgColor="bg-[#C3A13F]"
                          fontSize="text-[18px] sm:text-[22px] lg:text-[30px]"
                          svgIconClass=""
                          buttonLink={
                            item?.slug ? `/past-rabbis/${item.slug}` : "#"
                          }
                        />
                      </div>
                    </div>
                    <div
                      dir="rtl"
                      className="rabbis-content w-full lg:w-[28vw] text-[#D1A941]"
                    >
                      <h2 className="text-[30px] sm:text-[40px] lg:text-[55px] leading-[0.85em] overflow-hidden relative">
                        <Link
                          href={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                          onClick={handleLinkClick}
                        >
                          {parse(
                            item.title?.rendered
                              ? item.title.rendered
                              : item.title,
                          )}
                        </Link>
                      </h2>
                      <div className="content text-[20px] sm:text-[25px] lg:text-[33px] leading-[1em] mt-5 relative">
                        {parse(item?.acf?.time)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    )
  );
}
