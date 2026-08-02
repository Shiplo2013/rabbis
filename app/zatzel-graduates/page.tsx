import { wpFetch } from "@/app/lib/wpFetch";
import ZatzelScriptProvider from "../components/zatzel/ZatzelScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=zatzel-graduates&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: { sections: [] } }];

  const parsed = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "zatzel-graduates-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

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

      const sectionPostsResponse = await wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/zatzel-graduates?acf_format=standard&include=${sectionPostIds.join(",")}&orderby=menu_order&order=asc&per_page=100&_fields=id,slug,title,acf`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      );

      if (!sectionPostsResponse.ok) {
        return {
          sectionTitle: section?.section_title || "",
          sectionContent: [],
        };
      }

      const parsedSectionPosts = await parseJsonResponse<any[]>(
        sectionPostsResponse,
        [],
        `zatzel-graduates-section-${section?.section_title || "unknown"}`,
      );
      const sectionPostsData = Array.isArray(parsedSectionPosts)
        ? parsedSectionPosts
        : [];

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

  return <ZatzelScriptProvider data={pageData[0]} postData={mappedSections} />;
}
