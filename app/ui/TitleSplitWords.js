import { gsap, SplitText } from "./plugins";

gsap.registerPlugin(SplitText);

export default function TitleSplitChars(item) {
  // Title Split
  var title = SplitText.create(item, {
      type: "words",
      wordsClass: "word",
      autoSplit: true,
    }),
    titleChars = title.words;

  return titleChars;
}
