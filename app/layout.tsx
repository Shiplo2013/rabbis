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
      path: "../app/assets/fonts/LavaPro_HLThin.woff2",
      weight: "100",
      style: "normal",
    },
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

// async function getGlobalData() {
//   // Next.js automatically caches and memoizes this native fetch request
//   const headerRes = fetch(
//     "https://dovp7.sg-host.com/wp-json/wp/v2/pages?slug=header&_fields=id,acf",
//     {
//       next: { revalidate: 86400 }, // Cache data for 24 hours
//       cache: "force-cache",
//     },
//   );
//   const footerRes = fetch(
//     "https://dovp7.sg-host.com/wp-json/wp/v2/pages?slug=footer&_fields=id,acf",
//     {
//       next: { revalidate: 86400 }, // Cache data for 24 hours
//       cache: "force-cache",
//     },
//   );

//   const [headerData, footerData] = await Promise.all([headerRes, footerRes]);

//   if (!headerData.ok || !footerData.ok) {
//     throw new Error("Failed to load data.");
//   }
//   const header = await headerData.json();
//   const footer = await footerData.json();

//   return {
//     header,
//     footer,
//   };
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const globalData = await getGlobalData();
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${customFont.className} antialiased bg-black text-white overflow-hidden`}
      >
        {/* <Header2 data={globalData?.header} animationStatus={true} /> */}
        {children}
      </body>
    </html>
  );
}
