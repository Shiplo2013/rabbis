import PastRabbisScriptProvider2 from "@/app/components/past-rabbis/PastRabbisScriptProvider2";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=past-rabbis&_fields=title,content,yoast_head_json`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );
  let pageData = [
    {
      title: { rendered: "" },
      content: { rendered: "" },
      yoast_head_json: {
        title: "",
        description: "",
        og_description: "",
        og_title: "",
        robots: {
          index: "",
          follow: "",
        },
        canonical: "",
      },
    },
  ];
  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "home-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  const yoast = pageData[0]?.yoast_head_json;
  const url = new URL(yoast?.canonical);
  url.hostname = "www.chevronyeshiva.org";

  return {
    title:
      yoast?.title ||
      yoast?.og_title ||
      pageData[0]?.title?.rendered ||
      "Past Rabbis",
    description:
      yoast?.description ||
      yoast?.og_description ||
      pageData[0]?.content?.rendered ||
      "",

    alternates: {
      canonical: url.href,
    },
    robots: {
      index: yoast?.robots?.index === "index",
      follow: yoast?.robots?.follow === "follow",
    },
  };
}

export default async function page() {
  let pageDataRes: Response | null = null;
  let postsDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes] = await Promise.all([
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=past-rabbis&_fields=id,acf`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf&per_page=100`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch past-rabbis data:", error);
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];

  if (pageDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      pageDataRes,
      pageData,
      "past-rabbis-page",
    );
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } else if (pageDataRes) {
    console.error("Failed to load past-rabbis page data:", pageDataRes.status);
  }

  if (postsDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      postsDataRes,
      postsData,
      "past-rabbis-posts",
    );
    postsData = Array.isArray(parsed) ? parsed : [];
  } else if (postsDataRes) {
    console.error("Failed to load past-rabbis posts:", postsDataRes.status);
  }

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <PastRabbisScriptProvider2
      data={{ pageData: pageData[0], posts: postsData }}
    />
  );
}
