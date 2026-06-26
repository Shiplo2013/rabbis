import { NextRequest } from "next/server";
import { createCptListHandler } from "../../_shared/cpt-handler";
export const dynamic = "force-dynamic";

const getHandler = createCptListHandler({
  postType: "posts",
  postTypeName: "posts",
  taxonomyParam: "category",
});

export async function GET(request: NextRequest) {
  return getHandler(request);
}
