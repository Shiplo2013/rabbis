"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";

import ConferenceContentSection from "../../components/alumni-conference/ConferenceContentSection";
import Introduction from "../../components/cycle-pictures/Introduction";
import GetRightPosition from "../../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ImageOrientation = "portrait" | "landscape";

const getImageOrientation = (item: any): ImageOrientation | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  if (item?.size === "portrait" || item?.size === "landscape") {
    return item.size;
  }

  const width = Number(item?.width ?? item?.media_details?.width);
  const height = Number(item?.height ?? item?.media_details?.height);

  if (!Number.isFinite(width) || !Number.isFinite(height) || height === 0) {
    return null;
  }

  return width >= height ? "landscape" : "portrait";
};

interface ConferenceScriptProviderProps {
  data: any;
}

export default function ConferenceScriptProvider({
  data,
}: ConferenceScriptProviderProps) {
  // Selectors
  const [alumniConferenceData, setAlumniConferenceData] = useState<null | any>(
    null,
  );
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [footerData, setFooterData] = useState<any | null>(null);
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

  const galleryImageSizes = useMemo<ImageOrientation[]>(() => {
    const gallery = Array.isArray(alumniConferenceData?.acf?.gallery)
      ? alumniConferenceData.acf.gallery
      : Array.isArray(alumniConferenceData?.acf?.image_gallery)
        ? alumniConferenceData.acf.image_gallery
        : [];

    const orientations: Array<ImageOrientation | null> =
      gallery.map(getImageOrientation);

    return orientations.filter(
      (size: ImageOrientation | null): size is ImageOrientation =>
        Boolean(size),
    );
  }, [alumniConferenceData]);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided to Alumni Conference.");
      return;
    }
    setAlumniConferenceData(data);
  }, [data]);

  useEffect(() => {
    if (!alumniConferenceData) {
      return;
    }

    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [alumniConferenceData, animationPlayed]);

  // Update Section Width on Data Change
  useEffect(() => {
    if (!alumniConferenceData) {
      return;
    }

    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      let countPostWidth = 0;

      galleryImageSizes.forEach((size) => {
        if (size === "landscape") {
          countPostWidth += 39.4;
        } else if (size === "portrait") {
          countPostWidth += 26.56;
        }
      });

      const newSectionWidth = countPostWidth + 18.5 + 9.89 + 42.5;

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth + 100);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [alumniConferenceData, pageDataFetched, galleryImageSizes]);

  // Page Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    let cleanupPageContentAnimation: (() => void) | undefined;
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      cleanupPageContentAnimation = setPageContentAnimation();
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
      const progressSetter = progress
        ? gsap.quickSetter(progress, "width", "%")
        : null;
      const waveOpacitySetter = waveLine
        ? gsap.quickSetter(waveLine, "opacity")
        : null;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerWidth * (containerWidth / 100),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            if (progressSetter) {
              progressSetter(100 * self.progress);
            }
            if (waveOpacitySetter) {
              waveOpacitySetter(self.progress > 0.97 ? 0 : 1);
            }
          },
        },
      });
      if (wrapper.current) {
        timeline.to(wrapper.current, {
          x: () =>
            wrapper.current
              ? wrapper.current.offsetWidth - window.innerWidth
              : 0,
          ease: "none",
          scrollTrigger: {
            trigger: panel.current,
            start: panel.current?.offsetTop,
            end: "+=" + (window.innerWidth * (containerWidth / 100) - 500),
            scrub: scurbScale,
          },
        });
      }
      animations.push(timeline);
    }
    // Return
    return () => {
      cleanupPageContentAnimation?.();
      animations.forEach((anim) => anim.kill());
    };
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLDivElement | null;
        const headerLeft = document.querySelector(".header-left");
        const headerRight = document.querySelector(".header-right");
        const rabbisContent = document.querySelectorAll(".rabbis-section");
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
        if (userVisit === "true" && animationPlayed && pageDataFetched) {
          // Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Set Animation Played to true
              setIsAllAnimationComplete(true);
              rabbisContent?.forEach((section) => {
                section.classList.add("opacity-100");
              });
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
          animations.push(tl);
        }
      });
    }
    // Return
    return () => {
      animations.forEach((anim) => anim.kill());
    };
  }, [pathname, pageDataFetched]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && panel.current && wrapper.current) {
      // Page Content Animation
      const conferenceRef = main.current?.querySelector(".conference-content");
      const conferenceContent = conferenceRef?.querySelectorAll(
        ".conference-content-wrapper>p",
      );
      const imageGallery = main.current?.querySelector(".conference-gallery");
      const GalleryImages = main.current?.querySelectorAll(
        ".conference-gallery .single-gallery",
      );

      // Animations
      if (conferenceRef) {
        const conferenceAnim = gsap.from(conferenceRef, {
          xPercent: -50,
          opacity: 0,
          ease: "slow(0.1,1,false)",
          duration: 1.5,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return window.innerWidth * 0.3;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(conferenceAnim);
      }
      // Image Gallery Animation
      if (imageGallery) {
        const galleryAnim = gsap.from(imageGallery, {
          opacity: 0,
          ease: "slow(0.1,1,false)",
          duration: 1.5,
          delay: 0,
          scrollTrigger: {
            start: () => {
              return GetRightPosition(imageGallery) - window.innerWidth * 0.8;
            },
            toggleActions: "restart pause resume reverse",
          },
        });
        animations.push(galleryAnim);
      }
      // Text
      document.fonts.ready.then(() => {
        // Section Content
        let splitContent;
        if (conferenceContent) {
          splitContent = BigTitleSplitLines(conferenceContent);
          gsap.set(conferenceContent, {
            perspective: 400,
          });
          gsap.set(splitContent, {
            yPercent: 150,
            opacity: 0,
          });
          const splitContentAnim = gsap.to(splitContent, {
            yPercent: 0,
            opacity: 1,
            duration: 3,
            delay: -1,
            stagger: 0.025,
            ease: "expo.inOut",
            scrollTrigger: {
              start: () => {
                return window.innerWidth * 0.3;
              },
              toggleActions: "restart pause resume reverse",
            },
          });
          animations.push(splitContentAnim);
        }
      });
      // Contents
      if (GalleryImages) {
        // Gallery Image Animation
        GalleryImages.forEach((item, index) => {
          // Custom Content Item
          if (item) {
            // Item BG Animation
            const image = item.querySelector(".single-gallery-image");
            if (image) {
              // Banner Background
              gsap.set(image, { scale: 1.2, x: "10vw" });
              const imageAnim = gsap.to(image, {
                x: "-10vw",
                ease: "none",
                scrollTrigger: {
                  trigger: image,
                  start: () => {
                    return GetRightPosition(image) - window.innerWidth * 0.5;
                  },
                  end: () => {
                    return "+=" + window.innerWidth * 2.5;
                  },
                  scrub: 2,
                },
              });
              animations.push(imageAnim);
            }
          }
        });
      }
    }

    // Return
    return () => {
      animations.forEach((anim) => anim.kill());
    };
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

  if (!alumniConferenceData) {
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
    alumniConferenceData && (
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
            <Introduction
              animated={isAllAnimationComplete}
              animationStatus={isAllAnimationComplete}
              bgImage={IntroBG}
              bgOverlay={""}
              data={{
                title: alumniConferenceData?.acf?.intro_title,
                content: "",
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
            <ConferenceContentSection
              extraClass={`min-w-[${sectionWidth}vw] w-[${sectionWidth}vw] h-screen panel-section will-change-transform py-[5vw] px-[9.25vw]`}
              animWidthText={1}
              sectionData={{
                gallery: alumniConferenceData?.acf?.gallery,
                sectionText: alumniConferenceData?.content?.rendered,
                videos: alumniConferenceData?.acf?.videos,
              }}
              galleryImageSizes={galleryImageSizes}
            />
          </div>
        </div>
      </main>
    )
  );
}
