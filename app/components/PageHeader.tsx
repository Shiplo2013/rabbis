"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP } from "../ui/plugins";
import { useAppState } from "./AppContext";
import MainMenu from "./MainMenu";
import MenuLeftElements from "./menu/MenuLeftElements";
import MenuRightElements from "./menu/MenuRightElements";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

function PageHeader() {
  // Get Location
  const router = useRouter();
  const { setIsLoading, activeHamburgerMenu, appData } = useAppState();
  const data = appData?.header || {};

  // Menu Activation
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  // Animate on active
  useGSAP(() => {
    // Timeline
    menuTimeline.current = gsap.timeline({ paused: true });
    // Selectors
    const mainMenu = document.getElementById("main-menu") as HTMLElement | null;
    const menuCloseButton = mainMenu?.querySelector(
      ".menu-close",
    ) as HTMLElement | null;
    const menuBackground = mainMenu?.querySelector(
      ".menu-background",
    ) as HTMLElement | null;
    const menuRight = mainMenu?.querySelector(
      ".menu-right",
    ) as HTMLElement | null;
    const menuLeft = mainMenu?.querySelector(
      ".menu-left",
    ) as HTMLElement | null;
    const bottomMenu = mainMenu?.querySelectorAll(
      ".bottom-menu",
    ) as NodeListOf<HTMLElement> | null;
    const bottomSearch = mainMenu?.querySelector(
      ".bottom-search",
    ) as HTMLElement | null;
    // Close button
    if (menuCloseButton) {
      gsap.set(menuCloseButton, {
        scale: 0,
        rotate: 360,
      });
    }
    if (menuRight && menuLeft && bottomMenu && bottomSearch) {
      gsap.set([menuRight, menuLeft, bottomMenu, bottomSearch], {
        yPercent: 100,
        opacity: 0,
      });
    }
    // Animate on active
    if (mainMenu && menuBackground) {
      menuTimeline?.current.to(mainMenu, {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
      });
      menuTimeline?.current.to(menuBackground, {
        clipPath: "circle(150% at 100% 0%)",
        ease: "expo.inOut",
        duration: 2,
        delay: 0,
      });
    }
    if (menuRight && menuLeft && bottomMenu && bottomSearch) {
      menuTimeline?.current.to(
        [menuRight, menuLeft, bottomMenu, bottomSearch],
        {
          yPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          duration: 1.5,
          delay: 0,
        },
        "-=1.5",
      );
    }
    if (menuCloseButton) {
      menuTimeline?.current.to(
        menuCloseButton,
        {
          scale: 1,
          ease: "expo.inOut",
          duration: 1.5,
          rotate: 0,
          delay: 0,
        },
        "-=1.5",
      );
    }
  }, []);

  useGSAP(() => {
    if (menuTimeline?.current) {
      activeHamburgerMenu
        ? menuTimeline?.current.play()
        : menuTimeline?.current.reverse();
    }
  }, [activeHamburgerMenu]);

  return (
    <>
      <header
        id="header"
        className="fixed w-screen h-0 top-0 left-0 flex justify-between items-start z-99 pl-0 lg:pl-10"
      >
        <MenuRightElements data={data} />
        <MenuLeftElements data={data} />
      </header>

      <MainMenu />
    </>
  );
}

export default PageHeader;
