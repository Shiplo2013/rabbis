import GetRightPosition from "@/app/ui/GetRightPosition";
import ThemeButton from "@/app/ui/ThemeButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import PlusIcon from "../../assets/icons/PlusIcon";
import thumb from "../../assets/images/video-section.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function SingleVideoSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Animation
  useGSAP(
    () => {
      const video = wrapper.current?.querySelector(".video-wrapper");
      if (video) {
        gsap.set(video, {
          translateY: "100%",
        });
        gsap.to(video, {
          translateY: 0,
          ease: "easeIn",
          scrollTrigger: {
            start: () => {
              return GetRightPosition(wrapper.current) - window.innerWidth / 3;
            },
          },
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
    >
      <div className="video-wrapper w-full h-full relative">
        <div className="video h-full w-[26vw] relative z-10">
          <Image
            className="w-full object-cover object-center h-full"
            src={thumb?.src}
            width={"500"}
            height={"932"}
            blurDataURL={thumb?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt={"Section Image"}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 z-30 -translate-1/2">
          <ThemeButton
            extraClass="w-29.25 h-29.25 flex items-center justify-center border-2 border-[#C3A13F] group"
            bgColor="bg-[#0F0F0F85]"
            hoverBgColor="bg-[#000000]"
            svgIcon={<PlusIcon />}
            svgIconClass={
              "-skew-x-10 group-hover:skew-0 transition-all duration-500 group-hover:rotate-180"
            }
          />
        </div>
      </div>
    </section>
  );
}
