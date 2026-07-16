import PastRabbisScriptProvider from "../components/past-rabbis/PastRabbisScriptProvider";

export default async function page() {
  let pageDataRes: Response | null = null;
  let postsDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=past-rabbis&_fields=id,acf`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?orderby=menu_order&order=asc&acf_format=standard&_fields=id,title,slug,acf&per_page=20`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch past-rabbis data:", error);
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];

  if (pageDataRes?.ok) {
    try {
      const parsed = await pageDataRes.json();
      pageData = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Failed to parse page data JSON:", error);
    }
  } else if (pageDataRes) {
    console.error("Failed to load past-rabbis page data:", pageDataRes.status);
  }

  if (postsDataRes?.ok) {
    try {
      const parsed = await postsDataRes.json();
      postsData = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse posts data JSON:", error);
    }
  } else if (postsDataRes) {
    console.error("Failed to load past-rabbis posts:", postsDataRes.status);
  }

  return (
    <PastRabbisScriptProvider
      data={{ pageData: pageData[0], posts: postsData }}
    />
  );
}
