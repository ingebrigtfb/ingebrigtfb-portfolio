import { client, Project, TechnicalExpertise, About } from './sanity'

// GROQ query to fetch all projects with language support
const projectsQuery = (language: string = 'en') => `*[_type == "project" && (!defined(__i18n_lang) || __i18n_lang == "${language}")] | order(order asc, _createdAt desc) {
  _id,
  title,
  category,
  description,
  technologies,
  website,
  github,
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
  github,
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

// GROQ query to fetch technical expertise categories
const technicalExpertiseQuery = `*[_type == "technicalExpertise"] | order(order asc, _createdAt asc) {
  _id,
  category,
  skills,
  color,
  order
}`

export async function getTechnicalExpertise(): Promise<TechnicalExpertise[]> {
  try {
    const expertise = await client.fetch(technicalExpertiseQuery)
    return expertise
  } catch (error) {
    console.error('Error fetching technical expertise:', error)
    return []
  }
}

// GROQ query to fetch about section content with language support
const aboutQuery = (language: string = 'en') => `*[_type == "about" && (!defined(__i18n_lang) || __i18n_lang == "${language}")][0] {
  _id,
  passionateTitle,
  passionateSubtitle,
  description1,
  description2,
  statistics | order(order asc) {
    value,
    label,
    color,
    order
  },
  __i18n_lang
}`

export async function getAboutContent(language: string = 'en'): Promise<About | null> {
  try {
    const about = await client.fetch(aboutQuery(language))
    return about
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
} 