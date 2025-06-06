import { getRequestConfig } from 'next-intl/server'
 
export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' if locale is undefined
  const validLocale = locale || 'en'
  
  return {
    messages: (await import(`./messages/${validLocale}.json`)).default,
    locale: validLocale
  }
}) 