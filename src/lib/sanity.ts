import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

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