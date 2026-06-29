import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import Image1 from "../../assets/images/single-image2.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
  data?: any;
}

export default function ImageOnlySection2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      if (typeof window === "undefined" || !wrapper.current) {
        return;
      }
      // Selector
      const image = wrapper.current?.querySelector(".image1");
      if (image) {
        gsap.set(image, {
          x: "-10vw",
        });
        const animation = gsap.to(image, {
          x: "15vw",
          ease: "easeIn",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(wrapper.current) -
                window.innerWidth
              );
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        animations.push(animation);
      }

      // Return animations
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.data] },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-wrapper w-full h-full py-[15vh] px-[4.7vw] flex items-end justify-end">
        <div className="image1 w-220 h-144.75 relative z-30 translate-x-[9vw]">
          <Image
            className="w-full object-cover object-center h-full"
            src={props.data?.sizes?.large || Image1?.src}
            width={"880"}
            height={"579"}
            blurDataURL={CreateShimmerDataUrl(880, 579) || Image1?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt={"Section Image"}
          />
        </div>
      </div>
    </section>
  );
}
