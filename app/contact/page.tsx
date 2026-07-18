import ContactScriptProvider from "../components/contact/ContactScriptProvider";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=contact&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      acf: {
        contact_info: {
          title: "",
          address: "",
          email: "",
          phone: "",
          wase_link: "",
        },
      },
    },
  ];

  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "contact-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  return <ContactScriptProvider data={pageData[0]} />;
}
