import { useCallback, useEffect, useState } from "react";

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
 * Hook for managing page cache with server comparison
 * @param cacheKey - Unique key for this page's cache
 * @param defaultData - Default data if cache doesn't exist
 */
export function usePageCache<T>(cacheKey: string, defaultData: T) {
  const [cachedData, setCachedData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUpdated, setHasUpdated] = useState(false);

  // Load from cache on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${CACHE_PREFIX}${cacheKey}`);
      if (stored) {
        const cacheEntry: CacheEntry<T> = JSON.parse(stored);
        const now = Date.now();

        // Check if cache is still valid (not expired)
        if (now - cacheEntry.timestamp < CACHE_DURATION) {
          setCachedData(cacheEntry.data);
        } else {
          // Cache expired, remove it
          localStorage.removeItem(`${CACHE_PREFIX}${cacheKey}`);
        }
      }
    } catch (error) {
      console.error("Failed to load cache:", error);
    }
    setIsLoading(false);
  }, [cacheKey]);

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
  const [cachedData, setCachedData] =
    useState<Record<string, any>>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${CACHE_PREFIX}${cacheKey}`);
      if (stored) {
        const cacheEntry: CacheEntry<Record<string, any>> = JSON.parse(stored);
        const now = Date.now();

        if (now - cacheEntry.timestamp < CACHE_DURATION) {
          setCachedData(cacheEntry.data);
        } else {
          localStorage.removeItem(`${CACHE_PREFIX}${cacheKey}`);
        }
      }
    } catch (error) {
      console.error("Failed to load cache:", error);
    }
    setIsLoading(false);
  }, [cacheKey]);

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
