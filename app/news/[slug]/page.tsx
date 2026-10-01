import SingleNewsScriptProvider from "@/app/components/news/SingleNewsScriptProvider";
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
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}&_fields=title,content,yoast_head_json`,
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
      "Communities",
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

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?acf_format=standard&slug=${slug}&_fields=id,acf,title,content`,
    {
      next: { revalidate: 60 },
    },
  );
  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?acf_format=standard&_fields=id,title,slug,excerpt,acf.gallery&per_page=100`,
    {
      next: { revalidate: 60 },
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!pageDataRes.ok || !postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageDataRes,
    [],
    `news-slug-page-${slug}`,
  );
  const postsData = await parseJsonResponse<any[]>(
    postsDataRes,
    [],
    "news-slug-posts",
  );

  // Find the index of the current post in the list of all posts
  const currentPostIndex = postsData.findIndex(
    (post: any) => post?.id === pageData[0]?.id,
  );
  // Determine the previous and next posts based on the current post index
  const prevPost =
    currentPostIndex > 0
      ? postsData[currentPostIndex - 1]
      : postsData[postsData.length - 1];
  const nextPost =
    currentPostIndex < postsData.length - 1
      ? postsData[currentPostIndex + 1]
      : postsData[0];
  // Navigation data for the current post
  const navigationData = {
    prevPost: prevPost
      ? {
          title: prevPost?.title?.rendered || "",
          link: `/news/${prevPost?.slug}`,
          image: prevPost?.acf?.gallery?.find(
            (item: any) => item.type === "image",
          )?.image,
        }
      : { title: "", link: "", image: undefined },
    nextPost: nextPost
      ? {
          title: nextPost?.title?.rendered || "",
          link: `/news/${nextPost?.slug}`,
          image: nextPost?.acf?.gallery?.find(
            (item: any) => item.type === "image",
          )?.image,
        }
      : { title: "", link: "", image: undefined },
  };

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <SingleNewsScriptProvider
      data={{ post: pageData[0], navigationData: navigationData }}
    />
  );
}
