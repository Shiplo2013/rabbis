import ButtonBorder from "@/app/assets/icons/ButtonBorder";
import ButtonText from "@/app/assets/icons/ButtonText";
import HambergerIcon from "@/app/assets/icons/HambergerIcon";
import StartIcon from "@/app/assets/icons/StarIcon";
import buttonIcon2 from "@/app/assets/images/header-button-icon.png";
import logo from "@/app/assets/images/logo.png";
import { useAppState } from "@/app/components/AppContext";
import ThemeButton from "@/app/ui/ThemeButton";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function MenuLeftElements({ data }: { data: any }) {
  const {
    setIsLoading,
    activeHamburgerMenu,
    setActiveHamburgerMenu,
    animationPlayed,
  } = useAppState();
  const router = useRouter();

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  return (
    <div className="header-left w-full lg:w-auto flex items-center lg:gap-6 pl-5 pr-5 lg:pt-7 lg:pb-7 lg:pl-0 lg:pr-0 opacity-0 bg-[#000000b0] lg:bg-transparent pt-2 pb-2">
      {data?.acf?.header_top?.donation_button && (
        <ThemeButton
          extraClass="py-2 px-5 hidden lg:block"
          bgColor="bg-[#BBA588]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#000000]"
          hoverTextColor="group-hover:text-[#FFFFFF]"
          text={data?.acf?.header_top?.donation_button?.text || "הרימו תרומה"}
          svgIconClass={""}
          buttonLink={
            data?.acf?.header_top?.donation_button?.link || "/donation"
          }
        />
      )}
      {data?.acf?.header_top?.community_button && (
        <ThemeButton
          extraClass="py-2 px-5 hidden lg:flex"
          bgColor="bg-[#5a7c4e]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#ac832e]"
          hoverTextColor="group-hover:text-[#000000]"
          icon={buttonIcon2}
          text={data?.acf?.header_top?.community_button?.text || "ביטאון"}
          svgIconClass={""}
          buttonLink={
            data?.acf?.header_top?.community_button?.link ||
            "/communities/sheets"
          }
        />
      )}
      <div className="circle-button">
        {data?.acf?.header_top?.music_button && (
          <Link
            className="group relative hidden lg:block"
            href={
              data?.acf?.header_top?.music_button?.link ||
              "/the-circle-of-the-year"
            }
            aria-label="Music Button"
            onClick={(e) => {
              handleLinkClick(e);
            }}
            prefetch={false}
          >
            <div className="button-content w-19 h-19 rounded-full flex items-center justify-center relative p-2 text-[18px] leading-[1em]">
              <div className="rounded-full w-full h-full flex items-center justify-center relative z-40">
                <div className="button-border absolute w-full h-full flex [&>svg]:w-full [&>svg]:h-auto transition-[opacity,scale]">
                  <ButtonBorder />
                </div>
                <div className="button-text absolute w-full h-full flex p-2 transition-opacity">
                  <ButtonText />
                </div>
                <StartIcon />
              </div>
            </div>
            <div className="button-bg absolute block top-0 left-0 w-full h-full rounded-full z-20 bg-[#E7D45E] transition-transform"></div>
            <div className="button-layer absolute block top-0 left-0 w-full h-full z-30 rounded-full bg-black transition-[opacity,scale]"></div>
          </Link>
        )}
      </div>
      <div className="mobile-btn block lg:hidden ml-auto">
        <button
          type="button"
          onClick={() => {
            setActiveHamburgerMenu(!activeHamburgerMenu);
          }}
          disabled={!animationPlayed}
          aria-label="Hamburger Menu Button"
          className="hamburger-btn cursor-pointer w-12 lg:w-14.5 h-12 lg:h-14.5 border border-[#dbbd5c80] flex justify-center items-center"
        >
          <HambergerIcon />
        </button>
      </div>
      <div className="logo w-14 h-auto lg:w-36.5 lg:h-28">
        {data?.acf?.header_logo && (
          <Link
            id="logo-light"
            onClick={handleLinkClick}
            href={"/"}
            prefetch={false}
            aria-label="Home Page"
          >
            <Image
              className="w-full h-full object-contain object-center white-image"
              src={data?.acf?.header_logo?.sizes?.thumbnail || logo.src}
              width={146}
              height={112}
              placeholder="blur"
              blurDataURL={logo?.blurDataURL}
              alt={"Logo"}
            />
          </Link>
        )}
        {!data?.acf?.header_logo && (
          <Link
            aria-label="Home Page"
            onClick={handleLinkClick}
            href={"/"}
            prefetch={false}
          >
            <Image
              className="w-full h-full object-contain object-center white-image"
              src={logo.src}
              width={146}
              height={112}
              placeholder="blur"
              blurDataURL={logo?.blurDataURL}
              alt="Logo"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
