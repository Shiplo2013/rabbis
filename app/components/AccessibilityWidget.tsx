"use client";

import { useEffect, useState } from "react";
import EyeIcon from "../assets/icons/EyeIcon";
import WidgetPanel from "./accessibility/WidgetPanel";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
  grayscale: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: "md",
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false,
  readableFont: false,
  grayscale: false,
};

const TEXT_SIZES: TextSize[] = ["xs", "sm", "md", "lg", "xl", "xxl"];

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    // Load saved preferences
    const savedSize =
      (localStorage.getItem("a11y-text-size") as TextSize | null) || "md";
    const savedContrast = localStorage.getItem("a11y-high-contrast") === "true";
    const savedMotion = localStorage.getItem("a11y-reduce-motion") === "true";
    const savedUnderline =
      localStorage.getItem("a11y-underline-links") === "true";
    const savedReadableFont =
      localStorage.getItem("a11y-readable-font") === "true";
    const savedGrayscale = localStorage.getItem("a11y-grayscale") === "true";

    applySettings({
      textSize: TEXT_SIZES.includes(savedSize) ? savedSize : "md",
      highContrast: savedContrast,
      reduceMotion: savedMotion,
      underlineLinks: savedUnderline,
      readableFont: savedReadableFont,
      grayscale: savedGrayscale,
    });
  }, []);

  const applySettings = (nextSettings: AccessibilitySettings) => {
    setSettings(nextSettings);

    document.documentElement.setAttribute(
      "data-text-size",
      nextSettings.textSize,
    );
    document.documentElement.setAttribute(
      "data-high-contrast",
      nextSettings.highContrast.toString(),
    );
    document.documentElement.setAttribute(
      "data-reduce-motion",
      nextSettings.reduceMotion.toString(),
    );
    document.documentElement.setAttribute(
      "data-underline-links",
      nextSettings.underlineLinks.toString(),
    );
    document.documentElement.setAttribute(
      "data-readable-font",
      nextSettings.readableFont.toString(),
    );
    document.documentElement.setAttribute(
      "data-grayscale",
      nextSettings.grayscale.toString(),
    );

    localStorage.setItem("a11y-text-size", nextSettings.textSize);
    localStorage.setItem(
      "a11y-high-contrast",
      nextSettings.highContrast.toString(),
    );
    localStorage.setItem(
      "a11y-reduce-motion",
      nextSettings.reduceMotion.toString(),
    );
    localStorage.setItem(
      "a11y-underline-links",
      nextSettings.underlineLinks.toString(),
    );
    localStorage.setItem(
      "a11y-readable-font",
      nextSettings.readableFont.toString(),
    );
    localStorage.setItem("a11y-grayscale", nextSettings.grayscale.toString());
  };

  const changeTextSize = (direction: -1 | 1) => {
    const currentIndex = TEXT_SIZES.indexOf(settings.textSize);
    const nextIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      TEXT_SIZES.length - 1,
    );

    applySettings({
      ...settings,
      textSize: TEXT_SIZES[nextIndex],
    });
  };

  const handleReset = () => {
    applySettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-end font-sans gap-4">
      {/* Widget Panel */}
      {isOpen && (
        <WidgetPanel
          settings={settings}
          applySettings={applySettings}
          changeTextSize={changeTextSize}
          handleReset={handleReset}
          setIsOpen={setIsOpen}
          TEXT_SIZES={TEXT_SIZES}
        />
      )}
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Settings"
        className="rounded-full bg-[#ac832e] p-3 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
      >
        <EyeIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
