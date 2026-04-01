import { useState } from "react";

export default function GetHebrewYear(props: { year: string }) {
  // Selector
  const [showMonths, setShowMonths] = useState(false);

  // Section Data
  const Months = [
    "תשרי",
    "חשון",
    "כסליו",
    "טבת",
    "שבט",
    "אדר",
    "ניסן",
    "אייר",
    "סיון",
    "תמוז",
    "אב",
    "אלול",
  ];

  const handleYearClick = () => {
    setShowMonths(!showMonths);
  };

  return (
    <div className="year-month text-[24px] leading-[1.2em]">
      <div
        onClick={handleYearClick}
        className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
      >
        {props.year}
      </div>
      <div
        className={`months ${showMonths ? "flex" : "hidden"} flex-col gap-y-1 py-4 border-b border-[#CD5E41]`}
      >
        {Months.map((item, index) => {
          return (
            <button
              key={index}
              className={`month month-${index} w-full text-right cursor-pointer relative group`}
            >
              {item}
              <span className="indicator absolute top-1/2 -mt-0.5 left-full ml-1.25 w-1 h-1 rounded-full bg-[#CD5E41] transition-all opacity-0 duration-500 group-hover:opacity-100"></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
