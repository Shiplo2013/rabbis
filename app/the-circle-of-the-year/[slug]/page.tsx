import { wpFetch } from "@/app/lib/wpFetch";
import MusicScriptProvider from "../../components/music/MusicScriptProvider";
import { parseJsonResponse } from "../../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-circle-of-the-year&_fields=id,acf`,
    {
      next: { revalidate: 60 },
    },
  );

  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/holidays?acf_format=standard&_fields=id,title,slug,acf&per_page=10`,
    {
      next: { revalidate: 60 },
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!pageDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageDataRes,
    [{}],
    "circle-of-year-slug-page",
  );
  const postsData = await parseJsonResponse<any[]>(
    postsDataRes,
    [],
    "circle-of-year-slug-posts",
  );

  return (
    <MusicScriptProvider
      data={{ pageData: pageData[0], postsData: postsData }}
    />
  );
}
