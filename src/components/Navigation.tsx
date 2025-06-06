'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'services', 'contact']
      const scrollPosition = window.scrollY + 100

      // Update scrolled state for navbar transparency
      setScrolled(window.scrollY > 50)

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'work', href: '#work' },
    { key: 'services', href: '#services' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#hero" className="group">
              <div className="text-xl lg:text-2xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                Ingebrigt <span className="text-teal-400 group-hover:text-white">Furnes Bøe</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionName = item.href.replace('#', '')
              const isActive = activeSection === sectionName
              return (
                <a
                  key={item.key}
                  href={item.href}
                  className={`relative py-2 px-1 text-sm font-medium transition-all duration-300 group ${
                    isActive 
                      ? 'text-teal-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t(item.key)}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 transform origin-left transition-all duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
              )
            })}
            
            {/* CTA Button */}
            <a 
              href="#contact"
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-semibold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
            >
              {t('contact')}
            </a>
            
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 text-white hover:text-teal-400 transition-colors duration-300 focus:outline-none group"
              aria-label="Toggle menu"
            >
              <div className="relative w-full h-full flex flex-col justify-center items-center">
                {/* Top line */}
                <span className={`block w-6 h-0.5 bg-current rounded-full transform transition-all duration-500 ease-in-out ${
                  isOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`}></span>
                
                {/* Middle line */}
                <span className={`block w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                
                {/* Bottom line */}
                <span className={`block w-6 h-0.5 bg-current rounded-full transform transition-all duration-500 ease-in-out ${
                  isOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="py-4 px-4 bg-black/95 backdrop-blur-xl rounded-2xl mt-4 mb-4 border border-white/10 shadow-2xl">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const sectionName = item.href.replace('#', '')
                  const isActive = activeSection === sectionName
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive 
                          ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(item.key)}
                    </a>
                  )
                })}
                
                {/* Mobile CTA */}
                <a 
                  href="#contact"
                  className="block w-full mt-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-black font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  {t('contact')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 