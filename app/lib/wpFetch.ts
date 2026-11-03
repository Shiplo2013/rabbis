export async function wpFetch(url: string, options?: RequestInit) {
  const nextOptions = options ?? {};
  const cacheOptions = nextOptions.cache ?? "force-cache";
  const nextConfig = nextOptions.next as RequestInit["next"] | undefined;

  // Always add wordpress-data tag for on-demand revalidation
  const existingTags = Array.isArray(nextConfig?.tags) ? nextConfig?.tags : [];
  const mergedTags = ["wordpress-data", ...existingTags];

  const nextConfigObj: RequestInit["next"] = {
    tags: mergedTags,
    ...nextConfig,
  };

  // Only add revalidate if not using no-store cache
  if (cacheOptions !== "no-store" && !nextConfig?.revalidate) {
    nextConfigObj.revalidate = 60;
  }

  return fetch(url, {
    ...nextOptions,
    cache: cacheOptions,
    next: nextConfigObj,
    headers: {
      "User-Agent": "RabbisApp/1.0 (+https://www.chevronyeshiva.org)",
      ...nextOptions.headers,
    },
  });
}
