import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import astroDeck from "@sandikodev/astro-deck";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  integrations: [
    react({
      include: ["**/react-components/*", "**/layouts/components/*", "**/partials/*", "**/components/*"]
    }),
    svelte(),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
    astroDeck(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkMath,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [
      rehypeKatex,
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'tokyo-night',
      },
      wrap: true,
      langs: [
        'javascript',
        'typescript',
        'python',
        'rust',
        'go',
        'bash',
        'shell',
        'json',
        'yaml',
        'toml',
        'html',
        'css',
        'scss',
        'sql',
        'graphql',
        'markdown',
        'mdx',
        'astro',
        'jsx',
        'tsx',
        'vue',
        'svelte',
        'php',
        'ruby',
        'java',
        'kotlin',
        'swift',
        'c',
        'cpp',
        'csharp',
        'dockerfile',
        'nginx',
        'lua',
        'vim',
        'diff',
        'regex',
      ],
    },
  },
});
