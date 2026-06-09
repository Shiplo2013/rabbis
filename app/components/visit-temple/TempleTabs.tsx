import BackgroundImage3 from "@/app/ui/BackgroundImage3";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import Album1 from "../../assets/images/album-icon1.png";
import Album2 from "../../assets/images/album-icon2.png";
import tabContentBG from "../../assets/images/visit-temple/tab-content-bg.jpg";
import tabBG from "../../assets/images/visit-temple/tab-menu-bg.jpg";
import { gsap, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface TabsData {
  tab_title?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  gallery_images?: any;
  videos?: any;
  gallery?: any;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: TabsData[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  sectionWidth?: number;
  tabGalleryData?: any;
}

export default function TempleTabs(props: ChildProps) {
  const tabsData = props.data as TabsData[];
  const wrapper = useRef<HTMLDivElement>(null);

  // Lightbox State
  const [toggler, setToggler] = useState(false);

  const videos = Array.isArray(tabsData[props.activeTab]?.videos)
    ? tabsData[props.activeTab].videos
    : [];
  const videoSources = useMemo(
    () => videos.map((item: any) => item?.video).filter(Boolean),
    [videos],
  );
  const videoTypes = useMemo(() => videos.map(() => "video"), [videos]);

  return (
    <section
      ref={wrapper}
      dir="rtl"
      id="temple-tabs"
      className={`${props.extraClass} h-full bg-black flex items-center relative z-20`}
      style={{ width: `${Math.max((props.sectionWidth ?? 25.5) - 25.5, 0)}vw` }}
    >
      <div className="tabs-wrapper flex items-center w-full h-full">
        <div className="tabs-head min-w-52 w-52 h-full flex flex-col items-center justify-center gap-y-6 py-10 relative z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden">
          <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
            <BackgroundImage3 bgImage={tabBG} start={0} panel={""} />
          </div>
          <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
            {tabsData.map((tab: any, index: number) => (
              <div
                key={index}
                className={`tab-head-item group flex text-[24px] leading-[1.2em] relative cursor-pointer ${props.activeTab === index ? "active" : ""}`}
                onClick={() => props.setActiveTab(index)}
              >
                <span className="relative">
                  {tab.tab_title}
                  <div
                    className={`w-full h-0.5  bg-[#FBF4E6] ${props.activeTab === index ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-all duration-300`}
                  ></div>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="tabs-content w-full h-full flex items-center relative z-20 px-[8.5vw] py-[10vh]">
          <div className="tabs-content-bg absolute overflow-hidden w-full h-full z-10 top-0 right-0 user-select-none pointer-events-none">
            <BackgroundImage3 bgImage={tabContentBG} start={1} panel={""} />
          </div>
          <div className="tabs-content-wrapper relative z-30 w-full h-full flex items-center justify-start">
            {tabsData[props.activeTab] && (
              <div className="tab-content w-full flex items-center justify-between gap-x-[5vw]">
                <div className={`tab-content-item w-[32vw]`}>
                  <div className="title mb-[6vh]">
                    <h2 className="text-[#C3A13F66] text-[114px] leading-[70%] font-bold max-w-76">
                      {parse(tabsData[props.activeTab]?.title || "")}
                    </h2>
                  </div>
                  <div className="subtitle mb-[4vh]">
                    <h3 className="text-[45px] leading-[1em] text-[#EEECDD]">
                      {parse(tabsData[props.activeTab]?.subtitle || "")}
                    </h3>
                  </div>

                  <SimpleBar
                    style={{
                      maxHeight: "40vh",
                      paddingLeft: 20,
                      marginLeft: -20,
                    }}
                    autoHide={false}
                  >
                    <div className="content text-[#EEECDD] text-[21px] leading-[1.3em] [&>p]:not(:last-child):mb-5">
                      {parse(tabsData[props.activeTab]?.text || "")}
                    </div>
                  </SimpleBar>
                </div>

                {tabsData[props.activeTab]?.videos?.length > 0 && (
                  <div className="video-gallery">
                    {videoSources.length > 0 && (
                      <FsLightbox
                        key={`videos-${videoSources.length}`}
                        toggler={toggler}
                        sources={videoSources}
                        types={videoTypes}
                      />
                    )}
                    <button
                      onClick={() => setToggler(!toggler)}
                      className="video-popup cursor-pointer w-25 h-auto flex items-center justify-center flex-col group text-[18px]"
                    >
                      <div className="icon w-full h-auto flex items-center justify-center relative">
                        <div className="static duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-90">
                          <Image
                            className="w-full h-full object-contain object-center"
                            src={Album2.src}
                            width={100}
                            height={100}
                            alt="Album Icon"
                          />
                        </div>
                        <div className="hover absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-110">
                          <Image
                            className="w-full h-full object-contain object-center"
                            src={Album1.src}
                            width={100}
                            height={100}
                            alt="Album Icon"
                          />
                        </div>
                      </div>
                      <span className="text">גלריית וידאו</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
