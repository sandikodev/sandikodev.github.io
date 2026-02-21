const theme = require("./src/config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.fonts.font_family.primary) {
  fontPrimary = theme.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.fonts.font_family.primary_type;
}
if (theme.fonts.font_family.secondary) {
  fontSecondary = theme.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        body: "var(--color-bg)",
        border: "var(--color-border)",
        main: "var(--color-text-main)",
        muted: "var(--color-text-muted)",
        primary: "var(--color-primary)",
        surface: "var(--color-surface)",
        text: "var(--color-text-body)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        primary: ["var(--font-primary)", "sans-serif"],
      },
      fontSize: {
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        sm: "var(--text-sm)",
        xl: "var(--text-xl)",
        xs: "var(--text-xs)",
      },
      spacing: {
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-text-body)",
            "--tw-prose-bold": "var(--color-text-main)",
            "--tw-prose-bullets": "var(--color-text-muted)",
            "--tw-prose-captions": "var(--color-text-muted)",
            "--tw-prose-code": "var(--color-text-main)",
            "--tw-prose-counters": "var(--color-text-muted)",
            "--tw-prose-headings": "var(--color-text-main)",
            "--tw-prose-hr": "var(--color-border)",
            "--tw-prose-links": "var(--color-primary)",
            "--tw-prose-pre-bg": "var(--color-surface)",
            "--tw-prose-pre-code": "var(--color-text-main)",
            "--tw-prose-quote-borders": "var(--color-primary)",
            "--tw-prose-quotes": "var(--color-text-main)",
            "--tw-prose-td-borders": "var(--color-border)",
            "--tw-prose-th-borders": "var(--color-border)",
            code: {
              backgroundColor: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border-alpha)",
              color: "var(--color-primary)",
              borderRadius: "var(--radius-sm)",
              fontWeight: "500",
              padding: "0.2em 0.4em",
            },
            "code::after": { content: "none" },

            "code::before": { content: "none" },
            fontSize: "var(--text-base)",
            h1: { fontSize: "var(--text-4xl)" },
            h2: { fontSize: "var(--text-3xl)" },

            h3: { fontSize: "var(--text-2xl)" },
            h4: { fontSize: "var(--text-xl)" },
            lineHeight: "var(--leading-relaxed)",
            pre: {
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
            },
          },
        },
      }),
    },
    screens: {
      "2xl": "1536px",
      lg: "1024px",
      md: "768px",
      sm: "540px",
      xl: "1280px",
    },
  },
};
