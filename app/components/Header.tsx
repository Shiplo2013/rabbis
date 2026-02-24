import Image from "next/image";
import Link from "next/link";
import HambergerIcon from "../assets/icons/HambergerIcon";
import donationIcon from "../assets/images/donation-icon.svg";
import buttonIcon2 from "../assets/images/header-button-icon.png";
import buttonIcon from "../assets/images/header-button.svg";
import logo from "../assets/images/logo.png";

function Header() {
  return (
    <header className="fixed w-screen top-0 left-0 flex justify-between items-start z-40 pl-10">
      <div className="header-right flex items-start pr-17">
        <div className="horizontal-menu bg-[#000000B2] border border-[#DBBD5C80] h-screen fixed top-0 right-0">
          <div className="hamburger-btn cursor-pointer w-14.5 h-14.5 flex justify-center items-center">
            <HambergerIcon />
          </div>
          <nav className="nav-menu absolute top-14.5 right-0 w-[calc(100vh-58px)] h-14.5 flex items-stretch justify-stretch origin-topright mr-14.5 -rotate-90">
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>הווייתה</span>
            </Link>
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>דברי הימים</span>
            </Link>
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>מזקנים אתבונן</span>
            </Link>
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>רבני הישיבה</span>
            </Link>
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>מועדים וזמנים</span>
            </Link>
            <Link className="text-[#E2D7C3]" href={"/"}>
              <span>כנסת הבוגרים</span>
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
      <div className="header-left flex items-center gap-6 pt-7 pb-7">
        <div className="button-3">
          <Link
            className="btn-header bg-[#BBA588] hover:bg-[#b28f62] text-[#000000] transition-all"
            href="/"
          >
            <span>הרימו תרומה</span>
          </Link>
        </div>
        <div className="button-2">
          <Link
            className="flex items-center gap-3 text-[#000000] bg-[#5A7C4E] hover:bg-[#447533] transition-all btn-header relative pl-18"
            href="/"
          >
            <span>ביטאון</span>
            <Image
              className="block absolute left-5 top-1/2 -translate-y-1/2 black-white"
              src={buttonIcon2.src}
              width={"40"}
              height={"30"}
              alt="Button"
            />
          </Link>
        </div>
        <div className="button-1">
          <Link href="/">
            <Image
              src={buttonIcon.src}
              width={"76"}
              height={"76"}
              alt="Button"
            />
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
