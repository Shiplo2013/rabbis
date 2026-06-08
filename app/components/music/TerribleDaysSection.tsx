"use client";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import { useRef } from "react";
import SimpleBar from "simplebar-react";
import AlbumIcon1 from "../../assets/images/album-icon1.png";
import AlbumIcon2 from "../../assets/images/album-icon2.png";
import FloatImageBorder from "../../assets/images/float-image3.png";
import TerribleBG from "../../assets/images/terrible-bg.jpg";
import CreateShimmerDataUrl from "../../ui/CreateShimmerDataUrl";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  setAudioPopup: (value: boolean) => void;
  data: any;
  panel: any;
  activeMusicItem: number;
  setActiveMusicItem: (value: number) => void;
  setActiveMusicFolder: (value: number) => void;
  activeTab: number;
  setActiveTab: (value: number) => void;
}

export default function TerribleDaysSection(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const introTitle = useRef<HTMLHeadingElement>(null);
  const introSubtitle = useRef<HTMLHeadingElement>(null);
  const floatImage1 = useRef<HTMLDivElement>(null);
  const floatImage2 = useRef<HTMLDivElement>(null);
  // Pathname
  const pathname = usePathname();
  // Page Data
  const pageData = props.data || {};
  // Timeline Selector
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section animation
  useGSAP(
    () => {
      if (typeof window === "undefined" || !wrapper.current) {
        return;
      }

      const setupAnimation = () => {
        document.fonts.ready.then(() => {
          if (floatImage1.current) {
            gsap.to(floatImage1.current, {
              x: "10vw",
              ease: "none",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(floatImage1.current) -
                    window.innerWidth * 0.5
                  );
                },
                end: () => {
                  return "+=" + window.innerWidth * 1.5;
                },
                scrub: 2,
              },
            });
          }
          if (floatImage2.current) {
            gsap.to(floatImage2.current, {
              x: "-10vw",
              ease: "none",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(floatImage2.current) -
                    window.innerWidth * 0.5
                  );
                },
                end: () => {
                  return "+=" + window.innerWidth * 1.5;
                },
                scrub: 2,
              },
            });
          }

          ScrollTrigger.refresh();
        });
      };

      if (document.readyState === "complete") {
        setupAnimation();
        return;
      }

      const onLoad = () => {
        setupAnimation();
      };

      window.addEventListener("load", onLoad, { once: true });

      return () => {
        window.removeEventListener("load", onLoad);
      };
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  // Album click
  const handleAlbumClick = (index: number) => {
    props.setAudioPopup(true);
    props.setActiveMusicFolder(index);
    props.setActiveTab(0);
  };

  // Animations
  useGSAP(
    () => {
      // Banner Background
      gsap.set(background.current, { scale: 1.2, x: "20vw" });
      gsap.to(background.current, {
        x: "-50vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          end: () => {
            return "+=" + window.innerWidth * 3;
          },
          scrub: 2,
        },
      });
    },
    { scope: wrapper },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-[#FAE7C8] flex items-center relative z-20 overflow-hidden`}
    >
      <div
        ref={background}
        style={{
          backgroundImage: `url(${TerribleBG.src})`,
        }}
        className={`terrible-section-bg absolute top-0 right-0 w-full h-full z-10 bg-contain bg-repeat-x`}
      ></div>
      <div className="terrible-wrapper w-full h-full relative z-40 text-[#344128] flex">
        <div className="terrible-intro w-[75vw] h-full flex items-center justify-center relative p-[8vh_5vw]">
          <div
            ref={floatImage1}
            className="float-image1 absolute top-[24.5%] left-[22.2%] w-36.75 h-55.25 -rotate-[7.97deg]"
          >
            <Image
              className="float-image w-full object-contain object-center h-full"
              src={
                pageData?.acf?.introduction?.album_image_1?.url ||
                pageData?.acf?.introduction?.album_image_1?.src
              }
              width="147"
              height="221"
              blurDataURL={CreateShimmerDataUrl(147, 221)}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
          <div className="intro-wrapper max-w-150 text-center flex flex-col gap-y-[3.6vh] relative z-30">
            <h2
              ref={introTitle}
              className="title text-[128px] leading-[80%] overflow-hidden"
            >
              {parse(pageData?.acf?.introduction?.album_title || "")}
            </h2>
            <h5
              ref={introSubtitle}
              className="subtitle text-[35px] leading-[90%] overflow-hidden"
            >
              {parse(pageData?.acf?.introduction?.album_subtitle || "")}
            </h5>
          </div>
          <div
            ref={floatImage2}
            className="float-image2 absolute top-[19%] right-[27%] w-39.5 h-59.5 rotate-[7.97deg]"
          >
            <Image
              className="float-image w-full object-contain object-center h-full"
              src={
                pageData?.acf?.introduction?.album_image_2?.url ||
                pageData?.acf?.introduction?.album_image_2?.src
              }
              width="158"
              height="238"
              blurDataURL={CreateShimmerDataUrl(158, 238)}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
        </div>
        <div className="terrible-content w-[77vw] h-full flex items-center justify-center relative p-[8vh_5vw]">
          <div className="content-wrapper scroll-bar-content relative flex gap-x-[4.6vw] w-full items-start">
            <div className="content-right w-full">
              <SimpleBar
                style={{
                  maxHeight: "70vh",
                  paddingRight: 20,
                  marginRight: -20,
                }}
                autoHide={true}
              >
                <h3 className="title text-[35px] leading-[85%] text-right">
                  {parse(pageData?.acf?.content_section?.title || "")}
                </h3>
                <div className="text text-[21px] leading-[150%]">
                  {parse(pageData?.acf?.content_section?.text_1 || "")}
                </div>
              </SimpleBar>
            </div>
            <div className="content-left w-full text-[21px] leading-[150%] text-right relative max-h-[60vh]">
              <SimpleBar
                style={{
                  maxHeight: "60vh",
                  paddingRight: 20,
                  marginRight: -20,
                }}
                autoHide={false}
              >
                <div className="text">
                  {parse(pageData?.acf?.content_section?.text_2 || "")}
                </div>
              </SimpleBar>
              <div className="float-image absolute left-0 bottom-0 w-62.25 h-39.75 -ml-22.5 -mb-10">
                <Image
                  className="float-image w-full object-contain object-center h-full"
                  src={FloatImageBorder?.src}
                  width="249"
                  height="159"
                  blurDataURL={CreateShimmerDataUrl(249, 159)}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Turntable"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="terrible-musics w-[60vw] mr-[10vw] h-full flex flex-col items-center justify-start gap-y-[17.65vh] relative p-[15vh_5vw]">
          <div className="music-title w-full">
            <h2 className="text-[#344128] text-[101px] leading-[76%]">
              {parse(pageData?.acf?.music_albums?.section_title || "")}
            </h2>
          </div>
          <div className="music-albums flex gap-x-[3.85vw] my-auto w-full">
            {pageData?.acf?.music_albums?.albums?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handleAlbumClick(index)}
                  className="music-album group flex flex-col gap-y-3 cursor-pointer max-w-[12.5vw] w-full items-center justify-top"
                >
                  <div className="icon w-[12.5vw] h-auto relative">
                    <div className="icon-default w-full h-full relative group-hover:opacity-0 group-hover:scale-90 transition-all duration-200 ease-in-out">
                      <Image
                        className="bg-image w-full object-cover object-center h-full"
                        src={AlbumIcon2.src || item?.album_icon?.url}
                        width="241"
                        height="197"
                        blurDataURL={
                          AlbumIcon2.blurDataURL ||
                          CreateShimmerDataUrl(241, 197)
                        }
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Turntable"
                      />
                    </div>
                    <div className="icon-hover w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 ease-in-out">
                      <Image
                        className="bg-image w-full object-cover object-center h-full"
                        src={AlbumIcon1.src || item?.album_icon?.url}
                        width="241"
                        height="197"
                        blurDataURL={
                          AlbumIcon1.blurDataURL ||
                          CreateShimmerDataUrl(241, 197)
                        }
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Turntable"
                      />
                    </div>
                  </div>
                  <div className="title">
                    <h4 className="text-[45px] leading-[70%] text-[#C3A13F] text-center">
                      {item.album_title}
                    </h4>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
