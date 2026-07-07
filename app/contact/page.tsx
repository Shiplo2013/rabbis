"use client";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import ContactSection from "../components/contact/ContactSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

type ContactPageData = {
  acf: {
    contact_info: {
      title: string;
      address: string;
      email: string;
      phone: string;
      wase_link: string;
    };
  };
};

export default function Page() {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const [pageData, setPageData] = useState<ContactPageData | null>(null);
  const [headerData, setHeaderData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Page Data
  const sectionData = {
    bgImage: IntroBG,
  };
  // Router Path
  const pathname = usePathname();
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Static Data
  const staticData: ContactPageData = {
    acf: {
      contact_info: {
        title: "Contact Us",
        address: "הרב חיים הלר 8 ירושלים ישראל",
        email: "office@chevron.org.il",
        phone: "02-6209331",
        wase_link: "/#",
      },
    },
  };

  // Get Page Data From backend
  useEffect(() => {
    let isMounted = true;
    let fetchError = false;

    const loadPageData = async () => {
      const response = fetch("/api/contact", {
        cache: "force-cache",
      });
      const response2 = fetch("/api/header", {
        cache: "force-cache",
      });
      try {
        const [pageData, headerData] = await Promise.all([response, response2]);

        if (!pageData.ok || !headerData.ok) {
          //throw new Error("Failed to load home page data.");
          fetchError = true;
        }

        const data = fetchError ? null : await pageData.json();
        const header = fetchError ? null : await headerData.json();

        if (isMounted) {
          setPageData(data);
          setHeaderData(header);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to load page data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();

    return () => {
      isMounted = false;
    };
  }, [pathname]);
  // Set Page Data Fetched
  useEffect(() => {
    if (!pageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
    }
  }, [pageData, animationPlayed]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && main.current && page.current) {
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
        if (userVisit === "true" && animationPlayed && pageDataFetched) {
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
          animations.push(tl);
        }
      });

      // Cleanup function to kill animations on unmount
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    }
  }, [pageDataFetched, animationPlayed]);

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

  // On Page Load
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
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

  if (!pageData) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Contact Not Found</h1>
          <p className="text-gray-600">
            The requested contact page could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    pageData && (
      <div ref={main} className="relative overflow-hidden">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header data={headerData} animationStatus={isAllAnimationComplete} />
        <SmoothWrapper>
          <main
            ref={page}
            id="page"
            dir="ltr"
            className="main opacity-0 relative overflow-hidden z-10"
          >
            <Suspense
              fallback={
                <div className="w-screen min-w-screen h-full bg-black"></div>
              }
            >
              <ContactSection
                extraClass={
                  "contact-section w-screen min-h-[calc(100vh+100px)] h-auto"
                }
                animWidthText={0}
                bgImage={IntroBG}
                data={pageData?.acf}
              />
            </Suspense>
          </main>
          <Suspense
            fallback={
              <div className="w-screen min-w-screen h-full bg-white"></div>
            }
          >
            <Footer className={"relative z-20"} />
          </Suspense>
        </SmoothWrapper>
      </div>
    )
  );
}
