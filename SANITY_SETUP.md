# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your portfolio project to manage projects dynamically.

## 1. Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and create a free account
2. Create a new project
3. Choose a project name and dataset name (usually 'production')
4. Note down your Project ID from the dashboard

## 2. Install Sanity Studio

```bash
npm install -g @sanity/cli
sanity init
```

Follow the prompts and select:
- Use existing project
- Enter your project ID
- Choose dataset name
- Select project template (you can choose "Clean project")

## 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 4. Create Project Schema

In your Sanity studio folder, create a schema file `schemas/project.js`:

```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Development', value: 'Web Development'},
          {title: 'Mobile App', value: 'Mobile App'},
          {title: 'Web Design', value: 'Web Design'},
          {title: 'Data Visualization', value: 'Data Visualization'},
          {title: 'E-commerce', value: 'E-commerce'},
          {title: 'Other', value: 'Other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category'
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title: title,
        subtitle: category,
        media: media
      }
    }
  }
}
```

## 5. Update Schema Index

In your Sanity studio, update `schemas/index.js`:

```javascript
import project from './project'

export const schemaTypes = [project]
```

## 6. Deploy Sanity Studio

```bash
cd your-sanity-studio-folder
sanity deploy
```

Choose a studio hostname (e.g., `your-portfolio-studio`)

## 7. Add Projects

1. Go to your deployed studio (e.g., `https://your-portfolio-studio.sanity.studio`)
2. Add your projects with:
   - Title
   - Category
   - Description
   - Technologies (array of strings)
   - Website URL
   - Project image
   - Mark as "Featured" for homepage display
   - Set display order

## 8. Test the Integration

Your Next.js app will now:
- Load projects from Sanity CMS
- Fall back to hardcoded data if Sanity is not configured
- Display featured projects on the homepage
- Show all projects in the modal

## 9. CORS Settings (if needed)

If you encounter CORS issues, add your domain to Sanity's CORS settings:

1. Go to your Sanity dashboard
2. Navigate to Settings → API
3. Add your domain to CORS origins (e.g., `http://localhost:3000`, `https://yourdomain.com`)

## Features

- ✅ Dynamic project management
- ✅ Image optimization
- ✅ Featured projects section
- ✅ "View All" modal with filtering
- ✅ Fallback data during development
- ✅ TypeScript support
- ✅ Responsive design
- ✅ SEO-friendly

## Fallback Behavior

The app includes fallback data that displays when:
- Sanity is not configured
- API calls fail
- No projects are found

This ensures your portfolio always displays content, even during development or if Sanity is temporarily unavailable. 