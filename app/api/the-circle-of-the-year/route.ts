import { createWordPressPageHandler } from "../_shared/page-handler";
export const dynamic = "force-dynamic";

export const GET = createWordPressPageHandler({
  uri: "the-circle-of-the-year",
  restSlug: "the-circle-of-the-year",
  pageName: "the circle of the year page",
});
