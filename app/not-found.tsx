"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppState } from "./components/AppContext";
import { gsap } from "./ui/plugins";

export default function NotFound() {
  // Variable to track if the page data has been fetched
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, setIsLoading, animationPlayed } = useAppState();
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Set Page Data Fetched
  useEffect(() => {
    setIsLoading(false);

    const animations: gsap.core.Animation[] = [];
    if (typeof window !== "undefined") {
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

        // Set localStorage variable
        const userVisit = localStorage.getItem("hasVisited");
        if (userVisit === "true") {
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
        }
      });
    }
  }, [pathname, animationPlayed]);

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

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center w-screen h-screen bg-black text-white">
      <div className="max-w-5xl">
        <h1 className="text-[32px] sm:text-4xl lg:text-6xl leading-[1.2em]">
          404 - Page Not Found
        </h1>
        <p className="text-[16px] lg:text-[18px] leading-[1em] mt-4">
          The page you are looking for does not exist.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <a
            href="/"
            onClick={handleLinkClick}
            className="bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-all w-full h-full flex items-center justify-center py-3 px-4 rounded-md text-[16px] leading-[1em] font-bold max-w-xs"
          >
            Go back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
