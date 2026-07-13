import HistoryScriptProvider from "../components/history/HistoryScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=chronicles&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await pageRes.json();

  const params1 = new URLSearchParams({
    include: pageData[0].acf?.timeline_1?.past_rabbis_section?.past_rabbis,
    per_page: String(
      pageData[0].acf?.timeline_1?.past_rabbis_section?.past_rabbis.length,
    ),
    orderby: "include",
    order: "asc",
  });
  const params2 = new URLSearchParams({
    include: pageData[0].acf?.timeline_2?.past_rabbis_section?.past_rabbis,
    per_page: String(
      pageData[0].acf?.timeline_2?.past_rabbis_section?.past_rabbis.length,
    ),
    orderby: "include",
    order: "asc",
  });
  const params3 = new URLSearchParams({
    include: pageData[0].acf?.timeline_3?.past_rabbis_section?.past_rabbis,
    per_page: String(
      pageData[0].acf?.timeline_3?.past_rabbis_section?.past_rabbis.length,
    ),
    orderby: "include",
    order: "asc",
  });
  const params4 = new URLSearchParams({
    include: pageData[0].acf?.timeline_4?.past_rabbis_section?.past_rabbis,
    per_page: String(
      pageData[0].acf?.timeline_4?.past_rabbis_section?.past_rabbis.length,
    ),
    orderby: "include",
    order: "asc",
  });
  const params5 = new URLSearchParams({
    include: pageData[0].acf?.timeline_5?.past_rabbis_section?.past_rabbis,
    per_page: String(
      pageData[0].acf?.timeline_5?.past_rabbis_section?.past_rabbis.length,
    ),
    orderby: "include",
    order: "asc",
  });

  const rabbisPostRes1 = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params1.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const rabbisPostRes2 = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params2.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const rabbisPostRes3 = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params3.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const rabbisPostRes4 = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params4.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );
  const rabbisPostRes5 = fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params5.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
    },
  );

  const [rabbisPost1, rabbisPost2, rabbisPost3, rabbisPost4, rabbisPost5] =
    await Promise.all([
      rabbisPostRes1,
      rabbisPostRes2,
      rabbisPostRes3,
      rabbisPostRes4,
      rabbisPostRes5,
    ]);

  const parseRabbisData = async (response: Response, index: number) => {
    if (!response.ok) {
      console.error(
        `Failed to load rabbis data ${index}:`,
        response.status,
        response.statusText,
      );
      return [];
    }
    try {
      return await response.json();
    } catch (error) {
      console.error(`Failed to parse JSON for rabbis data ${index}:`, error);
      return [];
    }
  };

  const [rabbisData1, rabbisData2, rabbisData3, rabbisData4, rabbisData5] =
    await Promise.all([
      parseRabbisData(rabbisPost1, 1),
      parseRabbisData(rabbisPost2, 2),
      parseRabbisData(rabbisPost3, 3),
      parseRabbisData(rabbisPost4, 4),
      parseRabbisData(rabbisPost5, 5),
    ]);

  // console.log("Page Data:", pageData);
  // console.log("Rabbis Data 1:", rabbisData1);
  // console.log("Rabbis Data 2:", rabbisData2);
  // console.log("Rabbis Data 3:", rabbisData3);
  // console.log("Rabbis Data 4:", rabbisData4);
  // console.log("Rabbis Data 5:", rabbisData5);

  return (
    <HistoryScriptProvider
      data={{
        pageData: pageData[0],
        rabbisData: [
          rabbisData1,
          rabbisData2,
          rabbisData3,
          rabbisData4,
          rabbisData5,
        ],
      }}
    />
  );
}
