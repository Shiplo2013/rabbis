import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import parse from "html-react-parser";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import { useAppState } from "../AppContext";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: any;
  parentCategories?: any;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  totalPostPages: number;
  style?: React.CSSProperties; // Optional style prop
}

export default function CyclePicturesSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const SectionData = props.sectionData || [];
  const years = props.parentCategories || [];
  const {
    isLoading,
    setIsLoading,
    cycleActiveCategory,
    setCycleActiveCategory,
  } = useAppState();

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
      style={props.style} // Apply the optional style prop
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full min-w-[80vw] h-auto flex items-center gap-x-[10vw] flex-col lg:flex-row lg:pr-85">
        <div className="sheet-sidebar block lg:hidden min-w-50 w-full h-full will-change-transform overflow-hidden mb-10">
          <div className="sheet-sidebar-wrapper">
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper">
              <SimpleBar
                style={{ maxHeight: "100%" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-2.5 lg:pl-10 pr-2.5">
                  <button
                    disabled={cycleActiveCategory === -1 || isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      setCycleActiveCategory(-1);
                    }}
                    className={`all-post block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] border-t hover:bg-[#00000058] hover:text-[#ffffff] ${cycleActiveCategory === -1 ? "bg-[#00000058] text-[#ffffff] " : "bg-transparent text-[#CD5E41]"}`}
                  >
                    הכל
                  </button>
                  {years.map((item: any, index: number) => {
                    return (
                      <button
                        key={index}
                        disabled={
                          Number(cycleActiveCategory) === item.id || isLoading
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setCycleActiveCategory(item.id);
                        }}
                        className={`category block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] hover:bg-[#00000058] hover:text-[#ffffff] transition-all duration-300 ${Number(cycleActiveCategory) === item.id ? "bg-[#00000058] text-[#ffffff]" : "bg-transparent text-[#CD5E41]"}`}
                      >
                        {parse(item.name || "")}
                      </button>
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-15 w-full will-change-transform flex-col lg:flex-row gap-y-10 sm:gap-y-15">
          {SectionData?.length > 0 ? (
            SectionData?.map((item: any, index: number) => (
              <SingleCyclePicture key={index} data={item} index={index} />
            ))
          ) : (
            <div className="error">
              <p className="text-[18px] sm:text-[3vw] leading-[1.2em] text-[#656158]">
                לא נמצאו תמונות מחזור עבור קטגוריה זו.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
