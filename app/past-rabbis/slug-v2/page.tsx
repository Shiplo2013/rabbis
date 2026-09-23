import PastRabbisScriptProviderSlugV2 from "@/app/components/past-rabbis/PastRabbisScriptProviderSlugV2";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";

export default async function Page() {
  const slug = "רבי-נתן-נטע-צבי-פינקל";
  let postsDataRes: Response | null = null;
  let allPostsDataRes: Response | null = null;

  try {
    [postsDataRes, allPostsDataRes] = await Promise.all([
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&slug=${slug}&_fields=id,title,acf,content`,
        {
          next: { revalidate: 60 },
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
        {
          next: { revalidate: 60 },
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch past-rabbis slug data:", error);
  }

  let postsData: any[] = [];
  let allPostsData: any[] = [];

  if (postsDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      postsDataRes,
      postsData,
      `past-rabbis-slug-${slug}`,
    );
    postsData = Array.isArray(parsed) ? parsed : [];
  } else if (postsDataRes) {
    console.error("Failed to load past-rabbis slug post:", postsDataRes.status);
  }

  if (allPostsDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      allPostsDataRes,
      allPostsData,
      "past-rabbis-all-posts",
    );
    allPostsData = Array.isArray(parsed) ? parsed : [];
  } else if (allPostsDataRes) {
    console.error(
      "Failed to load past-rabbis all posts:",
      allPostsDataRes.status,
    );
  }

  return (
    <PastRabbisScriptProviderSlugV2
      data={{ postsData: postsData[0] ?? {}, allPostsData }}
    />
  );
}
