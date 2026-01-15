import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Project type interface
export interface Project {
  _id: string
  title: string
  category: string
  description: string
  technologies: string[]
  website: string
  github?: string
  image?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  featured: boolean
  nordcode: boolean
  order?: number
}

// Technical Expertise type interface
export interface TechnicalExpertise {
  _id: string
  category: 'frontend' | 'backend' | 'tools'
  skills: string[]
  color: 'teal' | 'emerald' | 'cyan'
  order?: number
}

// About section type interface
export interface About {
  _id: string
  passionateTitle: string
  passionateSubtitle: string
  description1: string
  description2: string
  statistics: Array<{
    value: string
    label: string
    color: 'teal' | 'emerald' | 'cyan' | 'purple'
    order?: number
  }>
  __i18n_lang?: string
} 