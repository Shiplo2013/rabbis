import {
    gsap,
    SplitText
} from "./plugins";

gsap.registerPlugin(SplitText);

export default function TextSplitWords(item) {
    // Title Split
    var content = SplitText.create(item, { 
        type: "words", 
        wordsClass: "word", 
        autoSplit: true,
    }),
      contentChars = content.words;
    gsap.set(item, { perspective: 400 });
    gsap.set(contentChars, {yPercent: 100, opacity: 0});

    return contentChars;
}
