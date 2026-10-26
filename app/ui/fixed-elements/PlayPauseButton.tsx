import { useAppState } from "@/app/components/AppContext";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "../plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function PlayPauseButton() {
  // Selectors
  const audioButton = useRef<HTMLButtonElement>(null);
  const { isPlaying, setIsPlaying } = useAppState();

  // Video mute/unmute Effect
  useGSAP(() => {
    const video = document.getElementById(
      "banner-video-element",
    ) as HTMLVideoElement | null;
    const isMuted = video?.muted;
    const volume = video?.volume;
    if (isPlaying) {
      if (video) {
        gsap.set(video, {
          volume: 0,
        });
        video.muted = false;
        gsap.to(video, {
          volume: 1,
          duration: 2,
          ease: "none",
        });
      }
    } else {
      if (video) {
        gsap.to(video, {
          volume: 0,
          duration: 2,
          ease: "none",
          onComplete: () => {
            video.muted = true;
          },
        });
      }
    }
  }, [isPlaying]);

  return (
    <button
      type="button"
      aria-label="Play/Pause Video"
      id="audio-button"
      ref={audioButton}
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      onKeyDown={(e) => e.key === "Enter" && setIsPlaying(!isPlaying)}
      className="equalizer-button flex gap-2 items-center fixed py-1 px-3 bottom-5 right-5 sm:right-20 z-40 cursor-pointer bg-[#c3a23fb0] text-[#000000] opacity-0 hover:opacity-100 invisible translate-y-5 rounded-full"
    >
      <span>{isPlaying ? "ON" : "OFF"}</span>
      <div className="equalizer flex items-end justify-center gap-0.5 h-4">
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((delay, index) => (
          <div
            key={"Animated-Bar-" + index}
            className={`w-0.5 h-full bg-[#000000] rounded-full transition-transform ${
              isPlaying ? `equalizer-animation` : "scale-30"
            }`}
          />
        ))}
      </div>
    </button>
  );
}
