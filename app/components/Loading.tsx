"use client";
import TitleGray from "@/app/assets/images/title-gray.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import poster from "../assets/images/doors.jpg";
import Video from "../ui/Video";

gsap.registerPlugin(useGSAP);

function Loading() {
  // State
  const [animComplete, setAnimComplete] = useState(false);
  // Video Ref
  const videoRef = useRef(null);
  // Video Link
  const videoLink =
    "http://dovp7.sg-host.com/wp-content/uploads/2026/02/doors.mp4";

  // GSAP Animation
  useGSAP(() => {
    // Timeline
    let tl = gsap.timeline({
      onComplete: function () {
        setAnimComplete(true);
      },
    });
    tl.to("#loading-section .loading-bar-back", {
      width: 0,
      ease: "easeInOut",
      duration: 2,
      delay: 1,
    })
      .to("#loading-section .loading-bar-front", {
        width: "7%",
        ease: "easeInOut",
        duration: 2,
        delay: -2,
      })
      .to("#logo-animation", {
        opacity: 0,
        duration: 1,
        delay: 1,
      });
  }, []);
  return (
    <section
      id="loading-section"
      className="fixed top-0 left-0 bg-black w-screen h-screen flex items-center justify-center z-50"
    >
      <div
        id="video-animation"
        className="z-10 absolute top-0 left-0 w-screen h-screen"
      >
        <Video
          isComplete={animComplete}
          poster_image={poster.src}
          video_id="doors-video"
          classes={"object-contain w-full h-full"}
          link={videoLink}
        />
        <div className="video-animated-text absolute top-[50%] left-[50%] text-center text-[#D1A941] text-2xl md:text-3xl lg:text-4xl translate-x-[-50%] mt-[-10vh]">
          <p className="flex items-center justify-center gap-4">
            <span>ירושלים</span>
            <span className="w-12.5 h-0.5 bg-[#D4AF37] block"></span>
            <span>סלבודקא</span>
          </p>
          <p>148 שנות מורשת</p>
        </div>
      </div>
      <div
        id="logo-animation"
        className="z-20 absolute top-0 left-0 w-screen h-screen"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black z-10">
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-0 w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[7%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[14%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[21%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[28%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[35%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[42%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[49%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[56%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[63%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[70%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[77%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[84%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[91%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-back loading-animation-bar absolute top-0 left-[98%] w-[4.5%] h-screen bg-(--theme-color)`}
          ></div>
        </div>
        <div
          style={{
            maskImage: `url(${TitleGray.src})`,
          }}
          className={`loading-mask absolute top-0 left-0 w-full h-full z-40 bg-[#191919] mask-center mask-no-repeat`}
        >
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-0 w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[7%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[14%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[21%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[28%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[35%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[42%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[49%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[56%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[63%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[70%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[77%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[84%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[91%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
          <div
            className={`loading-bar-front loading-animation-bar absolute top-0 left-[98%] w-[1.5%] h-screen bg-(--theme-color)`}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default Loading;
