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
    topics: z.array(z.string()).default([]),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    order: z.number(),
  }),
});

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.string().min(1),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    status: z.enum(["published", "evolving", "archived"]).default("published"),
    tags: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    relatedProject: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    routeBacked: z.boolean().default(false),
    routePath: z.string().startsWith("/").optional(),
    readingTime: z.string().optional(),
    subjectName: z.string().optional(),
    subjectUrl: z.url().optional(),
    disclaimer: z.string().optional(),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    externalUrl: z.url().optional(),
  }),
});

const fieldLog = defineCollection({
  loader: glob({ base: "./src/content/field-log", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    excerpt: z.string().optional(),
    category: z.enum([
      "Desk Notes",
      "System Notes",
      "Build Notes",
      "Experiment Notes",
      "Decision Notes",
    ]),
    pubDate: z.date(),
    relatedProject: z.string().optional(),
    status: z
      .enum(["completed", "in-progress", "blocked", "observed", "deferred"])
      .default("observed"),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    order: z.number().optional(),
  }),
});

export const collections = { projects, writing, fieldLog };
