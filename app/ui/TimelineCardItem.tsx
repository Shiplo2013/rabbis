import parse from "html-react-parser";
import { useRef, useState, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "../ui/plugins";
import CardExpendButtons from "./history/CardExpendButtons";
import CardItemImages from "./history/CardItemImages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  cardClass: string;
  data: any;
  dataIndex: number;
  setSingleVideoPlaying: (value: boolean) => void;
  singleVideoPlaying: boolean;
}

// Viewport detection functions
const subscribeToDesktopViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getDesktopViewportSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches;

const getServerDesktopViewportSnapshot = () => false;

export default function TimelineCardItem(props: ChildProps) {
  // Viewport Detection
  const isDesktopViewport = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  );
  // Selector
  const wrapper = useRef<HTMLDivElement>(null!);
  const [isOpen, setIsOpen] = useState(false);
  // Set Default
  useGSAP(
    () => {
      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !isDesktopViewport
      ) {
        return;
      }

      const imagesDiv = wrapper.current?.querySelector(".expand-images");
      const imagesWrap = wrapper.current?.querySelector(
        ".expand-images>.images-wrapper",
      );
      if (imagesDiv) {
        gsap.set(imagesDiv, {
          opacity: 0,
          visibility: "hidden",
        });
      }
      if (imagesWrap) {
        gsap.set(imagesWrap, {
          x: "100%",
        });
      }
    },
    { scope: wrapper },
  );

  return (
    <div
      ref={wrapper}
      data-index={props.dataIndex}
      className={`timeline-card group w-full h-auto lg:w-[19.5vw] lg:h-[46.8vh] relative hover:z-50 ${props.extraClass}`}
    >
      <div
        className={`card-item w-full h-80 sm:h-100 lg:h-full flex items-center justify-center relative z-10 origin-center ${props.cardClass}`}
      >
        <div className="card-wrapper text-[20px] sm:text-[30px] leading-[90%] text-black w-51">
          {parse(props.data?.text || "")}
        </div>
        {!isDesktopViewport && (
          <CardExpendButtons
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            wrapper={wrapper}
            setSingleVideoPlaying={props.setSingleVideoPlaying}
          />
        )}
      </div>
      {isDesktopViewport && (
        <CardExpendButtons
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          wrapper={wrapper}
          setSingleVideoPlaying={props.setSingleVideoPlaying}
        />
      )}
      <CardItemImages data={props.data} isOpen={isOpen} />
    </div>
  );
}
