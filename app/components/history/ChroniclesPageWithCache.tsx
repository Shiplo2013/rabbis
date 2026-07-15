"use client";

import { useEffect, useState } from "react";
import { useMultiPageCache } from "../../hooks/usePageCache";
import HistoryScriptProvider from "./HistoryScriptProvider";

interface ChronclesPageDataProps {
  data: {
    pageData: any;
    rabbisData: any[];
  };
}

/**
 * Client wrapper for chronicles page with caching
 * - Saves fetched data to browser localStorage
 * - Loads cached data on page load for faster rendering
 * - Compares server data with cached data to detect changes
 * - Updates cache automatically when data changes
 *
 * Usage:
 * Replace the HistoryScriptProvider with ChroniclesPageWithCache in page.tsx
 * and pass the same data prop
 */
export function ChroniclesPageWithCache({ data }: ChronclesPageDataProps) {
  const [serverData] = useState(data);

  // Initialize cache with default data structure
  const defaultCacheData = {
    pageData: data.pageData,
    rabbisData: data.rabbisData || [[], [], [], [], []],
  };

  const { cachedData, compareAndUpdate, dataChanged } = useMultiPageCache(
    "chronicles-page",
    defaultCacheData,
  );

  // Compare server data with cache on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const changes = compareAndUpdate(serverData);

    // Log which data has changed for debugging
    if (changes.pageData) {
      console.log("[Cache] Page data updated from server");
    }
    if (changes.rabbisData) {
      console.log("[Cache] Rabbis data updated from server");
    }
  }, []); // Empty dependency - runs only once on mount

  return (
    <HistoryScriptProvider
      data={{
        pageData: cachedData.pageData,
        rabbisData: cachedData.rabbisData,
      }}
    />
  );
}
