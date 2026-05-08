import SearchIcon from "@/app/assets/icons/SearchIcon";
import GetHebrewYear from "@/app/ui/GetHebrewYear";
import SheetContentItem from "@/app/ui/SheetContentItem";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function SheetContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const Years = ["תשפ״ו", "תשפ״ה", "תשפ״ד", "תשפ״ג"];
  // Section Animation
  useEffect(() => {
    const selectYears = scrollbarRef.current?.querySelectorAll(".year-month");
    if (selectYears) {
      selectYears[0].querySelector(".months")?.classList.remove("hidden");
      selectYears[0].querySelector(".months")?.classList.add("flex");
    }
  }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[5.8vw]">
        <div className="sheet-sidebar w-54.5 h-full will-change-transform overflow-hidden">
          <div className="sheet-sidebar-wrapper">
            <div className="search-group relative mb-[3.6vh]">
              <input
                className="text-[24px] text-[#D1A941] placeholder:text-[#D1A941] leading-[1em] bg-white p-2.25 focus:outline-0 max-w-full pl-8"
                type="text"
                id="search-sheet"
                name="Search-Sheet"
                placeholder="חפש פרשיה"
              />
              <button className="cursor-pointer absolute top-1.5 left-1.75">
                <SearchIcon />
              </button>
            </div>
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper">
              <SimpleBar
                style={{ maxHeight: "60vh" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-10">
                  {Years.map((item, index) => {
                    return <GetHebrewYear key={index} year={item} />;
                  })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-[3.2vw] will-change-transform">
          <SheetContentItem />
          <SheetContentItem />
          <div className="subscribe-form bg-[#C3A13F] text-white px-[2.5vw] py-[3.7vh] w-[26.35vw] will-change-transform">
            <h2 className="2xl:text-[38px] xl:text-[30px] sm:text-[24px] leading-[0.8em]">
              קבלו ישירות למייל מאמרים חדשים, גיליונות תורניים ועדכוני תוכן מן
              הישיבה.
            </h2>
            <div className="form group 2xl:text-[22px] xl:text-[18px] sm:text-[16px] leading-[0.8em] mt-[4vh] flex justify-between items-end gap-x-2">
              <div className="flex items-center gap-x-1 ">
                <label>שם</label>
                <input
                  className="w-full border-b border-white p-0 leading-[0.7em] focus:outline-0"
                  name="name"
                  type="text"
                />
              </div>
              <div className="flex items-center gap-x-1">
                <label>דוא״ל</label>
                <input
                  className="w-full border-b border-white p-0 leading-[0.7em] focus:outline-0"
                  name="email"
                  type="email"
                />
              </div>
              <button className="2xl:text-[28px] xl:text-[24px] sm:text-[20px] leading-[0.8em] text-[#000000] bg-[#E7D45E] px-2.5 pb-2 pt-2.5 hover:bg-black hover:text-[#E7D45E] transition-all duration-300 cursor-pointer">
                שלח
              </button>
            </div>
            <div className="text 2xl:text-[16px] xl:text-[14px] sm:text-[12px] leading-[1em] mt-[3vh] text-center">
              <p>אני מאשר/ת קבלת עדכונים מן הישיבה</p>
            </div>
          </div>
          <SheetContentItem />
          <SheetContentItem />
          <SheetContentItem />
        </div>
        <div className="sheet-readmore">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div>
      </div>
    </section>
  );
}
