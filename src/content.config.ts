import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectAccent = z.enum(["rust", "olive", "plum", "blue", "khaki"]);

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    longDescription: z.string(),
    coreQuestion: z.string(),
    status: z.string(),
    featured: z.boolean(),
    accent: projectAccent,
    tags: z.array(z.string()),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: () => [],
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      "Research Notes",
      "Systems Thinking",
      "Human Model",
      "Personal Computing",
      "Build Notes",
    ]),
    draft: z.boolean().default(true),
    pubDate: z.date().optional(),
  }),
});

const fieldLog = defineCollection({
  loader: glob({ base: "./src/content/field-log", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    excerpt: z.string(),
    category: z.enum(["Desk Notes", "System Notes", "Build Notes"]),
    pubDate: z.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { projects, writing, fieldLog };
