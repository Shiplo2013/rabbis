"use client";

import ArrowLeftIcon from "@/app/assets/icons/ArrowLeftIcon";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Album1 from "../../assets/images/album-icon1.png";
import Album2 from "../../assets/images/album-icon2.png";
import BgImage from "../../assets/images/mirros-bg.jpg";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  nextPost: any;
}

export default function MirrorsSection(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const imageTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>(null);
  // Use State
  const pageData = props.data || {};
  const nextPost = props.nextPost || {};
  const {
    isLoading,
    setIsLoading,
    activeMusicItem,
    setActiveMusicItem,
    musicPageData,
  } = useAppState();

  // Lightbox State
  const [toggler, setToggler] = useState(false);

  const videos = Array.isArray(pageData?.videos) ? pageData.videos : [];
  const videoSources = useMemo(
    () => videos.map((item: any) => item?.video?.url).filter(Boolean),
    [videos],
  );
  const videoTypes = useMemo(() => videos.map(() => "video"), [videos]);

  const updateThumbStates = (progress: number) => {
    const thumbs = wrapper.current?.querySelectorAll(
      ".image-thumb > .slide-thumb",
    );
    if (!thumbs?.length) {
      return;
    }

    // When the whole animation finishes, remove active from all thumbs.
    if (progress >= 0.999) {
      thumbs.forEach((thumb) => {
        thumb.classList.remove("active-thumb");
        thumb.classList.add("opacity-50");
      });
      return;
    }

    const total = thumbs.length;
    const activeIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(progress * total)),
    );

    thumbs.forEach((thumb, index) => {
      const isActive = index === activeIndex;
      thumb.classList.toggle("active-thumb", isActive);
      thumb.classList.toggle("opacity-50", !isActive);
    });
  };

  // Section Animation
  useGSAP(
    () => {
      const slider = wrapper.current?.querySelector(".mirror-slider");
      const slides = slider?.querySelectorAll(".image-slider>.singel-slide");
      // Slider Timeline
      const imageTimeline = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
          onUpdate: (self) => {
            updateThumbStates(self.progress);
          },
        },
      });
      if (slides) {
        slides?.forEach((element, index) => {
          if (index !== 0) {
            imageTimeline.to(element, {
              duration: 1,
              clipPath: "inset(0%)",
              ease: "power1.out",
            });
          }
        });
      }

      imageTimelineRef.current = imageTimeline;
      updateThumbStates(0);

      return () => {
        imageTimelineRef.current = null;
      };
    },
    { scope: wrapper, dependencies: [pathname, pageData] },
  );

  const handleThumbClick = (index: number) => {
    const timeline = imageTimelineRef.current;
    const totalSlides = pageData?.images?.length || 0;

    if (!timeline || totalSlides <= 1) {
      return;
    }

    const maxIndex = Math.max(totalSlides - 1, 1);
    const targetProgress = Math.min(1, Math.max(0, index / maxIndex));

    // Jump animation to the selected image segment.
    timeline.progress(targetProgress);
    updateThumbStates(targetProgress);

    // Sync page scroll to timeline progress so scroll position and animation match.
    const scrollTrigger = timeline.scrollTrigger;
    if (!scrollTrigger) {
      return;
    }

    const targetScroll =
      scrollTrigger.start +
      (scrollTrigger.end - scrollTrigger.start) * targetProgress;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(targetScroll, true);
      return;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

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
      className={`${props.extraClass} lg:h-screen bg-black flex items-center relative z-20`}
    >
      <div className="mirror-bg absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
        <Image
          className="bg-image w-full object-cover object-center h-full"
          src={BgImage?.src}
          width="1920"
          height="1080"
          blurDataURL={BgImage?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
      </div>
      <div className="mirror-section-wrapper w-full h-full relative z-30 pt-[8vh] pb-[8vh] lg:pt-[15vh] lg:pb-[10vh] px-[10vw] flex flex-col gap-y-6 sm:gap-y-[5vh] lg:gap-y-0">
        <div className="section-title">
          <h2 className="text-[#F4EDDD] text-[60px] sm:text-[80px] lg:text-[101px] leading-[76%]">
            {pageData?.section_title}
          </h2>
        </div>
        <div className="mirror-slider flex items-end justify-center relative">
          <div className="mirror-slider-mobile block lg:hidden w-full">
            <Swiper
              className="w-full h-auto"
              ref={swiperRef}
              slidesPerView={1}
              loop={true}
            >
              {pageData.images.length !== 0 &&
                pageData.images?.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-full h-120 lg:h-[50vh]">
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={
                            item?.sizes?.medium_large ||
                            item.image?.sizes?.large ||
                            item.image?.sizes?.medium ||
                            item.image?.url ||
                            item.image?.src
                          }
                          width={360}
                          height={500}
                          alt="Community Image"
                          blurDataURL={CreateShimmerDataUrl(360, 500)}
                          placeholder="blur"
                          loading="lazy"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div className="pagination mt-5 flex gap-2 sm:gap-3">
              {pageData.images?.length !== 0 &&
                pageData.images?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        swiperRef.current?.swiper.slideTo(index);
                      }}
                      className={`slide-thumb thumb-image-${index} w-12.5 h-12.5 sm:w-15 sm:h-15 transition-none cursor-pointer`}
                    >
                      <Image
                        className="thumb-image w-full object-cover object-center h-full"
                        src={item?.sizes?.thumbnail || item?.src}
                        width="40"
                        height="40"
                        blurDataURL={CreateShimmerDataUrl(40, 40)}
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Mirrors Thumb"
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="image-slider w-100 h-120 max-w-full lg:w-[28vw] lg:h-[70vh] relative hidden lg:block">
            {pageData.images?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    clipPath: `${index === 0 ? "inset(0%)" : "inset(50%)"}`,
                    zIndex: `1${index}`,
                  }}
                  className="singel-slide w-full h-full absolute top-0 left-0 transition-none"
                >
                  <Image
                    className="slide-image w-full object-cover object-center h-full"
                    src={item?.sizes?.large || item?.src}
                    width="540"
                    height="660"
                    blurDataURL={CreateShimmerDataUrl(540, 660)}
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Mirrors"
                  />
                </div>
              );
            })}
          </div>
          {pageData?.videos?.length > 0 && (
            <div className="video-gallery absolute bottom-[0%] right-0 lg:right-20 z-20 -mb-25  sm:-mb-35 lg:mb-0">
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
                className="video-popup cursor-pointer w-25 h-auto flex items-center justify-center flex-col group text-[16px] sm:text-[18px]"
              >
                <div className="icon w-15 lg:w-full h-auto flex items-center justify-center relative">
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
          <div className="image-thumb absolute bottom-0 right-0 lg:flex flex-col gap-y-3 hidden">
            {pageData.images?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => handleThumbClick(index)}
                  className={`slide-thumb thumb-image-${index} w-15 h-15 transition-none ${index !== 0 && "opacity-50"} cursor-pointer`}
                >
                  <Image
                    className="thumb-image w-full object-cover object-center h-full"
                    src={item?.sizes?.thumbnail || item?.src}
                    width="60"
                    height="60"
                    blurDataURL={CreateShimmerDataUrl(60, 60)}
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Mirrors Thumb"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {nextPost && (
          <div className="mirror-next relative lg:absolute lg:left-[4vw] lg:top-1/2 mt-10">
            <Link
              data-id={activeMusicItem}
              className="group flex flex-row-reverse gap-4 lg:gap-0 lg:flex-col items-center lg:items-start justify-start"
              href={"/the-circle-of-the-year/" + nextPost?.slug}
              onClick={handleLinkClick}
            >
              <span className="icon w-5.25 transition-all duration-300 ease-in-out group-hover:-translate-x-6">
                <ArrowLeftIcon />
              </span>
              <span className="title text-[24px] sm:text-[36px] text-[#F4EDDD] font-thin">
                {parse(nextPost?.title.rendered || "")}
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
