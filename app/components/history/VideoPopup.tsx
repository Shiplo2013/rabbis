"use client";
import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import PauseIcon2 from "@/app/assets/icons/PauseIcon2";
import PlayIcon from "@/app/assets/icons/PlayIcon";
import { useEffect, useRef, useState } from "react";
import thumb from "../../assets/images/video-thumb2.jpg";

interface VideoPopupProps {
  videoControl: {
    isVideoPopupOpen: boolean;
    setIsVideoPopupOpen: (value: boolean) => void;
  };
}

export default function VideoPopup(props: VideoPopupProps) {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // Data
  const video = "http://dovp7.sg-host.com/wp-content/uploads/2026/03/video.mp4";
  const videoData = {
    poster: thumb.src,
    link: video,
  };

  // Play Video when Popup Opens
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  // Pause Video when Popup Closes
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  // Effect to Play/Pause Video based on Popup State
  useEffect(() => {
    if (props.videoControl.isVideoPopupOpen) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [props.videoControl.isVideoPopupOpen]);

  return (
    <div className="video-popup fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-999 backdrop-blur-sm opacity-0 invisible">
      <div
        onClick={() => props.videoControl.setIsVideoPopupOpen(false)}
        className="close-video w-15 h-15 p-3 border border-white rounded-full flex items-center justify-center absolute top-5 right-5 cursor-pointer z-50"
      >
        <CloseIcon2 />
      </div>
      <div className="video-popup-wrapper group w-103 h-150 relative">
        <video
          width="100%"
          poster={videoData.poster}
          className="w-full h-full object-cover object-center"
          ref={videoRef}
        >
          <source src={videoData.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {videoPlaying ? (
          <button
            onClick={() => pauseVideo()}
            className="pause-button absolute w-30 top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ml-3 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <PauseIcon2 />
          </button>
        ) : (
          <button
            onClick={() => playVideo()}
            className={`play-button absolute w-30 top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ml-3 cursor-pointer opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          >
            <PlayIcon />
          </button>
        )}
      </div>
    </div>
  );
}
