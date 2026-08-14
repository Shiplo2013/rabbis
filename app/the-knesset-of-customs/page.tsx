import { wpFetch } from "@/app/lib/wpFetch";
import KnessetScriptProvider from "../components/knesset/KnessetScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-knesset-of-customs&_fields=id,title,content,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );
  const categoryRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset_cat?_fields=id,count,name,slug,parent`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
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

  const postsRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?orderby=menu_order&order=asc&_fields=id,title,slug,excerpt,acf.subtitle,knesset_cat&per_page=100&page=1`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
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
  const totalPages = postsRes.headers.get("X-WP-TotalPages");

  return (
    <KnessetScriptProvider
      data={{
        pageData: {
          title: pageData[0]?.title?.rendered || "",
          content: pageData[0]?.content?.rendered || "",
          acf: pageData[0]?.acf || { read_more_button: { text: "", link: "" } },
        },
        categoriesData: categoryData,
        postsData: {
          posts: postsData,
          totalPage: totalPages,
        },
      }}
    />
  );
}
