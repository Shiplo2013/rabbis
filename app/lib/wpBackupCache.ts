import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Last-known-good backup cache for WordPress REST API responses.
//
// This Next.js app runs as a long-lived `next start` process (not a
// serverless/edge function), so the local filesystem persists across
// requests for the lifetime of that process. We use it as a simple,
// dependency-free "stale-if-error" layer: every successful WordPress fetch
// is written here, and if a later fetch fails (upstream outage, SiteGround
// security challenge, malformed response, etc.), we serve the last real
// content instead of an empty placeholder.
const CACHE_DIR = path.join(process.cwd(), ".data", "wp-cache");

type CacheEnvelope<T> = {
  cachedAt: number;
  data: T;
};

// Cache labels are developer-supplied string constants (e.g. "home-page",
// "news-slug-page-my-post"), but we still sanitize defensively before using
// them as filenames.
function cacheFilePath(label: string): string {
  const safeLabel = label.replace(/[^a-zA-Z0-9-_]/g, "_") || "unlabeled";
  return path.join(CACHE_DIR, `${safeLabel}.json`);
}

/**
 * Persist the last-known-good payload for `label`. Failures are logged and
 * swallowed - a backup-cache write failure must never break the request
 * that is currently succeeding.
 */
export async function saveBackupData<T>(label: string, data: T): Promise<void> {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    const envelope: CacheEnvelope<T> = { cachedAt: Date.now(), data };
    await writeFile(cacheFilePath(label), JSON.stringify(envelope), "utf-8");
  } catch (error) {
    console.error(`[${label}] Failed to write backup cache:`, error);
  }
}

/**
 * Read back the last-known-good payload for `label`, if any was ever saved.
 * Returns null on any error (missing file, invalid JSON, etc.) so callers
 * can fall through to their own static fallback.
 */
export async function loadBackupData<T>(label: string): Promise<T | null> {
  try {
    const raw = await readFile(cacheFilePath(label), "utf-8");
    const envelope = JSON.parse(raw) as CacheEnvelope<T>;
    return envelope.data;
  } catch {
    return null;
  }
}
