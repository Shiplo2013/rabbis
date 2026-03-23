import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rabbis",
  description: "מאה חמישים שנות תורה, מוסר וגדלות האדם",
};

const customFont = localFont({
  src: [
    {
      path: "../app/assets/fonts/LavaPro_HL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/LavaPro_HL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/LavaPro_HL-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/LavaPro_HLBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--custom-font",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${customFont.className} antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
