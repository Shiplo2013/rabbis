import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../ui/plugins";

gsap.registerPlugin(useGSAP);

function Video(props: {
  link: string | undefined;
  video_id: string;
  classes: string;
  poster_image: string;
  isComplete: boolean;
  onVideoEnd: (value: boolean) => void;
}) {
  const video = useRef<HTMLVideoElement | null>(null);
  const [isVideoComplete, setIsVideoComplete] = useState(false);
  function videoPlayed() {
    setIsVideoComplete(true);
  }
  // Setup GSAP Animation
  useGSAP(() => {
    // Set Items
    gsap.set("#video-animation .video-animated-text", {
      y: 500,
      opacity: 0,
      scale: 0,
    });
  }, [props.isComplete]);
  // When video is complete, trigger animation
  useGSAP(() => {
    if (isVideoComplete) {
      // Animate Text
      let tl = gsap.timeline({
        onComplete: function () {
          localStorage.setItem("hasVisited", "true");
          props.onVideoEnd(true);
        },
      });
      tl.to("#video-animation .video-animated-text", {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 0,
      })
        .to("#video-animation #doors-video", {
          opacity: 0,
          duration: 1,
          delay: 1,
        })
        .to("#loading-section", {
          opacity: 0,
          duration: 1,
          delay: 1,
        })
        .to("#loading-section", {
          visibility: "hidden",
          duration: 0,
          delay: 0,
        });
    }
  }, [isVideoComplete]);
  // PLAY OR PAUSE VIDEO BASED ON isComplete
  useEffect(() => {
    if (video.current !== null) {
      if (props.isComplete == true) {
        video.current.currentTime = 0;
        video.current.play();
      } else {
        video.current.currentTime = 0;
        video.current.pause();
      }
    }
  }, [props.isComplete]);
  return (
    <video
      ref={video}
      id={props.video_id}
      className={props.classes}
      width="500"
      poster={props.poster_image}
      autoPlay
      muted
      onEnded={videoPlayed}
    >
      <source src={props.link} type="video/mp4" />
    </video>
  );
}

export default Video;
