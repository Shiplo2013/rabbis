import { createWordPressPageHandler } from "../_shared/page-handler";
export const revalidate = 300;

export const GET = createWordPressPageHandler({
  uri: "header",
  restSlug: "header",
  pageName: "Header",
  fetchRevalidate: 300,
  responseCacheControl: "public, s-maxage=300, stale-while-revalidate=600",
});
