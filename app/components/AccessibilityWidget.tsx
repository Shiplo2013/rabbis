"use client";

import {
  Contrast,
  EyeOff,
  Minus,
  Plus,
  Type,
  Underline,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import EyeIcon from "../assets/icons/EyeIcon";

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
        <div className="w-72 rounded-lg border bg-white p-4 shadow-xl dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
              Accessibility Tools
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close settings"
              className="text-zinc-500 hover:text-zinc-700 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 text-black">
            {/* Text Size Control */}
            <div>
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                <Type className="h-4 w-4" /> Text Size
              </span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => changeTextSize(-1)}
                  aria-label="Decrease text size"
                  className="rounded border bg-zinc-100 p-1.5 text-zinc-700 dark:bg-zinc-700 dark:text-[#dddddd]"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <span className="min-w-14 rounded border bg-zinc-50 px-2 py-1 text-center text-xs font-semibold text-zinc-800 dark:bg-zinc-700 dark:text-[#dddddd]">
                  {settings.textSize.toUpperCase()}
                </span>

                <button
                  onClick={() => changeTextSize(1)}
                  aria-label="Increase text size"
                  className="rounded border bg-zinc-100 p-1.5 text-zinc-700 dark:bg-zinc-700 dark:text-[#dddddd]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 flex gap-1">
                {TEXT_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() =>
                      applySettings({ ...settings, textSize: size })
                    }
                    className={`flex-1 rounded px-2 py-1 text-xs border ${
                      settings.textSize === size
                        ? "bg-[#ac832e] text-white font-bold"
                        : "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-[#dddddd]"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <button
              onClick={() =>
                applySettings({
                  ...settings,
                  highContrast: !settings.highContrast,
                })
              }
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs border ${
                settings.highContrast
                  ? "bg-[#ac832e] text-white font-bold"
                  : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Contrast className="h-4 w-4" /> High Contrast
              </span>
              <span className="text-[10px] opacity-75">
                {settings.highContrast ? "ON" : "OFF"}
              </span>
            </button>

            {/* Reduce Motion */}
            <button
              onClick={() =>
                applySettings({
                  ...settings,
                  reduceMotion: !settings.reduceMotion,
                })
              }
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs border ${
                settings.reduceMotion
                  ? "bg-[#ac832e] text-white font-bold"
                  : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" /> Reduce Motion
              </span>
              <span className="text-[10px] opacity-75">
                {settings.reduceMotion ? "ON" : "OFF"}
              </span>
            </button>

            {/* Underline Links */}
            <button
              onClick={() =>
                applySettings({
                  ...settings,
                  underlineLinks: !settings.underlineLinks,
                })
              }
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs border ${
                settings.underlineLinks
                  ? "bg-[#ac832e] text-white font-bold"
                  : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Underline className="h-4 w-4" /> Underline Links
              </span>
              <span className="text-[10px] opacity-75">
                {settings.underlineLinks ? "ON" : "OFF"}
              </span>
            </button>

            {/* Readable Font */}
            <button
              onClick={() =>
                applySettings({
                  ...settings,
                  readableFont: !settings.readableFont,
                })
              }
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs border ${
                settings.readableFont
                  ? "bg-[#ac832e] text-white font-bold"
                  : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Type className="h-4 w-4" /> Readable Font
              </span>
              <span className="text-[10px] opacity-75">
                {settings.readableFont ? "ON" : "OFF"}
              </span>
            </button>

            {/* Grayscale */}
            <button
              onClick={() =>
                applySettings({
                  ...settings,
                  grayscale: !settings.grayscale,
                })
              }
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-xs border ${
                settings.grayscale
                  ? "bg-[#ac832e] text-white font-bold"
                  : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Contrast className="h-4 w-4" /> Grayscale
              </span>
              <span className="text-[10px] opacity-75">
                {settings.grayscale ? "ON" : "OFF"}
              </span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full rounded bg-zinc-200 py-1.5 text-xs text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-600 dark:text-[#dddddd] dark:hover:bg-zinc-500"
            >
              Reset Settings
            </button>
          </div>
        </div>
      )}
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility Settings"
        className="rounded-full bg-[#ac832e] p-3 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
      >
        <EyeIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
