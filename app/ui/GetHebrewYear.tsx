import { useState } from "react";

interface GetOptions {
  index: number;
  year: any;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  onSelectCategoryId?: (categoryId: number | null) => void;
}

export default function GetHebrewYear(props: GetOptions) {
  // Selector
  const [activeMonth, setActiveMonth] = useState(0);
  const yearData = props.year || {};

  const handleYearClick = (index: number) => {
    props.setActiveCategory(index);
    if (props.onSelectCategoryId) {
      props.onSelectCategoryId(null);
    }
    setActiveMonth(0);
  };

  return (
    <div className="year-month text-[24px] leading-[1.2em]">
      <div
        onClick={() => handleYearClick(yearData.id)}
        className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
      >
        {yearData?.name || ""}
      </div>
      <div
        className={`months ${props.activeCategory === props.index ? "flex" : "hidden"} flex-col gap-y-1 py-4 border-b border-[#CD5E41]`}
      >
        {yearData?.children &&
          yearData?.children?.map((item: any, monthIndex: number) => {
            return (
              <button
                key={monthIndex}
                data-cat-id={item.id}
                onClick={() => {
                  setActiveMonth(monthIndex);
                  props.setActiveCategory(props.index);
                  if (props.onSelectCategoryId) {
                    props.onSelectCategoryId(item.id);
                  }
                }}
                className={`month month-${monthIndex} w-full text-right cursor-pointer relative group`}
              >
                {item?.name || ""}
                <span
                  className={`indicator absolute top-1/2 -mt-0.5 left-full ml-1.25 w-1 h-1 rounded-full bg-[#CD5E41] transition-all duration-500 ${activeMonth === monthIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                ></span>
              </button>
            );
          })}
      </div>
    </div>
  );
}
