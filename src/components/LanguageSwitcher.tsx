'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const t = useTranslations('language')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)



  const switchLanguage = (newLocale: string) => {
    // For our [locale] route structure, we need to handle this differently
    const segments = pathname.split('/').filter(Boolean)
    
    // If we're on a locale route like /en or /no
    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'no')) {
      // Replace the locale segment
      segments[0] = newLocale
      const newPath = `/${segments.join('/')}`
      router.push(newPath)
    } else {
      // If we're on root or no locale, just add the locale
      router.push(`/${newLocale}`)
    }
    setIsOpen(false)
  }

  // Get current locale from pathname as backup
  const pathnameLocale = pathname.split('/')[1]
  const actualLocale = pathnameLocale === 'no' || pathnameLocale === 'en' ? pathnameLocale : locale
  
  const currentFlag = actualLocale === 'no' ? '🇳🇴' : '🇬🇧'
  const currentLang = actualLocale === 'no' ? 'NO' : 'EN'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 hover:border-white/30"
        aria-label={t('switch')}
      >
        <span className="text-lg">{currentFlag}</span>
        <span className="text-sm font-medium text-white">{currentLang}</span>
        <svg 
          className={`w-4 h-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-gray-900 border border-white/20 rounded-lg shadow-xl overflow-hidden z-50 min-w-[120px]">
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors ${
              actualLocale === 'en' ? 'bg-teal-500/20 text-teal-400' : 'text-white'
            }`}
          >
            <span className="text-lg">🇬🇧</span>
            <span className="text-sm font-medium">{t('english')}</span>
          </button>
          <button
            onClick={() => switchLanguage('no')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors ${
              actualLocale === 'no' ? 'bg-teal-500/20 text-teal-400' : 'text-white'
            }`}
          >
            <span className="text-lg">🇳🇴</span>
            <span className="text-sm font-medium">{t('norwegian')}</span>
          </button>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
} 