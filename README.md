<h1 align=center>SandikoDev Portfolio</h1>
<p align=center>Personal portfolio website showcasing full-stack development expertise and innovative projects.</p>
<h2 align="center"> <a target="_blank" href="https://sandikodev.github.io/" rel="nofollow">👀Live Site</a> | <a  target="_blank" href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fsandikodev.github.io%2F&form_factor=desktop">Page Speed (100%)🚀</a>
</h2>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%405.0.0" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=5.x&color=000&logo=astro" />
  </a>

  <a href="https://github.com/sandikodev/sandikodev.github.io/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/sandikodev/sandikodev.github.io" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/sandikodev/sandikodev.github.io" alt="code size">

  <a href="https://github.com/sandikodev/sandikodev.github.io/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/sandikodev/sandikodev.github.io" alt="contributors"></a>
</p>

Personal portfolio website of a full-stack developer showcasing technical expertise, innovative projects, and development insights. Features a professional blog mode and an experimental terminal mode demonstrating cutting-edge desktop development concepts.

## 🚀 Tech Stack

- **Framework**: [Astro 5](https://astro.build/) - Content-driven web framework.
- **Components**: [Svelte 5](https://svelte.dev/) - Functional-reactive UI components.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling with Design System tokens.
- **Search**: [FuseJS](https://fusejs.io/) - Client-side fuzzy search.
- **Monorepo**: [pnpm Workspaces](https://pnpm.io/workspaces) - Managing internal packages.
- **Comments**: [Giscus](https://giscus.app/) - GitHub Discussions-powered comments.

## 📂 Project Structure & Monorepo

This project uses a monorepo structure managed by `pnpm` and Git submodules for core logic:

- `src/` - Primary website source code (Pages, Components, Layouts).
- `content/` - Markdown/MDX content (Git Submodule).
- `packages/` - Internal core packages:
  - `astro-deck`: Custom CMS and admin interface.
  - `astro-terminal-code`: Specialized Shiki/code processing logic.
  - `workspace-framework`: Core bridge and workspace management.
- `docs/` - Comprehensive technical documentation organized by categories.

## 🔑 Key Features

- 🎨 **Dual Design System**: Toggle between Blog Mode and Terminal Workspace.
- 👥 **Multi-Author Support**: Detailed author profiles and single pages.
- 🔍 **Global Search**: Instant search across blog posts and projects.
- 🛠️ **Terminal Emulator**: i3wm-inspired tiling engine with keyboard shortcuts.
- 🏷️ **Taxonomy Support**: Robust tagging and categorization system.
- 🌅 **SEO & Social**: Automated OG image support, Meta values, and GTM.
- ✍️ **MDX Powered**: Write content with interactive components.
- 🔋 **Performance**: Optimized assets achieving 100/100 Google PageSpeed.

## 🔧 Installation & Development

### Prerequisites

- **Node.js**: [LTS Version](https://nodejs.org/)
- **pnpm**: [Installed via Corepack or npm](https://pnpm.io/installation)

### Local Setup

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```
2. **Launch Dev Server**:
   ```bash
   pnpm dev
   ```
3. **Run Validation**:
   Ensure code quality before committing:
   ```bash
   pnpm run validate
   ```

## 🔨 Production & Deployment

- **Build**: `pnpm run build`
- **Preview**: `pnpm run preview`
- **Deployment**: Optimized for Netlify and GitHub Pages.

## ⚡ Performance & Reliability

### Automatic Cache Manager

We use a **Storage Versioning** mechanism in `localStorage` to ensure users always see the latest version of the app. If a significant update is deployed, `STORAGE_VERSION` is increased, triggering an automatic reset of stale state and unregistering old Service Workers.

### Design System Tokens

Most styles are standardized via `src/styles/design-system.css`, making it easy to tweak colors, radius, and spacing globally without touching individual components.

## 📖 Documentation Architecture

For deeper technical insights, explore the `docs/` directory:

- [Architecture & Design Philosophy](docs/architecture/)
- [Component Audits & Layouts](docs/audits/)
- [Feature Specifications](docs/features/)
- [Checklists (SEO, Testing, Git)](docs/checklists/)

## 🎨 Dual Design System Philosophy

### Blog Mode (Default)

Clean, professional reading experience using Inter. Designed for information accessibility.

### Terminal Mode (`/workspace`)

Inspired by `i3wm` and `sway`. It's a playground for developer-centric aesthetics:

- Retro terminal vibes with modern themes (Tokyo Night, Tokyo Night Storm, etc.)
- Keyboard-driven navigation.
- Real-time tiling window manager simulator.

## 🔬 Experimental: RENDER Framework

The workspace interface is a living preview for the **RENDER** framework, aiming to bring high-performance desktop development DX to the web.

## 📄 License

- **Code**: [MIT License](LICENSE)
- **Content**: Copyright © 2024 SandikoDev.
- **Images**: Demonstration purposes only.

---

Developed with ❤️ by [SandikoDev](https://sandikodev.github.io)
