import Link from "next/link";
import ArrowLeftBottom from "../assets/icons/ArrowLeftBottom";
import ThemeButton from "./ThemeButton";

export default function EventItem(props: {
  title: string;
  content?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonColor?: string;
}) {
  return (
    <div className="post-item border-b border-[#C3A13F] pb-12 pt-7.5 text-[22px] leading-[1em] flex flex-col gap-y-2 relative">
      <h4 className="font-bold">{props.title}</h4>
      <p>{props.content}</p>
      <h5 className="font-bold">{props.subtitle}</h5>
      <Link
        className={`absolute right-1.5 bottom-0 ${props.buttonColor || "bg-[#C3A13F] hover:bg-[#c59811]"} text-white text-[18px] py-0.5 px-3`}
        href="/"
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
                "group-hover:fill-white transition-all duration-300 ease-in-out"
              }
            />
          }
          hoverBgColor="bg-black"
        />
      </div>
    </div>
  );
}
