import { parseJsonResponseWithBackup } from "./parseJsonResponseWithBackup";
import { wpFetch } from "./wpFetch";

export default async function getAllPosts() {
  const newsRes = await wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?per_page=20&_fields=slug,modified`,
    {
      next: { revalidate: 60 }, // Cache data for 1 minute
    },
  );

  let newsData = [{ slug: "", modified: new Date().toISOString() }];

  const parsedData = await parseJsonResponseWithBackup<any[]>(
    newsRes,
    newsData,
    "posts-sitemap",
  );
  newsData = Array.isArray(parsedData) ? parsedData : [parsedData];

  return newsData;
}
