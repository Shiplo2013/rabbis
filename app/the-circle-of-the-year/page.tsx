import { wpFetch } from "@/app/lib/wpFetch";
import MusicScriptProvider from "../components/music/MusicScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-circle-of-the-year&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );

  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/holidays?acf_format=standard&_fields=id,title,slug,acf&per_page=10`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!pageDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];

  const parsedPageData = await parseJsonResponse<any[]>(
    pageDataRes,
    pageData,
    "circle-of-year-page",
  );
  pageData = Array.isArray(parsedPageData) ? parsedPageData : [parsedPageData];

  const parsedPostsData = await parseJsonResponse<any[]>(
    postsDataRes,
    postsData,
    "circle-of-year-posts",
  );
  postsData = Array.isArray(parsedPostsData) ? parsedPostsData : [];

  console.log("Posts Data:", postsData);

  return (
    <MusicScriptProvider
      data={{ pageData: pageData[0], postsData: postsData }}
    />
  );
}
