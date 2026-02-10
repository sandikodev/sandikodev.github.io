# Design System Strategy - V1 vs V2 Coexistence

## 🎯 Design Philosophy

Kita memiliki 2 design system yang berbeda dengan tujuan yang jelas:

### Design System V1 (Default) - Blog Theme

**Target**: Pembaca umum, profesional, fokus konten
**Fonts**: Inter + Georgia + JetBrains Mono
**Style**: Clean, modern, readable blog interface

### Design System V2 - Terminal Theme

**Target**: Enthusiast, developer, ricing community
**Fonts**: Fira Code (monospace everything)
**Style**: i3wm/sway tiling WM, retro terminal aesthetic

**Philosophy**: Memperkenalkan "geek world" kepada awam - membuktikan bahwa terminal, tiling WM, dan Linux aesthetic tidak menakutkan, justru powerful dan customizable. Seperti simulator mini v0.dev meets i3wm showcase.

**User Choice**: Toggle button untuk switch antara V1 ↔ V2, preferensi tersimpan di localStorage.

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

## ✅ Recommended Strategy: **Scoped Isolation with Toggle**

### Approach: Attribute-Based Scoping + User Preference

```
User Flow:
1. First visit → V1 (default)
2. Click toggle → Switch to V2
3. Preference saved → localStorage
4. Next visit → Load saved preference
```

### Technical Implementation

```
src/
├── layouts/
│   ├── Base.astro          → V1 (data-theme-mode="blog")
│   ├── I3Layout.astro      → V2 (data-theme-mode="terminal")
│   └── ...
├── styles/
│   ├── main.css            → V1 global styles
│   ├── terminal-theme.css  → V2 base (scoped)
│   ├── i3wm-theme.css      → V2 tiling (scoped)
│   └── animations.css      → Shared utilities
└── components/
    └── DesignSystemToggle.astro → Switch V1 ↔ V2
```

**Key Principle**: Each layout scoped by `data-theme-mode` attribute, user can toggle between them.

---

## 🔧 Implementation Plan

### Phase 1: Isolate V2 Styles (DONE ✅)

#### 1.1 Scope Terminal Theme

```css
/* terminal-theme.css - All content wrapped with scope */
[data-theme-mode="terminal"] {
  --font-mono: "Fira Code", monospace;
  --bg-primary: #1a1b26;
  /* ... all V2 variables */
}

[data-theme-mode="terminal"] body {
  font-family: var(--font-mono);
}
```

#### 1.2 I3Layout with Scoping (DONE ✅)

```astro
<html data-theme-mode="terminal" data-theme="tokyo-night"></html>
```

#### 1.3 Base Layout with Scoping (DONE ✅)

```astro
<html data-theme-mode="blog"></html>
```

---

### Phase 2: Add Toggle Button (TODO 🔲)

#### 2.1 Create DesignSystemToggle Component

```astro
---
// src/components/DesignSystemToggle.astro
---

<button id="design-toggle" aria-label="Toggle Design System">
  <span class="v1-icon">📝</span>
  <span class="v2-icon">💻</span>
</button>

<script>
  // Load preference from localStorage
  const saved = localStorage.getItem("design-mode") || "blog";

  // Apply on page load
  document.documentElement.setAttribute("data-theme-mode", saved);

  // Toggle handler
  document.getElementById("design-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme-mode");
    const next = current === "blog" ? "terminal" : "blog";

    document.documentElement.setAttribute("data-theme-mode", next);
    localStorage.setItem("design-mode", next);

    // Reload to apply layout changes
    window.location.reload();
  });
</script>
```

#### 2.2 Add Toggle to Both Layouts

```astro
// Base.astro & I3Layout.astro import DesignSystemToggle from
'@/components/DesignSystemToggle.astro';

<DesignSystemToggle />
```

---

### Phase 3: Font Strategy (DONE ✅)

**Separate Font Loading** (Current Implementation):

**Base.astro** (V1):

```astro
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
  rel="stylesheet"
/>
```

**I3Layout.astro** (V2):

```astro
<link
  href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Pros**:

- ✅ Clean separation
- ✅ No conflicts
- ✅ Each page loads only what it needs

---

### Phase 4: CSS Variable Namespacing (DONE ✅)

#### V1 Variables (main.css)

```css
:root {
  --blog-primary: #3b82f6;
  --blog-text: #1f2937;
  --blog-bg: #ffffff;
}
```

#### V2 Variables (terminal-theme.css)

```css
[data-theme-mode="terminal"] {
  --terminal-bg: #1a1b26;
  --terminal-text: #c0caf5;
  --terminal-accent: #7aa2f7;
}
```

---

## 🎨 User Experience Flow

### Scenario 1: First-Time Visitor

```
1. Lands on homepage
2. Sees V1 (blog theme) - default
3. Notices toggle button (📝 💻)
4. Clicks → Switches to V2 (terminal theme)
5. Preference saved → Next visit loads V2
```

### Scenario 2: Returning Visitor (Saved V2)

```
1. Lands on homepage
2. localStorage has 'terminal'
3. Loads V2 immediately
4. Can toggle back to V1 anytime
```

### Scenario 3: Page Navigation

```
1. User on blog page (V1)
2. Clicks terminal link
3. Switches to I3Layout (V2)
4. Preference persists across pages
```

---

## 🚀 Implementation Checklist

### Phase 1: Isolation (DONE ✅)

- [x] Add `data-theme-mode="terminal"` to I3Layout
- [x] Add `data-theme-mode="blog"` to Base.astro
- [x] Wrap V2 CSS with `[data-theme-mode="terminal"]`
- [x] Separate font loading

### Phase 2: Toggle ✅ COMPLETE

- [x] Create DesignSystemToggle component
- [x] Add localStorage persistence
- [x] Add toggle to both layouts
- [x] Style toggle button (both themes)
- [x] Context-aware navigation (same page, different mode)

### Phase 3: Testing ✅ COMPLETE

- [x] Test V1 → V2 switch
- [x] Test V2 → V1 switch
- [x] Test localStorage persistence
- [x] Test page reload
- [x] Test cross-navigation
- [x] Test mobile responsiveness

---

## 🧪 Testing Checklist

### V1 (Blog Theme)

- [x] Homepage uses Inter + Georgia
- [x] Blog posts readable
- [x] Code blocks use JetBrains Mono
- [x] No Fira Code loaded
- [x] No terminal styles applied

### V2 (Terminal Theme)

- [x] Terminal pages use Fira Code
- [x] i3wm layout works
- [x] Theme switching works (Tokyo Night, Dracula, etc)
- [x] No blog styles interfere
- [x] Keyboard shortcuts work

### Toggle Functionality ✅ COMPLETE

- [x] Toggle button visible on both themes
- [x] Click switches theme
- [x] Preference saved to localStorage
- [x] Page reload respects preference
- [x] Context-aware redirect (FOUC prevention)

---

## 📝 Next Steps

1. **Commit current state** (isolation done)
2. **Implement toggle button** (Phase 2)
3. **Test thoroughly** (Phase 3)
4. **Document usage** (README update)
5. **Push to production**

---

## 🎉 Expected Result

### Current State (Phase 1 Complete)

```
✅ Clean separation via data-theme-mode
✅ No style conflicts
✅ Fonts isolated
✅ Both themes work independently
```

### After Phase 2 (Toggle)

```
✅ User can switch V1 ↔ V2
✅ Preference persists
✅ Smooth UX
✅ Accessible to everyone
```

---

**Priority**:

1. HIGH - Commit current state ✅
2. HIGH - Implement toggle button 🔲
3. MEDIUM - Add smooth transitions 🔲
4. LOW - Add more V2 themes 🔲

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
  --font-mono: "Fira Code", monospace;
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
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
  rel="stylesheet"
/>
```

**I3Layout.astro** (V2):

```astro
<link
  href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
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

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Inter", sans-serif;
}

code {
  font-family: "JetBrains Mono", monospace;
}

/* terminal-theme.css (V2) */
[data-theme-mode="terminal"] body,
[data-theme-mode="terminal"] * {
  font-family: "Fira Code", monospace !important;
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
document.addEventListener("astro:page-load", () => {
  const mode = document.documentElement.dataset.themeMode;

  if (mode === "terminal") {
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

````

### Step 2: Update Imports (15 min)
```astro
// Base.astro
import "@/styles/v1/main.css";

// I3Layout.astro
import "@/styles/v2/terminal-base.css";
import "@/styles/v2/i3wm.css";
import "@/styles/shared/animations.css";
````

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
<html data-theme-mode="terminal" data-theme="tokyo-night"></html>
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

| Strategy                | Pros                | Cons            | Time  | Recommended |
| ----------------------- | ------------------- | --------------- | ----- | ----------- |
| **Scoped Isolation**    | Clean, no conflicts | Need scoping    | 30min | ✅ YES      |
| **Separate Files**      | Very clean          | More files      | 1.5hr | ⭐ BEST     |
| **Namespace Variables** | Flexible            | Complex         | 1hr   | 🟡 OK       |
| **Separate Fonts**      | No conflicts        | Duplicate loads | 15min | ✅ YES      |
| **Unified Fonts**       | Cached              | Larger bundle   | 20min | 🟡 OK       |

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

- [x] Homepage uses Inter + Georgia
- [x] Blog posts readable
- [x] Code blocks use JetBrains Mono
- [x] No Fira Code loaded
- [x] No terminal styles applied

### V2 (Terminal Theme)

- [x] Terminal pages use Fira Code
- [x] i3wm layout works
- [x] Theme switching works
- [x] No blog styles interfere
- [x] Keyboard shortcuts work

### Cross-Navigation

- [x] Blog → Terminal (styles switch)
- [x] Terminal → Blog (styles switch)
- [x] No flash of unstyled content
- [x] Fonts load correctly

---

## 📝 Migration Checklist

- [x] Add `data-theme-mode` to layouts
- [x] Scope V2 CSS with `[data-theme-mode="terminal"]`
- [x] Separate font loading
- [x] Update imports
- [x] Test all pages
- [x] Verify no conflicts
- [x] Update documentation

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
