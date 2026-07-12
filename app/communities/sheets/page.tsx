import CommunitiesSheetsScriptProvider from "@/app/components/communites/CommunitySheetsScriptProvider";

export default async function page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=issues-magazine&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const categoryRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines_cat?&_fields=id,count,parent,name&per_page=100`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines?acf_format=standard&_fields=id,title,acf&per_page=10`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageResData, categoryResData, postsResData] = await Promise.all([
    pageRes,
    categoryRes,
    postsRes,
  ]);

  if (!pageResData.ok || !categoryResData.ok || !postsResData.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{}],
    categoryData = [],
    postsData = [];

  try {
    const parsedPageData = await pageResData.json();
    pageData = Array.isArray(parsedPageData)
      ? parsedPageData
      : [parsedPageData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  try {
    categoryData = await categoryResData.json();
    if (!Array.isArray(categoryData)) categoryData = [];
  } catch (error) {
    console.error("Failed to parse category data JSON:", error);
  }

  try {
    postsData = await postsResData.json();
    if (!Array.isArray(postsData)) postsData = [];
  } catch (error) {
    console.error("Failed to parse posts data JSON:", error);
  }

  // Get all top level categories (parent = 0) with their child categories
  const topLevelCategories = categoryData.filter(
    (cat: any) => cat.parent === 0,
  );
  const categoriesWithChildren = topLevelCategories.map((topCat: any) => {
    const childCategories = categoryData.filter(
      (cat: any) => cat.parent === topCat.id,
    );
    return { ...topCat, children: childCategories };
  });

  return (
    <CommunitiesSheetsScriptProvider
      data={{
        pageData: pageData[0],
        postsData: postsData,
        categoriesTree: categoriesWithChildren,
      }}
    />
  );
}
