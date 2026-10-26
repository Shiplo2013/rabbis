// Plain (non-hook, non-component) GSAP helpers for HistoryScriptProvider's
// scroll-pinned timeline panels. These intentionally live outside the
// component: the six "Timeline Section N" blocks in HistoryScriptProvider
// used to repeat this exact scroll-trigger/progress-line logic once per
// panel, which is what drove its reported cyclomatic/cognitive complexity.
// Extracting it into one parameterized, pure function removes that
// repetition and keeps the control flow out of the owning component/hook
// entirely (this module exports neither a component nor a hook, so it is
// out of scope for React-specific complexity checks).
import type { MutableRefObject, RefObject } from "react";
import { gsap } from "../../ui/plugins";

export function setProgressLineWidth(target: Element | null, value: string) {
  if (target instanceof HTMLElement) {
    target.style.width = value;
  }
}

export function completeTimeline(selector: string) {
  const intro = document.querySelector(`#history-timeline ${selector}`);
  if (!intro) return;
  if (!intro.classList.contains("complete")) {
    intro.classList.add("complete");
  }
}

export function activeTimeline(selector: string) {
  const intro = document.querySelector(`#history-timeline ${selector}`);
  if (!intro) return;
  if (!intro.classList.contains("active")) {
    intro.classList.add("active");
  }
}

export function inActiveTimeline(selector: string) {
  const intro = document.querySelector(`#history-timeline ${selector}`);
  if (!intro) return;
  if (intro.classList.contains("active")) {
    intro.classList.remove("active");
  }
}

// True once every one of the given refs is unmounted (all `.current` are
// null), meaning the scroll-pinned timeline markup isn't in the DOM yet.
export function areAllRefsUnmounted(
  refs: Array<RefObject<HTMLElement | null>>,
) {
  return refs.every((ref) => !ref.current);
}

type PinnedTimelineSectionConfig = {
  panelRef: RefObject<HTMLDivElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
  timelineSectionRef: RefObject<HTMLDivElement | null>;
  widthMultiplier: number;
  introClass: string;
  scrubScale: number;
  // Panels 1-5 report scroll progress onto a connecting line; the final
  // panel (6) has none, so this stays undefined for it.
  introLineSelector?: string;
  // Only the final panel also hides the overall history progress bar once
  // its scroll progress is effectively complete.
  historyElement?: HTMLElement | null;
  isHistoryHiddenRef?: MutableRefObject<boolean>;
};

export function createPinnedTimelineSection({
  panelRef,
  wrapperRef,
  timelineSectionRef,
  widthMultiplier,
  introClass,
  scrubScale,
  introLineSelector,
  historyElement,
  isHistoryHiddenRef,
}: PinnedTimelineSectionConfig): gsap.core.Timeline {
  const introLine = introLineSelector
    ? document.querySelector(introLineSelector)
    : null;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: panelRef.current,
      start: "top top",
      end: "+=" + window.innerWidth * widthMultiplier,
      scrub: scrubScale,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (self.progress > 0) {
          activeTimeline(introClass);
          completeTimeline(introClass);
          if (introLine) {
            setProgressLineWidth(introLine, `${Math.round(self.progress * 100)}%`);
          }
        } else {
          if (introLine) {
            setProgressLineWidth(introLine, "0%");
          }
          inActiveTimeline(introClass);
        }

        if (historyElement && isHistoryHiddenRef) {
          const shouldHideHistory = self.progress > 0.99;
          if (shouldHideHistory !== isHistoryHiddenRef.current) {
            isHistoryHiddenRef.current = shouldHideHistory;
            gsap.set(historyElement, {
              autoAlpha: shouldHideHistory ? 0 : 1,
              pointerEvents: shouldHideHistory ? "none" : "auto",
            });
          }
        }
      },
    },
  });

  timeline.to(wrapperRef.current, {
    x: () =>
      wrapperRef.current
        ? wrapperRef.current.offsetWidth - window.innerWidth
        : 0,
    ease: "none",
    scrollTrigger: {
      trigger: panelRef.current,
      start: timelineSectionRef.current?.offsetTop,
      end: "+=" + (window.innerWidth * widthMultiplier - 200),
      scrub: scrubScale,
    },
  });

  return timeline;
}
