import { wpFetch } from "@/app/lib/wpFetch";
import CyclePicturesScriptProvider from "../components/cycle-pictures/CyclePicturesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  let pageDataRes: Response | null = null;
  let postsDataRes: Response | null = null;
  let categoryDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes, categoryDataRes] = await Promise.all([
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=cycle-pictures&_fields=id,acf`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee-posts?acf_format=standard&_fields=id,title,acf,committee_cat&per_page=100&page=1`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
      wpFetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee_cat?_fields=id,count,name,slug,parent`,
        {
          next: { revalidate: 60 }, // Cache data for 1 minute
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch cycle-pictures data:", error);
  }

  let pageData = [{ id: 0, acf: {} }];
  let postsData: any[] = [];
  let categoryData: any[] = [];
  let paginatedPosts: any[][] = [];
  let totalPages;

  if (pageDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      pageDataRes,
      pageData,
      "cycle-pictures-page",
    );
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } else if (pageDataRes) {
    console.error(
      "Failed to load cycle-pictures page data:",
      pageDataRes.status,
    );
  }

  if (postsDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      postsDataRes,
      postsData,
      "cycle-pictures-posts",
    );
    totalPages = postsDataRes.headers.get("X-WP-TotalPages");
    postsData = Array.isArray(parsed) ? parsed : [];
    // Seperate posts in a array by 10 posts per page
    // for (let i = 0; i < postsData.length; i += 10) {
    //   paginatedPosts.push(postsData.slice(i, i + 10));
    // }
  } else if (postsDataRes) {
    console.error("Failed to load cycle-pictures posts:", postsDataRes.status);
  }

  if (categoryDataRes?.ok) {
    const parsed = await parseJsonResponse<any[]>(
      categoryDataRes,
      categoryData,
      "cycle-pictures-categories",
    );
    categoryData = Array.isArray(parsed) ? parsed : [];
  } else if (categoryDataRes) {
    console.error(
      "Failed to load cycle-pictures categories:",
      categoryDataRes.status,
    );
  }

  return (
    <CyclePicturesScriptProvider
      data={{
        pageData: pageData[0],
        postsData: { posts: postsData, totalPage: totalPages },
        categoryData: categoryData,
      }}
    />
  );
}
