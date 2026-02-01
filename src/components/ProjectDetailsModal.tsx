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
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as { url?: string }).url || '/api/placeholder/800/600'
      }
      if (typeof project.image.asset === 'object' && '_ref' in project.image.asset) {
        return `/api/placeholder/800/600`
      }
    }

    if (project.title === 'Olav Solberg AS') {
      return '/olavsolberg.png'
    }

    return '/api/placeholder/800/600'
  }

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] mx-4 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white/80 rounded-full backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Project Image */}
          <div className="aspect-video bg-gray-100 relative">
            {getImageSrc(project) !== '/api/placeholder/800/600' ? (
              <Image
                src={getImageSrc(project)}
                alt={project.image?.alt || project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Project Info */}
          <div className="p-8">
            {/* Category & Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-blue-600 text-sm font-medium bg-blue-50 px-4 py-1.5 rounded-full">
                {project.category}
              </span>
              {project.nordcode && (
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1.5 rounded-full">
                  Nordcode
                </span>
              )}
              {project.featured && (
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{project.description}</p>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-full border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
              >
                <span>Visit Website</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View Code</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-3 px-6 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
