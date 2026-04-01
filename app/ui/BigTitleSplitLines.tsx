import { gsap, SplitText } from "./plugins";

gsap.registerPlugin(SplitText);

export default function BigTitleSplitLines(item: any) {
  // Title Split
  var content = SplitText.create(item, {
      type: "lines",
      linesClass: "direction-rtl3",
      autoSplit: true,
      mask: "lines",
    }),
    contentChars = content.lines;

  return contentChars;
}
