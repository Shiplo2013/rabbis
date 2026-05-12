import { createWordPressPageHandler } from "../../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "communities/sheets",
  restSlug: "sheets",
  pageName: "communities sheets page",
});
