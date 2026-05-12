import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "alumni-conference",
  restSlug: "alumni-conference",
  pageName: "alumni conference page",
});
