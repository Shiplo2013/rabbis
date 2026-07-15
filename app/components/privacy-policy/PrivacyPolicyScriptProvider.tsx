"use client";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import TextSplitLines from "../../ui/TextSplitLines";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

type PageData = {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
};

export default function ContactScriptProvider({ data }: { data: PageData }) {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
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
  const staticData: PageData = {
    id: 0,
    title: {
      rendered: "Privacy Policy",
    },
    content: {
      rendered:
        "Suggested text: When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.",
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
    console.log("Page Data Fetched:", pageData);
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
        // Privacy Policy Content
        const privacyPolicyContent = main.current?.querySelector(
          ".privacy-policy-content",
        ) as HTMLElement | null;
        // Privacy Policy Heading
        const privacyPolicyHeading = main.current?.querySelector(
          "h1.privacy-policy-title",
        ) as HTMLElement | null;
        // Privacy Policy Heading
        let splitTitle;
        if (privacyPolicyHeading) {
          splitTitle = TextSplitLines(privacyPolicyHeading);
          gsap.set(privacyPolicyHeading, {
            perspective: 400,
          });
          gsap.set(splitTitle, {
            yPercent: 150,
            opacity: 0,
          });
        }
        // Privacy Policy Content
        if (privacyPolicyContent) {
          gsap.set(privacyPolicyContent, {
            y: 100,
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

          // Privacy Policy Heading
          if (privacyPolicyHeading && splitTitle) {
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

          // Privacy Policy Content
          if (privacyPolicyContent) {
            tl.to(
              privacyPolicyContent,
              {
                y: 0,
                opacity: 1,
                duration: 3,
                delay: 0,
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
          <h1 className="text-2xl font-bold">Privacy Policy Not Found</h1>
          <p className="text-gray-600">
            The requested privacy policy page could not be found.
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
        className="main relative overflow-hidden z-10 will-change-transform"
      >
        <div className="privacy-policy-page flex w-screen h-auto min-h-screen items-center justify-center relative overflow-hidden pt-[20vh] pb-[10vh]">
          <div className="privacy-policy-container w-[80%] max-w-287.5">
            <div className="privacy-policy-wrapper px-5">
              <h1 className="privacy-policy-title text-6xl leading-[1em] font-bold mb-8">
                {parse(pageData.title.rendered)}
              </h1>
              <div className="privacy-policy-content text-[18px] leading-[1.8em] text-[#c9c9c9] [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-2 [&>p:not(:last-child)]:mb-4 [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-4">
                {parse(pageData.content.rendered)}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
