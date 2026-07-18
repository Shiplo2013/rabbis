import VisitTempleScriptProvider from "../components/visit-temple/VisitTempleScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

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

  const parsed = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "visit-temple-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

  return <VisitTempleScriptProvider data={pageData[0]} />;
}
