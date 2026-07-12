import TestimonialsScriptProvider from "../components/testimonials/TestimonialsScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=testimonials&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await pageRes.json();
  return <TestimonialsScriptProvider data={pageData[0]} />;
}
