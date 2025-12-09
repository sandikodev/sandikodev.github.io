# Design System Strategy - V1 vs V2 Coexistence

## 🎯 Problem Statement

Kita punya 2 design system yang berbeda:
- **V1**: Blog theme (Inter + Georgia + JetBrains Mono)
- **V2**: Terminal theme (Fira Code monospace everything)

Keduanya harus bisa coexist tanpa konflik.

---

## 📊 Current State Analysis

### Design System V1 (Blog Theme)
**Used by**:
- `Base.astro` → Most blog pages
- `PostSingle.astro` → Blog post detail
- `Posts.astro` → Blog listing
- Regular pages (about, contact, etc)

**Fonts**:
- Heading: Inter
- Body: Georgia (serif)
- Code: JetBrains Mono

**Style**: Traditional blog, readable, professional

---

### Design System V2 (Terminal Theme)
**Used by**:
- `I3Layout.astro` → Terminal pages
- `TerminalLayout.astro` → Terminal features
- `/terminal`, `/blog-tiling`, `/404`

**Fonts**:
- Everything: Fira Code (monospace)

**Style**: i3wm, hacker aesthetic, terminal vibes

---

## ✅ Recommended Strategy: **Scoped Isolation**

### Approach: Layout-Based Scoping

```
src/
├── layouts/
│   ├── Base.astro          → V1 (Blog theme)
│   ├── I3Layout.astro      → V2 (Terminal theme)
│   └── ...
├── styles/
│   ├── main.css            → V1 global styles
│   ├── terminal-theme.css  → V2 base (scoped)
│   ├── i3wm-theme.css      → V2 tiling (scoped)
│   └── animations.css      → Shared utilities
└── pages/
    ├── index.astro         → Uses Base (V1)
    ├── blog.astro          → Uses Base (V1)
    ├── terminal.astro      → Uses I3Layout (V2)
    └── blog-tiling.astro   → Uses I3Layout (V2)
```

**Key Principle**: Each layout imports only its own styles.

---

## 🔧 Implementation Plan

### Phase 1: Isolate V2 Styles (CRITICAL)

#### 1.1 Scope Terminal Theme
```css
/* terminal-theme.css - Wrap ALL content with scope */
[data-theme-mode="terminal"] {
  /* All V2 variables here */
  --font-mono: 'Fira Code', monospace;
  --bg-primary: #1a1b26;
  /* ... all other variables */
}

/* Apply to body when in terminal mode */
[data-theme-mode="terminal"] body {
  font-family: var(--font-mono);
}

/* Wrap ALL existing terminal styles */
[data-theme-mode="terminal"] .i3-window {
  /* styles here */
}

/* etc... */
```

#### 1.2 Update I3Layout
```astro
---
// I3Layout.astro
import "@/styles/terminal-theme.css";
import "@/styles/i3wm-theme.css";
import "@/styles/animations.css";
---

<html data-theme-mode="terminal" data-theme="tokyo-night">
  <!-- Terminal pages only -->
</html>
```

#### 1.3 Keep Base Layout Clean
```astro
---
// Base.astro
import "@/styles/main.css";
// NO terminal styles imported
---

<html data-theme-mode="blog">
  <!-- Blog pages only -->
</html>
```

---

### Phase 2: Font Strategy

#### Option A: **Separate Font Loading** (Recommended)

**Base.astro** (V1):
```astro
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" />
```

**I3Layout.astro** (V2):
```astro
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Pros**:
- ✅ Clean separation
- ✅ No conflicts
- ✅ Each page loads only what it needs

**Cons**:
- ⚠️ Duplicate requests if user visits both types

---

#### Option B: **Unified Font Loading** (Alternative)

Load all fonts in both layouts, but scope usage:

```css
/* main.css (V1) */
body {
  font-family: Georgia, serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
}

code {
  font-family: 'JetBrains Mono', monospace;
}

/* terminal-theme.css (V2) */
[data-theme-mode="terminal"] body,
[data-theme-mode="terminal"] * {
  font-family: 'Fira Code', monospace !important;
}
```

**Pros**:
- ✅ Fonts cached across pages
- ✅ Faster subsequent loads

**Cons**:
- ⚠️ Larger initial load
- ⚠️ Need `!important` (not ideal)

---

### Phase 3: CSS Variable Namespacing

#### V1 Variables (main.css)
```css
:root {
  /* Blog theme variables */
  --blog-primary: #3b82f6;
  --blog-text: #1f2937;
  --blog-bg: #ffffff;
  
  /* Keep generic names for V1 (backward compat) */
  --primary: var(--blog-primary);
  --text: var(--blog-text);
  --bg: var(--blog-bg);
}
```

#### V2 Variables (terminal-theme.css)
```css
[data-theme-mode="terminal"] {
  /* Terminal theme variables */
  --terminal-bg: #1a1b26;
  --terminal-text: #c0caf5;
  --terminal-accent: #7aa2f7;
  
  /* Override generic names in terminal mode */
  --bg-primary: var(--terminal-bg);
  --text-primary: var(--terminal-text);
  --blue: var(--terminal-accent);
}
```

---

## 📁 File Structure (Reorganized)

```
src/styles/
├── v1/                          # Blog theme (V1)
│   ├── main.css                 # V1 base styles
│   ├── typography.css           # Inter + Georgia
│   └── components.css           # Blog components
│
├── v2/                          # Terminal theme (V2)
│   ├── terminal-base.css        # V2 base (scoped)
│   ├── terminal-colors.css      # Theme colors
│   ├── i3wm.css                 # Tiling layout
│   └── terminal-components.css  # Terminal components
│
└── shared/                      # Shared utilities
    ├── animations.css           # Reusable animations
    ├── utilities.css            # Utility classes
    └── reset.css                # CSS reset
```

---

## 🎨 Theme Switching Strategy

### Scenario 1: User on Blog Page
```html
<html data-theme-mode="blog">
  <!-- V1 styles active -->
  <!-- Fira Code NOT loaded -->
</html>
```

### Scenario 2: User on Terminal Page
```html
<html data-theme-mode="terminal" data-theme="tokyo-night">
  <!-- V2 styles active -->
  <!-- Can switch: tokyo-night, dracula, gruvbox, etc -->
</html>
```

### Scenario 3: User Navigates Between
```javascript
// On page transition
document.addEventListener('astro:page-load', () => {
  const mode = document.documentElement.dataset.themeMode;
  
  if (mode === 'terminal') {
    // Load terminal fonts if not loaded
    loadTerminalFonts();
  }
});
```

---

## 🚀 Implementation Steps

### Step 1: Reorganize Styles (30 min)
```bash
# Create new structure
mkdir -p src/styles/{v1,v2,shared}

# Move V1 styles
mv src/styles/main.css src/styles/v1/
# Note: design-system.css doesn't exist, skip it

# Move V2 styles
mv src/styles/terminal-theme.css src/styles/v2/
mv src/styles/i3wm-theme.css src/styles/v2/

# Keep shared
mv src/styles/animations.css src/styles/shared/
```
mv src/styles/terminal-theme.css src/styles/v2/
mv src/styles/i3wm-theme.css src/styles/v2/

# Keep shared
mv src/styles/animations.css src/styles/shared/
```

### Step 2: Update Imports (15 min)
```astro
// Base.astro
import "@/styles/v1/main.css";

// I3Layout.astro
import "@/styles/v2/terminal-base.css";
import "@/styles/v2/i3wm.css";
import "@/styles/shared/animations.css";
```

### Step 3: Add Scoping (20 min)
```css
/* Wrap all V2 styles */
[data-theme-mode="terminal"] {
  /* V2 variables and styles */
}
```

### Step 4: Test (15 min)
- Visit blog pages → Should use V1
- Visit terminal pages → Should use V2
- No style conflicts
- Fonts load correctly

**Total Time**: ~1.5 hours

---

## 🎯 Quick Win: Minimal Changes

If you want the FASTEST solution with minimal refactoring:

### 1. Add Scope to I3Layout
```astro
<html data-theme-mode="terminal" data-theme="tokyo-night">
```

### 2. Scope V2 CSS
```css
/* terminal-theme.css - Add wrapper */
[data-theme-mode="terminal"] {
  /* All existing V2 styles here */
}
```

### 3. Keep Fonts Separate
- Base.astro: Inter + Georgia + JetBrains Mono
- I3Layout.astro: Fira Code only

**Time**: 30 minutes
**Impact**: Immediate isolation

---

## 📊 Comparison Matrix

| Strategy | Pros | Cons | Time | Recommended |
|----------|------|------|------|-------------|
| **Scoped Isolation** | Clean, no conflicts | Need scoping | 30min | ✅ YES |
| **Separate Files** | Very clean | More files | 1.5hr | ⭐ BEST |
| **Namespace Variables** | Flexible | Complex | 1hr | 🟡 OK |
| **Separate Fonts** | No conflicts | Duplicate loads | 15min | ✅ YES |
| **Unified Fonts** | Cached | Larger bundle | 20min | 🟡 OK |

---

## ✅ Recommended Solution

### **Hybrid Approach**: Scoped + Separate Fonts

#### What to Do:
1. ✅ Add `data-theme-mode="terminal"` to I3Layout
2. ✅ Wrap V2 CSS with `[data-theme-mode="terminal"]`
3. ✅ Keep fonts separate (load in respective layouts)
4. ✅ Add `data-theme-mode="blog"` to Base.astro
5. ✅ Test both themes

#### Benefits:
- ✅ Minimal code changes
- ✅ No conflicts
- ✅ Clean separation
- ✅ Easy to maintain
- ✅ Fast to implement (30 min)

---

## 🧪 Testing Checklist

### V1 (Blog Theme)
- [ ] Homepage uses Inter + Georgia
- [ ] Blog posts readable
- [ ] Code blocks use JetBrains Mono
- [ ] No Fira Code loaded
- [ ] No terminal styles applied

### V2 (Terminal Theme)
- [ ] Terminal pages use Fira Code
- [ ] i3wm layout works
- [ ] Theme switching works
- [ ] No blog styles interfere
- [ ] Keyboard shortcuts work

### Cross-Navigation
- [ ] Blog → Terminal (styles switch)
- [ ] Terminal → Blog (styles switch)
- [ ] No flash of unstyled content
- [ ] Fonts load correctly

---

## 📝 Migration Checklist

- [ ] Add `data-theme-mode` to layouts
- [ ] Scope V2 CSS with `[data-theme-mode="terminal"]`
- [ ] Separate font loading
- [ ] Update imports
- [ ] Test all pages
- [ ] Verify no conflicts
- [ ] Update documentation

---

## 🎉 Expected Result

### Before
```
❌ Fonts conflict
❌ Styles override each other
❌ Inconsistent appearance
❌ Hard to maintain
```

### After
```
✅ Clean separation
✅ No conflicts
✅ Each theme independent
✅ Easy to maintain
✅ Fast page loads
```

---

**Recommendation**: Start with **Quick Win** (30 min), then optionally reorganize files later.

**Priority**: HIGH - Do this before adding more features!
