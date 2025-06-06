export const locales = ['en', 'no'] as const
export const defaultLocale = 'en' as const

export type Locale = typeof locales[number]

export async function getMessages(locale: string) {
  try {
    return (await import(`./messages/${locale}.json`)).default
  } catch {
    return (await import(`./messages/${defaultLocale}.json`)).default
  }
} 