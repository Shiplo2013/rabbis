import { useRef, useState } from "react";
import { gsap, useGSAP } from "../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Loader(props: { animated: (value: boolean) => void }) {
  // Selectors
  const wrapper = useRef<HTMLDivElement>(null);
  // State
  const [animComplete, setAnimComplete] = useState(false);

  // GSAP Animation
  useGSAP(() => {
    // Selectors
    const loadingBarFront =
      wrapper.current?.querySelectorAll(".loading-bar-front");
    // Timeline
    let tl = gsap.timeline({
      onComplete: function () {
        props.animated(true);
      },
    });
    if (loadingBarFront) {
      tl.to(loadingBarFront, {
        width: 0,
        ease: "easeInOut",
        duration: 2,
        delay: 0,
      })
        .to(wrapper.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "easeInOut",
        })
        .set(wrapper.current, { display: "none" });
    }
  }, []);
  return (
    <div
      ref={wrapper}
      className="loading-animation w-screen h-screen fixed top-0 left-0 z-99"
    >
      <div
        className={`loading-mask w-full h-full z-40 mask-center mask-no-repeat`}
      >
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-0 w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[7%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[14%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[21%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[28%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[35%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[42%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[49%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[56%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[63%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[70%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[77%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[84%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[91%] w-[7%] h-screen bg-[#191919]`}
        ></div>
        <div
          className={`loading-bar-front loading-animation-bar absolute top-0 left-[98%] w-[7%] h-screen bg-[#191919]`}
        ></div>
      </div>
    </div>
  );
}
