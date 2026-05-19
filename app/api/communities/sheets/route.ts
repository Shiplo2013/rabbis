import { createWordPressPageHandler } from "../../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "issues-magazine",
  restSlug: "issues-magazine",
  pageName: "issues magazine page",
});
