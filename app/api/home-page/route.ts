import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const HOME_PAGE_ENDPOINT =
  "https://dovp7.sg-host.com/wp-json/wp/v2/pages?slug=home";

export async function GET() {
  try {
    const response = await fetch(HOME_PAGE_ENDPOINT, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch home page data from WordPress." },
        { status: response.status },
      );
    }

    const pages = (await response.json()) as Array<{
      id: number;
      slug: string;
      link: string;
      title: { rendered: string };
      acf: Record<string, unknown> | unknown[] | null;
    }>;

    const homePage = pages[0];

    if (!homePage) {
      return NextResponse.json(
        { error: "Home page was not found in WordPress." },
        { status: 404 },
      );
    }

    return NextResponse.json(homePage);
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while loading home page data." },
      { status: 500 },
    );
  }
}
