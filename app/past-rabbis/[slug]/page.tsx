import PastRabbisScriptProviderSlug from "@/app/components/past-rabbis/PastRabbisScriptProviderSlug";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let postsDataRes: Response | null = null;
  let allPostsDataRes: Response | null = null;

  try {
    [postsDataRes, allPostsDataRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&slug=${slug}&_fields=id,title,acf,content`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
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
    <PastRabbisScriptProviderSlug
      data={{ postsData: postsData[0] ?? {}, allPostsData }}
    />
  );
}
