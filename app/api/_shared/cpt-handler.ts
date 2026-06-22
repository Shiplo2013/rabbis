import { NextRequest, NextResponse } from "next/server";

const WORDPRESS_API_BASE = "https://dovp7.sg-host.com/wp-json/wp/v2";

type CptPost = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content?: { rendered: string };
  excerpt?: { rendered: string };
  date?: string;
  modified?: string;
  featured_media?: number;
  acf: Record<string, unknown> | unknown[] | null;
};

type NormalizedPost = {
  id: number;
  slug: string;
  link: string;
  title: string;
  content: string;
  excerpt: string;
  date: string | undefined;
  modified: string | undefined;
  acf: Record<string, unknown> | unknown[] | null;
};

function normalizePost(post: CptPost): NormalizedPost {
  return {
    id: post.id,
    slug: post.slug,
    link: post.link,
    title: post.title?.rendered ?? "",
    content: post.content?.rendered ?? "",
    excerpt: post.excerpt?.rendered ?? "",
    date: post.date,
    modified: post.modified,
    acf: post.acf ?? null,
  };
}

async function fetchWordPressJsonArray<T>(options: {
  url: string;
  loadLabel: string;
  attempts?: number;
}) {
  const { url, loadLabel, attempts = 3 } = options;
  let lastDetails = "Unknown upstream response issue.";

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const shouldRetry =
        attempt < attempts &&
        [403, 429, 500, 502, 503, 504].includes(response.status);

      if (shouldRetry) {
        lastDetails = `Upstream status ${response.status} (attempt ${attempt}/${attempts}).`;
        continue;
      }

      return {
        error: NextResponse.json(
          { error: `Failed to fetch ${loadLabel} from WordPress.` },
          { status: response.status },
        ),
      };
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      lastDetails = `Upstream content-type was "${contentType || "unknown"}" (attempt ${attempt}/${attempts}).`;

      if (attempt < attempts) {
        continue;
      }

      break;
    }

    try {
      const payload = (await response.json()) as unknown;

      if (Array.isArray(payload)) {
        return {
          data: payload as T[],
          response,
        };
      }

      lastDetails = `Upstream payload was not an array (attempt ${attempt}/${attempts}).`;
      if (attempt < attempts) {
        continue;
      }
      break;
    } catch {
      lastDetails = `Upstream returned invalid JSON (attempt ${attempt}/${attempts}).`;

      if (attempt < attempts) {
        continue;
      }

      break;
    }
  }

  return {
    error: NextResponse.json(
      {
        error: `Unexpected response while loading ${loadLabel} from WordPress.`,
        details: lastDetails,
      },
      { status: 502 },
    ),
  };
}

/**
 * Creates a GET handler that returns a paginated list of CPT posts.
 *
 * Query params forwarded to WP REST API:
 *   page       — page number (default 1)
 *   per_page   — posts per page (default 20, max 100)
 *   search     — full-text search string
 *   orderby    — field to order by (default "date")
 *   order      — "asc" | "desc" (default "desc")
 *   categories — comma-separated IDs or array syntax (?categories=1,2,3 or ?categories=1&categories=2)
 */
export function createCptListHandler(options: {
  postType: string;
  postTypeName: string;
  taxonomyParam?: string;
}) {
  const { postType, postTypeName, taxonomyParam } = options;

  return async function GET(request: NextRequest) {
    try {
      const { searchParams } = request.nextUrl;

      const page = searchParams.get("page") ?? "1";
      const perPage = searchParams.get("per_page") ?? "20";
      const search = searchParams.get("search") ?? "";
      const orderby = searchParams.get("orderby") ?? "date";
      const order = searchParams.get("order") ?? "desc";
      const taxonomyFilter = taxonomyParam
        ? searchParams.getAll(taxonomyParam).filter((value) => value.trim())
        : [];

      // Handle both comma-separated and array-style category params
      const categoriesParam = searchParams.get("categories");
      const allCategories: string[] = [];
      if (categoriesParam) {
        // Handle comma-separated: "1,2,3"
        allCategories.push(
          ...categoriesParam
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
        );
      }
      // Handle array syntax: ?categories=1&categories=2
      searchParams.getAll("categories").forEach((cat, index) => {
        if (index > 0 && cat.trim()) allCategories.push(cat.trim());
      });

      const url = new URL(`${WORDPRESS_API_BASE}/${postType}`);
      url.searchParams.set("acf_format", "standard");
      url.searchParams.set(
        "_fields",
        "id,slug,link,title,content,excerpt,date,modified,acf",
      );
      url.searchParams.set("page", page);
      url.searchParams.set("per_page", perPage);
      url.searchParams.set("orderby", orderby);
      url.searchParams.set("order", order);
      if (search) url.searchParams.set("search", search);
      if (allCategories.length > 0) {
        url.searchParams.set("categories", allCategories.join(","));
      }
      if (taxonomyParam && taxonomyFilter.length > 0) {
        url.searchParams.set(taxonomyParam, taxonomyFilter.join(","));
      }

      // Forward custom taxonomy query params for CPTs.
      // Example: /api/communities/posts?communities_category=123
      const passthroughKeys = new Set([
        "page",
        "per_page",
        "search",
        "orderby",
        "order",
        "categories",
        ...(taxonomyParam ? [taxonomyParam] : []),
      ]);
      for (const [key, value] of searchParams.entries()) {
        if (!passthroughKeys.has(key) && value.trim()) {
          url.searchParams.set(key, value.trim());
        }
      }

      const listResult = await fetchWordPressJsonArray<CptPost>({
        url: url.toString(),
        loadLabel: `${postTypeName} posts`,
      });

      if ("error" in listResult) {
        return listResult.error;
      }

      const { data: posts, response } = listResult;

      const totalPosts = response.headers.get("X-WP-Total");
      const totalPages = response.headers.get("X-WP-TotalPages");

      return NextResponse.json(
        {
          posts: posts.map(normalizePost),
          pagination: {
            page: Number(page),
            per_page: Number(perPage),
            total: totalPosts ? Number(totalPosts) : null,
            total_pages: totalPages ? Number(totalPages) : null,
          },
        },
        {
          headers: {
            ...(totalPosts ? { "X-WP-Total": totalPosts } : {}),
            ...(totalPages ? { "X-WP-TotalPages": totalPages } : {}),
          },
        },
      );
    } catch {
      return NextResponse.json(
        { error: `Unexpected error while loading ${postTypeName} posts.` },
        { status: 500 },
      );
    }
  };
}

/**
 * Creates a GET handler that returns a single CPT post by slug.
 * Expects the slug in the URL segment: /api/.../[slug]
 */
export function createCptSingleHandler(options: {
  postType: string;
  postTypeName: string;
}) {
  const { postType, postTypeName } = options;

  return async function GET(
    _request: NextRequest,
    context: { params: Promise<{ slug: string }> },
  ) {
    try {
      const { slug } = await context.params;

      if (!slug) {
        return NextResponse.json(
          { error: "Slug is required." },
          { status: 400 },
        );
      }

      const url = new URL(`${WORDPRESS_API_BASE}/${postType}`);
      url.searchParams.set("acf_format", "standard");
      url.searchParams.set(
        "_fields",
        "id,slug,link,title,content,excerpt,date,modified,acf",
      );
      url.searchParams.set("slug", slug);

      const singleResult = await fetchWordPressJsonArray<CptPost>({
        url: url.toString(),
        loadLabel: `${postTypeName} post`,
      });

      if ("error" in singleResult) {
        return singleResult.error;
      }

      const { data: posts } = singleResult;

      if (!posts.length) {
        return NextResponse.json(
          { error: `${postTypeName} post "${slug}" was not found.` },
          { status: 404 },
        );
      }

      return NextResponse.json(normalizePost(posts[0]));
    } catch {
      return NextResponse.json(
        { error: `Unexpected error while loading ${postTypeName} post.` },
        { status: 500 },
      );
    }
  };
}
