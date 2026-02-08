# Git Commit Strategy - Iterative Implementation

## 📊 Current Status Analysis

### Design Strategy Implementation: **PARTIALLY DONE** ⚠️

**What's Implemented**:

- ✅ `data-theme-mode` attribute added to layouts
- ✅ Font scoping in I3Layout.astro
- ✅ Separate font loading per layout

**What's NOT Implemented**:

- ❌ CSS files not scoped yet (terminal-theme.css, i3wm-theme.css)
- ❌ Files not reorganized into v1/v2/shared structure
- ❌ No proper CSS variable namespacing

**Recommendation**: Commit current work first, then implement full strategy.

---

## 🎯 Commit Strategy: Iterative Approach

### Phase 1: Foundation & Documentation (Commits 1-3)

**Goal**: Commit documentation and base changes

### Phase 2: Terminal Theme (Commits 4-7)

**Goal**: Add terminal/i3wm features

### Phase 3: Optimizations (Commits 8-10)

**Goal**: Performance and UX improvements

### Phase 4: Design Separation (Commits 11-12)

**Goal**: Implement full design system separation

---

## 📝 Detailed Commit Plan

### **Commit 1: Add project documentation**

```bash
git add *.md
git commit -m "docs: add comprehensive project documentation

- Add design system documentation (V1 and V2)
- Add implementation guides and checklists
- Add optimization plans and testing guides
- Add SEO and feature roadmap documentation

These docs provide complete reference for:
- Design system strategy and separation
- Terminal theme implementation
- i3wm tiling optimization
- Testing and deployment procedures"
```

**Files**: All .md files (15 files)
**Why separate**: Documentation should be committed first for reference

---

### **Commit 2: Add terminal theme base styles**

```bash
git add src/styles/terminal-theme.css src/styles/i3wm-theme.css src/styles/animations.css
git commit -m "feat(styles): add terminal theme and i3wm styles

- Add terminal-theme.css with Tokyo Night and 4 other themes
- Add i3wm-theme.css for tiling window manager layout
- Add animations.css with reusable animation utilities

Supports terminal/hacker aesthetic with:
- Monospace Fira Code font
- i3wm tiling layouts
- Multiple color themes (Tokyo Night, Dracula, Gruvbox, Nord, Matrix)"
```

**Files**: 3 CSS files
**Why separate**: Core styling foundation

---

### **Commit 3: Add terminal components**

```bash
git add src/components/terminal/
git commit -m "feat(components): add terminal UI components

Add i3wm-inspired terminal components:
- Polybar: top status bar
- I3Window: tiling window container
- Dmenu: application launcher
- KeyboardHandler: global keyboard shortcuts
- ThemeSwitcher: theme picker UI
- HelpModal: keyboard shortcuts reference
- Prompt, StatusBar, TabBar: terminal UI elements

Includes window manager utilities (i3-utils.ts) for:
- Window state management
- Focus tracking
- Keyboard navigation (Ctrl+H/J/K/L)"
```

**Files**: src/components/terminal/\* (14 files)
**Why separate**: Complete feature set

---

### **Commit 4: Add I3Layout for terminal pages**

```bash
git add src/layouts/I3Layout.astro
git commit -m "feat(layouts): add I3Layout for terminal theme pages

- Create I3Layout with terminal theme integration
- Add data-theme-mode='terminal' scoping
- Include Polybar, loading bar, skip link
- Add font scoping to prevent conflicts with blog theme
- Support theme persistence via localStorage

Used by: /terminal, /blog-tiling, /404"
```

**Files**: src/layouts/I3Layout.astro
**Why separate**: Critical layout component

---

### **Commit 5: Add terminal pages**

```bash
git add src/pages/terminal.astro src/pages/terminal-features.astro src/pages/blog-tiling.astro
git commit -m "feat(pages): add terminal-themed pages

- /terminal: i3wm demo with neofetch, stats, and widgets
- /terminal-features: showcase of terminal components
- /blog-tiling: blog listing with tiling window layout

Features:
- Full keyboard navigation (j/k/gg/G)
- Theme switching (t key)
- Help modal (? key)
- Responsive tiling layout
- Touch-optimized for mobile"
```

**Files**: 3 page files
**Why separate**: User-facing features

---

### **Commit 6: Update 404 page with terminal theme**

```bash
git add src/pages/404.astro
git commit -m "feat(pages): redesign 404 page with terminal theme

- Use I3Layout for consistent terminal aesthetic
- Add helpful navigation suggestions
- Include keyboard shortcuts guide
- Show available paths in terminal style

Improves error UX with actionable next steps"
```

**Files**: src/pages/404.astro
**Why separate**: Specific feature improvement

---

### **Commit 7: Add design system separation to Base layout**

```bash
git add src/layouts/Base.astro
git commit -m "feat(layouts): add design system separation to Base layout

- Add data-theme-mode='blog' attribute
- Ensures blog theme (Inter + Georgia) doesn't conflict with terminal theme
- Maintains existing functionality for all blog pages

Part of design system V1/V2 separation strategy"
```

**Files**: src/layouts/Base.astro
**Why separate**: Critical for theme separation

---

### **Commit 8: Add enhanced blog components**

```bash
git add src/components/Breadcrumb.astro \
        src/components/ReadingTime.astro \
        src/components/ReadingProgress.astro \
        src/components/TableOfContents.astro \
        src/components/RelatedPosts.astro \
        src/components/SocialShare.astro \
        src/components/DevStats.astro
git commit -m "feat(components): add enhanced blog components

- Breadcrumb: navigation breadcrumbs
- ReadingTime: estimated reading time
- ReadingProgress: scroll progress indicator
- TableOfContents: auto-generated TOC
- RelatedPosts: similar post suggestions
- SocialShare: social media sharing
- DevStats: developer statistics display

Improves blog UX and engagement"
```

**Files**: 7 component files
**Why separate**: Blog enhancements

---

### **Commit 9: Add code enhancement components**

```bash
git add src/components/CodeBlockEnhancer.astro \
        src/components/CodeSnippetLibrary.astro \
        src/components/SyntaxThemeSwitcher.astro
git commit -m "feat(components): add code block enhancements

- CodeBlockEnhancer: copy button, line numbers, highlighting
- CodeSnippetLibrary: reusable code snippets
- SyntaxThemeSwitcher: switch code themes

Improves code readability and developer experience"
```

**Files**: 3 component files
**Why separate**: Specific feature set

---

### **Commit 10: Add utility components**

```bash
git add src/components/KeyboardShortcuts.astro \
        src/components/CommandPalette.astro \
        src/components/FAQ.astro \
        src/components/LazyImage.astro
git commit -m "feat(components): add utility components

- KeyboardShortcuts: global keyboard navigation
- CommandPalette: quick command search
- FAQ: frequently asked questions
- LazyImage: lazy loading images

Improves performance and UX"
```

**Files**: 4 component files
**Why separate**: Utility features

---

### **Commit 11: Update configuration files**

```bash
git add src/config/config.json \
        src/config/menu.json \
        src/config/theme.json \
        src/config/design-system.json
git commit -m "chore(config): update site configuration

- Update site metadata and SEO settings
- Add terminal pages to navigation menu
- Configure theme settings
- Add design system configuration

Reflects new terminal theme and pages"
```

**Files**: 4 config files
**Why separate**: Configuration changes

---

### **Commit 12: Update existing pages for compatibility**

```bash
git add src/pages/index.astro \
        src/pages/blog.astro \
        src/pages/now.astro \
        src/pages/design-preview.astro \
        src/pages/[regular].astro \
        src/pages/search.json.ts
git commit -m "refactor(pages): update pages for theme compatibility

- Ensure blog pages use Base layout (V1 theme)
- Add new /now page (now page standard)
- Add design preview page for testing
- Update dynamic routes
- Add search JSON endpoint

Maintains compatibility with design system separation"
```

**Files**: 6 page files
**Why separate**: Compatibility updates

---

### **Commit 13: Update layout components**

```bash
git add src/layouts/Posts.astro \
        src/layouts/PostSingle.astro \
        src/layouts/TerminalLayout.astro
git commit -m "refactor(layouts): update blog layouts

- Update Posts layout for blog listing
- Enhance PostSingle with new components
- Add TerminalLayout as alternative to I3Layout

Improves blog presentation and adds layout flexibility"
```

**Files**: 3 layout files
**Why separate**: Layout improvements

---

### **Commit 14: Update layout partials**

```bash
git add src/layouts/partials/Header.astro \
        src/layouts/partials/Footer.astro
git commit -m "refactor(partials): update header and footer

- Update header navigation with terminal pages
- Enhance footer with additional links
- Improve responsive behavior

Maintains consistency across themes"
```

**Files**: 2 partial files
**Why separate**: UI consistency

---

### **Commit 15: Add public assets**

```bash
git add public/favicon.ico \
        public/logo.svg \
        public/manifest.json \
        public/humans.txt \
        public/robots.txt \
        public/.well-known/
git commit -m "feat(assets): add public assets and metadata

- Add favicon and logo
- Add PWA manifest
- Add humans.txt and robots.txt
- Add security.txt in .well-known

Improves SEO and site metadata"
```

**Files**: Public assets
**Why separate**: Asset management

---

### **Commit 16: Add additional styles**

```bash
git add src/styles/design-system.css \
        src/styles/preview.css
git commit -m "feat(styles): add design system and preview styles

- Add design-system.css for V1 theme utilities
- Add preview.css for design preview page

Supports design system documentation and testing"
```

**Files**: 2 CSS files
**Why separate**: Supporting styles

---

### **Commit 17: Update content configuration**

```bash
git add src/content/config.ts
git commit -m "chore(content): update content collection schema

- Update schema for posts, pages, authors
- Add new fields for enhanced features
- Improve type safety

Supports new blog components and features"
```

**Files**: src/content/config.ts
**Why separate**: Schema changes

---

### **Commit 18: Update build configuration**

```bash
git add astro.config.mjs \
        package.json \
        pnpm-lock.yaml \
        pnpm-workspace.yaml \
        .github/workflows/deploy.yml
git commit -m "chore(build): update build configuration and dependencies

- Update Astro config with new integrations
- Add new dependencies (rehype-katex, rehype-mermaid)
- Switch to pnpm for package management
- Update GitHub Actions workflow

Supports new features and improves build process"
```

**Files**: Build config files
**Why separate**: Infrastructure changes

---

### **Commit 19: Clean up deleted files**

```bash
git add -u
git commit -m "chore: remove unused components and files

- Remove old typewriter components (replaced by terminal theme)
- Remove bun.lock (switched to pnpm)

Cleanup for better maintainability"
```

**Files**: Deleted files
**Why separate**: Cleanup

---

## 🚀 Execution Plan

### Step 1: Review Changes

```bash
# See what will be committed
git status
git diff src/layouts/Base.astro
git diff src/layouts/I3Layout.astro
```

### Step 2: Execute Commits (One by One)

```bash
# Run each commit command from above
# Test after each commit if needed
```

### Step 3: Verify

```bash
# Check commit history
git log --oneline -20

# Verify all changes committed
git status
```

### Step 4: Push (Optional)

```bash
git push origin main
```

---

## 📊 Commit Summary

| Phase       | Commits | Focus          | Files              |
| ----------- | ------- | -------------- | ------------------ |
| **Phase 1** | 1-3     | Foundation     | Docs + Base Styles |
| **Phase 2** | 4-7     | Terminal Theme | Layouts + Pages    |
| **Phase 3** | 8-10    | Enhancements   | Components         |
| **Phase 4** | 11-19   | Integration    | Config + Cleanup   |

**Total**: 19 commits
**Time**: ~30-45 minutes
**Benefit**: Clear history, easy rollback, reviewable changes

---

## ✅ Benefits of This Strategy

1. **Atomic Commits**: Each commit is self-contained
2. **Clear History**: Easy to understand what changed when
3. **Easy Rollback**: Can revert specific features
4. **Reviewable**: Each commit can be reviewed independently
5. **Documented**: Commit messages explain the "why"
6. **Logical Order**: Dependencies committed first

---

## 🎯 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore
**Scope**: component, layout, page, style, config
**Subject**: Short description (50 chars)
**Body**: Detailed explanation (optional)
**Footer**: Breaking changes, issues (optional)

---

## 🔄 Alternative: Squash Strategy

If you prefer fewer commits:

```bash
# Commit all at once
git add .
git commit -m "feat: implement terminal theme with i3wm layout

Major changes:
- Add terminal theme (V2) with 5 color schemes
- Add i3wm tiling window manager layout
- Add terminal components (Polybar, I3Window, etc)
- Add terminal pages (/terminal, /blog-tiling)
- Implement design system separation (V1 vs V2)
- Add keyboard navigation and shortcuts
- Add theme switcher and help modal
- Optimize for mobile and accessibility

Breaking changes: None
Backward compatible: Yes"
```

**Pros**: Simple, one commit
**Cons**: Hard to review, can't rollback parts

---

## 💡 Recommendation

**Use iterative strategy (19 commits)** for:

- ✅ Better code review
- ✅ Clear history
- ✅ Easy debugging
- ✅ Professional workflow
- ✅ Team collaboration

**Use squash strategy (1 commit)** for:

- ✅ Personal project
- ✅ Quick deployment
- ✅ Simple history

---

## 🎯 Next Steps

1. **Review this strategy**
2. **Choose approach** (iterative recommended)
3. **Execute commits** one by one
4. **Test after critical commits**
5. **Push when ready**

**Ready to start?** Let me know and I'll help execute! 🚀
