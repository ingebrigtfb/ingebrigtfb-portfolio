import { client, Project } from './sanity'

// GROQ query to fetch all projects
const projectsQuery = `*[_type == "project"] | order(order asc, _createdAt desc) {
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
  order
}`

// GROQ query to fetch only featured projects
const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(order asc, _createdAt desc) {
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
  order
}`

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(projectsQuery)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(featuredProjectsQuery)
    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
} 