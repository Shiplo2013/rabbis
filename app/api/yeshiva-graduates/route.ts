import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "yeshiva-graduates",
  restSlug: "yeshiva-graduates",
  pageName: "yeshiva graduates page",
});
