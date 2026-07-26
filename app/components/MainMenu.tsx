"use client";

import parse from "html-react-parser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../assets/icons/CloseIcon";
import Search from "../assets/icons/Search";
import bagImage from "../assets/images/main-menu-bg.jpg";
import { parseJsonResponse } from "../lib/parseJsonResponse";
import SubMenuItem from "../ui/SubMenuItem";
import { useAppState } from "./AppContext";

interface MainMenuProps {
  data?: any;
}

export default function MainMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isLoading,
    setIsLoading,
    activeHamburgerMenu,
    setActiveHamburgerMenu,
    appData,
  } = useAppState();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
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
  // Get elements
  //const closeBTN = useRef(null);
  //    const closeMenu = () => {
  //     timeLine.reversed() ? timeLine.play() : timeLine.reverse();
  //    }
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setSearchMessage("אנא הזן מונח חיפוש");
      return;
    }
    setIsSearching(true);
    setSearchMessage("");
    setSearchResults([]);
    let isMounted = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/search?search=${encodeURIComponent(query)}&per_page=100&_fields=id,title,url,subtype`,
        {
          cache: "no-store",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to load search data.");
        isMounted = false;
      }

      const data = await parseJsonResponse<any[]>(
        response,
        [],
        "main-menu-search",
      );

      if (isMounted) {
        if (data.length > 0) {
          console.log("Search results:", data);
          setSearchResults(data);
        } else {
          setSearchMessage("לא נמצאו תוצאות");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchMessage("אירעה שגיאה בעת החיפוש");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResultsRef.current?.classList.remove(
        "opacity-0",
        "visibility-hidden",
      );
    } else {
      searchResultsRef.current?.classList.add("opacity-0", "visibility-hidden");
    }
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        searchResultsRef.current?.classList.add(
          "opacity-0",
          "visibility-hidden",
        );
      } else {
        searchResultsRef.current?.classList.remove(
          "opacity-0",
          "visibility-hidden",
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLinkUrl = (link: string, type: string) => {
    const segments = new URL(link).pathname.match(/[^/]+/g);
    const slug = segments ? segments.pop() : "";
    if (type === "post") {
      return `/news/${slug}`;
    } else if (type === "page") {
      return `/${slug}`;
    } else if (type === "knesset-of-customs") {
      return `/the-knesset-of-customs/${slug}`;
    } else if (type === "zatzel-graduates") {
      return `/zatzel-graduates`;
    } else if (type === "communities") {
      return `/communities/${slug}`;
    } else if (type === "past-rabbis") {
      return `/past-rabbis/${slug}`;
    } else if (type === "holidays") {
      return `/the-circle-of-the-year/${slug}`;
    } else {
      return `/${slug}`;
    }
  };

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
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
        onClick={() => {
          setActiveHamburgerMenu(!activeHamburgerMenu);
        }}
        className="menu-close group absolute top-5 right-5 sm:top-8 sm:right-7 lg:right-12.5 w-12 lg:w-18 h-12 lg:h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f] z-50"
      >
        <CloseIcon className="group-hover:rotate-180 transition-all duration-300 w-4 h-auto lg:w-auto" />
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
                <Link href="/" onClick={handleLinkClick}>
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
                    <li className="group relative" key={index}>
                      {haveSubmenu ? (
                        <SubMenuItem
                          itemText={item.title}
                          subItem={item.sub_menu || SUBMENU2}
                          active={activeHamburgerMenu}
                          hideMenu={setActiveHamburgerMenu}
                        />
                      ) : (
                        <Link
                          href={item.link}
                          onClick={handleLinkClick}
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
                      onClick={handleLinkClick}
                      className="hover:text-[#C3A13F] transition-colors duration-500"
                    >
                      {item.title}
                    </Link>
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
                <Link href="/" onClick={handleLinkClick}>
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
                    <li className="group relative" key={index}>
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
                      onClick={handleLinkClick}
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
        <div className="main-menu-bottom pr-4 mt-17 flex items-end gap-10 sm:gap-[2vw] flex-col sm:flex-row">
          <div className="bottom-menu w-full sm:w-1/2 lg:w-1/4">
            <ul className="menu-list">
              {data?.right_menu?.menu_3?.map((item: any, index: number) => (
                <li className="group relative" key={index}>
                  <Link
                    href={item.link}
                    onClick={handleLinkClick}
                    className="hover:text-[#C3A13F] transition-colors duration-500"
                  >
                    {item.title}
                  </Link>
                  <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-search w-full sm:w-1/2 lg:w-1/4">
            <p className="text-[26px] text-[#D1A941] mb-5 leading-[1em]">
              חפש באתר
            </p>
            <form
              className="search relative h-10 bg-[#FDF9F5] w-50 flex justify-stretch group"
              onSubmit={handleSearch}
            >
              <input
                ref={searchRef}
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
              {searchResults.length > 0 && (
                <div
                  ref={searchResultsRef}
                  className="search-result absolute w-full max-h-60 bg-white left-0 bottom-full overflow-y-auto opacity-0 visibility-hidden"
                >
                  <div className="search-link-list">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        href={getLinkUrl(result.url, result.subtype)}
                        onClick={handleLinkClick}
                        className="block py-3 px-3 text-[16px] leading-[1em] text-black hover:bg-gray-200 transition-all duration-300 not-last:border-b not-last:border-b-[#C3A13F]"
                      >
                        {parse(result.title)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </form>
            {searchMessage ? (
              <p className="text-[14px] text-red-500 mt-2">{searchMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
