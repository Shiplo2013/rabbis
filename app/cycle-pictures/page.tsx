import CyclePicturesScriptProvider from "../components/cycle-pictures/CyclePicturesScriptProvider";

export default async function page() {
  let pageDataRes: Response | null = null;
  let postsDataRes: Response | null = null;
  let categoryDataRes: Response | null = null;

  try {
    [pageDataRes, postsDataRes, categoryDataRes] = await Promise.all([
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=cycle-pictures&_fields=id,acf`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee-posts?acf_format=standard&_fields=id,title,acf&per_page=20`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
      fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/committee_cat?_fields=id,count,name,slug,parent`,
        {
          next: { revalidate: 86400 }, // Cache data for 24 hours
          cache: "force-cache",
        },
      ),
    ]);
  } catch (error) {
    console.error("Failed to fetch cycle-pictures data:", error);
  }

  let pageData = [{ acf: {} }];
  let postsData: any[] = [];
  let categoryData: any[] = [];

  if (pageDataRes?.ok) {
    try {
      const parsed = await pageDataRes.json();
      pageData = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
      console.error("Failed to parse page data JSON:", error);
    }
  } else if (pageDataRes) {
    console.error(
      "Failed to load cycle-pictures page data:",
      pageDataRes.status,
    );
  }

  if (postsDataRes?.ok) {
    try {
      const parsed = await postsDataRes.json();
      postsData = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse posts data JSON:", error);
    }
  } else if (postsDataRes) {
    console.error("Failed to load cycle-pictures posts:", postsDataRes.status);
  }

  if (categoryDataRes?.ok) {
    try {
      const parsed = await categoryDataRes.json();
      categoryData = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse category data JSON:", error);
    }
  } else if (categoryDataRes) {
    console.error(
      "Failed to load cycle-pictures categories:",
      categoryDataRes.status,
    );
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
