import BackgroundImage3 from "@/app/ui/BackgroundImage3";
import BackgroundImage4 from "@/app/ui/BackgroundImage4";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const activeTab = props.activeTab ?? 0;
  const setActiveTab = props.setActiveTab ?? (() => {});

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
  // UseGSAP for gallery animation
  useGSAP(() => {
    // Gallery Images
    const GalleryImages =
      galleryRef.current?.querySelectorAll(".single-gallery");

    // Custom Content Item
    gsap.from(galleryRef.current, {
      opacity: 0,
      ease: "slow(0.1,1,false)",
      duration: 1.5,
      delay: 0,
      scrollTrigger: {
        start: () => {
          return GetRightPosition(galleryRef.current) - window.innerWidth * 0.5;
        },
        toggleActions: "restart pause resume reverse",
      },
    });
    // Contents
    if (GalleryImages) {
      GalleryImages.forEach((item, index) => {
        // Item BG Animation
        const image = item.querySelector(".single-gallery-image");
        if (image) {
          // Banner Background
          gsap.set(image, { scale: 1.2, x: "10vw" });
          gsap.to(image, {
            x: "-10vw",
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: () => {
                return GetRightPosition(image) - window.innerWidth * 0.5;
              },
              end: () => {
                return "+=" + window.innerWidth * 2.5;
              },
              scrub: 2,
            },
          });
        }
      });
    }
  }, [activeTab]);

  return (
    <section
      ref={wrapper}
      dir="rtl"
      id="temple-tabs"
      className={`${props.extraClass} h-full bg-black flex items-center relative z-20`}
    >
      <div className="tabs-wrapper flex items-center w-full h-full">
        <div className="tabs-head min-w-52 w-52 h-full flex flex-col items-center justify-center gap-y-6 py-10 relative z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden">
          <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
            <BackgroundImage3 bgImage={tabBG} start={0} panel={""} />
          </div>
          <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
            {tabsData.map((tab: any, index: number) => (
              <Link
                href={`/visit-temple/${index}`}
                key={index}
                className={`tab-head-item group flex text-[24px] leading-[1.2em] relative cursor-pointer ${activeTab === index ? "active" : ""}`}
              >
                <span className="relative">
                  {tab.tab_title}
                  <div
                    className={`w-full h-0.5  bg-[#FBF4E6] ${activeTab === index ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-all duration-300`}
                  ></div>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="tabs-content w-full h-full flex items-center relative z-20 px-[8.5vw] py-[10vh]">
          <div className="tabs-content-bg absolute overflow-hidden w-full h-full z-10 top-0 right-0 user-select-none pointer-events-none">
            <BackgroundImage4 bgImage={tabContentBG} start={1} panel={""} />
          </div>
          <div className="tabs-content-wrapper relative z-30 w-full h-full flex items-center justify-start">
            {tabsData[activeTab] && (
              <div className="tab-content w-full flex items-center justify-between gap-x-[5vw]">
                <div className={`tab-content-item w-[32vw] min-w-[32vw]`}>
                  <div className="title mb-[6vh]">
                    <h2 className="text-[#C3A13F66] text-[114px] leading-[70%] font-bold max-w-76">
                      {parse(tabsData[activeTab]?.title || "")}
                    </h2>
                  </div>
                  <div className="subtitle mb-[4vh]">
                    <h3 className="text-[45px] leading-[1em] text-[#EEECDD]">
                      {parse(tabsData[activeTab]?.subtitle || "")}
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
                      {parse(tabsData[activeTab]?.text || "")}
                    </div>
                  </SimpleBar>
                </div>

                {tabsData[activeTab]?.videos?.length > 0 && (
                  <div className="video-gallery relative w-25 h-auto flex z-50">
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
                <div className="tab-gallery flex items-center w-full h-screen ml-auto mr-auto relative will-change-transform">
                  <div
                    ref={galleryRef}
                    className="gallery-wrapper w-full h-full flex items-center will-change-transform"
                  >
                    {Object.values(tabsData[activeTab]?.gallery || []).map(
                      (item: any, index: number) => {
                        const orientation =
                          props.tabGalleryData?.[activeTab]?.images[index]
                            ?.orientation;
                        if (orientation === "landscape") {
                          return (
                            <div
                              key={index}
                              className="single-gallery will-change-transform w-[32vw] h-[40vh] overflow-hidden"
                            >
                              <div
                                className={`single-gallery-image w-[50vw] h-[70vh] absolute top-1/2 left-1/2 -translate-[50%] cursor-none pointer-events-none`}
                              >
                                <Image
                                  className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                  src={item?.sizes?.large || item?.image?.src}
                                  width={1200}
                                  height={1200}
                                  blurDataURL={CreateShimmerDataUrl(1000, 1000)}
                                  placeholder={"blur"}
                                  loading="lazy"
                                  alt="Gallery Image"
                                />
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={index}
                              className="single-gallery will-change-transform w-[22vw] h-[70vh] overflow-hidden"
                            >
                              <div
                                className={`single-gallery-image w-[60vw] h-[85vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                              >
                                <Image
                                  className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                  src={item?.sizes?.large || item?.image?.src}
                                  width={1200}
                                  height={1200}
                                  blurDataURL={CreateShimmerDataUrl(1000, 1000)}
                                  placeholder={"blur"}
                                  loading="lazy"
                                  alt="Gallery Image"
                                />
                              </div>
                            </div>
                          );
                        }
                      },
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
