import { wpFetch } from "@/app/lib/wpFetch";
import TestimonialsScriptProvider from "../components/testimonials/TestimonialsScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=testimonials&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageRes,
    [{ acf: {} }],
    "testimonials-page",
  );
  return <TestimonialsScriptProvider data={pageData[0]} />;
}
