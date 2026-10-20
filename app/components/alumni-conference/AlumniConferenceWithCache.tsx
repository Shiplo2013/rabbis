"use client";

import { useEffect } from "react";
import { useMultiPageCache } from "../../hooks/usePageCache";
import ConferenceScriptProvider from "./ConferenceScriptProvider";

interface AlumniConferencePageWithCacheProps {
  data: any;
}

/**
 * Client wrapper for alumni-conference page with caching
 * - Saves fetched page data and images to browser localStorage
 * - Loads cached data on page load for faster rendering
 * - Compares server data with cached data to detect changes
 * - Updates cache automatically when data changes
 * - Optimized for image-heavy pages
 *
 * Usage:
 * Replace ConferenceScriptProvider with AlumniConferenceWithCache in page.tsx
 * and pass the same data prop
 */
export function AlumniConferenceWithCache({
  data,
}: AlumniConferencePageWithCacheProps) {
  const serverData = data;

  // Initialize cache with default data structure
  const defaultCacheData = {
    pageData: data,
  };

  const { cachedData, compareAndUpdate } = useMultiPageCache(
    "alumni-conference-page",
    defaultCacheData,
  );

  // Compare server data with cache whenever it changes
  useEffect(() => {
    const changes = compareAndUpdate({ pageData: serverData });

    // Log changes for debugging
    if (changes.pageData) {
      console.log("[Cache] Alumni conference page data updated from server");
    }
  }, [compareAndUpdate, serverData]);

  return <ConferenceScriptProvider data={cachedData.pageData} />;
}
