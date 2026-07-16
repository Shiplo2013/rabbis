import KnessetScriptProvider from "../components/knesset/KnessetScriptProvider";

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

  try {
    const parsed = await pageDataRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  try {
    const parsed = await categoryDataRes.json();
    categoryData = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse category data JSON:", error);
  }

  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?orderby=menu_order&order=asc&_fields=id,title,slug,excerpt,acf.subtitle&per_page=20`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!postsRes.ok) {
    throw new Error("Failed to load data.");
  }

  let postsData: any[] = [];

  try {
    const parsed = await postsRes.json();
    postsData = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse posts data JSON:", error);
  }

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
