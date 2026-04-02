import ArrowLeftBottom from "@/app/assets/icons/ArrowLeftBottom";
import CaretIcon from "@/app/assets/icons/CaretIcon";
import SearchIcon from "@/app/assets/icons/SearchIcon";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sheet-sidebar-wrapper text-[#1A1A1A]">
      <div className="search-group relative mb-[3.6vh]">
        <input
          className="text-[24px] text-[#D1A941] placeholder:text-[#D1A941] leading-[1em] bg-white p-2.25 focus:outline-0 max-w-full pl-8"
          type="text"
          id="search-sheet"
          name="Search-Sheet"
          placeholder="חיפוש חופשי"
        />
        <button className="cursor-pointer absolute top-1.5 left-1.75">
          <SearchIcon />
        </button>
      </div>
      <div className="sidebar-menu mb-[6.35vh]">
        <div className="head text-[#D1A941] text-[26px] leading-[1.4em] flex items-center gap-x-2 mb-1">
          <p>בחר נושא</p>
          <CaretIcon />
        </div>
        <div className="menu">
          <ul className="list-none flex flex-col text-[24px] leading-[1em] gap-y-2 font-medium">
            <li>
              <Link
                href={"/"}
                className="hover:text-[#999999] transition-all duration-300"
              >
                חגים
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-[#999999] transition-all duration-300"
              >
                פרשת שבוע
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-[#999999] transition-all duration-300"
              >
                לימוד
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="hover:text-[#999999] transition-all duration-300"
              >
                בינה
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-subscription">
        <h4 className="text-[24px] leading-[1.2em] font-medium mb-2.5">
          לקבלת עדכונים
          <br /> חדשים למייל:
        </h4>
        <div className="subscription bg-[#FDF9F5] rounded-full overflow-hidden relative h-10.75">
          <input
            type="email"
            name="email"
            className="w-full h-full focus:outline-0 rounded-full p-2.5 pl-15"
          />
          <button
            type="submit"
            className="bg-[#C3A13F] w-14.5 h-full flex items-center justify-center rounded-full absolute top-0 left-0 cursor-pointer hover:bg-[#ce9d09]"
          >
            <ArrowLeftBottom />
          </button>
        </div>
      </div>
    </div>
  );
}
