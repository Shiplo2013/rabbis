import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArrowRight from "../assets/icons/ArrowRight";
import logo from "../assets/images/logo.png";
import ThemeButton2 from "../ui/ThemeButton2";

export default function RabbisHeader({ link }: { link: string }) {
  const [allRabbisMenu, setAllRabbisMenu] = useState(false);
  return (
    <>
      <header className="rabbis-header w-25 h-screen bg-black fixed top-0 right-0 z-99 px-3 py-10 opacity-0 border-l border-[rgba(212,175,55,0.30)]">
        <div className="header-content w-full h-full flex flex-col items-center justify-center">
          <div className="back-link mt-0 mb-auto">
            <Link
              href={link}
              className="group w-14 h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300"
            >
              <div className="w-8 h-auto transition-all duration-300 group-hover:translate-x-1">
                <ArrowRight />
              </div>
            </Link>
          </div>
          <div className="logo mb-auto">
            <div className="small-logo w-18 h-13">
              <Link href={"/"}>
                <Image
                  className="w-auto h-auto white-image"
                  src={logo.src}
                  width={72}
                  height={54}
                  loading="lazy"
                  alt="Small Logo"
                />
              </Link>
            </div>
          </div>
          <div
            onClick={() => setAllRabbisMenu(true)}
            className="button cursor-pointer"
          >
            <ThemeButton2
              extraClass="border-2 border-[#D1A941] w-17.5 h-17.5 bg-[#D9D9D9] text-center !text-[18px] font-bold leading-[70%]"
              text={`כל הרבנים`}
              textColor="text-[#D1A941]"
              svgIconClass=""
              hoverBgColor="bg-[#D1A941]"
              hoverTextColor="group-hover:text-white"
            />
          </div>
        </div>
      </header>
    </>
  );
}
