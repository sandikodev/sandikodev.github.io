# Spec: Route Mirroring

## Status: In Progress

## Goal
Mirror semua blog routes ke `/workspace/*` dengan layout Dev Mode (I3Layout).

## Routes to Mirror

| Blog Mode | Dev Mode | Status |
|-----------|----------|--------|
| `/` | `/workspace/` | [ ] Pending |
| `/blog/[slug]` | `/workspace/blog/[slug]` | [ ] Pending |
| `/about` | `/workspace/about` | [ ] Pending |
| `/contact` | `/workspace/contact` | [ ] Pending |
| `/now` | `/workspace/now` | [ ] Pending |

## Exclusive Dev Mode Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/workspace/terminal` | i3wm playground | [x] Exists as `/terminal` |
| `/workspace/ricing` | Theme showcase | [ ] Pending |

## Implementation

### File: `src/pages/workspace/index.astro`
```astro
---
import I3Layout from '@/layouts/I3Layout.astro';
// Dev Mode homepage content
---
<I3Layout title="Workspace">
  <!-- Dev Mode specific homepage -->
</I3Layout>
```

### File: `src/pages/workspace/[...slug].astro`
```astro
---
import I3Layout from '@/layouts/I3Layout.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const pages = await getCollection('pages');
  
  return [
    ...posts.map(post => ({
      params: { slug: `blog/${post.slug}` },
      props: { entry: post, type: 'post' }
    })),
    ...pages.map(page => ({
      params: { slug: page.slug },
      props: { entry: page, type: 'page' }
    }))
  ];
}

const { entry, type } = Astro.props;
const { Content } = await entry.render();
const canonicalUrl = `https://sandikodev.github.io${Astro.url.pathname.replace('/workspace', '')}`;
---

<I3Layout title={entry.data.title}>
  <link slot="head" rel="canonical" href={canonicalUrl} />
  <Content />
</I3Layout>
```

## Checklist

- [ ] Create `src/pages/workspace/` directory
- [ ] Create `index.astro` (Dev homepage)
- [ ] Create `[...slug].astro` (catch-all mirror)
- [ ] Add canonical tags
- [ ] Test all mirrored routes
- [ ] Update toggle button to context-aware
- [ ] Test toggle navigation
