import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { technicalExpertiseType } from './technicalExpertise'
import { aboutType } from './about'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, technicalExpertiseType, aboutType],
}
