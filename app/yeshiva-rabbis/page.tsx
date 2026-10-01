import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import YeshivaRabbisScriptProvider from "../components/yeshiva-rabbis/YeshivaRabbisScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=yeshiva-rabbis&_fields=title,content,yoast_head_json`,
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
      "Yeshiva Rabbis",
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
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=yeshiva-rabbis&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: { section: [] } }];

  const parsed = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "yeshiva-rabbis-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

  // Get All posts from the Zatzel Graduates page
  const sections = Array.isArray(pageData[0]?.acf?.section)
    ? pageData[0].acf.section
    : [];

  const mappedSections = await Promise.all(
    sections.map(async (section: any) => {
      const sectionPostIds = (section?.section_posts || [])
        .map((post: any) => post?.ID || post?.id || post)
        .filter(Boolean);

      if (!sectionPostIds.length) {
        return {
          sectionTitle: section?.section_title || "",
          sectionContent: [],
        };
      }

      const sectionPostsResponse = await wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/yeshiva-rabbis?acf_format=standard&include=${sectionPostIds.join(",")}&orderby=include&per_page=100&_fields=id,slug,title,acf`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      );

      if (!sectionPostsResponse.ok) {
        return {
          sectionTitle: section?.section_title || "",
          sectionContent: [],
        };
      }

      const parsedSectionPosts = await parseJsonResponse<any[]>(
        sectionPostsResponse,
        [],
        `yeshiva-rabbis-section-${section?.section_title || "unknown"}`,
      );
      const sectionPostsData = Array.isArray(parsedSectionPosts)
        ? parsedSectionPosts
        : [];

      const sectionContent = (sectionPostsData || []).map((post: any) => ({
        id: post?.id || "",
        title: post?.title?.rendered || "",
        image: post?.acf?.thumbnail || "",
      }));

      return {
        sectionTitle: section?.section_title || "",
        sectionContent,
      };
    }),
  );

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <YeshivaRabbisScriptProvider
      data={pageData[0]}
      postsData={mappedSections}
    />
  );
}
