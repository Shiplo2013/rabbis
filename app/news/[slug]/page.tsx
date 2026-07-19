import SingleNewsScriptProvider from "@/app/components/news/SingleNewsScriptProvider";
import { parseJsonResponse } from "@/app/lib/parseJsonResponse";
import { wpFetch } from "@/app/lib/wpFetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  const pageRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?acf_format=standard&slug=${slug}&_fields=id,acf`,
    {
      next: { revalidate: 86400 },
    },
  );
  const postsRes = wpFetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?acf_format=standard&_fields=id,title,slug,excerpt,acf&per_page=20`,
    {
      next: { revalidate: 86400 },
    },
  );

  const [pageDataRes, postsDataRes] = await Promise.all([pageRes, postsRes]);

  if (!pageDataRes.ok || !postsDataRes.ok) {
    throw new Error("Failed to load data.");
  }

  const pageData = await parseJsonResponse<any[]>(
    pageDataRes,
    [],
    `news-slug-page-${slug}`,
  );
  const postsData = await parseJsonResponse<any[]>(
    postsDataRes,
    [],
    "news-slug-posts",
  );

  // Find the index of the current post in the list of all posts
  const currentPostIndex = postsData.findIndex(
    (post: any) => post?.id === pageData[0]?.id,
  );
  // Determine the previous and next posts based on the current post index
  const prevPost =
    currentPostIndex > 0
      ? postsData[currentPostIndex - 1]
      : postsData[postsData.length - 1];
  const nextPost =
    currentPostIndex < postsData.length - 1
      ? postsData[currentPostIndex + 1]
      : postsData[0];
  // Navigation data for the current post
  const navigationData = {
    prevPost: prevPost
      ? {
          title: prevPost?.title?.rendered || "",
          link: `/news/${prevPost?.slug}`,
          image: prevPost?.acf?.gallery?.find(
            (item: any) => item.type === "image",
          )?.image,
        }
      : { title: "", link: "", image: undefined },
    nextPost: nextPost
      ? {
          title: nextPost?.title?.rendered || "",
          link: `/news/${nextPost?.slug}`,
          image: nextPost?.acf?.gallery?.find(
            (item: any) => item.type === "image",
          )?.image,
        }
      : { title: "", link: "", image: undefined },
  };

  return (
    <SingleNewsScriptProvider
      data={{ post: pageData[0], navigationData: navigationData }}
    />
  );
}
