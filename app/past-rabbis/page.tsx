import PastRabbisScriptProvider from "../components/past-rabbis/PastRabbisScriptProvider";

export default async function page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=past-rabbis&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!pageDataRes.ok || !postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];

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

  return (
    <PastRabbisScriptProvider
      data={{ pageData: pageData[0], posts: postsData }}
    />
  );
}
