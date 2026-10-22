"use client";

import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../AppContext";

interface PastRabbiCardProps {
  data: any;
  layout: "carousel" | "list";
}

export default function PastRabbiCard({ data, layout }: PastRabbiCardProps) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  const link = data?.slug ? `/past-rabbis/${data.slug}` : "#";
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (window.location.pathname !== event.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(event.currentTarget.href);
    }
  };

  return (
    <div
      data-id={data.id}
      className={
        layout === "carousel"
          ? "rabbis-item w-full lg:w-[58.4vw] lg:min-w-[58.4vw] h-full flex items-center justify-center gap-y-12 sm:gap-y-[8vh] gap-x-[3.3vw] flex-col lg:flex-row"
          : "rabbis-item w-full h-auto flex items-end justify-center gap-y-12 sm:gap-y-[8vh] gap-x-[3.3vw] flex-col lg:flex-row"
      }
    >
      <div className="rabbis-image w-full lg:w-[27.1vw] relative">
        <div
          className={
            layout === "carousel"
              ? "image w-full h-[57.2vh] relative"
              : "image w-full h-auto lg:h-[57.2vh] relative"
          }
        >
          <Link href={link} onClick={handleLinkClick}>
            <Image
              className="w-full h-full object-cover object-center"
              src={
                data?.acf?.thumbnail?.sizes?.medium_large ||
                data?.acf?.thumbnail?.url ||
                data?.acf?.thumbnail?.src
              }
              width={522}
              height={532}
              alt={
                data?.acf?.thumbnail?.alt ||
                data?.title?.rendered ||
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
            extraClass={`rounded-none py-4 sm:py-5 ${layout === "carousel" ? "px-10" : "px-5 lg:px-10"} items-center leading-[80%] min-w-40 sm:min-w-60 justify-center`}
            text="הרחב קריאה"
            textColor="text-black"
            hoverBgColor="bg-[#111111]"
            hoverTextColor="group-hover:text-white"
            bgColor="bg-[#C3A13F]"
            fontSize="text-[18px] sm:text-[22px] lg:text-[30px]"
            svgIconClass=""
            buttonLink={link}
          />
        </div>
      </div>
      <div
        dir="rtl"
        className="rabbis-content w-full lg:w-[28vw] text-[#D1A941]"
      >
        <h2 className="text-[30px] sm:text-[40px] lg:text-[55px] leading-[0.85em] overflow-hidden relative">
          <Link href={link} onClick={handleLinkClick}>
            {parse(data.title?.rendered ? data.title.rendered : data.title)}
          </Link>
        </h2>
        <div className="content text-[20px] sm:text-[25px] lg:text-[33px] leading-[1em] mt-5 relative">
          {parse(data?.acf?.time)}
        </div>
      </div>
    </div>
  );
}
