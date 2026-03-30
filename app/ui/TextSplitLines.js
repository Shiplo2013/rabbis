import {
    gsap,
    SplitText
} from "./plugins";

gsap.registerPlugin(SplitText);

export default function TextSplitLines(item) {
    // Title Split
    var content = SplitText.create(item, { 
        type: "lines",
        linesClass: "direction-rtl",
        autoSplit: true,
        mask: "lines",
    }),
      contentChars = content.lines;

    return contentChars;
}
