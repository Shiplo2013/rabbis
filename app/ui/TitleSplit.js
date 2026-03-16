import {
    gsap,
    SplitText
} from "./plugins";

gsap.registerPlugin(SplitText);

export default function TitleSplit(item, type) {
    // Title Split
    var title = SplitText.create(item, { 
        type: "words,chars,lines", 
        linesClass: "line", 
        wordsClass: "word", 
        charsClass: "char",
        autoSplit: true,
    }),
      titleChars = (type === 'words') ? title.words : title.chars;
    gsap.set(item, { perspective: 400 });
    gsap.set(titleChars, {yPercent: 100, opacity: 0});

    return titleChars;
}
