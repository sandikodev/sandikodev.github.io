# SEO Steering

## Strategy: Double Indexing

Both Blog Mode and Dev Mode pages are indexed with different contexts:

- `/blog/post-1` → General readers searching for content
- `/workspace/blog/post-1` → Developers searching for "terminal blog"

## Canonical URLs

```html
<!-- Blog Mode (primary) -->
<link rel="canonical" href="https://sandikodev.github.io/about" />

<!-- Dev Mode (points to Blog Mode) -->
<link rel="canonical" href="https://sandikodev.github.io/about" />
<meta
  property="og:url"
  content="https://sandikodev.github.io/workspace/about"
/>
```

## Target Keywords

### Blog Mode

- sandikodev
- full stack developer indonesia
- web development blog
- react tutorial

### Dev Mode (Unique Niche)

- terminal blog interface
- i3wm portfolio
- developer workspace
- tiling window manager web
- ricing showcase

## Meta Tags

### Required

- `<title>` - Unique per page
- `<meta name="description">` - 150-160 chars
- `<meta name="keywords">` - Relevant terms
- `<link rel="canonical">` - Primary URL

### Open Graph

- `og:title`
- `og:description`
- `og:image`
- `og:url` - Current page URL

### Structured Data

- Person schema (author)
- BlogPosting schema (articles)
- WebSite schema (search action)
- Breadcrumb schema

## Technical SEO

### Already Implemented

- [x] Sitemap XML (auto-generated)
- [x] robots.txt
- [x] humans.txt
- [x] security.txt
- [x] manifest.json (PWA)
- [x] Semantic HTML
- [x] Image optimization (Sharp)
- [x] Font optimization (display=swap)

### Pending

- [ ] Canonical tags for /workspace/\* pages
- [ ] Breadcrumb schema for Dev Mode
- [ ] Performance optimization (Core Web Vitals)

## URLs

### Good

```
/blog/getting-started-with-astro
/workspace/blog/getting-started-with-astro
```

### Avoid

```
/blog/post-1
/workspace/p/123
```
