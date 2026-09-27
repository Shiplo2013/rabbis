import KnessetScriptProviderSlug from "@/app/components/knesset/KnessetScriptProviderSlug";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
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
