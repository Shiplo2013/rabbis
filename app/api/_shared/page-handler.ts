import { NextResponse } from "next/server";

const GRAPHQL_ENDPOINT = "https://dovp7.sg-host.com/graphql";
const WORDPRESS_PAGES_ENDPOINT =
  "https://dovp7.sg-host.com/wp-json/wp/v2/pages";

type PageNode = {
  id: string;
  databaseId: number;
  slug: string;
  uri: string;
  link: string;
  title: string;
  content: string | null;
  modified: string;
};

type RestPage = {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content?: { rendered: string };
  modified?: string;
  acf: Record<string, unknown> | unknown[] | null;
};

const PAGE_GRAPHQL_QUERY = `
  query PageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      id
      databaseId
      slug
      uri
      link
      title
      content
      modified
    }
  }
`;

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
      const restUrl = `${WORDPRESS_PAGES_ENDPOINT}?acf_format=standard&slug=${encodeURIComponent(restSlug)}&_fields=id,slug,link,title,content,acf`;

      const [graphResponse, restResponse] = await Promise.all([
        fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: PAGE_GRAPHQL_QUERY,
            variables: { uri },
          }),
          cache: "no-store",
        }),
        fetch(restUrl, {
          cache: "no-store",
        }),
      ]);

      let graphPage: PageNode | undefined;

      if (graphResponse.ok) {
        const graphData = (await graphResponse.json()) as {
          data?: { page?: PageNode };
          errors?: Array<{ message: string }>;
        };

        if (!graphData.errors?.length && graphData.data?.page) {
          graphPage = graphData.data.page;
        }
      }

      if (!restResponse.ok && !graphPage) {
        return NextResponse.json(
          { error: `Failed to fetch ${pageName} data from WordPress.` },
          { status: restResponse.status },
        );
      }

      let restPage: RestPage | undefined;

      if (restResponse.ok) {
        const pages = (await restResponse.json()) as RestPage[];
        restPage = pickRestPageByUri(pages, uri);
      }

      if (!restPage && !graphPage) {
        return NextResponse.json(
          { error: `${pageName} was not found in WordPress.` },
          { status: 404 },
        );
      }

      const mergedPage = {
        id: graphPage?.databaseId ?? restPage?.id,
        slug: graphPage?.slug ?? restPage?.slug,
        link: graphPage?.link ?? restPage?.link,
        title: {
          rendered: graphPage?.title ?? restPage?.title.rendered ?? "",
        },
        content: {
          rendered:
            graphPage?.content ??
            (typeof restPage?.content?.rendered === "string"
              ? restPage.content.rendered
              : ""),
        },
        modified: graphPage?.modified ?? restPage?.modified,
        acf: restPage?.acf ?? null,
        source:
          graphPage && restPage
            ? "graphql+rest-acf"
            : graphPage
              ? "graphql"
              : "rest",
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
