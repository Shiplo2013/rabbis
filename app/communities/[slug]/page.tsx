"use client";
import parse from "html-react-parser";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsBG from "../../assets/images/news-bg.jpg";

import Footer from "../../components/Footer";

import CalenderIcon2 from "@/app/assets/icons/CalenderIcon2";
import CandelIcon from "@/app/assets/icons/CandelIcon";
import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import EventIcon from "@/app/assets/icons/EventIcon";
import MapMarker from "@/app/assets/icons/MapMarker";
import UserIcon2 from "@/app/assets/icons/UserIcon2";
import WishIcon2 from "@/app/assets/icons/WishIcon2";
import CommunityPageHeader from "@/app/components/CommunityPageHeader";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import EventItem from "@/app/ui/EventItem";
import PostItem2 from "@/app/ui/PostItem2";
import Image from "next/image";
import LoadingEffect from "../../components/LoadingEffect";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type CommunityPost = {
  id: number;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  acf: any;
};

export default function Page() {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [communityTabs, setCommunityTabs] = useState<
    Array<{ title: string; content: any }>
  >([]);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadRabbisPageData = async () => {
      try {
        const response = await fetch(`/api/communities/posts/${slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load community page data.");
        }

        const data = await response.json();

        if (isMounted) {
          setPost(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setPageDataFetched(true);
      }
    };

    loadRabbisPageData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) {
      return;
    }
    setPageDataFetched(true);
    console.log("Community post Data:", post);
    setCommunityTabs([
      {
        title: "אירועים",
        content: post?.acf?.community_events,
      },
      {
        title: "חדשות",
        content: post?.acf?.community_news,
      },
      {
        title: "עדכונים",
        content: post?.acf?.community_updates,
      },
    ]);
  }, [pageDataFetched]);

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
    { scope: main, dependencies: [pageDataFetched] },
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

  useEffect(() => {
    console.log("Community Tabs:", communityTabs);
  }, [communityTabs]);
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
                      <strong>כתובת:</strong>{" "}
                      {parse(post?.acf?.informations?.location || "")}
                    </p>
                  </div>
                </div>
                <div className="date flex py-3 px-3 gap-x-3 border-r border-[#000000] border-opacity-50 w-[32%]">
                  <div className="icon w-6 h-6 flex items-center justify-center mt-1">
                    <CalenderIcon2 />
                  </div>
                  <div className="text text-[#091B24] text-[28px] leading-[1em] w-[calc(100%-32px)]">
                    <p>
                      <strong>נוסד:</strong>{" "}
                      {parse(post?.acf?.informations?.established || "")}
                    </p>
                  </div>
                </div>
                <div className="people flex py-3 px-3 gap-x-3 border-r border-[#000000] border-opacity-50 w-[36%]">
                  <div className="icon w-6 h-6 flex items-center justify-center mt-1">
                    <UserIcon2 />
                  </div>
                  <div className="text text-[#091B24] text-[28px] leading-[1em] w-[calc(100%-32px)]">
                    <p>
                      <strong>מס' משפחות:</strong>{" "}
                      {parse(post?.acf?.informations?.number_of_families || "")}
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
                    {post?.acf?.image_gallery?.map(
                      (item: any, index: number) => {
                        return (
                          <SwiperSlide key={index}>
                            <div className="w-full h-[50vh]">
                              <Image
                                className="w-full h-full object-cover object-center"
                                src={item.url || item.src}
                                width={735}
                                height={464}
                                alt="Community Image"
                                blurDataURL={CreateShimmerDataUrl(735, 464)}
                                placeholder="blur"
                                loading="lazy"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      },
                    )}
                  </Swiper>
                  <div className="custom-pagination flex items-center justify-center gap-2 mt-5">
                    {post?.acf?.image_gallery?.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="pagination-item w-7.5 h-22.5 rounded-full bg-[#C3A13F] cursor-pointer"
                          onClick={() => {
                            swiperRef.current?.swiper.slideTo(index);
                          }}
                        >
                          <Image
                            className="w-full h-full object-cover object-center"
                            src={item.url || item.src}
                            width={90}
                            height={90}
                            alt="Community Image"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="description-text w-[50%] pt-[7vh] pl-[2.9vw] pb-[5vh]">
                  <h1 className="text-[103px] leading-[77%] font-bold">
                    {parse(post?.title || "")}
                  </h1>
                  {post?.acf?.subtitle && (
                    <h4 className="text-[44px] leading-[1em] mt-3">
                      {parse(post?.acf?.subtitle || "")}
                    </h4>
                  )}
                  {post?.acf?.content && (
                    <div className="text mt-10 text-[28px] leading-[1em] font-bold">
                      {parse(post?.acf?.content || "")}
                    </div>
                  )}
                </div>
              </div>
              <div className="community-tab-content flex flex-col items-start justify-start mt-10">
                <div className="tab-head border-t border-b border-[#000000] border-opacity-50 w-full flex items-center justify-start">
                  {communityTabs.map((tab, index) => (
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
                    {communityTabs[activeTab] && (
                      <div className="tab-content-item flex flex-col items-start justify-start text-[21px] leading-[1.4em]">
                        {Array.isArray(communityTabs[activeTab]?.content) &&
                          communityTabs[activeTab]?.content?.map(
                            (item: any, index: number) => {
                              // Debug: log item to see actual ACF field keys
                              console.log("Tab content item:", item);
                              // Section Title
                              if (item.field_type === "title") {
                                return (
                                  <h2
                                    key={index}
                                    className="text-[33px] leading-[90%] font-bold"
                                  >
                                    {parse(item?.content?.title || "")}
                                  </h2>
                                );
                              }
                              // Section Text
                              if (item.field_type === "text") {
                                return (
                                  <div key={index} className="text1 mt-8.5">
                                    {parse(item?.content?.text)}
                                  </div>
                                );
                              }
                              // Section Image
                              if (item.field_type === "image") {
                                return (
                                  <div
                                    key={index}
                                    className="image1 mt-9 w-[40vw] h-[66vh]"
                                  >
                                    <Image
                                      className="w-full h-full object-cover object-center"
                                      src={
                                        item?.content?.image?.url ||
                                        item?.content?.image?.src
                                      }
                                      width={758}
                                      height={610}
                                      alt="Community Image"
                                      blurDataURL={CreateShimmerDataUrl(
                                        758,
                                        610,
                                      )}
                                      placeholder="blur"
                                      loading="lazy"
                                    />
                                  </div>
                                );
                              }
                              // Section Content 1
                              if (item.field_type === "content1") {
                                return (
                                  <div key={index} className="content1">
                                    <h2 className="text-[33px] leading-[90%] font-bold">
                                      {parse(item?.news_content?.title || "")}
                                    </h2>
                                    <div className="text1 mt-8.5">
                                      {parse(item?.news_content?.text || "")}
                                    </div>
                                    <div className="image1 mt-9 w-[40vw] h-[66vh]">
                                      <Image
                                        className="w-full h-full object-cover object-center"
                                        src={
                                          item?.news_content?.image?.url ||
                                          item?.news_content?.image?.src
                                        }
                                        width={800}
                                        height={480}
                                        alt="Community Image"
                                        blurDataURL={CreateShimmerDataUrl(
                                          800,
                                          480,
                                        )}
                                        placeholder="blur"
                                        loading="lazy"
                                      />
                                    </div>
                                  </div>
                                );
                              }
                              // Section Content 2
                              if (item.field_type === "content2") {
                                return (
                                  <div
                                    key={index}
                                    className="highlight mt-12 mb-12 p-10 bg-[#BBA588]"
                                  >
                                    {item?.news_content?.text && (
                                      <div className="text-[21px] leading-[1.4em]">
                                        {parse(item?.news_content?.text)}
                                      </div>
                                    )}
                                    {item?.news_content?.image && (
                                      <div className="highlight-image mt-10 w-[40vw] h-[66vh]">
                                        <Image
                                          className="w-full h-full object-cover object-center"
                                          src={
                                            item?.news_content?.image.url ||
                                            item?.news_content?.image.src
                                          }
                                          width={800}
                                          height={474}
                                          alt="Community Image"
                                          blurDataURL={CreateShimmerDataUrl(
                                            800,
                                            474,
                                          )}
                                          placeholder="blur"
                                          loading="lazy"
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                            },
                          )}
                        {!Array.isArray(communityTabs[activeTab]?.content) && (
                          <div className="event-news-wrapper flex flex-col items-start justify-start gap-y-[8.5vh] w-full">
                            {communityTabs[activeTab]?.content?.updates_1 && (
                              <div className="news flex flex-col items-start justify-start gap-y-[6.8vh]">
                                <div className="news-icon w-10 h-auto">
                                  <WishIcon2 />
                                </div>
                                <div className="news-list flex flex-wrap items-start justify-start gap-y-[5vh] gap-x-[3vw] w-full text-[22px] leading-[1em] text-[#C3A13F]">
                                  {communityTabs[
                                    activeTab
                                  ]?.content?.updates_1?.map(
                                    (item: any, index: number) => (
                                      <div
                                        key={index}
                                        style={{
                                          backgroundImage: `url(${NewsBG.src})`,
                                        }}
                                        className="news-item flex flex-col gap-y-2 py-8 px-13 w-[calc((100%-3vw)/2)] max-w-110 bg-no-repeat bg-contain bg-right"
                                      >
                                        {item.title && (
                                          <p className="font-bold">
                                            {item.title}
                                          </p>
                                        )}
                                        {item.subtitle && (
                                          <p>{item.subtitle}</p>
                                        )}
                                        {item.date && (
                                          <h3 className="text-[#5A7C4E] font-bold">
                                            {item.date}
                                          </h3>
                                        )}
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                            {communityTabs[activeTab]?.content?.updates_2 && (
                              <div className="news flex flex-col items-start justify-start gap-y-[6.8vh]">
                                <div className="news-icon w-10 h-auto">
                                  <CandelIcon />
                                </div>
                                <div className="news-list flex flex-wrap items-start justify-start gap-y-[5vh] gap-x-[3vw] w-full text-[22px] leading-[1em] text-[#C3A13F]">
                                  {communityTabs[
                                    activeTab
                                  ].content.updates_2.map(
                                    (item: any, index: number) => (
                                      <div
                                        key={index}
                                        className="news-item bg-white flex flex-col gap-y-2 py-8 px-13 w-[calc((100%-3vw)/2)] max-w-110"
                                      >
                                        {item.title && (
                                          <p className="font-bold">
                                            {item.title}
                                          </p>
                                        )}
                                        {item.subtitle && (
                                          <p>{item.subtitle}</p>
                                        )}
                                        {item.date && (
                                          <h3 className="text-[#5A7C4E] font-bold">
                                            {item.date}
                                          </h3>
                                        )}
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
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
