import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Data Visualization', value: 'Data Visualization' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'github',
      title: 'GitHub Repository URL',
      type: 'url',
      description: 'Link to the GitHub repository for this project',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'nordcode',
      title: 'Nordcode Project',
      type: 'boolean',
      description: 'Mark this project as done through Nordcode AS',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title: title,
        subtitle: category,
        media: media,
      }
    },
  },
}) 