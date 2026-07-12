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
  slug: string;
  link: string;
  title: { rendered: string };
  acf: any | HomePageAcf | null;
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

export default function HomeScriptProvider({
  data,
}: {
  data: HomePageApiResponse;
}) {
  // Static Data
  const staticData = {
    id: 0,
    slug: "/",
    link: "/",
    title: { rendered: "Home" },
    acf: {
      banner_section: {
        title_1: "ישיבת",
        title_2: "חברון",
        title_3: " כנסת ישראל",
        subtitle: "מאה חמישים שנות תורה, מוסר וגדלות האדם",
        audio_music: {
          id: 73,
          title: "Adrift Among Infinite Stars",
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3",
        },
        banner_background: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/home-banner.jpg",
        },
      },
      intro_section: {
        title: "להחיות רוח שפלים ולהחיות לב נדכאים",
      },
      home_section_1: {
        text_slider: {
          text_slide_1: `<p>כאשר שאל מרן הסבא מסלבודקא את רבי ישראל סלנטר: מהי המטרה העיקרית שאתה רואה בייסוד מוסד קדוש זה?</p>
<p>ענה לו רבי ישראל: <strong>&#8220;להחיות רוח שפלים ולהחיות לב נדכאים&#8221;</strong></p>
`,
          text_slide_2: `<p>להרים רוחם של המבקשים לגדול, לטעת בעמקי הלב כוחות חיים חדשים. וכך הניח רבי ישראל את היסוד: ישיבה איננה רק מקום לימוד, אלא בית היוצר לנשמות; מקום שבו מעוררים את השפל לרוממות, ואת הנדכא, לחיים של גדלות האדם.</p>
`,
        },
        community_posts: [
          {
            ID: 418,
            post_author: "1",
            post_date: "2026-05-16 11:39:40",
            post_date_gmt: "2026-05-16 11:39:40",
            post_content: "",
            post_title: "יוצאי חברון שיח אליעזר",
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name:
              "%d7%99%d7%95%d7%a6%d7%90%d7%99-%d7%97%d7%91%d7%a8%d7%95%d7%9f-%d7%a9%d7%99%d7%97-%d7%90%d7%9c%d7%99%d7%a2%d7%96%d7%a8",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 20:07:10",
            post_modified_gmt: "2026-05-24 20:07:10",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=418",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
          {
            ID: 412,
            post_author: "1",
            post_date: "2026-05-16 11:37:21",
            post_date_gmt: "2026-05-16 11:37:21",
            post_content: "",
            post_title: "חברון",
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name: "%d7%a1%d7%9e%d7%98%d7%aa-%d7%94%d7%90%d7%a8%d7%99",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 18:47:37",
            post_modified_gmt: "2026-05-24 18:47:37",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=412",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
          {
            ID: 408,
            post_author: "1",
            post_date: "2026-05-16 11:36:42",
            post_date_gmt: "2026-05-16 11:36:42",
            post_content: "",
            post_title: "חניכי חברון",
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name:
              "%d7%97%d7%a0%d7%99%d7%9b%d7%99-%d7%97%d7%91%d7%a8%d7%95%d7%9f",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 18:09:32",
            post_modified_gmt: "2026-05-24 18:09:32",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=408",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
          {
            ID: 370,
            post_author: "1",
            post_date: "2026-05-16 09:04:44",
            post_date_gmt: "2026-05-16 09:04:44",
            post_content: "",
            post_title: "חניכי ישיבת חברון",
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name:
              "%d7%91%d7%a0%d7%99-%d7%91%d7%a8%d7%a7-%d7%91%d7%99%d7%aa-%d7%9b%d7%a0%d7%a1%d7%aa-%d7%94%d7%92%d7%93%d7%95%d7%9c",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 17:58:02",
            post_modified_gmt: "2026-05-24 17:58:02",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=370",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
          {
            ID: 416,
            post_author: "1",
            post_date: "2026-05-16 11:38:14",
            post_date_gmt: "2026-05-16 11:38:14",
            post_content: "",
            post_title: "קהילת יוצאי חברון",
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name: "%d7%a8%d7%9e%d7%95%d7%aa-%d7%90",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 19:45:02",
            post_modified_gmt: "2026-05-24 19:45:02",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=416",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
          {
            ID: 414,
            post_author: "1",
            post_date: "2026-05-16 11:37:49",
            post_date_gmt: "2026-05-16 11:37:49",
            post_content: "",
            post_title: 'חניכי ישיבת חברון – "זכרון מאיר"',
            post_excerpt: "",
            post_status: "publish",
            comment_status: "closed",
            ping_status: "closed",
            post_password: "",
            post_name:
              "%d7%a7%d7%94%d7%99%d7%9c%d7%aa-%d7%96%d7%9b%d7%a8%d7%95%d7%9f-%d7%9e%d7%90%d7%99%d7%a8",
            to_ping: "",
            pinged: "",
            post_modified: "2026-05-24 19:17:38",
            post_modified_gmt: "2026-05-24 19:17:38",
            post_content_filtered: "",
            post_parent: 0,
            guid: "https://dovp7.sg-host.com/?post_type=communities&#038;p=414",
            menu_order: 0,
            post_type: "communities",
            post_mime_type: "",
            comment_count: "0",
            filter: "raw",
          },
        ],
        background_image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/section-image.jpg",
        },
      },
      home_section_2: {
        image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/section-image2.jpg",
        },
        title: "סבא<br/> קדישא",
        foating_image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/kaddisha.jpg",
        },
        text: `<p>הסבא מסלבודקא מחולל ומייסד הישיבה שהצמיח ברוממותו דורות של תלמידים נעלים, עיצב נפשות ברוח גדלות האדם ומאז ועד היום ניכרת השפעתו בכל בית מדרש הנושא את רוחו ומורשתו</p>
`,
      },
      home_section_3: {
        image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/juniper.jpg",
        },
        title: "עוז<br/>רוח",
        text_1: "<p>מרן רבי משה מרדכי אפשטיין זצוק&#8221;ל</p>",
        text_2:
          "<p>הנהיג את הישיבה במסירות נפש מופלאה בתקופות סוערות, והנחיל לתלמידיו מושגים נעלים של עיון התורה ועמלה.</p>",
        background_image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/section-bg.jpg",
        },
      },
      home_section_4: {
        content: `<p>מיום היווסדה נושאת הישיבה הקדושה את רוח הרוממות והגדלות שנטעו מייסדיה.<br />
היא ממשיכה עד היום להבעיר את שלהבת התורה והמוסר בלב אלפי תלמידיה ובוגריה.<br />
דרכה המיוחדת &#8211; המשלבת גדלות, עומק, בהירות ושאר רוח &#8211; מלווה את הצועדים בדרכה ומעמידה שדרת תלמידי חכמים נאמנים למורשתה.</p>`,
        background_image: {
          url: "https://dovp7.sg-host.com/wp-content/uploads/2026/05/section-bg2.jpg",
        },
      },
    },
  };
  // Selector
  const page = useRef<HTMLDivElement>(null);
  // Audo Player
  const [homePageData, setHomePageData] = useState<HomePageApiResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading } = useAppState();

  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const { animationPlayed, setAnimationPlayed } = useAppState();
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Router Path
  const pathname = usePathname();
  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      return;
    }
    setHomePageData(data);
    setPageDataFetched(true);
    setIsLoading(false);
  }, [data]);

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
  }, [pageDataFetched]);

  // Container width
  //const [contWidth, setContWidth] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

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
        opacity: 1,
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
            return window.innerWidth * 2.1;
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
      wishButton?.addEventListener("click", () => {
        gsap.to(window, {
          scrollTo: window.innerWidth * 2,
          duration: 1,
          ease: "none",
        });
      });
    }
  }, [isAllAnimationComplete]);

  // Play Pause State
  const { isPlaying, setIsPlaying } = useAppState();
  function isAudioPlaying(value: { paused: any } | null) {
    return value ? !value.paused : false;
  }
  const togglePlayPause = () => {
    const audio = document.getElementById(
      "audio-player",
    ) as HTMLAudioElement | null;
    if (isAudioPlaying(audio)) {
      gsap.to(audio, {
        volume: 0,
        duration: 2,
        onComplete: () => {
          audio?.pause();
        },
      });
      setIsPlaying(false);
    } else {
      gsap.to(audio, { volume: 1, duration: 2 });
      audio?.play();
      setIsPlaying(true);
    }
  };

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

  if (!homePageData) {
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
    homePageData && (
      <main ref={page} id="page" dir="ltr" className="main relative z-10">
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
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-screen w-screen h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeBanner
                audioControl={togglePlayPause}
                animated={isAllAnimationComplete}
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen cursor-pointer"
                }
                panel={panel}
                bannerData={homePageData?.acf?.banner_section}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-[50vw] w-[50vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <IntroSection
                animWidthText={0.4}
                extraClass={
                  "panel-section will-change-transform min-w-[50vw] w-[50vw]"
                }
                introData={homePageData?.acf?.intro_section}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-[70vw] w-[70vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection1
                animWidthPost={1}
                animWidthSlider={1.4}
                extraClass={
                  "panel-section will-change-transform min-w-[70vw] w-[70vw]"
                }
                panel={panel}
                sectionData={homePageData?.acf?.home_section_1}
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
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen bg-black"
                }
                sectionData={homePageData?.acf?.home_section_2}
              />
            </Suspense>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-w-[90vw] w-[90vw] h-screen bg-black animate-pulse"></div>
              }
            >
              <HomeSection3
                animWidthImage={3.6}
                animWidthText={3.9}
                extraClass={
                  "panel-section will-change-transform min-w-[90vw] w-[90vw]"
                }
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
                extraClass={
                  "panel-section will-change-transform min-w-screen w-screen"
                }
                sectionData={homePageData?.acf?.home_section_4}
              />
            </Suspense>
          </div>
        </div>
      </main>
    )
  );
}
