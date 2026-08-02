import { wpFetch } from "@/app/lib/wpFetch";
import DonationScriptProvider from "../components/donation/DonationScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=donation&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [{ acf: {} }];
  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "donation-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  return <DonationScriptProvider data={pageData[0]} />;
}
