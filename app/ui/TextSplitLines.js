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

export default function TextSplitLines(item) {
    ensurePluginsRegistered();
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
