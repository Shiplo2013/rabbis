"use client";
import Sidebar from "./Sidebar";
import ZatzelPostCat from "./ZatzelPostCat";

interface ZatzelPost {
  title: string;
  image: any;
  yearOfDeath: string;
}

interface ZatzelContentSectionData {
  sectionTitle: string;
  sectionContent: ZatzelPost[];
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: ZatzelContentSectionData[];
  setSelectedDate?: (date: Date | null) => void;
  setSearchedData?: (data: string | null) => void;
}

export default function ZatzelContentSection(props: ChildProps) {
  const SectionData = props.sectionData;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full min-w-full h-auto flex items-center gap-x-[10vw]">
        <div className="sheet-sidebar w-70 min-w-70 h-full will-change-transform">
          <div className="sheet-sidebar-wrapper">
            <Sidebar
              setSelectedDate={props.setSelectedDate}
              setSearchedData={props.setSearchedData}
            />
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-[10vw] will-change-transform">
          {SectionData?.map((item: ZatzelContentSectionData, index: number) => (
            <ZatzelPostCat
              key={index}
              dataIndex={index}
              className={""}
              postsContent={item}
            />
          ))}
        </div>
        {/* <div className="sheet-readmore min-w-[10vw] w-[10vw]">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div> */}
      </div>
    </section>
  );
}
