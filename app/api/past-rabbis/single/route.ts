import { createWordPressPageHandler } from "../../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "past-rabbis/single",
  restSlug: "single",
  pageName: "past rabbis single page",
});
