import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "testimonials",
  restSlug: "testimonials",
  pageName: "testimonials page",
});
