"use client";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import PostImage1 from "../../assets/images/community-image.jpg";
import PostImage2 from "../../assets/images/conference-gallery1.jpg";
import PostImage3 from "../../assets/images/conference-gallery2.jpg";
import PostImage4 from "../../assets/images/conference-gallery3.jpg";
import PostImage5 from "../../assets/images/conference-gallery4.jpg";
import PostImage6 from "../../assets/images/conference-gallery5.jpg";
import NewsBG from "../../assets/images/news-bg.jpg";

import communityImage1 from "../../assets/images/community-image2.jpg";
import communityImage2 from "../../assets/images/community-image3.jpg";
import Footer from "../../components/Footer";

import CalenderIcon2 from "@/app/assets/icons/CalenderIcon2";
import CandelIcon from "@/app/assets/icons/CandelIcon";
import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import EventIcon from "@/app/assets/icons/EventIcon";
import MapMarker from "@/app/assets/icons/MapMarker";
import UserIcon2 from "@/app/assets/icons/UserIcon2";
import WishIcon2 from "@/app/assets/icons/WishIcon2";
import CommunityPageHeader from "@/app/components/CommunityPageHeader";
import EventItem from "@/app/ui/EventItem";
import PostItem2 from "@/app/ui/PostItem2";
import Image from "next/image";
import LoadingEffect from "../../components/LoadingEffect";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();

  // Section Data
  const SlideData = [
    PostImage1,
    PostImage2,
    PostImage3,
    PostImage4,
    PostImage5,
    PostImage6,
    PostImage1,
    PostImage2,
  ];
  const CommunityTabs = [
    {
      title: "אירועים",
      content: {
        title: `חנוכת אבן הפינה`,
        text1: `<p>קהילת בוגרי ישיבת חברון בפתח־תקווה מהווה בית רוחני וחברתי המאגד מאות בוגרי הישיבה הממשיכים לשאת את דרכה, סגנונה ואורח חייה.</p>`,
        image1: communityImage1,
        text2: `<p>קהילת בוגרי ישיבת חברון בפתח־תקווה מהווה בית רוחני וחברתי המאגד מאות בוגרי הישיבה הממשיכים לשאת את דרכה, סגנונה ואורח חייה של “חברון” בתוך מרקם החיים העירוני. הקהילה הוקמה במטרה לשמר את רוח בית המדרש גם מחוץ לכותלי הישיבה, וליצור מסגרת תורנית וחברתית המאפשרת לימוד קבוע, תפילות בנוסח הישיבה, שיעורים, חבורות, פעילות קהילתית וחיזוק הדדי בין הבוגרים ומשפחותיהם.</p><p>בית המדרש המרכזי של הקהילה, “היכל יחזקאל”, משמש מוקד של תורה, הדרכה וחיי קהילה פעילים — מקום שבו נשמרת שפת הלימוד, דייקנות ההלכה והאווירה החברונאית הידועה באיפוקה, בעומקה ובגדלותה. לצד עמל התורה, הקהילה פועלת בתחומי חסד, חינוך, חיזוק המשפחות הצעירות והעמקת הקשר בין הדורות.</p><p>כך נבנית לה שכבה יציבה של בוגרי הישיבה הפזורים בעיר — אנשי הוראה, רבנים, אברכים, אנשי חינוך ואנשי ציבור — הממשיכים להאיר את מורשת ישיבת חברון בפ"ת, נאמנים לתפקידם: להוסיף בניין של תורה, דרך ארץ והנהגה בכל מקום שבו הם חיים ופועלים.</p>`,
        image2: communityImage2,
      },
    },
    {
      title: "חדשות",
      content: {
        title1: `ה׳ בחשוון פ״ו`,
        text1: `<p>במעמד האדיר בראשות ראשי ישיבת חברון, רבני העיר, ראש העיר ומאות תושבים בביהמ"ד חברון היכל יחזקאל פ"ת. מדברי רה"י הגר"ד כהן: "ההרגשה שמגיעים לכאן זה אשרי העם שה' אלוקיו. העמידו פה ביהמ"ד שמתפקד 24 שעות ברוח הישיבה ובמסורת שקיבלנו מרבותינו ובעז"ה המקום ימשיך לגדול ולפרוח". מדברי רה"י הגר"י חברוני: "אמת מארץ תצמח - כשהאמת קיימת, לא ניתן להסתירה או לפגוע בה וכמובן שלא לבטלה ולהתעלם ממנה, וזוהי דרך הישיבה המסורה לנו מדורי דורות"</p>`,
        image1: communityImage1,
        highlight: {
          text: `מדברי הגר"ד כהן במעמד: ההרגשה שמגיעים לכאן זה אשרי העם שה' אלוקיו. העמידו פה ביהמ"ד שמתפקד 24 שעות ברוח הישיבה ובמסורת שקיבלנו מרבותינו ובעז"ה המקום ימשיך לגדול ולפרוח"`,
          image: communityImage1,
        },
        title2: `ל׳ בתשרי פ״ו`,
        text2: `<p>במעמד נשאו ראשי הישיבה דברים בענייני דיומא ודברי חיזוק לקהילה כשהם מדגישים כי המקום המהווה המשך ישיר לישיבת חברון ומשמר את מסורת ורוח הישיבה ואת האווירה המיוחדת שלה. השנה למעמד היה נופך מיוחד על רקע הבחירות המוניציפאליות הקרבות ובאות. בואם של ראשי הישיבה הוא גיבוי מוחלט ועמידה איתנה לטובת מהלכי וצרכי הקהילות בעיר כפי שהזכיר הגר"י חברוני בדבריו ששלום מושג רק בדרך האמת כאשר כל אחד מכיר את מקומו ומקבל את המגיע לו על פי אמת מידה אמיתית וישרה.</p>`,
        image2: communityImage2,
      },
    },
    {
      title: "עדכונים",
      content: {
        news: [
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
        ],
        event: [
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
          {
            title: `י״ג בחשוון תשפ״ו`,
            text: `מזל טוב לרב אשר שוורץ להולדת הנכדה`,
            info: `בוגר מחזור כ״ה `,
          },
        ],
      },
    },
  ];
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const communityLoader = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load Page
  useGSAP(
    () => {
      if (typeof window !== "undefined" && main) {
        document.fonts.ready.then(() => {
          // Selectors
          const header = main.current?.querySelector(".community-page-header");
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
            if (communityLoader.current) {
              tl.to(communityLoader.current, {
                opacity: 0,
                ease: "none",
                duration: 1,
                delay: 1,
              });
              tl.to(communityLoader.current, {
                visibility: "hidden",
                ease: "none",
                duration: 0,
                delay: 0,
              });
            }
            if (main.current) {
              tl.to(main.current, {
                opacity: 1,
                ease: "none",
                duration: 0.5,
                delay: 0,
              });
            }
            if (header) {
              tl.to(header, {
                opacity: 1,
                ease: "none",
                duration: 1,
              });
            }
            if (page.current) {
              tl.to(
                page.current,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=0.5",
              );
            }
          }
        });
      }
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // Set Page Content Animation
  //   const setPageContentAnimation = () => {
  //     // Page Content Animation
  //     const bordeLine = main.current?.querySelector(".border-line");
  //     if (bordeLine) {
  //       gsap.set(bordeLine, {
  //         scaleY: 0,
  //       });
  //       gsap.to(bordeLine, {
  //         scaleY: 1,
  //         duration: 1,
  //         delay: 0.5,
  //         ease: "expo.inOut",
  //       });
  //     }
  //     // Post title
  //     const postTitle = main.current?.querySelector(
  //       ".news-left-content .content-wrapper .post-title",
  //     );
  //     if (postTitle) {
  //       // Split Title 1
  //       let splitTitle;
  //       splitTitle = TextSplitLines2(postTitle);
  //       gsap.set(postTitle, {
  //         perspective: 400,
  //       });
  //       gsap.set(splitTitle, {
  //         yPercent: 150,
  //         opacity: 0,
  //       });
  //       gsap.to(splitTitle, {
  //         scrollTrigger: postTitle,
  //         yPercent: 0,
  //         opacity: 1,
  //         duration: 2,
  //         delay: 0,
  //         stagger: 0.03,
  //         ease: "expo.inOut",
  //       });
  //     }
  //     // Post Texts
  //     const allParagraph = main.current?.querySelectorAll(
  //       ".news-left-content .content-wrapper .content p:not(:empty)",
  //     );
  //     if (allParagraph) {
  //       allParagraph.forEach((paragraph: any) => {
  //         // Split Text
  //         let splitText;
  //         splitText = TextSplitLines(paragraph);
  //         gsap.set(paragraph, {
  //           perspective: 400,
  //         });
  //         gsap.set(splitText, {
  //           yPercent: 150,
  //           opacity: 0,
  //         });
  //         gsap.to(splitText, {
  //           scrollTrigger: paragraph,
  //           yPercent: 0,
  //           opacity: 1,
  //           duration: 2,
  //           delay: 0,
  //           stagger: 0.03,
  //           ease: "expo.inOut",
  //         });
  //       });
  //     }

  //     // Post Text Blockquote
  //     const allBlockQuote = main.current?.querySelectorAll(
  //       ".news-left-content .content-wrapper .content blockquote",
  //     );
  //     if (allBlockQuote) {
  //       allBlockQuote.forEach((blockquote: any) => {
  //         // Split Text
  //         let splitText;
  //         splitText = TextSplitLines(blockquote);
  //         gsap.set(blockquote, {
  //           perspective: 400,
  //           opacity: 0,
  //         });
  //         gsap.set(splitText, {
  //           yPercent: 150,
  //           opacity: 0,
  //         });
  //         gsap.to(blockquote, {
  //           opacity: 1,
  //           duration: 0.5,
  //           delay: 0,
  //           ease: "none",
  //         });
  //         gsap.to(splitText, {
  //           scrollTrigger: blockquote,
  //           yPercent: 0,
  //           opacity: 1,
  //           duration: 2,
  //           delay: 0,
  //           stagger: 0.03,
  //           ease: "expo.inOut",
  //         });
  //       });
  //     }
  //   };

  // Set Body Overflow Hidden
  useGSAP(() => {
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

  // Sidebar Animation
  useGSAP(() => {
    const sidebar = main.current?.querySelector(".community-sidebar");
    const openBtn = main.current?.querySelector(".sidebar-open");
    const content = main.current?.querySelector(".community-content");
    // Sidebar
    if (sidebar && content && openBtn) {
      if (isSidebarOpen) {
        // Sidebar
        gsap.to(sidebar, {
          x: 0,
          duration: 1,
          ease: "expo.inOut",
        });
        // Content
        gsap.to(content, {
          width: "calc(100% - 450px)",
          duration: 1,
          ease: "expo.inOut",
        });
        // Open Button
        gsap.to(openBtn, {
          xPercent: 0,
          opacity: 0,
          duration: 1,
          ease: "expo.inOut",
        });
      } else {
        gsap.to(sidebar, {
          x: "-100%",
          duration: 1,
          ease: "expo.inOut",
        });
        gsap.to(content, {
          width: "100%",
          duration: 1,
          ease: "expo.inOut",
        });
        gsap.to(openBtn, {
          xPercent: 100,
          opacity: 1,
          duration: 1,
          ease: "expo.inOut",
        });
      }
    }
  }, [isSidebarOpen]);

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
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
    <div ref={main} id="main" className="relative">
      <LoadingEffect animated={setAnimationPlayed} />
      <CommunityPageHeader animationStatus={isAllAnimationComplete} />
      <SmoothWrapper>
        <main
          ref={page}
          id="page"
          dir="rtl"
          className="main relative overflow-hidden z-10 opacity-0"
        >
          <section className="single-communities bg-[#091B24] min-h-screen flex mt-25 relative">
            <div className="community-content w-[calc(100%-450px)] h-auto bg-[#F5F0EB] text-[#091B24] relative z-40">
              <div className="community-info flex border-b border-[#000000] border-opacity-50">
                <div className="location flex py-3 px-3 gap-x-3 w-[32%]">
                  <div className="icon w-6 h-6 flex items-center justify-center mt-1">
                    <MapMarker />
                  </div>
                  <div className="text text-[#091B24] text-[28px] leading-[1em] w-[calc(100%-32px)]">
                    <p>
                      <strong>כתובת:</strong> טרומפלדור 64, מרכז העיר פתח תקווה
                    </p>
                  </div>
                </div>
                <div className="date flex py-3 px-3 gap-x-3 border-r border-[#000000] border-opacity-50 w-[32%]">
                  <div className="icon w-6 h-6 flex items-center justify-center mt-1">
                    <CalenderIcon2 />
                  </div>
                  <div className="text text-[#091B24] text-[28px] leading-[1em] w-[calc(100%-32px)]">
                    <p>
                      <strong>נוסד:</strong> בשבת קודש פרשת וירא, תש"ע
                    </p>
                  </div>
                </div>
                <div className="people flex py-3 px-3 gap-x-3 border-r border-[#000000] border-opacity-50 w-[36%]">
                  <div className="icon w-6 h-6 flex items-center justify-center mt-1">
                    <UserIcon2 />
                  </div>
                  <div className="text text-[#091B24] text-[28px] leading-[1em] w-[calc(100%-32px)]">
                    <p>
                      <strong>מס' משפחות:</strong> הקהילה מונה 250 משפחות בוגרי
                      הישיבה ועוד עשרות רבות של משפחות תושבי המקום.
                    </p>
                  </div>
                </div>
              </div>
              <div className="community-description flex gap-x-[4.4vw]">
                <div className="description-image w-[50%]">
                  <Swiper
                    className="w-full border-b-4 border-[#C3A13F]"
                    ref={swiperRef}
                    slidesPerView={1}
                  >
                    {SlideData?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="w-full h-[50vh]">
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={item.src}
                              width={item.width}
                              height={item.height}
                              alt="Community Image"
                              blurDataURL={item.blurDataURL}
                              placeholder="blur"
                              loading="lazy"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="custom-pagination flex items-center justify-center gap-2 mt-5">
                    {SlideData?.map((item, index) => (
                      <div
                        key={index}
                        className="pagination-item w-7.5 h-22.5 rounded-full bg-[#C3A13F] cursor-pointer"
                        onClick={() => {
                          swiperRef.current?.swiper.slideTo(index);
                        }}
                      >
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={item.src}
                          width={90}
                          height={90}
                          alt="Community Image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="description-text w-[50%] pt-[7vh] pl-[2.9vw] pb-[5vh]">
                  <h1 className="text-[103px] leading-[77%] font-bold">
                    חברון היכל יחזקאל פתח תקווה
                  </h1>
                  <h4 className="text-[44px] leading-[1em] mt-3">מרכז העיר</h4>
                  <div className="text mt-10 text-[28px] leading-[1em] font-bold">
                    <p>
                      הקהילה מהווה מבצר של תורה ותפילה. מיום היווסדה מלווים את
                      הקהילה ראשי הישיבה שליט"א בעצה ותושיה ובאים מעת לעת
                      לשיעורים ומעמדות מיוחדים. בבית המדרש פועלים קרוב לעשרים
                      מסגרות שונות של כוללי אברכים לאורך כל שעות היום והלילה
                      וקול התורה מהדהד בכל עוז.
                    </p>
                  </div>
                </div>
              </div>
              <div className="community-tab-content flex flex-col items-start justify-start mt-10">
                <div className="tab-head border-t border-b border-[#000000] border-opacity-50 w-full flex items-center justify-start">
                  {CommunityTabs?.map((tab, index) => (
                    <button
                      key={index}
                      className={`tab-head-item w-full text-[28px] leading-[1em] p-6 cursor-pointer ${activeTab === index ? "bg-[#091B24] text-white" : "text-[#091B24]"} transition-colors duration-300 ${index !== 0 && "border-r border-black"}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
                <div className="tab-content px-[4.16vw] py-[8.6vh]">
                  <div className="tab-content-wrapper">
                    {CommunityTabs[activeTab] && activeTab === 0 && (
                      <div className="tab-content-item flex flex-col items-start justify-start text-[21px] leading-[1.4em]">
                        {CommunityTabs[activeTab].content.title && (
                          <h2 className="text-[33px] leading-[90%] font-bold">
                            {parse(CommunityTabs[activeTab].content.title)}
                          </h2>
                        )}
                        {CommunityTabs[activeTab].content.text1 && (
                          <div className="text1 mt-8.5">
                            {parse(CommunityTabs[activeTab].content.text1)}
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.image1 && (
                          <div className="image1 mt-9 w-[40vw] h-[66vh]">
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={CommunityTabs[activeTab].content.image1.src}
                              width={
                                CommunityTabs[activeTab].content.image1.width
                              }
                              height={
                                CommunityTabs[activeTab].content.image1.height
                              }
                              alt="Community Image"
                              blurDataURL={
                                CommunityTabs[activeTab].content.image1
                                  .blurDataURL
                              }
                              placeholder="blur"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.text2 && (
                          <div className="text1 mt-9">
                            {parse(CommunityTabs[activeTab].content.text2)}
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.image2 && (
                          <div className="image1 mt-9 w-[40vw] h-[66vh]">
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={CommunityTabs[activeTab].content.image2.src}
                              width={
                                CommunityTabs[activeTab].content.image2.width
                              }
                              height={
                                CommunityTabs[activeTab].content.image2.height
                              }
                              alt="Community Image"
                              blurDataURL={
                                CommunityTabs[activeTab].content.image2
                                  .blurDataURL
                              }
                              placeholder="blur"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {CommunityTabs[activeTab] && activeTab === 1 && (
                      <div className="tab-content-item flex flex-col items-start justify-start text-[21px] leading-[1.4em]">
                        {CommunityTabs[activeTab].content.title1 && (
                          <h2 className="text-[33px] leading-[90%] font-bold">
                            {parse(CommunityTabs[activeTab].content.title1)}
                          </h2>
                        )}
                        {CommunityTabs[activeTab].content.text1 && (
                          <div className="text1 mt-8.5">
                            {parse(CommunityTabs[activeTab].content.text1)}
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.image1 && (
                          <div className="image1 mt-9 w-[40vw] h-[66vh]">
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={CommunityTabs[activeTab].content.image1.src}
                              width={
                                CommunityTabs[activeTab].content.image1.width
                              }
                              height={
                                CommunityTabs[activeTab].content.image1.height
                              }
                              alt="Community Image"
                              blurDataURL={
                                CommunityTabs[activeTab].content.image1
                                  .blurDataURL
                              }
                              placeholder="blur"
                              loading="lazy"
                            />
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.highlight && (
                          <div className="highlight mt-12 mb-12 p-10 bg-[#BBA588]">
                            {CommunityTabs[activeTab].content.highlight
                              .text && (
                              <p className="text-[21px] leading-[1.4em]">
                                {parse(
                                  CommunityTabs[activeTab].content.highlight
                                    .text,
                                )}
                              </p>
                            )}
                            {CommunityTabs[activeTab].content.highlight
                              .image && (
                              <div className="highlight-image mt-10 w-[40vw] h-[66vh]">
                                <Image
                                  className="w-full h-full object-cover object-center"
                                  src={
                                    CommunityTabs[activeTab].content.highlight
                                      .image.src
                                  }
                                  width={
                                    CommunityTabs[activeTab].content.highlight
                                      .image.width
                                  }
                                  height={
                                    CommunityTabs[activeTab].content.highlight
                                      .image.height
                                  }
                                  alt="Community Image"
                                  blurDataURL={
                                    CommunityTabs[activeTab].content.highlight
                                      .image.blurDataURL
                                  }
                                  placeholder="blur"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.title2 && (
                          <h2 className="text-[33px] leading-[90%] font-bold">
                            {parse(CommunityTabs[activeTab].content.title2)}
                          </h2>
                        )}
                        {CommunityTabs[activeTab].content.text2 && (
                          <div className="text1 mt-8.5">
                            {parse(CommunityTabs[activeTab].content.text2)}
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.image2 && (
                          <div className="image2 mt-9 w-[40vw] h-[66vh]">
                            <Image
                              className="w-full h-full object-cover object-center"
                              src={CommunityTabs[activeTab].content.image1.src}
                              width={
                                CommunityTabs[activeTab].content.image2.width
                              }
                              height={
                                CommunityTabs[activeTab].content.image2.height
                              }
                              alt="Community Image"
                              blurDataURL={
                                CommunityTabs[activeTab].content.image2
                                  .blurDataURL
                              }
                              placeholder="blur"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    {CommunityTabs[activeTab] && activeTab === 2 && (
                      <div className="tab-content-item flex flex-col items-start justify-start text-[21px] leading-[1.4em] gap-y-[8.5vh]">
                        {CommunityTabs[activeTab].content.news && (
                          <div className="news flex flex-col items-start justify-start gap-y-[6.8vh]">
                            <div className="news-icon w-10 h-auto">
                              <WishIcon2 />
                            </div>
                            <div className="news-list flex flex-wrap items-start justify-start gap-y-[5vh] gap-x-[3vw] w-full text-[22px] leading-[1em] text-[#C3A13F]">
                              {CommunityTabs[activeTab].content.news.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      backgroundImage: `url(${NewsBG.src})`,
                                    }}
                                    className="news-item flex flex-col gap-y-2 py-8 px-13 w-[calc((100%-3vw)/2)] max-w-110 bg-no-repeat bg-contain bg-right"
                                  >
                                    <p className="font-bold">{item.text}</p>
                                    <p>{item.info}</p>
                                    <h3 className="text-[#5A7C4E] font-bold">
                                      {item.title}
                                    </h3>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                        {CommunityTabs[activeTab].content.event && (
                          <div className="news flex flex-col items-start justify-start gap-y-[6.8vh]">
                            <div className="news-icon w-10 h-auto">
                              <CandelIcon />
                            </div>
                            <div className="news-list flex flex-wrap items-start justify-start gap-y-[5vh] gap-x-[3vw] w-full text-[22px] leading-[1em] text-[#C3A13F]">
                              {CommunityTabs[activeTab].content.event.map(
                                (item, index) => (
                                  <div
                                    key={index}
                                    className="news-item bg-white flex flex-col gap-y-2 py-8 px-13 w-[calc((100%-3vw)/2)]max-w-110"
                                  >
                                    <p className="font-bold">{item.text}</p>
                                    <p>{item.info}</p>
                                    <h3 className="text-[#5A7C4E] font-bold">
                                      {item.title}
                                    </h3>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="community-sidebar bg-[#091B24] text-[#FBF4E6] w-112.5 h-full py-19 px-10 absolute top-0 left-0 z-50">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="sidebar-close w-6 h-6 p-1 absolute top-4 right-4 cursor-pointer z-20"
              >
                <CloseIcon2 className="w-full h-auto" />
              </button>
              <button
                className="sidebar-open absolute top-25 right-0 bg-[#091B24] text-white p-2 cursor-pointer z-20 w-8 h-10 flex items-center justify-center"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="block w-3 h-3 border-t border-r border-white rotate-45"></span>
              </button>
              <div className="sidebar-wrapper">
                <h2 className="text-[#D1A941] text-[65px] leading-[86%]">
                  קול מבין הסטנדרים
                </h2>
                <div className="related-news mt-[9.4vh]">
                  <div className="icon mb-7 w-10 h-auto">
                    <WishIcon2 />
                  </div>
                  <div className="news-list">
                    <PostItem2
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={"בוגר מחזור כ״ה "}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                      buttonColor={"bg-[#C3A13F] hover:bg-[#c59811]"}
                    />
                    <PostItem2
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={"בוגר מחזור כ״ה "}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                      buttonColor={"bg-[#5A7C4E] hover:bg-[#2b6018]"}
                    />
                    <PostItem2
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={"בוגר מחזור כ״ה "}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                      buttonColor={"bg-[#C3A13F] hover:bg-[#c59811]"}
                    />
                    <PostItem2
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={"בוגר מחזור כ״ה "}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                      buttonColor={"bg-[#5A7C4E] hover:bg-[#2b6018]"}
                    />
                  </div>
                </div>
                <div className="related-event mt-[9.4vh]">
                  <div className="icon mb-7 w-12 h-auto">
                    <EventIcon />
                  </div>
                  <div className="event-list">
                    <EventItem
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={`במעמד נשאו ראשי הישיבה דברים בענייני דיומא ודברי חיזוק לקהילה כשהם מדגישים כי המקום המהווה...`}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                    />
                    <EventItem
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={`במעמד נשאו ראשי הישיבה דברים בענייני דיומא ודברי חיזוק לקהילה כשהם מדגישים כי המקום המהווה...`}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                    />
                    <EventItem
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={`במעמד נשאו ראשי הישיבה דברים בענייני דיומא ודברי חיזוק לקהילה כשהם מדגישים כי המקום המהווה...`}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                    />
                    <EventItem
                      title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                      content={`במעמד נשאו ראשי הישיבה דברים בענייני דיומא ודברי חיזוק לקהילה כשהם מדגישים כי המקום המהווה...`}
                      subtitle={"י״ג בחשוון תשפ״ו"}
                      buttonLabel={"קהילת בני ברק"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <div
        ref={communityLoader}
        className="community-loader fixed top-0 left-0 w-full h-full bg-[#C3A13F] flex items-center justify-center z-999"
      >
        <h2 className="loader-heading text-[130px] leading-[80%] font-bold text-[#091B24] text-center">
          חברון
          <br />
          היכל יחזקאל
          <br />
          פתח תקווה
        </h2>
      </div>
    </div>
  );
}
