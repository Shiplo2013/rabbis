import { createCptSingleHandler } from "../../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

export const GET = createCptSingleHandler({
  postType: "holidays",
  postTypeName: "holidays",
});
