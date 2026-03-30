import { Ref } from "react";

interface ChildProps {
  wrapperRef: Ref<HTMLDivElement>;
  progressRef: Ref<HTMLDivElement>;
  timelineData: { id: number; title: string }[];
}
export default function HistoryTimeline(props: ChildProps) {
  return (
    <div
      ref={props.wrapperRef}
      className="history-timeline fixed bottom-[5vh] right-0 w-screen h-auto z-30 opacity-0"
    >
      <div className="timeline-wrapper w-[80%] mx-auto overflow-hidden relative">
        <div className="timeline flex items-center justify-center gap-x-[4.2vw] relative">
          {props?.timelineData?.map((item, index) => {
            const isLastChild = index === props?.timelineData?.length - 1;
            return (
              <div
                className={`flex flex-col gap-y-5 items-center relative w-36 pb-10 pt-2 timeline-step intro-${index + 1}`}
                key={index}
                data-id={item.id}
              >
                {!isLastChild && (
                  <div className="progress-line absolute top-4.25 right-1/2 mr-2.5 w-[calc(150%-10px)] z-0 origin-right">
                    <div className="border-line border-b-2 border-[#C3A13F] border-dotted w-0"></div>
                  </div>
                )}
                <div className="w-5 h-5 rounded-full border-[3px] border-(--theme-color) relative z-10 indicator"></div>
                <span className="text-[25px] leading-[1em] text-[#FBF4E6] absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[120%] text-center">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
        <div
          ref={props.progressRef}
          className="absolute w-0 h-2 bg-(--theme-color)"
        ></div>
      </div>
    </div>
  );
}
