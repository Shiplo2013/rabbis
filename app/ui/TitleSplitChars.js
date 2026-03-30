import { gsap, SplitText } from "./plugins";

gsap.registerPlugin(SplitText);

export default function TitleSplitChars(item) {
  // Title Split
  var title = SplitText.create(item, {
      type: "chars",
      charsClass: "char",
      autoSplit: true,
    }),
    titleChars = title.chars;

  return titleChars;
}
