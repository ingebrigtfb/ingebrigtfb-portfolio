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
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'no')) {
      segments[0] = newLocale
      const newPath = `/${segments.join('/')}`
      router.push(newPath)
    } else {
      router.push(`/${newLocale}`)
    }
    setIsOpen(false)
  }

  const pathnameLocale = pathname.split('/')[1]
  const actualLocale = pathnameLocale === 'no' || pathnameLocale === 'en' ? pathnameLocale : locale
  const currentLang = actualLocale === 'no' ? 'NO' : 'EN'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        aria-label={t('switch')}
      >
        <span className="font-medium">{currentLang}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden z-50 min-w-[80px]">
          <button
            onClick={() => switchLanguage('en')}
            className={`w-full px-3 py-2 text-left text-sm transition-colors ${
              actualLocale === 'en' ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => switchLanguage('no')}
            className={`w-full px-3 py-2 text-left text-sm transition-colors ${
              actualLocale === 'no' ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            NO
          </button>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
