"use client";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import TextSplitLines from "../../ui/TextSplitLines";
import TitleSplitChars from "../../ui/TitleSplitChars";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "../../ui/plugins";
import { useAppState } from "../AppContext";
import HomeBanner from "./HomeBanner";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import IntroSection from "./IntroSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);
}

type HomePageApiResponse = {
  id: number;
  acf: any | HomePageAcf | null;
  yoast_head_json: any;
};

type HomePageAcf = {
  banner_section?: {
    title_1?: string;
    title_2?: string;
    title_3?: string;
    subtitle?: string;
    audio_music?: number | string;
    banner_background?: StaticImageData | string;
  };
  intro_section?: {
    title?: string;
  };
  home_section_1?: {
    text_slider?: {
      text_slide_1?: string;
      text_slide_2?: string;
    };
    community_posts?: any;
    background_image?: any;
  };
  home_section_2?: {
    image?: any;
    title?: string;
    foating_image?: any;
    text?: string;
  };
  home_section_3?: {
    image?: any;
    title?: string;
    text?: string;
    background_image?: any;
  };
  home_section_4?: {
    content?: string;
    background_image?: any;
  };
};

type HomePost = {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  acf: {
    subtitle?: string;
    informations?: {
      established?: string;
    };
  };
};

export default function HomeScriptProvider({
  data,
  postsData,
}: {
  data: HomePageApiResponse;
  postsData: HomePost[];
}) {
  // Selector
  const page = useRef<HTMLDivElement>(null);
  // Audo Player
  const [homePageData, setHomePageData] = useState<HomePageApiResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading } = useAppState();

  // pageDataFetched is a pure derivation of homePageData's presence, so it
  // is computed during render instead of mirrored into state via an
  // effect that "adjusts" it on every data change.
  const pageDataFetched = !!homePageData;
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 1024 : false,
  );
  const { animationPlayed, setAnimationPlayed, setAudioFile } = useAppState();
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Router Path
  const pathname = usePathname();

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      return;
    }
    setHomePageData(data);
    if (data?.acf?.banner_section?.audio_music?.url) {
      setAudioFile(data.acf.banner_section.audio_music.url);
    }
    // isLoading is shared context state; its value derives from data's
    // presence (always false here, since this branch only runs once data
    // is truthy) rather than an unrelated hardcoded literal.
    setIsLoading(!data);
  }, [data, setAudioFile, setIsLoading]);

  // Load Page Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    document.fonts.ready.then(() => {
      verticalSection?.pause();
      // Selectors
      const page = document.querySelector(
        "#page-wrapper",
      ) as HTMLElement | null;
      const headerLeft = document.querySelector(
        ".header-left",
      ) as HTMLElement | null;
      const headerRight = document.querySelector(
        ".header-right",
      ) as HTMLElement | null;
      // Banner Title 1
      const bannerTitle1 = document.querySelector(
        ".home-banner .banner-title1",
      ) as HTMLElement | null;
      // Banner Title 2
      const bannerTitle2 = document.querySelector(
        ".home-banner .banner-title2",
      ) as HTMLElement | null;
      // Banner Title 3
      const bannerTitle3 = document.querySelector(
        ".home-banner .banner-title3",
      ) as HTMLElement | null;
      // Banner Content
      const bannerContent = document.querySelector(
        ".home-banner .banner-content",
      ) as HTMLElement | null;
      // Banner Background Overlay
      const bannerBackgroundOverlay = document.querySelector(
        ".home-banner .banner-background-wrapper .banner-bg-mask",
      ) as HTMLElement | null;
      // Banner Button
      const bannerButton = document.querySelector(
        ".home-banner .banner-button",
      ) as HTMLElement | null;
      // Page
      if (page) {
        gsap.set(page, { opacity: 0 });
      }
      // Banner Button
      if (bannerButton) {
        gsap.set(bannerButton, { opacity: 0, y: 20 });
      }
      // Split Title 1
      let splitTitle1;
      if (bannerTitle1) {
        splitTitle1 = TextSplitLines(bannerTitle1);
        gsap.set(bannerTitle1, {
          perspective: 400,
        });
        gsap.set(splitTitle1, {
          yPercent: 150,
          opacity: 0,
        });
      }
      // Split Title 2
      let splitTitle2;
      if (bannerTitle2) {
        splitTitle2 = TitleSplitChars(bannerTitle2);
        gsap.set(bannerTitle2, {
          perspective: 400,
        });
        gsap.set(splitTitle2, {
          yPercent: 150,
          opacity: 0,
        });
      }
      // Split Title 3
      let splitTitle3;
      if (bannerTitle3) {
        splitTitle3 = TextSplitLines(bannerTitle3);
        gsap.set(bannerTitle3, {
          perspective: 400,
        });
        gsap.set(splitTitle3, {
          yPercent: 150,
          opacity: 0,
        });
      }
      // Split Content
      let splitContent;
      if (bannerContent) {
        splitContent = TextSplitLines(bannerContent);
        gsap.set(bannerContent, {
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
            verticalSection?.resume();
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
        if (bannerTitle1 && splitTitle1) {
          tl.to(
            splitTitle1,
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
        if (bannerTitle2 && splitTitle2) {
          tl.to(
            splitTitle2,
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
        if (bannerTitle3 && splitTitle3) {
          tl.to(
            splitTitle3,
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
        if (bannerContent && splitContent) {
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
        if (bannerButton) {
          tl.to(
            bannerButton,
            {
              duration: 3,
              opacity: 1,
              y: 0,
              delay: 0,
              ease: "expo.inOut",
            },
            "-=3",
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
            "-=2",
          );
        }
        animations.push(tl);
      }
    });

    // Return
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

  // Container width
  //const [contWidth, setContWidth] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (!panel.current && !wrapper.current) return;
    if (
      typeof window !== "undefined" &&
      panel.current &&
      wrapper.current &&
      window.innerWidth > 1024 &&
      !isMobileOrTablet
    ) {
      // Overflow body
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 6,
          scrub: scurbScale,
          pin: true,
        },
      });
      timeline.to(wrapper.current, {
        x: () =>
          wrapper.current ? wrapper.current.offsetWidth - window.innerWidth : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current?.offsetTop,
          end: "+=" + (window.innerWidth * 6 - 500),
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

  // Page Content Animation
  useGSAP(() => {
    // Audio Button
    const audioButton = document.querySelector(
      "#audio-button",
    ) as HTMLButtonElement | null;
    if (audioButton) {
      gsap.to(audioButton, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth;
          },
          toggleActions: "restart pause play reverse",
        },
        autoAlpha: 1,
        y: 0,
        ease: "none",
        duration: 0.5,
        delay: 0,
      });
    }
    // Wish Button
    const wishButton = document.querySelector(
      "#wish-button",
    ) as HTMLDivElement | null;
    if (wishButton) {
      gsap.to(wishButton, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth > 1024
              ? window.innerWidth * 2.1
              : window.innerHeight * 2.6;
          },
          toggleActions: "restart pause play reverse",
        },
        opacity: 1,
        visibility: "visible",
        ease: "none",
        duration: 0.5,
        delay: 0,
      });
      // Click event
      const cycleSlider = document.getElementById(
        "cycle-preview",
      ) as HTMLDivElement | null;
      wishButton?.addEventListener("click", () => {
        gsap.to(window, {
          scrollTo:
            window.innerWidth > 1024
              ? window.innerWidth * 2
              : (cycleSlider?.getBoundingClientRect().top ?? 0) +
                window.scrollY -
                100,
          duration: 1,
          ease: "none",
        });
      });
    }
  }, [isAllAnimationComplete]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete && !isMobileOrTablet) {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      verticalSection?.resume();
    } else {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      verticalSection?.pause();
    }
  }, [isAllAnimationComplete, isMobileOrTablet, verticalSection]);

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

  if (!homePageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">ישיבת חברון כנסת ישראל</h1>
          <p className="text-gray-600">
            The requested homepage could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    homePageData && (
      <main ref={page} id="page" dir="ltr" className="main relative z-10">
        <div
          ref={panel}
          id="panel-wrapper"
          className="w-screen lg:h-screen flex items-end justify-end"
        >
          <div
            ref={wrapper}
            id="section-wrapper"
            className={`section-wrapp block lg:flex lg:flex-nowrap lg:flex-row-reverse w-full lg:w-[510vw] lg:h-screen`}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-screen w-screen h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeBanner
                animated={isAllAnimationComplete}
                extraClass={
                  "panel-section w-full lg:min-w-screen lg:w-screen min-h-screen lg:h-screen cursor-pointer"
                }
                panel={panel}
                bannerData={homePageData?.acf?.banner_section}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full lg:min-w-[50vw] lg:w-[50vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <IntroSection
                animWidthText={0.4}
                extraClass={"panel-section w-full lg:min-w-[50vw] lg:w-[50vw]"}
                introData={homePageData?.acf?.intro_section}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full lg:min-w-[70vw] lg:w-[70vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection1
                animWidthPost={1}
                animWidthSlider={1.4}
                extraClass={"panel-section w-full lg:min-w-[70vw] lg:w-[70vw]"}
                panel={panel}
                sectionData={homePageData?.acf?.home_section_1}
                postsData={postsData}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-screen w-screen h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection2
                animWidthImage={2.2}
                animWidthText={2.7}
                extraClass={"panel-section min-w-screen w-screen bg-black"}
                sectionData={homePageData?.acf?.home_section_2}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full lg:min-w-[90vw] lg:w-[90vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection3
                animWidthImage={3.6}
                animWidthText={3.9}
                extraClass={"panel-section w-full lg:min-w-[90vw] lg:w-[90vw]"}
                sectionData={homePageData?.acf?.home_section_3}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-screen w-screen h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection4
                animWidth={5}
                extraClass={"panel-section min-w-screen w-screen"}
                sectionData={homePageData?.acf?.home_section_4}
              />
            </Suspense>
          </div>
        </div>
      </main>
    )
  );
}
