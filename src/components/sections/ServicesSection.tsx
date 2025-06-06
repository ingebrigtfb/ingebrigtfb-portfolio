'use client'

import { useTranslations } from 'next-intl'

export default function ServicesSection() {
  const t = useTranslations('services')
  const services = [
    {
      icon: '⚡',
      title: t('frontend.title'),
      description: t('frontend.description')
    },
    {
      icon: '🔧',
      title: t('backend.title'),
      description: t('backend.description')
    },
    {
      icon: '🚀',
      title: t('fullstack.title'),
      description: t('fullstack.description')
    },
    {
      icon: '💼',
      title: t('consulting.title'),
      description: t('consulting.description')
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              {t('title')} <span className="font-bold text-teal-400">{t('subtitle')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 