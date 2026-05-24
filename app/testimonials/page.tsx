"use client";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import BigTitleSplitLines from "../ui/BigTitleSplitLines";
import DonationVideo from "../ui/DonationVideo";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const [testimonialsPageData, setTestimonialsPageData] = useState<null | any>(
    null,
  );
  const [pageDataFetched, setPageDataFetched] = useState(false);
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

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadTestimonialsPageData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/testimonials", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load rabbis page data.");
        }

        const data = await response.json();

        if (isMounted) {
          setTestimonialsPageData(data);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load testimonials page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonialsPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!testimonialsPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
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
        console.log("Testimonial Item Width:", testimonial?.offsetWidth || 0);
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
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const headerLeft = main.current?.querySelector(".header-left");
        const headerRight = main.current?.querySelector(".header-right");
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
              setPageContentAnimation();
            },
          });
          if (main.current) {
            tl.to(main.current, {
              opacity: 1,
              ease: "none",
              duration: 0.5,
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
                duration: 0,
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
        }
      });
    }
  }, [pathname, pageDataFetched]);

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
                                    alt={
                                      testimonial?.title || "Testimonial Image"
                                    }
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
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
            ></div>
          </div>
        </div>
      </div>
    )
  );
}
