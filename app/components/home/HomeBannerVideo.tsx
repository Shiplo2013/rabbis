import BannerImage from "@/app/assets/images/home-banner.webp";
import { gsap, useGSAP } from "@/app/ui/plugins";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { preload } from "react-dom";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface HomeBannerVideoProps {
  bannerData?: {
    banner_video?: {
      url?: string;
    };
    banner_background?: {
      sizes?: {
        intro_background?: string;
      };
    };
  };
}

export default function HomeBannerVideo({ bannerData }: HomeBannerVideoProps) {
  // Select Background Element
  const background = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  // GSAP Context for Animations
  useGSAP(() => {
    // Banner Background
    if (background.current && window.innerWidth > 1024 && pathname === "/") {
      gsap.to(background.current, {
        x: "-40vw",
        ease: "none",
        scrollTrigger: {
          trigger: background.current,
          start: 0,
          end: () => "+=" + window.innerWidth * 1.5,
          scrub: 2,
        },
      });
    }
  }, [pathname]);

  // Preload the poster image with high fetch priority
  preload(BannerImage.src, {
    as: "image",
    fetchPriority: "high",
  });

  // Preload the core video source early
  // if (bannerData?.banner_video?.url) {
  //   preload(bannerData.banner_video.url, {
  //     as: "track",
  //     fetchPriority: "high",
  //   });
  // }

  return (
    <div ref={background} id="banner-video" className="relative w-full h-full">
      <video
        id="banner-video-element"
        poster={BannerImage.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={() => setLoading(false)}
        onPlay={() => setLoading(false)}
        className="w-full h-full object-cover"
        controlsList="nodownload"
      >
        <source src={bannerData?.banner_video?.url} type="video/mp4" />
        <track kind="captions" />
      </video>
      <div
        className={`video-overlay absolute top-0 left-0 w-full h-full bg-black ${loading ? "opacity-0" : "opacity-70"}`}
      ></div>
    </div>
  );
}
