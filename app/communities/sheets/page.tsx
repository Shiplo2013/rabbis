import CommunitiesSheetsScriptProvider from "@/app/components/communites/CommunitySheetsScriptProvider";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=issues-magazine&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 300 }, // Cache data for 5 minutes
    },
  );
  const categoryRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines_cat?&_fields=id,count,parent,name&per_page=100`,
    {
      next: { revalidate: 300 }, // Cache data for 5 minutes
    },
  );
  const postsRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/magazines?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,acf&per_page=10`,
    {
      next: { revalidate: 300 }, // Cache data for 5 minutes
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

  let pageData: any[] = [{}],
    categoryData: any[] = [],
    postsData: any[] = [];

  const parsedPageData = await parseJsonResponse<any[]>(
    pageResData,
    pageData,
    "communities-sheets-page",
  );
  pageData = Array.isArray(parsedPageData) ? parsedPageData : [parsedPageData];

  categoryData = await parseJsonResponse<any[]>(
    categoryResData,
    categoryData,
    "communities-sheets-categories",
  );
  if (!Array.isArray(categoryData)) categoryData = [];

  postsData = await parseJsonResponse<any[]>(
    postsResData,
    postsData,
    "communities-sheets-posts",
  );
  const totalPages = postsResData.headers.get("X-WP-TotalPages");
  if (!Array.isArray(postsData)) postsData = [];

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
        postsData: { posts: postsData, totalPage: totalPages },
        categoriesTree: categoriesWithChildren,
      }}
    />
  );
}
