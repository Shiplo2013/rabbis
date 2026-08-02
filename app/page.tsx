import { wpFetch } from "@/app/lib/wpFetch";
import HomeScriptProvider from "./components/home/HomeScriptProvider";
import { parseJsonResponse } from "./lib/parseJsonResponse";

export default async function page() {
  const pageRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=home&_fields=id,acf`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pageRes.ok) {
    throw new Error("Failed to load data.");
  }

  let pageData = [
    {
      id: 0,
      acf: {
        banner_section: {
          title_1: "",
          title_2: "",
          title_3: "",
          subtitle: "",
          audio_music: [],
          banner_background: [],
        },
        intro_section: {
          title: "",
        },
        home_section_1: {
          text_slider: {
            text_slide_1: "",
            text_slide_2: "",
          },
          community_posts: [],
          background_image: [],
        },
        home_section_2: {
          image: [],
          title: "",
          foating_image: [],
          text: "",
        },
        home_section_3: {
          image: [],
          title: "",
          text: "",
          background_image: [],
        },
        home_section_4: {
          content: "",
          background_image: [],
        },
      },
    },
  ];
  const parsedData = await parseJsonResponse<any[]>(
    pageRes,
    pageData,
    "home-page",
  );
  pageData = Array.isArray(parsedData) ? parsedData : [parsedData];

  const postsIds = pageData[0]?.acf?.home_section_1?.community_posts;
  const params = new URLSearchParams({
    include: postsIds.join(","),
    per_page: String(postsIds.length),
    orderby: "include",
    order: "asc",
  });

  const postsRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?${params.toString()}&_fields=id,title,slug,acf.subtitle,acf.informations.established`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!postsRes.ok) {
    throw new Error("Failed to load data.");
  }

  let postsData = [
    {
      id: 0,
      slug: "",
      title: {
        rendered: "",
      },
      acf: {
        subtitle: "",
        informations: {
          established: "",
        },
      },
    },
  ];

  const parsedPostData = await parseJsonResponse<any[]>(
    postsRes,
    postsData,
    "home-communities-posts",
  );
  postsData = Array.isArray(parsedPostData) ? parsedPostData : [parsedPostData];

  return <HomeScriptProvider data={pageData[0]} postsData={postsData} />;
}
