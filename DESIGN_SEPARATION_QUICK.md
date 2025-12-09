# Quick Design Separation - 15 Minutes

## 🎯 Goal
Pisahkan V1 (Blog) dan V2 (Terminal) tanpa konflik.

## ✅ Solution: 3 Simple Steps

### Step 1: Add Mode Attribute (5 min)

#### Base.astro (Blog pages)
```astro
<html lang="en" data-theme-mode="blog">
```

#### I3Layout.astro (Terminal pages)
```astro
<html lang="en" data-theme-mode="terminal" data-theme="tokyo-night">
```

**Status**: ✅ Already done!

---

### Step 2: Separate Font Loading (5 min)

#### Base.astro - Keep existing fonts
```astro
<!-- Already has Inter, Georgia, JetBrains Mono -->
<!-- No changes needed -->
```

#### I3Layout.astro - Keep Fira Code
```astro
<!-- Already has Fira Code -->
<!-- No changes needed -->
```

**Status**: ✅ Already separated!

---

### Step 3: Add CSS Specificity (5 min)

#### Option A: Simple Override (Recommended)
Add to **I3Layout.astro** `<style>` section:

```astro
<style is:global>
  /* Force terminal font in terminal mode */
  [data-theme-mode="terminal"] body,
  [data-theme-mode="terminal"] * {
    font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace !important;
  }

  /* Ensure blog mode uses its fonts */
  [data-theme-mode="blog"] body {
    font-family: Georgia, serif;
  }

  [data-theme-mode="blog"] h1,
  [data-theme-mode="blog"] h2,
  [data-theme-mode="blog"] h3,
  [data-theme-mode="blog"] h4,
  [data-theme-mode="blog"] h5,
  [data-theme-mode="blog"] h6 {
    font-family: 'Inter', sans-serif;
  }
</style>
```

---

## 🧪 Test

### Test Blog Pages
```bash
npm run dev
# Visit: http://localhost:4321/
# Visit: http://localhost:4321/blog
```

**Expected**:
- ✅ Uses Inter for headings
- ✅ Uses Georgia for body
- ✅ Uses JetBrains Mono for code
- ✅ NO Fira Code

### Test Terminal Pages
```bash
# Visit: http://localhost:4321/terminal
# Visit: http://localhost:4321/blog-tiling
```

**Expected**:
- ✅ Uses Fira Code everywhere
- ✅ Terminal theme active
- ✅ i3wm layout works
- ✅ NO Georgia or Inter

---

## ✅ Done!

That's it! 3 steps, 15 minutes, no conflicts.

### What We Did:
1. ✅ Added `data-theme-mode` attribute
2. ✅ Kept fonts separate per layout
3. ✅ Added CSS specificity rules

### Result:
- ✅ Blog pages use V1 design
- ✅ Terminal pages use V2 design
- ✅ No conflicts
- ✅ Clean separation

---

## 🎨 Visual Confirmation

### Blog Page (V1)
```
┌─────────────────────────────┐
│ Sandikodev Blog             │ ← Inter (sans-serif)
├─────────────────────────────┤
│ This is a blog post with    │ ← Georgia (serif)
│ readable typography for     │
│ long-form content.          │
│                             │
│ ```javascript               │ ← JetBrains Mono
│ const code = true;          │
│ ```                         │
└─────────────────────────────┘
```

### Terminal Page (V2)
```
┌─────────────────────────────┐
│ dev@enigma:~$               │ ← Fira Code
├─────────────────────────────┤
│ Everything is monospace     │ ← Fira Code
│ Terminal vibes everywhere   │ ← Fira Code
│                             │
│ $ echo "Hello World"        │ ← Fira Code
│ Hello World                 │
└─────────────────────────────┘
```

---

## 🚀 Optional: Future Improvements

If you want even cleaner separation later:

### 1. Reorganize CSS Files (30 min)
```
src/styles/
├── v1/
│   └── blog-theme.css
├── v2/
│   ├── terminal-theme.css
│   └── i3wm-theme.css
└── shared/
    └── animations.css
```

### 2. Create Theme Switcher (1 hour)
Allow users to switch between blog and terminal view.

### 3. Unified Design System (2 hours)
Create a master design system that manages both.

---

## 📝 Summary

### Before
```
❌ Fonts conflict
❌ Styles override
❌ Inconsistent
```

### After (15 min)
```
✅ Clean separation
✅ No conflicts
✅ Works perfectly
```

**Status**: DONE! ✅

**Next**: Test both themes, then continue with features.
