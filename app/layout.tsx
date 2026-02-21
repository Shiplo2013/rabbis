import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "../app/components/Footer";
import Header from "../app/components/Header";
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
        <main id="page" className="main opacity-0 relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
