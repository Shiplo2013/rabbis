import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "visit-temple",
  restSlug: "visit-temple",
  pageName: "visit temple page",
});
