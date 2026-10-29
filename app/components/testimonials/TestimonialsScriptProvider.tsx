"use client";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BigTitleSplitLines from "../../ui/BigTitleSplitLines";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsScriptProvider({ data }: { data: any }) {
  const [testimonialsPageData, setTestimonialsPageData] = useState<null | any>(
    null,
  );
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(100);
  const [sectionWidth, setSectionWidth] = useState(50);
  // error is a pure derivation of the data prop (true exactly when data is
  // missing), so it is computed during render instead of mirrored into
  // state via an effect that "adjusts" it on every data change.
  const error = !data ? "No data provided." : null;
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
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
      return;
    }
    setTestimonialsPageData(data);
  }, [data, isLoading]);

  useEffect(() => {
    if (!testimonialsPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
    // testimonialsPageData has a single producer (the data effect above)
    // and, once set, never reverts, so it is read here via closure rather
    // than listed as a dependency; re-running this effect only when
    // animationPlayed changes avoids an avoidable extra render chain.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationPlayed, testimonialsPageData]);

  // useEffect(() => {
  //   if (!testimonialsPageData) {
  //     return;
  //   }
  //   // Update Section Width on Data Change
  //   const updateSectionWidth = () => {
  //     const testimonialsItems = document.querySelectorAll(".testimonial-item");
  //     let itemWidths = 0;
  //     testimonialsItems.forEach((testimonial: any) => {
  //       itemWidths += testimonial?.offsetWidth || 0;
  //     });
  //     const newSectionWidth =
  //       testimonialsPageData?.acf?.testimonials?.length * 65 +
  //       testimonialsPageData?.acf?.testimonials?.length * 10 +
  //       10;
  //     setSectionWidth(newSectionWidth);
  //     setContainerWidth(newSectionWidth + 40);
  //   };

  //   updateSectionWidth();
  //   window.addEventListener("resize", updateSectionWidth);
  //   return () => {
  //     window.removeEventListener("resize", updateSectionWidth);
  //   };
  // }, [testimonialsPageData]);

  // Page Section Animation
  // useGSAP(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     panel.current &&
  //     wrapper.current &&
  //     window.innerWidth > 1024
  //   ) {
  //     // Overflow body
  //     const progress = document.getElementById(
  //       "progress",
  //     ) as HTMLElement | null;
  //     const waveLine = document.getElementById(
  //       "wave-line",
  //     ) as HTMLElement | null;
  //     const arrowButton = document.getElementById(
  //       "arrow-button",
  //     ) as HTMLElement | null;
  //     waveLine?.classList.remove("hidden");
  //     const scurbScale = 2;

  //     // Vertical Section
  //     const timeline = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: panel.current,
  //         start: "top top",
  //         end: "+=" + window.innerHeight * (containerWidth / 100),
  //         scrub: scurbScale,
  //         pin: true,
  //         onUpdate: (self) => {
  //           if (progress) {
  //             gsap.to(progress, { width: `${100 * self.progress}%` });
  //           }
  //           if (waveLine) {
  //             if (self.progress > 0.97) {
  //               gsap.to(waveLine, {
  //                 opacity: 0,
  //                 duration: 0.1,
  //                 delay: 0,
  //               });
  //             } else {
  //               gsap.to(waveLine, {
  //                 opacity: 1,
  //                 duration: 0.1,
  //                 delay: 0,
  //               });
  //             }
  //           }
  //         },
  //       },
  //     });
  //     timeline.to(wrapper.current, {
  //       x: () =>
  //         wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: panel.current,
  //         start: panel.current?.offsetTop,
  //         end: "+=" + (window.innerHeight * (containerWidth / 100) - 500),
  //         scrub: scurbScale,
  //       },
  //     });
  //     setVerticalSection(timeline);
  //   }
  //   // Return
  //   return () => {
  //     if (verticalSection) {
  //       verticalSection.kill();
  //     }
  //   };
  // }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    if (!panel.current && !wrapper.current) return;
    setPageContentAnimation();
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        const waveLine = document.getElementById(
          "wave-line",
        ) as HTMLElement | null;
        gsap.set(waveLine, {
          opacity: 0,
        });
        // Selectors
        const pageWrapper = document.querySelector(
          "#page-wrapper",
        ) as HTMLElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLElement | null;
        const introTitle = main.current?.querySelector(
          ".introduction h1.intro-title",
        );
        const Testimonial1 = main.current?.querySelector(
          ".testimonials .testimonial-item:nth-child(1)",
        );
        let splitIntroTitle;
        if (introTitle) {
          splitIntroTitle = BigTitleSplitLines(introTitle);
          gsap.set(introTitle, {
            perspective: 400,
          });
          gsap.set(splitIntroTitle, {
            yPercent: 150,
            opacity: 0,
          });
        }
        if (Testimonial1) {
          gsap.set(Testimonial1, {
            x: "-15vw",
            opacity: 0,
          });
        }
        // Set localStorage variable
        const userVisit = localStorage.getItem("hasVisited");
        if (userVisit === "true") {
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
          // Intro Title Animation
          if (introTitle && splitIntroTitle) {
            tl.to(
              splitIntroTitle,
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
          // Intro Image Animation
          if (Testimonial1) {
            tl.to(
              Testimonial1,
              {
                x: "0vw",
                opacity: 1,
                duration: 3,
                delay: 0,
                ease: "expo.inOut",
              },
              "-=2",
            );
          }
          // Wave Mask Animation
          const waveMask = document.getElementById(
            "wave-mask",
          ) as HTMLElement | null;
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
  const setPageContentAnimation = () => {
    // Page Content Animation
    const Testimonials = main.current?.querySelectorAll(
      ".testimonials .testimonial-item",
    ) as NodeListOf<HTMLElement> | null;
    if (Testimonials) {
      Testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          gsap.set(testimonial, {
            x: "-30vw",
            opacity: 0,
          });
          gsap.to(testimonial, {
            x: "0vw",
            opacity: 1,
            ease: "expo.inOut",
            duration: 2,
            scrollTrigger: {
              start: () => {
                return GetRightPosition(testimonial) - window.innerWidth * 1.5;
              },
              toggleActions: "restart none none reverse",
            },
          });
        }
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
  }, [isAllAnimationComplete, verticalSection]);

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

  if (!testimonialsPageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Testimonials Not Found</h1>
          <p className="text-gray-600">
            The requested testimonials could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    testimonialsPageData && (
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
            className={`section-wrapp flex lg:flex-nowrap lg:flex-row-reverse w-full lg:w-(--container-width) lg:h-screen items-center`}
          >
            <div
              dir="rtl"
              className={`testimonials-content w-full h-full py-[10vh] px-[8vw] lg:px-[10vw] flex items-center gap-x-[6.3vw] flex-col lg:flex-row`}
            >
              <div className="introduction w-full min-h-[60vh] lg:w-[33.4vw] min-w-[33.4vw] flex items-center">
                <h1
                  dir="ltr"
                  className="intro-title text-[15vw] lg:text-[8vw] leading-[40%] sm:leading-[50%] lg:leading-[70%] text-[#C3A13F] text-right"
                >
                  {parse(testimonialsPageData?.acf?.title || "")}
                </h1>
              </div>
              <div
                style={
                  {
                    "--section-width": `${sectionWidth}vw`,
                  } as React.CSSProperties
                }
                className={`testimonials flex w-full lg:h-screen items-center justify-center gap-x-[10vw] lg:w-(--section-width) lg:pl-[10vw] flex-col lg:flex-row gap-y-15 sm:gap-y-[10vh]`}
              >
                <div className="testimonial-item w-full lg:w-[65vw] lg:h-screen flex items-center justify-start gap-x-[2.8vw] flex-col lg:flex-row gap-y-10">
                  <div className="testimonial-image w-full lg:w-[40vw] min-w-[40vw] lg:h-[50vh] relative">
                    <div className="w-full h-50 lg:h-full bg-[#111111] flex items-center justify-center">
                      <h4 className="text-[18px] lg:text-[26px] leading-[1em]">
                        הראיונות יתעדכנו בקרוב בע״ה
                      </h4>
                    </div>
                  </div>
                </div>
                {/* {testimonialsPageData?.acf?.testimonials &&
                  testimonialsPageData?.acf?.testimonials?.map(
                    (testimonial: any, index: number) => (
                      <div
                        key={"Testimonials-" + index}
                        className="testimonial-item w-full lg:w-[65vw] lg:h-screen flex items-center justify-start gap-x-[2.8vw] flex-col lg:flex-row gap-y-10"
                      >
                        <div className="testimonial-image w-full lg:w-[40vw] min-w-[40vw] lg:h-[50vh] relative">
                          {testimonial?.media_type === "video" && (
                            <DonationVideo
                              extraClass={
                                "donation-video w-full h-full"
                              }
                              data={testimonial?.video}
                            />
                          )}
                          {testimonial?.media_type === "image" && (
                            <div className="image w-full">
                              <Image
                                src={
                                  testimonial?.image?.sizes?.medium_large ||
                                  testimonial?.image?.url
                                }
                                alt={testimonial?.title || "Testimonial Image"}
                                className="w-full h-full object-cover object-center"
                                width={768}
                                height={464}
                                blurDataURL={CreateShimmerDataUrl(768, 464)}
                                placeholder={"blur"}
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                        <h2
                          dir="ltr"
                          className="testimonial-title text-[30px] sm:text-[45px] lg:text-[55px] leading-[70%] text-[#C3A13F] text-right"
                        >
                          {parse(testimonial.title || "")}
                        </h2>
                      </div>
                    ),
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
