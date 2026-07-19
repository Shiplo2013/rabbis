import { wpFetch } from "@/app/lib/wpFetch";
import YeshivaRabbisScriptProvider from "../components/yeshiva-rabbis/YeshivaRabbisScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=yeshiva-rabbis&_fields=id,acf`,
    {
      next: { revalidate: 604800 }, // Cache data for 7 days
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: { section: [] } }];

  const parsed = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "yeshiva-rabbis-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

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

      const sectionPostsResponse = await wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/yeshiva-rabbis?acf_format=standard&include=${sectionPostIds.join(",")}&orderby=include&per_page=100&_fields=id,slug,title,acf`,
        {
          next: { revalidate: 604800 }, // Cache data for 7 days
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
        `yeshiva-rabbis-section-${section?.section_title || "unknown"}`,
      );
      const sectionPostsData = Array.isArray(parsedSectionPosts)
        ? parsedSectionPosts
        : [];

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
