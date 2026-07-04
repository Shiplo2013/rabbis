import { createWordPressPageHandler } from "../../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "header-community",
  restSlug: "header-community",
  pageName: "Header (Community)",
});
