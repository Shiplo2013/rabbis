"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  default as arrowSectionBG,
  default as arrowSectionBG2,
} from "../assets/images/arrow-section-bg.jpg";
import sectionImage from "../assets/images/arrow-section-image.jpg";
import arrowSectionImage from "../assets/images/arrow-section-image2.jpg";
import timelineBG from "../assets/images/history-bg.jpg";
import introBG5 from "../assets/images/intro-bg-5.jpg";
import introBG6 from "../assets/images/intro-bg-6.jpg";
import introBG7 from "../assets/images/intro-bg-7.jpg";
import IntroBG2 from "../assets/images/intro-bg.jpg";
import IntroBGoverlay from "../assets/images/intro-bg2.png";
import introBG3 from "../assets/images/intro-bg3.jpg";
import IntroBG from "../assets/images/introduction-bg.jpg";
import NewsSectionBG from "../assets/images/new-section-bg2.jpg";
import OnlyImage from "../assets/images/only-image.jpg";
import OnlyImage2 from "../assets/images/only-image2.jpg";
import QuoteSectionBG from "../assets/images/quote-section-bg.jpg";
import PostImage1 from "../assets/images/rabbis-image-1.jpg";
import PostImage2 from "../assets/images/rabbis-image-2.jpg";
import HistoryImage1 from "../assets/images/single-image.jpg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ArrowSliderSection from "../components/history/ArrowSliderSection";
import ContentSection2 from "../components/history/ContentSection2";
import EvidenceOfPeriod from "../components/history/EvidenceOfPeriod";
import HistoryQuoteSection from "../components/history/HistoryQuoteSection";
import HistoryQuoteSection2 from "../components/history/HistoryQuoteSection2";
import ImageOnlySection from "../components/history/ImageOnlySection";
import ImageOnlySection2 from "../components/history/ImageOnlySection2";
import ImageWithTextSection from "../components/history/ImageWithTextSection";
import Introduction from "../components/history/Introduction";
import Introduction2 from "../components/history/Introduction2";
import IntroductionContent from "../components/history/IntroductionContent";
import LambOfferingSection from "../components/history/LambOfferingSection";
import MarkOfTheRoad from "../components/history/MarkOfTheRoad";
import MarkOfTheRoad2 from "../components/history/MarkOfTheRoad2";
import MarkOfTheRoad3 from "../components/history/MarkOfTheRoad3";
import MarkOfTheRoad4 from "../components/history/MarkOfTheRoad4";
import MoveToJerusalem from "../components/history/MoveToJerusalem";
import NewsPapperSection from "../components/history/NewsPapperSection";
import NotificationPopup from "../components/history/NotificationPopup";
import OnlyImageSection from "../components/history/OnlyImageSection";
import OnlyParallaxImageSection from "../components/history/OnlyParallaxImageSection";
import OnlyTextSection from "../components/history/OnlyTextSection";
import OnlyTextSection2 from "../components/history/OnlyTextSection2";
import RabbisPeriodSection from "../components/history/RabbisPeriodSection";
import RabbisTimeline from "../components/history/RabbisTimeline";
import RabbisTimeline2 from "../components/history/RabbisTimeline2";
import RabbisTimeline3 from "../components/history/RabbisTimeline3";
import RabbisTimeline4 from "../components/history/RabbisTimeline4";
import SingleVideoSection from "../components/history/SingleVideoSection";
import TitleSection from "../components/history/TitleSection";
import VideoPopup from "../components/history/VideoPopup";
import LoadingEffect from "../components/LoadingEffect";
import HistoryTimeline from "../ui/HistoryTimeline";
import RabbisHamburgerMenu from "../ui/past-rabbis/RabbisHamburgerMenu";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SingleImageSection from "../ui/SingleImageSection";
import SlidingArrow from "../ui/SlidingArrow";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";
import TitleSplitChars from "../ui/TitleSplitChars";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

export default function Page() {
  // Page Selectors
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
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
  const history = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const isHistoryHidden = useRef(false);
  const isHeaderLeftHidden = useRef(false);
  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title: `תרל"ז - תרע"ד`,
    },
    {
      id: 2,
      title: `תרע"ד - תרפ"ד`,
    },
    {
      id: 3,
      title: `תרפ"ד - תרפ"ט`,
    },
    {
      id: 4,
      title: `תרפ"ט - תשל"ו`,
    },
    {
      id: 5,
      title: `תשל״ו - תשנ״ז`,
    },
    {
      id: 6,
      title: `תשנ"ז - הווה`,
    },
  ];
  // Page Data
  const IntroData1 = [
    {
      title: `סלבודקא`,
      subtitle: `תרל"ז - תרע"ד`,
    },
  ];
  const IntroData2 = [
    {
      title: `מלחמת העולם<br/>הראשונה`,
      subtitle: `תרע"ד - תרפ"ד`,
    },
  ];
  const IntroData3 = [
    {
      title: `חברון`,
      subtitle: `תרפ"ד – תרפ"ט`,
    },
  ];
  const IntroData4 = [
    {
      title: `פרעות תרפ״ט`,
      subtitle: ``,
    },
  ];
  const IntroData5 = [
    {
      title: `ירושלים של מעלה`,
      subtitle: `תרפ"ט - תשל"ו`,
    },
  ];
  const IntroData6 = [
    {
      title: `גבעת<br/>מרדכי`,
      subtitle: `תשל״ו - תשנ״ז`,
    },
  ];
  const IntroData7 = [
    {
      title: `הרחיבי מקום<br/>אוהלך`,
      subtitle: `תשנ"ז - הווה`,
    },
  ];
  const QuoteData = [
    {
      content: `<p><strong>שנת תרנ"ז</strong>: פיצול הישיבה עקב פולמוס המוסר - 'כנסת בית יצחק' ו'כנסת ישראל'</p><p><strong>שנת תרס"ג</strong>: התעוררות מחודשת של פולמוס המוסר</p>`,
    },
  ];
  const QuoteData2 = [
    {
      content: `<p><strong>שנת תשכ"ז:</strong> מינוי רבי רפאל אהרן יפהן לר"מ</p><p><strong>שנת תשכ"ח:</strong> רבי מרדכי חברוני לר"מ</p>`,
    },
  ];
  const QuoteData3 = [
    {
      content: `<p><strong>שנת תשפ"ב</strong><br/> הרחבת בית המדרש</p>`,
    },
  ];

  //Arrow Slider Data
  const SliderData = [
    {
      text1: `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
      text2: `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    },
  ];
  //Arrow Slider Data
  const SliderData2 = [
    {
      text1: `מתוך מכתב רבי יצחק הוטנר על שנות לימודיו בחברון:<br/>"כי אמנם מהרגע הראשון להתבצרותה של הישיבה על אדמת חברון, עלו והתבלטו שני קוים יסודיים בתכונת חייה: רעננות הלבבות והתמתחות השרירים לעבודת תורה ויראה. והלכו להם שני אלה והתלכדו לשטף אחד. קשה היה להגיד, מי כאן האב ומי התולדה:`,
      text2: `שמחה מתוך עבודה או עבודה מתוך שמחה. והנכון דדא ודא היו בה: שמחה מתוך עבודה ועבודה מתוך שמחה, וכתר אצילות של תלמידי חכמים מבהיק על גביהם. ולא עוד אלא שנסתגל להם, לבאים, אוירא דארעא דישראל לראות ברכה יתירה בעמלם, וכל חד לפום דרגיה עלה והתעלה במדה לא צפויה.`,
    },
  ];
  // Hamburger Menu
  const RabbisMenu = [
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage1,
      link: `/past-rabbis/single`,
    },
    {
      title: `הגאון רבי אברהם יהודה פרבשטיין זצוק"ל`,
      image: PostImage2,
      link: `/past-rabbis/single`,
    },
  ];
  // Rabbis Menu State
  const [activeRabbisMenu, setActiveRabbisMenu] = useState(false);

  // Router Path
  const pathname = usePathname();
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Video Popup
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
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

  // Load Page
  useGSAP(() => {
    document.fonts.ready.then(() => {
      // Selectors
      const headerLeft = main.current?.querySelector(".header-left");
      const headerRight = main.current?.querySelector(".header-right");
      // Set Title
      const headingTitle = page.current?.querySelector(
        ".first-intro .intro-title",
      );
      // Subtitle
      const headingContent = page.current?.querySelector(
        ".first-intro .intro-content",
      );
      // Page Timeline
      const headingTitleSpan = headingTitle?.querySelector("span");
      const headingContentSpan = headingContent?.querySelector("span");
      const timelineRef = history.current?.querySelector(".timeline");
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
      if (timelineRef) {
        gsap.set(history.current, { opacity: 1 });
        gsap.set(timelineRef, { yPercent: 100 });
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
        tl.to(main.current, {
          opacity: 1,
          ease: "none",
          duration: 0.5,
          delay: 0,
        });
        tl.to(page.current, {
          opacity: 1,
          ease: "none",
          duration: 0,
          delay: 0,
        });
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
        if (timelineRef) {
          tl.to(
            timelineRef,
            {
              yPercent: 0,
              delay: 0,
              duration: 3,
              ease: "expo.inOut",
            },
            "-=3",
          );
        }
      }
    });
  }, [animationPlayed]);

  // Complete Timeline Function
  function completeTimeline(selector: string) {
    // Timeline Complete
    const intro = document.querySelector(`.history-timeline ${selector}`);
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
    if (typeof window !== "undefined" && main) {
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
              gsap.to(introLine1, {
                width: `${introPercent}%`,
              });
            } else {
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
          end: "+=" + window.innerWidth * 7.07,
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
              gsap.set(introLine2, {
                width: `${introPercent}%`,
              });
            } else {
              gsap.set(introLine2, {
                width: `0%`,
              });
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
          end: "+=" + window.innerWidth * 5.88,
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
              gsap.set(introLine3, {
                width: `${introPercent}%`,
              });
            } else {
              gsap.set(introLine3, {
                width: `0%`,
              });
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
          end: "+=" + window.innerWidth * 9.398,
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
              gsap.set(introLine4, {
                width: `${introPercent}%`,
              });
            } else {
              gsap.set(introLine4, {
                width: `0%`,
              });
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
          end: "+=" + window.innerWidth * 8.75,
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
              gsap.set(introLine5, {
                width: `${introPercent}%`,
              });
            } else {
              gsap.set(introLine5, {
                width: `0%`,
              });
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
          end: "+=" + window.innerWidth * 5.53,
          scrub: scurbScale,
        },
      });
      setTimelinePeriod5(timeline5);
      // Timeline Section 6
      timeline6 = gsap.timeline({
        scrollTrigger: {
          trigger: panel6.current,
          start: "top top",
          end: "+=" + window.innerWidth * 5.53,
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
            if (
              history.current &&
              shouldHideHistory !== isHistoryHidden.current
            ) {
              isHistoryHidden.current = shouldHideHistory;
              gsap.set(history.current, {
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
          end: "+=" + window.innerWidth * 5.53,
          scrub: scurbScale,
        },
      });
      setTimelinePeriod6(timeline6);
    }
    // Return
    return () => {
      timelinePeriod1?.kill();
      timelinePeriod2?.kill();
      timelinePeriod3?.kill();
      timelinePeriod4?.kill();
      timelinePeriod5?.kill();
      timelinePeriod6?.kill();
    };
  }, [pathname]);

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
      gsap.to(videoPopup, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "none",
        pointerEvents: "auto",
      });
    } else {
      // Page Overflow Auto
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
      gsap.to(videoPopup, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "none",
        pointerEvents: "none",
      });
    }
  }, [isVideoPopupOpen]);

  // Default Effect
  useEffect(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      if (main.current) {
        gsap.to(main.current, {
          opacity: 0,
          duration: 0.1,
        });
      }
      if (page.current) {
        gsap.to(page.current, {
          opacity: 0,
          duration: 0,
          onComplete: () => {
            window.scrollTo(0, 0);
          },
        });
      }
    };
  }, []);

  return (
    <div ref={main} id="page" className="relative">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header animationStatus={isAllAnimationComplete} />
      <SmoothWrapper>
        <main
          ref={page}
          id="page"
          dir="ltr"
          className="main opacity-0 relative z-10"
        >
          {/* First Panel Start Here */}
          <div ref={timeline1Ref} className="timeline1">
            <div
              ref={panel1}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper1}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[707vw] h-screen will-change-transform`}
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
                />
                <ContentSection2
                  animWidthText={0.5}
                  extraClass={
                    "min-w-[80vw] w-[80vw] h-screen panel-section will-change-transform"
                  }
                />
                <TitleSection
                  animWidthText={0.9}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline1Ref}
                />
                <RabbisPeriodSection
                  animWidthText={2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline1Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                />
                <SingleImageSection
                  animWidthText={2.9}
                  extraClass={
                    "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                  }
                  image={HistoryImage1}
                  panel={timeline1Ref}
                />
                <MarkOfTheRoad
                  animWidthText={3.4}
                  extraClass={
                    "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                  }
                />
                <RabbisTimeline
                  animWidthText={5.4}
                  extraClass={
                    "min-w-[150vw] w-[150vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline1Ref}
                />
                <HistoryQuoteSection
                  animWidthText={6.9}
                  bgImage={""}
                  extraClass={
                    "min-w-[45vw] w-[45vw] h-screen panel-section will-change-transform"
                  }
                  data={QuoteData}
                  boxClass="translate-x-[6vw]"
                  panel={timeline1Ref}
                />
              </div>
            </div>
          </div>
          {/* First Panel End Here */}
          {/* Second Panel Start Here */}
          <div ref={timeline2Ref} className="timeline2">
            <div
              ref={panel2}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper2}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[588vw] h-screen will-change-transform`}
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
                />
                <NewsPapperSection
                  animWidthText={8.2}
                  panel={timeline2Ref}
                  extraClass={
                    "min-w-[128vw] w-[128vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={NewsSectionBG}
                />
                <TitleSection
                  animWidthText={9.1}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline2Ref}
                />
                <RabbisPeriodSection
                  animWidthText={10.2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline2Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                />
                <MarkOfTheRoad2
                  animWidthText={11.4}
                  panel={timeline2Ref}
                  extraClass={
                    "min-w-[210vw] w-[210vw] h-screen panel-section will-change-transform"
                  }
                />
              </div>
            </div>
          </div>
          {/* Second Panel End Here */}
          {/* Third Panel Start Here */}
          <div ref={timeline3Ref} className="timeline3">
            <div
              ref={panel3}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper3}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[939.8vw] h-screen will-change-transform`}
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
                  animWidthText={13}
                  timeline="timeline3"
                />
                <ArrowSliderSection
                  animWidthText={14}
                  extraClass={
                    "min-w-[65.8vw] w-[65.8vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={arrowSectionBG}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  SlideData={SliderData}
                  sectionImage={sectionImage}
                  panel={timeline3Ref}
                />
                <EvidenceOfPeriod
                  animWidthText={14.65}
                  extraClass={
                    "min-w-[93vw] w-[93vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  videoControl={setIsVideoPopupOpen}
                />
                <TitleSection
                  animWidthText={15}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline3Ref}
                />
                <RabbisPeriodSection
                  animWidthText={15.9}
                  extraClass={
                    "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                />
                <MarkOfTheRoad3
                  animWidthText={17}
                  extraClass={
                    "min-w-[285vw] w-[285vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                />
                <IntroductionContent
                  animated={isAllAnimationComplete}
                  bgImage={introBG3}
                  data={IntroData4}
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
                <LambOfferingSection
                  animWidthText={20.65}
                  extraClass={
                    "min-w-[146vw] w-[146vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline3Ref}
                />
              </div>
            </div>
          </div>
          {/* Third Panel End Here */}
          {/* Fourth Panel Start Here */}
          <div ref={timeline4Ref} className="timeline4">
            <div
              ref={panel4}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper4}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[875vw] h-screen will-change-transform`}
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG5}
                  data={IntroData5}
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
                />
                <MoveToJerusalem
                  animWidthText={23.3}
                  extraClass={
                    "min-w-[170vw] w-[170vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline4Ref}
                />
                <TitleSection
                  animWidthText={24.3}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline4Ref}
                />
                <RabbisPeriodSection
                  animWidthText={25.3}
                  extraClass={
                    "min-w-[100vw] w-[100vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline4Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                />
                <RabbisTimeline2
                  animWidthText={26.1}
                  extraClass={
                    "min-w-[405vw] w-[405vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline4Ref}
                />
                <HistoryQuoteSection
                  animWidthText={30.3}
                  bgImage={""}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  data={QuoteData2}
                  boxClass="max-w-[40vw]"
                  panel={timeline4Ref}
                />
              </div>
            </div>
          </div>
          {/* Fourth Panel End Here */}
          {/* Fifth Panel Start Here */}
          <div ref={timeline5Ref} className="timeline5">
            <div
              ref={panel5}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper5}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[553vw] h-screen will-change-transform`}
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG6}
                  data={IntroData6}
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
                />
                <OnlyTextSection
                  animWidthText={31.6}
                  extraClass={
                    "min-w-[32vw] w-[32vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                />
                <ArrowSliderSection
                  animWidthText={32.3}
                  extraClass={
                    "min-w-[70vw] w-[70vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={arrowSectionBG2}
                  bgClass=""
                  bgPosition="center"
                  overlayClass="hidden"
                  SlideData={SliderData2}
                  sectionImage={arrowSectionImage}
                  panel={timeline5Ref}
                />
                <ImageOnlySection
                  animWidthText={32.6}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                />
                <SingleVideoSection
                  animWidthText={33.2}
                  extraClass={
                    "min-w-[26vw] w-[26vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                />
                <TitleSection
                  animWidthText={33.4}
                  extraClass={
                    "min-w-[50vw] w-[50vw] h-screen panel-section will-change-transform"
                  }
                  leftShape={false}
                  rightShape={false}
                  panel={timeline5Ref}
                />
                <RabbisPeriodSection
                  animWidthText={34.2}
                  extraClass={
                    "min-w-screen w-screen h-screen panel-section will-change-transform"
                  }
                  panel={timeline5Ref}
                  activeMenu={activeRabbisMenu}
                  activeMenuFunction={setActiveRabbisMenu}
                />
                <RabbisTimeline3
                  animWidthText={35.1}
                  extraClass={
                    "min-w-[125vw] w-[125vw] h-screen panel-section will-change-transform"
                  }
                  bgImage={timelineBG}
                  panel={timeline5Ref}
                />
              </div>
            </div>
          </div>
          {/* Fifth Panel End Here */}
          {/* Sixth Panel Start Here */}
          <div ref={timeline6Ref} className="timeline6">
            <div
              ref={panel6}
              className="w-screen h-screen flex items-end justify-end"
            >
              <div
                ref={wrapper6}
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[837.6vw] h-screen will-change-transform`}
              >
                <Introduction2
                  animated={isAllAnimationComplete}
                  bgImage={introBG7}
                  data={IntroData7}
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
                />
                <OnlyTextSection2
                  animWidthText={37.2}
                  extraClass={
                    "min-w-[32.5vw] w-[32.5vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                />
                <ImageOnlySection2
                  animWidthText={38}
                  extraClass={
                    "min-w-[55.5vw] w-[55.5vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                />
                <RabbisTimeline4
                  extraClass={
                    "panel-section will-change-transform min-w-[210vw] w-[210vw]"
                  }
                  animWidthText={38.4}
                  panel={timeline6Ref}
                />
                <OnlyParallaxImageSection
                  extraClass={
                    "panel-section will-change-transform min-w-[61.8vw] w-[61.8vw]"
                  }
                  image={OnlyImage}
                  animWidthText={40}
                  panel={timeline6Ref}
                />
                <MarkOfTheRoad4
                  animWidthText={41.2}
                  extraClass={
                    "min-w-[130vw] w-[130vw] h-screen panel-section will-change-transform"
                  }
                  panel={timeline6Ref}
                />
                <ImageWithTextSection
                  extraClass={
                    "min-w-[137vw] w-[137vw] h-screen panel-section will-change-transform"
                  }
                  animWidthText={42.7}
                  panel={timeline6Ref}
                />
                <OnlyImageSection
                  extraClass={
                    "panel-section will-change-transform min-w-[35.8vw] w-[35.8vw]"
                  }
                  image={OnlyImage2}
                  animWidthText={43.5}
                />
                <HistoryQuoteSection2
                  extraClass={
                    "panel-section will-change-transform min-w-[75vw] w-[75vw]"
                  }
                  animWidthText={44.2}
                  bgImage={QuoteSectionBG}
                  boxClass={""}
                  data={QuoteData3}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <HistoryTimeline
        wrapperRef={history}
        progressRef={progress}
        timelineData={TimelineData}
      />
      <NotificationPopup />
      <RabbisHamburgerMenu
        extraClass=""
        data={JSON.stringify(RabbisMenu)}
        activeMenu={activeRabbisMenu}
        activeMenuFunction={setActiveRabbisMenu}
      />
      <VideoPopup videoControl={{ isVideoPopupOpen, setIsVideoPopupOpen }} />
      <SlidingArrow />
    </div>
  );
}
