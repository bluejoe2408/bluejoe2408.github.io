import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tech = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/tech' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    description: z.string().optional(),
    cover: image().optional(),
    draft: z.boolean().default(false),
  }),
});

const travel = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/travel' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    cover: image(),
    gallery: z.array(image()).optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    thumbnail: image(),
    tech: z.array(z.string()).default([]),
    links: z.object({ github: z.string().url().optional(), demo: z.string().url().optional() }).optional(),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { tech, travel, portfolio };
