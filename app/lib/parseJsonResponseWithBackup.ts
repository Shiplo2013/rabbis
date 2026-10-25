import "server-only";
import { loadBackupData, saveBackupData } from "./wpBackupCache";

// Server-only counterpart to parseJsonResponse: same response validation
// (status, content-type, JSON parsing), but on any failure it prefers the
// last-known-good backup (see wpBackupCache.ts) over the static `fallback`
// placeholder, and on success it persists the parsed data as the new
// backup. This must stay out of parseJsonResponse.ts itself, since that
// module is also imported by client components (e.g. MainMenu.tsx) and
// bundling its node:fs-based backup cache into client code breaks the
// browser build.
export async function parseJsonResponseWithBackup<T>(
  response: Response,
  fallback: T,
  label: string,
): Promise<T> {
  if (!response.ok) {
    console.error(
      `[${label}] Request failed with status ${response.status} ${response.statusText}`,
    );
    return useBackupOrFallback(label, fallback);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    let preview = "";
    try {
      preview = (await response.text()).slice(0, 200);
    } catch {
      preview = "<unavailable>";
    }

    const isSiteGroundCaptcha =
      preview.includes("/.well-known/sgcaptcha/") ||
      preview.includes('http-equiv="refresh"');

    if (isSiteGroundCaptcha) {
      console.error(
        `[${label}] Request blocked by upstream security challenge (SiteGround sgcaptcha). Returning backup or fallback data.`,
      );
    } else {
      console.error(
        `[${label}] Expected JSON but received '${contentType || "unknown"}'. Response preview: ${preview}`,
      );
    }
    return useBackupOrFallback(label, fallback);
  }

  try {
    const data = (await response.json()) as T;
    // Persist this successful response so a future failed request can fall
    // back to real content instead of the static placeholder fallback.
    await saveBackupData(label, data);
    return data;
  } catch (error) {
    console.error(`[${label}] Failed to parse JSON response:`, error);
    return useBackupOrFallback(label, fallback);
  }
}

// Prefer the last-known-good backup over the static placeholder fallback,
// so visitors see real (if slightly stale) content during an upstream
// outage instead of an empty-shell page.
async function useBackupOrFallback<T>(label: string, fallback: T): Promise<T> {
  const backup = await loadBackupData<T>(label);
  if (backup !== null) {
    console.warn(`[${label}] Serving last-known-good backup data.`);
    return backup;
  }
  return fallback;
}
