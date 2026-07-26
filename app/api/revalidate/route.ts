import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type RevalidationPayload = {
  slug?: string;
  post_type?: string;
  type?: string;
  path?: string;
  paths?: string[];
};

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
  "privacy-policy": "/privacy-policy",
};

function addPath(
  targets: Map<string, { path: string; type?: "layout" }>,
  path: string,
  type?: "layout",
) {
  targets.set(`${type ?? "page"}:${path}`, { path, type });
}

function resolvePaths(payload: RevalidationPayload) {
  const slug = payload.slug?.trim();
  const postType = payload.post_type?.trim() ?? payload.type?.trim() ?? "";
  const targets = new Map<string, { path: string; type?: "layout" }>();

  const addLayoutAndRoot = () => {
    addPath(targets, "/", "layout");
    addPath(targets, "/");
  };

  for (const explicitPath of payload.paths ?? []) {
    if (explicitPath) {
      addPath(targets, explicitPath);
    }
  }

  if (payload.path) {
    addPath(targets, payload.path);
  }

  switch (postType) {
    case "page":
      if (
        slug === "home" ||
        slug === "header" ||
        slug === "header-community" ||
        slug === "footer"
      ) {
        addLayoutAndRoot();
        break;
      }

      if (slug) {
        addPath(targets, PAGE_PATH_BY_SLUG[slug] ?? `/${slug}`);
      }
      break;
    case "post":
    case "news":
      addPath(targets, "/news");
      if (slug) {
        addPath(targets, `/news/${slug}`);
      }
      break;
    case "communities":
      addPath(targets, "/communities");
      if (slug) {
        addPath(targets, `/communities/${slug}`);
      }
      break;
    case "past-rabbis":
      addPath(targets, "/past-rabbis");
      if (slug) {
        addPath(targets, `/past-rabbis/${slug}`);
      }
      break;
    case "the-knesset-of-customs":
      addPath(targets, "/the-knesset-of-customs");
      if (slug) {
        addPath(targets, `/the-knesset-of-customs/${slug}`);
      }
      break;
    case "the-circle-of-the-year":
      addPath(targets, "/the-circle-of-the-year");
      if (slug) {
        addPath(targets, `/the-circle-of-the-year/${slug}`);
      }
      break;
    case "yeshiva-rabbis":
      addPath(targets, "/yeshiva-rabbis");
      break;
    case "zatzel-graduates":
      addPath(targets, "/zatzel-graduates");
      break;
    case "yeshiva-graduates":
      addPath(targets, "/yeshiva-graduates");
      break;
    case "visit-temple":
      addPath(targets, "/visit-temple");
      break;
    case "alumni-conference":
      addPath(targets, "/alumni-conference");
      break;
    case "chronicles":
      addPath(targets, "/chronicles");
      break;
    case "testimonials":
      addPath(targets, "/testimonials");
      break;
    case "home":
      addLayoutAndRoot();
      break;
    default:
      if (slug) {
        const pagePath = PAGE_PATH_BY_SLUG[slug] ?? `/${slug}`;
        addPath(targets, pagePath);

        if (
          slug === "home" ||
          slug === "header" ||
          slug === "header-community" ||
          slug === "footer"
        ) {
          addLayoutAndRoot();
        }
      }
      break;
  }

  return [...targets.values()];
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // 1. Verify the shared secret token for security
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 2. Parse the body containing the changed WordPress post data
    const body = (await request.json()) as RevalidationPayload;
    const slug = body.slug?.trim();
    const postType = body.post_type?.trim() ?? body.type?.trim() ?? "";

    if (!slug) {
      return NextResponse.json({ message: "Missing slug" }, { status: 400 });
    }

    // 3. Clear the cache for the specific page(s)
    const paths = resolvePaths({
      ...body,
      slug,
      post_type: postType,
    });

    if (paths.length === 0) {
      return NextResponse.json(
        { message: "No matching paths to revalidate", slug, postType },
        { status: 400 },
      );
    }

    for (const target of paths) {
      if (target.type === "layout") {
        revalidatePath(target.path, "layout");
      } else {
        revalidatePath(target.path);
      }
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug,
      postType,
      paths: paths.map((target) => target.path),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 },
    );
  }
}
