"use client";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Testimonial1 from "../assets/images/testimonial-1.jpg";
import Testimonial2 from "../assets/images/testimonial-2.jpg";
import Testimonial3 from "../assets/images/testimonial-3.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import BigTitleSplitLines from "../ui/BigTitleSplitLines";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  // Router Path
  const pathname = usePathname();
  // Page Data
  const PageContent = {
    title: `עדויות חיות למורשת שנמשכת מדור לדור`,
    testimonials: [
      {
        title: `הרב מנחם מוזס`,
        image: Testimonial1,
      },
      {
        title: `הרב צבי פולק`,
        image: Testimonial2,
      },
      {
        title: `הרב מנדלזון משה יוסף מאיר`,
        image: Testimonial3,
      },
    ],
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
  const panel = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const waveLine = useRef<HTMLDivElement>(null);
  const waveMask = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Page Section Animation
  useGSAP(() => {
    if (typeof window !== "undefined" && panel) {
      // Overflow body
      const scurbScale = 2;

      // Vertical Section
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+=" + window.innerHeight * 3,
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
          end: "+=" + (window.innerHeight * 3 - 500),
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
      if (typeof window !== "undefined" && panel) {
        document.fonts.ready.then(() => {
          // Selectors
          const headerLeft = main.current?.querySelector(".header-left");
          const headerRight = main.current?.querySelector(".header-right");
          const introTitle = main.current?.querySelector(
            ".introduction h1.intro-title",
          );
          const Testimonial1 = main.current?.querySelector(
            ".testimonials .testimonial-item:nth-child(1)",
          );
          let splitIntroTitle;
          if (introTitle) {
            splitIntroTitle = BigTitleSplitLines(introTitle);
            gsap.set(introTitle, {
              perspective: 400,
            });
            gsap.set(splitIntroTitle, {
              yPercent: 150,
              opacity: 0,
            });
          }
          if (Testimonial1) {
            gsap.set(Testimonial1, {
              x: "-15vw",
              opacity: 0,
            });
          }
          // Set localStorage variable
          const userVisit = localStorage.getItem("hasVisited");
          if (userVisit === "true") {
            // Timeline
            const tl = gsap.timeline({
              onComplete: () => {
                // Set Animation Played to true
                setIsAllAnimationComplete(true);
                setPageContentAnimation();
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
            // Intro Title Animation
            if (introTitle && splitIntroTitle) {
              tl.to(
                splitIntroTitle,
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
            // Intro Image Animation
            if (Testimonial1) {
              tl.to(
                Testimonial1,
                {
                  x: "0vw",
                  opacity: 1,
                  duration: 3,
                  delay: 0,
                  ease: "expo.inOut",
                },
                "-=2",
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
    const Testimonials = main.current?.querySelectorAll(
      ".testimonials .testimonial-item",
    );
    if (Testimonials) {
      Testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          gsap.set(testimonial, {
            x: "-30vw",
            opacity: 0,
          });
          gsap.to(testimonial, {
            x: "0vw",
            opacity: 1,
            ease: "expo.inOut",
            duration: 2,
            scrollTrigger: {
              start: () => {
                return window.innerWidth * (index * 0.4);
              },
              toggleActions: "restart pause resume reverse",
            },
          });
        }
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

  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
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
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[260vw] h-screen items-center will-change-transform`}
            >
              <div
                dir="rtl"
                className="testimonials-content w-[260vw] h-full py-[10vh] px-[10vw] flex items-center gap-x-[6.3vw]"
              >
                <div className="introduction w-[33.4vw] min-w-[33.4vw] will-change-transform">
                  <h1
                    dir="ltr"
                    className="intro-title text-[160px] leading-[70%] text-[#C3A13F] text-right"
                  >
                    {parse(PageContent.title)}
                  </h1>
                </div>
                <div className="testimonials flex h-screen items-center justify-center gap-x-[10vw] w-[200vw] will-change-transform">
                  {PageContent.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="testimonial-item w-screen h-screen flex items-center justify-start gap-x-[2.8vw] will-change-transform"
                    >
                      <div className="testimonial-image w-[40vw] min-w-[40vw] h-[50vh] relative">
                        <Image
                          className="w-full h-full object-cover"
                          src={testimonial.image.src}
                          width={768}
                          height={464}
                          alt={`Testimonial Image ${index + 1}`}
                          blurDataURL={testimonial.image.blurDataURL}
                          placeholder="blur"
                          loading="lazy"
                        />
                      </div>
                      <h2
                        dir="ltr"
                        className="testimonial-title text-[55px] leading-[70%] text-[#C3A13F] text-right"
                      >
                        {parse(testimonial.title)}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
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
  );
}
