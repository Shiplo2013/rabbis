import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "zatzel-graduates",
  restSlug: "zatzel-graduates",
  pageName: "zatzel graduates page",
});
