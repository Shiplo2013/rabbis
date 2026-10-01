import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TestimonialsScriptProvider from "../components/testimonials/TestimonialsScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=testimonials&_fields=title,content,yoast_head_json`,
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
      "Testimonials",
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
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=testimonials&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageRes,
    [{ acf: {} }],
    "testimonials-page",
  );

  if (!pageData[0]) {
    return notFound();
  }

  return <TestimonialsScriptProvider data={pageData[0]} />;
}
