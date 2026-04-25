import { useState } from "react";
import SidebarSearch from "./SidebarSearch";
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
            <SidebarSearch />
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
