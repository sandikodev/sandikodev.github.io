# Architecture Steering

## Dual Design System

### Blog Mode (📝)

- **Layout**: `src/layouts/Base.astro`
- **Attribute**: `data-theme-mode="blog"`
- **Fonts**: Inter + Georgia + JetBrains Mono
- **Routes**: `/`, `/blog/*`, `/about`, `/contact`, `/now`

### Dev Mode (💻)

- **Layout**: `src/layouts/I3Layout.astro`
- **Attribute**: `data-theme-mode="dev"`
- **Fonts**: Fira Code (monospace)
- **Routes**: `/workspace/*` (mirrors blog routes)

## Route Mirroring Strategy

```
Blog Mode (/)                    Dev Mode (/workspace)
├── /                            ├── /workspace/
├── /blog/[slug]                 ├── /workspace/blog/[slug]
├── /about                       ├── /workspace/about
├── /contact                     ├── /workspace/contact
└── /now                         └── /workspace/now
                                 ├── /workspace/terminal (exclusive)
                                 └── /workspace/ricing (exclusive)
```

### Why Route Mirroring (bukan CSS toggle)?

- Static site = no runtime layout switching
- SEO friendly = different URLs, double indexing
- Performance = load only needed assets
- Clear separation = easier maintenance

### Implementation

- `src/pages/workspace/[...slug].astro` - Catch-all mirror route
- Single content source (`src/content/`)
- Same markdown, different layout

## Toggle Button

### Behavior

Context-aware navigation (same page, different mode):

```
/about           → toggle → /workspace/about
/workspace/about → toggle → /about
```

### Logic

```js
const path = window.location.pathname;
const isWorkspace = path.startsWith("/workspace");
const target = isWorkspace
  ? path.replace("/workspace", "") || "/"
  : "/workspace" + path;
```

### Persistence

- `localStorage.getItem('design-mode')` → 'blog' | 'dev'
- FOUC prevention script in `<head>`

## SEO Strategy

- **Canonical**: Workspace pages point to Blog Mode (primary)
- **OG URL**: Current page (accurate social sharing)
- **Both indexed**: Different context, same content

## File Structure

```
src/
├── layouts/
│   ├── Base.astro          # Blog Mode
│   └── I3Layout.astro      # Dev Mode
├── pages/
│   ├── index.astro         # Blog homepage
│   ├── workspace/
│   │   ├── index.astro     # Dev homepage
│   │   └── [...slug].astro # Mirror routes
│   └── ...
├── components/
│   ├── DesignSystemToggle.astro
│   └── terminal/           # Dev Mode components
└── styles/
    ├── main.css            # Blog styles
    ├── terminal-theme.css  # Dev styles
    └── i3wm-theme.css      # Tiling layout
```
