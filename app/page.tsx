import HomeScriptProvider from "./components/home/HomeScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=home&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      id: 0,
      slug: "home",
      link: "/",
      title: { rendered: "Home" },
      acf: {},
    },
  ];
  try {
    const parsedData = await pageRes.json();
    pageData = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <HomeScriptProvider data={pageData[0]} />;
}
