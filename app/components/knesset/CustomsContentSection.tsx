import CustomContentItem from "@/app/ui/CustomContentItem";
import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function CustomsContentSection(props: ChildProps) {
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
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[5.8vw]">
        <div className="sheet-sidebar w-54.5 h-full will-change-transform overflow-hidden">
          <Sidebar />
        </div>
        <div className="sheet-content flex items-stretch gap-x-[3.2vw] will-change-transform">
          <CustomContentItem />
          <CustomContentItem />
          <CustomContentItem />
          <div className="subscribe-form bg-[#000000] text-white px-[2.5vw] py-[3.7vh] w-[26.35vw] flex items-center flex-col justify-center will-change-transform">
            <div className="subscribe-form-wrapper">
              <h2 className="text-[38px] leading-[0.8em]">
                קבלו ישירות למייל מאמרים חדשים, גיליונות תורניים ועדכוני תוכן מן
                הישיבה.
              </h2>
              <div className="form group text-[22px] leading-[0.8em] mt-[4vh] flex justify-between items-end gap-x-2">
                <div className="flex items-center gap-x-1">
                  <label>שם</label>
                  <input
                    className="w-30 border-b border-white p-0 leading-[0.7em] focus:outline-0"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <label>דוא״ל</label>
                  <input
                    className="w-30 border-b border-white p-0 leading-[0.7em] focus:outline-0"
                    name="email"
                    type="email"
                  />
                </div>
                <button className="text-[28px] leading-[0.8em] text-[#000000] bg-[#E7D45E] px-2.5 pb-2 pt-2.5 hover:bg-black hover:text-[#E7D45E] transition-all duration-300 cursor-pointer">
                  שלח
                </button>
              </div>
              <div className="text text-[16px] leading-[1em] mt-[3vh] text-center">
                <p>אני מאשר/ת קבלת עדכונים מן הישיבה</p>
              </div>
            </div>
          </div>
          <CustomContentItem />
        </div>
        <div className="sheet-readmore">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-[#C3A13F] hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div>
      </div>
    </section>
  );
}
