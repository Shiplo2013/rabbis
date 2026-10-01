import CommunitiesSlugScriptProvider from "@/app/components/communites/CommunitesSlugScriptProvider";
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
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?slug=${slug}&_fields=title,content,yoast_head_json`,
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
  url.hostname = "www.chevronyeshiva.org/communities";

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
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?acf_format=standard&slug=${slug}&_fields=id,acf,title`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      id: 0,
      title: { rendered: "" },
      acf: {
        subtitle: "",
        post_thumbnail: null,
        content: "",
        community_gallery: [],
        informations: {
          established: "",
          location: "",
          number_of_families: "",
        },
        community_events: [],
        community_news: [],
        community_updates: {
          updates_1: [],
          updates_2: [],
        },
      },
    },
  ];

  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    `communities-slug-${slug}`,
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  if (!pageData[0]) {
    return notFound();
  }

  return <CommunitiesSlugScriptProvider data={pageData[0]} />;
}
