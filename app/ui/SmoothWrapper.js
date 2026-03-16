import { useRef } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./../ui/plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothWrapper({children}) {
  const main = useRef();
    useGSAP(() => {
      // create the scrollSmoother before your scrollTriggers
      ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });
    }, {scope: main});
  return (
    <div ref={main} id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
