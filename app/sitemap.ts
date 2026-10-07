"use server";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //const posts = await getPosts();
  //console.log("Fetched posts for sitemap:");
  return [
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
}
