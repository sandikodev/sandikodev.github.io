import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // Base JS recommended
  js.configs.recommended,

  // TypeScript standard (2025/2026 approach)
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // Astro standard
  ...eslintPluginAstro.configs.recommended,

  // Svelte standard
  ...eslintPluginSvelte.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/prettier"],

  // Stylistic rules - Disabled for baseline
  // stylistic.configs.recommended,

  // Perfectionist sorting - Disabled for baseline
  // perfectionist.configs["recommended-natural"],

  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
        dataLayer: "readonly",
        gtag: "readonly",
        NodeListOf: "readonly",
        renderMathInElement: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    name: "main-config",
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@stylistic": stylistic,
      perfectionist: perfectionist,
    },
    rules: {
      // React rules parity
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      // Disable all noisy stylistic rules
      "@stylistic/indent": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-quotes": "off",
      "@stylistic/member-delimiter-style": "off",
      "@stylistic/no-multiple-empty-lines": "off",
      "@stylistic/quotes": "off",
      "@stylistic/semi": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/max-statements-per-line": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/jsx-closing-tag-location": "off",
      "@stylistic/jsx-closing-bracket-location": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/jsx-indent": "off",
      "@stylistic/jsx-wrap-multilines": "off",

      // Disable perfectionist
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-named-imports": "off",

      "@typescript-eslint/no-empty-object-type": "off",
      // TypeScript
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-function": "off",

      "no-inner-declarations": "off",
      "no-redeclare": "off",
      // General
      "no-undef": "off",

      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/set-state-in-effect": "warn",
      "react/display-name": "off",
      "react/jsx-key": "off",
      "react/jsx-no-target-blank": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      // Svelte rules
      "svelte/require-each-key": "off",
      "svelte/no-at-html-tags": "off",
      "svelte/prefer-svelte-reactivity": "off",
      "svelte/no-dom-manipulating": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    name: "svelte-config",
  },
  {
    files: ["**/*.svelte.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
    name: "svelte-runes-ts-config",
  },
  {
    files: ["**/*.astro", "**/*.astro/*.js", "**/*.astro/*.ts"],
    name: "astro-template-safety",
    rules: {
      "@stylistic/indent": "off",
    },
  },
  {
    files: [
      "tailwind.config.*",
      "postcss.config.*",
      "astro.config.mjs",
      "eslint.config.mjs",
      "src/env.d.ts",
      "packages/**/*.ts",
    ],
    name: "workspace-config-modern",
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "no-unused-vars": "off",
    },
  },
  {
    ignores: [
      "dist/",
      ".astro/",
      "node_modules/",
      "public/",
      "backups/",
      "**/backups/**",
    ],
    name: "ignores-global",
  },
);
