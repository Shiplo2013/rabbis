"use client";
import { MouseEvent, Ref, useEffect, useState } from "react";

interface ChildProps {
  wrapperRef: Ref<HTMLDivElement>;
  progressRef: Ref<HTMLDivElement>;
  timelineData: { id: number; title: string }[];
}
export default function HistoryTimeline(props: ChildProps) {
  const [introData, setIntroData] = useState<Record<string, number>>({});

  // Get Intro Right Position
  function getRightPosition(selector: string) {
    const intro = document.querySelector(selector);
    if (!intro) return 0;
    const introObj = intro.getBoundingClientRect();
    const introRight = Math.floor(window.innerWidth - introObj.right);
    return introRight;
  }

  function buildIntroData() {
    return {
      "1": getRightPosition(".first-intro"),
      "2": getRightPosition(".second-intro") + window.innerWidth * 0.12,
      "3": getRightPosition(".third-intro") + window.innerWidth * 0.215,
      "4": getRightPosition(".fourth-intro") + window.innerWidth * 0.37,
      "5": getRightPosition(".fifth-intro") + window.innerWidth * 0.51,
      "6": getRightPosition(".sixth-intro") + window.innerWidth * 0.6,
    };
  }
  useEffect(() => {
    const updateIntroData = () => {
      setIntroData(buildIntroData());
    };

    if (document.readyState === "complete") {
      updateIntroData();
    } else {
      window.addEventListener("load", updateIntroData, { once: true });
    }

    window.addEventListener("resize", updateIntroData);

    return () => {
      window.removeEventListener("load", updateIntroData);
      window.removeEventListener("resize", updateIntroData);
    };
  }, []);

  const handleStepClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const id = target.getAttribute("data-id");

    if (id && introData[id] !== undefined) {
      window.scrollTo({
        top: introData[id],
        behavior: "smooth",
      });
    }
  };
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
                onClick={handleStepClick}
                className={`flex flex-col gap-y-5 items-center relative w-36 pb-10 pt-2 cursor-pointer timeline-step intro-${index + 1}`}
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
