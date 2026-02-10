# Testing Checklist - Before Production

## 🧪 Functional Testing

### Core Features

- [ ] **Homepage** loads correctly
- [ ] **Blog Tiling** (`/blog-tiling`) displays all posts
- [ ] **404 Page** shows when accessing invalid URL
- [ ] **Navigation** between pages works
- [ ] **View Transitions** smooth between pages

### Keyboard Navigation

- [ ] `j` scrolls down smoothly
- [ ] `k` scrolls up smoothly
- [ ] `g g` goes to top
- [ ] `G` goes to bottom
- [ ] `g h` navigates to home
- [ ] `g b` navigates to blog
- [ ] `t` cycles through themes
- [ ] `?` opens help modal
- [ ] `Esc` closes help modal
- [ ] Keyboard indicator shows feedback
- [ ] Shortcuts don't work in input fields

### Theme System

- [ ] Theme switcher button visible
- [ ] Dropdown menu opens on click
- [ ] All 5 themes available
- [ ] Active theme marked with ✓
- [ ] Theme changes immediately
- [ ] Theme persists after refresh
- [ ] No flash on page load (FOUC)
- [ ] Smooth transitions between themes

### Layout & Components

- [ ] Polybar displays correctly
- [ ] Workspaces show active state
- [ ] i3 Windows have proper borders
- [ ] Title bars display correctly
- [ ] Content scrolls within windows
- [ ] Stats update correctly
- [ ] Activity feed shows recent posts
- [ ] Tags and categories clickable

---

## 📱 Responsive Testing

### Desktop (>1024px)

- [ ] 3-column layout displays
- [ ] All sidebars visible
- [ ] Hover effects work
- [ ] Smooth animations
- [ ] No horizontal scroll

### Tablet (768-1024px)

- [ ] 2-column layout
- [ ] Right sidebar hidden
- [ ] Touch targets adequate
- [ ] Scrolling smooth
- [ ] No layout breaks

### Mobile (<768px)

- [ ] 1-column stack layout
- [ ] Main content appears first
- [ ] Compact UI elements
- [ ] Touch-friendly (32px min)
- [ ] No horizontal scroll
- [ ] Keyboard indicator visible
- [ ] Theme switcher accessible

### Small Mobile (<480px)

- [ ] Ultra-compact UI
- [ ] Essential info only
- [ ] Large touch targets
- [ ] Readable text
- [ ] No overflow

### Landscape Mode

- [ ] Layout adapts correctly
- [ ] Content readable
- [ ] Navigation accessible

---

## 🌐 Browser Testing

### Chrome/Edge

- [ ] All features work
- [ ] Animations smooth
- [ ] Fonts load correctly
- [ ] No console errors

### Firefox

- [ ] All features work
- [ ] Animations smooth
- [ ] Fonts load correctly
- [ ] No console errors

### Safari (Desktop)

- [ ] All features work
- [ ] Animations smooth
- [ ] Fonts load correctly
- [ ] No console errors

### Mobile Safari (iOS)

- [ ] Touch interactions work
- [ ] Scrolling smooth
- [ ] Fonts render correctly
- [ ] No layout issues

### Chrome Mobile (Android)

- [ ] Touch interactions work
- [ ] Scrolling smooth
- [ ] Fonts render correctly
- [ ] No layout issues

---

## ⚡ Performance Testing

### Load Time

- [ ] First paint < 1.5s
- [ ] Interactive < 2s
- [ ] Full load < 3s

### Lighthouse Scores

- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 95+
- [ ] SEO: 95+

### Bundle Size

- [ ] Total < 500KB
- [ ] JS < 100KB
- [ ] CSS < 50KB
- [ ] Images optimized

### Runtime Performance

- [ ] Smooth scrolling (60fps)
- [ ] No jank on interactions
- [ ] Fast theme switching
- [ ] Quick page transitions

---

## ♿ Accessibility Testing

### Keyboard Navigation

- [ ] All interactive elements focusable
- [ ] Focus visible (outline)
- [ ] Tab order logical
- [ ] Skip to content link works
- [ ] No keyboard traps

### Screen Reader

- [ ] Page structure clear
- [ ] Headings hierarchical
- [ ] Links descriptive
- [ ] Images have alt text
- [ ] ARIA labels present

### Color Contrast

- [ ] Text readable (WCAG AA)
- [ ] Links distinguishable
- [ ] Focus indicators visible
- [ ] Error messages clear

### Motion

- [ ] Respects `prefers-reduced-motion`
- [ ] Animations can be disabled
- [ ] No flashing content

---

## 🔒 Security Testing

### Content Security

- [ ] No inline scripts (except critical)
- [ ] External resources trusted
- [ ] No XSS vulnerabilities
- [ ] Forms validated

### Privacy

- [ ] No tracking without consent
- [ ] LocalStorage used appropriately
- [ ] No sensitive data exposed

---

## 🐛 Error Handling

### Error States

- [ ] 404 page displays correctly
- [ ] Broken images handled
- [ ] Failed API calls handled
- [ ] Console errors caught

### Edge Cases

- [ ] Empty blog posts list
- [ ] Missing images
- [ ] Long post titles
- [ ] Special characters in URLs
- [ ] Slow network conditions

---

## 📊 Analytics & Monitoring

### Tracking

- [ ] Page views tracked
- [ ] Errors logged
- [ ] Performance metrics collected
- [ ] User interactions tracked

### Console

- [ ] No errors in production
- [ ] No warnings
- [ ] Useful debug info in dev

---

## 🚀 Pre-Launch Checklist

### Content

- [ ] All pages have content
- [ ] Images optimized
- [ ] Links work
- [ ] Metadata correct

### SEO

- [ ] Title tags unique
- [ ] Meta descriptions present
- [ ] Open Graph tags
- [ ] Sitemap generated
- [ ] Robots.txt configured

### Performance

- [ ] Images lazy loaded
- [ ] Fonts optimized
- [ ] CSS minified
- [ ] JS minified
- [ ] Gzip enabled

### Final Checks

- [ ] Build succeeds
- [ ] No console errors
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated

---

## 🧪 Testing Commands

### Run Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Lighthouse

```bash
npm run build
npx lighthouse http://localhost:4321/blog-tiling --view
```

### Check Bundle Size

```bash
npm run build
du -sh dist/
du -sh dist/_astro/
```

### Test on Mobile

```bash
# Use ngrok or similar
npx ngrok http 4321
# Then test on real device
```

---

## 📝 Test Results Template

### Date: \***\*\_\_\_\*\***

### Tester: \***\*\_\_\_\*\***

### Browser: \***\*\_\_\_\*\***

### Device: \***\*\_\_\_\*\***

#### Functional: ☐ Pass ☐ Fail

Notes: \***\*\_\_\_\*\***

#### Responsive: ☐ Pass ☐ Fail

Notes: \***\*\_\_\_\*\***

#### Performance: ☐ Pass ☐ Fail

Lighthouse Score: \***\*\_\_\_\*\***

#### Accessibility: ☐ Pass ☐ Fail

Issues: \***\*\_\_\_\*\***

#### Overall: ☐ Ready ☐ Needs Work

---

## 🎯 Priority Issues

### Critical (Must Fix)

- [ ] ***
- [ ] ***

### High (Should Fix)

- [ ] ***
- [ ] ***

### Medium (Nice to Fix)

- [ ] ***
- [ ] ***

### Low (Can Wait)

- [ ] ***
- [ ] ***

---

## ✅ Sign-Off

- [ ] All critical tests passed
- [ ] All high priority issues fixed
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Ready for production

**Signed**: \***\*\_\_\_\*\***
**Date**: \***\*\_\_\_\*\***

---

**Note**: Test on real devices when possible, not just browser DevTools!
