'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Project } from '@/lib/sanity'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectStripProps {
  project: Project
  index: number
  onProjectClick: (project: Project) => void
  viewDetailsText: string
}

export default function ProjectStrip({
  project,
  index,
  onProjectClick,
  viewDetailsText,
}: ProjectStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isEven = index % 2 === 0

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !stripRef.current) return

    const ctx = gsap.context(() => {
      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: isEven ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stripRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: isEven ? 60 : -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stripRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        )
      }
    }, stripRef)

    return () => ctx.revert()
  }, [isEven])

  const getImageSrc = (): string => {
    if (project.image?.asset) {
      if (typeof project.image.asset === 'object' && 'url' in project.image.asset) {
        return (project.image.asset as { url?: string }).url || '/api/placeholder/800/600'
      }
    }
    if (project.title === 'Olav Solberg AS') {
      return '/olavsolberg.png'
    }
    return '/api/placeholder/800/600'
  }

  const imageSrc = getImageSrc()

  return (
    <div
      ref={stripRef}
      className="group relative py-12 lg:py-16 border-b border-gray-100 last:border-b-0 cursor-pointer"
      onClick={() => onProjectClick(project)}
    >
      {/* Background highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            isEven ? '' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Image */}
          <div
            ref={imageRef}
            className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 group-hover:shadow-2xl group-hover:shadow-gray-200/50 transition-shadow duration-500">
              {imageSrc !== '/api/placeholder/800/600' ? (
                <Image
                  src={imageSrc}
                  alt={project.image?.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-6xl opacity-30">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className={`${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
              {/* Category & Badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-medium text-blue-600">
                  {project.category}
                </span>
                {project.nordcode && (
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    Nordcode
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-xs text-gray-400 px-2 py-1.5">
                    +{project.technologies.length - 5} more
                  </span>
                )}
              </div>

              {/* View Details Link */}
              <div className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
                <span>{viewDetailsText}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
