"use client";
import { useRef } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;

      if (!wrapper || !content) {
        return;
      }

      // Keep a single smoother instance per mounted wrapper.
      let smoother = ScrollSmoother.get();
      if (!smoother) {
        smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 0.1,
          effects: true,
          smoothTouch: 0.5,
          //normalizeScroll: true,
        });
      }

      return () => {
        smoother?.kill();
        ScrollTrigger.clearScrollMemory();
      };
    },
    { scope: wrapperRef },
  );

  return (
    <div ref={wrapperRef}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
