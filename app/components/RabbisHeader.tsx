"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ArrowRight from "../assets/icons/ArrowRight";
import logo from "../assets/images/logo.png";
import ThemeButton2 from "../ui/ThemeButton2";
import RabbisHamburgerMenu from "../ui/past-rabbis/RabbisHamburgerMenu";
import { useAppState } from "./AppContext";

interface RabbisHeaderProps {
  link: string;
  data: any;
}

export default function RabbisHeader() {
  const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    isLoading,
    setIsLoading,
    allRabbisPosts,
    activeRabbisMenu,
    setActiveRabbisMenu,
  } = useAppState();

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
    <>
      <header className="rabbis-header w-full lg:w-25 lg:h-screen bg-black fixed top-0 right-0 z-99 px-5 lg:px-3 py-3 lg:py-10 opacity-0 border-l border-[rgba(212,175,55,0.30)]">
        <div className="header-content w-full h-full flex flex-row lg:flex-col items-center justify-between lg:justify-center">
          <div className="back-link mt-0 lg:mb-auto">
            <Link
              href={"/past-rabbis"}
              onClick={handleLinkClick}
              className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300"
            >
              <div className="w-6 sm:w-8 h-auto transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </div>
            </Link>
          </div>
          <div className="logo lg:mb-auto">
            <div className="small-logo w-14 sm:w-18 sm:h-13">
              <Link href={"/"} onClick={handleLinkClick}>
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
          <div
            onClick={() => {
              setActiveRabbisMenu(!activeRabbisMenu);
            }}
            className="button cursor-pointer"
          >
            <ThemeButton2
              extraClass="border sm:border-2 border-[#D1A941] w-12 h-12 sm:w-14 sm:h-14 lg:w-17.5 lg:h-17.5 bg-[#D9D9D9] text-center !text-[14px] sm:!text-[16px] lg:!text-[18px] font-bold leading-[70%]"
              text={`כל הרבנים`}
              textColor="text-[#D1A941]"
              svgIconClass=""
              hoverBgColor="bg-[#D1A941]"
              hoverTextColor="group-hover:text-white"
            />
          </div>
        </div>
      </header>

      <RabbisHamburgerMenu />
    </>
  );
}
