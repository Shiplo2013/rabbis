import PastRabbisScriptProviderSlug from "@/app/components/past-rabbis/PastRabbisScriptProviderSlug";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&slug=${slug}&_fields=id,title,acf,content`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const allPostsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
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

  const postsData = await postsDataRes.json();
  const allPostsData = await allPostsDataRes.json();
  return (
    <PastRabbisScriptProviderSlug
      data={{ postsData: postsData[0], allPostsData: allPostsData }}
    />
  );
}
