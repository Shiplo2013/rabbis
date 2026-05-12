import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "communities",
  restSlug: "communities",
  pageName: "communities page",
});
