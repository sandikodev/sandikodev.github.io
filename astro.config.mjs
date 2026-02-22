import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";

// Development-only imports
const isDev = process.env.NODE_ENV === "development";
let astroDeck = null;

if (isDev) {
  try {
    astroDeck = (await import("./packages/astro-deck/index.js")).default;
  } catch (error) {
    console.warn("⚠️ Astro-deck not available in development mode");
  }
}
import svelte from "@astrojs/svelte";

import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  base: config.site.base_path ? config.site.base_path : "/",
  integrations: [
    svelte(),
    react({
      include: [
        "**/react-components/*",
        "**/layouts/components/*",
        "**/partials/*",
        "**/components/*",
      ],
    }),
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
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
        "@/shortcodes/LinkCard",
      ],
    }),
    mdx(),
    icon(), // Development-only: Astro-deck admin panel
    ...(isDev && astroDeck ? [astroDeck()] : []),
  ],
  markdown: {
    rehypePlugins: [rehypeKatex, rehypeMermaid],
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
    shikiConfig: {
      langs: [
        "javascript",
        "typescript",
        "python",
        "rust",
        "go",
        "bash",
        "shell",
        "json",
        "yaml",
        "toml",
        "html",
        "css",
        "scss",
        "sql",
        "graphql",
        "markdown",
        "mdx",
        "astro",
        "jsx",
        "tsx",
        "vue",
        "svelte",
        "php",
        "ruby",
        "java",
        "kotlin",
        "swift",
        "c",
        "cpp",
        "csharp",
        "dockerfile",
        "nginx",
        "lua",
        "vim",
        "diff",
        "regex",
      ],
      theme: "css-variables",
      wrap: true,
    },
  },
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
});
