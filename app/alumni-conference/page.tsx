import ConferenceScriptProvider from "../components/alumni-conference/ConferenceScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=alumni-conference&_fields=id,title,content,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    { id: 0, title: { rendered: "" }, content: { rendered: "" }, acf: {} },
  ];

  try {
    const parsed = await pageRes.json();
    pageData = Array.isArray(parsed) ? parsed : [parsed];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <ConferenceScriptProvider data={pageData[0]} />;
}
