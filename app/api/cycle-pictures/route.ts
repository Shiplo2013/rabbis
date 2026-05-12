import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "cycle-pictures",
  restSlug: "cycle-pictures",
  pageName: "cycle pictures page",
});
