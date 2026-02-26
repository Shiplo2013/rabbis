import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function ThemeButton(props: {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  hoverTextColor?: string;
  icon?: StaticImageData;
}) {
  return (
    <div className="theme-button">
      <Link
        className={`group btn-header flex items-center ${props?.icon && "pl-18"} overflow-hidden relative ${props?.bgColor} ${props?.textColor} rounded-full`}
        href="/"
      >
        <span className={`text relative z-30 ${props?.hoverTextColor}`}>
          {props?.text}
        </span>
        {props?.icon && (
          <Image
            className="block absolute z-30 left-5 top-1/2 -translate-y-1/2 black-white"
            src={props?.icon?.src}
            width={"40"}
            height={"30"}
            alt="Button"
          />
        )}
        <span
          className={`btn-bg absolute z-10 left-0 top-0 w-full h-full ${props?.hoverBgColor}`}
        ></span>
      </Link>
    </div>
  );
}
