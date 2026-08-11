import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";

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
  svgIconClass?: string;
}

export default function ThemeButton(props: ChildProps) {
  // states
  const { isLoading, setIsLoading } = useAppState();
  const router = useRouter();
  const pathname = usePathname();

  // OnClick Handler for Link Navigation
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
    <div className="theme-button will-change-transform">
      <Link
        onClick={(e) => {
          handleLinkClick(e);
        }}
        prefetch={false}
        className={`group flex items-center gap-x-2 overflow-hidden relative ${props?.bgColor} ${props?.textColor} rounded-full ${props?.fontSize ? props?.fontSize : "text-[22px]"} ${props?.extraClass}`}
        href={props.buttonLink ? props.buttonLink : "/"}
      >
        {props?.text && (
          <span className={`text block relative z-30 ${props?.hoverTextColor}`}>
            {props?.text}
          </span>
        )}
        {props?.icon ? (
          <Image
            className="w-auto h-auto block z-30 black-white"
            src={props?.icon?.src}
            width={32}
            height={24}
            loading="lazy"
            alt="Button"
          />
        ) : (
          props?.svgIcon && (
            <div className={`relative z-30 ${props?.svgIconClass}`}>
              {props?.svgIcon}
            </div>
          )
        )}
        <span
          className={`btn-bg absolute z-10 left-0 top-0 w-full h-full will-change-transform ${props?.hoverBgColor}`}
        ></span>
      </Link>
    </div>
  );
}
