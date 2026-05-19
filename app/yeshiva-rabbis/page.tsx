"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon2 from "../assets/icons/ArrowLeftIcon2";
import Rabbis1 from "../assets/images/rabbis1.jpg";
import Rabbis2 from "../assets/images/rabbis2.jpg";
import Rabbis3 from "../assets/images/rabbis3.jpg";
import Rabbis4 from "../assets/images/rabbis4.jpg";
import Rabbis5 from "../assets/images/rabbis5.jpg";
import Rabbis6 from "../assets/images/rabbis6.jpg";
import Rabbis7 from "../assets/images/rabbis7.jpg";
import Rabbis8 from "../assets/images/rabbis8.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import GetRightPosition from "../ui/GetRightPosition";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import RabbisSection from "../ui/rabbis/RabbisSection";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Page() {
  // Selectors
  const [rabbisPageData, setRabbisPageData] = useState<null | any>(null);
  const [rabbisSectionsData, setRabbisSectionsData] = useState<any[]>([]);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  const [containerWidth, setContainerWidth] = useState(300);
  const [sectionWidth, setSectionWidth] = useState(200);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Router Path
  const pathname = usePathname();
  const fallbackRabbisSections = [
    {
      sectionTitle: "ראשי הישיבה",
      sectionContent: [
        {
          title: `מרן ראש הישיבה<br/> הגאון רבי פרבשטיין משה<br/> מרדכי שליט״א`,
          image: Rabbis1,
        },
        {
          title: `מרן ראש הישיבההגאון רבי שלמה כץ שליט"א`,
          image: Rabbis2,
        },
        {
          title: `מרן ראש הישיבההגאון רבי יוסף חברוני שליט"א`,
          image: Rabbis3,
        },
      ],
    },
    {
      sectionTitle: "מנהל רוחני",
      sectionContent: [
        {
          title: `מרן המשגיחהגאון רבי חיים יצחק קפלן שליט"א`,
          image: Rabbis4,
        },
      ],
    },
    {
      sectionTitle: "רמים",
      sectionContent: [
        {
          title: `הגאון רבי אברהם לויסון שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי איתן יפהן שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי חיים אהרון רלבג שליט"א`,
          image: Rabbis6,
        },
        {
          title: `הגאון רבי  נחום  בר חיים שליט"א`,
          image: Rabbis7,
        },
        {
          title: `הגאון רבי חנוך הרטמן שליט"א`,
          image: Rabbis8,
        },
      ],
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
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const ArrowButtonRef = useRef<HTMLDivElement>(null);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;

    const loadRabbisPageData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/yeshiva-rabbis", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load rabbis page data.");
        }

        const data = await response.json();

        const sections = Array.isArray(data?.acf?.section)
          ? data.acf.section
          : [];

        const mappedSections = await Promise.all(
          sections.map(async (section: any) => {
            const sectionPostIds = (section?.section_posts || [])
              .map((post: any) => post?.ID || post?.id || post)
              .filter(Boolean);

            if (!sectionPostIds.length) {
              return {
                sectionTitle: section?.section_title || "",
                sectionContent: [],
              };
            }

            const sectionPostsResponse = await fetch(
              `/api/yeshiva-rabbis/posts?include=${sectionPostIds.join(",")}&orderby=include&per_page=100`,
              { cache: "no-store" },
            );

            if (!sectionPostsResponse.ok) {
              return {
                sectionTitle: section?.section_title || "",
                sectionContent: [],
              };
            }

            const sectionPostsData = await sectionPostsResponse.json();
            const sectionContent = (sectionPostsData?.posts || []).map(
              (post: any) => ({
                title: post?.acf?.title || post?.title || "",
                image: {
                  src:
                    post?.acf?.image?.url ||
                    post?.acf?.thumbnail?.url ||
                    Rabbis1.src,
                  blurDataURL: post?.acf?.image?.blurDataURL,
                },
              }),
            );

            return {
              sectionTitle: section?.section_title || "",
              sectionContent,
            };
          }),
        );

        if (isMounted) {
          setRabbisPageData(
            mappedSections.length ? mappedSections : fallbackRabbisSections,
          );
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load rabbis page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRabbisPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!rabbisPageData) {
      return;
    }
    setPageDataFetched(true);
    // Update Section Width on Data Change
    const updateSectionWidth = () => {
      const postCount = rabbisPageData.reduce(
        (acc: any, section: any) => acc + section.sectionContent.length,
        0,
      );
      const newSectionWidth =
        postCount * 17.5 +
        (postCount - 1) * 5 +
        24 +
        (rabbisPageData?.length - 1) * 10; // 17.5vw per post + 5vw gap + 24vw for padding + 10vw per section

      setSectionWidth(newSectionWidth);
      setContainerWidth(newSectionWidth);
    };

    updateSectionWidth();
    window.addEventListener("resize", updateSectionWidth);
    return () => {
      window.removeEventListener("resize", updateSectionWidth);
    };
  }, [rabbisPageData]);

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
          end: "+=" + window.innerWidth * (containerWidth / 100),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            gsap.to(progress.current, { width: `${100 * self.progress}%` });
            if (self.progress > 0.97) {
              gsap.to(waveLine.current, {
                opacity: 0,
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(waveLine.current, {
                opacity: 1,
                duration: 0.1,
                delay: 0,
              });
            }
            // Arrow Button
            if (self.progress > 0.9) {
              gsap.to(ArrowButtonRef.current, {
                opacity: 0,
                duration: 0.1,
                delay: 0,
              });
            } else {
              gsap.to(ArrowButtonRef.current, {
                opacity: 1,
                duration: 0.1,
                delay: 0,
              });
            }
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
          end: "+=" + (window.innerWidth * (containerWidth / 100) - 500),
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
  }, [pageDataFetched]);

  // Load Page
  useGSAP(() => {
    // Selectors
    const headerLeft = main.current?.querySelector(".header-left");
    const headerRight = main.current?.querySelector(".header-right");
    const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
    rabbisContent?.forEach((section) => {
      section.classList.add("opacity-0");
    });
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true" && animationPlayed) {
      // Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Set Animation Played to true
          setIsAllAnimationComplete(true);
          setPageContentAnimation();
          rabbisContent?.forEach((section) => {
            section.classList.add("opacity-100");
          });
        },
      });
      if (main.current) {
        tl.to(main.current, {
          opacity: 1,
          ease: "none",
          duration: 0.5,
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
            duration: 0,
          },
          "-=1",
        );
      }
    }
  }, [pageDataFetched]);

  // Set Page Content Animation
  const setPageContentAnimation = () => {
    // Page Content Animation
    const rabbisContent = main.current?.querySelectorAll(".rabbis-section");
    document.fonts.ready.then(() => {
      if (rabbisContent) {
        rabbisContent.forEach((section) => {
          const sectionTitle = section.querySelector(
            ".rabbis-section-title h2",
          );
          const sectionItems = section.querySelectorAll(".single-rabbis");
          if (sectionTitle) {
            const splitTitle = TextSplitLines(sectionTitle);
            gsap.set(splitTitle, {
              perspective: 400,
            });
            gsap.set(splitTitle, {
              yPercent: 150,
              opacity: 0,
            });
            gsap.to(splitTitle, {
              yPercent: 0,
              opacity: 1,
              delay: 0,
              stagger: 0.05,
              ease: "expo.inOut",
              duration: 1.5,
              scrollTrigger: {
                start: () => {
                  return GetRightPosition(section) - window.innerWidth;
                },
              },
            });
          }
          if (sectionItems) {
            sectionItems.forEach((item) => {
              const rabbisText = item.querySelector(".rabbis-text");
              const rabbisOverlay = item.querySelector(".rabbis-image-overlay");
              const rabbisTextSplit = TextSplitLines(rabbisText);
              gsap.set(rabbisText, {
                perspective: 400,
              });
              gsap.set(rabbisTextSplit, {
                yPercent: 150,
                opacity: 0,
              });
              gsap.to(rabbisTextSplit, {
                yPercent: 0,
                opacity: 1,
                delay: 0,
                stagger: 0.05,
                ease: "expo.inOut",
                duration: 1.5,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth;
                  },
                },
              });
              gsap.to(rabbisOverlay, {
                yPercent: -100,
                ease: "expo.inOut",
                duration: 1.5,
                delay: 0,
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(item) - window.innerWidth;
                  },
                },
              });
            });
          }
        });
      }
    });
    // Arrow Button Animation
    const arrowWrapper =
      ArrowButtonRef?.current?.querySelector(".rabbis-arrow");
    if (arrowWrapper) {
      gsap.set(arrowWrapper, {
        xPercent: -100,
      });
      gsap.to(arrowWrapper, {
        xPercent: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 1.5,
        delay: 0,
      });
    }
    // Wave Line Animation
    if (waveMask.current) {
      gsap.to(waveMask.current, {
        translateY: 0,
        opacity: 1,
        ease: "expo.inOut",
        duration: 3,
      });
    }
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

  const [activePostion, setActivePosition] = useState(0);
  useEffect(() => {
    const mainWidth =
      main.current?.querySelector("#section-wrapper")?.clientWidth;
    if (mainWidth) {
      const maxScroll = mainWidth - window.innerWidth;
      if (activePostion > maxScroll) {
        setActivePosition(maxScroll);
      }
    }
    window.scrollTo(0, activePostion);
    console.log(mainWidth);
    console.log(activePostion);
  }, [activePostion]);

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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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

  if (!rabbisPageData) {
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
    rabbisPageData && (
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
                className={`section-wrapp flex flex-nowrap flex-row-reverse w-[${containerWidth}vw] h-screen items-center will-change-transform`}
              >
                <section
                  className={`rabbis-sections w-[${sectionWidth}vw] min-w-[${sectionWidth}vw] will-change-transform flex justify-baseline flex-row-reverse items-center gap-x-[10vw] px-[12vw] h-full`}
                >
                  {rabbisPageData?.map((section: any, index: number) => (
                    <RabbisSection
                      key={index}
                      rabbisContent={[section]}
                      className={`will-change-transform rabbis-section-${index + 1}`}
                    />
                  ))}
                </section>
              </div>
            </div>
          </main>
          <Footer className={"relative z-20"} />
        </SmoothWrapper>
        <div
          ref={ArrowButtonRef}
          className="rabbis-arrow-wrapper fixed top-0 left-0 z-50 h-screen w-[20vw]"
        >
          <div className="rabbis-arrow w-full h-full flex items-center justify-center bg-linear-to-r from-black to-[rgba(0,0,0,0)] opacity-0">
            <button
              onClick={() =>
                setActivePosition(activePostion + window.innerWidth * 0.5)
              }
              className="next-button w-20 h-20 border-2 border-[#C3A13F] rounded-full bg-black p-5 cursor-pointer"
            >
              <ArrowLeftIcon2 />
            </button>
          </div>
        </div>
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
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
            ></div>
          </div>
        </div>
      </div>
    )
  );
}
