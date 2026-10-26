import HambergerIcon from "@/app/assets/icons/HambergerIcon";
import { useAppState } from "../AppContext";
import NavMenu from "./NavMenu";

export default function MenuRightElements({ data }: { data: any }) {
  const { activeHamburgerMenu, setActiveHamburgerMenu, animationPlayed } =
    useAppState();
  return (
    <div className="header-right items-start pr-17 opacity-0 hidden lg:flex">
      <div className="horizontal-menu bg-[#000000B2] border border-[#DBBD5C80] h-screen fixed top-0 right-0">
        <button
          type="button"
          onClick={() => {
            setActiveHamburgerMenu(!activeHamburgerMenu);
          }}
          disabled={!animationPlayed}
          aria-label="Hamburger Menu Button"
          className="hamburger-btn cursor-pointer w-14.5 h-14.5 flex justify-center items-center"
        >
          <HambergerIcon />
        </button>
        <NavMenu data={data} />
      </div>
    </div>
  );
}
