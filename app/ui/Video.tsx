import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP } from "../ui/plugins";

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

    // Set Title
    var stitle = SplitText.create(".split-title", { type: "words,chars" }),
      sTitlechars = stitle.chars;
    gsap.set(".split-title", { perspective: 400 });
    gsap.set(sTitlechars, { yPercent: 100, opacity: 0 });
    // Subtitle
    let splitText = SplitText.create(".split-content", {
      type: "words",
      aria: "hidden",
    });
    gsap.set(splitText.words, { yPercent: 100, opacity: 0 });
    // Banner Button
    gsap.set(".banner-button", { opacity: 0, y: 100 });
    // Animate Text
    let tl = gsap.timeline({
      onComplete: function () {
        localStorage.setItem("hasVisited", "true");
        // Timeline
        const tl = gsap.timeline();
        tl.to(
          "#page",
          {
            opacity: 1,
            ease: "easeInOut",
            duration: 1,
            delay: 0.5,
          },
          "-=0.5",
        )
          .to(
            ".header-left",
            {
              opacity: 1,
              y: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=0.5",
          )
          .to(
            ".header-right",
            {
              opacity: 1,
              x: 0,
              ease: "easeInOut",
              duration: 1,
            },
            "-=0.5",
          )
          .to(
            sTitlechars,
            {
              duration: 0.5,
              yPercent: 0,
              opacity: 1,
              //rotationX: 180,
              transformOrigin: "0% 50%",
              ease: "back.easeIn",
              stagger: 0.1,
            },
            "-=0.5",
          )
          .to(
            splitText.words,
            {
              duration: 0.5,
              yPercent: 0,
              opacity: 1,
              //rotationX: 180,
              transformOrigin: "0% 50%",
              ease: "back.easeIn",
              stagger: 0.1,
            },
            "-=0.5",
          )
          .to(
            ".banner-button",
            {
              duration: 0.5,
              opacity: 1,
              y: 0,
              ease: "back.easeIn",
            },
            "-=0.5",
          );
      },
    });
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
