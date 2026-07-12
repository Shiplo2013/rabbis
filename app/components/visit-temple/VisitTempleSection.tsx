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
      className={`${props.extraClass} h-screen bg-black flex items-center relative z-20`}
    >
      <div className="visit-temple-wrapper flex w-full h-full">
        <VideoSection
          extraClass="video-item w-[25.6vw] min-w-50 will-change-transform"
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
