"use client";
import ArrowLeft3 from "@/app/assets/icons/ArrowLeft3";
import ArrowLeftBottom from "@/app/assets/icons/ArrowLeftBottom";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingEffect from "../../components/LoadingEffect";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import SmoothWrapper from "../../ui/SmoothWrapper";
import TextSplitLines from "../../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

type KnessetPosts = {
  id: number;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  acf: any;
};

type AllPosts = {
  pagination: any;
  posts: [
    {
      id: number;
      title: string;
      slug: string;
      acf: any;
    },
  ];
};

export default function Page() {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  // Page Data
  const sectionData = {
    bgImage: IntroBG,
  };
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<KnessetPosts | null>(null);
  const [allPosts, setAllPosts] = useState<AllPosts | null | any>(null);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [footerData, setFooterData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const loadKnessetPageData = async () => {
      const response = fetch(`/api/the-knesset-of-customs/posts/${slug}`, {
        cache: "no-store",
      });
      const response2 = fetch("/api/the-knesset-of-customs/posts", {
        cache: "no-store",
      });
      const response3 = fetch("/api/header", {
        cache: "force-cache",
      });
      const response4 = fetch("/api/footer", {
        cache: "force-cache",
      });

      try {
        const [pageData, pageData2, headerData, footerData] = await Promise.all(
          [response, response2, response3, response4],
        );

        if (!pageData.ok || !pageData2.ok || !headerData.ok || !footerData.ok) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }

        const data = fetchError ? null : await pageData.json();
        const data2 = fetchError ? null : await pageData2.json();
        const header = fetchError ? null : await headerData.json();
        const footer = fetchError ? null : await footerData.json();

        if (isMounted) {
          setPost(data);
          setAllPosts(data2);
          setHeaderData(header);
          setFooterData(footer);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadKnessetPageData();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
    }
  }, [post, animationPlayed]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && main.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const headerLeft = main.current?.querySelector(".header-left");
        const headerRight = main.current?.querySelector(".header-right");
        // Banner Overlay
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".contact-section .intro-background .intro-bg-mask",
        );
        // Contact Form
        const contactForm = main.current?.querySelector(
          ".contact-section .contact-content .contact-form .contact-form-wrapper",
        );
        // Contact Heading
        const contactHeading = main.current?.querySelector(
          ".contact-section .contact-content .contact-heading>h2",
        );
        // Contact Info Item
        const contactInfoItem = main.current?.querySelectorAll(
          ".contact-section .contact-content .contact-info .info-item .info-item-wrapper",
        );
        // Contact Heading
        let splitTitle;
        if (contactHeading) {
          splitTitle = TextSplitLines(contactHeading);
          gsap.set(contactHeading, {
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

          // Contact Heading
          if (contactHeading && splitTitle) {
            tl.to(
              splitTitle,
              {
                yPercent: 0,
                opacity: 1,
                duration: 3,
                delay: 0,
                stagger: 0.02,
                ease: "expo.inOut",
              },
              "-=1.5",
            );
          }

          // Contact Info Item
          if (contactInfoItem) {
            tl.from(
              contactInfoItem,
              {
                translateY: "100%",
                opacity: 0,
                delay: 0,
                duration: 3,
                ease: "expo.inOut",
              },
              "-=2.5",
            );
          }

          // Contact Form
          if (contactForm) {
            tl.from(
              contactForm,
              {
                translateY: "100%",
                opacity: 0,
                delay: 0,
                duration: 3,
                ease: "expo.inOut",
              },
              "-=2.5",
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
              "-=2.5",
            );
          }
        }
      });
    }
  }, [pageDataFetched]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Hide header-left on scroll down, show on scroll up (only for this page)
  useGSAP(() => {
    if (!isAllAnimationComplete || !main.current) {
      return;
    }

    const headerLeft = main.current.querySelector(
      ".header-left",
    ) as HTMLElement | null;

    if (!headerLeft) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isHidden = false;
    const deltaThreshold = 6;

    const showHeaderLeft = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(headerLeft, {
        y: "0%",
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const hideHeaderLeft = () => {
      if (isHidden) return;
      isHidden = true;
      gsap.to(headerLeft, {
        y: "-120%",
        autoAlpha: 0,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < deltaThreshold) {
        return;
      }

      if (currentScrollY <= 10 || diff < 0) {
        showHeaderLeft();
      } else if (diff > 0) {
        hideHeaderLeft();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.set(headerLeft, { clearProps: "transform,opacity,visibility" });
    };
  }, [isAllAnimationComplete]);

  // On Page Load
  useGSAP(() => {
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto");
    document.body.classList.add("!overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      setIsLoading(true);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
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

  if (!post) {
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
    post && (
      <div ref={main} className="relative overflow-hidden">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header data={headerData} animationStatus={false} />
        <SmoothWrapper>
          <main
            ref={page}
            id="page"
            dir="rtl"
            className="main opacity-0 relative overflow-hidden z-10 bg-[#F5F0EB]"
          >
            <section className="knesset-page min-h-screen w-full flex justify-center items-start relative z-20 pt-[20vh] pb-[10vh] px-5">
              <div className="knesset-wrapper max-w-375 w-[80%] flex items-start gap-x-[2.5vw]">
                <div className="knesset-left-content w-[74%]">
                  <h1 className="text-[55px] leading-[70%] font-bold text-[#D1A941] italic">
                    {parse(post?.title)}
                  </h1>
                  <div className="breadcumb text-[22px] leading-[1.1em] text-[#000000] mt-[5vh] mb-[6vh] flex items-center gap-x-3">
                    <Link
                      href="/"
                      className="home hover:text-[#D1A941] transition-colors duration-300"
                    >
                      בית
                    </Link>
                    <span className="separator w-5">
                      <ArrowLeft3 />
                    </span>
                    <Link
                      href="/the-knesset-of-customs"
                      className="knesset hover:text-[#D1A941] transition-colors duration-300"
                    >
                      מאמרים
                    </Link>
                    <span className="separator w-5">
                      <ArrowLeft3 />
                    </span>
                    <span className="post">{parse(post?.title)}</span>
                  </div>
                  <div className="knesset-content text-[#000000] text-[21px] leading-[1.4em] [&>h2]:text-[55px] [&>h2]:leading-[1em] [&>h2]:mb-[5vh] [&>h3]:text-[38px] [&>h3]:leading-[1em] [&>h3]:mb-[3vh] [&>p]:mb-[5vh]">
                    {parse(post?.content)}
                  </div>
                </div>
                <div className="knesset-left-sidebar w-[26%]">
                  <div className="related-posts flex flex-col gap-y-[5vh] pr-7.5 border-r border-[#000000]">
                    {allPosts?.posts?.map((item: any, index: number) => {
                      if (
                        decodeURIComponent(item.slug) ===
                        decodeURIComponent(slug)
                      ) {
                        return null;
                      }
                      return (
                        <div
                          key={index}
                          className="singel-related flex items-end gap-x-3"
                        >
                          <Link
                            href={`/the-knesset-of-customs/${item.slug}`}
                            className="text-[40px] leading-[70%] text-[#D1A941] hover:text-[#000000] transition-colors duration-300"
                          >
                            {parse(item?.title)}
                          </Link>
                          <ThemeButton
                            buttonLink={
                              item?.slug
                                ? `/the-knesset-of-customs/${item.slug}`
                                : "#"
                            }
                            extraClass="w-15 h-12.5 flex items-center justify-center rounded-full"
                            bgColor={"bg-[#C3A13F]"}
                            svgIconClass={""}
                            svgIcon={
                              <ArrowLeftBottom
                                extraClass={
                                  "group-hover:fill-white transition-all duration-300 ease-in-out"
                                }
                              />
                            }
                            hoverBgColor="bg-black"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer data={footerData} className={"relative z-20"} />
        </SmoothWrapper>
      </div>
    )
  );
}
