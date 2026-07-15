import PrivacyPolicyScriptProvider from "../components/privacy-policy/PrivacyPolicyScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=privacy-policy&acf_format=standard&_fields=id,title,content`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    { id: 0, title: { rendered: "" }, content: { rendered: "" } },
  ];
  try {
    const parsedData = await pageRes.json();
    pageData = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <PrivacyPolicyScriptProvider data={pageData[0]} />;
}
