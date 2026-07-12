import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProvider } from "./components/AppContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageFixedElements from "./components/PageFixedElements";
import "./globals.css";
import SmoothWrapper from "./ui/SmoothWrapper";

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

async function getGlobalData() {
  // Next.js automatically caches and memoizes this native fetch request
  const headerRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=header&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const headerCommunityRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=header-community&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const footerRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=footer&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [headerData, headerCommunityData, footerData] = await Promise.all([
    headerRes,
    headerCommunityRes,
    footerRes,
  ]);

  if (!headerData.ok || !headerCommunityData.ok || !footerData.ok) {
    throw new Error("Failed to load data.");
  }
  const header = await headerData.json();
  const headerCommunity = await headerCommunityData.json();
  const footer = await footerData.json();

  return {
    header,
    headerCommunity,
    footer,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${customFont.className} antialiased bg-black text-white overflow-hidden`}
      >
        <AppProvider
          appData={{
            header: globalData.header[0],
            headerCommunity: globalData.headerCommunity[0],
            footer: globalData.footer[0],
          }}
        >
          <div id="main" className="relative min-h-screen min-w-screen">
            <Header />
            <div id="page-wrapper" className="relative opacity-0">
              <SmoothWrapper>
                {children}
                <Footer className={"relative z-20"} />
              </SmoothWrapper>
            </div>
            <PageFixedElements />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
