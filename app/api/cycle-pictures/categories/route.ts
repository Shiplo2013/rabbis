import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WORDPRESS_API_BASE = "https://dovp7.sg-host.com/wp-json/wp/v2";

type WpTerm = {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
};

type TaxonomyNode = WpTerm & {
  children: WpTerm[];
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const perPage = searchParams.get("per_page") ?? "100";
    const hideEmpty = searchParams.get("hide_empty") ?? "false";
    const orderby = searchParams.get("orderby") ?? "name";
    const order = searchParams.get("order") ?? "asc";

    const url = new URL(`${WORDPRESS_API_BASE}/committee_cat`);
    url.searchParams.set("per_page", perPage);
    url.searchParams.set("hide_empty", hideEmpty);
    url.searchParams.set("orderby", orderby);
    url.searchParams.set("order", order);
    url.searchParams.set("_fields", "id,name,slug,count,parent");

    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch committee categories from WordPress." },
        { status: response.status },
      );
    }

    const terms = (await response.json()) as WpTerm[];
    const parents = terms.filter((term) => term.parent === 0);

    const taxonomyTree: TaxonomyNode[] = parents.map((parent) => ({
      ...parent,
      children: terms.filter((child) => child.parent === parent.id),
    }));

    const total = response.headers.get("X-WP-Total");
    const totalPages = response.headers.get("X-WP-TotalPages");

    return NextResponse.json(
      {
        terms,
        parents,
        taxonomyTree,
        pagination: {
          per_page: Number(perPage),
          total: total ? Number(total) : null,
          total_pages: totalPages ? Number(totalPages) : null,
        },
      },
      {
        headers: {
          ...(total ? { "X-WP-Total": total } : {}),
          ...(totalPages ? { "X-WP-TotalPages": totalPages } : {}),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while loading committee categories." },
      { status: 500 },
    );
  }
}
