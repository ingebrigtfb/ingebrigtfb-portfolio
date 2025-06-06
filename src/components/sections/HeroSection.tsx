'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center pt-8 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Mobile Image - Top */}
        <div className="lg:hidden mb-8 flex justify-center">
          <div className="relative w-48 h-60 rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <Image
              src="/ingebrigt3.png"
              alt="Ingebrigt Furnes Bøe"
              fill
              sizes="(max-width: 1024px) 192px, 320px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <p className="text-teal-400 text-lg md:text-xl mb-4 animate-fade-in">
                {t('greeting')}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 animate-slide-up">
                <span className="font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  {t('name')}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 animate-slide-up-delay">
                {t('title')}
              </h2>
            </div>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0 animate-fade-in-delay">
              {t('description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center animate-fade-in-delay-2">
              <a 
                href="#contact"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-500/25 transform hover:scale-105"
              >
                {t('getInTouch')}
              </a>
              <a 
                href="#work"
                className="border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {t('viewWork')}
              </a>
            </div>
          </div>

          {/* Images */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 animate-fade-in-delay">
                <div className="relative w-80 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-teal-500/50 transition-all duration-500 transform hover:scale-105">
                  <Image
                    src="/ingebrigt2.png"
                    alt="Ingebrigt Furnes Bøe"
                    fill
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Secondary image */}
              <div className="absolute -top-8 -right-12 z-0 animate-fade-in-delay-2">
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-xl border-3 border-white/5 opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-105">
                  <Image
                    src="/ingebrigt1.JPG"
                    alt="Ingebrigt Furnes Bøe"
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-8 w-32 h-32 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -top-12 -left-16 w-24 h-24 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>
          </div>


        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-teal-400 hover:text-teal-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
} 