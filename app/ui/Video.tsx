import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

function Video(props: {
  link: string | undefined;
  video_id: string;
  classes: string;
  poster_image: string;
  isComplete: boolean;
}) {
  const video = useRef<HTMLVideoElement | null>(null);
  useGSAP(() => {
    // Set Items
    gsap.set("#video-animation .video-animated-text", {
      y: 500,
      opacity: 0,
      scale: 0,
    });
    // Animate Text
    let tl = gsap.timeline();
    if (props.isComplete == true) {
      tl.to("#video-animation .video-animated-text", {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        delay: 1.5,
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
  }, [props.isComplete]);
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
    >
      <source src={props.link} type="video/mp4" />
    </video>
  );
}

export default Video;
