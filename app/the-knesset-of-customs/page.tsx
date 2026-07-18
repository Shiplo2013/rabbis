import KnessetScriptProvider from "../components/knesset/KnessetScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-knesset-of-customs&_fields=id,title,content,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const categoryRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset_cat?_fields=id,count,name,slug,parent`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageDataRes, categoryDataRes] = await Promise.all([
    pageRes,
    categoryRes,
  ]);

  if (!pageDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!categoryDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      title: { rendered: "" },
      content: { rendered: "" },
      acf: { read_more_button: { text: "", link: "" } },
    },
  ];
  let categoryData: any[] = [];

  const parsedPageData = await parseJsonResponse<any[]>(
    pageDataRes,
    pageData,
    "knesset-page",
  );
  pageData = Array.isArray(parsedPageData) ? parsedPageData : [parsedPageData];

  const parsedCategoryData = await parseJsonResponse<any[]>(
    categoryDataRes,
    categoryData,
    "knesset-categories",
  );
  categoryData = Array.isArray(parsedCategoryData) ? parsedCategoryData : [];

  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?orderby=menu_order&order=asc&_fields=id,title,slug,excerpt,acf.subtitle&per_page=100`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!postsRes.ok) {
    throw new Error("Failed to load data.");
  }

  let postsData: any[] = [];

  const parsedPostsData = await parseJsonResponse<any[]>(
    postsRes,
    postsData,
    "knesset-posts",
  );
  postsData = Array.isArray(parsedPostsData) ? parsedPostsData : [];

  return (
    <KnessetScriptProvider
      data={{
        pageData: {
          title: pageData[0]?.title?.rendered || "",
          content: pageData[0]?.content?.rendered || "",
          acf: pageData[0]?.acf || { read_more_button: { text: "", link: "" } },
        },
        categoriesData: categoryData,
        postsData: postsData,
      }}
    />
  );
}
