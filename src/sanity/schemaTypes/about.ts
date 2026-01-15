import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'passionateTitle',
      title: 'Passionate Title',
      type: 'string',
      description: 'First part of the passionate section title (e.g., "Passionate")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'passionateSubtitle',
      title: 'Passionate Subtitle',
      type: 'string',
      description: 'Second part of the passionate section title (e.g., "Creator")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description1',
      title: 'First Description',
      type: 'text',
      description: 'First paragraph of the about description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description2',
      title: 'Second Description',
      type: 'text',
      description: 'Second paragraph of the about description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The statistic value (e.g., "2+", "15+")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The statistic label (e.g., "Years of Experience")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              description: 'Color theme for the statistic card',
              options: {
                list: [
                  { title: 'Teal', value: 'teal' },
                  { title: 'Emerald', value: 'emerald' },
                  { title: 'Cyan', value: 'cyan' },
                  { title: 'Purple', value: 'purple' },
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
              value: 'value',
              label: 'label',
            },
            prepare(selection) {
              const { value, label } = selection
              return {
                title: `${value} - ${label}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: {
      passionateTitle: 'passionateTitle',
      passionateSubtitle: 'passionateSubtitle',
    },
    prepare(selection) {
      const { passionateTitle, passionateSubtitle } = selection
      return {
        title: 'About Section',
        subtitle: `${passionateTitle} ${passionateSubtitle}`,
      }
    },
  },
})
