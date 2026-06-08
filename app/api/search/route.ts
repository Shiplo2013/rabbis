import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_SEARCH_ENDPOINT =
  "https://dovp7.sg-host.com/wp-json/wp/v2/search";

type SearchItem = {
  id: number;
  title: string;
  slug: string;
  subtype: string;
  type: string;
};

type SearchResult = {
  id: number;
  title: string;
  slug: string;
  subtype: string;
  path: string;
};

async function tryParseJson<T>(response: Response): Promise<T | undefined> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) {
    return undefined;
  }

  try {
    return (await response.json()) as T;
  } catch {
    return undefined;
  }
}

const PAGE_PATH_BY_SLUG: Record<string, string> = {
  home: "/",
  about: "/about",
  chronicles: "/chronicles",
  communities: "/communities",
  contact: "/contact",
  donation: "/donation",
  "cycle-pictures": "/cycle-pictures",
  testimonials: "/testimonials",
  "the-circle-of-the-year": "/the-circle-of-the-year",
  "the-knesset-of-customs": "/the-knesset-of-customs",
  "visit-temple": "/visit-temple",
  "yeshiva-graduates": "/yeshiva-graduates",
  "yeshiva-rabbis": "/yeshiva-rabbis",
  "zatzel-graduates": "/zatzel-graduates",
  "alumni-conference": "/alumni-conference",
  news: "/news",
  "past-rabbis": "/past-rabbis",
};

function resolvePath(item: SearchItem) {
  const subtype = item.subtype;
  const slug = item.slug;

  if (subtype === "page") {
    return PAGE_PATH_BY_SLUG[slug] ?? `/${slug}`;
  }

  if (subtype === "communities") {
    return `/communities/${slug}`;
  }

  if (subtype === "news") {
    return `/news/${slug}`;
  }

  if (subtype === "past-rabbis") {
    return `/past-rabbis/${slug}`;
  }

  if (subtype === "the-knesset-of-customs") {
    return `/the-knesset-of-customs/${slug}`;
  }

  if (subtype === "the-circle-of-the-year") {
    return `/the-circle-of-the-year/${slug}`;
  }

  return PAGE_PATH_BY_SLUG[slug] ?? `/${slug}`;
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const url = new URL(WORDPRESS_SEARCH_ENDPOINT);
    url.searchParams.set("search", query);
    url.searchParams.set("per_page", "20");
    url.searchParams.set("_fields", "id,title,slug,subtype,type");

    const allowedSubtypes = [
      "page",
      "communities",
      "news",
      "past-rabbis",
      "the-knesset-of-customs",
      "the-circle-of-the-year",
    ];

    allowedSubtypes.forEach((subtype) => {
      url.searchParams.append("subtype[]", subtype);
    });

    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await tryParseJson<SearchItem[]>(response);
    if (!Array.isArray(data)) {
      return NextResponse.json({ results: [] });
    }

    const results: SearchResult[] = Array.isArray(data)
      ? data
          .filter((item) => item && typeof item.slug === "string")
          .map((item) => ({
            id: item.id,
            title: item.title ?? "",
            slug: item.slug,
            subtype: item.subtype,
            path: resolvePath(item),
          }))
      : [];

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while searching content." },
      { status: 500 },
    );
  }
}
