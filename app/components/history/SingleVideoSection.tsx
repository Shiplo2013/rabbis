import GetRightPosition from "@/app/ui/GetRightPosition";
import ThemeButton2 from "@/app/ui/ThemeButton2";
import VideoPlayer from "@/app/ui/VideoPlayer";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import PlusIcon from "../../assets/icons/PlusIcon";
import thumb from "../../assets/images/video-section.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function SingleVideoSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const videoWrap = useRef<HTMLDivElement>(null);
  const videoButton = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Data
  const video = "http://dovp7.sg-host.com/wp-content/uploads/2026/03/video.mp4";
  const videoData = [
    {
      poster: thumb,
      link: video,
    },
  ];
  // Section Animation
  useGSAP(
    () => {
      const video = wrapper.current?.querySelector(".section-overlay");
      if (video) {
        gsap.to(video, {
          duration: 2,
          translateY: "-100%",
          ease: "expo.inOut",
          delay: -0.5,
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(video) -
                window.innerWidth * 0.3
              );
            },
            toggleActions: "restart pause play reverse",
          },
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  // video element selector
  const videoElement = wrapper.current?.querySelector("video");
  const videoOverlay = wrapper.current?.querySelector(".video-overlay");
  const buttonIcon = videoButton.current?.querySelector(".button-icon>svg");
  // video button handler
  const handleButtonClick = () => {
    if (videoElement) {
      if (videoElement.paused) {
        if (videoOverlay) {
          gsap.to(videoWrap.current, {
            duration: 0.5,
            width: "120%",
            right: "-10%",
            ease: "expo.inOut",
          });
          gsap.to(videoOverlay, {
            duration: 0.4,
            opacity: 0,
            ease: "none",
            onComplete: () => {
              videoElement.play();
            },
          });
          gsap.to(videoButton.current, {
            duration: 0.5,
            y: "45vh",
            scale: 0.5,
            delay: 0,
            ease: "easeInOut",
          });
          if (buttonIcon) {
            gsap.to(buttonIcon, {
              duration: 0.5,
              delay: 0.5,
              rotate: -45,
              ease: "easeInOut",
            });
          }
        }
      } else {
        if (videoOverlay) {
          gsap.to(videoWrap.current, {
            duration: 0.5,
            width: "100%",
            right: "0%",
            ease: "expo.inOut",
          });
          gsap.to(videoOverlay, {
            duration: 0.5,
            opacity: 0.4,
            ease: "none",
            onComplete: () => {
              videoElement.pause();
            },
          });
          gsap.to(videoButton.current, {
            duration: 1,
            y: "0vh",
            scale: 1,
            delay: 0,
            ease: "expo.inOut",
          });
          if (buttonIcon) {
            gsap.to(buttonIcon, {
              duration: 1,
              rotate: 0,
              delay: 0.5,
              ease: "easeInOut",
            });
          }
        }
      }
    }
  };
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="video-wrapper w-full h-full relative">
        <div ref={videoWrap} className="video h-full w-full relative z-10">
          <VideoPlayer extraClass="w-full h-full" data={videoData} />
          <div
            onClick={handleButtonClick}
            className="video-overlay absolute top-0 left-0 w-full h-full bg-black z-40 opacity-40 cursor-pointer"
          ></div>
        </div>
        <div
          ref={videoButton}
          onClick={handleButtonClick}
          className="absolute top-1/2 left-1/2 z-30 -translate-1/2 cursor-pointer"
        >
          <ThemeButton2
            extraClass="w-29.25 h-29.25 flex items-center justify-center border-2 border-[#C3A13F] group"
            bgColor="bg-[#0F0F0F85]"
            hoverBgColor="bg-[#000000]"
            svgIcon={<PlusIcon />}
            svgIconClass={
              "group-hover:skew-0 transition-all duration-500 group-hover:rotate-180"
            }
          />
        </div>
        <div className="section-overlay absolute top-0 left-0 w-full h-full bg-black z-40 will-change-transform"></div>
      </div>
    </section>
  );
}
