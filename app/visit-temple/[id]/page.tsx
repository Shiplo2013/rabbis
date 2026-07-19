import VisitTempleScriptProviderID from "@/app/components/visit-temple/VisitTempleScriptProviderID";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";

export default async function Page({ params }: { params: { id: string } }) {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=visit-temple&_fields=id,acf`,
    {
      next: { revalidate: 604800 }, // Cache data for 7 days
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageRes,
    [{}],
    "visit-temple-id-page",
  );
  return <VisitTempleScriptProviderID data={pageData[0]} />;
}
