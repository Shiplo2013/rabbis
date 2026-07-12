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
import introBG3 from "../../assets/images/intro-bg3.jpg";
import IntroBG from "../../assets/images/introduction-bg.jpg";
import NewsSectionBG from "../../assets/images/new-section-bg2.jpg";
import OnlyImage from "../../assets/images/only-image.jpg";
import OnlyImage2 from "../../assets/images/only-image2.jpg";
import QuoteSectionBG from "../../assets/images/quote-section-bg.jpg";
import HistoryImage1 from "../../assets/images/single-image.jpg";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function HistoryScriptProvider({
  data,
}: {
  data: { pageData: any; rabbisData: any[] };
}) {
  const CHRONICLES_CACHE_KEY = "chronicles-page-cache-v1";
  const CHRONICLES_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

  // Router Path
  const pathname = usePathname();
  const [chroniclesPageData, setChroniclesPageData] = useState<any | []>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadTimeline1, setLoadTimeline1] = useState(true);
  const [loadTimeline2, setLoadTimeline2] = useState(false);
  const [loadTimeline3, setLoadTimeline3] = useState(false);
  const [loadTimeline4, setLoadTimeline4] = useState(false);
  const [loadTimeline5, setLoadTimeline5] = useState(false);
  const [loadTimeline6, setLoadTimeline6] = useState(false);
  const [rabbisPostsData1, setRabbisPostsData1] = useState<any | []>([]);
  const [rabbisPostsData2, setRabbisPostsData2] = useState<any | []>([]);
  const [rabbisPostsData3, setRabbisPostsData3] = useState<any | []>([]);
  const [rabbisPostsData4, setRabbisPostsData4] = useState<any | []>([]);
  const [rabbisPostsData5, setRabbisPostsData5] = useState<any | []>([]);
  // Rabbis Menu State
  const {
    activeRabbisMenu,
    setActiveRabbisMenu,
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
      setError("No data provided to History.");
      return;
    }
    let isMounted = true;

    const controller = new AbortController();

    const cacheKey = `${CHRONICLES_CACHE_KEY}:${pathname}`;

    const getCachedData = () => {
      if (typeof window === "undefined") return null;

      try {
        const rawCache = localStorage.getItem(cacheKey);
        if (!rawCache) return null;

        const parsedCache = JSON.parse(rawCache) as {
          cachedAt: number;
          chroniclesPageData: any;
          rabbisPostsData1: any;
          rabbisPostsData2: any;
          rabbisPostsData3: any;
          rabbisPostsData4: any;
          rabbisPostsData5: any;
        };

        if (
          !parsedCache ||
          typeof parsedCache.cachedAt !== "number" ||
          Date.now() - parsedCache.cachedAt > CHRONICLES_CACHE_TTL_MS
        ) {
          localStorage.removeItem(cacheKey);
          return null;
        }

        return parsedCache;
      } catch {
        localStorage.removeItem(cacheKey);
        return null;
      }
    };

    const setCachedData = (payload: {
      chroniclesPageData: any;
      rabbisPostsData1: any;
      rabbisPostsData2: any;
      rabbisPostsData3: any;
      rabbisPostsData4: any;
      rabbisPostsData5: any;
    }) => {
      if (typeof window === "undefined") return;

      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            ...payload,
            cachedAt: Date.now(),
          }),
        );
      } catch {
        // Ignore localStorage write errors (private mode / quota exceeded)
      }
    };

    const cachedData = getCachedData();
    if (cachedData && isMounted) {
      setChroniclesPageData(cachedData.chroniclesPageData);
      setRabbisPostsData1(cachedData.rabbisPostsData1 || []);
      setRabbisPostsData2(cachedData.rabbisPostsData2 || []);
      setRabbisPostsData3(cachedData.rabbisPostsData3 || []);
      setRabbisPostsData4(cachedData.rabbisPostsData4 || []);
      setRabbisPostsData5(cachedData.rabbisPostsData5 || []);
      setIsLoading(false);
      return () => {
        isMounted = false;
        controller.abort();
      };
    }
    if (cachedData && isMounted) {
      setChroniclesPageData(cachedData.chroniclesPageData);
      setRabbisPostsData1(cachedData.rabbisPostsData1 || []);
      setRabbisPostsData2(cachedData.rabbisPostsData2 || []);
      setRabbisPostsData3(cachedData.rabbisPostsData3 || []);
      setRabbisPostsData4(cachedData.rabbisPostsData4 || []);
      setRabbisPostsData5(cachedData.rabbisPostsData5 || []);
      setIsLoading(false);
      return () => {
        isMounted = false;
        controller.abort();
      };
    }
    setCachedData({
      chroniclesPageData: data.pageData,
      rabbisPostsData1: data.rabbisData[0],
      rabbisPostsData2: data.rabbisData[1],
      rabbisPostsData3: data.rabbisData[2],
      rabbisPostsData4: data.rabbisData[3],
      rabbisPostsData5: data.rabbisData[4],
    });
    console.log("Data cached for chronicles page:", data);
    setChroniclesPageData(data.pageData);
    setRabbisPostsData1(data.rabbisData[0]);
    setRabbisPostsData2(data.rabbisData[1]);
    setRabbisPostsData3(data.rabbisData[2]);
    setRabbisPostsData4(data.rabbisData[3]);
    setRabbisPostsData5(data.rabbisData[4]);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [data]);

  useEffect(() => {
    if (!chroniclesPageData) {
      return;
    }
    setPageDataFetched(true);
    setIsLoading(false);
  }, [chroniclesPageData]);

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

  // Page Data
  const IntroData1 = {
    title:
      chroniclesPageData?.acf?.timeline_1?.introduction?.title || `סלבודקא`,
    subtitle:
      chroniclesPageData?.acf?.timeline_1?.introduction?.subtitle ||
      `תרל"ז - תרע"ד`,
    background:
      chroniclesPageData?.acf?.timeline_1?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_1?.introduction
        ?.background_overlay_image || false,
  };
  const IntroData2 = {
    title:
      chroniclesPageData?.acf?.timeline_2?.introduction?.title ||
      `מלחמת העולם<br/>הראשונה`,
    subtitle:
      chroniclesPageData?.acf?.timeline_2?.introduction?.subtitle ||
      `תרע"ד - תרפ"ד`,
    background:
      chroniclesPageData?.acf?.timeline_2?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_2?.introduction
        ?.background_overlay_image || false,
  };
  const IntroData3 = {
    title: chroniclesPageData?.acf?.timeline_3?.introduction?.title || `חברון`,
    subtitle:
      chroniclesPageData?.acf?.timeline_3?.introduction?.subtitle ||
      `תרפ"ד – תרפ"ט`,
    background:
      chroniclesPageData?.acf?.timeline_3?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_3?.introduction
        ?.background_overlay_image || false,
  };
  const IntroContentData = {
    title:
      chroniclesPageData?.acf?.timeline_3?.intro_banner?.title || `פרעות תרפ״ט`,
    subtitle: ``,
  };
  const IntroData4 = {
    title:
      chroniclesPageData?.acf?.timeline_4?.introduction?.title ||
      `ירושלים של מעלה`,
    subtitle:
      chroniclesPageData?.acf?.timeline_4?.introduction?.subtitle ||
      `תרפ"ט - תשל"ו`,
    background:
      chroniclesPageData?.acf?.timeline_4?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_4?.introduction
        ?.background_overlay_image || false,
  };
  const IntroData5 = {
    title:
      chroniclesPageData?.acf?.timeline_5?.introduction?.title ||
      `גבעת<br/>מרדכי`,
    subtitle:
      chroniclesPageData?.acf?.timeline_5?.introduction?.subtitle ||
      `תשל״ו - תשנ״ז`,
    background:
      chroniclesPageData?.acf?.timeline_5?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_5?.introduction
        ?.background_overlay_image || false,
  };
  const IntroData6 = {
    title:
      chroniclesPageData?.acf?.timeline_6?.introduction?.title ||
      `הרחיבי מקום<br/>אוהלך`,
    subtitle:
      chroniclesPageData?.acf?.timeline_6?.introduction?.subtitle ||
      `תשנ"ז - הווה`,
    background:
      chroniclesPageData?.acf?.timeline_6?.introduction?.background || false,
    overlay:
      chroniclesPageData?.acf?.timeline_6?.introduction
        ?.background_overlay_image || false,
  };
  const QuoteData = [
    {
      content:
        chroniclesPageData?.acf?.timeline_1?.quote_section ||
        `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`,
    },
  ];
  const QuoteData2 = [
    {
      content:
        chroniclesPageData?.acf?.timeline_4?.quote_section ||
        `<p><strong>שנת תשכ"ז:</strong> מינוי רבי רפאל אהרן יפהן לר"מ</p><p><strong>שנת תשכ"ח:</strong> רבי מרדכי חברוני לר"מ</p>`,
    },
  ];
  const QuoteData3 = {
    content:
      chroniclesPageData?.acf?.timeline_6?.quote_section?.text ||
      `<p><strong>שנת תשפ"ב</strong><br/> הרחבת בית המדרש</p>`,
  };

  //Arrow Slider Data
  const SliderData = {
    text1:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.arrow_slider
        ?.slide_1 ||
      `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
    text2:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.arrow_slider
        ?.slide_2 ||
      `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    background:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section?.background ||
      arrowSectionBG,
    floatingImage:
      chroniclesPageData?.acf?.timeline_3?.arrow_slider_section
        ?.floating_image || arrowSectionImage,
  };
  //Arrow Slider Data
  const SliderData2 = {
    text1:
      chroniclesPageData?.acf?.timeline_5?.arrow_slider_section?.arrow_slider
        ?.slide_1 ||
      `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
    text2:
      chroniclesPageData?.acf?.timeline_5?.arrow_slider_section?.arrow_slider
        ?.slide_2 ||
      `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    background:
      chroniclesPageData?.acf?.timeline_5?.arrow_slider_section?.background ||
      arrowSectionBG2,
    floatingImage:
      chroniclesPageData?.acf?.timeline_5?.arrow_slider_section
        ?.floating_image_1 || arrowSectionImage,
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
  const [timeline4ContainerAnimation, setTimeline4ContainerAnimation] =
    useState<gsap.core.Tween | null>(null);
  const [timelinePeriod5, setTimelinePeriod5] =
    useState<gsap.core.Timeline | null>(null);
  const [timelinePeriod6, setTimelinePeriod6] =
    useState<gsap.core.Timeline | null>(null);
  const [timelineAdded, setTimelineAdded] = useState(false);

  const setProgressLineWidth = (target: Element | null, value: string) => {
    if (target instanceof HTMLElement) {
      target.style.width = value;
    }
  };

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

  // Complete Timeline Function
  function completeTimeline(selector: string) {
    // Timeline Complete
    const intro = document.querySelector(`#history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("complete");
    if (!hasActiveClass) {
      intro.classList.add("complete");
    }
  }

  // Active Timeline
  function activeTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (!hasActiveClass) {
      intro.classList.add("active");
    }
  }

  function toggleHeaderLeftOnScroll() {
    const headerLeft = main.current?.querySelector(".header-left");
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

  // Inactive Timeline
  function inActiveTimeline(selector: string) {
    const intro = document.querySelector(`.history-timeline ${selector}`);
    if (!intro) return 0;
    const hasActiveClass = intro.classList.contains("active");
    if (hasActiveClass) {
      intro.classList.remove("active");
    }
  }

  // Page Section Animation
  useGSAP(() => {
    //ScrollTrigger.normalizeScroll(true);
    let timeline1 = null;
    let timeline2 = null;
    let timeline3 = null;
    let timeline4 = null;
    let timeline5 = null;
    let timeline6 = null;
    if (typeof window !== "undefined" && main.current) {
      const history = document.getElementById(
        "history-timeline-progress",
      ) as HTMLElement | null;
      const scurbScale = 2;

      // Intro Line 1
      const introLine1 = document.querySelector(
        `.history-timeline .intro-1 .progress-line .border-line`,
      );
      // Intro Line 2
      const introLine2 = document.querySelector(
        `.history-timeline .intro-2 .progress-line .border-line`,
      );
      // Intro Line 3
      const introLine3 = document.querySelector(
        `.history-timeline .intro-3 .progress-line .border-line`,
      );
      // Intro Line 4
      const introLine4 = document.querySelector(
        `.history-timeline .intro-4 .progress-line .border-line`,
      );
      // Intro Line 5
      const introLine5 = document.querySelector(
        `.history-timeline .intro-5 .progress-line .border-line`,
      );

      // Timeline Section  1
      timeline1 = gsap.timeline({
        scrollTrigger: {
          trigger: panel1.current,
          start: "top top",
          end: "+=" + window.innerWidth * 7.07,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // First Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-1");
              completeTimeline(".intro-1");

              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine1, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine1, "0%");
              inActiveTimeline(".intro-1");
            }
          },
        },
      });
      timeline1.to(wrapper1.current, {
        x: () =>
          wrapper1.current
            ? wrapper1.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel1.current,
          start: timeline1Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 7.07 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod1(timeline1);
      // Timeline Section  2
      timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: panel2.current,
          start: "top top",
          end: "+=" + window.innerWidth * 5.88,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Second Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-2");
              completeTimeline(".intro-2");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine2, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine2, "0%");
              inActiveTimeline(".intro-2");
            }
          },
        },
      });
      timeline2.to(wrapper2.current, {
        x: () =>
          wrapper2.current
            ? wrapper2.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel2.current,
          start: timeline2Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 5.88 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod2(timeline2);
      // Timeline Section  3
      timeline3 = gsap.timeline({
        scrollTrigger: {
          trigger: panel3.current,
          start: "top top",
          end: "+=" + window.innerWidth * 9.398,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Third Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-3");
              completeTimeline(".intro-3");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine3, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine3, "0%");
              inActiveTimeline(".intro-3");
            }
          },
        },
      });
      timeline3.to(wrapper3.current, {
        x: () =>
          wrapper3.current
            ? wrapper3.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel3.current,
          start: timeline3Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 9.398 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod3(timeline3);
      // Timeline Section  4
      timeline4 = gsap.timeline({
        scrollTrigger: {
          trigger: panel4.current,
          start: "top top",
          end: "+=" + window.innerWidth * 8.75,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Fourth Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-4");
              completeTimeline(".intro-4");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine4, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine4, "0%");
              inActiveTimeline(".intro-4");
            }
          },
        },
      });
      timeline4.to(wrapper4.current, {
        x: () =>
          wrapper4.current
            ? wrapper4.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel4.current,
          start: timeline4Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 8.75 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod4(timeline4);
      // Timeline Section  5
      timeline5 = gsap.timeline({
        scrollTrigger: {
          trigger: panel5.current,
          start: "top top",
          end: "+=" + window.innerWidth * 5.53,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Fifth Chapter
            if (self.progress > 0) {
              activeTimeline(".intro-5");
              completeTimeline(".intro-5");
              const introPercent = Math.round(self.progress * 100);
              setProgressLineWidth(introLine5, `${introPercent}%`);
            } else {
              setProgressLineWidth(introLine5, "0%");
              inActiveTimeline(".intro-5");
            }
          },
        },
      });
      timeline5.to(wrapper5.current, {
        x: () =>
          wrapper5.current
            ? wrapper5.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel5.current,
          start: timeline5Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 5.53 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod5(timeline5);
      // Timeline Section 6
      timeline6 = gsap.timeline({
        scrollTrigger: {
          trigger: panel6.current,
          start: "top top",
          end: "+=" + window.innerWidth * 8.376,
          scrub: scurbScale,
          pin: true,
          anticipatePin: 1,
          //pinType: "fixed",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Sixth Chapter
            if (self.progress > 0) {
              completeTimeline(".intro-6");
              activeTimeline(".intro-6");
            } else {
              inActiveTimeline(".intro-6");
            }
            // Hide History Timeline on Last Chapter
            const shouldHideHistory = self.progress > 0.99;
            if (history && shouldHideHistory !== isHistoryHidden.current) {
              isHistoryHidden.current = shouldHideHistory;
              gsap.set(history, {
                autoAlpha: shouldHideHistory ? 0 : 1,
                pointerEvents: shouldHideHistory ? "none" : "auto",
              });
            }
          },
        },
      });
      timeline6.to(wrapper6.current, {
        x: () =>
          wrapper6.current
            ? wrapper6.current.offsetWidth - window.innerWidth
            : 0,
        ease: "none",
        scrollTrigger: {
          trigger: panel6.current,
          start: timeline6Ref.current?.offsetTop,
          end: "+=" + (window.innerWidth * 8.376 - 200),
          scrub: scurbScale,
        },
      });
      setTimelinePeriod6(timeline6);
    }
    setTimelineAdded(true);
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
  }, [isAllAnimationComplete]);

  // Header Left Toggle on Scroll
  useEffect(() => {
    if (!isAllAnimationComplete) return;

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
    chroniclesPageData && (
      <main ref={main} id="page" dir="ltr" className="main relative z-10">
        {/* First Panel Start Here */}
        <div ref={timeline1Ref} className="timeline1" id="timeline1">
          <div
            ref={panel1}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper1}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[707vw] min-w-[707vw] h-screen will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                bgImage={""}
                bgOverlay={""}
                data={IntroData1}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
                panel={timeline1Ref}
                bgPosition=""
                overlayClass="bg-[#000000] opacity-40"
                bgClass=""
                audioControl={function (): void {
                  throw new Error("Function not implemented.");
                }}
                timeline={"timeline1"}
                offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                offsetTopAdded={offsetTopAdded}
              />
              <Suspense
                fallback={
                  <div className="min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ContentSection2
                  animWidthText={0.5}
                  extraClass={
                    "min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"
                  }
                  data={
                    chroniclesPageData?.acf?.timeline_1?.content_section || ""
                  }
                  panel={timeline1Ref}
                  loadAnimation={true}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <TitleSection
                  animWidthText={0.9}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline1Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_1?.title_section || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline1Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                  data={
                    chroniclesPageData?.acf?.timeline_1?.past_rabbis_section ||
                    []
                  }
                  rabbisPosts={rabbisPostsData1}
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <SingleImageSection
                  animWidthText={2.9}
                  extraClass={
                    "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                  }
                  image={
                    chroniclesPageData?.acf?.timeline_1?.single_image ||
                    HistoryImage1
                  }
                  panel={timeline1Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <MarkOfTheRoad
                  animWidthText={3.4}
                  panel={timeline1Ref}
                  extraClass={
                    "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                  }
                  data={
                    chroniclesPageData?.acf?.timeline_1?.mark_of_the_road || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisTimeline
                  animWidthText={5.4}
                  extraClass={
                    "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline1Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_1?.rabbis_timeline || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <HistoryQuoteSection
                  animWidthText={6.9}
                  bgImage={""}
                  extraClass={
                    "min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"
                  }
                  data={QuoteData}
                  boxClass="translate-x-[6vw]"
                  panel={timeline1Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline1 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* First Panel End Here */}
        {/* Second Panel Start Here */}
        <div ref={timeline2Ref} className="timeline2" id="timeline2">
          <div
            ref={panel2}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper2}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[588vw] min-w-[588vw] h-screen will-change-transform`}
            >
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <Introduction2
                  animWidthText={0.1}
                  animated={isAllAnimationComplete}
                  bgImage={IntroBG}
                  bgOverlay={""}
                  data={IntroData2}
                  extraClass={
                    "second-intro panel-section will-change-transform min-w-screen w-screen"
                  }
                  panel={timeline2Ref}
                  timeline={"timeline2"}
                  bgPosition=""
                  overlayClass="bg-[#57717A] opacity-70"
                  bgClass=""
                  audioControl={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline2 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <NewsPapperSection
                  animWidthText={8.2}
                  panel={timeline2Ref}
                  extraClass={
                    "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={NewsSectionBG}
                  data={
                    chroniclesPageData?.acf?.timeline_2?.news_paper_section ||
                    []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline2 : 0}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <TitleSection
                  animWidthText={9.1}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline2Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_2?.title_section || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline2 : 0}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={10.2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline2Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                  data={
                    chroniclesPageData?.acf?.timeline_2?.past_rabbis_section ||
                    []
                  }
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline2 : 0}
                  rabbisPosts={rabbisPostsData2}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <MarkOfTheRoad2
                  animWidthText={11.4}
                  panel={timeline2Ref}
                  extraClass={
                    "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                  }
                  data={
                    chroniclesPageData?.acf?.timeline_2?.mark_of_the_road || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline2 : 0}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Second Panel End Here */}
        {/* Third Panel Start Here */}
        <div ref={timeline3Ref} className="timeline3" id="timeline3">
          <div
            ref={panel3}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper3}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[939.8vw] min-w-[939.8vw] h-screen will-change-transform`}
            >
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={IntroBG2}
                  data={IntroData3}
                  extraClass={
                    "third-intro panel-section will-change-transform min-w-screen w-screen"
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
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ArrowSliderSection
                  animWidthText={14}
                  extraClass={
                    "min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={arrowSectionBG}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  slideData={SliderData}
                  sectionImage={sectionImage}
                  panel={timeline3Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <EvidenceOfPeriod
                  animWidthText={14.65}
                  extraClass={
                    "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  videoControl={setIsVideoPopupOpen}
                  data={
                    chroniclesPageData?.acf?.timeline_3?.evidence_of_period ||
                    []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <TitleSection
                  animWidthText={15}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline3Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_3?.title_section || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={15.9}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                  data={
                    chroniclesPageData?.acf?.timeline_3?.past_rabbis_section ||
                    []
                  }
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData3}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <MarkOfTheRoad3
                  animWidthText={17}
                  extraClass={
                    "min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_3?.mark_of_the_road || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <IntroductionContent
                  animated={isAllAnimationComplete}
                  bgImage={
                    chroniclesPageData?.acf?.timeline_3?.intro_banner
                      ?.background || introBG3
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                  data={IntroContentData}
                  extraClass={
                    "panel-section will-change-transform min-w-screen w-screen"
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
                  <div className="min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <LambOfferingSection
                  animWidthText={20.65}
                  extraClass={
                    "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_3
                      ?.lamb_offering_section || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline3 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Third Panel End Here */}
        {/* Fourth Panel Start Here */}
        <div ref={timeline4Ref} className="timeline4" id="timeline4">
          <div
            ref={panel4}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper4}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[875vw] min-w-[875vw] h-screen will-change-transform`}
            >
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG5}
                  data={IntroData4}
                  extraClass={
                    "fourth-intro panel-section will-change-transform min-w-screen w-screen"
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
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <MoveToJerusalem
                  animWidthText={23.3}
                  extraClass={
                    "min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline4Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_4?.move_to_jerusalem || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <TitleSection
                  animWidthText={24.3}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline4Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_4?.title_section || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={25.3}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline4Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                  data={
                    chroniclesPageData?.acf?.timeline_4?.past_rabbis_section ||
                    []
                  }
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData4}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisTimeline2
                  animWidthText={26.1}
                  extraClass={
                    "min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline4Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_4?.history_timeline || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <HistoryQuoteSection
                  animWidthText={30.3}
                  bgImage={""}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  data={QuoteData2}
                  boxClass="max-w-[40vw]"
                  panel={timeline4Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline4 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Fourth Panel End Here */}
        {/* Fifth Panel Start Here */}
        <div ref={timeline5Ref} className="timeline5" id="timeline5">
          <div
            ref={panel5}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper5}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[553vw] min-w-[553vw] h-screen will-change-transform`}
            >
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG6}
                  data={IntroData5}
                  extraClass={
                    "fifth-intro panel-section will-change-transform min-w-screen w-screen"
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
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <OnlyTextSection
                  animWidthText={31.6}
                  extraClass={
                    "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                  data={chroniclesPageData?.acf?.timeline_5?.text_section || ""}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ArrowSliderSection
                  animWidthText={32.3}
                  extraClass={
                    "min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={arrowSectionBG2}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  slideData={SliderData2}
                  sectionImage={arrowSectionImage}
                  panel={timeline5Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ImageOnlySection
                  animWidthText={32.6}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_5?.arrow_slider_section
                      ?.floating_image_2 || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <SingleVideoSection
                  animWidthText={33.2}
                  extraClass={
                    "min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                  data={chroniclesPageData?.acf?.timeline_5?.single_video || []}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <TitleSection
                  animWidthText={33.4}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline5Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_5?.title_section || ""
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisPeriodSection
                  animWidthText={34.2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                  data={
                    chroniclesPageData?.acf?.timeline_5?.past_rabbis_section ||
                    []
                  }
                  rabbisData={setListOfRabbis}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                  rabbisPosts={rabbisPostsData5}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisTimeline3
                  animWidthText={35.1}
                  extraClass={
                    "min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline5Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_5?.history_timeline || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline5 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Fifth Panel End Here */}
        {/* Sixth Panel Start Here */}
        <div ref={timeline6Ref} className="timeline6" id="timeline6">
          <div
            ref={panel6}
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper6}
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[837.6vw] min-w-[837.6vw] h-screen will-change-transform`}
            >
              <Suspense
                fallback={
                  <div className="min-w-screen w-screen h-screen panel-section will-change-transform bg-black" />
                }
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG7}
                  data={IntroData6}
                  extraClass={
                    "sixth-intro panel-section will-change-transform min-w-screen w-screen"
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
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <OnlyTextSection2
                  animWidthText={37.2}
                  extraClass={
                    "min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                  data={chroniclesPageData?.acf?.timeline_6?.text_section || ""}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ImageOnlySection2
                  animWidthText={38}
                  extraClass={
                    "min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                  data={chroniclesPageData?.acf?.timeline_6?.single_image || ""}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <RabbisTimeline4
                  extraClass={
                    "panel-section will-change-transform min-w-[210vw] w-[210vw]"
                  }
                  animWidthText={38.4}
                  panel={timeline6Ref}
                  data={chroniclesPageData?.acf?.timeline_6?.card_section || []}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[61.8vw] w-[61.8vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <OnlyParallaxImageSection
                  extraClass={
                    "panel-section will-change-transform min-w-[61.8vw] w-[61.8vw]"
                  }
                  image={
                    chroniclesPageData?.acf?.timeline_6?.parallax_image ||
                    OnlyImage
                  }
                  animWidthText={40}
                  panel={timeline6Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <MarkOfTheRoad4
                  animWidthText={41.2}
                  extraClass={
                    "min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_6?.mark_of_the_road || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <ImageWithTextSection
                  extraClass={
                    "min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform"
                  }
                  animWidthText={42.7}
                  panel={timeline6Ref}
                  data={
                    chroniclesPageData?.acf?.timeline_6
                      ?.image_with_text_section || []
                  }
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[35.8vw] w-[35.8vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <OnlyImageSection
                  extraClass={
                    "panel-section will-change-transform min-w-[35.8vw] w-[35.8vw]"
                  }
                  image={
                    chroniclesPageData?.acf?.timeline_6?.only_image ||
                    OnlyImage2
                  }
                  animWidthText={43.5}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
                  offsetTopAdded={offsetTopAdded}
                />
              </Suspense>
              <Suspense
                fallback={
                  <div className="min-w-[75vw] w-[75vw] h-screen panel-section will-change-transform bg-black" />
                }
              >
                <HistoryQuoteSection2
                  extraClass={
                    "panel-section will-change-transform min-w-[75vw] w-[75vw]"
                  }
                  animWidthText={44.2}
                  bgImage={
                    chroniclesPageData?.acf?.timeline_6?.quote_section
                      ?.background || QuoteSectionBG
                  }
                  boxClass={""}
                  data={QuoteData3}
                  panel={timeline6Ref}
                  offsetTopTimeline={pageDataFetched ? offsetTopTimeline6 : 0}
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
