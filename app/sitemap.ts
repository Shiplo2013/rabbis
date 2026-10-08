import type { MetadataRoute } from "next";
import { wpFetch } from "./lib/wpFetch";

// 1. Define your post type (if using TypeScript)
interface Post {
  slug: string;
  modified: string;
}

// 2. Fetch data from your database or API
async function getPosts(): Promise<Post[]> {
  const newsRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!newsRes.ok) {
    throw new Error("Failed to load data.");
  }

  return newsRes.json();
}

// Get Communites posts
async function getCommunityPosts(): Promise<Post[]> {
  const communitiesRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!communitiesRes.ok) {
    throw new Error("Failed to load data.");
  }

  return communitiesRes.json();
}

// Get Past Rabbis posts
async function getPastRabbisPosts(): Promise<Post[]> {
  const pastRabbisRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!pastRabbisRes.ok) {
    throw new Error("Failed to load data.");
  }

  return pastRabbisRes.json();
}

// Get The Knesset of Customs posts
async function getKnessetOfCustomsPosts(): Promise<Post[]> {
  const knessetRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  if (!knessetRes.ok) {
    throw new Error("Failed to load data.");
  }

  return knessetRes.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsRes = getPosts();
  const communitiesRes = getCommunityPosts();
  const pastRabbisRes = getPastRabbisPosts();
  const knessetOfCustomsRes = getKnessetOfCustomsPosts();
  const [posts, communities, pastRabbis, knessetOfCustoms] = await Promise.all([
    postsRes,
    communitiesRes,
    pastRabbisRes,
    knessetOfCustomsRes,
  ]);
  const baseUrl = "https://www.chevronyeshiva.org";

  // Map database posts to sitemap format
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const communityEntries: MetadataRoute.Sitemap = communities.map(
    (community) => ({
      url: `${baseUrl}/communities/${community.slug}`,
      lastModified: new Date(community.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );
  const pastRabbisEntries: MetadataRoute.Sitemap = pastRabbis.map(
    (pastRabbi) => ({
      url: `${baseUrl}/past-rabbis/${pastRabbi.slug}`,
      lastModified: new Date(pastRabbi.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );
  const knessetOfCustomsEntries: MetadataRoute.Sitemap = knessetOfCustoms.map(
    (knesset) => ({
      url: `${baseUrl}/the-knesset-of-customs/${knesset.slug}`,
      lastModified: new Date(knesset.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );
  // Define your static pages
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.chevronyeshiva.org",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/accessibility" ||
        "https://www.chevronyeshiva.org/accessibility",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/alumni-conference" ||
        "https://www.chevronyeshiva.org/alumni-conference",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/chronicles" ||
        "https://www.chevronyeshiva.org/chronicles",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/communities" ||
        "https://www.chevronyeshiva.org/communities",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/communities/sheets" ||
        "https://www.chevronyeshiva.org/communities/sheets",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/contact" ||
        "https://www.chevronyeshiva.org/contact",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/cycle-pictures" ||
        "https://www.chevronyeshiva.org/cycle-pictures",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/donation" ||
        "https://www.chevronyeshiva.org/donation",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/news" ||
        "https://www.chevronyeshiva.org/news",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/past-rabbis" ||
        "https://www.chevronyeshiva.org/past-rabbis",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/privacy-policy" ||
        "https://www.chevronyeshiva.org/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/testimonials" ||
        "https://www.chevronyeshiva.org/testimonials",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/the-circle-of-the-year" ||
        "https://www.chevronyeshiva.org/the-circle-of-the-year",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/the-knesset-of-customs" ||
        "https://www.chevronyeshiva.org/the-knesset-of-customs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/visit-temple" ||
        "https://www.chevronyeshiva.org/visit-temple",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/yeshiva-graduates" ||
        "https://www.chevronyeshiva.org/yeshiva-graduates",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/yeshiva-rabbis" ||
        "https://www.chevronyeshiva.org/yeshiva-rabbis",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/zatzel-graduates" ||
        "https://www.chevronyeshiva.org/zatzel-graduates",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
  ];
  // Combine static routes and dynamic items using the spread operator
  return [
    ...staticEntries,
    ...postEntries,
    ...communityEntries,
    ...pastRabbisEntries,
    ...knessetOfCustomsEntries,
  ];
}
