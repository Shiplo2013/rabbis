import { gsap, SplitText } from "./plugins";

gsap.registerPlugin(SplitText);

export default function TextSplitLines2(item: Element | null | undefined) {
  // Title Split
  if (!item) {
    return [];
  }

  var content = SplitText.create(item, {
      type: "lines",
      linesClass: "direction-rtl2",
      autoSplit: true,
      mask: "lines",
    }),
    contentChars = content.lines;

  return contentChars;
}
