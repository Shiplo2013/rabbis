import { gsap, useGSAP } from "@/app/ui/plugins";
import { usePathname } from "next/navigation";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function VideoBackground() {
  // Select Background Element
  const background = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // GSAP Context for Animations
  useGSAP(() => {
    // Banner Background
    if (background.current && window.innerWidth > 1024) {
      gsap.set(background.current, { x: "10vw" });
      gsap.to(background.current, {
        x: "-10vw",
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
        id="banner-video-element"
        poster="/home-banner.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src="/river-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
