import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArrowLeftBottom from "../assets/icons/ArrowLeftBottom";
import { useAppState } from "../components/AppContext";
import ThemeButton from "./ThemeButton";
export default function EventItem(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
  buttonLink?: string;
}) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <div className="post-item border-b border-[#C3A13F] pb-12 pt-7.5 text-[22px] leading-[1em] flex flex-col gap-y-2 relative">
      <h2 className="font-bold">{parse(props.title)}</h2>
      <p>{parse(props.content || "")}</p>
      <p className="font-bold">{parse(props.subtitle || "")}</p>
      <Link
        className={`absolute right-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-[18px] py-0.5 px-3`}
        href={props.buttonLink || "/"}
        aria-label={props.buttonLabel || "קהילת בני ברק"}
        onClick={handleLinkClick}
      >
        {props.buttonLabel || "קהילת בני ברק"}
      </Link>
      <div className="post-button absolute left-7 bottom-7.5">
        <ThemeButton
          extraClass="w-11 h-9 flex items-center justify-center rounded-full p-3.5"
          bgColor={"bg-[#C3A13F]"}
          svgIconClass={""}
          svgIcon={
            <ArrowLeftBottom
              extraClass={
                "group-hover:fill-white transition-colors duration-300 ease-in-out"
              }
            />
          }
          hoverBgColor="bg-black"
          buttonLink={props.buttonLink || "/"}
        />
      </div>
    </div>
  );
}
