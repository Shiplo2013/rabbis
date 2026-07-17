import parse from "html-react-parser";
import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";
import ArrowLeftBottom from "../assets/icons/ArrowLeftBottom";
import { useAppState } from "../components/AppContext";
import ThemeButton from "./ThemeButton";

interface CustomContentItemProps {
  data: any;
  postLoading?: boolean;
}

export default function CustomContentItem({
  data,
  postLoading,
}: CustomContentItemProps) {
  const parsedData = data || {};
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useAppState();

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
    <div
      className={`custom-content-item bg-[#FBF4E6] border border-[#D1CECE] relative will-change-transform w-[25.4vw] py-[8.8vh] pr-7 pl-[4.5vw] text-[#000000]`}
    >
      <div className="custom-content-wrapper">
        <Link
          href={
            parsedData?.slug
              ? `/the-knesset-of-customs/${parsedData.slug}`
              : "#"
          }
          onClick={handleLinkClick}
        >
          <h2 className="text-[#231F20] text-[38px] leading-[1em] font-bold mb-2">
            {parse(parsedData?.title?.rendered || "")}
          </h2>
        </Link>
        <h4 className="text-[38px] leading-[1em] mb-[5.5vh]">
          {parse(parsedData?.acf?.subtitle || "")}
        </h4>
        <div className="excerpt text-[22px] leading-[0.9em]">
          {parse(parsedData?.excerpt?.rendered || "")}
        </div>
      </div>
      <div className="post-button absolute left-7 bottom-7.5">
        <ThemeButton
          buttonLink={
            parsedData?.slug
              ? `/the-knesset-of-customs/${parsedData.slug}`
              : "#"
          }
          extraClass="w-15 h-12.5 flex items-center justify-center rounded-full"
          bgColor={"bg-[#C3A13F]"}
          svgIconClass={""}
          svgIcon={
            <ArrowLeftBottom
              extraClass={
                "group-hover:fill-white transition-all duration-300 ease-in-out"
              }
            />
          }
          hoverBgColor="bg-black"
        />
      </div>

      {postLoading && (
        <div className="flex h-full items-center justify-center absolute top-0 left-0 w-full z-40 bg-[#FBF4E6]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
          </div>
        </div>
      )}
    </div>
  );
}
