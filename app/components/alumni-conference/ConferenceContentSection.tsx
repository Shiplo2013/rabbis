import ConferenceGalleryImage from "@/app/ui/conference/ConferenceGalleryImage";
import ConferenceGalleryImage2 from "@/app/ui/conference/ConferenceGalleryImage2";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Album1 from "../../assets/images/album-icon1.png";
import Album2 from "../../assets/images/album-icon2.png";
import contentBg from "../../assets/images/text-frame.png";

interface SingleCyclePictureData {
  gallery?: any;
  sectionText?: string;
  videos?: any;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: SingleCyclePictureData;
  galleryImageSizes?: any;
  style?: React.CSSProperties;
}

export default function ConferenceContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const SectionData = props?.sectionData;

  // Lightbox State
  const [toggler, setToggler] = useState(false);

  const videos = Array.isArray(SectionData?.videos) ? SectionData.videos : [];
  const videoSources = useMemo(
    () => videos.map((item: any) => item?.video?.url).filter(Boolean),
    [videos],
  );
  const videoTypes = useMemo(() => videos.map(() => "video"), [videos]);

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-y-[7vh] gap-x-[9.89vw] flex-col lg:flex-row">
        <div className="conference-content lg:min-w-[42.5vw] w-full lg:w-[42.5vw] h-full will-change-transform overflow-hidden relative">
          <div className="content-bg absolute top-0 left-0 w-full h-full sm:h-auto sm:relative z-10 scale-150 sm:scale-0">
            <Image
              className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
              src={contentBg?.src}
              width="816"
              height="598"
              blurDataURL={contentBg?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Graduates"
            />
          </div>
          <div
            dir="ltr"
            className="conference-content-wrapper relative sm:absolute top-0 left-0 w-full h-full z-30 lg:text-[21px] text-[14px] sm:text-[16px] text-black leading-[1.3em] px-[10vw] lg:px-[6.25vw] py-10 sm:py-[10vh] lg:py-[12.9vh] flex flex-col gap-y-[3vh] text-right"
          >
            {parse(SectionData?.sectionText || "")}
          </div>
        </div>

        {SectionData?.videos?.length > 0 && (
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
              className="video-popup cursor-pointer w-25 min-w-25 h-auto flex items-center justify-center flex-col group text-[18px]"
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
        <div className="conference-gallery w-full flex items-center will-change-transform flex-col lg:flex-row">
          {SectionData?.gallery &&
            SectionData?.gallery?.map((item: any, index: number) => {
              const dimensions = props.galleryImageSizes?.[index];
              if (dimensions === "landscape") {
                return (
                  <ConferenceGalleryImage
                    key={index}
                    item={item}
                    index={index}
                  />
                );
              } else {
                return (
                  <ConferenceGalleryImage2
                    key={index}
                    item={item}
                    index={index}
                  />
                );
              }
            })}
        </div>
      </div>
    </section>
  );
}
