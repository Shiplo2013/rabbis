"use client";
import ArrowLeftIcon2 from "@/app/assets/icons/ArrowLeftIcon2";
import NewsImage from "@/app/ui/news/NewsImage";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../AppContext";

interface ChildProps {
  key: number;
  data: any;
}

export default function SingleNews(props: ChildProps) {
  // Access the router and pathname
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
    <div className="single-news w-[53vw] h-full flex items-center gap-x-[5.9vw] will-change-transform">
      <div className="single-news-image w-[32vw] min-w-[32vw] h-[80vh] relative z-40">
        {props.data?.gallery?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`news-image news-image-${index} ${index === 0 ? "w-[22vw] h-[63vh] z-50" : "w-[30vw] h-[40vh]"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-none`}
            >
              <Link
                className="cursor-none"
                href={`/news/${props.data?.slug || "#"}`}
                onClick={handleLinkClick}
              >
                <NewsImage item={item} index={index} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="single-news-content flex flex-col gap-y-8.5 text-[#D1A941] w-[15vw] relative z-20">
        <h2 className="text-[55px] leading-[70%]">
          <Link
            href={`/news/${props.data?.slug || "#"}`}
            onClick={handleLinkClick}
          >
            {parse(props.data?.title?.rendered || "")}
          </Link>
        </h2>
        <div className="text-[28px] leading-[90%] font-light">
          {parse(props.data?.excerpt?.rendered || "")}
        </div>
        <Link
          href={`/news/${props.data?.slug || "#"}`}
          onClick={handleLinkClick}
          className="read-more group text-[#D1A941] text-[24px] leading-[90%] font-light mt-2.5 flex items-center gap-x-2"
        >
          <span className="text">קרא עוד</span>
          <span className="icon block w-5 h-auto transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowLeftIcon2 />
          </span>
        </Link>
      </div>
    </div>
  );
}
