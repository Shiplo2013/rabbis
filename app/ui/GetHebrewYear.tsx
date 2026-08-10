import { useState } from "react";

interface GetOptions {
  index: number;
  year: any;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  onSelectCategoryId?: (categoryId: number | null) => void;
  setIsPostLoaded?: (value: boolean) => void;
}

export default function GetHebrewYear(props: GetOptions) {
  // Selector
  const [activeMonth, setActiveMonth] = useState(0);
  const yearData = props.year || {};

  const handleYearClick = () => {
    props.setActiveCategory(Number(props.index) + 1);
    if (props.onSelectCategoryId) {
      props.onSelectCategoryId(Number(yearData.id));
    }
    setActiveMonth(0);
  };

  return (
    <div className="year-month text-[24px] leading-[1.2em]">
      <div
        onClick={() => {
          if (props.activeCategory !== Number(props.index) + 1) {
            handleYearClick();
          }
        }}
        className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
      >
        {yearData?.name || ""}
      </div>
      <div
        className={`months ${props.activeCategory === Number(props.index) + 1 ? "flex" : "hidden"} flex-col gap-y-1 py-4 border-b border-[#CD5E41]`}
      >
        {yearData?.children &&
          yearData?.children?.map((item: any, monthIndex: number) => {
            return (
              <button
                key={monthIndex}
                data-cat-id={item.id}
                onClick={() => {
                  setActiveMonth(monthIndex);
                  if (activeMonth !== monthIndex && props.onSelectCategoryId) {
                    props.onSelectCategoryId(item.id);
                    if (props.setIsPostLoaded) {
                      props.setIsPostLoaded(true);
                    }
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
