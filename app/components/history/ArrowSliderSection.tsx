import CardSlider from "@/app/ui/CardSlider";
import GetRightPosition from "@/app/ui/GetRightPosition";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP } from "../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  bgPosition: string;
  bgClass: string;
  overlayClass: string;
  sectionImage: any;
  SlideData: { text1: string; text2: string }[];
}

export default function ArrowSliderSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // Section Animation
  useGSAP(
    () => {
      // Section Image
      gsap.set(imageRef.current, { x: "30vw" });
      const tl = gsap.timeline({
        scrollTrigger: {
          start: () => {
            return GetRightPosition(wrapper.current) - window.innerWidth / 3;
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
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
        <IntroductionBackground
          bgImage={props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
          animatePosition={props.animWidthText}
        />
      </div>
      <div className="section-wrapper w-full h-full relative z-30">
        <div className="absolute left-[8vw] top-[10vh]">
          <CardSlider SlideData={props.SlideData} />
        </div>
        <div
          ref={imageRef}
          className="section-image w-121 h-80.5 absolute bottom-[6vh] left-0"
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
