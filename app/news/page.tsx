import NewsScriptProvider from "../components/news/NewsScriptProvider";

export default async function page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=news&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!pageDataRes.ok || !postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      acf: {
        introduction: {
          title: "",
          content: "",
          background: null,
        },
      },
    },
  ];
  let postsData: any[] = [];

  try {
    const parsedPageData = await pageDataRes.json();
    pageData = Array.isArray(parsedPageData)
      ? parsedPageData
      : [parsedPageData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  try {
    const parsedPostsData = await postsDataRes.json();
    postsData = Array.isArray(parsedPostsData) ? parsedPostsData : [];
  } catch (error) {
    console.error("Failed to parse posts data JSON:", error);
  }

  return <NewsScriptProvider data={pageData[0]} postsData={postsData} />;
}
