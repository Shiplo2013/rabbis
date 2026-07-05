"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import Search from "../assets/icons/Search";
import bagImage from "../assets/images/main-menu-bg.jpg";
import SubMenuItem from "../ui/SubMenuItem";

interface MainMenuProps {
  active: boolean;
  hideMenu: (status: boolean) => void;
  timeLine: any;
  data?: any;
}

export default function MainMenu({
  active,
  hideMenu,
  timeLine,
  data,
}: MainMenuProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    console.log("MainMenu data:", data);
  }, [data]);

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
  // Get elements
  //const closeBTN = useRef(null);
  //    const closeMenu = () => {
  //     timeLine.reversed() ? timeLine.play() : timeLine.reverse();
  //    }
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
        onClick={() => {
          hideMenu(false);
          //closeMenu();
        }}
        className="menu-close group absolute top-8 right-12.5 w-18 h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f]"
      >
        <CloseIcon className="group-hover:rotate-180 transition-all duration-300" />
      </button>
      <div className="menu-wrapper w-[80%] h-auto text-[#E2D7C3] text-[24px]">
        <div className="main-menu-top pr-4 flex overflow-hidden gap-[2vw]">
          <div className="menu-right w-1/4">
            {data?.right_menu?.menu_title && (
              <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                {data.right_menu?.menu_title_link ? (
                  <Link href={data.right_menu?.menu_title_link}>
                    {data.right_menu?.menu_title}
                  </Link>
                ) : (
                  data.right_menu?.menu_title
                )}
              </h3>
            )}
            {!data?.right_menu?.menu_title && (
              <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                <Link href="/">כנסת ישראל</Link>
              </h3>
            )}
            <div className="menu-list">
              <ul className="main-menu-list">
                {data?.right_menu?.menu_1?.map((item: any, index: number) => {
                  const haveSubmenu = item.sub_menu && item.sub_menu.length > 0;
                  return (
                    <li className="group relative" key={index}>
                      {haveSubmenu ? (
                        <SubMenuItem
                          itemText={item.title}
                          subItem={item.sub_menu || SUBMENU2}
                        />
                      ) : (
                        <Link
                          href={item.link}
                          className="hover:text-[#C3A13F] transition-colors duration-500"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="bottom-menu mt-10">
                {data?.right_menu?.menu_2?.map((item: any, index: number) => (
                  <li className="group relative" key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-[#C3A13F] transition-colors duration-500"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu-left w-1/4">
            {data?.left_menu && (
              <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                {data.left_menu?.menu_title_link ? (
                  <Link href={data.left_menu?.menu_title_link}>
                    {data.left_menu?.menu_title}
                  </Link>
                ) : (
                  data.left_menu?.menu_title
                )}
              </h3>
            )}
            {!data?.left_menu && (
              <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">
                <Link href="/">כנסת הבוגרים</Link>
              </h3>
            )}
            <div className="menu-list">
              <ul className="menu-list-items">
                {data?.left_menu?.menu_1?.map((item: any, index: number) => {
                  const haveSubmenu = item.sub_menu && item.sub_menu.length > 0;
                  return (
                    <li className="group relative" key={index}>
                      {haveSubmenu ? (
                        <SubMenuItem
                          itemText={item.title}
                          subItem={item.sub_menu || SUBMENU3}
                        />
                      ) : (
                        <>
                          <Link
                            href={item.link}
                            className="hover:text-[#C3A13F] transition-colors duration-500"
                          >
                            {item.title}
                          </Link>
                          <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className="bottom-menu mt-10">
                {data?.left_menu?.menu_2?.map((item: any, index: number) => (
                  <li className="group relative" key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-[#C3A13F] transition-colors duration-500"
                    >
                      {item.title}
                    </Link>
                    <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="main-menu-bottom pr-4 mt-17 flex items-end overflow-hidden gap-[2vw]">
          <div className="bottom-menu w-1/4">
            <ul className="bottom-menu">
              {data?.right_menu?.menu_3?.map((item: any, index: number) => (
                <li className="group relative" key={index}>
                  <Link
                    href={item.link}
                    className="hover:text-[#C3A13F] transition-colors duration-500"
                  >
                    {item.title}
                  </Link>
                  <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-search w-1/4">
            <p className="text-[26px] text-[#D1A941] mb-5 leading-[1em]">
              חפש באתר
            </p>
            <form
              className="search relative h-10 bg-[#FDF9F5] w-50 flex justify-stretch"
              //onSubmit={handleSearch}
            >
              <input
                className="w-full h-full border outline-0 text-black pl-8 text-[18px] leading-[1em] p-2"
                type="text"
                placeholder=""
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                disabled={isSearching}
              />
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 disabled:opacity-50"
                type="submit"
                disabled={isSearching}
              >
                <Search />
              </button>
            </form>
            {searchMessage ? (
              <p className="text-[14px] text-[#E2D7C3] mt-2">{searchMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
