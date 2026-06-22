import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import PixelIcon1 from "../assets/icons/PixelIcon1";
import PixelIcon2 from "../assets/icons/PixelIcon2";
import PixelIcon3 from "../assets/icons/PixelIcon3";
import PixelIcon4 from "../assets/icons/PixelIcon4";
import { gsap, useGSAP } from "../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  data: { poster: any; source: any };
}

const getMediaUrl = (value: any) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.url || value.src || value?.sizes?.medium_large || "";
};

export default function DonationVideo(props: ChildProps) {
  // Section Data
  const videoData = props.data || {};
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { contextSafe } = useGSAP();
  const [videoPlay, setVideoPlay] = useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const posterUrl = getMediaUrl(videoData?.poster);
  const sourceUrl = getMediaUrl(videoData?.source);

  useEffect(() => {
    const wrapperElement = wrapper.current;

    if (!wrapperElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(wrapperElement);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !shouldLoadVideo) return;

    // Ensure autoplay starts as soon as the lazy source is attached.
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Ignore autoplay blocking errors from strict browser policies.
      });
    }
  }, [videoPlay, shouldLoadVideo]);
  // Play/Pause Video on click
  const handleClickEvent = (e: any) => {
    const video = e.currentTarget.querySelector("video");
    const videoMask = e.currentTarget.querySelector(".video-bg-mask");
    const videoBorder = e.currentTarget.querySelector(".video-pixel-border");
    setVideoPlay(!videoPlay);
    if (videoPlay) {
      videoMask.style.display = "none";
      videoBorder.style.display = "none";
      video.currentTime = 0;
      video.muted = false;
      gsap.to(video, {
        volume: 1,
        duration: 1,
        delay: 0,
      });
    } else {
      videoMask.style.display = "block";
      videoBorder.style.display = "block";
      video.muted = true;
    }
  };
  // Cursor Follower Function
  const handleMouseMove = contextSafe((e: ReactMouseEvent<HTMLDivElement>) => {
    //const yskale = -(e.screenY / 100) * 1;
    //console.log(e.clientX, e.clientY)
    const playButton = document.querySelector("#main .play-button");
    if (playButton) {
      gsap.to(playButton, {
        x: e.clientX,
        y: e.clientY,
        delay: 0,
        duration: 0.2,
      });
    }
  });
  // On Mouse Enter
  const handleMouseEnter = contextSafe(() => {
    const playButton = document.querySelector("#main .play-button");
    if (playButton) {
      gsap.to(playButton, {
        opacity: 1,
        rotateX: 0,
        transformOrigin: "top",
        delay: 0,
      });
    }
  });
  // On Mouse Leave
  const handleMouseLeave = contextSafe(() => {
    const playButton = document.querySelector("#main .play-button");
    if (playButton) {
      gsap.to(playButton, {
        opacity: 0,
        rotateX: 90,
        transformOrigin: "center",
        delay: 0,
      });
    }
  });

  return (
    <div
      ref={wrapper}
      onClick={(e) => handleClickEvent(e)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dir="ltr"
      className={`${props.extraClass} group video-player bg-black flex items-center relative z-20 cursor-pointer`}
    >
      <video
        ref={videoRef}
        width="100%"
        poster={posterUrl}
        className="w-full h-full object-cover object-center will-change-transform backface-hidden"
        autoPlay={shouldLoadVideo}
        playsInline
        muted
        loop={true}
        preload={shouldLoadVideo ? "metadata" : "none"}
      >
        {shouldLoadVideo && sourceUrl ? (
          <source src={sourceUrl} type="video/mp4" />
        ) : null}
        Your browser does not support the video tag.
      </video>
      <div className="video-bg-mask absolute top-0 left-0 w-full h-full bg-black z-30 will-change-transform opacity-40 group-hover:opacity-20 transition-all duration-500 ease-[cubic-bezier(0.75, 0, 0.25, 1)] backface-hidden pointer-events-none"></div>
      <div className="video-pixel-border absolute top-0 left-0 w-full h-full z-40 pointer-events-none">
        <div className="pixel-border-1 absolute top-4 right-4 group-hover:top-2 group-hover:right-2 transition-all duration-500 ease-[cubic-bezier(0.75, 0, 0.25, 1)]">
          <PixelIcon1 />
        </div>
        <div className="pixel-border-2 absolute right-4 bottom-4 group-hover:right-2 group-hover:bottom-2 transition-all duration-500 ease-[cubic-bezier(0.75, 0, 0.25, 1)]">
          <PixelIcon2 />
        </div>
        <div className="pixel-border-3 absolute left-4 bottom-4 group-hover:left-2 group-hover:bottom-2 transition-all duration-500 ease-[cubic-bezier(0.75, 0, 0.25, 1)]">
          <PixelIcon3 />
        </div>
        <div className="pixel-border-4 absolute left-4 top-4 group-hover:left-2 group-hover:top-2 transition-all duration-500 ease-[cubic-bezier(0.75, 0, 0.25, 1)]">
          <PixelIcon4 />
        </div>
      </div>
    </div>
  );
}
