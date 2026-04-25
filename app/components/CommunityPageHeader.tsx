import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HambergerIcon from "../assets/icons/HambergerIcon";
import logo from "../assets/images/logo.png";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import MainMenu from "./MainMenu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CommunityPageHeader({
  animationStatus,
}: {
  animationStatus: boolean;
}) {
  const SectionData = {
    leftMenu: [
      {
        title: `כנסת הבוגרים`,
        link: `/`,
      },
      {
        title: `תמונות מחזור`,
        link: `/`,
      },
      {
        title: `בוגרים זצ״ל`,
        link: `/`,
      },
      {
        title: `ראיונות`,
        link: `/`,
      },
    ],
    rightMenu: [
      {
        title: `כל הקהילות`,
        link: `/`,
      },
      {
        title: `עד שבחברון`,
        link: `/`,
      },
      {
        title: `ביטאון`,
        link: `/`,
      },
      {
        title: `כנסת המנהגים`,
        link: `/`,
      },
    ],
  };
  // Menu Activation
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [menuTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );
  // Animate on active
  useGSAP(() => {
    // Close button
    gsap.set(".menu-close", {
      scale: 0,
      rotate: 360,
    });
    gsap.set(".menu-right, .menu-left, .bottom-menu, .bottom-search", {
      yPercent: 100,
      opacity: 0,
    });
    // Animate on active
    menuTimeline
      .to("#main-menu", {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
      })
      .to(".menu-background", {
        clipPath: "circle(150% at 100% 0%)",
        ease: "expo.inOut",
        duration: 2,
        delay: 0,
      })
      .to(
        ".menu-right, .menu-left, .bottom-menu, .bottom-search",
        {
          yPercent: 0,
          ease: "expo.inOut",
          duration: 1.5,
          opacity: 1,
          delay: 0,
        },
        "-=1.5",
      )
      .to(
        ".menu-close",
        {
          scale: 1,
          ease: "expo.inOut",
          duration: 1.5,
          rotate: 0,
          delay: 0,
        },
        "-=1.5",
      );
  }, []);
  useGSAP(() => {
    isMenuActive ? menuTimeline.play() : menuTimeline.reverse();
  }, [isMenuActive]);
  return (
    <>
      <header className="community-page-header bg-[#091B24] text-white py-6 px-10 z-30 w-full opacity-0 relative">
        <div className="header-wrapper flex items-center justify-between">
          <div className="header-right flex items-center gap-x-9">
            <button
              onClick={() => setIsMenuActive(!isMenuActive)}
              disabled={!animationStatus}
              className="hamburger-btn cursor-pointer w-10 h-10 flex justify-center items-center"
            >
              <HambergerIcon />
            </button>
            <div className="menu flex items-center gap-x-9">
              {SectionData.rightMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="menu-item text-[#ffffff] text-[26px] hover:text-[#C3A13F] transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="header-center">
            <div className="small-logo w-18 h-13">
              <Link href={"/"}>
                <Image
                  className="w-auto h-auto white-image"
                  src={logo.src}
                  width={72}
                  height={54}
                  loading="lazy"
                  alt="Small Logo"
                />
              </Link>
            </div>
          </div>
          <div className="header-left">
            <div className="menu flex items-center gap-x-9">
              {SectionData.leftMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="menu-item text-[#ffffff] text-[26px] hover:text-[#C3A13F] transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <MainMenu
        active={isMenuActive}
        hideMenu={setIsMenuActive}
        timeLine={menuTimeline}
      />
    </>
  );
}
