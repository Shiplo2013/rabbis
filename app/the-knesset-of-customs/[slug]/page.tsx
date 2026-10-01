import KnessetScriptProviderSlug from "@/app/components/knesset/KnessetScriptProviderSlug";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?slug=${slug}&_fields=title,content,yoast_head_json`,
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

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?slug=${slug}&acf_format=standard&_fields=id,title,acf,content`,
    {
      next: { revalidate: 60 },
    },
  );
  const allPostsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?_fields=id,title,slug&per_page=100`,
    {
      next: { revalidate: 60 },
    },
  );

  const [postsDataRes, allPostsDataRes] = await Promise.all([
    postsRes,
    allPostsRes,
  ]);

  if (!postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!allPostsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const postsData = await parseJsonResponse<any[]>(
    postsDataRes,
    [],
    `knesset-slug-post-${slug}`,
  );
  const allPostsData = await parseJsonResponse<any[]>(
    allPostsDataRes,
    [],
    "knesset-slug-all-posts",
  );

  if (!postsData || postsData.length === 0) {
    notFound();
  }

  return (
    <KnessetScriptProviderSlug
      data={{ postsData: postsData[0], allPostsData: allPostsData }}
    />
  );
}
