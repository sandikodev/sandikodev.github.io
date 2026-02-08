# Implementation Brief: Route Mirroring Strategy

> Quick reference untuk keputusan arsitektur dual design system.

## Naming Convention

| Mode          | Icon | Description                    |
| ------------- | ---- | ------------------------------ |
| **Blog Mode** | 📝   | Clean blog interface (default) |
| **Dev Mode**  | 💻   | Terminal/i3wm interface        |

## URL Architecture

```
Blog Mode (/)                    Dev Mode (/workspace)
├── /                            ├── /workspace/
├── /blog/                       ├── /workspace/blog/
│   └── /blog/[slug]             │   └── /workspace/blog/[slug]
├── /about                       ├── /workspace/about
├── /contact                     ├── /workspace/contact
└── /now                         └── /workspace/now
                                 ├── /workspace/terminal (exclusive)
                                 └── /workspace/ricing (exclusive)
```

## Key Decisions

### 1. Route Mirroring (bukan CSS toggle)

- **Why**: Static site tidak bisa switch layout runtime
- **How**: `/workspace/[...slug].astro` mirrors semua pages
- **Benefit**: SEO friendly, double indexing, clear separation

### 2. Single Content Source

- Content tetap di `src/content/`
- Tidak ada duplikasi markdown
- Same content, different layout

### 3. Context-Aware Toggle

```
/about          → toggle → /workspace/about
/workspace/about → toggle → /about
```

### 4. SEO Strategy

- Canonical URL → Blog Mode (primary)
- OG URL → Current page (accurate sharing)
- Both indexed dengan context berbeda

## Critical Implementation

### Toggle Button Logic

```js
const path = window.location.pathname;
const isWorkspace = path.startsWith("/workspace");

const target = isWorkspace
  ? path.replace("/workspace", "") || "/"
  : "/workspace" + path;
```

### FOUC Prevention

```js
// Redirect based on saved preference
const saved = localStorage.getItem("design-mode");
const isWorkspace = location.pathname.startsWith("/workspace");

if (saved === "dev" && !isWorkspace) {
  location.href = "/workspace" + location.pathname;
}
```

### Canonical Tags (Dev Mode pages)

```html
<link rel="canonical" href="https://sandikodev.github.io/blog/post" />
```

## Performance Notes

- Font loading: Lazy load Fira Code hanya di `/workspace/*`
- CSS splitting: Astro handles automatically
- Build time: +30-50% (acceptable trade-off)

## Implementation Checklist

- [x] Create `/workspace/[...slug].astro`
- [x] Update toggle button (context-aware)
- [x] Add canonical tags
- [x] Test all mirrored routes
- [x] Verify SEO tags

**Status: ✅ Complete** (2025-12-11)

---

_Reference: DESIGN_PHILOSOPHY.md, DESIGN_STRATEGY.md_
