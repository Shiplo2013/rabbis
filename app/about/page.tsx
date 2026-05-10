export const revalidate = 300;

type WpPage = {
  id: number;
  slug?: string;
  link?: string;
  title?: { rendered?: string };
  acf?: {
    banner_section?: {
      title_1?: string;
      title_2?: string;
      title_3?: string;
      subtitle?: string;
    };
  };
};

async function getPages(): Promise<WpPage[]> {
  try {
    const response = await fetch(
      "https://dovp7.sg-host.com/wp-json/wp/v2/pages?slug=home&_fields=id,slug,link,title,acf?_embed",
      {
        next: { revalidate },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to load posts. Status: ${response.status}`);
    }

    const pages = (await response.json()) as WpPage[];

    return pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

export default async function About() {
  const pages = await getPages();
  const totalPages = pages.length;

  return (
    <main className="relative pb-10 pt-10 lg:pt-0 lg:mt-[-3%]">
      <div className="t40-container w-full">
        {totalPages > 0 ? (
          <div>
            <h1>About Page</h1>
            <p>{totalPages}</p>
          </div>
        ) : (
          <div className="w-full h-75 flex items-center justify-center">
            <h2 className="text-2xl font-bold">No pages found.</h2>
          </div>
        )}
      </div>
    </main>
  );
}
