"use client";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BigTitleSplitLines from "../../ui/BigTitleSplitLines";
import DonationVideo from "../../ui/DonationVideo";
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
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
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
      setError("No data provided.");
      return;
    }
    setTestimonialsPageData(data);
  }, [data]);

  useEffect(() => {
    if (!testimonialsPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [testimonialsPageData, animationPlayed]);

  useEffect(() => {
    if (!testimonialsPageData) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const testimonialsItems = document.querySelectorAll(".testimonial-item");
      let itemWidths = 0;
      testimonialsItems.forEach((testimonial: any) => {
        itemWidths += testimonial?.offsetWidth || 0;
      });
      const newSectionWidth =
        testimonialsPageData?.acf?.testimonials?.length * (itemWidths / 19.2) +
        testimonialsPageData?.acf?.testimonials?.length * 10;
      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 39.7);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [testimonialsPageData]);

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
          end: "+=" + window.innerHeight * (containerWidth / 100),
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
          end: "+=" + (window.innerHeight * (containerWidth / 100) - 500),
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
    setPageContentAnimation();
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
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

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const Testimonials = main.current?.querySelectorAll(
      ".testimonials .testimonial-item",
    );
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
                return window.innerWidth * (index * 0.4);
              },
              toggleActions: "restart pause resume reverse",
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
          className="w-screen h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${containerWidth}vw] h-screen items-center will-change-transform`}
          >
            <div
              dir="rtl"
              className={`testimonials-content w-[${containerWidth}vw] h-full py-[10vh] px-[10vw] flex items-center gap-x-[6.3vw]`}
            >
              <div className="introduction w-[33.4vw] min-w-[33.4vw] will-change-transform">
                <h1
                  dir="ltr"
                  className="intro-title text-[8vw] leading-[70%] text-[#C3A13F] text-right"
                >
                  {parse(testimonialsPageData?.acf?.title || "")}
                </h1>
              </div>
              <div
                className={`testimonials flex h-screen items-center justify-center gap-x-[10vw] w-[${sectionWidth}vw] will-change-transform pl-[10vw]`}
              >
                {testimonialsPageData?.acf?.testimonials &&
                  testimonialsPageData?.acf?.testimonials?.map(
                    (testimonial: any, index: number) => (
                      <div
                        key={index}
                        className="testimonial-item w-[65vw] h-screen flex items-center justify-start gap-x-[2.8vw] will-change-transform"
                      >
                        <div className="testimonial-image w-[40vw] min-w-[40vw] h-[50vh] relative">
                          {testimonial?.media_type === "video" && (
                            <DonationVideo
                              extraClass={
                                "donation-video w-full h-full will-change-transform"
                              }
                              data={testimonial?.video}
                            />
                          )}
                          {testimonial?.media_type === "image" && (
                            <div className="image">
                              <Image
                                src={
                                  testimonial?.image?.sizes?.medium_large ||
                                  testimonial?.image?.url
                                }
                                alt={testimonial?.title || "Testimonial Image"}
                                className="w-full h-full object-cover object-center will-change-transform"
                                width={768}
                                height={464}
                              />
                            </div>
                          )}
                        </div>
                        <h2
                          dir="ltr"
                          className="testimonial-title text-[55px] leading-[70%] text-[#C3A13F] text-right"
                        >
                          {parse(testimonial.title || "")}
                        </h2>
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
