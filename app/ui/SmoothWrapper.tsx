"use client";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./plugins";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const main = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const existingSmoother = ScrollSmoother.get();
      if (existingSmoother) {
        existingSmoother.kill();
      }

      const smoother = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        //normalizeScroll: true,
      });

      return () => {
        smoother.kill();
      };
    },
    { scope: main, dependencies: [pathname] },
  );

  return (
    <div ref={main} id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
