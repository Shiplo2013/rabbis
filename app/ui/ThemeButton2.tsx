import Image, { StaticImageData } from "next/image";

interface ChildProps {
  extraClass?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  hoverTextColor?: string;
  icon?: StaticImageData;
  svgIcon?: React.ReactNode;
  fontSize?: string;
  svgIconClass: string;
}

export default function ThemeButton(props: ChildProps) {
  return (
    <div className="theme-button">
      <div
        className={`group flex items-center ${props?.icon !== undefined ? "pl-18" : ""} overflow-hidden relative ${props?.bgColor} ${props?.textColor} rounded-full ${props?.fontSize ? props?.fontSize : "text-[28px]"} ${props?.extraClass}`}
      >
        {props?.text && (
          <span className={`text block relative z-30 ${props?.hoverTextColor}`}>
            {props?.text}
          </span>
        )}
        {props?.icon ? (
          <Image
            className="w-auto h-auto block absolute z-30 left-5 top-1/2 -translate-y-1/2 black-white"
            src={props?.icon?.src}
            width={"40"}
            height={"30"}
            alt="Button"
          />
        ) : (
          <div className={`button-icon relative z-30 ${props?.svgIconClass}`}>
            {props?.svgIcon}
          </div>
        )}
        <span
          className={`btn-bg absolute z-10 left-0 top-0 w-full h-full ${props?.hoverBgColor}`}
        ></span>
      </div>
    </div>
  );
}
