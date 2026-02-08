/**
 * Calculate reading time for content
 * @param content - Text content to analyze
 * @param wpm - Words per minute (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wpm: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

/**
 * Format reading time as human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "3 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
