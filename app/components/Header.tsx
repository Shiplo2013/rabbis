"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonBorder from "../assets/icons/ButtonBorder";
import ButtonText from "../assets/icons/ButtonText";
import HambergerIcon from "../assets/icons/HambergerIcon";
import StartIcon from "../assets/icons/StarIcon";
import donationIcon from "../assets/images/donation-icon.svg";
import buttonIcon2 from "../assets/images/header-button-icon.png";
import logo from "../assets/images/logo.png";
import MainMenu from "../components/MainMenu";
import { gsap, useGSAP } from "../ui/plugins";
import ThemeButton from "../ui/ThemeButton";

function Header({ animationStatus }: { animationStatus: boolean }) {
  // Get Location
  const location = usePathname();
  // Menu Links
  const links = [
    { href: "/contact", name: "הווייתה", icon: false },
    { href: "/chronicles", name: "דברי הימים", icon: false },
    { href: "/about", name: "מזקנים אתבונן", icon: false },
    { href: "/yeshiva-rabbis", name: "רבני הישיבה", icon: false },
    { href: "", name: "מועדים וזמנים", icon: false },
    { href: "", name: "כנסת הבוגרים", icon: false },
    { href: "/donation", name: "לתרומות", icon: true },
  ];

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
    gsap.set(".menu-background", {
      width: 0,
      height: 0,
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
        width: "100vw",
        height: "100vh",
        ease: "easeInOut",
        duration: 0.5,
      })
      .to(".menu-right, .menu-left, .bottom-menu, .bottom-search", {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
      })
      .to(".menu-close", {
        scale: 1,
        rotate: 0,
      });
  }, []);
  useGSAP(() => {
    isMenuActive ? menuTimeline.play() : menuTimeline.reverse();
  }, [isMenuActive]);
  return (
    <>
      <header className="fixed w-screen h-0 top-0 left-0 flex justify-between items-start z-40 pl-10">
        <div className="header-right flex items-start pr-17 opacity-0">
          <div className="horizontal-menu bg-[#000000B2] border border-[#DBBD5C80] h-screen fixed top-0 right-0">
            <button
              onClick={() => setIsMenuActive(!isMenuActive)}
              disabled={!animationStatus}
              className="hamburger-btn cursor-pointer w-14.5 h-14.5 flex justify-center items-center"
            >
              <HambergerIcon />
            </button>
            <nav className="nav-menu absolute top-14.5 right-0 w-[calc(100vh-58px)] h-14.5 flex items-stretch justify-stretch origin-topright mr-14.5 -rotate-90">
              {links.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.name}
                    className={
                      link.icon
                        ? "gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-all"
                        : "group text-[#E2D7C3]"
                    }
                    href={link.href}
                  >
                    {!link.icon && (
                      <span
                        className={`indicator bg-[#C3A13F] w-full ${isActive ? "h-2" : "h-0"} absolute left-0 bottom-full transition-all duration-300`}
                      ></span>
                    )}
                    {link.icon ? (
                      <>
                        <Image
                          className="w-auto h-auto rotate-90"
                          src={donationIcon.src}
                          width={13}
                          height={23}
                          loading="lazy"
                          //blurDataURL={donationIcon?.blurDataURL}
                          //placeholder="blur"
                          alt="לתרומות"
                        />
                        <span>לתרומות</span>
                      </>
                    ) : (
                      <span className="flex justify-center items-center w-full h-full group-hover:bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                        {link.name}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="small-logo pt-5 pb-5 w-12.5 h-10">
            <Image
              className="w-auto h-auto white-image"
              src={logo.src}
              width={50}
              height={40}
              loading="lazy"
              alt="Small Logo"
            />
          </div>
        </div>
        <div className="header-left flex items-center gap-6 pt-7 pb-7 opacity-0">
          <ThemeButton
            extraClass="py-3.5 px-5"
            bgColor="bg-[#BBA588]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#000000]"
            hoverTextColor="group-hover:text-[#FFFFFF]"
            text="הרימו תרומה"
            svgIconClass={""}
          />
          <ThemeButton
            extraClass="py-3.5 px-5"
            bgColor="bg-[#5a7c4e]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#ac832e]"
            hoverTextColor="group-hover:text-[#000000]"
            icon={buttonIcon2}
            text="ביטאון"
            svgIconClass={""}
          />
          <div className="circle-button">
            <Link className="group relative" href="/">
              <div className="button-content w-19 h-19 rounded-full flex items-center justify-center relative p-2">
                <div className="rounded-full w-full h-full flex items-center justify-center relative z-40">
                  <div className="button-border absolute w-full h-full flex transition-all duration-500">
                    <ButtonBorder />
                  </div>
                  <div className="button-text absolute w-full h-full flex p-2 transition-all duration-500">
                    <ButtonText />
                  </div>
                  <StartIcon />
                </div>
              </div>
              <div className="button-bg absolute top-0 left-0 w-full h-full rounded-full z-20 bg-[#E7D45E] transition-all duration-500"></div>
              <div className="button-layer absolute top-0 left-0 w-full h-full z-30 rounded-full bg-[#000000] transition-all duration-500"></div>
            </Link>
          </div>
          <div className="logo lg:w-25 sm:w-20 xl:w-30 2xl:w-36.5 w-36.5 h-28">
            <Link href={"/"}>
              <Image
                className="w-full h-full object-contain object-center white-image"
                src={logo.src}
                width={146}
                height={112}
                loading="lazy"
                placeholder="blur"
                blurDataURL={logo?.blurDataURL}
                alt="Logo"
              />
            </Link>
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

export default Header;
