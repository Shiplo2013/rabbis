import { createCptListHandler } from "../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

export const GET = createCptListHandler({
  postType: "committee-posts",
  postTypeName: "committee-posts",
  taxonomyParam: "committee_cat",
});
