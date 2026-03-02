import {
    gsap,
    SplitText
} from "./plugins";

gsap.registerPlugin(SplitText);

export default function ContenteSplit(item, type) {
    // Title Split
    var content = SplitText.create(item, { 
        type: "words,lines", 
        linesClass: "line overflow-hidden", 
        autoSplit: true, 
        mask: "lines" 
    }),
      contentChars = (type === "words") ? content.words : content.lines;
    gsap.set(item, { perspective: 400 });
    gsap.set(contentChars, {yPercent: 100, opacity: 0});

    return contentChars;
}
