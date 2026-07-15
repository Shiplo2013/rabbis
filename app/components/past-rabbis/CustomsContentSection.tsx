import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../AppContext";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
}

export default function CustomsContentSection(props: ChildProps) {
  const rabbisPosts = props.data;
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useAppState();
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
      className={`${props.extraClass} rabbis-section bg-black flex items-center relative z-20`}
    >
      <div className="rabbis-wrapper w-full h-full flex gap-x-[10vw]">
        {rabbisPosts.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`rabbis-item w-[58.4vw] min-w-[58.4vw] h-full flex items-center justify-center gap-x-[3.3vw] will-change-transform`}
            >
              <div className="rabbis-image w-[27.1vw] relative">
                <div className="image w-full h-[57.2vh] relative">
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
                </div>
                <div className="read-more absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-30">
                  <ThemeButton
                    extraClass="rounded-none py-5 px-10 items-center leading-[80%] min-w-60 justify-center"
                    text="הרחב קריאה"
                    textColor="text-black"
                    hoverBgColor="bg-[#111111]"
                    hoverTextColor="group-hover:text-white"
                    bgColor="bg-[#C3A13F]"
                    fontSize="text-[30px]"
                    svgIconClass=""
                    buttonLink={item?.slug ? `/past-rabbis/${item.slug}` : "#"}
                  />
                </div>
              </div>
              <div className="rabbis-content w-[28vw] text-[#D1A941]">
                <h2 className="text-[55px] leading-[0.7em] overflow-hidden relative">
                  <Link href={item?.slug ? `/past-rabbis/${item.slug}` : "#"}>
                    {parse(
                      item.title?.rendered ? item.title.rendered : item.title,
                    )}
                  </Link>
                </h2>
                <div className="content text-[33px] leading-[1em] mt-5 relative">
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
