import ContactScriptProvider from "../components/contact/ContactScriptProvider";

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

  try {
    const parsedData = await pageRes.json();
    pageData = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  return <ContactScriptProvider data={pageData[0]} />;
}
