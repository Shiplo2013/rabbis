import { useGSAP } from "@gsap/react";
import { gsap, ScrollSmoother } from "./../ui/plugins";

gsap.registerPlugin(ScrollSmoother);

export default function SmoothWrapper({children}) {
    useGSAP(() => {
        // create the scrollSmoother before your scrollTriggers
        ScrollSmoother.create({
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
          normalizeScroll: true,
        });
    });
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
