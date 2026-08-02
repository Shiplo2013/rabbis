import { wpFetch } from "@/app/lib/wpFetch";
import YeshivaGraduatesScriptProvider from "../components/yeshiva-graduates/YeshivaGraduatesScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function Page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=yeshiva-graduates&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];

  const parsed = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "yeshiva-graduates-page",
  );
  pageData = Array.isArray(parsed) ? parsed : [parsed];

  return <YeshivaGraduatesScriptProvider data={pageData[0]} />;
}
