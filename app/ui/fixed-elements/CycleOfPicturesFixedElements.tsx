import CloseIcon from "@/app/assets/icons/CloseIcon";
import SwipeRight from "@/app/assets/icons/SwipeRight";
import { useAppState } from "@/app/components/AppContext";
import { gsap } from "gsap";
import parse from "html-react-parser";
import { useRef, useSyncExternalStore } from "react";
import SimpleBar from "simplebar-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGSAP } from "../plugins";
// Image inner zoom
import SwipeLeft from "@/app/assets/icons/SwipeLeft";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const subscribeToDesktopViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getDesktopViewportSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches;

const getServerDesktopViewportSnapshot = () => false;

export default function CycleOfPicturesFixedElements() {
  // Desktop viewport state
  const isDesktopViewport = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  );
  // Selectors
  // Cycle Popup Slider
  const swiperRef = useRef<SwiperRef>(null);
  const cyclePopupRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const {
    cycleActiveCategory,
    setCycleActiveCategory,
    isLoading,
    cycleAllPosts,
    cycleCategories,
    activeCyclePopup,
    setActiveCyclePopup,
    cyclePopupIndex,
    setCyclePopupIndex,
  } = useAppState();

  // GSAP Animation for Cycle Popup
  useGSAP(() => {
    if (!cyclePopupRef.current) return;
    // Find index of current slide
    const currentSlide = cycleAllPosts?.findIndex((item: any) => {
      return item?.id === cyclePopupIndex;
    });
    swiperRef?.current?.swiper?.slideToLoop(currentSlide, 0);
    if (activeCyclePopup) {
      gsap.to(cyclePopupRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        delay: 0,
      });
    } else {
      gsap.to(cyclePopupRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0,
      });
    }
  }, [activeCyclePopup, cyclePopupIndex]);

  return (
    <>
      <div
        id="cycle-sidebar"
        className="cycle-sidebar fixed top-0 right-15 w-70 h-full bg-[#1A1A1A] flex flex-col items-center justify-center z-50 border-l border-[#D1CECE]"
      >
        <div className="sheet-sidebar min-w-50 w-50 h-full overflow-hidden flex flex-col justify-center">
          <div className="sheet-sidebar-wrapper flex items-center">
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper w-full">
              <SimpleBar
                style={{ maxHeight: "60vh" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-10 pr-2.5">
                  <button
                    type="button"
                    aria-label="Select All Categories"
                    disabled={cycleActiveCategory === -1 || isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      setCycleActiveCategory(-1);
                    }}
                    className={`all-post block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] border-t hover:bg-[#00000058] hover:text-[#ffffff] ${cycleActiveCategory === -1 ? "bg-[#00000058] text-[#ffffff] " : "bg-transparent text-[#CD5E41]"}`}
                  >
                    הכל
                  </button>
                  {cycleCategories?.length > 0 &&
                    cycleCategories?.map((item: any, index: number) => {
                      return (
                        <button
                          type="button"
                          aria-label={`Select Category ${item.name}`}
                          key={item?.id}
                          disabled={
                            Number(cycleActiveCategory) === item.id || isLoading
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setCycleActiveCategory(item.id);
                          }}
                          className={`category block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] hover:bg-[#00000058] hover:text-[#ffffff] transition-colors duration-300 ${Number(cycleActiveCategory) === item.id ? "bg-[#00000058] text-[#ffffff]" : "bg-transparent text-[#CD5E41]"}`}
                        >
                          {parse(item.name || "")}
                        </button>
                      );
                    })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={cyclePopupRef}
        id="cycle-popup-zoom"
        className="fixed top-0 left-0 w-screen h-screen bg-[#000000d7] z-999 opacity-0 invisible"
      >
        <div className="cycle-popup-wrapper flex flex-col items-center justify-center w-full h-full relative">
          <button
            type="button"
            aria-label="Close Cycle Popup"
            onClick={() => {
              setActiveCyclePopup(false);
            }}
            className="close-cycle-popup absolute top-5 right-5 cursor-pointer w-10 h-10 sm:w-12 sm:h-12 p-3 sm:p-3.5 bg-[#202325] border border-[#C3A13F] rounded-full z-50"
          >
            <CloseIcon className="w-full h-auto" />
          </button>
          <Swiper
            className="w-full relative z-10"
            ref={swiperRef}
            slidesPerView={1}
            loop={true}
          >
            {cycleAllPosts?.length > 0 &&
              cycleAllPosts?.map((item: any, index: number) => {
                return (
                  <SwiperSlide data-id={item?.id} key={item?.id}>
                    <div className="flex flex-col items-center h-full justify-center gap-y-5 px-[5vw]">
                      <div
                        className="cycle-image w-full max-w-5xl h-auto flex items-center justify-center [&>figure]:w-full [&>figure>div>img]:w-full"
                        data-size={
                          isDesktopViewport
                            ? item?.acf?.image?.sizes?.large
                            : item?.acf?.image?.sizes?.medium
                        }
                      >
                        <InnerImageZoom
                          src={
                            isDesktopViewport
                              ? item?.acf?.image?.sizes?.large
                              : item?.acf?.image?.sizes?.medium
                          }
                          zoomSrc={item?.acf?.image?.url}
                        />
                      </div>
                      <div className="cycle-title">
                        <h3 className="text-[25px] sm:text-[35px] lg:text-[45px] text-[#D1A941] leading-[70%] text-center">
                          {parse(item?.title?.rendered || "")}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="swiper-navigation w-full flex items-center justify-center">
            <button
              type="button"
              aria-label="Next Slide"
              style={{
                backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
              }}
              className="group absolute left-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-mt-6 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-12 h-12 sm:w-15 sm:h-15"
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
                <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
                <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30 w-5 sm:w-6 h-auto">
                  <SwipeLeft />
                </div>
              </div>
            </button>
            <button
              type="button"
              aria-label="Previous Slide"
              style={{
                backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
              }}
              className="group absolute right-5 bottom-5 sm:bottom-auto sm:top-1/2 sm:-mt-6 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-12 h-12 sm:w-15 sm:h-15"
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
                <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
                <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30 w-5 sm:w-6 h-auto">
                  <SwipeRight />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
