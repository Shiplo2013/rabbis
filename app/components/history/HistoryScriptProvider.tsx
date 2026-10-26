"use client";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  default as arrowSectionBG,
  default as arrowSectionBG2,
} from "../../assets/images/arrow-section-bg.jpg";
import sectionImage from "../../assets/images/arrow-section-image.jpg";
import arrowSectionImage from "../../assets/images/arrow-section-image2.jpg";
import introBG5 from "../../assets/images/intro-bg-5.jpg";
import introBG6 from "../../assets/images/intro-bg-6.jpg";
import introBG7 from "../../assets/images/intro-bg-7.jpg";
import IntroBG2 from "../../assets/images/intro-bg.jpg";
import IntroBGoverlay from "../../assets/images/intro-bg2.png";
import IntroBG from "../../assets/images/introduction-bg.jpg";
import NewsSectionBG from "../../assets/images/new-section-bg2.jpg";
import timelineBG from "../../assets/images/timeline-bg.jpg";
import { useAppState } from "../../components/AppContext";
import ArrowSliderSection from "../../components/history/ArrowSliderSection";
import ContentSection2 from "../../components/history/ContentSection2";
import EvidenceOfPeriod from "../../components/history/EvidenceOfPeriod";
import HistoryQuoteSection from "../../components/history/HistoryQuoteSection";
import HistoryQuoteSection2 from "../../components/history/HistoryQuoteSection2";
import ImageOnlySection from "../../components/history/ImageOnlySection";
import ImageOnlySection2 from "../../components/history/ImageOnlySection2";
import ImageWithTextSection from "../../components/history/ImageWithTextSection";
import Introduction from "../../components/history/Introduction";
import Introduction2 from "../../components/history/Introduction2";
import IntroductionContent from "../../components/history/IntroductionContent";
import LambOfferingSection from "../../components/history/LambOfferingSection";
import MarkOfTheRoad from "../../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../../components/history/MarkOfTheRoad2";
import MarkOfTheRoad3 from "../../components/history/MarkOfTheRoad3";
import MarkOfTheRoad4 from "../../components/history/MarkOfTheRoad4";
import MoveToJerusalem from "../../components/history/MoveToJerusalem";
import NewsPapperSection from "../../components/history/NewsPapperSection";
import OnlyImageSection from "../../components/history/OnlyImageSection";
import OnlyParallaxImageSection from "../../components/history/OnlyParallaxImageSection";
import OnlyTextSection from "../../components/history/OnlyTextSection";
import OnlyTextSection2 from "../../components/history/OnlyTextSection2";
import RabbisPeriodSection from "../../components/history/RabbisPeriodSection";
import RabbisTimeline from "../../components/history/RabbisTimeline";
import RabbisTimeline2 from "../../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../../components/history/RabbisTimeline3";
import RabbisTimeline4 from "../../components/history/RabbisTimeline4";
import SingleVideoSection from "../../components/history/SingleVideoSection";
import TitleSection from "../../components/history/TitleSection";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import SingleImageSection from "../../ui/SingleImageSection";
import TextSplitLines from "../../ui/TextSplitLines";
import TitleSplitChars from "../../ui/TitleSplitChars";
import {
  getTimeline1Data,
  getTimeline2Data,
  getTimeline3Data,
  getTimeline4Data,
  getTimeline5Data,
  getTimeline6Data,
} from "./timelineAcfData";
import {
  areAllRefsUnmounted,
  createPinnedTimelineSection,
} from "./timelineScrollAnimations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function HistoryScriptProvider({
  data,
}: {
  data: { pageData: any; rabbisData: any[] };
}) {
  const CHRONICLES_CACHE_KEY = "chronicles-page-cache-v1";
  const CHRONICLES_CACHE_TTL_MS = 60 * 1000;

  // Router Path
  const pathname = usePathname();
  const [chroniclesPageData, setChroniclesPageData] = useState<any | []>(null);
  // pageDataFetched/error are pure derivations of data/chroniclesPageData,
  // so they are computed during render instead of mirrored into state via
  // an effect that "adjusts" them on every data change.
  const pageDataFetched = !!chroniclesPageData;
  const error = !data ? "No data provided to History." : null;
  const [rabbisPostsData1, setRabbisPostsData1] = useState<any | []>([]);
  const [rabbisPostsData2, setRabbisPostsData2] = useState<any | []>([]);
  const [rabbisPostsData3, setRabbisPostsData3] = useState<any | []>([]);
  const [rabbisPostsData4, setRabbisPostsData4] = useState<any | []>([]);
  const [rabbisPostsData5, setRabbisPostsData5] = useState<any | []>([]);
  // Rabbis Menu State
  const {
    isVideoPopupOpen,
    setIsVideoPopupOpen,
    animationPlayed,
    setAnimationPlayed,
    isLoading,
    setIsLoading,
    listOfRabbis,
    setListOfRabbis,
  } = useAppState();

  // Static Data Fallback
  const staticData = {};

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      return;
    }
    // let isMounted = true;

    // const controller = new AbortController();

    // const cacheKey = `${CHRONICLES_CACHE_KEY}:${pathname}`;

    // const getCachedData = () => {
    //   if (typeof window === "undefined") return null;

    //   try {
    //     const rawCache = localStorage.getItem(cacheKey);
    //     if (!rawCache) return null;

    //     const parsedCache = JSON.parse(rawCache) as {
    //       cachedAt: number;
    //       chroniclesPageData: any;
    //       rabbisPostsData1: any;
    //       rabbisPostsData2: any;
    //       rabbisPostsData3: any;
    //       rabbisPostsData4: any;
    //       rabbisPostsData5: any;
    //     };

    //     if (
    //       !parsedCache ||
    //       typeof parsedCache.cachedAt !== "number" ||
    //       Date.now() - parsedCache.cachedAt > CHRONICLES_CACHE_TTL_MS
    //     ) {
    //       localStorage.removeItem(cacheKey);
    //       return null;
    //     }

    //     return parsedCache;
    //   } catch {
    //     localStorage.removeItem(cacheKey);
    //     return null;
    //   }
    // };

    // const setCachedData = (payload: {
    //   chroniclesPageData: any;
    //   rabbisPostsData1: any;
    //   rabbisPostsData2: any;
    //   rabbisPostsData3: any;
    //   rabbisPostsData4: any;
    //   rabbisPostsData5: any;
    // }) => {
    //   if (typeof window === "undefined") return;

    //   try {
    //     localStorage.setItem(
    //       cacheKey,
    //       JSON.stringify({
    //         ...payload,
    //         cachedAt: Date.now(),
    //       }),
    //     );
    //   } catch {
    //     // Ignore localStorage write errors (private mode / quota exceeded)
    //   }
    // };

    // const cachedData = getCachedData();
    // if (cachedData && isMounted) {
    //   setChroniclesPageData(cachedData.chroniclesPageData);
    //   setRabbisPostsData1(cachedData.rabbisPostsData1 || []);
    //   setRabbisPostsData2(cachedData.rabbisPostsData2 || []);
    //   setRabbisPostsData3(cachedData.rabbisPostsData3 || []);
    //   setRabbisPostsData4(cachedData.rabbisPostsData4 || []);
    //   setRabbisPostsData5(cachedData.rabbisPostsData5 || []);
    //   return () => {
    //     isMounted = false;
    //     controller.abort();
    //   };
    // }
    // setCachedData({
    //   chroniclesPageData: data.pageData,
    //   rabbisPostsData1: data.rabbisData[0],
    //   rabbisPostsData2: data.rabbisData[1],
    //   rabbisPostsData3: data.rabbisData[2],
    //   rabbisPostsData4: data.rabbisData[3],
    //   rabbisPostsData5: data.rabbisData[4],
    // });
    // //console.log("Data cached for chronicles page:", data);
    // setChroniclesPageData(data.pageData);
    // setRabbisPostsData1(data.rabbisData[0]);
    // setRabbisPostsData2(data.rabbisData[1]);
    // setRabbisPostsData3(data.rabbisData[2]);
    // setRabbisPostsData4(data.rabbisData[3]);
    // setRabbisPostsData5(data.rabbisData[4]);
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };

    setChroniclesPageData(data.pageData);
    setRabbisPostsData1(data.rabbisData[0]);
    setRabbisPostsData2(data.rabbisData[1]);
    setRabbisPostsData3(data.rabbisData[2]);
    setRabbisPostsData4(data.rabbisData[3]);
    setRabbisPostsData5(data.rabbisData[4]);
    // isLoading is shared context state; its value derives from data's
    // presence (always false here, since this branch only runs once data
    // is truthy) rather than an unrelated hardcoded literal.
    setIsLoading(!data);
  }, [data, setIsLoading]);

  // Page Selectors
  const main = useRef<HTMLDivElement>(null);
  const timeline1Ref = useRef<HTMLDivElement>(null);
  const timeline2Ref = useRef<HTMLDivElement>(null);
  const timeline3Ref = useRef<HTMLDivElement>(null);
  const timeline4Ref = useRef<HTMLDivElement>(null);
  const timeline5Ref = useRef<HTMLDivElement>(null);
  const timeline6Ref = useRef<HTMLDivElement>(null);
  const panel1 = useRef<HTMLDivElement>(null);
  const wrapper1 = useRef<HTMLDivElement>(null);
  const panel2 = useRef<HTMLDivElement>(null);
  const wrapper2 = useRef<HTMLDivElement>(null);
  const panel3 = useRef<HTMLDivElement>(null);
  const wrapper3 = useRef<HTMLDivElement>(null);
  const panel4 = useRef<HTMLDivElement>(null);
  const wrapper4 = useRef<HTMLDivElement>(null);
  const panel5 = useRef<HTMLDivElement>(null);
  const wrapper5 = useRef<HTMLDivElement>(null);
  const panel6 = useRef<HTMLDivElement>(null);
  const wrapper6 = useRef<HTMLDivElement>(null);
  const isHistoryHidden = useRef(false);
  const isHeaderLeftHidden = useRef(false);

  // Resolved ACF data per panel (see timelineAcfData.ts): pulling the
  // `?.`/`||` resolution out of the component body below is what keeps
  // this component's own complexity low.
  const timeline1Data = getTimeline1Data(chroniclesPageData);
  const timeline2Data = getTimeline2Data(chroniclesPageData);
  const timeline3Data = getTimeline3Data(chroniclesPageData);
  const timeline4Data = getTimeline4Data(chroniclesPageData);
  const timeline5Data = getTimeline5Data(chroniclesPageData);
  const timeline6Data = getTimeline6Data(chroniclesPageData);

  // Page Data
  const IntroData1 = {
    title: timeline1Data.introductionTitle,
    subtitle: timeline1Data.introductionSubtitle,
    background: timeline1Data.introductionBackground,
    overlay: timeline1Data.introductionBackgroundOverlayImage,
  };
  const IntroData2 = {
    title: timeline2Data.introductionTitle,
    subtitle: timeline2Data.introductionSubtitle,
    background: timeline2Data.introductionBackground,
    overlay: timeline2Data.introductionBackgroundOverlayImage,
  };
  const IntroData3 = {
    title: timeline3Data.introductionTitle,
    subtitle: timeline3Data.introductionSubtitle,
    background: timeline3Data.introductionBackground,
    overlay: timeline3Data.introductionBackgroundOverlayImage,
  };
  const IntroContentData = {
    title: timeline3Data.introBannerTitle,
    subtitle: ``,
  };
  const IntroData4 = {
    title: timeline4Data.introductionTitle,
    subtitle: timeline4Data.introductionSubtitle,
    background: timeline4Data.introductionBackground,
    overlay: timeline4Data.introductionBackgroundOverlayImage,
  };
  const IntroData5 = {
    title: timeline5Data.introductionTitle,
    subtitle: timeline5Data.introductionSubtitle,
    background: timeline5Data.introductionBackground,
    overlay: timeline5Data.introductionBackgroundOverlayImage,
  };
  const IntroData6 = {
    title: timeline6Data.introductionTitle,
    subtitle: timeline6Data.introductionSubtitle,
    background: timeline6Data.introductionBackground,
    overlay: timeline6Data.introductionBackgroundOverlayImage,
  };
  const QuoteData = [
    {
      content: timeline1Data.quoteSection,
    },
  ];
  const QuoteData2 = [
    {
      content: timeline4Data.quoteSection,
    },
  ];
  const QuoteData3 = {
    content: timeline6Data.quoteSectionText,
  };

  //Arrow Slider Data
  const SliderData = {
    text1: timeline3Data.arrowSliderSectionArrowSliderSlide1,
    text2: timeline3Data.arrowSliderSectionArrowSliderSlide2,
    background: timeline3Data.arrowSliderSectionBackground,
    floatingImage: timeline3Data.arrowSliderSectionFloatingImage,
  };
  //Arrow Slider Data
  const SliderData2 = {
    text1: timeline5Data.arrowSliderSectionArrowSliderSlide1,
    text2: timeline5Data.arrowSliderSectionArrowSliderSlide2,
    background: timeline5Data.arrowSliderSectionBackground,
    floatingImage: timeline5Data.arrowSliderSectionFloatingImage1,
  };
  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section State
  const [timelinePeriod1, setTimelinePeriod1] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod2, setTimelinePeriod2] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod3, setTimelinePeriod3] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod4, setTimelinePeriod4] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod5, setTimelinePeriod5] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod6, setTimelinePeriod6] =
    useState<gsap.core.Timeline | null>(null);
  //const [timelineAdded, setTimelineAdded] = useState(false);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
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
      // Set Title
      const headingTitle = main.current?.querySelector(
        ".first-intro .intro-title",
      );
      // Subtitle
      const headingContent = main.current?.querySelector(
        ".first-intro .intro-content",
      );
      // Page Timeline
      const headingTitleSpan = headingTitle?.querySelector("span");
      const headingContentSpan = headingContent?.querySelector("span");
      const timeline = document.querySelector("#history-timeline");
      const history = document.querySelector("#history-timeline-progress");
      let splitTitle, splitContent;
      if (headingTitleSpan) {
        splitTitle = TitleSplitChars(headingTitleSpan);
        gsap.set(headingTitleSpan, {
          perspective: 400,
        });
        gsap.set(splitTitle, {
          yPercent: 150,
          opacity: 0,
        });
      }
      if (headingContentSpan) {
        splitContent = TextSplitLines(headingContentSpan);
        gsap.set(headingContentSpan, {
          perspective: 400,
        });
        gsap.set(splitContent, {
          yPercent: 150,
          opacity: 0,
        });
      }
      if (timeline) {
        gsap.set(history, { opacity: 1 });
        gsap.set(timeline, { yPercent: 100 });
      }
      // Set localStorage variable
      const userVisit = localStorage.getItem("hasVisited");
      if (userVisit === "true" && animationPlayed && pageDataFetched) {
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
        if (headingTitleSpan && splitTitle) {
          tl.to(
            splitTitle,
            {
              yPercent: 0,
              opacity: 1,
              duration: 3,
              delay: 0,
              stagger: 0.03,
              ease: "expo.inOut",
            },
            "-=1",
          );
        }
        if (headingContentSpan && splitContent) {
          tl.to(
            splitContent,
            {
              yPercent: 0,
              opacity: 1,
              duration: 3,
              delay: 0,
              stagger: 0.03,
              ease: "expo.inOut",
            },
            "-=2.5",
          );
        }
        if (timeline) {
          tl.to(
            timeline,
            {
              yPercent: 0,
              opacity: 1,
              delay: 0,
              duration: 3,
              ease: "expo.inOut",
            },
            "-=3",
          );
        }
        animations.push(tl);
      }
    });

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

  function toggleHeaderLeftOnScroll() {
    const headerLeft = document.querySelector("#header .header-left");
    if (!headerLeft) return;

    const shouldHide = window.scrollY > 200;
    if (shouldHide === isHeaderLeftHidden.current) return;
    isHeaderLeftHidden.current = shouldHide;

    gsap.to(headerLeft, {
      autoAlpha: shouldHide ? 0 : 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  // Page Section Animation
  useGSAP(() => {
    if (
      areAllRefsUnmounted([
        panel1,
        wrapper1,
        panel2,
        wrapper2,
        panel3,
        wrapper3,
        panel4,
        wrapper4,
        panel5,
        wrapper5,
        panel6,
        wrapper6,
      ])
    )
      return;
    //ScrollTrigger.normalizeScroll(true);
    let timeline1 = null;
    let timeline2 = null;
    let timeline3 = null;
    let timeline4 = null;
    let timeline5 = null;
    let timeline6 = null;
    if (
      typeof window !== "undefined" &&
      main.current &&
      window.innerWidth > 1024
    ) {
      const history = document.getElementById(
        "history-timeline-progress",
      ) as HTMLElement | null;
      const scurbScale = 2;

      // Timeline Section  1
      timeline1 = createPinnedTimelineSection({
        panelRef: panel1,
        wrapperRef: wrapper1,
        timelineSectionRef: timeline1Ref,
        widthMultiplier: 7.07,
        introClass: ".intro-1",
        introLineSelector: `.history-timeline .intro-1 .progress-line .border-line`,
        scrubScale: scurbScale,
      });
      setTimelinePeriod1(timeline1);
      // Timeline Section  2
      timeline2 = createPinnedTimelineSection({
        panelRef: panel2,
        wrapperRef: wrapper2,
        timelineSectionRef: timeline2Ref,
        widthMultiplier: 5.88,
        introClass: ".intro-2",
        introLineSelector: `.history-timeline .intro-2 .progress-line .border-line`,
        scrubScale: scurbScale,
      });
      setTimelinePeriod2(timeline2);
      // Timeline Section  3
      timeline3 = createPinnedTimelineSection({
        panelRef: panel3,
        wrapperRef: wrapper3,
        timelineSectionRef: timeline3Ref,
        widthMultiplier: 8.498,
        introClass: ".intro-3",
        introLineSelector: `.history-timeline .intro-3 .progress-line .border-line`,
        scrubScale: scurbScale,
      });
      setTimelinePeriod3(timeline3);
      // Timeline Section  4
      timeline4 = createPinnedTimelineSection({
        panelRef: panel4,
        wrapperRef: wrapper4,
        timelineSectionRef: timeline4Ref,
        widthMultiplier: 9.55,
        introClass: ".intro-4",
        introLineSelector: `.history-timeline .intro-4 .progress-line .border-line`,
        scrubScale: scurbScale,
      });
      setTimelinePeriod4(timeline4);
      // Timeline Section  5
      timeline5 = createPinnedTimelineSection({
        panelRef: panel5,
        wrapperRef: wrapper5,
        timelineSectionRef: timeline5Ref,
        widthMultiplier: 5.53,
        introClass: ".intro-5",
        introLineSelector: `.history-timeline .intro-5 .progress-line .border-line`,
        scrubScale: scurbScale,
      });
      setTimelinePeriod5(timeline5);
      // Timeline Section 6
      timeline6 = createPinnedTimelineSection({
        panelRef: panel6,
        wrapperRef: wrapper6,
        timelineSectionRef: timeline6Ref,
        widthMultiplier: 8.376,
        introClass: ".intro-6",
        scrubScale: scurbScale,
        historyElement: history,
        isHistoryHiddenRef: isHistoryHidden,
      });
      setTimelinePeriod6(timeline6);
    }
    //setTimelineAdded(true);
    // Return
    return () => {
      timelinePeriod1?.kill();
      timelinePeriod2?.kill();
      timelinePeriod3?.kill();
      timelinePeriod4?.kill();
      timelinePeriod5?.kill();
      timelinePeriod6?.kill();
    };
  }, [pathname, pageDataFetched]);

  // Timeline Refs OffsetTop
  const [offsetTopTimeline1, setOffsetTopTimeline1] = useState(0);
  const [offsetTopTimeline2, setOffsetTopTimeline2] = useState(0);
  const [offsetTopTimeline3, setOffsetTopTimeline3] = useState(0);
  const [offsetTopTimeline4, setOffsetTopTimeline4] = useState(0);
  const [offsetTopTimeline5, setOffsetTopTimeline5] = useState(0);
  const [offsetTopTimeline6, setOffsetTopTimeline6] = useState(0);
  const [offsetTopAdded, setOffsetTopAdded] = useState(false);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      timelinePeriod1?.pause();
      timelinePeriod2?.pause();
      timelinePeriod3?.pause();
      timelinePeriod4?.pause();
      timelinePeriod5?.pause();
      timelinePeriod6?.pause();
    } else {
      timelinePeriod1?.resume();
      timelinePeriod2?.resume();
      timelinePeriod3?.resume();
      timelinePeriod4?.resume();
      timelinePeriod5?.resume();
      timelinePeriod6?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isAllAnimationComplete,
    timelinePeriod1,
    timelinePeriod2,
    timelinePeriod3,
    timelinePeriod4,
    timelinePeriod5,
    timelinePeriod6,
  ]);

  // Header Left Toggle on Scroll
  useEffect(() => {
    if (!isAllAnimationComplete && window.innerWidth > 1024) return;

    toggleHeaderLeftOnScroll();
    window.addEventListener("scroll", toggleHeaderLeftOnScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", toggleHeaderLeftOnScroll);
    };
  }, [isAllAnimationComplete]);

  // Video Popup Control
  useGSAP(() => {
    const videoPopup = document.querySelector(".video-popup");
    if (isVideoPopupOpen) {
      // Page Overflow Hidden
      document.body.classList.remove("!overflow-auto");
      document.body.classList.add("!overflow-hidden");
      if (videoPopup) {
        gsap.to(videoPopup, {
          opacity: 1,
          visibility: "visible",
          duration: 0.5,
          ease: "none",
          pointerEvents: "auto",
        });
      }
    } else {
      // Page Overflow Auto
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      if (videoPopup) {
        gsap.to(videoPopup, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.5,
          ease: "none",
          pointerEvents: "none",
        });
      }
    }
  }, [isVideoPopupOpen]);

  // Set Timeline Refs OffsetTop
  useEffect(() => {
    // Get Offset Top Position
    function getOffsetTop(selector: string) {
      const element = document.querySelector(selector);
      if (!element) return 0;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY;
      return offsetTop;
    }
    if (!isLoading && isAllAnimationComplete && pageDataFetched) {
      const timer = setTimeout(() => {
        setOffsetTopTimeline1(getOffsetTop("#timeline1"));
        setOffsetTopTimeline2(getOffsetTop("#timeline2"));
        setOffsetTopTimeline3(getOffsetTop("#timeline3"));
        setOffsetTopTimeline4(getOffsetTop("#timeline4"));
        setOffsetTopTimeline5(getOffsetTop("#timeline5"));
        setOffsetTopTimeline6(getOffsetTop("#timeline6"));
        setOffsetTopAdded(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAllAnimationComplete, pageDataFetched]);

  // Get Past Rabbis ids
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const rabbiPostId = urlParams.get("rabbis-post");

    const getRabbisPos = document.getElementById(`past-rabbis-${rabbiPostId}`);
    if (getRabbisPos !== null) {
      const section = getRabbisPos.closest(".timeline");
      console.log(section);
      // 1. Get position relative to the viewport (changes as you scroll)
      const relativeToViewport = section?.getBoundingClientRect().top;
      // 2. Calculate position relative to the entire document (remains constant)
      if (relativeToViewport !== undefined) {
        const relativeToDocument = relativeToViewport + window.scrollY;
        const timer = setTimeout(() => {
          window.scrollTo({ top: relativeToDocument, behavior: "smooth" });
        }, 1000); // Delays execution by 3 seconds

        // 2. Return the cleanup function
        return () => clearTimeout(timer);
      }
    }
  }, [isAllAnimationComplete]);

  // Dragable Image cursor pointer text
  const { contextSafe } = useGSAP();
  // Cursor Follower Function
  const moveCircle = contextSafe(
    (e: { screenY: number; clientX: any; clientY: any }) => {
      const yskale = -(e.screenY / 100) * 1;
      //console.log(e.clientX, e.clientY)
      gsap.to("#drag-me", { x: e.clientX, y: e.clientY, duration: 0.2 });
    },
  );
  // On Mouse Enter
  const handleMouseEnter = contextSafe(() => {
    gsap.to("#drag-me", { opacity: 1, scale: 1 });
  });
  // On Mouse Leave
  const handleMouseLeave = contextSafe(() => {
    gsap.to("#drag-me", { opacity: 0, scale: 0 });
  });

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

  // Resolved offsetTopTimelineN values (each was previously repeated as
  // `pageDataFetched ? offsetTopTimelineN : 0` throughout the JSX below).
  const resolvedOffsetTopTimeline1 = pageDataFetched ? offsetTopTimeline1 : 0;
  const resolvedOffsetTopTimeline2 = pageDataFetched ? offsetTopTimeline2 : 0;
  const resolvedOffsetTopTimeline3 = pageDataFetched ? offsetTopTimeline3 : 0;
  const resolvedOffsetTopTimeline4 = pageDataFetched ? offsetTopTimeline4 : 0;
  const resolvedOffsetTopTimeline5 = pageDataFetched ? offsetTopTimeline5 : 0;
  const resolvedOffsetTopTimeline6 = pageDataFetched ? offsetTopTimeline6 : 0;

  return (
    chroniclesPageData && (
      <main
        ref={main}
        id="page"
        dir="ltr"
        className="main relative z-10 overflow-hidden lg:overflow-auto"
      >
        {/* First Panel Start Here */}
        <div ref={timeline1Ref} className="timeline1 timeline" id="timeline1">
          <div
            ref={panel1}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper1}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[707vw] lg:min-w-[707vw] lg:h-screen`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={""}
                bgOverlay={""}
                data={IntroData1}
                extraClass={"first-intro panel-section min-w-screen w-screen"}
                panel={timeline1Ref}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-40"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                timeline={"timeline1"}
                offsetTopTimeline={resolvedOffsetTopTimeline1}
                offsetTopAdded={offsetTopAdded}
              />
              <Suspense
                fallback={
                  <div className="lg:min-w-[80vw] w-full lg:w-[80vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ContentSection2
                  animWidthText={0.5}
                  extraClass={
                    "lg:min-w-[80vw] w-full lg:w-[80vw] lg:h-screen panel-section"
                  }
                  data={timeline1Data.contentSection}
                  panel={timeline1Ref}
                  loadAnimation={true}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <TitleSection
                  animWidthText={0.9}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  leftShape={true}
                  rightShape={true}
                  panel={timeline1Ref}
                  data={timeline1Data.titleSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={2}
                  extraClass={
                    "lg:min-w-screen w-screen lg:h-screen panel-section"
                  }
                  panel={timeline1Ref}
                  data={timeline1Data.pastRabbisSection}
                  rabbisPosts={rabbisPostsData1}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[32vw] w-full lg:w-[32vw] lg:h-screen panel-section bg-black" />
                }
              >
                <SingleImageSection
                  animWidthText={2.9}
                  extraClass={
                    "lg:min-w-[32vw] w-full lg:w-[32vw] lg:h-screen panel-section"
                  }
                  image={timeline1Data.singleImage}
                  panel={timeline1Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[150vw] w-full lg:w-[150vw] lg:h-screen panel-section bg-black" />
                }
              >
                <MarkOfTheRoad
                  animWidthText={3.4}
                  panel={timeline1Ref}
                  extraClass={
                    "lg:min-w-[150vw] w-full lg:w-[150vw] lg:h-screen panel-section"
                  }
                  data={timeline1Data.markOfTheRoad}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[150vw] w-full lg:w-[150vw] lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisTimeline
                  animWidthText={5.4}
                  extraClass={
                    "lg:min-w-[150vw] w-full lg:w-[150vw] lg:h-screen panel-section"
                  }
                  bgImage={timelineBG}
                  panel={timeline1Ref}
                  data={timeline1Data.rabbisTimeline}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[45vw] w-full lg:w-[45vw] lg:h-screen panel-section bg-black" />
                }
              >
                <HistoryQuoteSection
                  animWidthText={6.9}
                  bgImage={""}
                  extraClass={
                    "lg:min-w-[45vw] w-full lg:w-[45vw] lg:h-screen panel-section"
                  }
                  data={QuoteData}
                  boxClass="lg:translate-x-[6vw]"
                  panel={timeline1Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline1}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* First Panel End Here */}
        {/* Second Panel Start Here */}
        <div ref={timeline2Ref} className="timeline2 timeline" id="timeline2">
          <div
            ref={panel2}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper2}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[588vw] lg:min-w-[588vw] lg:h-screen`}
            >
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <Introduction2
                  animWidthText={0.1}
                  animated={isAllAnimationComplete}
                  bgImage={IntroBG}
                  bgOverlay={""}
                  data={IntroData2}
                  extraClass={
                    "second-intro panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline2Ref}
                  timeline={"timeline2"}
                  bgPosition=""
                  overlayClass="bg-[#57717A] opacity-70"
                  bgClass=""
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  offsetTopTimeline={resolvedOffsetTopTimeline2}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[128vw] w-full lg:w-[128vw] lg:h-screen panel-section bg-black" />
                }
              >
                <NewsPapperSection
                  animWidthText={8.2}
                  panel={timeline2Ref}
                  extraClass={
                    "lg:min-w-[128vw] w-full lg:w-[128vw] lg:h-screen panel-section"
                  }
                  bgImage={NewsSectionBG}
                  data={timeline2Data.newsPaperSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline2}
                  onMouseMove={moveCircle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <TitleSection
                  animWidthText={9.1}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  leftShape={true}
                  rightShape={true}
                  panel={timeline2Ref}
                  data={timeline2Data.titleSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline2}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={10.2}
                  extraClass={
                    "lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section"
                  }
                  panel={timeline2Ref}
                  data={timeline2Data.pastRabbisSection}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={resolvedOffsetTopTimeline2}
                  rabbisPosts={rabbisPostsData2}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[210vw] w-full lg:w-[210vw] lg:h-screen panel-section bg-black" />
                }
              >
                <MarkOfTheRoad2
                  animWidthText={11.4}
                  panel={timeline2Ref}
                  extraClass={
                    "lg:min-w-[210vw] w-full lg:w-[210vw] lg:h-screen panel-section"
                  }
                  data={timeline2Data.markOfTheRoad}
                  offsetTopTimeline={resolvedOffsetTopTimeline2}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Second Panel End Here */}
        {/* Third Panel Start Here */}
        <div ref={timeline3Ref} className="timeline3 timeline" id="timeline3">
          <div
            ref={panel3}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper3}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[849.8vw] lg:min-w-[849.8vw] lg:h-screen`}
            >
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={IntroBG2}
                  data={IntroData3}
                  extraClass={
                    "third-intro panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline3Ref}
                  bgPosition=""
                  overlayClass="hidden"
                  bgClass="opacity-40"
                  bgOverlay={IntroBGoverlay}
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  animWidthText={0.1}
                  timeline="timeline3"
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[65.8vw] w-full lg:w-[65.8vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ArrowSliderSection
                  animWidthText={14}
                  extraClass={
                    "lg:min-w-[65.8vw] w-full lg:w-[65.8vw] min-h-screen lg:h-screen panel-section"
                  }
                  bgImage={arrowSectionBG}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  slideData={SliderData}
                  sectionImage={sectionImage}
                  panel={timeline3Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[93vw] w-full lg:w-[93vw] lg:h-screen panel-section bg-black" />
                }
              >
                <EvidenceOfPeriod
                  animWidthText={14.65}
                  extraClass={
                    "lg:min-w-[93vw] w-full lg:w-[93vw] lg:h-screen panel-section"
                  }
                  panel={timeline3Ref}
                  videoControl={setIsVideoPopupOpen}
                  data={timeline3Data.evidenceOfPeriod}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <TitleSection
                  animWidthText={15}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  leftShape={true}
                  rightShape={true}
                  panel={timeline3Ref}
                  data={timeline3Data.titleSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={15.9}
                  extraClass={
                    "lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section"
                  }
                  panel={timeline3Ref}
                  data={timeline3Data.pastRabbisSection}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData3}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[285vw] w-full lg:w-[285vw] lg:h-screen panel-section bg-black" />
                }
              >
                <MarkOfTheRoad3
                  animWidthText={17}
                  extraClass={
                    "lg:min-w-[195vw] w-full lg:w-[195vw] lg:h-screen panel-section"
                  }
                  panel={timeline3Ref}
                  data={timeline3Data.markOfTheRoad}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <IntroductionContent
                  animated={isAllAnimationComplete}
                  bgImage={timeline3Data.introBannerBackground}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                  data={IntroContentData}
                  extraClass={
                    "panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline3Ref}
                  timeline="timeline3"
                  bgPosition=""
                  overlayClass="bg-[#000000] opacity-40"
                  bgClass=""
                  bgOverlay={""}
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  animWidthText={19.9}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[146vw] w-full lg:w-[146vw] lg:h-screen panel-section bg-black" />
                }
              >
                <LambOfferingSection
                  animWidthText={20.65}
                  extraClass={
                    "lg:min-w-[146vw] w-full lg:w-[146vw] lg:h-screen panel-section"
                  }
                  panel={timeline3Ref}
                  data={timeline3Data.lambOfferingSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline3}
                  offsetTopAdded={offsetTopAdded}
                  onMouseMove={moveCircle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Third Panel End Here */}
        {/* Fourth Panel Start Here */}
        <div ref={timeline4Ref} className="timeline4 timeline" id="timeline4">
          <div
            ref={panel4}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper4}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[955vw] lg:min-w-[955vw] lg:h-screen`}
            >
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG5}
                  data={IntroData4}
                  extraClass={
                    "fourth-intro panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline4Ref}
                  timeline="timeline4"
                  bgPosition=""
                  overlayClass="bg-[#43493B] opacity-80"
                  bgClass=""
                  bgOverlay={""}
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  animWidthText={0.1}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[170vw] w-full lg:w-[170vw] lg:h-screen panel-section bg-black" />
                }
              >
                <MoveToJerusalem
                  animWidthText={23.3}
                  extraClass={
                    "lg:min-w-[170vw] w-full lg:w-[170vw] lg:h-screen panel-section"
                  }
                  panel={timeline4Ref}
                  data={timeline4Data.moveToJerusalem}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <TitleSection
                  animWidthText={24.3}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  leftShape={true}
                  rightShape={true}
                  panel={timeline4Ref}
                  data={timeline4Data.titleSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={25.3}
                  extraClass={
                    "lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section"
                  }
                  panel={timeline4Ref}
                  data={timeline4Data.pastRabbisSection}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData4}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[485vw] w-full lg:w-[485vw] lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisTimeline2
                  animWidthText={26.1}
                  extraClass={
                    "lg:min-w-[485vw] w-full lg:w-[485vw] lg:h-screen panel-section"
                  }
                  bgImage={timelineBG}
                  panel={timeline4Ref}
                  data={timeline4Data.historyTimeline}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <HistoryQuoteSection
                  animWidthText={30.3}
                  bgImage={""}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  data={QuoteData2}
                  boxClass="lg:max-w-[40vw]"
                  panel={timeline4Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline4}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Fourth Panel End Here */}
        {/* Fifth Panel Start Here */}
        <div ref={timeline5Ref} className="timeline5 timeline" id="timeline5">
          <div
            ref={panel5}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper5}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[553vw] lg:min-w-[553vw] lg:h-screen`}
            >
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG6}
                  data={IntroData5}
                  extraClass={
                    "fifth-intro panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline5Ref}
                  timeline="timeline5"
                  bgPosition=""
                  overlayClass="bg-[#000000] opacity-60"
                  bgClass=""
                  bgOverlay={""}
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  animWidthText={31.2}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[32vw] w-full lg:w-[32vw] lg:h-screen panel-section bg-black" />
                }
              >
                <OnlyTextSection
                  animWidthText={31.6}
                  extraClass={
                    "lg:min-w-[32vw] w-full lg:w-[32vw] lg:h-screen panel-section"
                  }
                  panel={timeline5Ref}
                  data={timeline5Data.textSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[70vw] w-full lg:w-[70vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ArrowSliderSection
                  animWidthText={32.3}
                  extraClass={
                    "lg:min-w-[70vw] w-full lg:w-[70vw] min-h-screen lg:h-screen panel-section"
                  }
                  bgImage={arrowSectionBG2}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  slideData={SliderData2}
                  sectionImage={arrowSectionImage}
                  panel={timeline5Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ImageOnlySection
                  animWidthText={32.6}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  panel={timeline5Ref}
                  data={timeline5Data.arrowSliderSectionFloatingImage2}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[26vw] w-full lg:w-[26vw] lg:h-screen panel-section bg-black" />
                }
              >
                <SingleVideoSection
                  animWidthText={33.2}
                  extraClass={
                    "lg:min-w-[26vw] w-full lg:w-[26vw] h-screen panel-section"
                  }
                  panel={timeline5Ref}
                  data={timeline5Data.singleVideo}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section bg-black" />
                }
              >
                <TitleSection
                  animWidthText={33.4}
                  extraClass={
                    "lg:min-w-[50vw] w-full lg:w-[50vw] lg:h-screen panel-section"
                  }
                  leftShape={true}
                  rightShape={true}
                  panel={timeline5Ref}
                  data={timeline5Data.titleSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={34.2}
                  extraClass={
                    "lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section"
                  }
                  panel={timeline5Ref}
                  data={timeline5Data.pastRabbisSection}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData5}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[125vw] w-full lg:w-[125vw] lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisTimeline3
                  animWidthText={35.1}
                  extraClass={
                    "lg:min-w-[125vw] w-full lg:w-[125vw] lg:h-screen panel-section"
                  }
                  bgImage={timelineBG}
                  panel={timeline5Ref}
                  data={timeline5Data.historyTimeline}
                  offsetTopTimeline={resolvedOffsetTopTimeline5}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Fifth Panel End Here */}
        {/* Sixth Panel Start Here */}
        <div ref={timeline6Ref} className="timeline6 timeline" id="timeline6">
          <div
            ref={panel6}
            className="w-screen lg:h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper6}
              className={`section-wrapp flex lg:flex-nowrap flex-col lg:flex-row-reverse w-full lg:w-[837.6vw] lg:min-w-[837.6vw] lg:h-screen`}
            >
              <Suspense
                fallback={
                  <div className="lg:min-w-screen w-full lg:w-screen lg:h-screen panel-section bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG7}
                  data={IntroData6}
                  extraClass={
                    "sixth-intro panel-section lg:min-w-screen w-full lg:w-screen lg:h-screen"
                  }
                  panel={timeline6Ref}
                  timeline="timeline6"
                  bgPosition=""
                  overlayClass="bg-[#000000] opacity-20"
                  bgClass=""
                  bgOverlay={""}
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  animWidthText={36.6}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[32.5vw] w-full lg:w-[32.5vw] lg:h-screen panel-section bg-black" />
                }
              >
                <OnlyTextSection2
                  animWidthText={37.2}
                  extraClass={
                    "lg:min-w-[32.5vw] w-full lg:w-[32.5vw] lg:h-screen panel-section"
                  }
                  panel={timeline6Ref}
                  data={timeline6Data.textSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[55.5vw] w-full lg:w-[55.5vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ImageOnlySection2
                  animWidthText={38}
                  extraClass={
                    "lg:min-w-[55.5vw] w-full lg:w-[55.5vw] lg:h-screen panel-section"
                  }
                  panel={timeline6Ref}
                  data={timeline6Data.singleImage}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[210vw] w-full lg:w-[210vw] lg:h-screen panel-section bg-black" />
                }
              >
                <RabbisTimeline4
                  extraClass={
                    "panel-section lg:min-w-[210vw] w-full lg:w-[210vw] lg:h-screen"
                  }
                  animWidthText={38.4}
                  panel={timeline6Ref}
                  data={timeline6Data.cardSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[61.8vw] w-full lg:w-[61.8vw] lg:h-screen panel-section bg-black" />
                }
              >
                <OnlyParallaxImageSection
                  extraClass={
                    "panel-section lg:min-w-[61.8vw] w-full lg:w-[61.8vw] lg:h-screen"
                  }
                  image={timeline6Data.parallaxImage}
                  animWidthText={40}
                  panel={timeline6Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[130vw] w-full lg:w-[130vw] lg:h-screen panel-section bg-black" />
                }
              >
                <MarkOfTheRoad4
                  animWidthText={41.2}
                  extraClass={
                    "lg:min-w-[130vw] w-full lg:w-[130vw] lg:h-screen panel-section"
                  }
                  panel={timeline6Ref}
                  data={timeline6Data.markOfTheRoad}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[137vw] w-full lg:w-[137vw] lg:h-screen panel-section bg-black" />
                }
              >
                <ImageWithTextSection
                  extraClass={
                    "lg:min-w-[137vw] w-full lg:w-[137vw] lg:h-screen panel-section"
                  }
                  animWidthText={42.7}
                  panel={timeline6Ref}
                  data={timeline6Data.imageWithTextSection}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[35.8vw] w-full lg:w-[35.8vw] lg:h-screen panel-section bg-black" />
                }
              >
                <OnlyImageSection
                  extraClass={
                    "panel-section lg:min-w-[35.8vw] w-full lg:w-[35.8vw] lg:h-screen"
                  }
                  image={timeline6Data.onlyImage}
                  animWidthText={43.5}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="lg:min-w-[75vw] w-full lg:w-[75vw] lg:h-screen panel-section bg-black" />
                }
              >
                <HistoryQuoteSection2
                  extraClass={
                    "panel-section lg:min-w-[75vw] w-full lg:w-[75vw] lg:h-screen"
                  }
                  animWidthText={44.2}
                  bgImage={timeline6Data.quoteSectionBackground}
                  boxClass={""}
                  data={QuoteData3}
                  panel={timeline6Ref}
                  offsetTopTimeline={resolvedOffsetTopTimeline6}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
