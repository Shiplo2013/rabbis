import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "../ui/plugins";

export default function AnimatedBackground(props) {
  useEffect(() => {
    // Background Animation on scroll
    gsap.to(".background-overlay", {
        opacity: 0.6,
        duration: 1,
        ease: "cubic-bezier(0.652, 0.05, 0, 1)",
        delay: 0,
      });
      // Banner Image
      gsap.set('.background-image', {scale: 1.2, opacity: 0});
      gsap.to('.background-image', {scale: 1, opacity: 1, ease:"power.out", duration: 1, delay:0 });
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
    <div className={`background-wrapper absolute top-0 left-0 w-full h-full bg-black z-10 transition-none`}>
        <Image
          className="background-image w-full object-cover object-center h-full"
          src={props?.bgImage?.src}
          width="1920"
          height="1080"
          blurDataURL={props?.bgImage?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
        <div className="background-overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 z-20"></div>
      </div>
  )
}
