import MicIcon from "@/app/assets/icons/MicIcon";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "../app/components/Header";
import Footer from "./components/Footer";
import LoadingEffect from "./components/LoadingEffect";
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
      <body className={`${customFont.className} antialiased`}>
        <LoadingEffect />
        <Header />
        <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden"
        >
          {children}
        </main>
        <Footer />

        <div
          id="cursorFollower"
          className={`fixed left-0 top-0 z-50 pointer-events-none flex justify-center items-center opacity-0 w-21 h-21 rounded-full bg-[#C3A13FB2] -ml-10.5 -mt-10.5`}
        >
          <MicIcon />
        </div>
      </body>
    </html>
  );
}
