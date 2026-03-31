import { usePathname } from "next/navigation";
import { useRef } from "react";

interface ChildProps {
  extraClass: string;
  data: { poster: any; link: string }[];
}

export default function SingleVideoSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapper}
      dir="ltr"
      className={`${props.extraClass} video-player bg-black flex items-center relative z-20`}
    >
      <video
        width="100%"
        poster={props.data[0].poster.src}
        className="w-full h-full object-cover object-center"
      >
        <source src={props.data[0].link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
