export const locales = ["id", "en", "de", "ja"] as const
export type Locale = (typeof locales)[number]
