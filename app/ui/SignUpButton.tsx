import { usePathname } from "next/navigation";

interface ChildProps {
  extraClass?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  hoverTextColor?: string;
  fontSize?: string;
}

export default function SignUpButton(props: ChildProps) {
  // Router Path
  const pathname = usePathname();
  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    window.open(
      "https://hevron.friman.app/join",
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <button
      className="theme-button overflow-hidden w-full"
      type="button"
      onClick={handleLinkClick}
    >
      <div
        className={`group flex items-center justify-center overflow-hidden relative ${props?.bgColor} ${props?.textColor} rounded-full ${props?.fontSize ? props?.fontSize : "text-[28px]"} ${props?.extraClass} backface-hidden`}
      >
        {props?.text && (
          <span className={`text block relative z-30 ${props?.hoverTextColor}`}>
            {props?.text}
          </span>
        )}
        <span
          className={`btn-bg absolute z-10 left-0 top-0 w-full h-full will-change-transform ${props?.hoverBgColor} backface-hidden`}
        ></span>
      </div>
    </button>
  );
}
