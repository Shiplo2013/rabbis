"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonBorder from "../assets/icons/ButtonBorder";
import ButtonText from "../assets/icons/ButtonText";
import HambergerIcon from "../assets/icons/HambergerIcon";
import StartIcon from "../assets/icons/StarIcon";
import donationIcon from "../assets/images/donation-icon.svg";
import buttonIcon2 from "../assets/images/header-button-icon.png";
import logo from "../assets/images/logo.png";
import { gsap, useGSAP } from "../ui/plugins";
import ThemeButton from "../ui/ThemeButton";
import { useAppState } from "./AppContext";
import MainMenu from "./MainMenu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

function PageHeader() {
  // Get Location
  const pathname = usePathname();
  const router = useRouter();
  const {
    isLoading,
    setIsLoading,
    activeHamburgerMenu,
    setActiveHamburgerMenu,
    animationPlayed,
    appData,
  } = useAppState();
  const data = appData?.header || {};
  // Menu Links
  const links = [
    {
      href: "#",
      name: "הישיבה ומוסדותתיה",
      icon: false,
      submenus: {
        head: false,
        class: "-mb-2",
        menu1: [
          {
            id: 1,
            name: `לבקר בהיכלו`,
            link: "/visit-temple",
            comingsoon: false,
          },
          { id: 2, name: `מוסדות הישיבה`, link: "#", comingsoon: true },
        ],
      },
    },
    { href: "/chronicles", name: "דברי הימים", icon: false },
    { href: "#", name: "מזקנים אתבונן", icon: false },
    { href: "/yeshiva-rabbis", name: "רבני הישיבה", icon: false },
    { href: "/the-circle-of-the-year", name: "מועדים וזמנים", icon: false },
    {
      href: "/",
      name: "כנסת הבוגרים",
      icon: false,
      submenus: {
        head: true,
        class: "-mb-8",
        menu1: [
          {
            id: 2,
            name: `ראיונות - עדויות`,
            link: "/testimonials",
            comingsoon: false,
          },
          { id: 3, name: `קהילות`, link: "/communities", comingsoon: false },
          {
            id: 4,
            name: `גליונות - ביטאון`,
            link: "/communities/sheets",
            comingsoon: false,
          },
          {
            id: 5,
            name: `בוגרים זצ״ל`,
            link: "/zatzel-graduates",
            comingsoon: false,
          },
          {
            id: 6,
            name: `כנס הבוגרים`,
            link: "/alumni-conference",
            comingsoon: false,
          },
          {
            id: 7,
            name: `תמונות מחזור`,
            link: "/cycle-pictures",
            comingsoon: false,
          },
        ],
        menu2: [
          {
            id: 1,
            name: `כנסת המנהגים`,
            link: "/the-knesset-of-customs",
            comingsoon: false,
          },
          {
            id: 2,
            name: `עד שבחברון - חדשות`,
            link: "/news",
            comingsoon: true,
          },
        ],
      },
    },
    { href: "/donation", name: "לתרומות", icon: true },
  ];

  // Menu Activation
  const [isMounted, setIsMounted] = useState(false);
  const [menuTimeline] = useState(
    gsap.timeline({
      paused: true,
    }),
  );
  // Animate on active
  useGSAP(() => {
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
      menuTimeline.to(mainMenu, {
        opacity: 1,
        visibility: "visible",
        duration: 0,
        delay: 0,
      });
      menuTimeline.to(menuBackground, {
        clipPath: "circle(150% at 100% 0%)",
        ease: "expo.inOut",
        duration: 2,
        delay: 0,
      });
    }
    if (menuRight && menuLeft && bottomMenu && bottomSearch) {
      menuTimeline.to(
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
      menuTimeline.to(
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
    activeHamburgerMenu ? menuTimeline.play() : menuTimeline.reverse();
  }, [activeHamburgerMenu]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      <header
        id="header"
        className="fixed w-screen h-0 top-0 left-0 flex justify-between items-start z-99 pl-0 lg:pl-10"
      >
        <div className="header-right items-start pr-17 opacity-0 hidden lg:flex">
          <div className="horizontal-menu bg-[#000000B2] border border-[#DBBD5C80] h-screen fixed top-0 right-0">
            <button
              onClick={() => {
                setActiveHamburgerMenu(!activeHamburgerMenu);
              }}
              disabled={!animationPlayed}
              className="hamburger-btn cursor-pointer w-14.5 h-14.5 flex justify-center items-center"
            >
              <HambergerIcon />
            </button>
            <nav className="nav-menu absolute top-14.5 right-0 w-[calc(100vh-58px)] h-14.5 flex items-stretch justify-stretch origin-topright mr-14.5 -rotate-90">
              {data?.acf?.header_right &&
                data?.acf?.header_right?.menu.map(
                  (item: any, index: number) => {
                    const isActive = isMounted && pathname === item.link;
                    const haveSubmenu = item.subMenu && item.subMenu.length > 0;
                    return (
                      <div
                        key={index}
                        className="menu-item group/parent flex items-center justify-center relative"
                      >
                        <Link
                          className={`text-[#E2D7C3] w-full h-full flex items-center justify-center`}
                          href={item.link}
                          onClick={(e) => {
                            handleLinkClick(e);
                          }}
                          prefetch={false}
                        >
                          <span
                            className={`indicator bg-[#C3A13F] w-full ${isActive ? "h-2" : "h-0"} absolute left-0 bottom-full transition-all duration-300`}
                          ></span>
                          <span
                            className={`flex justify-center items-center w-full h-full  transition-all origin-center border border-[#000000B2] ${haveSubmenu ? "submenu" : "group-hover/parent:border-[#DBBD5C80] group-hover/parent:bg-[#000000B2] group-hover/parent:rotate-90 group-hover/parent:-mt-[50%]"}`}
                          >
                            {item.title}
                          </span>
                        </Link>
                        {haveSubmenu && index === 0 && (
                          <div
                            className={`submenu-content absolute bottom-full pr-10 transition-all duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0`}
                          >
                            <div
                              className={`submenu-items flex flex-col -mb-2`}
                            >
                              <div className="menu1 flex flex-col gap-y-2 false undefined border-[#C3A13F]">
                                {item.subMenu.map(
                                  (subItem: any, subIndex: number) => {
                                    return (
                                      <div
                                        key={subIndex}
                                        className="relative px-3 py-5 bg-[#000000B2] border border-[#DBBD5C80] w-full"
                                      >
                                        <Link
                                          onClick={(e) => {
                                            handleLinkClick(e);
                                          }}
                                          prefetch={false}
                                          href={subItem.link}
                                          className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-all duration-300 block`}
                                        >
                                          <span>{subItem.title}</span>
                                          <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5"></span>
                                        </Link>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {haveSubmenu && index !== 0 && (
                          <div
                            className={`submenu-content absolute bottom-full pr-10 transition-all duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0 -mb-8`}
                          >
                            {item.subMenu.map(
                              (subItem: any, subIndex: number) => {
                                if (subIndex === 0) {
                                  return (
                                    <div
                                      key={subIndex}
                                      className="menu-head bg-[#000000B2] border border-[#DBBD5C80] px-4 py-3 mb-1.5 text-[#E2D7C3] text-[15.55px] leading-[70%]"
                                    >
                                      <Link
                                        href={
                                          subItem.link || "/yeshiva-graduates"
                                        }
                                        onClick={(e) => {
                                          handleLinkClick(e);
                                        }}
                                        prefetch={false}
                                      >
                                        {subItem.title}
                                      </Link>
                                    </div>
                                  );
                                }
                              },
                            )}
                            <div className="submenu-items border border-[#DBBD5C80] bg-[#000000B2] flex flex-col">
                              <div className="menu1 flex flex-col gap-y-2 p-3 border-b border-[#C3A13F]">
                                {item.subMenu.map(
                                  (subItem: any, subIndex: number) => {
                                    if (subIndex > 0 && subIndex < 7) {
                                      return (
                                        <Link
                                          key={subIndex}
                                          href={subItem.link}
                                          onClick={(e) => {
                                            handleLinkClick(e);
                                          }}
                                          prefetch={false}
                                          className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-all duration-300`}
                                        >
                                          <span>{subItem.title}</span>
                                          <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5"></span>
                                        </Link>
                                      );
                                    }
                                  },
                                )}
                              </div>
                              <div className="menu2 p-3 flex flex-col gap-y-2">
                                {item.subMenu.map(
                                  (subItem: any, subIndex: number) => {
                                    if (subIndex >= 7) {
                                      return (
                                        <Link
                                          key={subIndex}
                                          href={subItem.link}
                                          onClick={(e) => {
                                            handleLinkClick(e);
                                          }}
                                          prefetch={false}
                                          className="submenu-item group/child text-[#E2D7C3] leading-[70%] text-[15px] hover:text-[#C3A13F] relative transition-all duration-300"
                                        >
                                          <span>{subItem.title}</span>
                                          <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover/child:opacity-100 group-hover/child:w-1.5"></span>
                                        </Link>
                                      );
                                    }
                                  },
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              {data?.acf?.header_right?.donation_button && (
                <div className="menu-item group/parent flex items-center justify-center relative">
                  <Link
                    key={data?.acf?.header_right?.donation_button?.text}
                    className={`gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-all w-full h-full flex items-center justify-center`}
                    href={
                      data?.acf?.header_right?.donation_button?.link ||
                      "/donation"
                    }
                    onClick={(e) => {
                      handleLinkClick(e);
                    }}
                    prefetch={false}
                  >
                    <Image
                      className="w-auto h-auto rotate-90"
                      src={donationIcon.src}
                      width={13}
                      height={23}
                      //blurDataURL={donationIcon?.blurDataURL}
                      //placeholder="blur"
                      alt={data?.acf?.header_right?.donation_button?.title}
                    />
                    <span>
                      {data?.acf?.header_right?.donation_button?.title}
                    </span>
                  </Link>
                </div>
              )}
              {!data?.acf?.header_right &&
                links.map((link, index) => {
                  const isActive = isMounted && pathname === link.href;
                  const haveSubmenu =
                    link.submenus && link.submenus.menu1.length > 0;
                  return (
                    <div
                      key={index}
                      className="menu-item group/parent flex items-center justify-center relative"
                    >
                      <Link
                        key={link.name}
                        onClick={(e) => {
                          handleLinkClick(e);
                        }}
                        prefetch={false}
                        className={`${
                          link.icon
                            ? "gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-all"
                            : "text-[#E2D7C3]"
                        } w-full h-full flex items-center justify-center`}
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
                              //blurDataURL={donationIcon?.blurDataURL}
                              //placeholder="blur"
                              alt="לתרומות"
                            />
                            <span>לתרומות</span>
                          </>
                        ) : (
                          <span
                            className={`flex justify-center items-center w-full h-full  transition-all origin-center border border-[#000000B2] ${haveSubmenu ? "submenu" : "group-hover/parent:border-[#DBBD5C80] group-hover/parent:bg-[#000000B2] group-hover/parent:rotate-90 group-hover/parent:-mt-[50%]"}`}
                          >
                            {link.name}
                          </span>
                        )}
                      </Link>
                      {haveSubmenu && (
                        <div
                          className={`submenu-content absolute bottom-full pr-10 transition-all duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0 ${link.submenus.class}`}
                        >
                          {link.submenus.head && (
                            <div className="menu-head bg-[#000000B2] border border-[#DBBD5C80] px-4 py-3 mb-1.5 text-[#E2D7C3] text-[15.55px] leading-[70%]">
                              <Link
                                href={"/yeshiva-graduates"}
                                onClick={(e) => {
                                  handleLinkClick(e);
                                }}
                                prefetch={false}
                              >
                                {link.name}
                              </Link>
                            </div>
                          )}
                          <div
                            className={`submenu-items ${link.submenus.head && "border border-[#DBBD5C80] bg-[#000000B2] "} flex flex-col`}
                          >
                            {link.submenus.menu1 && (
                              <div
                                className={`menu1 flex flex-col gap-y-2 ${link.submenus.head && "p-3"} ${link.submenus.menu2 && "border-b"} border-[#C3A13F]`}
                              >
                                {link.submenus.head
                                  ? link.submenus.menu1.map((item) => (
                                      <Link
                                        key={item.id}
                                        className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-all duration-300`}
                                        href={item.link}
                                        onClick={(e) => {
                                          handleLinkClick(e);
                                        }}
                                        prefetch={false}
                                      >
                                        <span>{item.name}</span>
                                        <span
                                          className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5`}
                                        ></span>
                                      </Link>
                                    ))
                                  : link.submenus.menu1.map((item) => (
                                      <div
                                        key={item.id}
                                        className="relative px-3 py-5 bg-[#000000B2] border border-[#DBBD5C80] w-full"
                                      >
                                        <Link
                                          className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-all duration-300 block`}
                                          href={item.link}
                                          onClick={(e) => {
                                            handleLinkClick(e);
                                          }}
                                          prefetch={false}
                                        >
                                          <span>{item.name}</span>
                                          <span
                                            className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5`}
                                          ></span>
                                          {item.comingsoon && (
                                            <div className="comingsoon absolute top-0 right-full flex items-center justify-center text-[#D4AF37] text-[16px] mr-7 font-bold opacity-0 transition-all duration-300 group-hover:opacity-100">
                                              בקרוב
                                            </div>
                                          )}
                                        </Link>
                                      </div>
                                    ))}
                              </div>
                            )}
                            {link.submenus.menu2 && (
                              <div className="menu2 p-3 flex flex-col gap-y-2">
                                {link.submenus.menu2.map((item) => (
                                  <Link
                                    key={item.id}
                                    className="submenu-item group/child text-[#E2D7C3] leading-[70%] text-[15px] hover:text-[#C3A13F] relative transition-all duration-300"
                                    href={item.link}
                                    onClick={(e) => {
                                      handleLinkClick(e);
                                    }}
                                    prefetch={false}
                                  >
                                    <span>{item.name}</span>
                                    <span
                                      className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-all duration-300 group-hover/child:opacity-100 group-hover/child:w-1.5`}
                                    ></span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </nav>
          </div>

          {/* <div className="small-logo pt-5 pb-5 w-12.5 h-10">
            {data?.acf?.header_logo && (
              <Image
                className="w-auto h-auto white-image"
                src={data?.acf?.header_logo?.sizes?.thumbnail}
                width={50}
                height={40}
                loading="lazy"
                alt="Small Logo"
              />
            )}
            {!data?.acf?.header_logo && (
              <Image
                className="w-auto h-auto white-image"
                src={logo.src}
                width={50}
                height={40}
                loading="lazy"
                alt="Small Logo"
              />
            )}
          </div> */}
        </div>
        <div className="header-left w-full lg:w-auto flex items-center lg:gap-6 pl-5 pr-5 lg:pt-7 lg:pb-7 lg:pl-0 lg:pr-0 opacity-0 bg-[#000000b0] lg:bg-transparent pt-2 pb-2">
          {data?.acf?.header_top?.donation_button && (
            <ThemeButton
              extraClass="py-2 px-5 hidden lg:block"
              bgColor="bg-[#BBA588]"
              textColor="text-[#000000]"
              hoverBgColor="bg-[#000000]"
              hoverTextColor="group-hover:text-[#FFFFFF]"
              text={
                data?.acf?.header_top?.donation_button?.text || "הרימו תרומה"
              }
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
                onClick={(e) => {
                  handleLinkClick(e);
                }}
                prefetch={false}
              >
                <div className="button-content w-19 h-19 rounded-full flex items-center justify-center relative p-2 text-[18px] leading-[1em]">
                  <div className="rounded-full w-full h-full flex items-center justify-center relative z-40">
                    <div className="button-border absolute w-full h-full flex transition-all duration-500 [&>svg]:w-full [&>svg]:h-auto">
                      <ButtonBorder />
                    </div>
                    <div className="button-text absolute w-full h-full flex p-2 transition-all duration-500">
                      <ButtonText />
                    </div>
                    <StartIcon />
                  </div>
                </div>
                <div className="button-bg absolute block top-0 left-0 w-full h-full rounded-full z-20 bg-[#E7D45E] transition-all duration-500"></div>
                <div className="button-layer absolute block top-0 left-0 w-full h-full z-30 rounded-full bg-black transition-all duration-500"></div>
              </Link>
            )}
          </div>
          <div className="mobile-btn block lg:hidden ml-auto">
            <button
              onClick={() => {
                setActiveHamburgerMenu(!activeHamburgerMenu);
              }}
              disabled={!animationPlayed}
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
              <Link onClick={handleLinkClick} href={"/"} prefetch={false}>
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
      </header>

      <MainMenu />
    </>
  );
}

export default PageHeader;
