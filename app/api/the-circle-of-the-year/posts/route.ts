import { createCptListHandler } from "../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

export const GET = createCptListHandler({
  postType: "holidays",
  postTypeName: "holidays",
});
