import { wpFetch } from "@/app/lib/wpFetch";
import CommunitiesScriptProvider from "../components/communites/CommunitesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=communities&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }
  const pageData = await parseJsonResponse<any[]>(
    pageRes,
    [{ acf: { select_categories: [] } }],
    "communities-page",
  );
  // Get selected categories from ACF field
  const categories = Array.isArray(pageData[0]?.acf?.select_categories)
    ? pageData[0].acf.select_categories
    : [];
  const validCategoryQuery = categories.map(async (item: any) => {
    const categoryId = item?.term_id;
    const categoryTitle = item?.name;
    const categoryRes = await wpFetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?communities_cat=${categoryId}&orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf.subtitle,acf.post_thumbnail&per_page=10`,
      {
        next: { revalidate: 60 }, // Cache data for 1 minute
      },
    );
    if (!categoryRes.ok) {
      console.error(
        `Failed to load category data for category ID: ${categoryId}`,
      );
      return null;
    }
    const categoryPosts = await parseJsonResponse<any[]>(
      categoryRes,
      [],
      `communities-category-${categoryId}`,
    );
    return {
      categoryId,
      categoryTitle,
      posts: categoryPosts,
    };
  });

  const validCategoryQueryResults = await Promise.all(validCategoryQuery);

  if (!pageData || !validCategoryQueryResults) {
    throw new Error("Failed to load data.");
  }

  const successfulCategories = validCategoryQueryResults.filter(
    (item): item is { categoryId: any; categoryTitle: any; posts: any[] } =>
      item !== null,
  );

  return (
    <CommunitiesScriptProvider
      data={{ pageData: pageData[0], postsData: successfulCategories }}
    />
  );
}
