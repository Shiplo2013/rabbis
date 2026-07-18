import CyclePicturesScriptProvider from "../components/cycle-pictures/CyclePicturesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  let pageDataRes: Response | null = null;
  let postsDataRes: Response | null = null;
  let categoryDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes, categoryDataRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=cycle-pictures&_fields=id,acf`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee-posts?acf_format=standard&_fields=id,title,acf&per_page=20`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee_cat?_fields=id,count,name,slug,parent`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch cycle-pictures data:", error);
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];
  let categoryData: any[] = [];

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
    postsData = Array.isArray(parsed) ? parsed : [];
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
        postsData: postsData,
        categoryData: categoryData,
      }}
    />
  );
}
