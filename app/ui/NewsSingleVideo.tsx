"use client";
import { useRef, useState } from "react";
import PauseIconVisible from "../assets/icons/PauseIconVisible";
import PlayIconVisible from "../assets/icons/PlayIconVisible";

interface NewsSingleVideoProps {
  data: string; // Assuming data is a JSON string containing video information
}

export default function NewsSingleVideo({ data }: NewsSingleVideoProps) {
  const item = JSON.parse(data); // Parse the JSON string to get video details
  const videoRef = useRef<HTMLDivElement>(null);
  // Is video playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <div className="post-video w-full h-full relative group" ref={videoRef}>
      <video
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
        className="w-full h-full object-cover object-center z-10"
        src={item.src}
        poster={item.poster}
        preload="metadata"
      />
      <button
        onClick={() => {
          if (videoRef.current) {
            const videoElement = videoRef.current.querySelector("video");
            if (videoElement) {
              if (isVideoPlaying) {
                videoElement.pause();
              } else {
                videoElement.play();
              }
            }
          }
        }}
        className={`play-button w-20 h-20 bg-black group-hover:opacity-50 hover:opacity-100 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50 ${isVideoPlaying ? "opacity-0" : "opacity-50"} transition-opacity duration-300`}
      >
        <div
          className={`play-icon w-6 h-auto ${isVideoPlaying ? "hidden" : ""}`}
        >
          <PlayIconVisible />
        </div>
        <div
          className={`pause-icon w-6 h-auto ${isVideoPlaying ? "" : "hidden"}`}
        >
          <PauseIconVisible />
        </div>
      </button>
    </div>
  );
}
