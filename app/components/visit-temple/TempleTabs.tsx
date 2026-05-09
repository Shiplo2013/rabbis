import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef, useState } from "react";
import tabContentBG from "../../assets/images/visit-temple/tab-content-bg.jpg";
import tabBG from "../../assets/images/visit-temple/tab-menu-bg.jpg";
import { gsap, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: string;
}

export default function TempleTabs(props: ChildProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabsData, setTabsData] = useState<any>(JSON.parse(props.data));
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

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
          return GetRightPosition(galleryRef.current) - window.innerWidth * 1;
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
              start: () => {
                return window.innerWidth * 0.5;
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
      className={`${props.extraClass} h-full bg-black flex items-center relative z-20`}
    >
      <div className="tabs-wrapper flex items-center w-full h-full">
        <div className="tabs-head min-w-52 w-52 h-full flex flex-col items-center justify-center gap-y-6 py-10 relative z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden">
          <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
            <BackgroundImage2
              bgImage={tabBG}
              start={props.animWidthText}
              panel={""}
            />
          </div>
          <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
            {tabsData.map((tab: any, index: number) => (
              <div
                key={index}
                className={`tab-head-item group flex text-[24px] leading-[1.2em] relative cursor-pointer ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="relative">
                  {tab.head}
                  <div
                    className={`w-full h-0.5  bg-[#FBF4E6] ${activeTab === index ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-all duration-300`}
                  ></div>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="tabs-content w-[255vw] h-full flex items-center relative z-20 px-[8.5vw] py-[10vh]">
          <div className="tabs-content-bg absolute overflow-hidden w-full h-full z-10 top-0 right-0 user-select-none pointer-events-none">
            <BackgroundImage2
              bgImage={tabContentBG}
              start={props.animWidthText}
              panel={""}
            />
          </div>
          <div className="tabs-content-wrapper relative z-30 w-full h-full flex items-center justify-start">
            {tabsData[activeTab] && (
              <div className="tab-content w-full flex items-center justify-between gap-x-[5vw]">
                <div className={`tab-content-item w-[32vw]`}>
                  <div className="title mb-[6vh]">
                    <h2 className="text-[#C3A13F66] text-[114px] leading-[70%] font-bold max-w-76">
                      {parse(tabsData[activeTab].content.title)}
                    </h2>
                  </div>
                  <div className="subtitle mb-[4vh]">
                    <h3 className="text-[45px] leading-[1em] text-[#EEECDD]">
                      {parse(tabsData[activeTab].content.subtitle)}
                    </h3>
                  </div>
                  <div className="content text-[#EEECDD] text-[21px] leading-[1.3em]">
                    {parse(tabsData[activeTab].content.text)}
                  </div>
                </div>

                <div className="tab-gallery flex items-center h-screen ml-auto mr-auto relative w-[200vw] will-change-transform">
                  <div
                    ref={galleryRef}
                    className="gallery-wrapper w-full h-full flex items-center will-change-transform"
                  >
                    {tabsData[activeTab]?.content.images.map(
                      (item: { image: any; size: string }, index: number) => {
                        if (item.size === "landescape") {
                          return (
                            <div
                              key={index}
                              className="single-gallery will-change-transform w-[32vw] h-[40vh] overflow-hidden"
                            >
                              <div
                                className={`single-gallery-image w-[50vw] h-[70vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                              >
                                <Image
                                  className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                  src={item?.image?.src}
                                  width={item?.image?.width}
                                  height={item?.image?.height}
                                  blurDataURL={item?.image?.blurDataURL}
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
                                  src={item?.image?.src}
                                  width={item?.image?.width}
                                  height={item?.image?.height}
                                  blurDataURL={item?.image?.blurDataURL}
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
