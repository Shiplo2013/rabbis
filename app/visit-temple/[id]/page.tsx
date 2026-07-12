import VisitTempleScriptProviderID from "@/app/components/visit-temple/VisitTempleScriptProviderID";

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

  const pageData = await pageRes.json();
  return <VisitTempleScriptProviderID data={pageData[0]} />;
}
