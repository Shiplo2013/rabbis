import CyclePicturesScriptProvider from "../components/cycle-pictures/CyclePicturesScriptProvider";

export default async function page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=cycle-pictures&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee-posts?acf_format=standard&_fields=id,title,acf&per_page=20`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const categoryRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee_cat?_fields=id,count,name,slug,parent`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageDataRes, postsDataRes, categoryDataRes] = await Promise.all([
    pageRes,
    postsRes,
    categoryRes,
  ]);

  if (!pageDataRes.ok || !postsDataRes.ok || !categoryDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];
  let categoryData: any[] = [];

  try {
    const parsed = await pageDataRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  try {
    const parsed = await postsDataRes.json();
    postsData = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse posts data JSON:", error);
  }

  try {
    const parsed = await categoryDataRes.json();
    categoryData = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse category data JSON:", error);
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
