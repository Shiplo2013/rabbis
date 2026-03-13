import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ChildProps {
  extraClass?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  hoverTextColor?: string;
  icon?: StaticImageData;
  svgIcon?: React.ReactNode;
  buttonLink?: string;
  fontSize?: string;
}

export default function ThemeButton(props: ChildProps) {
  return (
    <div className="theme-button">
      <Link
        className={`group flex items-center ${props?.icon !== undefined ? "pl-18" : ""} overflow-hidden relative ${props?.bgColor} ${props?.textColor} rounded-full ${props?.fontSize ? props?.fontSize : "text-[28px]"} ${props?.extraClass}`}
        href={props.buttonLink ? props.buttonLink : "/"}
      >
        {props?.text && (
          <span className={`text block relative z-30 ${props?.hoverTextColor}`}>
            {props?.text}
          </span>
        )}
        {props?.icon ? (
          <Image
            className="block absolute z-30 left-5 top-1/2 -translate-y-1/2 black-white"
            src={props?.icon?.src}
            width={"40"}
            height={"30"}
            alt="Button"
          />
        ) : (
          props?.svgIcon
        )}
        <span
          className={`btn-bg absolute z-10 left-0 top-0 w-full h-full ${props?.hoverBgColor}`}
        ></span>
      </Link>
    </div>
  );
}
