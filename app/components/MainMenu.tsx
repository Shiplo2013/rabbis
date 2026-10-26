"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CloseIcon from "../assets/icons/CloseIcon";
import bagImage from "../assets/images/main-menu-bg.jpg";
import SubMenuItem from "../ui/SubMenuItem";
import { useAppState } from "./AppContext";
import BottomSearch from "./menu/BottomSearch";

interface MainMenuProps {
  data?: any;
}

export default function MainMenu() {
  const router = useRouter();
  const {
    isLoading,
    setIsLoading,
    activeHamburgerMenu,
    setActiveHamburgerMenu,
    appData,
  } = useAppState();
  const data = appData?.header?.acf?.hamburger_menu || {};

  const SUBMENU = [
    { id: 1, title: "שם הרב", link: "#" },
    { id: 2, title: "שם הרב", link: "#" },
  ];
  const SUBMENU2 = [
    { id: 1, title: "שם הרב", link: "/chronicles" },
    { id: 2, title: "שם הרב", link: "/chronicles" },
  ];
  const SUBMENU3 = [
    { id: 1, title: "שם הרב", link: "/communities" },
    { id: 2, title: "שם הרב", link: "/communities" },
  ];

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      activeHamburgerMenu && setActiveHamburgerMenu(!activeHamburgerMenu);
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <div
      id="main-menu"
      className={`fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-999 flex items-center justify-center gap-10 opacity-0 invisible py-[5vh] px-[5vw]`}
    >
      <div
        style={{
          backgroundImage: `url(${bagImage.src})`,
          clipPath: `circle(0% at 100% 0%)`,
        }}
        className="menu-background bg-cover absolute top-0 right-0 w-full h-full"
      ></div>
      <button
        type="button"
        onClick={() => {
          setActiveHamburgerMenu(!activeHamburgerMenu);
        }}
        aria-label="Close Menu"
        className="menu-close group absolute top-5 right-5 sm:top-8 sm:right-7 lg:right-12.5 w-12 lg:w-18 h-12 lg:h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f] z-50"
      >
        <CloseIcon className="group-hover:rotate-180 transition-transform duration-300 w-4 h-auto lg:w-auto" />
      </button>
      <div className="menu-wrapper w-full lg:w-[80%] h-auto max-h-screen overflow-auto text-[#E2D7C3] text-[20px] sm:text-[24px] py-[10vh] px-[5vw] sm:px-0">
        <div className="main-menu-top pr-4 flex overflow-hidden gap-10 sm:gap-[2vw] flex-col sm:flex-row">
          <div className="menu-right w-full sm:w-1/2 lg:w-1/4">
            {data?.right_menu?.menu_title && (
              <h3 className="text-[30px] sm:text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                {data.right_menu?.menu_title_link ? (
                  <Link
                    href={data.right_menu?.menu_title_link}
                    onClick={handleLinkClick}
                    prefetch={false}
                  >
                    {data.right_menu?.menu_title}
                  </Link>
                ) : (
                  data.right_menu?.menu_title
                )}
              </h3>
            )}
            {!data?.right_menu?.menu_title && (
              <h3 className="text-[30px] sm:text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                <Link href="/" onClick={handleLinkClick} prefetch={false}>
                  כנסת ישראל
                </Link>
              </h3>
            )}
            <div className="menu-list">
              <ul className="main-menu-list">
                {data?.right_menu?.menu_1?.map((item: any, index: number) => {
                  const haveSubmenu =
                    item.have_sub_menu && item.sub_menu.length > 0;
                  return (
                    <li className="group relative" key={item.title}>
                      {haveSubmenu ? (
                        <SubMenuItem
                          itemText={item.title}
                          subItem={item.sub_menu || SUBMENU2}
                          active={activeHamburgerMenu}
                          hideMenu={setActiveHamburgerMenu}
                        />
                      ) : (
                        <>
                          <Link
                            href={item.link}
                            onClick={handleLinkClick}
                            prefetch={false}
                            className="hover:text-[#C3A13F] transition-colors duration-500"
                          >
                            {item.title}
                          </Link>

                          <span className="bg-[#C3A13F] w-1.75 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 rotate-y-90 origin-right group-hover:rotate-y-0 transition-transform duration-300"></span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="bottom-menu mt-10">
                {data?.right_menu?.menu_2?.map((item: any, index: number) => (
                  <li className="group relative" key={item.link}>
                    <Link
                      href={item.link}
                      onClick={handleLinkClick}
                      prefetch={false}
                      className="hover:text-[#C3A13F] transition-colors duration-500"
                    >
                      {item.title}
                    </Link>

                    <span className="bg-[#C3A13F] w-1.75 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 rotate-y-90 origin-right group-hover:rotate-y-0 transition-transform duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu-left w-full sm:w-1/2 lg:w-1/4">
            {data?.left_menu && (
              <h3 className="text-[30px] sm:text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                {data.left_menu?.menu_title_link ? (
                  <Link
                    href={data.left_menu?.menu_title_link}
                    onClick={handleLinkClick}
                    prefetch={false}
                  >
                    {data.left_menu?.menu_title}
                  </Link>
                ) : (
                  data.left_menu?.menu_title
                )}
              </h3>
            )}
            {!data?.left_menu && (
              <h3 className="text-[30px] sm:text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                <Link href="/" onClick={handleLinkClick} prefetch={false}>
                  כנסת הבוגרים
                </Link>
              </h3>
            )}
            <div className="menu-list">
              <ul className="menu-list-items">
                {data?.left_menu?.menu_1?.map((item: any, index: number) => {
                  const haveSubmenu =
                    item.have_sub_menu && item.sub_menu.length > 0;
                  return (
                    <li className="group relative" key={item.title}>
                      {haveSubmenu ? (
                        <SubMenuItem
                          itemText={item.title}
                          subItem={item.sub_menu || SUBMENU3}
                          active={activeHamburgerMenu}
                          hideMenu={setActiveHamburgerMenu}
                        />
                      ) : (
                        <>
                          <Link
                            href={item.link}
                            onClick={handleLinkClick}
                            prefetch={false}
                            className="hover:text-[#C3A13F] transition-colors duration-500"
                          >
                            {item.title}
                          </Link>

                          <span className="bg-[#C3A13F] w-1.75 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 rotate-y-90 origin-right group-hover:rotate-y-0 transition-transform duration-300"></span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="bottom-menu mt-10">
                {data?.left_menu?.menu_2?.map((item: any, index: number) => (
                  <li className="group relative" key={item.link}>
                    <Link
                      href={item.link}
                      onClick={handleLinkClick}
                      prefetch={false}
                      className="hover:text-[#C3A13F] transition-colors duration-500"
                    >
                      {item.title}
                    </Link>
                    <span className="bg-[#C3A13F] w-1.75 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 rotate-y-90 origin-right group-hover:rotate-y-0 transition-transform duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="main-menu-bottom pr-4 mt-17 flex items-end gap-10 sm:gap-[2vw] flex-col sm:flex-row">
          <div className="bottom-menu w-full sm:w-1/2 lg:w-1/4">
            <ul className="menu-list">
              {data?.right_menu?.menu_3?.map((item: any, index: number) => (
                <li className="group relative" key={item.link}>
                  <Link
                    href={item.link}
                    onClick={handleLinkClick}
                    prefetch={false}
                    className="hover:text-[#C3A13F] transition-colors duration-500"
                  >
                    {item.title}
                  </Link>
                  <span className="bg-[#C3A13F] w-1.75 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 rotate-y-90 origin-right group-hover:rotate-y-0 transition-transform duration-300"></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-search w-full sm:w-1/2 lg:w-1/4">
            <BottomSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
