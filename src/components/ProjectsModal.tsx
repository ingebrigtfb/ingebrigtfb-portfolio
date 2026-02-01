'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Project } from '@/lib/sanity'

interface ProjectsModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onProjectClick?: (project: Project) => void
}

export default function ProjectsModal({ isOpen, onClose, projects, onProjectClick }: ProjectsModalProps) {
  const [filter, setFilter] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === filter))
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
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as { url?: string }).url || '/api/placeholder/400/300'
      }
      if (typeof project.image.asset === 'object' && '_ref' in project.image.asset) {
        return `/api/placeholder/400/300`
      }
    }

    if (project.title === 'Olav Solberg AS') {
      return '/olavsolberg.png'
    }

    return '/api/placeholder/400/300'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
            <p className="text-gray-500 mt-1">Explore my complete portfolio</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
                onClick={() => onProjectClick?.(project)}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-gray-100 relative">
                  {getImageSrc(project) !== '/api/placeholder/400/300' ? (
                    <Image
                      src={getImageSrc(project)}
                      alt={project.image?.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-blue-600 text-xs font-medium">{project.category}</span>
                    {project.nordcode && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        Nordcode
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium">
                    View Details
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filter or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
