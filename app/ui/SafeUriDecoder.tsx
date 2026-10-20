export function SafeUriDecoder(encodedString: string): string {
  try {
    return decodeURIComponent(encodedString);
  } catch (error) {
    console.error("Invalid format for decoding:", error);
    return encodedString; // Fallback to original string
  }
}
