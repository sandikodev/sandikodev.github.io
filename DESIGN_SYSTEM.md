# Design System - Sandikodev Blog

## 🎨 Design Philosophy

**Reader-First Blog Design**
- Typography optimized for long-form reading
- Soft, comfortable color palette
- Generous whitespace
- Minimal distractions
- Excellent dark mode support

---

## 📝 Typography

### Font Families

**Heading Font: Inter**
- Modern, professional sans-serif
- Excellent readability at all sizes
- Used for: Headings, UI elements, buttons

**Body Font: Georgia**
- Classic serif typeface
- Optimized for long-form reading
- Used for: Article content, paragraphs

**Code Font: JetBrains Mono**
- Monospace with ligatures
- Clear distinction between characters
- Used for: Code blocks, inline code

### Font Sizes

```
h1: 3rem (48px)
h2: 2.25rem (36px)
h3: 1.875rem (30px)
h4: 1.5rem (24px)
h5: 1.25rem (20px)
h6: 1.125rem (18px)
body: 1rem (16px)
```

### Line Heights

```
Headings: 1.25 (tight)
Body: 1.75 (relaxed) - optimal for reading
Lists: 1.75 (relaxed)
```

---

## 🎨 Color Palette

### Light Mode

```css
Background:   #FAFAFA  /* Soft off-white */
Surface:      #FFFFFF  /* Pure white */
Text:         #1A1A1A  /* Near black */
Text Muted:   #6B7280  /* Gray */
Accent:       #2563EB  /* Calm blue */
Accent Hover: #1D4ED8  /* Darker blue */
Border:       #E5E7EB  /* Light gray */
Code BG:      #F3F4F6  /* Very light gray */
```

### Dark Mode

```css
Background:   #0F0F0F  /* Near black */
Surface:      #1A1A1A  /* Dark gray */
Text:         #E5E5E5  /* Off-white */
Text Muted:   #9CA3AF  /* Light gray */
Accent:       #60A5FA  /* Lighter blue */
Accent Hover: #3B82F6  /* Medium blue */
Border:       #374151  /* Dark gray */
Code BG:      #1F2937  /* Dark gray */
```

### Color Psychology

- **Blue Accent**: Trust, professionalism, calm
- **Soft Backgrounds**: Reduce eye strain
- **High Contrast Text**: WCAG AA compliant (4.5:1 minimum)

---

## 📐 Spacing & Layout

### Content Width

```
Max Container: 1200px  /* Overall layout */
Content Width: 680px   /* Optimal reading width */
                       /* 45-75 characters per line */
```

### Section Spacing

```
Section Padding: 5rem (80px) vertical
Gap Sizes:
  xs: 0.5rem (8px)
  sm: 1rem (16px)
  md: 1.5rem (24px)
  lg: 2rem (32px)
  xl: 3rem (48px)
```

### Border Radius

```
sm: 0.25rem (4px)   - Small elements
md: 0.5rem (8px)    - Buttons, cards
lg: 0.75rem (12px)  - Images, code blocks
xl: 1rem (16px)     - Large containers
```

---

## ⚡ Transitions

```
Fast:   150ms ease  - Hover states
Normal: 300ms ease  - Standard transitions
Slow:   500ms ease  - Complex animations
```

---

## 🎯 Usage Examples

### Article Content

```html
<article class="content-container">
  <h1>Article Title</h1>
  <p class="text-muted">Published on Dec 9, 2025</p>
  
  <p>
    Body text with comfortable line-height (1.75) 
    for optimal reading experience...
  </p>
  
  <h2>Section Heading</h2>
  <p>More content...</p>
</article>
```

### Code Blocks

```html
<pre><code>
const example = "code";
console.log(example);
</code></pre>
```

### Buttons

```html
<a href="#" class="btn-primary">Primary Action</a>
<a href="#" class="btn-secondary">Secondary Action</a>
```

---

## ♿ Accessibility

### WCAG AA Compliance

✅ Text contrast ratio: 4.5:1 minimum
✅ Focus indicators: 2px solid accent color
✅ Keyboard navigation support
✅ Screen reader friendly
✅ Semantic HTML structure

### Dark Mode

- Automatic system preference detection
- Manual toggle available
- Smooth transition between modes
- Optimized contrast for both modes

---

## 📱 Responsive Design

### Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Typography Scaling

- Font sizes scale down on mobile
- Line heights remain consistent
- Spacing adjusts proportionally

---

## 🚀 Implementation

### Import Design System

```astro
---
import "@/styles/design-system.css";
---
```

### Use CSS Variables

```css
.custom-element {
  font-family: var(--font-heading);
  color: var(--color-text);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}
```

---

## 🎨 Preview

Visit `/design-preview` to see all design system elements in action:

- Typography samples
- Color palette
- Content elements (paragraphs, lists, blockquotes)
- Code blocks
- Interactive elements
- Dark mode comparison

---

## 📊 Performance

- **Font Loading**: Optimized with `font-display: swap`
- **CSS Size**: Minimal, using CSS variables
- **No JavaScript**: Pure CSS design system
- **Fast Rendering**: No layout shifts

---

## 🔄 Version

**Version**: 1.0.0
**Last Updated**: December 10, 2025
**Status**: ✅ Production Ready

---

## ✅ Implemented Features (v1.0)

- Reading progress bar (2px monochrome)
- Table of Contents (sidebar, desktop only) - ✅ Done (TableOfContents.astro)
- DevStats (words, min read, code blocks)
- Related posts - ✅ Done (2 versions: RelatedPosts.astro, RelatedPostsEnhanced.astro)
- Keyboard shortcuts (vim j/k, g+h, g+b)
- Command palette (Cmd+K) - ✅ Done (3 versions)
- Code block enhancements (copy button)
- /now page
- Glassmorphism header
- 3-column footer
- Dark mode support

---

## 🔲 Roadmap (v1.x)

### Content Enhancement
- [x] Estimated reading progress - "3 min left" indicator - ✅ Done (ReadingProgress.astro)
- [ ] Bookmark/save article - localStorage
- [ ] Text highlighting - select & save highlights
- [ ] Font size toggle - A- A A+ accessibility

### Navigation
- [x] Previous/Next post navigation - ✅ Done (PrevNext.astro)
- [x] Back to top button (smooth scroll) - ✅ Done (BackToTop.astro)
- [x] Breadcrumbs - Home > Blog > Post Title - ✅ Done (Breadcrumb.astro with schema)

### Engagement
- [x] Share buttons - Twitter, LinkedIn, copy link - ✅ Done (SocialShare.astro)
- [ ] Newsletter signup form
- [x] Comments via Giscus (GitHub discussions) - ✅ Done (Comments.astro)

### Developer Features
- [x] Code snippet library page (/snippets) - ✅ Done (CodeSnippetLibrary.astro)
- [ ] RSS feed optimization
- [ ] Reading history (localStorage)

### Polish
- [x] Custom 404 page - ✅ Done (404.astro with terminal theme)
- [ ] Loading states / skeleton loaders
- [ ] Print stylesheet

---

## 📝 Notes

This design system is specifically optimized for:
- Long-form blog content
- Technical articles with code
- Reader comfort and engagement
- Accessibility and inclusivity
- Performance and speed

**Philosophy**: "Content first, design second. Make reading a pleasure, not a chore."
