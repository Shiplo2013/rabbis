export async function wpFetch(url: string, options?: RequestInit) {
  const nextOptions = options ?? {};
  const cacheOptions = nextOptions.cache ?? "force-cache";
  const nextConfig = nextOptions.next as RequestInit["next"] | undefined;
  const existingTags = Array.isArray(nextConfig?.tags) ? nextConfig.tags : [];
  const mergedTags = [
    "wordpress-data",
    ...existingTags,
    ...(nextConfig?.tags ?? []),
  ];

  return fetch(url, {
    ...nextOptions,
    cache: cacheOptions,
    next: {
      revalidate: 60,
      ...nextConfig,
      tags: mergedTags,
    } as RequestInit["next"],
    headers: {
      "User-Agent": "RabbisApp/1.0 (+https://rabbis.vercel.app/)",
      ...nextOptions.headers,
    },
  });
}
