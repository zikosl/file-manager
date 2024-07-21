import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
})

export const spaceSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
})


export type User = z.infer<typeof userSchema>
export type Space = z.infer<typeof spaceSchema>
