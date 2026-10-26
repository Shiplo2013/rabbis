import { useCallback, useState } from "react";

interface CacheEntry<T> {
  data: T;
  hash: string;
  timestamp: number;
  etag?: string;
}

const CACHE_PREFIX = "page_cache_";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Generates a simple hash of the data for comparison
 */
const generateHash = (data: any): string => {
  const json = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
};

/**
 * Reads and validates a cache entry for the given key from localStorage.
 * Returns null on the server, on a cache miss, on expiry (after removing
 * the stale entry), or on any parse/storage error. Pure from the caller's
 * point of view aside from the (idempotent) expired-entry removal, so it's
 * safe to call directly during render as a useState lazy initializer.
 */
function readCacheEntry<T>(cacheKey: string): CacheEntry<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`${CACHE_PREFIX}${cacheKey}`);
    if (!stored) return null;
    const cacheEntry: CacheEntry<T> = JSON.parse(stored);
    if (Date.now() - cacheEntry.timestamp >= CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_PREFIX}${cacheKey}`);
      return null;
    }
    return cacheEntry;
  } catch (error) {
    console.error("Failed to load cache:", error);
    return null;
  }
}

/**
 * Hook for managing page cache with server comparison
 * @param cacheKey - Unique key for this page's cache
 * @param defaultData - Default data if cache doesn't exist
 */
export function usePageCache<T>(cacheKey: string, defaultData: T) {
  const [cachedData, setCachedData] = useState<T | null>(
    () => readCacheEntry<T>(cacheKey)?.data ?? null,
  );
  const [hasUpdated, setHasUpdated] = useState(false);
  // Tracks which cacheKey the state above currently reflects, so a change
  // can be detected and handled synchronously during render instead of via
  // an effect (which would briefly show the previous key's stale value
  // before it re-runs). See
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [loadedForKey, setLoadedForKey] = useState(cacheKey);

  if (cacheKey !== loadedForKey) {
    setLoadedForKey(cacheKey);
    setCachedData(readCacheEntry<T>(cacheKey)?.data ?? null);
  }

  // The read above is synchronous, so there is no separate loading phase.
  const isLoading = false;

  /**
   * Save data to cache
   */
  const saveToCache = useCallback(
    (data: T, etag?: string) => {
      try {
        const cacheEntry: CacheEntry<T> = {
          data,
          hash: generateHash(data),
          timestamp: Date.now(),
          etag,
        };
        localStorage.setItem(
          `${CACHE_PREFIX}${cacheKey}`,
          JSON.stringify(cacheEntry),
        );
        setCachedData(data);
      } catch (error) {
        console.error("Failed to save cache:", error);
      }
    },
    [cacheKey],
  );

  /**
   * Compare server data with cached data
   * Returns true if data has changed
   */
  const hasDataChanged = useCallback(
    (newData: T): boolean => {
      if (!cachedData) return true;

      const newHash = generateHash(newData);
      let storedHash = "";

      try {
        const stored = localStorage.getItem(`${CACHE_PREFIX}${cacheKey}`);
        if (stored) {
          const cacheEntry: CacheEntry<T> = JSON.parse(stored);
          storedHash = cacheEntry.hash;
        }
      } catch (error) {
        console.error("Failed to read cache for comparison:", error);
        return true;
      }

      return newHash !== storedHash;
    },
    [cacheKey, cachedData],
  );

  /**
   * Clear the cache
   */
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${cacheKey}`);
      setCachedData(null);
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }, [cacheKey]);

  return {
    cachedData: cachedData || defaultData,
    isLoading,
    hasUpdated,
    saveToCache,
    hasDataChanged,
    clearCache,
    setCachedData: (data: T) => {
      setCachedData(data);
      setHasUpdated(true);
    },
  };
}

/**
 * Hook for managing multiple data sources with cache comparison
 */
export function useMultiPageCache(
  cacheKey: string,
  defaultData: Record<string, any>,
) {
  const [cachedData, setCachedData] = useState<Record<string, any>>(
    () => readCacheEntry<Record<string, any>>(cacheKey)?.data ?? defaultData,
  );
  const [dataChanged, setDataChanged] = useState<Record<string, boolean>>({});
  // Tracks which cacheKey the state above currently reflects, so a change
  // can be detected and handled synchronously during render instead of via
  // an effect (which would briefly show the previous key's stale value
  // before it re-runs). See
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [loadedForKey, setLoadedForKey] = useState(cacheKey);

  if (cacheKey !== loadedForKey) {
    setLoadedForKey(cacheKey);
    setCachedData(
      readCacheEntry<Record<string, any>>(cacheKey)?.data ?? defaultData,
    );
  }

  // The read above is synchronous, so there is no separate loading phase.
  const isLoading = false;

  const saveToCache = useCallback(
    (data: Record<string, any>, etag?: string) => {
      try {
        const cacheEntry: CacheEntry<Record<string, any>> = {
          data,
          hash: generateHash(data),
          timestamp: Date.now(),
          etag,
        };
        localStorage.setItem(
          `${CACHE_PREFIX}${cacheKey}`,
          JSON.stringify(cacheEntry),
        );
        setCachedData(data);
      } catch (error) {
        console.error("Failed to save cache:", error);
      }
    },
    [cacheKey],
  );

  const updateCacheItem = useCallback(
    (key: string, newData: any) => {
      const updated = { ...cachedData, [key]: newData };
      saveToCache(updated);
    },
    [cachedData, saveToCache],
  );

  const compareAndUpdate = useCallback(
    (newData: Record<string, any>): Record<string, boolean> => {
      const changes: Record<string, boolean> = {};

      Object.keys(newData).forEach((key) => {
        const newHash = generateHash(newData[key]);
        const oldHash = generateHash(cachedData[key]);
        changes[key] = newHash !== oldHash;

        if (changes[key]) {
          updateCacheItem(key, newData[key]);
        }
      });

      setDataChanged(changes);
      return changes;
    },
    [cachedData, updateCacheItem],
  );

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${cacheKey}`);
      setCachedData(defaultData);
    } catch (error) {
      console.error("Failed to clear cache:", error);
    }
  }, [cacheKey, defaultData]);

  return {
    cachedData,
    isLoading,
    dataChanged,
    saveToCache,
    updateCacheItem,
    compareAndUpdate,
    clearCache,
  };
}
