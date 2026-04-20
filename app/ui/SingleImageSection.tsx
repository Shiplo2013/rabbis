import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../ui/plugins";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ChildProps {
  extraClass: string;
  image: any;
  animWidthText: number;
}
export default function SingleImageSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef(null);
  const image = useRef(null);

  // Section Animation
  useGSAP(
    () => {
      // Section Image
      gsap.set(image.current, { scale: 1.2 });
      const tl = gsap.timeline({
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthText;
          },
          toggleActions: "restart pause play reverse",
        },
      });
      tl.to(image.current, {
        scale: 1,
        ease: "easeIn",
        duration: 0.5,
        delay: 0,
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <div className="relative w-full h-full">
        <div ref={image} className="w-full h-full relative z-10">
          <Image
            className="w-full object-cover object-center h-full"
            src={props?.image?.src}
            width={"614"}
            height={"921"}
            blurDataURL={props?.image?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Image Background"
          />
        </div>
      </div>
    </section>
  );
}
