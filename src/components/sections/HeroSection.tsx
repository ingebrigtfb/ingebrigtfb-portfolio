'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'

export default function HeroSection() {
  const t = useTranslations('hero')
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const silhouettesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set([nameRef.current, titleRef.current, descRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30,
      })
      gsap.set(scrollRef.current, { opacity: 0 })

      // Silhouette animations
      const silhouettes = silhouettesRef.current?.querySelectorAll('.silhouette')
      if (silhouettes) {
        gsap.set(silhouettes, { opacity: 0, scale: 0.8 })
        gsap.to(silhouettes, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.3,
        })
      }

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')

      // Floating animation for silhouettes
      if (silhouettes) {
        silhouettes.forEach((el, i) => {
          gsap.to(el, {
            y: `${10 + i * 5}`,
            duration: 3 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-height bg-surface flex items-center justify-center relative overflow-hidden"
    >
      {/* Silhouettes / Abstract shapes */}
      <div ref={silhouettesRef} className="absolute inset-0 pointer-events-none">
        {/* Large circle - top right */}
        <div className="silhouette absolute -top-20 -right-20 w-80 h-80 lg:w-[500px] lg:h-[500px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-50 opacity-60" />
        </div>

        {/* Ring - left side */}
        <div className="silhouette absolute top-1/4 -left-16 w-48 h-48 lg:w-72 lg:h-72">
          <div className="w-full h-full rounded-full border-[20px] lg:border-[30px] border-gray-100 opacity-80" />
        </div>

        {/* Small filled circle - bottom left */}
        <div className="silhouette absolute bottom-1/4 left-[10%] w-24 h-24 lg:w-32 lg:h-32">
          <div className="w-full h-full rounded-full bg-blue-200/40" />
        </div>

        {/* Cross/Plus shape - right side middle */}
        <div className="silhouette absolute top-1/2 right-[8%] w-20 h-20 lg:w-28 lg:h-28 hidden md:block">
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200/60 -translate-y-1/2 rounded-full" />
            <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-200/60 -translate-x-1/2 rounded-full" />
          </div>
        </div>

        {/* Diagonal line - bottom right */}
        <div className="silhouette absolute bottom-[15%] right-[15%] w-32 h-1 lg:w-48 bg-blue-200/50 rotate-45 rounded-full hidden lg:block" />

        {/* Small dots pattern - scattered */}
        <div className="silhouette absolute top-[20%] left-[20%] w-3 h-3 rounded-full bg-gray-300/50 hidden lg:block" />
        <div className="silhouette absolute top-[25%] left-[25%] w-2 h-2 rounded-full bg-blue-300/50 hidden lg:block" />
        <div className="silhouette absolute bottom-[30%] right-[25%] w-4 h-4 rounded-full bg-gray-200/60 hidden lg:block" />

        {/* Arc/Curve - bottom */}
        <div className="silhouette absolute -bottom-32 left-1/4 w-64 h-64 lg:w-96 lg:h-96">
          <div className="w-full h-full rounded-full border-[30px] lg:border-[40px] border-gray-100/50 opacity-60" />
        </div>

        {/* Square rotated - top left */}
        <div className="silhouette absolute top-[15%] left-[15%] w-16 h-16 lg:w-24 lg:h-24 rotate-45 hidden md:block">
          <div className="w-full h-full bg-blue-100/30 rounded-lg" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 text-sm sm:text-base font-medium tracking-wide mb-4 sm:mb-6">
            {t('greeting')}
          </p>

          <h1
            ref={nameRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight"
          >
            {t('name')}
          </h1>

          <p
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl text-gray-500 font-light mb-6 sm:mb-8"
          >
            {t('title')}
          </p>

          <p
            ref={descRef}
            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12"
          >
            {t('description')}
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('getInTouch')}
            </a>
            <a
              href="#work"
              className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium py-3.5 px-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              {t('viewWork')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-gray-900 transition-colors group"
          aria-label="Scroll to about section"
        >
          <div className="w-5 h-8 border border-gray-300 rounded-full flex justify-center pt-1.5 group-hover:border-gray-900 transition-colors">
            <div className="w-1 h-2 bg-current rounded-full animate-bounce-subtle" />
          </div>
        </a>
      </div>
    </section>
  )
}
