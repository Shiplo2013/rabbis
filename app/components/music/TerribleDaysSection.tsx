"use client";
import parse from "html-react-parser";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import TerribleBG from "../../assets/images/terrible-bg.jpg";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  setAudioPopup: (value: boolean) => void;
  data: string;
}

export default function TerribleDaysSection(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const background = useRef<HTMLDivElement>(null);

  const pageData = useMemo(() => JSON.parse(props.data), [props.data]);
  const parsedMusicTitle = useMemo(
    () => parse(pageData?.musics?.title || ""),
    [pageData?.musics?.title],
  );
  const parsedContentText1 = useMemo(
    () => parse(pageData?.content?.text1 || ""),
    [pageData?.content?.text1],
  );
  const parsedContentText2 = useMemo(
    () => parse(pageData?.content?.text2 || ""),
    [pageData?.content?.text2],
  );

  // Album click
  const handleAlbumClick = () => {
    props.setAudioPopup(true);
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
          <div className="float-image1 absolute top-[24.5%] left-[22.2%] w-36.75 h-55.25 -rotate-[7.97deg]">
            <Image
              className="float-image w-full object-contain object-center h-full"
              src={pageData?.intro?.floatImage1?.src}
              width="147"
              height="221"
              blurDataURL={pageData?.intro?.floatImage1?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
          <div
            dir="ltr"
            className="intro-wrapper max-w-150 text-center flex flex-col gap-y-[3.6vh] relative z-30"
          >
            <h2 className="title text-[128px] leading-[80%] overflow-hidden">
              {pageData?.intro.title}
            </h2>
            <h5 className="subtitle text-[35px] leading-[90%] overflow-hidden">
              {pageData?.intro.text}
            </h5>
          </div>
          <div className="float-image2 absolute top-[19%] right-[27%] w-39.5 h-59.5 rotate-[7.97deg]">
            <Image
              className="float-image w-full object-contain object-center h-full"
              src={pageData?.intro?.floatImage2?.src}
              width="158"
              height="238"
              blurDataURL={pageData?.intro?.floatImage2?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
        </div>
        <div className="terrible-content w-[77vw] h-full flex items-center justify-center relative p-[8vh_5vw]">
          <div className="content-wrapper relative flex gap-x-[4.6vw]">
            <div dir="ltr" className="content-right w-1/2">
              <h3 className="title text-[35px] leading-[85%] text-right">
                {pageData?.content?.title}
              </h3>
              <div className="text text-[21px] leading-[150%]">
                {parsedContentText1}
              </div>
            </div>
            <div
              dir="ltr"
              className="content-left w-1/2 text-[21px] leading-[150%] text-right"
            >
              <div className="text">{parsedContentText2}</div>
              <Link className="text-black font-bold mt-2 block" href={"/"}>
                קרא עוד...
              </Link>
            </div>
            <div className="float-image absolute left-0 bottom-0 w-62.25 h-39.75 -ml-22.5 mb-[11%]">
              <Image
                className="float-image w-full object-contain object-center h-full"
                src={pageData?.content?.floatImage?.src}
                width="249"
                height="159"
                blurDataURL={pageData?.content?.floatImage?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt="Turntable"
              />
            </div>
          </div>
        </div>
        <div className="terrible-musics w-[60vw] mr-[10vw] h-full flex flex-col items-center justify-start gap-y-[17.65vh] relative p-[15vh_5vw]">
          <div className="music-title w-full">
            <h2 className="text-[#344128] text-[101px] leading-[76%]">
              {parsedMusicTitle}
            </h2>
          </div>
          <div className="music-albums flex gap-x-[3.85vw] my-auto w-full">
            {pageData?.musics?.albums?.map(
              (
                item: { title: string; icon: StaticImageData },
                index: number,
              ) => (
                <div
                  key={index}
                  onClick={handleAlbumClick}
                  className="music-album group flex flex-col gap-y-3 cursor-pointer"
                >
                  <div className="icon w-60.25 h-49.25 group-hover:scale-105 transition-all duration-200 ease-in-out">
                    <Image
                      className="bg-image w-full object-cover object-center h-full"
                      src={item?.icon?.src}
                      width="241"
                      height="197"
                      blurDataURL={item?.icon?.blurDataURL}
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Turntable"
                    />
                  </div>
                  <div className="title">
                    <h4 className="text-[45px] leading-[70%] text-[#C3A13F] text-center">
                      {item.title}
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
