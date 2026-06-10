import { useEffect } from "react";
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
  activeTab?: number;
  setActiveTab?: (index: number) => void;
  sectionWidth?: number;
  tabGalleryData?: any;
}

export default function VisitTempleSection(props: ChildProps) {
  // Video Section Data
  const sectionData = props.sectionData as SectionData;
  const videoSectionData = sectionData.videoSection || {};
  const tabSectionData = sectionData.templeTabs || {};
  const activeTab = props.activeTab ?? 0;
  const setActiveTab = props.setActiveTab ?? (() => {});

  useEffect(() => {
    console.log("VisitTempleSection Rendered", props.tabGalleryData);
  }, [props.tabGalleryData]);

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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sectionWidth={props.sectionWidth}
          tabGalleryData={props.tabGalleryData}
        />
      </div>
    </section>
  );
}
