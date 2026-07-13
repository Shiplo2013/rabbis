import HomeScriptProvider from "./components/home/HomeScriptProvider";

export default async function page() {
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/pages?acf_format=standard&slug=home&_fields=id,acf`,
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
  try {
    const parsedData = await pageRes.json();
    pageData = Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error) {
    console.error("Failed to parse page data JSON:", error);
  }

  const postsIds = pageData[0]?.acf?.home_section_1?.community_posts;
  const params = new URLSearchParams({
    include: postsIds.join(","),
    per_page: String(postsIds.length),
    orderby: "include",
    order: "asc",
  });

  const postsRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?${params.toString()}&_fields=id,title,slug,acf.subtitle,acf.informations.established`,
    {
      next: { revalidate: 86400 }, // Cache data for 24 hours
      cache: "force-cache",
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

  try {
    const parsedPostData = await postsRes.json();
    postsData = Array.isArray(parsedPostData)
      ? parsedPostData
      : [parsedPostData];
  } catch (error) {
    console.error("Failed to parse posts data JSON:", error);
  }

  return <HomeScriptProvider data={pageData[0]} postsData={postsData} />;
}
