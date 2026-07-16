import ZatzelScriptProvider from "../components/zatzel/ZatzelScriptProvider";

export default async function Page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=zatzel-graduates&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: { sections: [] } }];

  try {
    const parsed = await pageRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  // Get All posts from the Zatzel Graduates page
  const sections = Array.isArray(pageData[0]?.acf?.sections)
    ? pageData[0].acf.sections
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
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/zatzel-graduates?acf_format=standard&include=${sectionPostIds.join(",")}&orderby=include&per_page=100&_fields=id,slug,title,acf`,
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
        title: post?.title?.rendered || post?.acf?.popup?.title || "",
        image: post?.acf?.thumbnail || "",
        yearOfDeath: post?.acf?.year_of_death || "",
        popup: post?.acf?.popup || "",
      }));

      return {
        sectionTitle: section?.section_title || "",
        sectionContent,
      };
    }),
  );

  console.log(pageData[0]);

  return <ZatzelScriptProvider data={pageData[0]} postData={mappedSections} />;
}
