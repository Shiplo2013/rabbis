import {
    gsap,
    SplitText
} from "./plugins";

let pluginsRegistered = false;

function ensurePluginsRegistered() {
  if (typeof window !== "undefined" && !pluginsRegistered) {
    gsap.registerPlugin(SplitText);
    pluginsRegistered = true;
  }
}

export default function TitleSplit(item, type) {
    ensurePluginsRegistered();
    // Title Split
    var title = SplitText.create(item, { 
            type: "words,chars,lines", 
            linesClass: "line", 
            wordsClass: "word", 
            charsClass: "char",
            autoSplit: true,
        }),
        titleChars = (type === 'words') ? title.words : title.chars;
        gsap.set(titleChars, { perspective: 400 });
        gsap.set(titleChars, {yPercent: 100, opacity: 0});

        return titleChars;
}
