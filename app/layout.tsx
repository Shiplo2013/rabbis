import { wpFetch } from "@/app/lib/wpFetch";
import type { Metadata } from "next";
import localFont from "next/font/local";
import AccessibilityWidget from "./components/AccessibilityWidget";
import { AppProvider } from "./components/AppContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageFixedElements from "./components/PageFixedElements";
import "./globals.css";
import { parseJsonResponse } from "./lib/parseJsonResponse";
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
  const headerRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=header&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 60 },
    },
  );
  const headerCommunityRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=header-community&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 60 },
    },
  );
  const footerRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=footer&acf_format=standard&_fields=id,acf`,
    {
      next: { revalidate: 60 },
    },
  );

  const [headerDataRes, headerCommunityDataRes, footerDataRes] =
    await Promise.all([headerRes, headerCommunityRes, footerRes]);

  if (!headerDataRes.ok || !headerCommunityDataRes.ok || !footerDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let headerData = [
    {
      acf: {
        header_logo: [],
        header_right: {
          donation_button: {
            title: "",
            link: "",
          },
          menu: [
            {
              title: "",
              link: "",
              have_sub_menu: false,
              sub_menu: [],
            },
          ],
        },
        header_top: {
          community_button: {
            title: "",
            link: "",
          },
          donation_button: {
            title: "",
            link: "",
          },
          music_button: {
            title: "",
            link: "",
          },
        },
        hamburger_menu: {
          left_menu: {
            menu_title: "",
            menu_title_link: "",
            menu_1: [
              {
                title: "",
                link: "",
                have_sub_menu: false,
                sub_menu: [],
              },
            ],
            menu_2: [
              {
                title: "",
                link: "",
              },
            ],
          },
          right_menu: {
            menu_title: "",
            menu_title_link: "",
            menu_1: [
              {
                title: "",
                link: "",
                have_sub_menu: false,
                sub_menu: [],
              },
            ],
            menu_2: [
              {
                title: "",
                link: "",
              },
            ],
            menu_3: [
              {
                title: "",
                link: "",
              },
            ],
          },
        },
      },
    },
  ];
  let headerCommunityData = [
    {
      acf: {
        header_left: [
          {
            title: "",
            link: "",
          },
        ],
        header_right: [
          {
            title: "",
            link: "",
          },
        ],
        sidebar: {
          title: "",
          sidebar_events: [
            {
              title: "",
              link: "",
              text: "",
              date: "",
            },
          ],
          sidebar_news: [
            {
              title: "",
              link: "",
              text: "",
              date: "",
            },
          ],
        },
      },
    },
  ];
  let footerData = [
    {
      acf: {
        big_menu: [
          {
            title: "",
            link: "",
            image: [],
          },
        ],
        footer_menu: [
          {
            title: "",
            link: "",
          },
        ],
        widget_1: {
          widget_title: "",
          content: "",
        },
        widget_2: {
          widget_title: "",
          content: "",
        },
        widget_3: {
          menu_items: [
            {
              title: "",
              link: "",
            },
          ],
        },
      },
    },
  ];

  const parsedHeaderData = await parseJsonResponse<any[]>(
    headerDataRes,
    headerData,
    "layout-header",
  );
  headerData = Array.isArray(parsedHeaderData)
    ? parsedHeaderData
    : [parsedHeaderData];

  const parsedHeaderCommunityData = await parseJsonResponse<any[]>(
    headerCommunityDataRes,
    headerCommunityData,
    "layout-header-community",
  );
  headerCommunityData = Array.isArray(parsedHeaderCommunityData)
    ? parsedHeaderCommunityData
    : [parsedHeaderCommunityData];

  const parsedFooterData = await parseJsonResponse<any[]>(
    footerDataRes,
    footerData,
    "layout-footer",
  );
  footerData = Array.isArray(parsedFooterData)
    ? parsedFooterData
    : [parsedFooterData];

  return {
    header: headerData[0],
    headerCommunity: headerCommunityData[0],
    footer: footerData[0],
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
            header: globalData.header,
            headerCommunity: globalData.headerCommunity,
            footer: globalData.footer,
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
            <AccessibilityWidget />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
