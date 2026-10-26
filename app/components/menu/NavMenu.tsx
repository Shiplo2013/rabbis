import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import HeaderDonationButton from "./HeaderDonationButton";
import HeaderRightMenuItem from "./HeaderRightMenuItem";

export default function NavMenu({ data }: { data: any }) {
  const pathname = usePathname();
  // handle link click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      window.scrollTo(0, 0);
      window.location.href = e.currentTarget.href;
    }
  };

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

  return (
    <nav className="nav-menu absolute top-14.5 right-0 w-[calc(100vh-58px)] h-14.5 flex items-stretch justify-stretch origin-topright mr-14.5 -rotate-90">
      {data?.acf?.header_right &&
        data?.acf?.header_right?.menu.map((item: any, index: number) => {
          const isActive = pathname === item.link;
          const haveSubmenu = item.subMenu && item.subMenu.length > 0;
          return (
            <div
              key={item?.title}
              className="menu-item group/parent flex items-center justify-center relative"
            >
              {haveSubmenu ? (
                <div
                  className={`text-[#E2D7C3] w-full h-full flex items-center justify-center submenu-parent`}
                >
                  <span
                    className={`indicator bg-[#C3A13F] w-full ${isActive ? "h-2" : "h-0"} absolute left-0 bottom-full transition-[height] duration-300`}
                  ></span>
                  <span
                    className={`flex justify-center items-center w-full h-full  transition-all origin-center border border-[#000000B2] ${haveSubmenu ? "submenu" : "group-hover/parent:border-[#DBBD5C80] group-hover/parent:bg-[#000000B2] group-hover/parent:rotate-90 group-hover/parent:-mt-[50%]"}`}
                  >
                    {item.title}
                  </span>
                </div>
              ) : (
                <Link
                  className={`text-[#E2D7C3] w-full h-full flex items-center justify-center`}
                  href={item.link}
                  onClick={(e) => {
                    handleLinkClick(e);
                  }}
                  prefetch={false}
                >
                  <span
                    className={`indicator bg-[#C3A13F] w-full ${isActive ? "h-2" : "h-0"} absolute left-0 bottom-full transition-[height] duration-300`}
                  ></span>
                  <span
                    className={`flex justify-center items-center w-full h-full  transition-all origin-center border border-[#000000B2] ${haveSubmenu ? "submenu" : "group-hover/parent:border-[#DBBD5C80] group-hover/parent:bg-[#000000B2] group-hover/parent:rotate-90 group-hover/parent:-mt-[50%]"}`}
                  >
                    {item.title}
                  </span>
                </Link>
              )}
              {haveSubmenu && index === 0 && (
                <div
                  className={`submenu-content absolute bottom-full pr-10 transition-[translate,opacity,visibility] duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0`}
                >
                  <div className={`submenu-items flex flex-col -mb-2`}>
                    <div className="menu1 flex flex-col gap-y-2 false undefined border-[#C3A13F]">
                      {item.subMenu.map((subItem: any, subIndex: number) => {
                        return (
                          <div
                            key={subItem?.title}
                            className="relative px-3 py-5 bg-[#000000B2] border border-[#DBBD5C80] w-full"
                          >
                            <Link
                              onClick={(e) => {
                                handleLinkClick(e);
                              }}
                              prefetch={false}
                              href={subItem.link}
                              className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-colors duration-300 block`}
                            >
                              <span>{subItem.title}</span>
                              <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover:opacity-100 group-hover:w-1.5"></span>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {haveSubmenu && index !== 0 && (
                <div
                  className={`submenu-content absolute bottom-full pr-10 transition-[translate,opacity,visibility] duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0 -mb-8`}
                >
                  {item.subMenu.map((subItem: any, subIndex: number) => {
                    if (subIndex === 0) {
                      return (
                        <div
                          key={subItem.title}
                          className="menu-head bg-[#000000B2] border border-[#DBBD5C80] px-4 py-3 mb-1.5 text-[#E2D7C3] text-[15.55px] leading-[70%]"
                        >
                          <Link
                            href={subItem.link || "/yeshiva-graduates"}
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
                  })}
                  <div className="submenu-items border border-[#DBBD5C80] bg-[#000000B2] flex flex-col">
                    <div className="menu1 flex flex-col gap-y-2 p-3 border-b border-[#C3A13F]">
                      {item.subMenu.map((subItem: any, subIndex: number) => {
                        if (subIndex > 0 && subIndex < 7) {
                          return (
                            <Link
                              key={subItem.title}
                              href={subItem.link}
                              onClick={(e) => {
                                handleLinkClick(e);
                              }}
                              prefetch={false}
                              className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-colors duration-300`}
                            >
                              <span>{subItem.title}</span>
                              <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover:opacity-100 group-hover:w-1.5"></span>
                            </Link>
                          );
                        }
                      })}
                    </div>
                    <div className="menu2 p-3 flex flex-col gap-y-2">
                      {item.subMenu.map((subItem: any, subIndex: number) => {
                        if (subIndex >= 7) {
                          return (
                            <Link
                              key={subIndex}
                              href={subItem.link}
                              onClick={(e) => {
                                handleLinkClick(e);
                              }}
                              prefetch={false}
                              className="submenu-item group/child text-[#E2D7C3] leading-[70%] text-[15px] hover:text-[#C3A13F] relative transition-colors duration-300"
                            >
                              <span>{subItem.title}</span>
                              <span className="bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover/child:opacity-100 group-hover/child:w-1.5"></span>
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      {data?.acf?.header_right?.donation_button && (
        <HeaderDonationButton data={data?.acf?.header_right?.donation_button} />
      )}
      {!data?.acf?.header_right &&
        links.map((link, index) => {
          const isActive = pathname === link.href;
          const haveSubmenu = link.submenus && link.submenus.menu1.length > 0;
          return (
            <HeaderRightMenuItem
              key={link.name}
              link={link}
              isActive={isActive}
              haveSubmenu={haveSubmenu || false}
            />
          );
        })}
    </nav>
  );
}
