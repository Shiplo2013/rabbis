"use client";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP } from "../ui/plugins";

interface ChildProps {
  SlideData: { text1: string; text2: string }[];
}

export default function CardSlider(props: ChildProps) {
  const carSlider = useRef<HTMLDivElement>(null);
  const arrowButton = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { contextSafe } = useGSAP();

  const getActiveSlide = () => {
    return carSlider.current?.querySelector(
      ".card-slide.active",
    ) as HTMLElement | null;
  };

  const getInactiveSlide = () => {
    return carSlider.current?.querySelector(
      ".card-slide:not(.active)",
    ) as HTMLElement | null;
  };

  useGSAP(
    () => {
      const inActiveSlide = getInactiveSlide();
      if (!inActiveSlide) {
        return;
      }

      gsap.set(inActiveSlide, {
        rotation: -6,
        x: -44,
      });
    },
    { scope: carSlider, dependencies: [pathname] },
  );
  const handleNextSlide = contextSafe(() => {
    const activeSlide = getActiveSlide();
    const inActiveSlide = getInactiveSlide();
    if (!activeSlide || !inActiveSlide) {
      return;
    }

    const card = gsap.timeline({
      onComplete: () => {
        activeSlide.classList.remove("active");
        inActiveSlide.classList.add("active");
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
  });
  // Cursor Follower Function
  const moveCircle = contextSafe(
    (e: { screenY: number; clientX: any; clientY: any }) => {
      //console.log(e.clientX, e.clientY)
      if (!arrowButton.current) {
        return;
      }

      gsap.to(arrowButton.current, {
        x: e.clientX,
        y: e.clientY,
        delay: 0,
        duration: 0.2,
      });
    },
  );
  // On Mouse Enter
  const handleMouseEnter = contextSafe(() => {
    if (!arrowButton.current) {
      return;
    }

    gsap.to(arrowButton.current, {
      opacity: 1,
      scale: 1,
      rotation: 180,
      delay: 0,
    });
  });
  // On Mouse Leave
  const handleMouseLeave = contextSafe(() => {
    if (!arrowButton.current) {
      return;
    }

    gsap.to(arrowButton.current, {
      opacity: 0,
      scale: 0,
      rotation: 0,
      delay: 0,
    });
  });
  return (
    <>
      <div
        ref={carSlider}
        onClick={handleNextSlide}
        onMouseMove={moveCircle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="arrow-slider w-117 relative z-10 cursor-none"
      >
        <div
          ref={arrowButton}
          className="arrow-button fixed left-0 top-0 z-30 -ml-13 -mt-13 cursor-none opacity-0 pointer-events-none scale-0"
        />
        <div className="card-slider text-[#000000] text-[20px] cursor-none">
          <div className="card-slide active pt-12 pb-5 px-7 bg-[#F1EADA] min-h-54.25 relative z-20 transition-colors duration-300">
            <div className="slide-content">
              <span className="absolute left-5 top-3">1/2</span>
              <p
                className="font-bold"
                dangerouslySetInnerHTML={{
                  __html: props?.SlideData[0]?.text1,
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
                  __html: props?.SlideData[0]?.text2,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
