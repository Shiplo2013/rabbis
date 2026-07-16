"use client";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";
import ContactSection from "../../components/contact/ContactSection";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

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

export default function ContactScriptProvider({
  data,
}: {
  data: ContactPageData;
}) {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const [pageData, setPageData] = useState<ContactPageData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Page Data
  const sectionData = {
    bgImage: IntroBG,
  };
  // Router Path
  const pathname = usePathname();
  // Animation State
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
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
    if (!data) {
      setError("No data provided.");
      return;
    }
    setPageData(data);
  }, [data]);
  // Set Page Data Fetched
  useEffect(() => {
    if (!pageData) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [pageData, animationPlayed]);

  // Load Page
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined" && main.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const pageWrapper = document.getElementById(
          "page-wrapper",
        ) as HTMLElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLElement | null;
        // Banner Overlay
        const bannerBackgroundOverlay = main.current?.querySelector(
          ".contact-section .intro-background .intro-bg-mask",
        ) as HTMLElement | null;
        // Contact Form
        const contactForm = main.current?.querySelector(
          ".contact-section .contact-content .contact-form .contact-form-wrapper",
        ) as HTMLElement | null;
        // Contact Heading
        const contactHeading = main.current?.querySelector(
          ".contact-section .contact-content .contact-heading>h2",
        ) as HTMLElement | null;
        // Contact Info Item
        const contactInfoItem = main.current?.querySelectorAll(
          ".contact-section .contact-content .contact-info .info-item .info-item-wrapper",
        ) as NodeListOf<HTMLElement> | null;
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
          if (pageWrapper) {
            tl.to(pageWrapper, {
              opacity: 1,
              ease: "none",
              duration: 0.5,
              delay: 0,
            });
          }
          if (headerLeft) {
            tl.to(headerLeft, {
              autoAlpha: 1,
              ease: "none",
              duration: 1,
            });
          }
          if (headerRight) {
            tl.to(
              headerRight,
              {
                autoAlpha: 1,
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
    }

    // Cleanup function to kill animations on unmount
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [pageDataFetched, animationPlayed]);

  // Change logo
  useEffect(() => {
    const logo = document.getElementById("logo-light");
    const logoImage = logo?.querySelector("img") as HTMLImageElement | null;
    logoImage?.classList.add("white-image");
  }, [pathname]);

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

    const headerLeft = document.querySelector(
      "#header .header-left",
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
      <main
        ref={main}
        id="page"
        dir="ltr"
        className="main relative overflow-hidden z-10"
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
    )
  );
}
