import Image from "next/image";
import Link from "next/link";
import HambergerIcon from "../assets/icons/HambergerIcon";
import logo from "../assets/images/logo.png";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";
import { useAppState } from "./AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CommunityPageHeader() {
  const {
    appData,
    animationPlayed,
    activeHamburgerMenu,
    setActiveHamburgerMenu,
  } = useAppState();
  const SectionData = {
    leftMenu: [
      {
        title: `כנסת הבוגרים`,
        link: `/`,
        id: 1,
      },
      {
        title: `תמונות מחזור`,
        link: `/`,
        id: 2,
      },
      {
        title: `בוגרים זצ״ל`,
        link: `/`,
        id: 3,
      },
      {
        title: `ראיונות`,
        link: `/`,
        id: 4,
      },
    ],
    rightMenu: [
      {
        title: `כל הקהילות`,
        link: `/`,
        id: 5,
      },
      {
        title: `עד שבחברון`,
        link: `/`,
        id: 6,
      },
      {
        title: `ביטאון`,
        link: `/`,
        id: 7,
      },
      {
        title: `כנסת המנהגים`,
        link: `/`,
        id: 8,
      },
    ],
  };

  return (
    <>
      <header className="community-page-header bg-[#091B24] text-white py-6 px-10 z-30 w-full opacity-0 relative hidden lg:block">
        <div className="header-wrapper flex items-center justify-between">
          <div className="header-right flex items-center gap-x-9">
            <button
              type="button"
              onClick={() => setActiveHamburgerMenu(!activeHamburgerMenu)}
              disabled={!animationPlayed}
              aria-label="Hamburger Menu Button"
              className="hamburger-btn cursor-pointer w-10 h-10 flex justify-center items-center"
            >
              <HambergerIcon />
            </button>
            <div className="menu flex items-center gap-x-9">
              {appData?.headerCommunity &&
                appData?.headerCommunity?.acf?.header_right.map(
                  (item: any, index: number) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="menu-item text-[#ffffff] text-[26px] hover:text-[#C3A13F] transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  ),
                )}
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
                  unoptimized
                />
              </Link>
            </div>
          </div>
          <div className="header-left hidden md:block">
            <div className="menu flex items-center gap-x-9">
              {appData?.headerCommunity &&
                appData?.headerCommunity?.acf?.header_left.map(
                  (item: any, index: number) => (
                    <Link
                      key={item.link}
                      href={item.link}
                      className="menu-item text-[#ffffff] text-[26px] hover:text-[#C3A13F] transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                  ),
                )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
