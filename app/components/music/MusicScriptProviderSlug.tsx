"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Introduction from "../../components/music/Introduction";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";
import MirrorsSection from "./MirrorsSection";
import MusicCategoryList from "./MusicCategoryList";
import TerribleDaysSection from "./TerribleDaysSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function MusicScriptProvider({ data }: { data: any }) {
  // Selectors
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    isLoading,
    setIsLoading,
    animationPlayed,
    setAnimationPlayed,
    musicPageData,
    setMusicPageData,
  } = useAppState();
  // Router Path
  const pathname = usePathname();

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    if (!musicPageData?.musicPage?.acf) {
      setMusicPageData({
        musicPage: data.pageData,
        holidayPosts: data.postsData,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!musicPageData?.musicPage?.acf) {
      return;
    }
    setPageDataFetched(true);
    setIsLoading(false);
  }, [musicPageData]);

  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] =
    useState<boolean>(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Audio Player States
  const {
    audioPopup,
    setAudioPopup,
    activeMusicItem,
    setActiveMusicItem,
    activeMusicFolder,
    setActiveMusicFolder,
    activeMusicTab,
    setActiveMusicTab,
  } = useAppState();

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

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
      waveLine?.classList.remove("hidden");
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * 6,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
          end: "+=" + (window.innerWidth * 6 - window.innerWidth * 2.5),
          scrub: scurbScale,
          invalidateOnRefresh: true,
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
  }, [pageDataFetched, isAllAnimationComplete, pathname]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      document.fonts.ready.then(() => {
        // Selectors
        const page = document.getElementById(
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
        );
        const turntableDisk = main.current?.querySelector(
          ".first-intro .turntable .disk",
        );
        const turntableHead = main.current?.querySelector(
          ".first-intro .turntable .head",
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
        // Set localStorage variable
        const userVisit = localStorage.getItem("hasVisited");
        if (userVisit === "true") {
          // Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Turntable animation
              if (turntableHead) {
                gsap.to(turntableHead, {
                  rotate: "0deg",
                  ease: "none",
                  duration: 0.5,
                  delay: 0,
                });
              }
              if (turntableDisk) {
                gsap.to(turntableDisk, {
                  rotate: "360deg",
                  ease: "none",
                  duration: 4,
                  delay: 0.5,
                  repeat: -1,
                });
              }
              // Set Animation Played to true
              setIsAllAnimationComplete(true);
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
          // Wave Line Animation
          const waveLine = document.getElementById(
            "wave-mask",
          ) as HTMLDivElement | null;
          if (waveLine) {
            tl.to(
              waveLine,
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
  }, [pageDataFetched, isAllAnimationComplete, pathname]);

  // Set Page Content Animation
  useGSAP(() => {
    // Page Content Animation
    const turnTable = main.current?.querySelector(".first-intro .turntable");
    const musicCatList = main.current?.querySelector(".music-cat-wrapper");

    // Animations
    if (turnTable) {
      gsap.to(turnTable, {
        xPercent: -100,
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
    // Animations
    if (musicCatList) {
      gsap.set(musicCatList, {
        xPercent: -100,
        opacity: 0,
      });
      gsap.to(musicCatList, {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "easeInOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 0.2;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }

    // Hover Image Effect
    const hoverImage = document.getElementById(
      "hover-image",
    ) as HTMLDivElement | null;
    if (hoverImage) {
      const images = hoverImage.querySelectorAll(".image-wrapper");
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      gsap.set(images, {
        opacity: 0,
      });

      let xTo = gsap.quickTo(hoverImage, "x", {
          duration: 0.6,
          ease: "power3",
        }),
        yTo = gsap.quickTo(hoverImage, "y", {
          duration: 0.6,
          ease: "power3",
        });

      let rotateTo = gsap.quickTo(hoverImage, "rotation", {
        duration: 0.5,
        ease: "power2.out",
      });
      const handleMouseMove = (e: MouseEvent) => {
        let prevMouse = { x: 0, y: 0 };
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        let speedX = mouse.x - prevMouse.x;
        let rotation = speedX * 0.2;
        xTo(e.clientX);
        yTo(e.clientY);
        rotateTo(rotation);
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [pageDataFetched, isAllAnimationComplete, pathname]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      verticalSection?.resume();
    } else {
      verticalSection?.pause();
    }
    return () => {
      //document.body.style.overflow = "auto";
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

  return (
    musicPageData && (
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
            className={`section-wrapp flex flex-nowrap flex-row-reverse w-[452vw] h-screen items-center will-change-transform`}
          >
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              data={musicPageData?.musicPage?.acf?.introduction}
              extraClass={
                "first-intro panel-section will-change-transform min-w-[75vw] w-[75vw]"
              }
            />
            <MusicCategoryList
              extraClass="music-categories panel-section will-change-transform min-w-[70vw] w-[70vw]"
              animWidthText={0}
              data={musicPageData?.holidayPosts}
              activeMusicItem={activeMusicItem}
              setActiveMusicItem={setActiveMusicItem}
            />
            <TerribleDaysSection
              extraClass="terrieble-content panel-section will-change-transform min-w-[222vw] w-[222vw]"
              animWidthText={0.5}
              data={musicPageData?.holidayPosts[activeMusicItem]}
              setAudioPopup={setAudioPopup}
              activeMusicItem={activeMusicItem}
              setActiveMusicItem={setActiveMusicItem}
              setActiveMusicFolder={setActiveMusicFolder}
              panel={panel}
              activeTab={activeMusicTab}
              setActiveTab={setActiveMusicTab}
            />
            <MirrorsSection
              extraClass="mirrors-content panel-section will-change-transform min-w-[85vw] w-[85vw]"
              animWidthText={3.8}
              data={
                musicPageData?.holidayPosts[activeMusicItem]?.acf
                  ?.mirrors_section
              }
              nextPost={
                activeMusicItem + 1 < musicPageData?.holidayPosts?.length
                  ? musicPageData?.holidayPosts[activeMusicItem + 1]
                  : musicPageData?.holidayPosts[0]
              }
            />
          </div>
        </div>
      </main>
    )
  );
}
