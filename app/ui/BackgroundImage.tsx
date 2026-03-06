import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "./plugins";

interface ChildProps {
  animated: boolean;
  bgImage: any;
  panel: any;
}

export default function BackgroundImage(props: ChildProps) {
  const background = useRef(null);
  useGSAP(() => {
    if (props.animated) {
      gsap.to(".bg-overlay", {
        translateY: "-100%",
        duration: 1,
        ease: "cubic-bezier(0.652, 0.05, 0, 1)",
        delay: 0,
      });
      // Banner Image
      gsap.set(background.current, { scale: 1.2, opacity: 0 });
      gsap.to(background.current, {
        scale: 1,
        opacity: 1,
        ease: "power.out",
        duration: 1,
        delay: 0,
      });
    }
  }, [props.animated]);
  useGSAP(
    () => {
      // Banner Background
      gsap.to(background.current, {
        x: () => {
          return -(window.innerWidth * 1);
        },
        ease: "none",
        scrollTrigger: {
          trigger: props.panel.current,
          start: "top 0%",
          scrub: 2,
          invalidateOnRefresh: false,
          end: () => "+=" + window.innerWidth * 1.5,
        },
      });
    },
    { scope: background },
  );
  return (
    <div
      ref={background}
      className={`banner-background absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}
    >
      <Image
        className="bg-image w-full object-cover object-center h-full"
        src={props?.bgImage?.src}
        width="1920"
        height="1080"
        blurDataURL={props?.bgImage?.blurDataURL}
        placeholder={"blur"}
        loading="lazy"
        alt="Section Background"
      />
      <div className="bg-overlay absolute top-0 left-0 w-full h-full bg-black z-20"></div>
    </div>
  );
}
