'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TechnicalExpertise, About } from '@/lib/sanity'
import { getTechnicalExpertise, getAboutContent } from '@/lib/sanity-queries'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const t = useTranslations('about')
  const locale = useLocale()
  const [technicalExpertise, setTechnicalExpertise] = useState<TechnicalExpertise[]>([])
  const [aboutContent, setAboutContent] = useState<About | null>(null)
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [expertise, about] = await Promise.all([
          getTechnicalExpertise(),
          getAboutContent(locale),
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

  useEffect(() => {
    if (loading) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Photo animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Stats animation with counter
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('[data-stat]')
        statNumbers.forEach((stat) => {
          const endValue = parseInt(stat.getAttribute('data-stat') || '0', 10)
          const counter = { value: 0 }

          gsap.to(counter, {
            value: endValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              stat.textContent = Math.round(counter.value) + '+'
            },
          })
        })
      }

      // Skills stagger animation
      if (skillsRef.current) {
        const skillTags = skillsRef.current.querySelectorAll('[data-skill]')
        gsap.fromTo(
          skillTags,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [loading])

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'Frontend'
      case 'backend':
        return 'Backend'
      case 'tools':
        return 'Tools & DevOps'
      default:
        return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }

  // Default statistics if none from CMS
  const defaultStats = [
    { value: '2', label: t('experience') },
    { value: '15', label: t('projects') },
    { value: '5', label: t('clients') },
    { value: '10', label: t('technologies') },
  ]

  const stats = aboutContent?.statistics?.length
    ? aboutContent.statistics.map((s) => ({ value: s.value.replace('+', ''), label: s.label }))
    : defaultStats

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}{' '}
              <span className="text-blue-600">{t('subtitle')}</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            {/* Photo Column */}
            <div ref={photoRef} className="relative">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
                {/* Duotone effect container */}
                <div className="duotone w-full h-full">
                  <Image
                    src="/ingebrigt2.png"
                    alt="Ingebrigt Furnes Bøe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>
              {/* Decorative element */}
              
            </div>

            {/* Text Column */}
            <div ref={contentRef} className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {aboutContent?.passionateTitle || t('passionateTitle')}{' '}
                  <span className="text-blue-600">
                    {aboutContent?.passionateSubtitle || t('passionateSubtitle')}
                  </span>
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {aboutContent?.description1 || t('description1')}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {aboutContent?.description2 || t('description2')}
                </p>
              </div>

              {/* Statistics */}
              <div ref={statsRef} className="grid grid-cols-2 gap-6">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-10 bg-gray-100 rounded mb-1" />
                        <div className="h-4 bg-gray-100 rounded w-2/3" />
                      </div>
                    ))
                  : stats.map((stat, index) => (
                      <div key={index} className="border-l-2 border-blue-600 pl-4">
                        <div
                          data-stat={stat.value}
                          className="text-3xl lg:text-4xl font-bold text-gray-900"
                        >
                          {stat.value}+
                        </div>
                        <div className="text-gray-500 text-sm">{stat.label}</div>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="pt-12 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              {t('technicalTitle')}{' '}
              <span className="text-blue-600">{t('technicalSubtitle')}</span>
            </h3>

            {loading ? (
              <div className="flex flex-wrap justify-center gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
                ))}
              </div>
            ) : technicalExpertise.length > 0 ? (
              <div className="space-y-8">
                {technicalExpertise.map((category) => (
                  <div key={category._id}>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">
                      {getCategoryLabel(category.category)}
                    </h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          data-skill
                          className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center">No technical expertise data available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
