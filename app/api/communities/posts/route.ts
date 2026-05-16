import { createCptListHandler } from "../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

export const GET = createCptListHandler({
  postType: "communities",
  postTypeName: "communities",
  taxonomyParam: "communities_cat",
});
