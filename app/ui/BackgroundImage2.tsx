import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "./plugins";

interface ChildProps {
  bgImage: any;
  start: number;
  end: number;
  panel: any;
}

export default function BackgroundImage2(props: ChildProps) {
  const background = useRef(null);
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
          start: "right top",
          horizontal: true,
          scrub: 2,
          invalidateOnRefresh: false,
          end: () => "+=" + window.innerWidth * 2.5,
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
    </div>
  );
}
