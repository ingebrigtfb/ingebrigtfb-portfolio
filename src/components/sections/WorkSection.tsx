'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '@/lib/sanity'
import { getFeaturedProjects, getAllProjects } from '@/lib/sanity-queries'
import ProjectsModal from '@/components/ProjectsModal'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'
import ProjectStrip from '@/components/ui/ProjectStrip'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WorkSection() {
  const t = useTranslations('work')
  const locale = useLocale()
  const [, setFeaturedProjects] = useState<Project[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const [featured, all] = await Promise.all([
          getFeaturedProjects(locale),
          getAllProjects(locale),
        ])

        setFeaturedProjects(featured)
        setAllProjects(all)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setFeaturedProjects([])
        setAllProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [locale])

  useEffect(() => {
    if (loading) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [loading])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDetailsModalOpen(true)
  }

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false)
    setSelectedProject(null)
  }

  if (loading) {
    return (
      <section id="work" className="py-24 lg:py-32 bg-surface">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Loading skeleton */}
            <div className="text-center mb-16">
              <div className="h-10 bg-gray-100 rounded w-48 mx-auto mb-4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-96 mx-auto animate-pulse" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="py-12 border-b border-gray-100">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className={`lg:col-span-7 ${i % 2 === 0 ? '' : 'lg:order-2'}`}>
                    <div className="aspect-[16/10] bg-gray-100 rounded-xl animate-pulse" />
                  </div>
                  <div className={`lg:col-span-5 space-y-4 ${i % 2 === 0 ? '' : 'lg:order-1'}`}>
                    <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                    <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-20 bg-gray-100 rounded animate-pulse" />
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Show first 4 projects as strips
  const displayedProjects = allProjects.slice(0, 4)

  return (
    <>
      <section ref={sectionRef} id="work" className="py-24 lg:py-32 bg-surface">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16 px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')} <span className="text-blue-600">{t('subtitle')}</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('description')}
          </p>
        </div>

        {/* Project Strips */}
        <div className="border-t border-gray-100">
          {displayedProjects.map((project, index) => (
            <ProjectStrip
              key={project._id}
              project={project}
              index={index}
              onProjectClick={handleProjectClick}
              viewDetailsText="View Details"
            />
          ))}
        </div>

        {/* View All Projects Button */}
        {allProjects.length > 4 && (
          <div className="text-center mt-16 px-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-blue-200 px-8 py-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="font-medium">{t('viewAll')}</span>
              <span className="text-sm text-gray-500 bg-gray-100 group-hover:bg-blue-100 group-hover:text-blue-600 px-2.5 py-0.5 rounded-full transition-colors">
                {allProjects.length}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Projects Modal */}
      <ProjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={allProjects}
        onProjectClick={handleProjectClick}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        project={selectedProject}
      />
    </>
  )
}
