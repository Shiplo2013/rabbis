import donationIcon from "@/app/assets/images/donation-icon.svg";
import Image from "next/image";
import Link from "next/link";

export default function HeaderRightMenuItem({
  link,
  isActive,
  haveSubmenu,
}: {
  link: any;
  isActive: boolean;
  haveSubmenu: boolean;
}) {
  // Handle link click to prevent default navigation and scroll to top if navigating to a different page
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      window.scrollTo(0, 0);
      window.location.href = e.currentTarget.href;
    }
  };
  return (
    <div
      key={link.name}
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
            ? "gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-colors"
            : "text-[#E2D7C3]"
        } w-full h-full flex items-center justify-center`}
        href={link.href}
      >
        {!link.icon && (
          <span
            className={`indicator bg-[#C3A13F] w-full ${isActive ? "h-2" : "h-0"} absolute left-0 bottom-full transition-[height] duration-300`}
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
          className={`submenu-content absolute bottom-full pr-10 transition-[opacity,visibility,translate] duration-500 w-48 rotate-90 opacity-0 -translate-x-full invisible group-hover/parent:opacity-100 group-hover/parent:visible group-hover/parent:translate-x-0 ${link.submenus.class}`}
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
                  ? link.submenus.menu1.map((item: any) => (
                      <Link
                        key={item.id}
                        className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-colors duration-300`}
                        href={item.link}
                        onClick={(e) => {
                          handleLinkClick(e);
                        }}
                        prefetch={false}
                      >
                        <span>{item.name}</span>
                        <span
                          className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover:opacity-100 group-hover:w-1.5`}
                        ></span>
                      </Link>
                    ))
                  : link.submenus.menu1.map((item: any) => (
                      <div
                        key={item.id}
                        className="relative px-3 py-5 bg-[#000000B2] border border-[#DBBD5C80] w-full"
                      >
                        <Link
                          className={`submenu-item group text-[#E2D7C3] text-[15px] leading-[70%] hover:text-[#C3A13F] relative transition-colors duration-300 block`}
                          href={item.link}
                          onClick={(e) => {
                            handleLinkClick(e);
                          }}
                          prefetch={false}
                        >
                          <span>{item.name}</span>
                          <span
                            className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover:opacity-100 group-hover:w-1.5`}
                          ></span>
                          {item.comingsoon && (
                            <div className="comingsoon absolute top-0 right-full flex items-center justify-center text-[#D4AF37] text-[16px] mr-7 font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
                {link.submenus.menu2.map((item: any) => (
                  <Link
                    key={item.id}
                    className="submenu-item group/child text-[#E2D7C3] leading-[70%] text-[15px] hover:text-[#C3A13F] relative transition-colors duration-300"
                    href={item.link}
                    onClick={(e) => {
                      handleLinkClick(e);
                    }}
                    prefetch={false}
                  >
                    <span>{item.name}</span>
                    <span
                      className={`bg-[#C3A13F] w-0 h-full absolute top-0 right-0 -mr-3.25 opacity-0 transition-[opacity,width] duration-300 group-hover/child:opacity-100 group-hover/child:w-1.5`}
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
}
