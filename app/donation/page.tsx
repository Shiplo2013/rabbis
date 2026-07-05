"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import DonationContentSection from "../components/donation/DonationContentSection";
import Introduction from "../components/donation/Introduction";
import LoadingEffect from "../components/LoadingEffect";
import FixedPlayButton from "../ui/FixedPlayButton";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  const [donationPageData, setDonationPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [headerData, setHeaderData] = useState<any | null>(null);
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
    let fetchError = false;

    const loadDonationPageData = async () => {
      const response = fetch("/api/donation", {
        cache: "no-store",
      });
      const response2 = fetch("/api/header", {
        cache: "force-cache",
      });
      try {
        const [pageData, headerData] = await Promise.all([response, response2]);

        if (!pageData.ok || !headerData.ok) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }

        const data = fetchError ? null : await pageData.json();
        const header = fetchError ? null : await headerData.json();

        if (isMounted) {
          setDonationPageData(data);
          setHeaderData(header);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load donation page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDonationPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!donationPageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      //console.log("Donation Page Data:", donationPageData);
    }
  }, [donationPageData, animationPlayed]);

  useEffect(() => {
    if (!donationPageData) {
      return;
    }
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      // const newSectionWidth =
      //   testimonialsPageData?.acf?.testimonials?.length * (itemWidths / 19.2) +
      //   donationPageData?.acf?.testimonials?.length * 10;
      // setSectionWidth(newSectionWidth);
      // setContainerWidth(newSectionWidth + 39.7);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [donationPageData]);

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
          end: "+=" + window.innerWidth * 3.8,
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
          end: "+=" + (window.innerWidth * 3.8 - 500),
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
        // Banner Button
        const introTitle = main.current?.querySelector(
          ".first-intro .intro-title",
        );
        // Banner Button
        const introButtonWrap = main.current?.querySelector(
          ".first-intro .donation-button",
        );
        const introButton = main.current?.querySelector(
          ".first-intro .donation-button .theme-button",
        );
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".first-intro .intro-background .intro-bg-mask",
        );
        // Donation Video
        const donationVideoWrapper = main.current?.querySelector(
          ".donation-content .donation-video1",
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
        if (introButton) {
          gsap.set(introButton, {
            yPercent: 100,
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
          if (introButton) {
            tl.to(
              introButton,
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
          if (donationVideoWrapper) {
            tl.to(
              donationVideoWrapper,
              {
                x: "12vw",
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
    const donationReadmore = main.current?.querySelector(".donation-readmore");
    // Banner Button
    const introButtonWrap = main.current?.querySelector(
      ".first-intro .donation-button",
    );
    // Donation Video
    const donationVideo1 = main.current?.querySelector(
      ".donation-content .donation-video1 .donation-video",
    );
    // Donation Video
    const donationVideo2 = main.current?.querySelector(
      ".donation-content .donation-video2",
    );
    // Donation Video
    const donationButton = main.current?.querySelector(
      ".donation-content .content-button",
    );
    // Donation Text 1
    const donationText1 = main.current?.querySelector(
      ".donation-content .content-text1",
    );
    // Donation Text 2
    const donationText2 = main.current?.querySelector(
      ".donation-content .content-text2",
    );
    // Donation Text 3
    const donationText3 = main.current?.querySelector(
      ".donation-content .content-text3",
    );
    const donationText3Title = main.current?.querySelector(
      ".donation-content .content-text3 h3.title",
    );
    const donationText3Text = main.current?.querySelector(
      ".donation-content .content-text3 .text",
    );

    // Button Animation
    if (introButtonWrap) {
      gsap.from(introButtonWrap, {
        x: "20vw",
        delay: 0,
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 1.5;
          },
          scrub: 2,
        },
      });
    }

    // Donation Video Animation
    if (donationVideo1) {
      gsap.to(donationVideo1, {
        x: "-15vw",
        delay: 0,
        ease: "none",
        scrollTrigger: {
          start: () => {
            return 0;
          },
          end: () => {
            return "+=" + window.innerWidth * 1.5;
          },
          scrub: 2,
        },
      });
    }
    // Content Button
    if (donationButton) {
      gsap.from(donationButton, {
        xPercent: -50,
        opacity: 0,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationButton) - window.innerWidth * 0.7;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
    // Donation Text 1
    if (donationText1) {
      const splitTitle = TextSplitLines(donationText1);
      gsap.set(donationText1, {
        perspective: 400,
      });
      gsap.set(splitTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitTitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: -1,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationText1) - window.innerWidth * 0.6;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
    // Donation Text 2
    if (donationText2) {
      const splitTitle = TextSplitLines(donationText2);
      gsap.set(donationText2, {
        perspective: 400,
      });
      gsap.set(splitTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitTitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: -1,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationText2) - window.innerWidth * 0.6;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
    // Donation Video 2
    if (donationVideo2) {
      gsap.from(donationVideo2, {
        xPercent: -50,
        opacity: 0,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationVideo2) - window.innerWidth * 0.4;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
    // Donation Text 3
    if (donationText3 && donationText3Title && donationText3Text) {
      const splitTitle = TextSplitLines(donationText3Title);
      gsap.set(donationText3Title, {
        perspective: 400,
      });
      gsap.set(splitTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitTitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: -1,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationText3) - window.innerWidth * 0.3;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
      // Text const
      const splitText = TextSplitLines(donationText3Text);
      gsap.set(donationText3Text, {
        perspective: 400,
      });
      gsap.set(splitText, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitText, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: -1,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationText3) - window.innerWidth * 0.3;
          },
          toggleActions: "restart pause resume reverse",
        },
      });
    }
    // ReadMore Button
    if (donationReadmore) {
      gsap.from(donationReadmore, {
        xPercent: -50,
        opacity: 0,
        ease: "expo.inOut",
        duration: 1,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return GetRightPosition(donationReadmore) - window.innerWidth * 0.4;
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
      //document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

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

  if (!donationPageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Donation Page Not Found</h1>
          <p className="text-gray-600">
            The requested donation page could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    donationPageData && (
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
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[380vw] h-screen items-center will-change-transform`}
              >
                <Introduction
                  animated={isAllAnimationComplete}
                  animationStatus={isAllAnimationComplete}
                  bgImage={IntroBG}
                  bgOverlay={""}
                  data={{
                    title: donationPageData?.acf?.page_title,
                    button: {
                      text: donationPageData?.acf?.donation_button_text,
                      link: donationPageData?.acf?.donation_button_link,
                    },
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
                <DonationContentSection
                  extraClass="min-w-[280vw] w-[280vw] h-screen panel-section will-change-transform py-[5vw] px-[6.25vw]"
                  animWidthText={1}
                  sectionData={{
                    video1: {
                      poster: donationPageData?.acf?.video_1?.poster,
                      source: donationPageData?.acf?.video_1?.source,
                    },
                    content1: donationPageData?.acf?.text_1,
                    content2: donationPageData?.acf?.text_2,
                    video2: {
                      poster: donationPageData?.acf?.video_2?.poster,
                      source: donationPageData?.acf?.video_2?.source,
                    },
                    content3: {
                      title: donationPageData?.acf?.content?.title,
                      text: donationPageData?.acf?.content?.text,
                    },
                    button: {
                      text: donationPageData?.acf?.donation_button_text,
                      link: donationPageData?.acf?.donation_button_link,
                    },
                  }}
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
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#1A1A1A] z-10"
            ></div>
          </div>
        </div>
        <FixedPlayButton />
      </div>
    )
  );
}
