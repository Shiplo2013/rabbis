"use client";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useAppState } from "../components/AppContext";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { smoother } = useAppState();

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;

      if (!wrapper || !content) {
        return;
      }

      // Keep a single smoother instance per mounted wrapper.
      smoother.current = ScrollSmoother.get() || null;
      if (!smoother.current) {
        smoother.current = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 0.1,
          effects: true,
          smoothTouch: 0.5,
          //normalizeScroll: true,
        });
      }

      return () => {
        smoother.current?.kill();
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
