"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Wave from "../../assets/images/wave.svg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import Image from "next/image";
import LoadingEffect from "../../components/LoadingEffect";
import Introduction from "../../components/music/Introduction";
import MirrorAudioPlayer from "../../components/music/MirrorAudioPlayer";
import MirrorsSection from "../../components/music/MirrorsSection";
import MusicCategoryList from "../../components/music/MusicCategoryList";
import TerribleDaysSection from "../../components/music/TerribleDaysSection";
import CreateShimmerDataURL from "../../ui/CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Selectors
  const [musicPageData, setMusicPageData] = useState<null | any>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadMusicPageData = async () => {
      try {
        const response = await fetch("/api/the-circle-of-the-year", {
          cache: "no-store",
        });
        const response2 = await fetch("/api/the-circle-of-the-year/posts", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load music page data.");
        }

        if (!response2.ok) {
          throw new Error("Failed to load holiday posts data.");
        }

        const data = await response.json();
        const data2 = await response2.json();

        if (isMounted) {
          setMusicPageData({ musicPage: data, holidayPosts: data2 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadMusicPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!musicPageData?.musicPage?.acf) {
      return;
    }
    setPageDataFetched(true);

    musicPageData?.holidayPosts?.posts.map(
      (item: any, index: number) =>
        decodeURIComponent(item.slug) === decodeURIComponent(slug) &&
        setActiveMusicItem(index),
    );
  }, [musicPageData]);

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [activeMusicItem, setActiveMusicItem] = useState(0);
  const [activeMusicFolder, setActiveMusicFolder] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Audio Player
  const [audioPopup, setAudioPopup] = useState(false);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const hoverImage = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      // Overflow body
      const scurbScale = 2;
      let waveVisible = true;

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
            setUpdateProgress(self.progress);
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
  }, [pathname, pageDataFetched]);

  // Progress Bar Animation
  useGSAP(
    () => {
      if (waveLine.current && waveMask.current) {
        let waveVisible = true;
        if (progress.current) {
          gsap.set(progress.current, {
            width: `${100 * updateProgress}%`,
          });
        }
        const shouldShowWave = updateProgress <= 0.97;
        if (waveLine.current && waveVisible !== shouldShowWave) {
          waveVisible = shouldShowWave;
          gsap.set(waveLine.current, {
            opacity: shouldShowWave ? 1 : 0,
          });
        }
      }
    },
    { scope: progress, dependencies: [updateProgress] },
  );

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      document.fonts.ready.then(() => {
        // Selectors
        const headerLeft = main.current?.querySelector(".header-left");
        const headerRight = main.current?.querySelector(".header-right");
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
  }, [pageDataFetched]);

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
    if (hoverImage.current) {
      const images = hoverImage.current.querySelectorAll(".image-wrapper");
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const mouse = { x: pos.x, y: pos.y };
      gsap.set(images, {
        opacity: 0,
      });

      let xTo = gsap.quickTo(hoverImage.current, "x", {
          duration: 0.6,
          ease: "power3",
        }),
        yTo = gsap.quickTo(hoverImage.current, "y", {
          duration: 0.6,
          ease: "power3",
        });

      let rotateTo = gsap.quickTo(hoverImage.current, "rotation", {
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
  }, [pageDataFetched]);

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

  // Page default
  useEffect(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
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
    musicPageData && (
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
                  data={musicPageData?.holidayPosts?.posts}
                  activeMusicItem={activeMusicItem}
                  setActiveMusicItem={setActiveMusicItem}
                />
                <TerribleDaysSection
                  extraClass="terrieble-content panel-section will-change-transform min-w-[222vw] w-[222vw]"
                  animWidthText={0.5}
                  data={musicPageData?.holidayPosts?.posts[activeMusicItem]}
                  setAudioPopup={setAudioPopup}
                  activeMusicItem={activeMusicItem}
                  setActiveMusicItem={setActiveMusicItem}
                  setActiveMusicFolder={setActiveMusicFolder}
                  panel={panel}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <MirrorsSection
                  extraClass="mirrors-content panel-section will-change-transform min-w-[85vw] w-[85vw]"
                  animWidthText={3.8}
                  data={
                    musicPageData?.holidayPosts?.posts[activeMusicItem]?.acf
                      ?.mirrors_section
                  }
                  nextPost={
                    activeMusicItem + 1 <
                    musicPageData?.holidayPosts?.posts?.length
                      ? musicPageData?.holidayPosts?.posts[activeMusicItem + 1]
                      : musicPageData?.holidayPosts?.posts[0]
                  }
                />
              </div>
            </div>
          </main>
          <Footer className={"relative z-20"} />
        </SmoothWrapper>
        <div
          ref={hoverImage}
          id="hover-image"
          className="fixed top-0 left-0 z-999 w-29 h-43.25 -ml-14.5 -mt-21.5 overflow-hidden opacity-0 invisible cursor-none pointer-events-none"
        >
          {musicPageData?.holidayPosts?.posts?.map(
            (item: any, index: number) => (
              <div
                key={index}
                className={`image-wrapper hover-image-${index} w-29 h-43.25 absolute top-0 left-0`}
              >
                <Image
                  className="bg-image w-full object-cover object-center h-full"
                  src={
                    item?.acf?.introduction?.album_image_1?.url ||
                    item?.acf?.introduction?.album_image_1?.src
                  }
                  width="116"
                  height="173"
                  blurDataURL={CreateShimmerDataURL(116, 173)}
                  placeholder={"blur"}
                  loading="lazy"
                  alt={item?.acf?.introduction?.album_title || "Album Image"}
                />
              </div>
            ),
          )}
        </div>
        <MirrorAudioPlayer
          extraClass="w-screen"
          animWidthText={0}
          audioPopup={audioPopup}
          setAudioPopup={setAudioPopup}
          data={{
            introduction:
              musicPageData?.holidayPosts?.posts[activeMusicItem]?.acf
                ?.introduction,
            album:
              musicPageData?.holidayPosts?.posts[activeMusicItem]?.acf
                ?.music_albums?.albums[activeMusicFolder],
            allAlbums:
              musicPageData?.holidayPosts?.posts[activeMusicItem]?.acf
                ?.music_albums?.albums,
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeMusicFolder={activeMusicFolder}
          setActiveMusicFolder={setActiveMusicFolder}
        />
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
      </div>
    )
  );
}
