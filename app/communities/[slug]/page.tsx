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

  let pageData = [
    {
      id: 0,
      title: { rendered: "" },
      acf: {
        subtitle: "",
        post_thumbnail: null,
        content: "",
        community_gallery: [],
        informations: {
          established: "",
          location: "",
          number_of_families: "",
        },
        community_events: [],
        community_news: [],
        community_updates: {
          updates_1: [],
          updates_2: [],
        },
      },
    },
  ];

  try {
    const parsedData = await pageRes.json();
    pageData = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <CommunitiesSlugScriptProvider data={pageData[0]} />;
}
