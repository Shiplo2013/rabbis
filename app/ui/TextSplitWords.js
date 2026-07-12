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

export default function TextSplitWords(item) {
    ensurePluginsRegistered();
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
