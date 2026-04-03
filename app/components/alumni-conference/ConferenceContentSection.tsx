import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import { StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

interface SingleCyclePictureData {
  title: string;
  content: string;
  image: StaticImageData;
  link: string;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: SingleCyclePictureData[];
}

export default function ConferenceContentSection(props: ChildProps) {
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
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[9.89vw]">
        <div className="conference-content w-[42.5vw] h-full will-change-transform overflow-hidden"></div>
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
