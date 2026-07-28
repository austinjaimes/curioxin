import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  date: z.string(),

  author: z.string().optional(),

  related: z.array(z.string()).optional()
});

const rankingSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  date: z.string(),

  items: z.array(
    z.object({
      position: z.number(),
      category: z.string(),
      name: z.string(),
      description: z.string(),

      image: z.string(),

      // Nuevo campo
      imageStyle: z.enum(["icon", "product", "banner"]).optional(),

      score: z.number(),

      advantages: z.array(z.string()),
      disadvantages: z.array(z.string()),
      price: z.string(),
      url: z.string().url(),
      idealFor: z.string()
    })
  )
});

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/articles"
  }),

  schema: articleSchema
});

const rankings = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/rankings"
  }),

  schema: rankingSchema
});

export const collections = {
  articles,
  rankings
};