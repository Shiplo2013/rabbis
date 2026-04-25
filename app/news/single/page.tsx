"use client";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import PostImage1 from "../../assets/images/single-news-image.jpg";
import Footer from "../../components/Footer";

import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import SinglePageHeader from "@/app/components/SinglePageHeader";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import Image from "next/image";
import PrevPostImage from "../../assets/images/prev-post.jpg";
import LoadingEffect from "../../components/LoadingEffect";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const NewsPostsData = {
    title: `ושמתיה כאבל יחיד ואחריתה כיום מר`,
    summary: `<p> <strong> עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם. </strong> </p> <p> בוגרי הישיבה ובני התורה התכנסו בימים האחרונים לעצרות מספד והתעוררות, לזכרם של בוגרי הישיבה החשובים אשר נסתלקו לאחרונה לבית עולמם, למגינת לב כל מוקיריהם. העצרות נערכו ברוב עם, באווירה של כבוד התורה וחיזוק רב, תוך העלאת דמויותיהם המאירות ופועלם הרב. </p> <p> <blockquote> בירושלים נערכה עצרת מספד מרכזית לזכרו של רבי אהרן מאיר קרביץ זצ"ל. הכינוס התקיים בבית מדרשו של הגר"ד סגל שליט"א, מקום בו קבע המנוח את תפילתו בשנים האחרונות והיה קשור אליו בקשרי תורה ויראה. </blockquote> </p> <p> בדברי ההספד נשאו דברים הגר"ד סגל שליט"א, מורנו ראש הישיבה הגר"ד כהן שליט"א, הגר"צ פרצוביץ ראש ישיבת מיר, והגרב"צ קוק. <br /> המספידים עמדו על מעלותיו הרבות של המנוח זצ"ל – דבקותו בתורה, יראת השמים שאפיינה את כל אורחותיו, וקשריו ההדוקים עם גדולי ישראל, אשר קירבוהו והשקוהו מתורתם. בדבריהם הודגש כי היה בן תורה מובהק, שכל מהותו חיבור מתמיד לדרכם ואורחתם של גדולי הדור. <br /> בפתח תקוה נערך בבית הכנסת חניכי ישיבת חברון - שירת ריבה בשכונת יוצאי חברון כינוס הספד לזכרו של רבי אהרן לפידות זצ"ל, בהשתתפות רבים מבוגרי הישיבה ותושבי העיר, שהתאספו לכבודו ולזכרו. </p> <p> <blockquote> מורנו ראש הישיבה הגר"ד כהן שליט"א האריך בדברי קינה, ועמד על תרומתו הרבה של המנוח למפעל הקירוב הגדול, תנועת בני תורה שייסד הגרב"מ אזרחי זצ"ל, אשר פעלה להוציא יקר מזולל ועשתה נפשות רבות. </blockquote> </p> <p> כמו כן הדגיש את תרומתו המשמעותית לבניית הקהילה התורנית בפתח תקוה, ובפרט לחיזוק קהילות יוצאי הישיבה בעיר. <br /> עוד הספידוהו הגר"ש גוטפריד מרא דאתרא גני הדר, הגר"מ רוט רב בית הכנסת, והרב אברהם גרינבוים, אשר העלו על נס את דמותו כאיש תורה ומעשה, מסור לצרכי ציבור באמונה, שפעל בענווה ובמסירות למען הרבות תורה ויראה. <br /> שתי עצרות המספד נחתמו בדברי חיזוק והתעוררות, בקריאה לבני התורה ולבוגרי הישיבה להתחזק בדרכם של הנפטרים היקרים זצ"ל. </p><p> <strong> עצרות מספד והתעוררות לזכר בוגרי הישיבה החשובים שנסלקו לבית עולמם. </strong> </p> <p> בוגרי הישיבה ובני התורה התכנסו בימים האחרונים לעצרות מספד והתעוררות, לזכרם של בוגרי הישיבה החשובים אשר נסתלקו לאחרונה לבית עולמם, למגינת לב כל מוקיריהם. העצרות נערכו ברוב עם, באווירה של כבוד התורה וחיזוק רב, תוך העלאת דמויותיהם המאירות ופועלם הרב. </p> <p> <blockquote> בירושלים נערכה עצרת מספד מרכזית לזכרו של רבי אהרן מאיר קרביץ זצ"ל. הכינוס התקיים בבית מדרשו של הגר"ד סגל שליט"א, מקום בו קבע המנוח את תפילתו בשנים האחרונות והיה קשור אליו בקשרי תורה ויראה. </blockquote> </p> <p> בדברי ההספד נשאו דברים הגר"ד סגל שליט"א, מורנו ראש הישיבה הגר"ד כהן שליט"א, הגר"צ פרצוביץ ראש ישיבת מיר, והגרב"צ קוק. <br /> המספידים עמדו על מעלותיו הרבות של המנוח זצ"ל – דבקותו בתורה, יראת השמים שאפיינה את כל אורחותיו, וקשריו ההדוקים עם גדולי ישראל, אשר קירבוהו והשקוהו מתורתם. בדבריהם הודגש כי היה בן תורה מובהק, שכל מהותו חיבור מתמיד לדרכם ואורחתם של גדולי הדור. <br /> בפתח תקוה נערך בבית הכנסת חניכי ישיבת חברון - שירת ריבה בשכונת יוצאי חברון כינוס הספד לזכרו של רבי אהרן לפידות זצ"ל, בהשתתפות רבים מבוגרי הישיבה ותושבי העיר, שהתאספו לכבודו ולזכרו. </p> <p> <blockquote> מורנו ראש הישיבה הגר"ד כהן שליט"א האריך בדברי קינה, ועמד על תרומתו הרבה של המנוח למפעל הקירוב הגדול, תנועת בני תורה שייסד הגרב"מ אזרחי זצ"ל, אשר פעלה להוציא יקר מזולל ועשתה נפשות רבות. </blockquote> </p> <p> כמו כן הדגיש את תרומתו המשמעותית לבניית הקהילה התורנית בפתח תקוה, ובפרט לחיזוק קהילות יוצאי הישיבה בעיר. <br /> עוד הספידוהו הגר"ש גוטפריד מרא דאתרא גני הדר, הגר"מ רוט רב בית הכנסת, והרב אברהם גרינבוים, אשר העלו על נס את דמותו כאיש תורה ומעשה, מסור לצרכי ציבור באמונה, שפעל בענווה ובמסירות למען הרבות תורה ויראה. <br /> שתי עצרות המספד נחתמו בדברי חיזוק והתעוררות, בקריאה לבני התורה ולבוגרי הישיבה להתחזק בדרכם של הנפטרים היקרים זצ"ל. </p>`,
    image: PostImage1,
    caption: `ראש הישיבה הגר"ד כהן שליט"א בדברי קינה`,
    link: `/news/single`,
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
  };

  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Vertical Section
  const [verticalSection, setVerticalSection] =
    useState<gsap.core.Timeline | null>(null);

  // Page Refs
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const newsContentRef = useRef<HTMLDivElement>(null);
  const movingButtonRef = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && page) {
      //setPageContentAnimation();
      // Overflow body
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
    // Return
    return () => {
      if (verticalSection) {
        verticalSection.kill();
      }
    };
  }, [pathname]);

  // Load Page
  useGSAP(
    () => {
      if (typeof window !== "undefined" && main) {
        document.fonts.ready.then(() => {
          // Selectors
          const header = main.current?.querySelector(".single-page-header");
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

  // On Mouse Move
  useGSAP(
    () => {
      const xSetter = gsap.quickSetter(movingButtonRef.current, "x", "px");
      const ySetter = gsap.quickSetter(movingButtonRef.current, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      // Show view on mouse hover
      const pageNav = main.current?.querySelector(".post-navigation");
      if (pageNav) {
        pageNav.addEventListener("mouseenter", () => {
          gsap.to(movingButtonRef.current, {
            opacity: 1,
            scaleY: 1,
            duration: 0.3,
          });
        });
        pageNav.addEventListener("mouseleave", () => {
          gsap.to(movingButtonRef.current, {
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
            gsap.to(movingButtonRef.current, {
              opacity: 1,
              scaleY: 2,
              duration: 0.3,
            });
          });
          pageNav.addEventListener("mouseleave", () => {
            gsap.to(movingButtonRef.current, {
              opacity: 0,
              scaleY: 0,
              duration: 0.3,
            });
          });
        }
      };
    },
    { scope: main, dependencies: [pathname] },
  );

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
      <SinglePageHeader link={"/news"} />
      <SmoothWrapper>
        <main
          ref={page}
          id="page"
          dir="rtl"
          className="main relative overflow-hidden z-10 opacity-0"
        >
          <section className="single-news-section flex gap-y-[4.4vw] pr-25 h-screen bg-[#F5F0EB] text-black text-[21px] leading-[1.4em] font-medium">
            <div className="news-right-image w-[40%] h-screen relative">
              <div className="image w-full h-full">
                <Image
                  className="w-full h-full object-cover object-center"
                  src={PostImage1.src}
                  width={PostImage1.width}
                  height={PostImage1.height}
                  alt="News Image"
                  blurDataURL={PostImage1.blurDataURL}
                  placeholder="blur"
                  loading="lazy"
                />
              </div>
              <div className="caption bg-black text-white absolute bottom-0 left-0 w-full py-3.5 px-5 text-center text-[22px] leading-[1.4em]">
                {parse(NewsPostsData?.caption)}
              </div>
            </div>
            <div className="news-left-content w-[60%] pr-[4.16vw] pl-[7.5vw] py-[9vh] overflow-hidden">
              <div className="border-line origin-top w-2 h-[30vh] bg-[#C3A13F] absolute top-0 left-13"></div>
              <div ref={newsContentRef} className="content-wrapper">
                <h2
                  dir="ltr"
                  className="post-title text-[55px] leading-[70%] text-[#C3A13F] text-right pt-2"
                >
                  {parse(NewsPostsData?.title)}
                </h2>
                <div
                  dir="ltr"
                  className="content mt-14 [&>p:not(:last-child)]:mb-7.5 [&>blockquote]:border-r-3 [&>blockquote]:border-[#C3A13F] [&>blockquote]:pr-7 [&>blockquote]:mr-5 [&>blockquote]:text-[28px] [&>blockquote]:leading-[1.1em] [&>blockquote]:font-bold text-right"
                >
                  {parse(NewsPostsData?.summary)}
                </div>
                <div className="post-navigation bg-black py-10 px-15 flex items-center justify-between mt-[8.6vh]">
                  {NewsPostsData?.nextPost && (
                    <Link
                      href={NewsPostsData?.nextPost?.link}
                      className="next-post relative group"
                    >
                      <div className="image w-[6.4vw] h-[6.4vw] overflow-hidden">
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={NewsPostsData?.nextPost?.image?.src}
                          width={NewsPostsData?.nextPost?.image?.width}
                          height={NewsPostsData?.nextPost?.image?.height}
                          alt="News Image"
                          blurDataURL={
                            NewsPostsData?.nextPost?.image?.blurDataURL
                          }
                          placeholder="blur"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-1.5 text-center text-[10px] leading-[70%] min-w-22 max-w-full">
                        {NewsPostsData?.nextPost.title}
                      </h4>
                      <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-5 w-14 h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-3">
                        <div className="w-8 h-auto transition-all duration-300 group-hover:translate-x-1">
                          <ArrowRight />
                        </div>
                      </div>
                    </Link>
                  )}
                  {NewsPostsData?.prevPost && (
                    <Link
                      href={NewsPostsData?.prevPost?.link}
                      className="prev-post relative group"
                    >
                      <div className="image w-[6.4vw] h-[6.4vw] overflow-hidden">
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={NewsPostsData?.prevPost?.image?.src}
                          width={NewsPostsData?.prevPost?.image?.width}
                          height={NewsPostsData?.prevPost?.image?.height}
                          alt="News Image"
                          blurDataURL={
                            NewsPostsData?.prevPost?.image?.blurDataURL
                          }
                          placeholder="blur"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-1.5 text-center text-[10px] leading-[70%] min-w-22 max-w-full">
                        {NewsPostsData?.prevPost.title}
                      </h4>
                      <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-5 w-14 h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:-translate-x-3">
                        <div className="w-8 h-auto transition-all duration-300 group-hover:-translate-x-1">
                          <ArrowLeft2 />
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <div
        ref={movingButtonRef}
        className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
      >
        <span className="text block text-black text-[12px] leading-[1em] font-bold">
          מעבר לחדשה הבאה
        </span>
      </div>
    </div>
  );
}
