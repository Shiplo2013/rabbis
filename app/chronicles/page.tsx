import { wpFetch } from "@/app/lib/wpFetch";
import { ChroniclesPageWithCache } from "../components/history/ChroniclesPageWithCache";
import { parseJsonResponse } from "../lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=chronicles&_fields=id,acf`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      id: 0,
      acf: {
        timeline_1: {
          past_rabbis_section: {
            past_rabbis: [],
          },
        },
        timeline_2: {
          past_rabbis_section: {
            past_rabbis: [],
          },
        },
        timeline_3: {
          past_rabbis_section: {
            past_rabbis: [],
          },
        },
        timeline_4: {
          past_rabbis_section: {
            past_rabbis: [],
          },
        },
        timeline_5: {
          past_rabbis_section: {
            past_rabbis: [],
          },
        },
      },
    },
  ];
  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "chronicles-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  const params1 = new URLSearchParams({
    include: (
      pageData[0].acf?.timeline_1?.past_rabbis_section?.past_rabbis ?? []
    ).toString(),
    per_page: String(
      (pageData[0].acf?.timeline_1?.past_rabbis_section?.past_rabbis ?? [])
        .length,
    ),
    orderby: "include",
    order: "asc",
    _fields: "id,title,slug,acf.thumbnail,acf.time",
    acf_format: "standard",
  });
  const params2 = new URLSearchParams({
    include: (
      pageData[0].acf?.timeline_2?.past_rabbis_section?.past_rabbis ?? []
    ).toString(),
    per_page: String(
      (pageData[0].acf?.timeline_2?.past_rabbis_section?.past_rabbis ?? [])
        .length,
    ),
    orderby: "include",
    order: "asc",
    _fields: "id,title,slug,acf.thumbnail,acf.time",
    acf_format: "standard",
  });
  const params3 = new URLSearchParams({
    include: (
      pageData[0].acf?.timeline_3?.past_rabbis_section?.past_rabbis ?? []
    ).toString(),
    per_page: String(
      (pageData[0].acf?.timeline_3?.past_rabbis_section?.past_rabbis ?? [])
        .length,
    ),
    orderby: "include",
    order: "asc",
    _fields: "id,title,slug,acf.thumbnail,acf.time",
    acf_format: "standard",
  });
  const params4 = new URLSearchParams({
    include: (
      pageData[0].acf?.timeline_4?.past_rabbis_section?.past_rabbis ?? []
    ).toString(),
    per_page: String(
      (pageData[0].acf?.timeline_4?.past_rabbis_section?.past_rabbis ?? [])
        .length,
    ),
    orderby: "include",
    order: "asc",
    _fields: "id,title,slug,acf.thumbnail,acf.time",
    acf_format: "standard",
  });
  const params5 = new URLSearchParams({
    include: (
      pageData[0].acf?.timeline_5?.past_rabbis_section?.past_rabbis ?? []
    ).toString(),
    per_page: String(
      (pageData[0].acf?.timeline_5?.past_rabbis_section?.past_rabbis ?? [])
        .length,
    ),
    orderby: "include",
    order: "asc",
    _fields: "id,title,slug,acf.thumbnail,acf.time",
    acf_format: "standard",
  });

  const rabbisPostRes1 = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params1.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );
  const rabbisPostRes2 = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params2.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );
  const rabbisPostRes3 = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params3.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );
  const rabbisPostRes4 = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params4.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
    },
  );
  const rabbisPostRes5 = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?${params5.toString()}`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
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
    return parseJsonResponse<any[]>(response, [], `chronicles-rabbis-${index}`);
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
    <ChroniclesPageWithCache
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
