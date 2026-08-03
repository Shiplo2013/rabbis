import { useAppState } from "../AppContext";
import TempleTabs from "./TempleTabs";
import VideoSection from "./VideoSection";

interface SectionData {
  videoSection?: any;
  templeTabs?: any;
}
interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData?: SectionData | {};
  sectionWidth?: number;
  tabGalleryData?: any;
  style?: React.CSSProperties;
}

export default function VisitTempleSection(props: ChildProps) {
  const { templeActiveTab, setTempleActiveTab } = useAppState();
  // Video Section Data
  const sectionData = props.sectionData as SectionData;
  const videoSectionData = sectionData.videoSection || {};
  const tabSectionData = sectionData.templeTabs || {};

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} lg:h-screen bg-black flex flex-col lg:flex-row items-center relative z-20`}
    >
      <div className="visit-temple-wrapper flex flex-col lg:flex-row w-full lg:h-full">
        <VideoSection
          extraClass="video-item w-full lg:w-[25.6vw] lg:min-w-123 will-change-transform"
          animWidthText={0.1}
          data={videoSectionData}
        />
        <TempleTabs
          extraClass="will-change-transform"
          animWidthText={props.animWidthText}
          data={tabSectionData}
          sectionWidth={props.sectionWidth}
          tabGalleryData={props.tabGalleryData}
        />
      </div>
    </section>
  );
}
