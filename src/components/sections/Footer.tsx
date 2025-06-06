'use client'

import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="py-8 bg-gray-900 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400">
            © 2025 Ingebrigt Furnes Bøe. {t('copyright')} {t('madeWith')} ❤️ {t('and')} ☕
          </p>
        </div>
      </div>
    </footer>
  )
} 