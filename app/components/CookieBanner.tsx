"use client";

import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "../assets/icons/Cookies";
import { gsap, useGSAP } from "../ui/plugins";
import { useAppState } from "./AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { animationPlayed, setAnimationPlayed, setIsLoading } = useAppState();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if the user has already made a choice
    if (!hasCookie("localConsent")) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Set cookie for 1 year
    setCookie("localConsent", "true", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  const declineCookies = () => {
    setCookie("localConsent", "false", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  };

  useGSAP(() => {
    if (!hasCookie("localConsent") && bannerRef.current && animationPlayed) {
      const timeout = setTimeout(() => {
        if (bannerRef.current) {
          gsap.to(bannerRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, 10000); // Delay to ensure the component is mounted

      return () => clearTimeout(timeout);
    }
  }, [animationPlayed]);

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      window.open(e.currentTarget.href, "_blank");
    }
  };

  return (
    <div
      ref={bannerRef}
      className="cookie-banner fixed left-22 bottom-6 flex items-center translate-y-20 opacity-0 invisible z-50"
    >
      <Link
        href="/privacy-policy"
        target="_blank"
        onClick={handleLinkClick}
        className="cookies-icon ml-2"
      >
        <Cookies />
      </Link>
      <div className="cookies-text text-[14px] leading-[1em] bg-black text-white py-2 px-5 h-10 flex items-center">
        <p>האתר הזה משתמש בעוגיות</p>
      </div>
      <div
        onClick={() => {
          acceptCookies();
          console.log(
            "Cookies accepted",
            hasCookie("localConsent"),
            showBanner,
          );
        }}
        className="cookies-text text-[17px] leading-[1em] bg-(--theme-color) hover:bg-[#DBBD5C80] text-[#010101] py-2 px-5 h-10 flex items-center cursor-pointer"
      >
        <p>אישור</p>
      </div>
    </div>
  );
}
