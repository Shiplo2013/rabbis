import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const GRAPHQL_ENDPOINT = "https://dovp7.sg-host.com/graphql";
const HOME_PAGE_ENDPOINT =
  "https://dovp7.sg-host.com/wp-json/wp/v2/pages?acf_format=standard&slug=home&_fields=id,slug,link,title,acf";

const HOME_PAGE_GRAPHQL_QUERY = `
  query HomePage($uri: ID!) {
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

export async function GET() {
  try {
    const [graphResponse, restResponse] = await Promise.all([
      fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: HOME_PAGE_GRAPHQL_QUERY,
          variables: { uri: "home" },
        }),
        cache: "no-store",
      }),
      fetch(HOME_PAGE_ENDPOINT, {
        cache: "no-store",
      }),
    ]);

    if (!restResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch home page data from WordPress." },
        { status: restResponse.status },
      );
    }

    const pages = (await restResponse.json()) as Array<{
      id: number;
      slug: string;
      link: string;
      title: { rendered: string };
      content?: { rendered: string };
      modified?: string;
      acf: Record<string, unknown> | unknown[] | null;
    }>;

    const homePage = pages[0];

    if (!homePage) {
      return NextResponse.json(
        { error: "Home page was not found in WordPress." },
        { status: 404 },
      );
    }

    let graphPage:
      | {
          id: string;
          databaseId: number;
          slug: string;
          uri: string;
          link: string;
          title: string;
          content: string | null;
          modified: string;
        }
      | undefined;

    if (graphResponse.ok) {
      const graphData = (await graphResponse.json()) as {
        data?: {
          page?: {
            id: string;
            databaseId: number;
            slug: string;
            uri: string;
            link: string;
            title: string;
            content: string | null;
            modified: string;
          };
        };
        errors?: Array<{ message: string }>;
      };

      if (!graphData.errors?.length && graphData.data?.page) {
        graphPage = graphData.data.page;
      }
    }

    const mergedHomePage = {
      // GraphQL base fields when available
      id: graphPage?.databaseId ?? homePage.id,
      slug: graphPage?.slug ?? homePage.slug,
      link: graphPage?.link ?? homePage.link,
      title: {
        rendered: graphPage?.title ?? homePage.title.rendered,
      },
      content: {
        rendered:
          graphPage?.content ??
          (typeof homePage.content?.rendered === "string"
            ? homePage.content.rendered
            : ""),
      },
      modified: graphPage?.modified ?? homePage.modified,
      // REST ACF fallback (WPGraphQL on this server does not expose ACF)
      acf: homePage.acf,
      source: graphPage ? "graphql+rest-acf" : "rest",
    };

    return NextResponse.json(mergedHomePage);
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while loading home page data." },
      { status: 500 },
    );
  }
}
