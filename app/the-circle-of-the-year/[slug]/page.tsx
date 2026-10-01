import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MusicScriptProvider from "../../components/music/MusicScriptProvider";
import { parseJsonResponse } from "../../lib/parseJsonResponse";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-circle-of-the-year&_fields=title,content,yoast_head_json`,
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
      "The Circle of the Year",
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

export default async function Page() {
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-circle-of-the-year&_fields=id,acf`,
    {
      next: { revalidate: 60 },
    },
  );

  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/holidays?acf_format=standard&_fields=id,title,slug,acf&per_page=10`,
    {
      next: { revalidate: 60 },
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!pageDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageDataRes,
    [{}],
    "circle-of-year-slug-page",
  );
  const postsData = await parseJsonResponse<any[]>(
    postsDataRes,
    [],
    "circle-of-year-slug-posts",
  );

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <MusicScriptProvider
      data={{ pageData: pageData[0], postsData: postsData }}
    />
  );
}
