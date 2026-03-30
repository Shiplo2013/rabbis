"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CursorFollow from "./components/CursorFollow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingEffect from "./components/LoadingEffect";
import HomeBanner from "./components/home/HomeBanner";
import HomeSection1 from "./components/home/HomeSection1";
import HomeSection2 from "./components/home/HomeSection2";
import HomeSection3 from "./components/home/HomeSection3";
import HomeSection4 from "./components/home/HomeSection4";
import IntroSection from "./components/home/IntroSection";
import AudioPlayer from "./ui/AudioPlayer";
import SlidingArrow from "./ui/SlidingArrow";
import SmoothWrapper from "./ui/SmoothWrapper";
import TextSplitLines from "./ui/TextSplitLines";
import TitleSplitChars from "./ui/TitleSplitChars";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "./ui/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function Home() {
  // Selector
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  // Audo Player
  const [audioLink, setAudioLink] = useState(
    "http://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3",
  );
  const audio = useRef<HTMLAudioElement>(null);
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Router Path
  const pathname = usePathname();

  // Load Page
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true") {
        // Banner Title 1
        const bannerTitle1 = main.current?.querySelector(
          ".home-banner .banner-title1",
        );
        // Banner Title 2
        const bannerTitle2 = main.current?.querySelector(
          ".home-banner .banner-title2",
        );
        // Banner Title 3
        const bannerTitle3 = main.current?.querySelector(
          ".home-banner .banner-title3",
        );
        // Banner Content
        const bannerContent = main.current?.querySelector(
          ".home-banner .banner-content",
        );
        // Banner Background Overlay
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".home-banner .banner-background-wrapper .banner-bg-mask",
        );
        // Banner Button
        const bannerButton = main.current?.querySelector(
          ".home-banner .banner-button",
        );
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
        // Timeline
        const tl = gsap.timeline({
          onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
          },
        });
        tl.to(main.current, {
          opacity: 1,
          ease: "none",
          duration: 0.5,
          delay: 0,
        })
          .to(page.current, {
            opacity: 1,
            ease: "none",
            duration: 0,
            delay: 0,
          })
          .to(".header-left", {
            opacity: 1,
            ease: "none",
            duration: 1,
          })
          .to(
            ".header-right",
            {
              opacity: 1,
              ease: "none",
              duration: 1,
            },
            "-=1",
          );
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
      }
    });
  }, [animationPlayed]);

  // Container width
  //const [contWidth, setContWidth] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerHeight * 6,
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
          end: "+=" + (window.innerHeight * 6 - 500),
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

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      verticalSection?.pause();
    } else {
      verticalSection?.play();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Play Pause State
  const [isPlaying, setIsPlaying] = useState(false);
  function isAudioPlaying(value: { paused: any } | null) {
    return value ? !value.paused : false;
  }
  const togglePlayPause = () => {
    if (isAudioPlaying(audio.current)) {
      gsap.to(audio.current, {
        volume: 0,
        duration: 2,
        onComplete: () => {
          audio.current?.pause();
        },
      });
      setIsPlaying(false);
    } else {
      gsap.to(audio.current, { volume: 1, duration: 2 });
      audio.current?.play();
      setIsPlaying(true);
    }
  };
  // On Video End
  useEffect(() => {
    if (audio.current) {
      audio.current.addEventListener(
        "ended",
        () => {
          audio.current!.currentTime = 0;
          audio.current!.play();
        },
        false,
      );
    }
  }, [audio.current]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
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
          className="main relative z-10 opacity-0"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[510vw] h-screen will-change-transform`}
            >
              <HomeBanner
                audioControl={togglePlayPause}
                animated={isAllAnimationComplete}
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen cursor-pointer"
                }
                panel={panel}
              />
              <IntroSection
                animWidthText={0.2}
                extraClass={
                  "panel-section will-change-transform min-w-[50vw] w-[50vw]"
                }
              />
              <HomeSection1
                animWidthPost={0.6}
                animWidthSlider={0.7}
                extraClass={
                  "panel-section will-change-transform min-w-[70vw] w-[70vw]"
                }
                panel={panel}
              />
              <HomeSection2
                animWidthImage={1.1}
                animWidthText={1.3}
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen bg-black"
                }
              />
              <HomeSection3
                animWidthImage={1.7}
                animWidthText={1.9}
                extraClass={
                  "panel-section will-change-transform min-w-[90vw] w-[90vw]"
                }
              />
              <HomeSection4
                animWidth={2.5}
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen"
                }
              />
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <SlidingArrow />
      <CursorFollow isPlaying={isPlaying} />
      <AudioPlayer audioRef={audio} src={audioLink} />
    </div>
  );
}
