import VisitTempleScriptProvider from "../components/visit-temple/VisitTempleScriptProvider";

export default async function Page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=visit-temple&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];

  try {
    const parsed = await pageRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <VisitTempleScriptProvider data={pageData[0]} />;
}
