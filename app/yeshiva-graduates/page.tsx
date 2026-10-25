import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import YeshivaGraduatesScriptProvider from "../components/yeshiva-graduates/YeshivaGraduatesScriptProvider";
import { parseJsonResponseWithBackup } from "../lib/parseJsonResponseWithBackup";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=yeshiva-graduates&_fields=title,content,yoast_head_json`,
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
  const parsedData = await parseJsonResponseWithBackup<any[]>(
    pageRes,
    pageData,
    "yeshiva-graduates-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  const yoast = pageData[0]?.yoast_head_json;
  const url = new URL(
    yoast?.canonical || "/yeshiva-graduates",
    "https://www.chevronyeshiva.org",
  );
  url.hostname = "www.chevronyeshiva.org";

  return {
    title:
      yoast?.title ||
      yoast?.og_title ||
      pageData[0]?.title?.rendered ||
      "Yeshiva Graduates",
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
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=yeshiva-graduates&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  let pageData = [{ acf: {} }];

  const parsed = await parseJsonResponseWithBackup<any[]>(
    pageRes,
    pageData,
    "yeshiva-graduates-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

  if (!pageData[0]) {
    return notFound();
  }

  return <YeshivaGraduatesScriptProvider data={pageData[0]} />;
}
