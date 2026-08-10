"use client";
import CustomContentItem from "@/app/ui/CustomContentItem";
import { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import SubscribeForm from "./SubscribeForm";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  categories?: Array<{ id: number; name: string }>;
  activeCategory?: string | null;
  onCategorySelect?: (id: string | null) => void;
  onSearchSubmit?: (value: string) => void;
  setPostLoading?: (value: boolean) => void;
  postLoading?: boolean;
  setCurrentScrollPos?: (value: number) => void;
  style?: React.CSSProperties;
}

export default function CustomsContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  const sectionData = props.data || [];
  const categoriesData = props.categories || [];
  //
  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[5.8vw] flex-col lg:flex-row gap-y-[5vh]">
        <div className="sheet-sidebar w-full lg:w-54.5 min-w-[11.35vw] h-full will-change-transform overflow-hidden">
          <Sidebar
            activeCategory={props.activeCategory || null}
            categories={categoriesData}
            onCategorySelect={(id) => {
              if (props.onCategorySelect) {
                props.onCategorySelect(id);
              }
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={props.onSearchSubmit}
            setPostLoading={props.setPostLoading}
            setCurrentScrollPos={props.setCurrentScrollPos}
          />
        </div>
        <div className="sheet-content flex items-stretch gap-x-[3.2vw] gap-y-10 will-change-transform flex-col lg:flex-row w-full h-full overflow-hidden">
          {sectionData?.map((item: any, index: number) => (
            <CustomContentItem
              key={index}
              data={item}
              postLoading={props.postLoading}
            />
          ))}
          <SubscribeForm mode="dark" />
        </div>
        {/* <div className="sheet-readmore min-w-50">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-[#C3A13F] hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div> */}
      </div>
    </section>
  );
}
