import CommunitiesSheetsScriptProviderV2 from "@/app/components/communites/CommunitiesSheetsScriptProviderV2";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?slug=issues-magazine&acf_format=standard&_fields=id,title,content,acf`,
    {
      next: { revalidate: 60 },
    },
  );

  const [pageResData] = await Promise.all([pageRes]);

  if (!pageResData.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData: any[] = [{}];

  const parsedPageData = await parseJsonResponse<any[]>(
    pageResData,
    pageData,
    "communities-sheets-page",
  );
  pageData = Array.isArray(parsedPageData) ? parsedPageData : [parsedPageData];

  return (
    <CommunitiesSheetsScriptProviderV2
      data={{
        pageData: pageData[0],
      }}
    />
  );
}
