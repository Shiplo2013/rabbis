import Image from "next/image";
import { useEffect } from "react";
import { gsap, useGSAP } from "../ui/plugins";

export default function BackgroundImage({animated, ...props}) {
  useGSAP(() => {
    if (animated) {
      gsap.to(".bg-overlay", {
        translateY: "-100%",
        duration: 1,
        ease: "cubic-bezier(0.652, 0.05, 0, 1)",
        delay: 0,
      });
      // Banner Image
      gsap.set('.bg-image', {scale: 1.2, opacity: 0});
      gsap.to('.bg-image', {scale:1, opacity: 1, ease:"power.out", duration: 1, delay:0 });
    }
  }, [animated]);
  useEffect(() => {
    // Banner Background
    // gsap.to('.bg-container', {
    //     x: () => { return -((window.innerWidth*1)) },
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: ".section-wrapper",
    //         start: 'top top',
    //         scrub: true,
    //         invalidateOnRefresh: true,
    //         end: () => "+=" + (window.innerWidth*1.3),
    //     }
    // });
  }, []);
  return (
    <div className={`bg-container absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}>
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
  )
}
