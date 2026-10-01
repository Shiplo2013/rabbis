import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CyclePicturesScriptProvider from "../components/cycle-pictures/CyclePicturesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=cycle-pictures&_fields=title,content,yoast_head_json`,
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
      "Cycle Pictures",
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
  let categoryDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes, categoryDataRes] = await Promise.all([
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=cycle-pictures&_fields=id,acf`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee-posts?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,acf,committee_cat&per_page=100&page=1`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee_cat?order=asc&_fields=id,count,name,slug,parent&per_page=100&page=1`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch cycle-pictures data:", error);
  }

  let pageData = [{ id: 0, acf: {} }];
  let postsData: any[] = [];
  let categoryData: any[] = [];
  let paginatedPosts: any[][] = [];
  let totalPages;

  if (pageDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      pageDataRes,
      pageData,
      "cycle-pictures-page",
    );
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } else if (pageDataRes) {
    console.error(
      "Failed to load cycle-pictures page data:",
      pageDataRes.status,
    );
  }

  if (postsDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      postsDataRes,
      postsData,
      "cycle-pictures-posts",
    );
    totalPages = postsDataRes.headers.get("X-WP-TotalPages");
    postsData = Array.isArray(parsed) ? parsed : [];
    // Seperate posts in a array by 10 posts per page
    // for (let i = 0; i < postsData.length; i += 10) {
    //   paginatedPosts.push(postsData.slice(i, i + 10));
    // }
  } else if (postsDataRes) {
    console.error("Failed to load cycle-pictures posts:", postsDataRes.status);
  }

  if (categoryDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      categoryDataRes,
      categoryData,
      "cycle-pictures-categories",
    );
    categoryData = Array.isArray(parsed) ? parsed : [];
  } else if (categoryDataRes) {
    console.error(
      "Failed to load cycle-pictures categories:",
      categoryDataRes.status,
    );
  }

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <CyclePicturesScriptProvider
      data={{
        pageData: pageData[0],
        postsData: { posts: postsData, totalPage: totalPages },
        categoryData: categoryData,
      }}
    />
  );
}
