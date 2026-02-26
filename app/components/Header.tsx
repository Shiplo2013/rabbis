import Image from "next/image";
import Link from "next/link";
import ButtonBorder from "../assets/icons/ButtonBorder";
import ButtonText from "../assets/icons/ButtonText";
import HambergerIcon from "../assets/icons/HambergerIcon";
import StartIcon from "../assets/icons/StarIcon";
import donationIcon from "../assets/images/donation-icon.svg";
import buttonIcon2 from "../assets/images/header-button-icon.png";
import logo from "../assets/images/logo.png";
import ThemeButton from "../ui/ThemeButton";

function Header() {
  return (
    <header className="fixed w-screen top-0 left-0 flex justify-between items-start z-40 pl-10">
      <div className="header-right flex items-start pr-17 translate-x-full opacity-0">
        <div className="horizontal-menu bg-[#000000B2] border border-[#DBBD5C80] h-screen fixed top-0 right-0">
          <div className="hamburger-btn cursor-pointer w-14.5 h-14.5 flex justify-center items-center">
            <HambergerIcon />
          </div>
          <nav className="nav-menu absolute top-14.5 right-0 w-[calc(100vh-58px)] h-14.5 flex items-stretch justify-stretch origin-topright mr-14.5 -rotate-90">
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                הווייתה
              </span>
            </Link>
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                דברי הימים
              </span>
            </Link>
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                מזקנים אתבונן
              </span>
            </Link>
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                רבני הישיבה
              </span>
            </Link>
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                מועדים וזמנים
              </span>
            </Link>
            <Link className="group text-[#E2D7C3] bg-[#000000B2]" href={"/"}>
              <span className="flex justify-center items-center w-full h-full bg-[#000000B2] transition-all origin-center group-hover:rotate-90 group-hover:-mt-[50%] border border-[#000000B2] group-hover:border-[#DBBD5C80]">
                כנסת הבוגרים
              </span>
            </Link>
            <Link
              className="gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-all"
              href={"/"}
            >
              <Image
                className="rotate-90"
                src={donationIcon.src}
                width={13}
                height={23}
                alt="לתרומות"
              />
              <span>לתרומות</span>
            </Link>
          </nav>
        </div>
        <div className="small-logo pt-5 pb-5 white-image">
          <Image
            className=""
            src={logo.src}
            width={50}
            height={40}
            alt="Logo"
          />
        </div>
      </div>
      <div className="header-left flex items-center gap-6 pt-7 pb-7 -translate-y-full opacity-0">
        <ThemeButton
          bgColor="bg-[#BBA588]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#000000]"
          hoverTextColor="group-hover:text-[#FFFFFF]"
          text="הרימו תרומה"
        />
        <ThemeButton
          bgColor="bg-[#5a7c4e]"
          textColor="text-[#000000]"
          hoverBgColor="bg-[#ac832e]"
          hoverTextColor="group-hover:text-[#000000]"
          icon={buttonIcon2}
          text="ביטאון"
        />
        <div className="circle-button">
          <Link className="group relative" href="/">
            <div className="button-content w-19 h-19 rounded-full flex items-center justify-center relative p-2">
              <div className="rounded-full w-full h-full flex items-center justify-center relative z-40">
                <div className="button-border absolute w-full h-full flex transition-all duration-500">
                  <ButtonBorder />
                </div>
                <div className="button-text absolute w-full h-full flex p-2 transition-all duration-500">
                  <ButtonText />
                </div>
                <StartIcon />
              </div>
            </div>
            <div className="button-bg absolute top-0 left-0 w-full h-full rounded-full z-20 bg-[#E7D45E] transition-all duration-500"></div>
            <div className="button-layer absolute top-0 left-0 w-full h-full z-30 rounded-full bg-[#000000] transition-all duration-500"></div>
          </Link>
        </div>
        <div className="logo">
          <Link href={"/"}>
            <Image
              className="lg:w-25 sm:w-20 xl:w-30 2xl:w-36.5 white-image"
              src={logo.src}
              width={146}
              height={188}
              alt="Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
