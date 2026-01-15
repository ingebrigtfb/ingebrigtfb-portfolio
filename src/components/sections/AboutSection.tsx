'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { TechnicalExpertise, About } from '@/lib/sanity'
import { getTechnicalExpertise, getAboutContent } from '@/lib/sanity-queries'

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()
  const [technicalExpertise, setTechnicalExpertise] = useState<TechnicalExpertise[]>([])
  const [aboutContent, setAboutContent] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [expertise, about] = await Promise.all([
          getTechnicalExpertise(),
          getAboutContent(locale)
        ])
        setTechnicalExpertise(expertise)
        setAboutContent(about)
      } catch (error) {
        console.error('Error fetching about section data:', error)
        setTechnicalExpertise([])
        setAboutContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return {
          bg: 'bg-teal-500/20',
          text: 'text-teal-300',
          border: 'border-teal-500/30',
        }
      case 'emerald':
        return {
          bg: 'bg-emerald-500/20',
          text: 'text-emerald-300',
          border: 'border-emerald-500/30',
        }
      case 'cyan':
        return {
          bg: 'bg-cyan-500/20',
          text: 'text-cyan-300',
          border: 'border-cyan-500/30',
        }
      default:
        return {
          bg: 'bg-teal-500/20',
          text: 'text-teal-300',
          border: 'border-teal-500/30',
        }
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend'
      case 'backend':
        return 'Backend'
      case 'tools':
        return 'Tools'
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  const getStatColorClass = (color: string) => {
    switch (color) {
      case 'teal':
        return 'text-teal-400 hover:border-teal-500/50'
      case 'emerald':
        return 'text-emerald-400 hover:border-emerald-500/50'
      case 'cyan':
        return 'text-cyan-400 hover:border-cyan-500/50'
      case 'purple':
        return 'text-purple-400 hover:border-purple-500/50'
      default:
        return 'text-teal-400 hover:border-teal-500/50'
    }
  }
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              {t('title')} <span className="font-bold text-teal-400">{t('subtitle')}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full"></div>
          </div>

          {/* Statistics */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center animate-pulse">
                  <div className="h-10 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          ) : aboutContent?.statistics && aboutContent.statistics.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {aboutContent.statistics.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center transition-all duration-300 hover:transform hover:scale-105 ${getStatColorClass(stat.color)}`}
                >
                  <div className={`text-3xl md:text-4xl font-bold mb-2`}>{stat.value}</div>
                  <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-teal-400 mb-2">2+</div>
                <div className="text-gray-300 text-sm md:text-base">{t('experience')}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">15+</div>
                <div className="text-gray-300 text-sm md:text-base">{t('projects')}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-gray-300 text-sm md:text-base">{t('clients')}</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">10+</div>
                <div className="text-gray-300 text-sm md:text-base">{t('technologies')}</div>
              </div>
            </div>
          )}
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-light text-white mb-6">
                  {aboutContent?.passionateTitle || t('passionateTitle')}{' '}
                  <span className="font-bold text-teal-400">
                    {aboutContent?.passionateSubtitle || t('passionateSubtitle')}
                  </span>
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {aboutContent?.description1 || t('description1')}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {aboutContent?.description2 || t('description2')}
                </p>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-light text-white mb-8">
                {t('technicalTitle')} <span className="font-bold text-teal-400">{t('technicalSubtitle')}</span>
              </h3>
              
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-24 mb-3"></div>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-8 bg-white/10 rounded-full w-24"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : technicalExpertise.length > 0 ? (
                <div className="space-y-6">
                  {technicalExpertise.map((category) => {
                    const colorClasses = getColorClasses(category.color)
                    return (
                      <div key={category._id}>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                          {getCategoryLabel(category.category)}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`${colorClasses.bg} ${colorClasses.text} px-4 py-2 rounded-full text-sm font-medium border ${colorClasses.border}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <p>No technical expertise data available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 