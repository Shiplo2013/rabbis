import SearchIcon from "@/app/assets/icons/SearchIcon";
import GetHebrewYear from "@/app/ui/GetHebrewYear";
import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

interface SingleCyclePictureData {
  title: string;
  image: any;
  link: string;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: SingleCyclePictureData[];
}

export default function CyclePicturesSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const Years = [
    "ועד קכ״ט",
    "ועד קל׳",
    "ועד קל״א",
    "ועד קל״ב",
    "ועד קל״ג",
    "ועד קל״ד",
    "ועד קל״ה",
    "ועד קל״ו",
    "ועד קל״ז",
    "ועד קל״ח",
    "ועד קל״ט",
  ];
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
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[10vw]">
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
                <div className="year-month-categories pl-10 pr-2.5">
                  {Years.map((item, index) => {
                    return <GetHebrewYear key={index} year={item} />;
                  })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-[10vw] will-change-transform">
          {props.sectionData?.map((item, index) => (
            <SingleCyclePicture key={index} data={item} />
          ))}
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
