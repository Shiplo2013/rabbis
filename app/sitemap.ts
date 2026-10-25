import type { MetadataRoute } from "next";
import { parseJsonResponseWithBackup } from "./lib/parseJsonResponseWithBackup";
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

  return parseJsonResponseWithBackup<Post[]>(newsRes, [], "sitemap-posts");
}

// Get Communites posts
async function getCommunityPosts(): Promise<Post[]> {
  const communitiesRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/communities?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  return parseJsonResponseWithBackup<Post[]>(communitiesRes, [], "sitemap-communities");
}

// Get Past Rabbis posts
async function getPastRabbisPosts(): Promise<Post[]> {
  const pastRabbisRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/past-rabbis?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  return parseJsonResponseWithBackup<Post[]>(pastRabbisRes, [], "sitemap-past-rabbis");
}

// Get The Knesset of Customs posts
async function getKnessetOfCustomsPosts(): Promise<Post[]> {
  const knessetRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/knesset-of-customs?per_page=100&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  return parseJsonResponseWithBackup<Post[]>(
    knessetRes,
    [],
    "sitemap-knesset-of-customs",
  );
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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.chevronyeshiva.org";

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
      url: `${baseUrl}/` || "https://www.chevronyeshiva.org/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/alumni-conference`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/chronicles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/communities`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/communities/sheets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/cycle-pictures`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/donation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/past-rabbis`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/the-circle-of-the-year`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/the-knesset-of-customs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/visit-temple`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/yeshiva-graduates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/yeshiva-rabbis`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
      images: ["https://www.chevronyeshiva.org/opengraph-image.jpg"],
    },
    {
      url: `${baseUrl}/zatzel-graduates`,
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
