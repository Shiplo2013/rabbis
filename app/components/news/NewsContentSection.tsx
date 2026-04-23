import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import { useState } from "react";
import SingleNews from "./SingleNews";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: string;
}

export default function NewsContentSection(props: ChildProps) {
  const [newsPostsData, setNewsPostsData] = useState(
    props.sectionData ? JSON.parse(props.sectionData) : [],
  );
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-full flex items-center gap-x-[10vw]">
        <div className="sheet-sidebar w-70 min-w-70 h-full will-change-transform overflow-hidden py-[5vh]">
          <div className="sheet-sidebar-wrapper">
            <div className="search-group relative mb-[3vh]">
              <input
                className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
                type="text"
                id="search-by-date"
                name="Search-By-Date"
                placeholder="חיפוש לפי תאריך"
              />
              <button className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2">
                <CalenderIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="news-content flex items-center gap-x-[12.5vw] will-change-transform">
          {newsPostsData?.map((item: any, index: number) => (
            <SingleNews key={index} data={JSON.stringify(item)} />
          ))}
        </div>
      </div>
    </section>
  );
}
