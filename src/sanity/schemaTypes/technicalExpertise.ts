import { defineField, defineType } from 'sanity'

export const technicalExpertiseType = defineType({
  name: 'technicalExpertise',
  title: 'Technical Expertise',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Tools', value: 'tools' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      description: 'Color theme for the skill badges',
      options: {
        list: [
          { title: 'Teal', value: 'teal' },
          { title: 'Emerald', value: 'emerald' },
          { title: 'Cyan', value: 'cyan' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      category: 'category',
      skills: 'skills',
    },
    prepare(selection) {
      const { category, skills } = selection
      const skillCount = skills?.length || 0
      return {
        title: category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Technical Expertise',
        subtitle: `${skillCount} skill${skillCount !== 1 ? 's' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
