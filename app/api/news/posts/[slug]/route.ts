import { createCptSingleHandler } from "../../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

export const GET = createCptSingleHandler({
  postType: "posts",
  postTypeName: "posts",
});
