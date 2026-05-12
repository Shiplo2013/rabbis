import { createWordPressPageHandler } from "../../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "communities/single",
  restSlug: "single",
  pageName: "communities single page",
});
