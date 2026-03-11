import { Ref } from "react";

interface ChildProps {
  wrapperRef: Ref<HTMLDivElement>;
  progrssRef: Ref<HTMLDivElement>;
  timelineData: { id: number; title: string }[];
}
export default function HistoryTimeline(props: ChildProps) {
  return (
    <div
      ref={props.wrapperRef}
      className="history-timeline fixed bottom-[5vh] right-0 w-screen h-auto opacity-0"
    >
      <div className="timeline-wrapper w-[80%] mx-auto">
        <div className="timeline flex items-center justify-center gap-x-[4.2vw]">
          {props?.timelineData?.map((item, index) => {
            const isLastChild = index === props?.timelineData?.length - 1;
            return (
              <div
                className={`flex flex-col gap-y-5 items-center relative`}
                key={index}
                data-id={item.id}
              >
                {!isLastChild && (
                  <div className="progress-line absolute top-2.25 right-1/2 w-[150%] border-b-2 border-[#C3A13F] border-dashed z-0"></div>
                )}
                <div className="w-5 h-5 rounded-full border-[3px] border-(--theme-color) bg-black relative z-10"></div>
                <span className="text-[25px] leading-[1em] text-[#FBF4E6]">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div
          ref={props.progrssRef}
          className="absolute w-0 h-2 bg-(--theme-color)"
        ></div>
      </div>
    </div>
  );
}
