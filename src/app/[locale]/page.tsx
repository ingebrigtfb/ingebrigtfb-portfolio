'use client'

import { useState, useEffect } from 'react'
import HeroSection from '../../components/sections/HeroSection'
import AboutSection from '../../components/sections/AboutSection'
import WorkSection from '../../components/sections/WorkSection'
import ServicesSection from '../../components/sections/ServicesSection'
import ContactSection from '../../components/sections/ContactSection'
import Footer from '../../components/sections/Footer'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'services', 'contact']
      const scrollPosition = window.scrollY + 100

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

  return (
    <main className="min-h-screen pt-20">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
} 