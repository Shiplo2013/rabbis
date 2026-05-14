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

/**
 * Creates a GET handler that returns a paginated list of CPT posts.
 *
 * Query params forwarded to WP REST API:
 *   page      — page number (default 1)
 *   per_page  — posts per page (default 20, max 100)
 *   search    — full-text search string
 *   orderby   — field to order by (default "date")
 *   order     — "asc" | "desc" (default "desc")
 */
export function createCptListHandler(options: {
  postType: string;
  postTypeName: string;
}) {
  const { postType, postTypeName } = options;

  return async function GET(request: NextRequest) {
    try {
      const { searchParams } = request.nextUrl;

      const page = searchParams.get("page") ?? "1";
      const perPage = searchParams.get("per_page") ?? "20";
      const search = searchParams.get("search") ?? "";
      const orderby = searchParams.get("orderby") ?? "date";
      const order = searchParams.get("order") ?? "desc";

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

      const response = await fetch(url.toString(), { cache: "no-store" });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch ${postTypeName} posts from WordPress.` },
          { status: response.status },
        );
      }

      const posts = (await response.json()) as CptPost[];

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

      const response = await fetch(url.toString(), { cache: "no-store" });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch ${postTypeName} post from WordPress.` },
          { status: response.status },
        );
      }

      const posts = (await response.json()) as CptPost[];

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
