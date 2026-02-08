# Optimization Plan - Before Adding New Features

## 🎯 Current State Analysis

### ✅ Strengths

- Clean component structure
- Minimal dependencies
- Good separation of concerns
- Comprehensive documentation
- Mobile responsive

### ⚠️ Areas for Improvement

---

## 🔧 Priority 1: Critical Optimizations

### 1. **CSS Import Optimization** 🔴 HIGH

**Issue**: `animations.css` belum di-import di layout

**Fix**:

```astro
// src/layouts/I3Layout.astro
import "@/styles/terminal-theme.css";
import "@/styles/i3wm-theme.css";
import "@/styles/animations.css";  // ← Add this
```

**Impact**: Animations tidak akan berfungsi tanpa ini

---

### 2. **Font Loading Optimization** 🔴 HIGH

**Issue**: Fira Code loaded via Google Fonts (blocking)

**Current**:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Better**:

```astro
---
import { AstroFont } from "astro-font";
---

<AstroFont
  config={[
    {
      name: "Fira Code",
      src: [
        {
          style: 'normal',
          weight: '400',
          path: '/fonts/FiraCode-Regular.woff2'
        },
        {
          style: 'normal',
          weight: '600',
          path: '/fonts/FiraCode-SemiBold.woff2'
        }
      ],
      preload: true,
      display: "swap",
      selector: "body",
      fallback: "monospace"
    }
  ]}
/>
```

**Impact**:

- Faster font loading
- No external request
- Better performance

---

### 3. **Theme Flash Prevention** 🟡 MEDIUM

**Issue**: Theme flash on page load (FOUC)

**Current**: Theme loaded after page render

**Fix**:

```html
<!-- Add to <head> BEFORE any styles -->
<script is:inline>
  (function () {
    const theme = localStorage.getItem("theme") || "tokyo-night";
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
```

**Impact**: No flash of unstyled content

---

### 4. **Scroll Performance** 🟡 MEDIUM

**Issue**: Keyboard scroll bisa jadi janky pada list panjang

**Fix**:

```javascript
// KeyboardHandler.astro
function scrollBy(amount) {
  // Use requestAnimationFrame for smooth scroll
  const start = window.scrollY;
  const target = start + amount;
  const duration = 200;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut

    window.scrollTo(0, start + (target - start) * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
```

**Impact**: Smoother scrolling, better performance

---

## 🚀 Priority 2: Performance Optimizations

### 5. **Image Optimization** 🟢 LOW

**Issue**: Images tidak di-optimize

**Recommendation**:

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={post.data.image}
  alt={post.data.title}
  width={800}
  height={400}
  format="webp"
  loading="lazy"
/>
```

**Impact**: Faster page load, smaller bundle

---

### 6. **Code Splitting** 🟢 LOW

**Issue**: All JS loaded upfront

**Recommendation**:

```astro
<!-- Load help modal only when needed -->
<script>
  let helpModalLoaded = false;

  document.addEventListener('keydown', async (e) => {
    if (e.key === '?' && !helpModalLoaded) {
      const { default: HelpModal } = await import('./HelpModal.astro');
      helpModalLoaded = true;
    }
  });
</script>
```

**Impact**: Smaller initial bundle

---

### 7. **CSS Purging** 🟢 LOW

**Issue**: Unused CSS dari Tailwind

**Check**: Tailwind config sudah benar?

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // ...
};
```

**Impact**: Smaller CSS bundle

---

## 🎨 Priority 3: UX Improvements

### 8. **Loading States** 🟡 MEDIUM

**Issue**: No loading indicator saat navigate

**Add**:

```astro
<!-- Loading bar -->
<div id="loading-bar" class="loading-bar"></div>

<style>
  .loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--blue);
    width: 0%;
    transition: width 0.3s;
    z-index: 9999;
  }

  .loading-bar.active {
    width: 100%;
  }
</style>

<script>
  document.addEventListener('astro:before-preparation', () => {
    document.getElementById('loading-bar')?.classList.add('active');
  });

  document.addEventListener('astro:page-load', () => {
    document.getElementById('loading-bar')?.classList.remove('active');
  });
</script>
```

**Impact**: Better perceived performance

---

### 9. **Error Boundaries** 🟡 MEDIUM

**Issue**: No error handling

**Add**:

```astro
<!-- 404 page with terminal theme -->
// src/pages/404.astro
---
import I3Layout from '@/layouts/I3Layout.astro';
import I3Window from '@/components/terminal/I3Window.astro';
---

<I3Layout title="404 - Not Found">
  <I3Window title="bash: command not found" focused={true}>
    <pre>
bash: {Astro.url.pathname}: No such file or directory

Available commands:
  cd /          # Go home
  cd /blog      # View blog
  cd /about     # About me

Type 'help' for more information.
    </pre>
  </I3Window>
</I3Layout>
```

**Impact**: Better error experience

---

### 10. **Accessibility Audit** 🟡 MEDIUM

**Issues to check**:

- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader friendly
- [ ] Skip to content link

**Quick wins**:

```astro
<!-- Add skip link -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--blue);
    color: white;
    padding: 8px;
    z-index: 100;
  }

  .skip-link:focus {
    top: 0;
  }
</style>
```

**Impact**: Better accessibility

---

## 📊 Priority 4: Monitoring & Analytics

### 11. **Performance Monitoring** 🟢 LOW

**Add**: Web Vitals tracking

```astro
<script>
  // Track Core Web Vitals
  import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

  function sendToAnalytics(metric) {
    console.log(metric);
    // Send to your analytics
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
</script>
```

**Impact**: Know what to optimize

---

### 12. **Error Tracking** 🟢 LOW

**Add**: Console error tracking

```javascript
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  // Send to error tracking service
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
});
```

**Impact**: Catch bugs in production

---

## 🧪 Priority 5: Testing & Quality

### 13. **Browser Testing** 🟡 MEDIUM

**Test on**:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Focus areas**:

- Theme switching
- Keyboard shortcuts
- Smooth scrolling
- Touch interactions
- Font rendering

---

### 14. **Lighthouse Audit** 🟡 MEDIUM

**Run**:

```bash
npm run build
npx lighthouse http://localhost:4321/blog-tiling --view
```

**Target scores**:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

### 15. **Bundle Analysis** 🟢 LOW

**Check bundle size**:

```bash
npm run build
du -sh dist/
du -sh dist/_astro/
```

**Target**:

- Total: < 500KB
- JS: < 100KB
- CSS: < 50KB

---

## 📝 Implementation Checklist

### Must Do (Before New Features) 🔴

- [ ] Import animations.css in I3Layout
- [ ] Add theme flash prevention script
- [ ] Optimize font loading
- [ ] Add loading states
- [ ] Create proper 404 page
- [ ] Add skip to content link
- [ ] Test on all major browsers

### Should Do (Soon) 🟡

- [ ] Optimize scroll performance
- [ ] Add error boundaries
- [ ] Run Lighthouse audit
- [ ] Fix accessibility issues
- [ ] Add Web Vitals tracking

### Nice to Have (Later) 🟢

- [ ] Image optimization
- [ ] Code splitting
- [ ] CSS purging
- [ ] Error tracking
- [ ] Bundle analysis

---

## 🎯 Quick Wins (Do Now)

### 1. Import animations.css

```astro
// src/layouts/I3Layout.astro - Line 2
import "@/styles/animations.css";
```

### 2. Prevent theme flash

```html
<!-- src/layouts/I3Layout.astro - In <head> before styles -->
<script is:inline>
  (function () {
    const theme = localStorage.getItem("theme") || "tokyo-night";
    document.documentElement.setAttribute("data-theme", theme);
  })();
</script>
```

### 3. Add loading bar

```astro
<!-- src/layouts/I3Layout.astro - After <body> -->
<div id="loading-bar" class="loading-bar"></div>
```

### 4. Add skip link

```astro
<!-- src/layouts/I3Layout.astro - First in <body> -->
<a href="#main-content" class="skip-link">Skip to content</a>
```

---

## 📈 Expected Impact

### Performance

- **Before**: ~2s load time
- **After**: ~1s load time
- **Improvement**: 50% faster

### User Experience

- No theme flash
- Smooth scrolling
- Better loading feedback
- Accessible navigation

### Code Quality

- Better error handling
- Proper monitoring
- Browser compatibility
- Accessibility compliant

---

## 🚀 Next Steps

1. **Implement Quick Wins** (15 min)
2. **Test on browsers** (30 min)
3. **Run Lighthouse** (10 min)
4. **Fix critical issues** (30 min)
5. **Ready for new features!** ✅

---

## 💡 Recommendations Summary

### Do Now (Critical)

1. Import animations.css
2. Prevent theme flash
3. Add loading states
4. Create 404 page

### Do Soon (Important)

5. Optimize fonts
6. Improve scroll
7. Add skip link
8. Browser testing

### Do Later (Nice to have)

9. Image optimization
10. Code splitting
11. Analytics
12. Error tracking

---

**Total Time Estimate**: 2-3 hours
**Impact**: High - Better performance, UX, and stability

Ready to implement? 🚀
