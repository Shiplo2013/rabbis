"use client";
import { useEffect } from "react";
import { gsap } from "../ui/plugins";

interface ChildProps {
  SliderData: { text1: string; text2: string }[];
}

export default function CardSlider(props: ChildProps) {
  useEffect(() => {
    const inActiveSlide = document.querySelector(
      "#card-slider>.card-slide:not(.active)",
    );
    gsap.set(inActiveSlide, {
      rotation: -6,
      x: -44,
    });
  }, []);
  const handleNextSlide = () => {
    const activeSlide = document.querySelector(
      "#card-slider>.card-slide.active",
    );
    const inActiveSlide = document.querySelector(
      "#card-slider>.card-slide:not(.active)",
    );
    const card = gsap.timeline({
      onComplete: () => {
        activeSlide?.classList.remove("active");
        inActiveSlide?.classList.add("active");
      },
    });
    card
      .to(activeSlide, {
        xPercent: 90,
        rotation: 5,
        delay: 0,
        duration: 0.5,
      })
      .to(inActiveSlide, {
        x: -70,
        translateY: 20,
        delay: -0.5,
        duration: 0.5,
      })
      .to(activeSlide, {
        zIndex: 10,
        xPercent: 0,
        x: -44,
        rotation: -6,
        delay: 0.1,
        duration: 0.5,
      })
      .to(inActiveSlide, {
        zIndex: 30,
        delay: -0.5,
        duration: 0,
      })
      .to(inActiveSlide, {
        x: 0,
        translateY: 0,
        rotation: 0,
        delay: -0.5,
        duration: 0.5,
      });
  };
  // Cursor Follower Function
  function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
    const yskale = -(e.screenY / 100) * 1;
    //console.log(e.clientX, e.clientY)
    gsap.to(".arrow-button", {
      x: e.clientX,
      y: e.clientY,
      delay: 0,
      duration: 0.2,
    });
  }
  return (
    <>
      <div
        onClick={handleNextSlide}
        onMouseMove={(e) => {
          moveCircle(e);
        }}
        onMouseEnter={() => {
          gsap.to(".arrow-button", {
            opacity: 1,
            scale: 1,
            rotation: 180,
            delay: 0,
          });
        }}
        onMouseLeave={() => {
          gsap.to(".arrow-button", {
            opacity: 0,
            scale: 0,
            rotation: 0,
            delay: 0,
          });
        }}
        className="arrow-slider w-117 relative z-10 cursor-none"
      >
        <div
          id="card-slider"
          className="card-slider text-[#000000] text-[20px] cursor-none"
        >
          <div className="card-slide active pt-12 pb-5 px-7 bg-[#F1EADA] min-h-54.25 relative z-20 transition-colors duration-300">
            <div className="slide-content">
              <span className="absolute left-5 top-3">1/2</span>
              <p
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: props?.SliderData[0]?.text1,
                }}
              ></p>
            </div>
          </div>
          <div className="card-slide pt-12 pb-5 px-7 bg-[#F1EADA] min-h-54.25 absolute top-0 left-0 z-10 transition-colors duration-300">
            <div className="slide-content">
              <span className="absolute left-5 top-3">2/2</span>
              <p
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: props?.SliderData[0]?.text2,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
