import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "@/app/ui/plugins";
import Image from "next/image";
import { useRef } from "react";
import HeadBG from "../../assets/images/head-bg.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GallerySectionProps {
  activeTab?: number;
  setActiveTab?: (index: number) => void;
  tabGalleryData?: any;
  tabData?: any;
  tabDataHead?: any;
}

export default function GallerySection(props: GallerySectionProps) {
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryHead = useRef<HTMLDivElement>(null);
  const activeTabIndex = props.activeTab ?? 0;
  const setActiveTab = props.setActiveTab ?? (() => {});

  // UseGSAP for gallery animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      const scurbScale = 2;

      // Sticky Section
      if (!gallerySectionRef.current) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: "top top",
          end: () =>
            "+=" + (galleryRef.current ? galleryRef.current.offsetHeight : 0),
          scrub: scurbScale,
          pin: true,
        },
      });

      if (galleryRef.current) {
        gsap.set(galleryRef.current, { y: "40vh" });
        timeline.to(galleryRef.current, {
          y: () => {
            return galleryRef.current
              ? -galleryRef.current.offsetHeight + window.innerHeight * 0.7
              : 0;
          },
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top top+=" + window.innerHeight * 0.5,
            end: () =>
              "+=" + (galleryRef.current ? galleryRef.current.offsetHeight : 0),
            scrub: 2,
          },
        });
      }
      animations.push(timeline);

      // Gallery Head Animation
      if (galleryHead.current) {
        gsap.set(galleryHead.current, { x: "10vw", opacity: 0 });
        const headTween = gsap.to(galleryHead.current, {
          x: "0vw",
          opacity: 1,
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: galleryHead.current,
            start: "top center",
            scrub: false,
            toggleActions: "restart pause play reverse",
          },
        });
        animations.push(headTween);
      }

      // Gallery Images
      const GalleryImages =
        galleryRef.current?.querySelectorAll(".single-gallery");
      // Contents
      if (GalleryImages) {
        let top = 0;
        GalleryImages.forEach((item, index) => {
          const orientation =
            props.tabGalleryData?.[activeTabIndex]?.images?.[index]
              ?.orientation;
          top +=
            orientation === "landscape"
              ? window.innerHeight * 0.5
              : window.innerHeight * 0.4;
          // Item BG Animation
          const image = item.querySelector(".single-gallery-image");
          if (image) {
            // Banner Background
            gsap.set(image, { scale: 1.2, y: "10vw" });
            const imageTween = gsap.to(image, {
              y: "-10vw",
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top top+=" + window.innerHeight * 1,
                end: () => {
                  return "+=" + window.innerHeight * 2.5;
                },
                scrub: 2,
              },
            });
            animations.push(imageTween);
          }
        });
      }

      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    {
      scope: gallerySectionRef,
      dependencies: [
        props.activeTab,
        props.tabData,
        props.tabDataHead,
        props.tabGalleryData,
        props.tabData?.gallery?.length,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={gallerySectionRef}
      className={`h-screen w-screen bg-black flex items-center relative z-20 overflow-hidden`}
    >
      <div className="tab-gallery flex items-start h-screen ml-auto mr-auto relative will-change-transform">
        <div
          ref={galleryRef}
          id="gallery"
          className="gallery-wrapper w-full h-auto flex items-center flex-col will-change-transform justify-center relative"
        >
          {props.tabData &&
            props.tabData?.gallery?.map((item: any, index: number) => {
              const orientation =
                props.tabGalleryData?.[activeTabIndex]?.images?.[index]
                  ?.orientation;
              if (orientation === "landscape") {
                return (
                  <div
                    key={index}
                    className={`single-gallery will-change-transform w-[32vw] h-[40vh] overflow-hidden ${orientation}`}
                  >
                    <div
                      className={`single-gallery-image w-[50vw] h-[70vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                    >
                      <Image
                        className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                        src={item?.sizes?.large || item?.url}
                        width={item?.sizes?.large?.width || 650}
                        height={item?.sizes?.large?.height || 400}
                        blurDataURL={CreateShimmerDataUrl(
                          item?.sizes?.large?.width || 650,
                          item?.sizes?.large?.height || 400,
                        )}
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
                    className={`single-gallery will-change-transform w-[22vw] h-[50vh] overflow-hidden ${orientation}`}
                  >
                    <div
                      className={`single-gallery-image w-[60vw] h-[80vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                    >
                      <Image
                        className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                        src={item?.sizes?.large || item?.url}
                        width={item?.sizes?.large?.width || 650}
                        height={item?.sizes?.large?.height || 650}
                        blurDataURL={CreateShimmerDataUrl(
                          item?.sizes?.large?.width || 650,
                          item?.sizes?.large?.height || 650,
                        )}
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Gallery Image"
                      />
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div
        ref={galleryHead}
        className="tabs-head min-w-52 w-52 h-screen flex flex-col items-center justify-center gap-y-6 py-10 z-20 border-r-5 border-l-5 border-[#C3A13F] overflow-hidden absolute top-0 right-15"
      >
        <div className="tab-head-bg absolute top-0 left-1/2 z-10 w-screen h-screen -translate-x-1/2">
          <Image
            src={HeadBG?.src}
            width={210}
            height={window.innerHeight}
            blurDataURL={CreateShimmerDataUrl(210, window.innerHeight)}
            placeholder={"blur"}
            loading="lazy"
            alt="Head Background"
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="tab-head-wrapper flex flex-col gap-y-5 relative z-30">
          {props.tabDataHead &&
            props.tabDataHead.map((tab: any, index: number) => (
              <div
                key={index}
                className={`tab-head-item group flex text-[24px] leading-[1.2em] relative cursor-pointer ${props.activeTab === index ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(index);
                }}
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
    </section>
  );
}
