"use client";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import PostImage1 from "../../assets/images/single-news-image.jpg";

import SinglePostImage from "@/app/ui/news/SinglePostImage";
import NewsSingleVideo from "@/app/ui/NewsSingleVideo";
import PostNavigation from "@/app/ui/PostNavigation";
import parse from "html-react-parser";
import PrevPostImage from "../../assets/images/prev-post.jpg";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type NewsPostData = {
  title: string;
  content: string;
  slug: string;
  id: number;
  acf?: {
    gallery_title?: string;
    gallery: {
      type?: string;
      image?: any;
      video?: any;
      caption?: string;
    }[];
  };
};

type NavigationData = {
  prevPost: {
    title: string;
    link: string;
    image: any;
  };
  nextPost: {
    title: string;
    link: string;
    image: any;
  } | null;
};

export default function SingleNewsScriptProvider({
  data,
}: {
  data: { post: NewsPostData; navigationData: NavigationData };
}) {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<NewsPostData | null>(null);
  const [navigationData, setNavigationData] = useState<NavigationData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);

  // Animation State
  const { isLoading, setIsLoading, animationPlayed } = useAppState();
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Slider State
  const swiperRef = useRef<SwiperClass | null>(null);
  const [sliderHovered, setSliderHovered] = useState(false);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const newsContentRef = useRef<HTMLDivElement>(null);

  // Page Data
  const NewsPostsData = {
    title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
    summary: `<p> <strong> עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם. </strong> </p> <p> בוגרי הישיבה ובני התורה התכנסו בימים האחרונים לעצרות מספד והתעוררות, לזכרם של בוגרי הישיבה החשובים אשר נסתלקו לאחרונה לבית עולמם, למגינת לב כל מוקיריהם. העצרות נערכו ברוב עם, באווירה של כבוד התורה וחיזוק רב, תוך העלאת דמויותיהם המאירות ופועלם הרב. </p> <p> <blockquote> בירושלים נערכה עצרת מספד מרכזית לזכרו של רבי אהרן מאיר קרביץ זצ"ל. הכינוס התקיים בבית מדרשו של הגר"ד סגל שליט"א, מקום בו קבע המנוח את תפילתו בשנים האחרונות והיה קשור אליו בקשרי תורה ויראה. </blockquote> </p> <p> בדברי ההספד נשאו דברים הגר"ד סגל שליט"א, מורנו ראש הישיבה הגר"ד כהן שליט"א, הגר"צ פרצוביץ ראש ישיבת מיר, והגרב"צ קוק. <br /> המספידים עמדו על מעלותיו הרבות של המנוח זצ"ל – דבקותו בתורה, יראת השמים שאפיינה את כל אורחותיו, וקשריו ההדוקים עם גדולי ישראל, אשר קירבוהו והשקוהו מתורתם. בדבריהם הודגש כי היה בן תורה מובהק, שכל מהותו חיבור מתמיד לדרכם ואורחתם של גדולי הדור. <br /> בפתח תקוה נערך בבית הכנסת חניכי ישיבת חברון - שירת ריבה בשכונת יוצאי חברון כינוס הספד לזכרו של רבי אהרן לפידות זצ"ל, בהשתתפות רבים מבוגרי הישיבה ותושבי העיר, שהתאספו לכבודו ולזכרו. </p> <p> <blockquote> מורנו ראש הישיבה הגר"ד כהן שליט"א האריך בדברי קינה, ועמד על תרומתו הרבה של המנוח למפעל הקירוב הגדול, תנועת בני תורה שייסד הגרב"מ אזרחי זצ"ל, אשר פעלה להוציא יקר מזולל ועשתה נפשות רבות. </blockquote> </p> <p> כמו כן הדגיש את תרומתו המשמעותית לבניית הקהילה התורנית בפתח תקוה, ובפרט לחיזוק קהילות יוצאי הישיבה בעיר. <br /> עוד הספידוהו הגר"ש גוטפריד מרא דאתרא גני הדר, הגר"מ רוט רב בית הכנסת, והרב אברהם גרינבוים, אשר העלו על נס את דמותו כאיש תורה ומעשה, מסור לצרכי ציבור באמונה, שפעל בענווה ובמסירות למען הרבות תורה ויראה. <br /> שתי עצרות המספד נחתמו בדברי חיזוק והתעוררות, בקריאה לבני התורה ולבוגרי הישיבה להתחזק בדרכם של הנפטרים היקרים זצ"ל. </p><p> <strong> עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם. </strong> </p> <p> בוגרי הישיבה ובני התורה התכנסו בימים האחרונים לעצרות מספד והתעוררות, לזכרם של בוגרי הישיבה החשובים אשר נסתלקו לאחרונה לבית עולמם, למגינת לב כל מוקיריהם. העצרות נערכו ברוב עם, באווירה של כבוד התורה וחיזוק רב, תוך העלאת דמויותיהם המאירות ופועלם הרב. </p> <p> <blockquote> בירושלים נערכה עצרת מספד מרכזית לזכרו של רבי אהרן מאיר קרביץ זצ"ל. הכינוס התקיים בבית מדרשו של הגר"ד סגל שליט"א, מקום בו קבע המנוח את תפילתו בשנים האחרונות והיה קשור אליו בקשרי תורה ויראה. </blockquote> </p> <p> בדברי ההספד נשאו דברים הגר"ד סגל שליט"א, מורנו ראש הישיבה הגר"ד כהן שליט"א, הגר"צ פרצוביץ ראש ישיבת מיר, והגרב"צ קוק. <br /> המספידים עמדו על מעלותיו הרבות של המנוח זצ"ל – דבקותו בתורה, יראת השמים שאפיינה את כל אורחותיו, וקשריו ההדוקים עם גדולי ישראל, אשר קירבוהו והשקוהו מתורתם. בדבריהם הודגש כי היה בן תורה מובהק, שכל מהותו חיבור מתמיד לדרכם ואורחתם של גדולי הדור. <br /> בפתח תקוה נערך בבית הכנסת חניכי ישיבת חברון - שירת ריבה בשכונת יוצאי חברון כינוס הספד לזכרו של רבי אהרן לפידות זצ"ל, בהשתתפות רבים מבוגרי הישיבה ותושבי העיר, שהתאספו לכבודו ולזכרו. </p> <p> <blockquote> מורנו ראש הישיבה הגר"ד כהן שליט"א האריך בדברי קינה, ועמד על תרומתו הרבה של המנוח למפעל הקירוב הגדול, תנועת בני תורה שייסד הגרב"מ אזרחי זצ"ל, אשר פעלה להוציא יקר מזולל ועשתה נפשות רבות. </blockquote> </p> <p> כמו כן הדגיש את תרומתו המשמעותית לבניית הקהילה התורנית בפתח תקוה, ובפרט לחיזוק קהילות יוצאי הישיבה בעיר. <br /> עוד הספידוהו הגר"ש גוטפריד מרא דאתרא גני הדר, הגר"מ רוט רב בית הכנסת, והרב אברהם גרינבוים, אשר העלו על נס את דמותו כאיש תורה ומעשה, מסור לצרכי ציבור באמונה, שפעל בענווה ובמסירות למען הרבות תורה ויראה. <br /> שתי עצרות המספד נחתמו בדברי חיזוק והתעוררות, בקריאה לבני התורה ולבוגרי הישיבה להתחזק בדרכם של הנפטרים היקרים זצ"ל. </p>`,
    postSlider: [
      {
        type: "image",
        src: PostImage1.src,
        width: PostImage1.width,
        height: PostImage1.height,
        blurDataURL: PostImage1.blurDataURL,
      },
      {
        type: "video",
        src: "http://dovp7.sg-host.com/wp-content/uploads/2026/03/video.mp4",
        poster: PostImage1.src,
      },
      {
        type: "image",
        src: PrevPostImage.src,
        width: PrevPostImage.width,
        height: PrevPostImage.height,
        blurDataURL: PrevPostImage.blurDataURL,
      },
    ],
    caption: `ראש הישיבה הגר"ד כהן שליט"א בדברי קינה`,
    link: `/news/single`,
    navigation: {
      prevPost: {
        image: PrevPostImage,
        title: `מי יתנני כעפר`,
        link: `/`,
      },
      nextPost: {
        image: PrevPostImage,
        title: `הבו לי צמחי פרא`,
        link: `/`,
      },
    },
  };

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      setError("No data provided.");
      return;
    }
    setPost(data.post);
    setNavigationData(data.navigationData);
  }, [data]);

  // Page Data Loade
  useEffect(() => {
    if (!post) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [post, animationPlayed]);

  // Page Section Animation
  useGSAP(() => {
    if (
      typeof window !== "undefined" &&
      page.current &&
      newsContentRef.current
    ) {
      //setPageContentAnimation();
      // Overflow body
      if (window.innerHeight < newsContentRef.current.offsetHeight) {
        const scurbScale = true;

        // Vertical Section
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: page.current,
            start: "top top",
            end: "+=" + newsContentRef.current?.offsetHeight,
            scrub: scurbScale,
            pin: true,
          },
        });
        timeline.to(newsContentRef.current, {
          y: () =>
            newsContentRef.current
              ? window.innerHeight - newsContentRef.current.offsetHeight - 150
              : 0,
          ease: "none",
          scrollTrigger: {
            trigger: page.current,
            start: page.current?.offsetTop,
            end: "+=" + newsContentRef.current?.offsetHeight,
            scrub: scurbScale,
          },
        });
        setVerticalSection(timeline);
      }
    }
    // Return
    return () => {
      if (verticalSection) {
        verticalSection.kill();
      }
    };
  }, [pathname, pageDataFetched]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && main.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLDivElement | null;
        const header = document.getElementById(
          "single-post-header",
        ) as HTMLDivElement | null;
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
          if (pageWrapper) {
            tl.to(pageWrapper, {
              opacity: 1,
              ease: "none",
              duration: 0.5,
              delay: 0,
            });
          }
          if (header) {
            tl.to(
              header,
              {
                opacity: 1,
                ease: "none",
                duration: 0.5,
              },
              "-=0.5",
            );
          }
        }
      });
    }
  }, [animationPlayed, pageDataFetched]);

  // On Mouse Move
  useGSAP(() => {
    const movingButtonRef = document.getElementById(
      "moving-button",
    ) as HTMLDivElement | null;
    const xSetter = gsap.quickSetter(movingButtonRef, "x", "px");
    const ySetter = gsap.quickSetter(movingButtonRef, "y", "px");

    window.addEventListener("mousemove", (e) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    });
    // Show view on mouse hover
    const pageNav = main.current?.querySelector(".post-navigation");
    if (pageNav) {
      pageNav.addEventListener("mouseenter", () => {
        gsap.to(movingButtonRef, {
          opacity: 1,
          scaleY: 1,
          duration: 0.3,
        });
      });
      pageNav.addEventListener("mouseleave", () => {
        gsap.to(movingButtonRef, {
          opacity: 0,
          scaleY: 0,
          duration: 0.3,
        });
      });
    }

    return () => {
      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      if (pageNav) {
        pageNav.addEventListener("mouseenter", () => {
          gsap.to(movingButtonRef, {
            opacity: 1,
            scaleY: 2,
            duration: 0.3,
          });
        });
        pageNav.addEventListener("mouseleave", () => {
          gsap.to(movingButtonRef, {
            opacity: 0,
            scaleY: 0,
            duration: 0.3,
          });
        });
      }
    };
  }, [pathname, pageDataFetched, animationPlayed]);

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

  // On Pathname Change
  useEffect(() => {
    const headerLeft = document.querySelector(
      "#header .header-left",
    ) as HTMLDivElement | null;
    const headerRight = document.querySelector(
      "#header .header-right",
    ) as HTMLDivElement | null;
    if (headerLeft) {
      gsap.set(headerLeft, {
        autoAlpha: 0,
        duration: 0,
      });
    }
    if (headerRight) {
      gsap.set(headerRight, {
        autoAlpha: 0,
        duration: 0,
      });
    }
  }, [pathname]);

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

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">News Not Found</h1>
          <p className="text-gray-600">
            The requested news post could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    post && (
      <main
        ref={main}
        id="post"
        dir="rtl"
        className="main relative overflow-hidden z-10"
      >
        <section className="single-news-section flex gap-y-[4.4vw] pr-25 h-screen bg-[#F5F0EB] text-black text-[21px] leading-[1.4em] font-medium">
          <div className="news-right-image w-[40%] h-screen relative">
            <div
              className="image-video-slider w-full h-full relative"
              onMouseEnter={() => setSliderHovered(true)}
              onMouseLeave={() => setSliderHovered(false)}
            >
              {/* Custom Prev Button */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous slide"
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-[#C3A13F] transition-all duration-300 cursor-pointer ${
                  sliderHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
              {/* Custom Next Button */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next slide"
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-[#C3A13F] transition-all duration-300 cursor-pointer ${
                  sliderHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  // Pause any playing video before slide changes
                  swiper.el
                    .querySelectorAll<HTMLVideoElement>("video")
                    .forEach((v) => v.pause());
                }}
                className="w-full h-full"
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
              >
                {post?.acf?.gallery?.map((item, index) => (
                  <SwiperSlide key={index}>
                    {item.type === "image" ? (
                      <div className="post-image w-full h-full relative">
                        <SinglePostImage image={item.image} />
                        {item?.caption && (
                          <div className="caption bg-black text-white absolute bottom-0 left-0 w-full py-3.5 px-5 text-center text-[22px] leading-[1.4em] z-50">
                            {parse(item.caption || "")}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="post-video w-full h-full relative">
                        <NewsSingleVideo data={item?.video} />

                        {item?.caption && (
                          <div className="caption bg-black text-white absolute bottom-0 left-0 w-full py-3.5 px-5 text-center text-[22px] leading-[1.4em] z-50">
                            {parse(item.caption || "")}
                          </div>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="news-left-content w-[60%] pr-[4.16vw] pl-[7.5vw] py-[9vh] overflow-hidden">
            <div className="border-line origin-top w-2 h-[30vh] bg-[#C3A13F] absolute top-0 left-13"></div>
            <div ref={newsContentRef} className="content-wrapper">
              <h2
                dir="rtl"
                className="post-title text-[55px] leading-[70%] text-[#C3A13F] text-right pt-2"
              >
                {parse(post?.title || NewsPostsData?.title)}
              </h2>
              <div
                dir="rtl"
                className="content mt-14 [&>p:not(:last-child)]:mb-7.5 [&>blockquote]:border-r-3 [&>blockquote]:border-[#C3A13F] [&>blockquote]:pr-7 [&>blockquote]:mr-5 [&>blockquote]:mb-7.5 [&>blockquote]:text-[28px] [&>blockquote]:leading-[1.1em] [&>blockquote]:font-bold text-right"
              >
                {parse(post?.content || NewsPostsData?.summary)}
              </div>
            </div>
          </div>
        </section>

        <section className="post-bottom pr-25">
          <PostNavigation
            extraClass=""
            data={JSON.stringify(NewsPostsData.navigation)}
            currentPostId={post?.id || 0}
            posts={navigationData || NewsPostsData.navigation}
          />
        </section>
      </main>
    )
  );
}
