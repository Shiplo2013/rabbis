import { NextResponse } from "next/server";

const WORDPRESS_PAGES_ENDPOINT =
  "https://dovp7.sg-host.com/wp-json/wp/v2/pages";

type RestPage = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content?: { rendered: string };
  modified?: string;
  acf: Record<string, unknown> | unknown[] | null;
};

function normalizePath(path: string) {
  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

function pickRestPageByUri(pages: RestPage[], uri: string) {
  if (!pages.length) {
    return undefined;
  }

  const targetPath = normalizePath(uri);

  const exactMatch = pages.find((page) => {
    try {
      return normalizePath(new URL(page.link).pathname) === targetPath;
    } catch {
      return false;
    }
  });

  return exactMatch ?? pages[0];
}

export function createWordPressPageHandler(options: {
  uri: string;
  restSlug?: string;
  pageName: string;
}) {
  const { uri, pageName } = options;
  const restSlug =
    options.restSlug ?? uri.split("/").filter(Boolean).pop() ?? uri;

  return async function GET() {
    try {
      const restUrl = `${WORDPRESS_PAGES_ENDPOINT}?acf_format=standard&slug=${encodeURIComponent(restSlug)}&_fields=id,slug,link,title,content,modified,acf`;

      const restResponse = await fetch(restUrl, {
        cache: "no-store",
      });

      if (!restResponse.ok) {
        return NextResponse.json(
          { error: `Failed to fetch ${pageName} data from WordPress.` },
          { status: restResponse.status },
        );
      }

      const pages = (await restResponse.json()) as RestPage[];
      const restPage = pickRestPageByUri(pages, uri);

      if (!restPage) {
        return NextResponse.json(
          { error: `${pageName} was not found in WordPress.` },
          { status: 404 },
        );
      }

      const mergedPage = {
        id: restPage.id,
        slug: restPage.slug,
        link: restPage.link,
        title: {
          rendered: restPage.title.rendered ?? "",
        },
        content: {
          rendered:
            typeof restPage.content?.rendered === "string"
              ? restPage.content.rendered
              : "",
        },
        modified: restPage.modified,
        acf: restPage.acf ?? null,
        source: "rest",
      };

      return NextResponse.json(mergedPage);
    } catch {
      return NextResponse.json(
        { error: `Unexpected error while loading ${pageName} data.` },
        { status: 500 },
      );
    }
  };
}
