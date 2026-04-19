"use client";
import BigTitleSplitLines from "@/app/ui/BigTitleSplitLines";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SlideImage2 from "../assets/images/2016.jpg";
import AlbumIcon1 from "../assets/images/album-icon1.png";
import AlbumIcon2 from "../assets/images/album-icon2.png";
import FloatImage1 from "../assets/images/float-image1.png";
import FloatImage2 from "../assets/images/float-image2.png";
import FloatImage3 from "../assets/images/float-image3.png";
import SlideImage from "../assets/images/mirrors-slide1.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Image from "next/image";
import MusicCat1 from "../assets/images/music-cat1.png";
import LoadingEffect from "../components/LoadingEffect";
import Introduction from "../components/music/Introduction";
import MirrorAudioPlayer from "../components/music/MirrorAudioPlayer";
import MirrorsSection from "../components/music/MirrorsSection";
import MusicCategoryList from "../components/music/MusicCategoryList";
import TerribleDaysSection from "../components/music/TerribleDaysSection";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const IntroData1 = [
    {
      title: `כי בא מועד`,
    },
  ];
  // Category List
  const CatList = [
    {
      title: `ימים נוראים`,
      image: MusicCat1,
    },
    {
      title: `חנוכה`,
      image: FloatImage2,
    },
    {
      title: `פורים`,
      image: MusicCat1,
    },
    {
      title: `פסח`,
      image: FloatImage2,
    },
    {
      title: `שבת`,
      image: MusicCat1,
    },
    {
      title: `מועד`,
      image: FloatImage2,
    },
    {
      title: `ימים נוראים`,
      image: MusicCat1,
    },
    {
      title: `חנוכה`,
      image: FloatImage2,
    },
    {
      title: `פורים`,
      image: MusicCat1,
    },
    {
      title: `פסח`,
      image: FloatImage2,
    },
    {
      title: `שבת`,
      image: MusicCat1,
    },
    {
      title: `מועד`,
      image: FloatImage2,
    },
  ];
  // Music Data
  const TerribleData = {
    intro: {
      title: `ימים נוראים`,
      text: `מסורת ניגוני הימים הנוראים בישיבת חברון מהווה נדבך מיוחד בזהותה הרוחנית של הישיבה.`,
      floatImage1: FloatImage1,
      floatImage2: FloatImage2,
    },
    content: {
      title: `מסורת ניגוני הימים הנוראים בישיבת חברון מהווה נדבך מיוחד בזהותה הרוחנית של הישיבה.`,
      text1: `<p>שורשיה נעוצים בעולם הליטאי הישן, שם היה רק ה"נוסח", וכמעט ולא נשמעו ניגונים בתוך התפילה עצמה, מתוך יראה צלולה ופשטות של דורות. גם בישיבה, בשנים קדמוניות, התפילה הייתה נקייה מזמר - אולם עם בואו של ר’ שלום שבדרון, ויחד עם הנוסח המסורתי של "למעלה בקודש", החלה להתרקם מסורת מחודשת: מנגינות עדינות, מחיות נפש, שבאו לא להחליף את היראה הישנה אלא לגלות את עומקה. במשך השנים נוספו ניגונים נוספים ע"י בעלי התפילה השונים.</p><p>ר’ שלום - בדרשנותו, בעורקיו הבוערים, ובכוח נשמתו - החדיר לתפילה ניגונים שנשאו בתוכן רעד של אמת, נשימה של מוסר, ומפגש של נשמה עם בוראה. וכך התקדשו ימי הדין בישיבה בנוסח מיוחד: לא נגינה רגשנית, אלא רגעים שבהם הלב נפתח ונדמה כי כל הציבור כולו מוכנס לתוך תיבה אחת של יראה ורוממות</p>`,
      text2: `<p>ברבות השנים נוסף לנוסח עוד רבדי עומק. גדולי המוסר שבישיבה - תלמידים ובעלי השקפה מעודנת, שהטביעו את חותמם בדקדוק הקולות - העניקו לו את טעמו המיוחד. הייתה זו נגינה של מחשבה, לא של קול; מנגינה של רוממות והדר, לא של רגש בלבד; כור היתוך שבו נמסכים יחד יראה, התבטלות, והמלכת הבורא ברגעים שאין דומים להם.</p><p>וכשנעימת אמירת הסליחות 'במוצאי מנוחה' נשמעת בחלל בית המדרש, נדמה שכל בית המדרש מתכסה מעטה של קדושה. ומאז ועד סוף מערכת הימים הנוראים מתרומם הציבור כולו לכתר מלכות שמים, בתשובה גדולה, בכוח מנגינה שהיא עתיקה וחדשה כאחת, ונושאת בקרבה את מה שהיה ואת מה שעודנו מבקשים להיות.</p>`,
      floatImage: FloatImage3,
    },
    musics: {
      title: `קולות`,
      albums: [
        {
          title: `סליחות`,
          icon: AlbumIcon1,
        },
        {
          title: `ראש השנה`,
          icon: AlbumIcon2,
        },
        {
          title: `יום כיפור`,
          icon: AlbumIcon2,
        },
      ],
    },
  };
  const MirrorData = {
    title: `מראות`,
    slides: [
      {
        image: SlideImage,
      },
      {
        image: SlideImage2,
      },
      {
        image: SlideImage,
      },
      {
        image: SlideImage2,
      },
      {
        image: SlideImage,
      },
    ],
  };
  const AudioPlayerData = {
    title: `יום כיפור`,
    text: `"גשים מול ארון הקודש באימה" - יום החתימה במעמד אלפי בני הישיבה ומאות בוגרים הבאים להסתופף ביום הקדוש בצילה של הישיבה הק'.`,
    tabs: [
      {
        tabTitle: `כל נדרי`,
        text: `הפיוט הנאמר בליל יו"כ בישיבה בהתרגשות ובהתעוררות רבה, שמע רבי שלום בילדותו מפי נער ב"בית היתומים דיסקין", אותו נער היה בעל יסורים שונים, ובשעה שלמד היה מזמזם לעיתים נעימה מעוררת ושובת לב, לימים "שיפץ" רבי שלום את הניגון והתאים לו את תיבות הפיוט "אמנם כן יצר סוכן בנו", פעם אמר ר' שלום לנכדו: "אה! ראוי לבכות רק כשאני נזכר באותו נער צעיר גועה בניגוניו".`,
        musics: [
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Amberlight-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון x`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Belovedchosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון y`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Wildflowers-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Spring-Flowerschosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Evening-Improvisation-with-Etherachosic.com_.mp3`,
          },
        ],
      },
      {
        tabTitle: `אמנם כן`,
        text: `הפיוט הנאמר בליל יו"כ בישיבה בהתרגשות ובהתעוררות רבה, שמע רבי שלום בילדותו מפי נער ב"בית היתומים דיסקין", אותו נער היה בעל יסורים שונים, ובשעה שלמד היה מזמזם לעיתים נעימה מעוררת ושובת לב, לימים "שיפץ" רבי שלום את הניגון והתאים לו את תיבות הפיוט "אמנם כן יצר סוכן בנו", פעם אמר ר' שלום לנכדו: "אה! ראוי לבכות רק כשאני נזכר באותו נער צעיר גועה בניגוניו".`,
        musics: [
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Amberlight-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון x`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Belovedchosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון y`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Wildflowers-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Spring-Flowerschosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Evening-Improvisation-with-Etherachosic.com_.mp3`,
          },
        ],
      },
      {
        tabTitle: `סלח נא`,
        text: `הפיוט הנאמר בליל יו"כ בישיבה בהתרגשות ובהתעוררות רבה, שמע רבי שלום בילדותו מפי נער ב"בית היתומים דיסקין", אותו נער היה בעל יסורים שונים, ובשעה שלמד היה מזמזם לעיתים נעימה מעוררת ושובת לב, לימים "שיפץ" רבי שלום את הניגון והתאים לו את תיבות הפיוט "אמנם כן יצר סוכן בנו", פעם אמר ר' שלום לנכדו: "אה! ראוי לבכות רק כשאני נזכר באותו נער צעיר גועה בניגוניו".`,
        musics: [
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Amberlight-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון x`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Belovedchosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון y`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Wildflowers-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Spring-Flowerschosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Evening-Improvisation-with-Etherachosic.com_.mp3`,
          },
        ],
      },
      {
        tabTitle: `כי הנה כחומר`,
        text: `הפיוט הנאמר בליל יו"כ בישיבה בהתרגשות ובהתעוררות רבה, שמע רבי שלום בילדותו מפי נער ב"בית היתומים דיסקין", אותו נער היה בעל יסורים שונים, ובשעה שלמד היה מזמזם לעיתים נעימה מעוררת ושובת לב, לימים "שיפץ" רבי שלום את הניגון והתאים לו את תיבות הפיוט "אמנם כן יצר סוכן בנו", פעם אמר ר' שלום לנכדו: "אה! ראוי לבכות רק כשאני נזכר באותו נער צעיר גועה בניגוניו".`,
        musics: [
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Amberlight-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון x`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Belovedchosic.com_.mp3`,
          },
          {
            title: `אמנם כן - ניגון y`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Wildflowers-chosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Spring-Flowerschosic.com_.mp3`,
          },
          {
            title: `אמנם כן`,
            link: `http://dovp7.sg-host.com/wp-content/uploads/2026/04/Evening-Improvisation-with-Etherachosic.com_.mp3`,
          },
        ],
      },
    ],
  };
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

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
  const verticalSectionRef = useRef<gsap.core.Timeline | null>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      const cleanupPageContentAnimation = setPageContentAnimation();
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
      verticalSectionRef.current = timeline;
      ScrollTrigger.refresh();

      return () => {
        cleanupPageContentAnimation?.();
        verticalSectionRef.current?.kill();
        verticalSectionRef.current = null;
      };
    }
  }, [pathname]);

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
  useGSAP(
    () => {
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
          if (userVisit === "true" && animationPlayed) {
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
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const turnTable = main.current?.querySelector(".first-intro .turntable");
    const musicCatList = main.current?.querySelector(".music-cat-wrapper");
    const introTitle2 = main.current?.querySelector(".terrible-intro h2.title");
    const introSubtitle = main.current?.querySelector(
      ".terrible-intro .subtitle",
    );
    const floatImage1 = main.current?.querySelector(
      ".terrible-intro .float-image1",
    );
    const floatImage2 = main.current?.querySelector(
      ".terrible-intro .float-image2",
    );
    const contentTitle = main.current?.querySelector(
      ".terrible-content .content-right .title",
    );
    const contentText = main.current?.querySelector(
      ".terrible-content .content-right .text",
    );
    const contentText2 = main.current?.querySelector(
      ".terrible-content .content-left .text",
    );
    const contentLink = main.current?.querySelector(
      ".terrible-content .content-left a",
    );
    const contentFloatImage = main.current?.querySelector(
      ".terrible-content .content-left .float-image",
    );

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
            return "+=" + window.innerWidth * 0.4;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    // Intro Animation
    if (floatImage1 && floatImage2) {
      gsap.set([floatImage1, floatImage2], {
        yPercent: 100,
        opacity: 0,
      });
      gsap.to([floatImage1, floatImage2], {
        yPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1.5,
        stagger: 0.2,
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 1.3;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (introTitle2) {
      const splitIntroTitle2 = TextSplitLines(introTitle2);
      gsap.set(introTitle2, {
        perspective: 400,
      });
      gsap.set(splitIntroTitle2, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitIntroTitle2, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 1.3;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    // Subtitle Animation
    if (introSubtitle) {
      const splitSubtitle = TextSplitLines(introSubtitle);
      gsap.set(introSubtitle, {
        perspective: 400,
      });
      gsap.set(splitSubtitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitSubtitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 1.3;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (floatImage1) {
      gsap.to(floatImage1, {
        x: "10vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 1.2;
          },
          end: () => {
            return "+=" + window.innerWidth * 2.2;
          },
          scrub: 2,
        },
      });
    }
    if (floatImage2) {
      gsap.to(floatImage2, {
        x: "-10vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 1.3;
          },
          end: () => {
            return "+=" + window.innerWidth * 2.3;
          },
          scrub: 2,
        },
      });
    }

    //Content Animation
    if (contentTitle) {
      const splitContentTitle = TextSplitLines(contentTitle);
      gsap.set(contentTitle, {
        perspective: 400,
      });
      gsap.set(splitContentTitle, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitContentTitle, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 2.2;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (contentText) {
      const splitContentText = TextSplitLines(contentText);
      gsap.set(contentText, {
        perspective: 400,
      });
      gsap.set(splitContentText, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitContentText, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 2.2;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (contentText2) {
      const splitContentText2 = TextSplitLines(contentText2);
      gsap.set(contentText2, {
        perspective: 400,
      });
      gsap.set(splitContentText2, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(splitContentText2, {
        yPercent: 0,
        opacity: 1,
        duration: 3,
        delay: 0,
        stagger: 0.05,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 2.3;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (contentLink) {
      gsap.set(contentLink, {
        opacity: 0,
      });
      gsap.to(contentLink, {
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 2.2;
          },
          toggleActions: "restart pause play reverse",
        },
      });
    }
    if (contentFloatImage) {
      gsap.to(contentFloatImage, {
        x: "-10vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return "+=" + window.innerWidth * 2.3;
          },
          end: () => {
            return "+=" + window.innerWidth * 3.3;
          },
          scrub: 2,
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

    return undefined;
  };

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      verticalSectionRef.current?.pause();
    } else {
      verticalSectionRef.current?.resume();
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  useGSAP(() => {
    document.body.classList.add("overflow-hidden");
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[477vw] h-screen items-center will-change-transform`}
            >
              <Introduction
                animated={isAllAnimationComplete}
                animationStatus={isAllAnimationComplete}
                data={IntroData1}
                extraClass={
                  "first-intro panel-section will-change-transform min-w-screen w-screen"
                }
              />
              <MusicCategoryList
                extraClass="music-categories panel-section will-change-transform min-w-[70vw] w-[70vw]"
                animWidthText={0}
                data={JSON.stringify(CatList)}
              />
              <TerribleDaysSection
                extraClass="terrieble-content panel-section will-change-transform min-w-[222vw] w-[222vw]"
                animWidthText={0.5}
                data={JSON.stringify(TerribleData)}
                setAudioPopup={setAudioPopup}
              />
              <MirrorsSection
                extraClass="mirrors-content panel-section will-change-transform min-w-[85vw] w-[85vw]"
                animWidthText={3.8}
                data={JSON.stringify(MirrorData)}
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
        {CatList?.map((item, index) => (
          <div
            key={index}
            className={`image-wrapper hover-image-${index} w-29 h-43.25 absolute top-0 left-0`}
          >
            <Image
              className="bg-image w-full object-cover object-center h-full"
              src={item?.image?.src}
              width="116"
              height="173"
              blurDataURL={item?.image?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
        ))}
      </div>
      <MirrorAudioPlayer
        extraClass="w-screen"
        animWidthText={0}
        audioPopup={audioPopup}
        setAudioPopup={setAudioPopup}
        data={JSON.stringify(AudioPlayerData)}
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
  );
}
