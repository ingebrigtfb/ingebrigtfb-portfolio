import { client, Project } from './sanity'

// GROQ query to fetch all projects with language support
const projectsQuery = (language: string = 'en') => `*[_type == "project" && (!defined(__i18n_lang) || __i18n_lang == "${language}")] | order(order asc, _createdAt desc) {
  _id,
  title,
  category,
  description,
  technologies,
  website,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  featured,
  nordcode,
  order,
  __i18n_lang
}`

// GROQ query to fetch only featured projects with language support
const featuredProjectsQuery = (language: string = 'en') => `*[_type == "project" && featured == true && (!defined(__i18n_lang) || __i18n_lang == "${language}")] | order(order asc, _createdAt desc) {
  _id,
  title,
  category,
  description,
  technologies,
  website,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  featured,
  nordcode,
  order,
  __i18n_lang
}`

export async function getAllProjects(language: string = 'en'): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery(language))
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(language: string = 'en'): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery(language))
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
} 