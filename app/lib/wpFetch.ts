export async function wpFetch(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    headers: {
      "User-Agent": "RabbisApp/1.0 (+https://rabbis.vercel.app/)",
      ...options?.headers,
    },
  });
}
