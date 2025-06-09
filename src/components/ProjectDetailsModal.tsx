'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Project } from '@/lib/sanity'

interface ProjectDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const getImageSrc = (project: Project): string => {
    if (project.image?.asset) {
      // For Sanity images with asset reference
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as { url?: string }).url || '/api/placeholder/800/600'
      }
      // For legacy/fallback handling
      if (typeof project.image.asset === 'object' && '_ref' in project.image.asset) {
        return `/api/placeholder/800/600` // Fallback for asset references
      }
    }
    
    // Fallback for hardcoded projects or missing images
    if (project.title === 'Olav Solberg AS') {
      return '/olavsolberg.png'
    }
    
    return '/api/placeholder/800/600'
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl w-full max-w-7xl max-h-[90vh] mx-4 overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors p-2 bg-black/50 rounded-full backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Project Image - Mobile Only */}
          <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          {getImageSrc(project) !== '/api/placeholder/800/600' ? (
                <Image
                  src={getImageSrc(project)}
                  alt={project.image?.alt || project.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20">💻</div>
                </div>
              )}
          </div>
        </div>

        {/* Content - Mobile Layout */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)] lg:hidden">
          {/* Title and Category */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-teal-400 text-sm font-medium bg-teal-400/10 px-4 py-2 rounded-full">
                {project.category}
              </span>
              {project.nordcode && (
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-white/20">
                  Nordcode
                </span>
              )}
              {project.featured && (
                <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-black text-sm font-semibold px-4 py-2 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {project.title}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-white mb-6">Technologies Used</h3>
            <div className="flex flex-wrap gap-4">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="bg-white/10 text-gray-200 font-medium px-5 py-3 rounded-full border border-white/20 hover:border-teal-500/50 hover:bg-white/15 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>



          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 text-center inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-teal-500/25 text-lg"
            >
              <span>Visit Website</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 text-lg"
            >
              Close Details
            </button>
          </div>
        </div>

        {/* Content - Desktop Layout */}
        <div className="hidden lg:flex p-8 h-[calc(90vh-80px)]">
          {/* Left Column - Image + Details */}
          <div className="w-[28rem] pr-8">
            {/* Project Image */}
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative rounded-xl overflow-hidden mb-6 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              {getImageSrc(project) !== '/api/placeholder/800/600' ? (
                <Image
                  src={getImageSrc(project)}
                  alt={project.image?.alt || project.title}
                  fill
                  className="object-contain"
                  sizes="448px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20">💻</div>
                </div>
              )}
            </div>


          </div>

          {/* Right Column - Main Content */}
          <div className="flex-1 pl-8 border-l border-white/10 flex flex-col">
            {/* Title and Category */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-teal-400 text-sm font-medium bg-teal-400/10 px-4 py-2 rounded-full">
                  {project.category}
                </span>
                {project.nordcode && (
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-white/20">
                    Nordcode
                  </span>
                )}
                {project.featured && (
                  <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-black text-sm font-semibold px-4 py-2 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="mb-8 flex-1">
              <h3 className="text-2xl font-semibold text-white mb-6">Technologies Used</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-white/10 text-gray-200 font-medium px-4 py-2 rounded-full border border-white/20 hover:border-teal-500/50 hover:bg-white/15 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-teal-500/25 text-lg"
              >
                <span>Visit Website</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 text-lg"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 