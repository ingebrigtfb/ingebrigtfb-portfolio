'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Project } from '@/lib/sanity'

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
}

export default function ProjectsModal({ isOpen, onClose, projects }: ProjectsModalProps) {
  const [filter, setFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter))
    }
  }, [filter, projects])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getImageSrc = (project: Project): string => {
    if (project.image?.asset) {
      // For Sanity images with asset reference
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as any).url || '/api/placeholder/400/300'
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] mx-4 overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">All Projects</h2>
            <p className="text-gray-400 mt-1">Explore my complete portfolio</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === category
                    ? 'bg-teal-500 text-black font-semibold'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {getImageSrc(project) !== '/api/placeholder/400/300' ? (
                    <Image
                      src={getImageSrc(project)}
                      alt={project.image?.alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-20">💻</div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-teal-400 text-xs font-medium">{project.category}</span>
                    {project.nordcode && (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg border border-white/20">
                        Nordcode
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
                  >
                    Visit Website
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl opacity-20 mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your filter or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 