import { wpFetch } from "@/app/lib/wpFetch";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CommunitiesScriptProvider from "../components/communites/CommunitesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export async function generateMetadata(): Promise<Metadata> {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=communities&_fields=title,content,yoast_head_json`,
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

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=communities&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }
  const pageData = await parseJsonResponse<any[]>(
    pageRes,
    [{ acf: { select_categories: [] } }],
    "communities-page",
  );
  // Get selected categories from ACF field
  const categories = Array.isArray(pageData[0]?.acf?.select_categories)
    ? pageData[0].acf.select_categories
    : [];
  const validCategoryQuery = categories.map(async (item: any) => {
    const categoryId = item?.term_id;
    const categoryTitle = item?.name;
    const categoryRes = await wpFetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?communities_cat=${categoryId}&orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf.subtitle,acf.post_thumbnail&per_page=10`,
      {
        next: { revalidate: 60 }, // Cache data for 1 minute
      },
    );
    if (!categoryRes.ok) {
      console.error(
        `Failed to load category data for category ID: ${categoryId}`,
      );
      return null;
    }
    const categoryPosts = await parseJsonResponse<any[]>(
      categoryRes,
      [],
      `communities-category-${categoryId}`,
    );
    return {
      categoryId,
      categoryTitle,
      posts: categoryPosts,
    };
  });

  const validCategoryQueryResults = await Promise.all(validCategoryQuery);

  if (!pageData || !validCategoryQueryResults) {
    throw new Error("Failed to load data.");
  }

  const successfulCategories = validCategoryQueryResults.filter(
    (item): item is { categoryId: any; categoryTitle: any; posts: any[] } =>
      item !== null,
  );

  if (!pageData[0]) {
    return notFound();
  }

  return (
    <CommunitiesScriptProvider
      data={{ pageData: pageData[0], postsData: successfulCategories }}
    />
  );
}
