'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Project } from '@/lib/sanity'
import { getFeaturedProjects, getAllProjects } from '@/lib/sanity-queries'
import ProjectsModal from '@/components/ProjectsModal'
import ProjectDetailsModal from '@/components/ProjectDetailsModal'

export default function WorkSection() {
  const t = useTranslations('work')
  const locale = useLocale()
  const [, setFeaturedProjects] = useState<Project[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const [featured, all] = await Promise.all([
          getFeaturedProjects(locale),
          getAllProjects(locale)
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

  const getImageSrc = (project: Project): string => {
    if (project.image?.asset) {
      // For Sanity images with asset reference
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as { url?: string }).url || '/api/placeholder/400/300'
      }
      // For legacy/fallback handling
      if (typeof project.image.asset === 'object' && '_ref' in project.image.asset) {
        return `/api/placeholder/400/300` // Fallback for asset references
      }
    }
    
    // Fallback for hardcoded projects or missing images
    if (project.title === 'Olav Solberg AS') {
      return '/olavsolberg.png'
    }
    
    return '/api/placeholder/400/300'
  }

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
      <section id="work" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/10 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-96 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="work" className="py-20 bg-black">
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
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {allProjects.slice(0, 4).map((project) => (
                <div 
                  key={project._id}
                  onClick={() => handleProjectClick(project)}
                  className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {getImageSrc(project) !== '/api/placeholder/400/300' ? (
                      <Image
                        src={getImageSrc(project)}
                        alt={project.image?.alt || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-20">💻</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-teal-400 text-sm font-medium">{project.category}</span>
                      {project.nordcode && (
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/20">
                          Nordcode
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <div className="bg-teal-500 hover:bg-teal-400 text-black font-semibold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Projects Button */}
            {allProjects.length > 0 && (
              <div className="text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group inline-flex items-center gap-2 bg-white/10 hover:bg-teal-500/20 text-white border border-white/20 hover:border-teal-500/50 px-8 py-3 rounded-full transition-all duration-300"
                >
                  <span>{t('viewAll')}</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="bg-teal-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
                    {allProjects.length}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
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