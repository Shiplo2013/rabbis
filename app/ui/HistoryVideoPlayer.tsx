import { useEffect, useRef, useState } from "react";
import PauseIconVisible from "../assets/icons/PauseIconVisible";
import PlayIconVisible from "../assets/icons/PlayIconVisible";

interface ChildProps {
  data: any;
  isOpen: boolean;
}

export default function HistoryVideoPlayer(props: ChildProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play Pause Video
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying && props.isOpen) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying, props.isOpen]);

  return (
    <>
      <video
        ref={videoRef}
        width="100%"
        className="w-full h-full object-cover object-center"
        controlsList="nodownload"
      >
        <source src={props?.data?.video?.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`absolute top-1/2 left-1/2 w-12.5 h-12.5 p-2 flex items-center justify-center bg-[rgba(0,0,0,0.5)] hover:bg-black rounded-full ${isPlaying && "opacity-0 invisible group-hover:opacity-100 group-hover:visible"} cursor-pointer -translate-1/2 transition-all`}
      >
        <span className="block w-1/2 h-auto">
          {isPlaying ? <PauseIconVisible /> : <PlayIconVisible />}
        </span>
      </button>
    </>
  );
}
