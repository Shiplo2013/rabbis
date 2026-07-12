import { gsap, SplitText } from "./plugins";

let pluginsRegistered = false;

function ensurePluginsRegistered() {
  if (typeof window !== "undefined" && !pluginsRegistered) {
    gsap.registerPlugin(SplitText);
    pluginsRegistered = true;
  }
}

export default function TitleSplitChars(item) {
  ensurePluginsRegistered();
  // Title Split
  var title = SplitText.create(item, {
      type: "words",
      wordsClass: "word",
      autoSplit: true,
    }),
    titleChars = title.words;

  return titleChars;
}
