import MusicScriptProvider from "../../components/music/MusicScriptProvider";

export default async function Page() {
  const pageRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=the-circle-of-the-year&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const postsRes = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/holidays?acf_format=standard&_fields=id,title,slug,acf&per_page=10`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  if (!pageDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await pageDataRes.json();
  const postsData = await postsDataRes.json();

  return (
    <MusicScriptProvider
      data={{ pageData: pageData[0], postsData: postsData }}
    />
  );
}
