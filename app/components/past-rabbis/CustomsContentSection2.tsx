import UserIcon from "@/app/assets/icons/UserIcon";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useAppState } from "../AppContext";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  style?: React.CSSProperties;
}

export default function CustomsContentSection2(props: ChildProps) {
  const rabbisPosts = props.data;
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useAppState();
  const nameRef = useRef<HTMLInputElement>(null);
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
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} rabbis-section bg-black flex items-start relative z-20 flex-col lg:flex-row`}
    >
      <div className="sheet-sidebar w-full lg:w-70 lg:min-w-70 h-auto will-change-transform z-20 mb-10 lg:mb-0 lg:py-[10vh]">
        <div className="sheet-sidebar-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="search-group relative"
          >
            <input
              ref={nameRef}
              className="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
              type="text"
              id="search-by-user"
              name="search-by-user"
              placeholder={`חיפוש לפי שם`}
            />
            <button className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2">
              <UserIcon />
            </button>
          </form>
          <div className="reset-filter mt-5 flex items-center justify-start gap-x-3">
            <button
              className="cursor-pointer text-[16px] sm:text-[24px] leading-[1em] text-[#D1A941] hover:text-[#ffffff] transition-all duration-300"
              onClick={() => {
                nameRef.current && (nameRef.current.value = "");
              }}
            >
              איפוס סינון
            </button>
          </div>
        </div>
      </div>
      <div className="rabbis-wrapper w-full h-full flex gap-y-15 sm:gap-y-[10vh] gap-x-[10vw] flex-col">
        {rabbisPosts.map((item: any, index: number) => {
          return (
            <div
              key={index}
              data-id={item.id}
              className={`rabbis-item w-full h-full flex items-center justify-center gap-y-12 sm:gap-y-[8vh] gap-x-[3.3vw] will-change-transform flex-col lg:flex-row`}
            >
              <div className="rabbis-image w-full lg:w-[27.1vw] relative">
                <div className="image w-full h-[57.2vh] relative">
                  <Link
                    href={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                    onClick={handleLinkClick}
                  >
                    <Image
                      className="w-full h-full object-cover object-center"
                      src={
                        item?.acf?.thumbnail?.sizes?.medium_large ||
                        item?.acf?.thumbnail?.url ||
                        item?.acf?.thumbnail?.src
                      }
                      width={522}
                      height={532}
                      alt={
                        item?.acf?.thumbnail?.alt ||
                        item?.title?.rendered ||
                        "Past Rabbi"
                      }
                      blurDataURL={CreateShimmerDataUrl(522, 532)}
                      placeholder="blur"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="read-more absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-30">
                  <ThemeButton
                    extraClass="rounded-none py-4 sm:py-5 px-5 lg:px-10 items-center leading-[80%] min-w-40 sm:min-w-60 justify-center"
                    text="הרחב קריאה"
                    textColor="text-black"
                    hoverBgColor="bg-[#111111]"
                    hoverTextColor="group-hover:text-white"
                    bgColor="bg-[#C3A13F]"
                    fontSize="text-[18px] sm:text-[22px] lg:text-[30px]"
                    svgIconClass=""
                    buttonLink={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                  />
                </div>
              </div>
              <div className="rabbis-content w-full lg:w-[28vw] text-[#D1A941]">
                <h2 className="text-[30px] sm:text-[40px] lg:text-[55px] leading-[0.85em] overflow-hidden relative">
                  <Link
                    href={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                    onClick={handleLinkClick}
                  >
                    {parse(
                      item.title?.rendered ? item.title.rendered : item.title,
                    )}
                  </Link>
                </h2>
                <div className="content text-[20px] sm:text-[25px] lg:text-[33px] leading-[1em] mt-5 relative">
                  {parse(item?.acf?.time)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
