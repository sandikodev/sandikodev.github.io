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

// Custom Remark plugin to handle GitHub-style alerts [!TYPE]
const remarkAlerts = () => {
  const getIcon = (type) => {
    switch (type) {
      case "note":
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
      case "tip":
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>';
      case "important":
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4"/><path d="M12 16h.01"/><circle cx="12" cy="12" r="10"/></svg>';
      case "warning":
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
      case "caution":
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l5-5c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>';
      default:
        return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m9 11 3 3 3-3"/></svg>';
    }
  };

  return (tree) => {
    function visitor(node) {
      if (node.type === "blockquote") {
        const firstPara = node.children[0];
        if (
          firstPara?.type === "paragraph" &&
          firstPara.children[0]?.type === "text"
        ) {
          const textNode = firstPara.children[0];
          const match = textNode.value.trim().match(/^\[!([A-Z]+)\]/i);
          if (match) {
            const type = match[1].toLowerCase();
            textNode.value = textNode.value.replace(
              /^\s*\[!([A-Z]+)\]\s*\n?/,
              "",
            );

            node.data = {
              hName: "div",
              hProperties: { className: ["notice", "alert-" + type] },
            };

            const headHtml = `<div class="notice-head">${getIcon(type)}<p class="notice-label">${type.toUpperCase()}</p></div><div class="notice-body">`;
            const footerHtml = `</div>`;

            node.children = [
              { type: "html", value: headHtml },
              ...node.children,
              { type: "html", value: footerHtml },
            ];
          }
        }
      }
      if (node.children) node.children.forEach(visitor);
    }
    visitor(tree);
  };
};

// Shared Markdown & MDX Configuration
const markdownConfig = {
  rehypePlugins: [rehypeKatex, rehypeMermaid],
  remarkPlugins: [
    remarkAlerts,
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
};

// https://astro.build/config
export default defineConfig({
  base: config.site.base_path ? config.site.base_path : "/",
  integrations: [
    svelte(),
    react({
      include: [
        "**/react-components/*",
        "**/layouts/components/*",
        "**/shortcodes/*",
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
        {
          "@/shortcodes/ThoughtProcess": [
            "ThoughtBlock",
            "ThoughtLog",
            "AnalyzedLog",
            "ThoughtStep",
          ],
        },
      ],
    }),
    mdx({
      extendMarkdownConfig: true,
    }),
    icon(), // Development-only: Astro-deck admin panel
    ...(isDev && astroDeck ? [astroDeck()] : []),
  ],
  markdown: markdownConfig,
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
});
