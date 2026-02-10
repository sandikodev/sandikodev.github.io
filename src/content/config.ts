import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Post collection schema - uses glob loader for external content
const postsCollection = defineCollection({
  loader: glob({
    base: "./content/posts", // Submodule directory
    pattern: "**/*.md",
  }),
  schema: z
    .object({
      author: z.string().optional(),
      authors: z.array(z.string()).default(["sandikodev"]),
      categories: z.array(z.string()).default(["others"]),
      date: z.date().optional(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      id: z.string().optional(),
      image: z.string().optional(),
      meta_title: z.string().optional(),
      tags: z.array(z.string()).default(["others"]),
      title: z.string(),
    })
    .transform((data) => {
      if (
        data.author &&
        (!data.authors ||
          data.authors.length === 0 ||
          (data.authors.length === 1 && data.authors[0] === "sandikodev"))
      ) {
        data.authors = [data.author];
      }
      return data;
    }),
});

// Templates collection - local templates in src/content/posts
const templatesCollection = defineCollection({
  loader: glob({ base: "./src/content/templates", pattern: "**/*.md" }),
  schema: z
    .object({
      author: z.string().optional(),
      authors: z.array(z.string()).default(["sandikodev"]),
      categories: z.array(z.string()).default(["others"]),
      date: z.date().optional(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      id: z.string().optional(),
      image: z.string().optional(),
      meta_title: z.string().optional(),
      tags: z.array(z.string()).default(["others"]),
      title: z.string(),
    })
    .transform((data) => {
      if (
        data.author &&
        (!data.authors ||
          data.authors.length === 0 ||
          (data.authors.length === 1 && data.authors[0] === "sandikodev"))
      ) {
        data.authors = [data.author];
      }
      return data;
    }),
});

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({ base: "./src/content/authors", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string().optional(),
    draft: z.boolean().optional(),
    id: z.string().optional(),
    image: z.string().optional(),
    meta_title: z.string().optional(),
    social: z
      .object({
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        twitter: z.string().optional(),
      })
      .optional(),
    title: z.string(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string().optional(),
    draft: z.boolean().optional(),
    id: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    meta_title: z.string().optional(),
    title: z.string(),
  }),
});

// About collection schema
const aboutCollection = defineCollection({
  loader: glob({ base: "./src/content/about", pattern: "**/*.md" }),
  schema: z.object({
    description: z.string().optional(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
    meta_title: z.string().optional(),
    title: z.string().optional(),
  }),
});

// Export collections
export const collections = {
  about: aboutCollection,
  authors: authorsCollection,
  pages: pagesCollection,
  posts: postsCollection, // External submodule
  templates: templatesCollection, // Local src/content/posts
};
