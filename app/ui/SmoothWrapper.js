import { useGSAP } from "@gsap/react";
import { gsap, ScrollSmoother } from "./../ui/plugins";

gsap.registerPlugin(ScrollSmoother);

export default function SmoothWrapper({children}) {
    useGSAP(() => {
        // create the scrollSmoother before your scrollTriggers
        ScrollSmoother.create({
        smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
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
