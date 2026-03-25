import {
    gsap,
    SplitText
} from "./plugins";

gsap.registerPlugin(SplitText);

export default function TextSplitLines(item) {
    // Title Split
    var content = SplitText.create(item, { 
        type: "lines", 
        linesClass: "line", 
        autoSplit: true, 
        mask: "lines" 
    }),
      contentChars = content.lines;
    gsap.set(item, { perspective: 400 });
    gsap.set(contentChars, {yPercent: 100});

    return contentChars;
}
