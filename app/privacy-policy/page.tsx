import { wpFetch } from "@/app/lib/wpFetch";
import PrivacyPolicyScriptProvider from "../components/privacy-policy/PrivacyPolicyScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=privacy-policy&acf_format=standard&_fields=id,title,content`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    { id: 0, title: { rendered: "" }, content: { rendered: "" } },
  ];
  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "privacy-policy-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  return <PrivacyPolicyScriptProvider data={pageData[0]} />;
}
