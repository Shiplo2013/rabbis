import CommunitiesSlugScriptProvider from "@/app/components/communites/CommunitesSlugScriptProvider";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?acf_format=standard&slug=${slug}&_fields=id,acf,title`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await pageRes.json();

  return <CommunitiesSlugScriptProvider data={pageData[0]} />;
}
