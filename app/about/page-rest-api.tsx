"use client";
import { useEffect, useState } from "react";

export default function AboutPage() {
  // Selector
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/home-page");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPageData(data);
      } catch (error: any) {
        setError("Failed to load page data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{pageData && pageData.acf.banner_section.title_1}</div>;
}
