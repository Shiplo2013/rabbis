import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "yeshiva-rabbis",
  restSlug: "yeshiva-rabbis",
  pageName: "yeshiva rabbis page",
});
