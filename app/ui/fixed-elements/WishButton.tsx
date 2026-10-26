import WishIcon from "@/app/assets/icons/WishIcon";
import ThemeButton2 from "../ThemeButton2";

export default function WishButton() {
  return (
    <div
      id="wish-button"
      className="wish-button fixed bottom-5 right-28 sm:right-45 z-50 opacity-0 invisible cursor-pointer hidden"
    >
      <ThemeButton2
        extraClass="w-13 h-13 flex item-center justify-center"
        bgColor="bg-[#ffffff]"
        textColor="text-[#000000]"
        hoverBgColor="bg-[#C3A13F]"
        svgIcon={<WishIcon className="group-hover:stroke-[#ffffff]" />}
        svgIconClass={""}
      />
    </div>
  );
}
