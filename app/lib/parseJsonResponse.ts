export async function parseJsonResponse<T>(
  response: Response,
  fallback: T,
  label: string,
): Promise<T> {
  if (!response.ok) {
    console.error(
      `[${label}] Request failed with status ${response.status} ${response.statusText}`,
    );
    return fallback;
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
        `[${label}] Request blocked by upstream security challenge (SiteGround sgcaptcha). Returning fallback data.`,
      );
    } else {
      console.error(
        `[${label}] Expected JSON but received '${contentType || "unknown"}'. Response preview: ${preview}`,
      );
    }
    return fallback;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    console.error(`[${label}] Failed to parse JSON response:`, error);
    return fallback;
  }
}
