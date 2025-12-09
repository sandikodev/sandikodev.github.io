# Quick Reference Guide - SandikoDev

## 🚀 Commands

```bash
# Development
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Maintenance
rm -rf .astro dist    # Clean build cache
pnpm install          # Install dependencies
```

## 📁 Project Structure

```
portfolio/
├── public/                    # Static assets
│   ├── robots.txt            # SEO: Search engine rules
│   ├── humans.txt            # SEO: Human-readable info
│   ├── manifest.json         # PWA manifest
│   ├── favicon.ico           # Favicon (multi-size)
│   ├── logo.svg              # Logo (terminal style)
│   └── .well-known/
│       └── security.txt      # Security contact
│
├── src/
│   ├── components/           # Reusable components
│   │   ├── Breadcrumb.astro      # Navigation + schema
│   │   ├── ReadingTime.astro     # Reading time display
│   │   ├── SocialShare.astro     # Share buttons
│   │   ├── LazyImage.astro       # Lazy loading images
│   │   └── FAQ.astro             # FAQ + schema
│   │
│   ├── layouts/              # Page layouts
│   │   ├── Base.astro            # Base layout (SEO meta)
│   │   ├── PostSingle.astro      # Blog post layout
│   │   └── Default.astro         # Default page layout
│   │
│   ├── pages/                # Routes
│   │   ├── index.astro           # Homepage
│   │   ├── blog.astro            # Blog listing
│   │   ├── about.astro           # About page
│   │   ├── contact.astro         # Contact page
│   │   ├── search.astro          # Search page
│   │   ├── 404.astro             # 404 page
│   │   └── [regular].astro       # Dynamic routes
│   │
│   ├── content/              # Content collections
│   │   ├── posts/                # Blog posts (MDX)
│   │   ├── pages/                # Static pages (MD)
│   │   ├── authors/              # Author profiles
│   │   ├── about/                # About content
│   │   └── config.ts             # Content schema
│   │
│   └── config/               # Configuration
│       ├── config.json           # Site config
│       └── theme.json            # Theme config
│
├── FEATURES_ROADMAP.md       # Future features
├── SEO_CHECKLIST.md          # SEO tasks
├── SEO_IMPLEMENTATION.md     # SEO completed
└── QUICK_REFERENCE.md        # This file
```

## 🎨 Components Usage

### Breadcrumb
```astro
<Breadcrumb items={[
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
  { name: "Current Page" }
]} />
```

### Reading Time
```astro
<ReadingTime minutes={5} words={1000} />
```

### Social Share
```astro
<SocialShare 
  title="My Blog Post" 
  url="https://sandikodev.github.io/post-1" 
/>
```

### Lazy Image
```astro
<LazyImage 
  src="/images/photo.jpg" 
  alt="Description" 
  width={800} 
  height={600} 
/>
```

### FAQ
```astro
<FAQ items={[
  {
    question: "What is this?",
    answer: "This is an answer."
  }
]} />
```

## 📝 Content Creation

### New Blog Post
1. Create file: `src/content/posts/my-post.mdx`
2. Add frontmatter:
```yaml
---
title: "My Post Title"
description: "Post description for SEO"
date: 2025-12-09
image: "/images/post-image.jpg"
authors: ["sandikodev"]
categories: ["web-development"]
tags: ["react", "typescript"]
draft: false
---
```
3. Write content in MDX
4. Build and deploy

### New Page
1. Create file: `src/content/pages/my-page.md`
2. Add frontmatter:
```yaml
---
title: "Page Title"
description: "Page description"
---
```
3. Write content
4. Build and deploy

## 🔧 Configuration

### Site Config (`src/config/config.json`)
- `site.base_url` - Your domain
- `site.title` - Site title
- `metadata.meta_description` - Default description
- `metadata.meta_keywords` - SEO keywords

### Theme Config (`src/config/theme.json`)
- Font families
- Colors
- Spacing
- Typography

## 🎯 SEO URLs

### Important Files
- `/robots.txt` - Search engine rules
- `/humans.txt` - Human info
- `/manifest.json` - PWA manifest
- `/sitemap-index.xml` - Sitemap
- `/.well-known/security.txt` - Security contact

### Submit To
1. **Google Search Console**
   - https://search.google.com/search-console
   - Submit sitemap: `https://sandikodev.github.io/sitemap-index.xml`

2. **Bing Webmaster Tools**
   - https://www.bing.com/webmasters
   - Submit sitemap

## 🧪 Testing

### Structured Data
```bash
# Test in browser
https://search.google.com/test/rich-results
https://validator.schema.org/
```

### Performance
```bash
# Test in browser
https://pagespeed.web.dev/
```

### Accessibility
```bash
# Test in browser
https://wave.webaim.org/
```

## 🎨 Design System

### Colors
- Primary: `#2563eb` (Blue)
- Accent: `#60a5fa` (Light Blue)
- Dark BG: `#0f0f0f`
- Dark Surface: `#1a1a1a`

### Fonts
- Heading: Inter
- Body: Georgia (Serif)
- Code: JetBrains Mono

### Preview
Visit `/design-preview` to see design system

## 🔑 Keyboard Shortcuts (Planned)

- `Cmd/Ctrl + K` - Command palette
- `j/k` - Scroll down/up
- `g + h` - Go home
- `g + b` - Go to blog
- `?` - Show shortcuts

## 📊 Analytics (To Setup)

1. Google Analytics 4
2. Google Search Console
3. Bing Webmaster Tools
4. Performance monitoring

## 🚀 Deployment

### GitHub Pages
```bash
# Build
pnpm run build

# Deploy (automatic via GitHub Actions)
git push origin main
```

### Manual Deploy
```bash
# Build
pnpm run build

# Upload dist/ folder to hosting
```

## 📚 Documentation Files

- `README.md` - Project overview
- `FEATURES_ROADMAP.md` - Future features (20 items)
- `SEO_CHECKLIST.md` - SEO tasks and strategy
- `SEO_IMPLEMENTATION.md` - Completed SEO work
- `DESIGN_SYSTEM.md` - Design guidelines
- `QUICK_REFERENCE.md` - This file

## 🎉 Quick Tips

1. **Always optimize images** - Use WebP format when possible
2. **Write descriptive alt text** - Important for SEO and accessibility
3. **Use semantic HTML** - Proper heading hierarchy
4. **Test on mobile** - Mobile-first approach
5. **Monitor Core Web Vitals** - Keep performance high
6. **Update sitemap** - Automatic on build
7. **Check broken links** - Regular maintenance
8. **Write quality content** - SEO loves good content

## 🆘 Troubleshooting

### Build fails
```bash
rm -rf .astro dist node_modules
pnpm install
pnpm run build
```

### Sitemap not updating
```bash
rm -rf dist
pnpm run build
```

### Styles not applying
```bash
rm -rf .astro
pnpm run dev
```

### Port already in use
```bash
# Kill process on port 4321
lsof -ti:4321 | xargs kill -9
pnpm run dev
```

## 📞 Support

- GitHub: https://github.com/sandikodev
- Email: sandikodev@gmail.com
- Issues: Create issue on GitHub repo

---

**Last Updated:** 2025-12-09
**Version:** 1.0.0
