'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import gsap from 'gsap'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastScrollY = useRef(0)
  const navRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const t = useTranslations('nav')

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Magnetic hover effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const item = navItemsRef.current[index]
    if (!item) return

    const rect = item.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(item, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const item = navItemsRef.current[index]
    if (!item) return

    gsap.to(item, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])

  // CTA magnetic effect
  const handleCtaMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return

    const rect = ctaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(ctaRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [])

  const handleCtaMouseLeave = useCallback(() => {
    if (!ctaRef.current) return

    gsap.to(ctaRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }, [])

  // Cursor follower for nav area
  const handleNavMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorRef.current) return

    const navRect = e.currentTarget.getBoundingClientRect()
    gsap.to(cursorRef.current, {
      x: e.clientX - navRect.left,
      y: e.clientY - navRect.top,
      opacity: 0.5,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out',
    })
  }, [])

  const handleNavMouseLeave = useCallback(() => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const sections = ['hero', 'about', 'work', 'services', 'contact']
      const scrollPosition = currentScrollY + 100

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(currentScrollY / docHeight, 1)
      setScrollProgress(progress)

      if (currentScrollY < 50) {
        setIsVisible(true)
        setIsAtTop(true)
      } else {
        setIsAtTop(false)
        if (currentScrollY < lastScrollY.current) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY.current + 10) {
          setIsVisible(false)
          setIsOpen(false)
        }
      }

      lastScrollY.current = currentScrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'work', href: '#work' },
    { key: 'services', href: '#services' },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isAtTop
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100'
      }`}
    >
      {/* Animated scroll progress */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100">
        <div
          className="h-full bg-gray-900 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover effect */}
          <a
            href="#hero"
            className="group relative text-lg font-semibold text-gray-900 tracking-tight"
            onClick={handleHomeClick}
          >
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">I</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">I</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '20ms' }}>n</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '20ms' }}>n</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '40ms' }}>g</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '40ms' }}>g</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '60ms' }}>e</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '60ms' }}>e</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '80ms' }}>b</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '80ms' }}>b</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '100ms' }}>r</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '100ms' }}>r</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '120ms' }}>i</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '120ms' }}>i</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '140ms' }}>g</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '140ms' }}>g</span>
            </span>
            <span className="relative inline-block overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '160ms' }}>t</span>
              <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full" style={{ transitionDelay: '160ms' }}>t</span>
            </span>
            <span className="text-gray-400 font-normal ml-1.5">FB</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Nav links with magnetic effect */}
            <div
              className="relative flex items-center gap-1"
              onMouseMove={handleNavMouseMove}
              onMouseLeave={handleNavMouseLeave}
            >
              {/* Cursor follower */}
              <div
                ref={cursorRef}
                className="absolute w-10 h-10 bg-gray-100 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ opacity: 0, scale: 0 }}
              />

              {navItems.map((item, index) => {
                const sectionName = item.href.replace('#', '')
                const isActive = activeSection === sectionName
                return (
                  <a
                    key={item.key}
                    ref={(el) => { navItemsRef.current[index] = el }}
                    href={item.href}
                    onClick={item.key === 'home' ? handleHomeClick : undefined}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    className={`relative z-10 px-4 py-2 text-sm tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span className="relative">
                      {t(item.key)}
                      {/* Active indicator dot */}
                      <span
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-900 transition-all duration-300 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}
                      />
                    </span>
                  </a>
                )
              })}
            </div>

            {/* CTA with magnetic effect */}
            <a
              ref={ctaRef}
              href="#contact"
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              className="relative text-sm text-white bg-gray-900 px-5 py-2.5 rounded-full overflow-hidden group"
            >
              <span className="relative z-10">{t('contact')}</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <span
                  className={`absolute top-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 origin-center ${
                    isOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'group-hover:w-4'
                  }`}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 right-0 h-0.5 bg-gray-900 transition-all duration-300 ${
                    isOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-full'
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300 origin-center ${
                    isOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'group-hover:w-5'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 border-t border-gray-100">
            {navItems.map((item, index) => {
              const sectionName = item.href.replace('#', '')
              const isActive = activeSection === sectionName
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block py-3 text-2xl font-light transition-all duration-500 ${
                    isActive ? 'text-gray-900 translate-x-2' : 'text-gray-400 hover:text-gray-900 hover:translate-x-2'
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? (isActive ? 'translateX(8px)' : 'translateX(0)') : 'translateX(-20px)',
                  }}
                  onClick={(e) => {
                    if (item.key === 'home') {
                      handleHomeClick(e)
                    }
                    setIsOpen(false)
                  }}
                >
                  {t(item.key)}
                </a>
              )
            })}

            <a
              href="#contact"
              className="inline-block mt-6 text-sm text-white bg-gray-900 px-6 py-3 rounded-full"
              style={{
                transitionDelay: isOpen ? '300ms' : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              }}
              onClick={() => setIsOpen(false)}
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
