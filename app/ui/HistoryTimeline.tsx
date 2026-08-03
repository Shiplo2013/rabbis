"use client";
import { MouseEvent, useState } from "react";
import HistoryIcon from "../assets/icons/HistoryIcon";

interface ChildProps {
  wrapperId: string;
  progressId: string;
  timelineData: { id: number; title: string }[];
}
export default function HistoryTimeline(props: ChildProps) {
  const [introData, setIntroData] = useState<Record<string, number>>({});
  const [activeTimeline, setActiveTimeline] = useState<boolean | null>(false);

  // Get Offset Top Position
  function getOffsetTop(selector: string) {
    const element = document.querySelector(selector);
    if (!element) return 0;
    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
    return offsetTop;
  }

  const handleStepClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const id = target.getAttribute("data-id");

    if (id) {
      window.scrollTo({
        top: getOffsetTop("#page>.timeline" + id),
        behavior: "smooth",
      });
      setActiveTimeline(false);
    }
  };
  return (
    <div
      id={props.wrapperId}
      className="history-timeline fixed bottom-5 lg:bottom-[5vh] right-5 lg:right-0 w-screen h-auto z-30 opacity-0"
    >
      <div
        className={`timeline-wrapper bg-amber-50 lg:bg-transparent px-7 py-5 lg:px-0 lg:py-0 rounded-2xl lg:rounded-none mb-3 w-auto lg:w-[80%] mx-auto overflow-hidden absolute right-0 lg:right-auto bottom-full lg:bottom-auto lg:relative z-30 transition-all duration-300 ${activeTimeline ? "opacity-100 visible" : "opacity-0 invisible"} lg:opacity-100 lg:visible`}
      >
        <div className="timeline flex flex-col lg:flex-row lg:items-center lg:justify-center gap-y-2 gap-x-[4.2vw] relative">
          {props?.timelineData?.map((item, index) => {
            const isLastChild = index === props?.timelineData?.length - 1;
            return (
              <div
                onClick={handleStepClick}
                className={`flex flex-row lg:flex-col gap-x-5 gap-y-5 items-center relative lg:w-36 pb-2 lg:pb-10 pt-2 cursor-pointer timeline-step intro-${index + 1}`}
                key={index}
                data-id={item.id}
              >
                {!isLastChild && (
                  <div className="progress-line absolute top-4.25 right-1/2 mr-2.5 w-[calc(150%-10px)] z-0 origin-right">
                    <div className="border-line border-b-2 border-[#C3A13F] border-dotted w-0"></div>
                  </div>
                )}
                <div className="w-5 h-5 rounded-full border-[3px] border-(--theme-color) relative z-10 indicator"></div>
                <span className="text-[18px] sm:text-[20px] lg:text-[25px] leading-[1em] text-[#000000] lg:text-[#FBF4E6] relative lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:min-w-[120%] text-center">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div
          id={props.progressId}
          className="absolute w-0 h-2 bg-(--theme-color)"
        ></div>
      </div>
      <button
        id="history-button"
        onClick={() => setActiveTimeline(!activeTimeline)}
        className="w-12 h-12 block lg:hidden cursor-pointer"
      >
        <HistoryIcon />
      </button>
    </div>
  );
}
