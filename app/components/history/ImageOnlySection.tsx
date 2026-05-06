import GetRightPosition from "@/app/ui/GetRightPosition";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import Image1 from "../../assets/images/image-only.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function ImageOnlySection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Section Animation
  useGSAP(
    () => {
      const image = wrapper.current?.querySelector(".image1");
      if (image) {
        gsap.set(image, { x: "17vw" });
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(wrapper.current) -
                window.innerWidth / 2
              );
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(image, {
          x: "-5vw",
          ease: "easeIn",
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-wrapper w-full h-full py-[6vh] px-[6.8vw] flex items-end justify-end">
        <div className="image1 w-121 h-80.5 relative z-30">
          <Image
            className="w-full object-cover object-center h-full"
            src={Image1?.src}
            width={"484"}
            height={"322"}
            blurDataURL={Image1?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt={"Section Image"}
          />
        </div>
      </div>
    </section>
  );
}
