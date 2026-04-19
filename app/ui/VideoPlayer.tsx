import { useMemo, useRef } from "react";

interface ChildProps {
  extraClass: string;
  data: string | VideoSource[];
}

interface VideoSource {
  poster?: string | { src?: string };
  link?: string;
}

export default function VideoPlayer(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const videoData = useMemo<VideoSource[]>(() => {
    if (Array.isArray(props.data)) {
      return props.data;
    }

    try {
      const parsedData = JSON.parse(props.data);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      return [];
    }
  }, [props.data]);

  const firstVideo = videoData[0];
  const poster =
    typeof firstVideo?.poster === "string"
      ? firstVideo.poster
      : firstVideo?.poster?.src || "";
  const link = firstVideo?.link || "";

  if (!link) {
    return null;
  }

  return (
    <div
      ref={wrapper}
      dir="ltr"
      className={`${props.extraClass} video-player bg-black flex items-center relative z-20`}
    >
      <video
        width="100%"
        poster={poster}
        className="w-full h-full object-cover object-center"
      >
        <source src={link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
