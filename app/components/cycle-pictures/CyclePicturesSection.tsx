import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: any;
  parentCategories?: any;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  postPagination: number;
  totalPostPages: number;
  setPostPagination: (page: number) => void;
}

export default function CyclePicturesSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const SectionData = props.sectionData || [];
  const years = props.parentCategories || [];

  const handleLoadMorePosts = () => {
    // Implement Load More Functionality Here
    console.log("Load More Posts Clicked");
  };

  // Section Animation
  useEffect(() => {
    const selectYears = scrollbarRef.current?.querySelectorAll(".year-month");
    if (selectYears && selectYears.length > 0) {
      selectYears[0].querySelector(".months")?.classList.remove("hidden");
      selectYears[0].querySelector(".months")?.classList.add("flex");
    }
  }, [years.length]);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[10vw]">
        <div className="sheet-sidebar min-w-50 w-50 h-full will-change-transform overflow-hidden">
          <div className="sheet-sidebar-wrapper">
            {/* <div className="search-group relative mb-[3.6vh]">
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
            </div> */}
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper">
              <SimpleBar
                style={{ maxHeight: "60vh" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-10 pr-2.5">
                  <div
                    onClick={() => props.setActiveCategory(-1)}
                    className={`all-post cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] border-t hover:bg-[#00000058] hover:text-[#ffffff] ${props.activeCategory === -1 ? "bg-[#00000058] text-[#ffffff] " : "bg-transparent text-[#CD5E41]"}`}
                  >
                    הכל
                  </div>
                  {years.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => props.setActiveCategory(item.id)}
                        className={`category cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] hover:bg-[#00000058] hover:text-[#ffffff] transition-all duration-300 ${props.activeCategory === item.id ? "bg-[#00000058] text-[#ffffff]" : "bg-transparent text-[#CD5E41]"}`}
                      >
                        {parse(item.name || "")}
                      </div>
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-[10vw] will-change-transform">
          {SectionData?.posts?.map((item: any, index: number) => (
            <SingleCyclePicture key={index} data={item} />
          ))}
        </div>
        {props.postPagination < props.totalPostPages && (
          <div
            onClick={() => props.setPostPagination(props.postPagination + 1)}
            className="sheet-readmore min-w-50"
          >
            <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-[#C3A13F] hover:border-[#C3A13F] transition-all duration-500">
              טען עוד
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
