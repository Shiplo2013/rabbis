import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "footer",
  restSlug: "footer",
  pageName: "footer page",
});
