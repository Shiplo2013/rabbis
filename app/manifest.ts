import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ישיבת חברון כנסת ישראל",
    short_name: "ישיבת חברון כנסת ישראל",
    description:
      "ישיבת חברון כנסת ישראל - מאה חמישים שנות תורה, מוסר וגדלות האדם. תולדות הישיבה, רבותיה ותלמידיה לדורותיהם.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
