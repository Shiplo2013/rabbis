import { useRef } from "react";

interface ChildProps {
  extraClass: string;
  data: VideoSource;
}

interface VideoSource {
  poster?: any;
  video?: any;
}

export default function VideoPlayer(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const videoData = props.data as VideoSource;

  return (
    <div
      ref={wrapper}
      dir="ltr"
      className={`${props.extraClass} video-player bg-black flex items-center relative z-20`}
    >
      <video
        width="100%"
        poster={videoData?.poster?.url || ""}
        className="w-full h-full object-cover object-center"
      >
        <source src={videoData?.video?.url || ""} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
