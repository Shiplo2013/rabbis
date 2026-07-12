import YeshivaRabbisScriptProvider from "../components/yeshiva-rabbis/YeshivaRabbisScriptProvider";

export default async function Page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=yeshiva-rabbis&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: { section: [] } }];

  try {
    const parsed = await pageRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  // Get All posts from the Zatzel Graduates page
  const sections = Array.isArray(pageData[0]?.acf?.section)
    ? pageData[0].acf.section
    : [];

  const mappedSections = await Promise.all(
    sections.map(async (section: any) => {
      const sectionPostIds = (section?.section_posts || [])
        .map((post: any) => post?.ID || post?.id || post)
        .filter(Boolean);

      if (!sectionPostIds.length) {
        return {
          sectionTitle: section?.section_title || "",
          sectionContent: [],
        };
      }

      const sectionPostsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/yeshiva-rabbis?acf_format=standard&include=${sectionPostIds.join(",")}&orderby=include&per_page=100&_fields=id,slug,title,acf`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      );

      if (!sectionPostsResponse.ok) {
        return {
          sectionTitle: section?.section_title || "",
          sectionContent: [],
        };
      }

      let sectionPostsData: any[] = [];

      try {
        const parsed = await sectionPostsResponse.json();
        sectionPostsData = Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.error("Failed to parse section posts data JSON:", error);
      }

      const sectionContent = (sectionPostsData || []).map((post: any) => ({
        id: post?.id || "",
        title: post?.title?.rendered || "",
        image: post?.acf?.thumbnail || "",
      }));

      return {
        sectionTitle: section?.section_title || "",
        sectionContent,
      };
    }),
  );

  return (
    <YeshivaRabbisScriptProvider
      data={pageData[0]}
      postsData={mappedSections}
    />
  );
}
