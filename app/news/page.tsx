import { wpFetch } from "@/app/lib/wpFetch";
import NewsScriptProvider from "../components/news/NewsScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=news&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );
  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!pageDataRes.ok || !postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      acf: {
        introduction: {
          title: "",
          content: "",
          background_image: null,
        },
      },
    },
  ];
  let postsData: any[] = [];

  const parsedPageData = await parseJsonResponse<any[]>(
    pageDataRes,
    pageData,
    "news-page",
  );
  pageData = Array.isArray(parsedPageData) ? parsedPageData : [parsedPageData];

  const parsedPostsData = await parseJsonResponse<any[]>(
    postsDataRes,
    postsData,
    "news-posts",
  );
  postsData = Array.isArray(parsedPostsData) ? parsedPostsData : [];

  return <NewsScriptProvider data={pageData[0]} postsData={postsData} />;
}
