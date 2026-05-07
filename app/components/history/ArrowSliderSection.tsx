import CardSlider from "@/app/ui/CardSlider";
import IntroductionBackground2 from "@/app/ui/IntroductionBackground2";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  bgPosition: string;
  bgClass: string;
  overlayClass: string;
  sectionImage: any;
  SlideData: { text1: string; text2: string }[];
  panel?: RefObject<HTMLDivElement | null>;
}

export default function ArrowSliderSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardSlider = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Get Intro Right Position
  function getRightPosition(selector: any) {
    const intro = selector;
    if (!intro) return 0;
    const introObj = intro.getBoundingClientRect();
    const introRight = Math.floor(window.innerWidth - introObj.right);
    return introRight;
  }
  // Section Animation
  useGSAP(
    () => {
      // Section Image
      gsap.set(imageRef.current, { x: "30vw" });
      gsap.set(cardSlider.current, { y: "10vh", opacity: 0 });

      // Slider Anim
      gsap.to(cardSlider.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          start: () => {
            return (
              getTimelineOffset() +
              getRightPosition(cardSlider.current) -
              window.innerWidth / 2
            );
          },
          toggleActions: "restart pause resume reverse",
        },
      });

      // Image Move
      const tl = gsap.timeline({
        scrollTrigger: {
          start: () => {
            return (
              getTimelineOffset() +
              getRightPosition(imageRef.current) -
              window.innerWidth * 0.8
            );
          },
          end: () => "+=" + window.innerWidth * 2,
          scrub: 2,
        },
      });
      tl.to(imageRef.current, {
        x: "-10vw",
        ease: "easeIn",
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`bg-black flex items-center relative z-30 ${props.extraClass}`}
      data-scroll-section={props.animWidthText}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
        <IntroductionBackground2
          bgImage={props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
          animatePosition={props.animWidthText}
          panel={props.panel}
        />
      </div>
      <div className="section-wrapper w-full h-full relative z-30">
        <div ref={cardSlider} className="absolute left-[8vw] top-[10vh]">
          <CardSlider SlideData={props.SlideData} />
        </div>
        <div
          ref={imageRef}
          className="section-image w-121 h-80.5 absolute bottom-[15vh] left-0"
        >
          <Image
            className={`w-full object-cover h-full relative z-10`}
            src={props?.sectionImage?.src}
            width={`484`}
            height={`322`}
            blurDataURL={props?.sectionImage?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Section Image"
          />
        </div>
      </div>
    </section>
  );
}
