// Auto-translation service for Sanity content
// You can use Google Translate API, DeepL, or other services

interface TranslateOptions {
  text: string
  from: string
  to: string
}

interface TranslatedProject {
  _id: string
  title: string
  category: string
  description: string
  technologies: string[]
  __i18n_lang: string
}

// Simple translation mapping (replace with actual API calls)
const translations: Record<string, Record<string, string>> = {
  'Web Development': {
    no: 'Webutvikling'
  },
  'Mobile App': {
    no: 'Mobilapp'
  },
  'E-commerce': {
    no: 'E-handel'
  },
  'Web Design': {
    no: 'Webdesign'
  },
  'Data Visualization': {
    no: 'Datavisualisering'
  },
  'Other': {
    no: 'Annet'
  }
}

// Mock translation function (replace with actual API)
export async function translateText({ text, from, to }: TranslateOptions): Promise<string> {
  // Check if we have a manual translation
  if (translations[text] && translations[text][to]) {
    return translations[text][to]
  }

  // For demo purposes, return original text
  // In production, call Google Translate API:
  /*
  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: from,
      target: to,
      format: 'text'
    })
  })
  
  const data = await response.json()
  return data.data.translations[0].translatedText
  */
  
  return text // Fallback to original text
}

// Auto-translate project content
export async function autoTranslateProject(
  project: any, 
  targetLanguage: string
): Promise<TranslatedProject> {
  try {
    const [translatedTitle, translatedCategory, translatedDescription] = await Promise.all([
      translateText({ text: project.title, from: 'en', to: targetLanguage }),
      translateText({ text: project.category, from: 'en', to: targetLanguage }),
      translateText({ text: project.description, from: 'en', to: targetLanguage })
    ])

    // For technologies, you might want to keep them in English or translate selectively
    const translatedTechnologies = project.technologies // Keep original for now

    return {
      _id: `${project._id}-${targetLanguage}`,
      title: translatedTitle,
      category: translatedCategory,
      description: translatedDescription,
      technologies: translatedTechnologies,
      __i18n_lang: targetLanguage
    }
  } catch (error) {
    console.error('Translation failed:', error)
    // Return project with target language marker but original content
    return {
      _id: `${project._id}-${targetLanguage}`,
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies,
      __i18n_lang: targetLanguage
    }
  }
}

// Bulk translate projects
export async function bulkTranslateProjects(
  projects: any[], 
  targetLanguage: string
): Promise<TranslatedProject[]> {
  const translationPromises = projects.map(project => 
    autoTranslateProject(project, targetLanguage)
  )
  
  return Promise.all(translationPromises)
} 