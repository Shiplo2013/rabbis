import Image from "next/image";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";
import ViewIcon from "../assets/icons/ViewIcon";
import sheetImg from "../assets/images/sheet-image1.jpg";
import ThemeButton2 from "./ThemeButton2";

export default function SheetContentItem() {
  return (
    <div className="sheet-item will-change-transform">
      <div className="sheet-image">
        <Image
          className="w-full object-cover object-center h-full relative z-10"
          src={sheetImg?.src}
          width="337"
          height="476"
          blurDataURL={sheetImg?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Rabbis"
        />
      </div>
      <div className="sheet-icons flex justify-center mt-4.5 gap-x-4">
        <ThemeButton2
          extraClass="download w-11 h-11 flex item-center justify-center rounded-none cursor-pointer"
          bgColor="bg-[#C3A13F]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#ffffff]"
          svgIcon={<ArrowDownIcon />}
          svgIconClass={""}
        />
        <ThemeButton2
          extraClass="download w-11 h-11 flex item-center justify-center rounded-none cursor-pointer"
          bgColor="bg-[#C3A13F]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#ffffff]"
          svgIcon={<ViewIcon />}
          svgIconClass={""}
        />
      </div>
    </div>
  );
}
