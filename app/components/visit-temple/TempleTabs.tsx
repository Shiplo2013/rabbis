import SwipeLeft from "@/app/assets/icons/SwipeLeft";
import SwipeRight from "@/app/assets/icons/SwipeRight";
import { useAppState } from "@/app/components/AppContext";
import BackgroundImage3 from "@/app/ui/BackgroundImage3";
import BackgroundImage4 from "@/app/ui/BackgroundImage4";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
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
  sectionWidth?: number;
  tabGalleryData?: any;
}

export default function TempleTabs(props: ChildProps) {
  const tabsData = props.data as TabsData[];
  const wrapper = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);
  const paginationRef = useRef(null);

  // Lightbox State
  const [toggler, setToggler] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading, templeActiveTab, setTempleActiveTab } =
    useAppState();

  const videos = Array.isArray(tabsData[templeActiveTab]?.videos)
    ? tabsData[templeActiveTab].videos
    : [];
  const videoSources = useMemo(
    () => videos.map((item: any) => item?.video).filter(Boolean),
    [videos],
  );
  const videoTypes = useMemo(() => videos.map(() => "video"), [videos]);
  // UseGSAP for gallery animation
  useGSAP(() => {
    // Gallery Images
    const GalleryImages = galleryRef.current?.querySelectorAll(
      ".single-gallery",
    ) as NodeListOf<HTMLElement> | undefined;

    // Custom Content Item
    if (galleryRef.current) {
      gsap.from(galleryRef.current, {
        opacity: 0,
        ease: "slow(0.1,1,false)",
        duration: 1.5,
        delay: 0,
        scrollTrigger: {
          start: () => {
            return window.innerWidth > 1024
              ? GetRightPosition(galleryRef.current) - window.innerWidth * 0.5
              : (galleryRef.current?.getBoundingClientRect().top ?? 0) +
                  window.scrollY -
                  window.innerHeight * 0.8;
          },
          toggleActions: "restart none none reverse",
        },
      });
    }
    // Contents
    if (GalleryImages && window.innerWidth > 1024) {
      GalleryImages.forEach((item, index) => {
        // Item BG Animation
        const image = item.querySelector(
          ".single-gallery-image",
        ) as HTMLElement | null;
        if (image) {
          // Banner Background
          //gsap.set(image, { scale: 1, x: "5vw" });
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
  }, [templeActiveTab]);

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <section
      ref={wrapper}
      dir="rtl"
      id="temple-tabs"
      className={`${props.extraClass} h-full bg-black flex items-center relative z-20`}
    >
      <div className="tabs-wrapper flex items-center w-full h-full flex-col lg:flex-row">
        <div className="tabs-head w-full lg:min-w-52 lg:w-52 h-full flex flex-col items-center justify-center gap-y-6 py-10 relative z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden">
          <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
            <BackgroundImage3 bgImage={tabBG} start={0} panel={""} />
          </div>
          <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
            {tabsData.map((tab: any, index: number) => (
              <Link
                href={`/visit-temple/${index}`}
                key={index}
                onClick={handleLinkClick}
                className={`group flex text-[24px] leading-[1.2em] relative cursor-pointer ${templeActiveTab === index ? "active" : ""}`}
              >
                <span className="relative">
                  {tab.tab_title}
                  <div
                    className={`w-full h-0.5  bg-[#FBF4E6] ${templeActiveTab === index ? "opacity-100" : "opacity-0"} group-hover:opacity-100 transition-all duration-300`}
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
            {tabsData[templeActiveTab] && (
              <div className="tab-content w-full flex items-center justify-between gap-x-[5vw] gap-y-[5vh] flex-col lg:flex-row">
                <div
                  className={`tab-content-item w-full lg:w-[32vw] lg:min-w-[32vw]`}
                >
                  <div className="title mb-[6vh]">
                    <h2 className="text-[#C3A13F66] text-[60px] sm:text-[80px] lg:text-[114px] leading-[70%] font-bold max-w-76">
                      {parse(tabsData[templeActiveTab]?.title || "")}
                    </h2>
                  </div>
                  <div className="subtitle mb-[4vh]">
                    <h3 className="text-[20px] sm:text-[30px] lg:text-[45px] leading-[1em] text-[#EEECDD]">
                      {parse(tabsData[templeActiveTab]?.subtitle || "")}
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
                    <div className="content text-[#EEECDD] text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.3em] [&>p]:not(:last-child):mb-5">
                      {parse(tabsData[templeActiveTab]?.text || "")}
                    </div>
                  </SimpleBar>
                </div>

                {tabsData[templeActiveTab]?.videos?.length > 0 && (
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
                            loading="lazy"
                          />
                        </div>
                        <div className="hover absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-110">
                          <Image
                            className="w-full h-full object-contain object-center"
                            src={Album1.src}
                            width={100}
                            height={100}
                            alt="Album Icon"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <span className="text">גלריית וידאו</span>
                    </button>
                  </div>
                )}
                <div className="tab-gallery flex items-center w-full lg:h-screen ml-auto mr-auto relative will-change-transform">
                  <div
                    ref={galleryRef}
                    className="gallery-wrapper w-full h-full flex items-center flex-col lg:flex-row will-change-transform"
                  >
                    {window.innerWidth > 1024 ? (
                      Object.values(
                        tabsData[templeActiveTab]?.gallery || [],
                      ).map((item: any, index: number) => {
                        console.log(item);
                        const orientation =
                          props.tabGalleryData?.[templeActiveTab]?.images[index]
                            ?.orientation;
                        if (orientation === "landscape") {
                          return (
                            <div
                              key={index}
                              className="single-gallery will-change-transform w-75 h-45 sm:w-140 sm:h-85 lg:w-[32vw] lg:h-[40vh] overflow-hidden"
                            >
                              <div
                                className={`single-gallery-image w-[120%] h-[120%] lg:w-[40vw] lg:h-[60vh] absolute top-1/2 left-1/2 -translate-[50%] cursor-none pointer-events-none`}
                              >
                                <Image
                                  className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                  src={item?.sizes?.large || item?.image?.src}
                                  width={1200}
                                  height={1200}
                                  blurDataURL={
                                    item?.image?.mobileSrc ||
                                    CreateShimmerDataUrl(1200, 1200)
                                  }
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
                              className="single-gallery will-change-transform w-50 h-70 sm:w-100 sm:h-140 lg:w-[22vw] lg:h-[70vh] overflow-hidden"
                            >
                              <div
                                className={`single-gallery-image w-[120%] h-[120%] lg:w-[30vw] lg:h-[70vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                              >
                                <Image
                                  className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                  src={item?.sizes?.large || item?.image?.src}
                                  width={1200}
                                  height={1200}
                                  blurDataURL={CreateShimmerDataUrl(1200, 1200)}
                                  placeholder={"blur"}
                                  loading="lazy"
                                  alt="Gallery Image"
                                />
                              </div>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <>
                        <Swiper
                          className="w-full"
                          ref={swiperRef}
                          slidesPerView={1}
                          loop={true}
                          autoHeight={true}
                          onSlideChange={(swiper) => {
                            const nextIndex = swiper.activeIndex;
                            if (!loadedSlides.includes(nextIndex)) {
                              setLoadedSlides((prev) => [...prev, nextIndex]);
                            }
                          }}
                        >
                          {props.tabGalleryData?.[templeActiveTab]?.images
                            .length > 0 &&
                            Object.values(
                              tabsData[templeActiveTab]?.gallery || [],
                            ).map((item: any, index: number) => (
                              <SwiperSlide
                                key={index}
                                className="single-gallery will-change-transform w-full h-auto overflow-hidden"
                              >
                                <div
                                  className={`single-gallery-image w-full h-auto relative`}
                                >
                                  {loadedSlides.includes(index) ? (
                                    <Image
                                      className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                                      src={
                                        window.innerWidth < 1024 &&
                                        window.innerWidth > 500
                                          ? item?.sizes?.medium_large ||
                                            item?.image?.src
                                          : item?.sizes?.medium ||
                                            item?.image?.src
                                      }
                                      width={
                                        window.innerWidth < 1024 &&
                                        window.innerWidth > 500
                                          ? 637
                                          : 400
                                      }
                                      height={
                                        window.innerWidth < 1024 &&
                                        window.innerWidth > 500
                                          ? 637
                                          : 400
                                      }
                                      blurDataURL={CreateShimmerDataUrl(
                                        window.innerWidth < 1024 &&
                                          window.innerWidth > 500
                                          ? 637
                                          : 400,
                                        window.innerWidth < 1024 &&
                                          window.innerWidth > 500
                                          ? 637
                                          : 400,
                                      )}
                                      placeholder={"blur"}
                                      loading="lazy"
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 70vw"
                                      alt="Gallery Image"
                                    />
                                  ) : (
                                    <div className="flex h-full min-h-125 items-center justify-center w-full z-40 bg-black">
                                      <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-navigation absolute top-1/2 ml-[-5vw] mr-[-5vw] w-[calc(100%+10vw)] h-13 -mt-7.5 flex items-center justify-center">
                          <div
                            ref={paginationRef}
                            className="custom-pagination flex items-center justify-center gap-5"
                          ></div>
                          <button
                            style={{
                              backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
                            }}
                            className="group absolute left-0 bottom-0 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-12 h-12"
                            //disabled={isEnd}
                            onClick={() =>
                              swiperRef.current?.swiper.slideNext()
                            }
                          >
                            <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
                              <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
                              <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30 w-6 h-auto">
                                <SwipeLeft />
                              </div>
                            </div>
                          </button>
                          <button
                            style={{
                              backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
                            }}
                            className="group absolute right-0 bottom-0 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-12 h-12"
                            //disabled={isBeginning}
                            onClick={() =>
                              swiperRef.current?.swiper.slidePrev()
                            }
                          >
                            <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
                              <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
                              <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30 w-6 h-auto">
                                <SwipeRight />
                              </div>
                            </div>
                          </button>
                        </div>
                      </>
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
