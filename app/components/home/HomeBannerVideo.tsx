import { gsap, useGSAP } from "@/app/ui/plugins";
import { usePathname } from "next/navigation";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface HomeBannerVideoProps {
  bannerData?: {
    banner_video?: {
      url?: string;
    };
    banner_background?: {
      intro_background?: string;
    };
  };
}

export default function HomeBannerVideo({ bannerData }: HomeBannerVideoProps) {
  // Select Background Element
  const background = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // GSAP Context for Animations
  useGSAP(() => {
    // Banner Background
    if (background.current) {
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

  return (
    <div
      ref={background}
      id="banner-video"
      className="relative w-full h-full will-change-transform"
    >
      <video
        poster={bannerData?.banner_background?.intro_background}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src={bannerData?.banner_video?.url} type="video/mp4" />
      </video>
      <div className="video-overlay absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
    </div>
  );
}
