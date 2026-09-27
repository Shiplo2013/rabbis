import { wpFetch } from "@/app/lib/wpFetch";
import ConferenceScriptProvider from "../components/alumni-conference/ConferenceScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=alumni-conference&_fields=id,title,content,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  let pageData = [
    { id: 0, title: { rendered: "" }, content: { rendered: "" }, acf: {} },
  ];

  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "alumni-conference-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  return <ConferenceScriptProvider data={pageData[0]} />;
}
