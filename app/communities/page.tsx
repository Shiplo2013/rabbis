import CommunitiesScriptProvider from "../components/communites/CommunitesScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=communities&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }
  const pageData = await pageRes.json();
  // Get selected categories from ACF field
  const categories = Array.isArray(pageData[0]?.acf?.select_categories)
    ? pageData[0].acf.select_categories
    : [];
  const validCategoryQuery = categories.map(async (item: any) => {
    const categoryId = item?.term_id;
    const categoryTitle = item?.name;
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?communities_cat=${categoryId}&orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf.subtitle,acf.post_thumbnail&per_page=10`,
      {
        next: { revalidate: 86400 }, // Cache data for 24 hours
        cache: "force-cache",
      },
    );
    if (!categoryRes.ok) {
      console.error(
        `Failed to load category data for category ID: ${categoryId}`,
      );
      return null;
    }
    try {
      const categoryPosts = await categoryRes.json();
      return {
        categoryId,
        categoryTitle,
        posts: categoryPosts,
      };
    } catch (error) {
      console.error(
        `Failed to parse JSON for category ID: ${categoryId}`,
        error,
      );
      return null;
    }
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
