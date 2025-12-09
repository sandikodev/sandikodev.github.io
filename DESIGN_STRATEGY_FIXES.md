# DESIGN_STRATEGY.md - Kesalahan & Perbaikan

## ❌ Kesalahan yang Ditemukan

### 1. **CSS @import dalam Selector** (CRITICAL)

#### Kesalahan:
```css
/* ❌ SALAH - Tidak valid! */
[data-theme-mode="terminal"] {
  @import './terminal-theme.css';
}
```

#### Kenapa Salah:
- `@import` harus di top-level CSS file
- Tidak bisa di dalam selector
- Tidak bisa di dalam media query
- Browser akan ignore statement ini

#### Perbaikan:
```css
/* ✅ BENAR - Wrap semua konten dengan selector */
[data-theme-mode="terminal"] {
  --font-mono: 'Fira Code', monospace;
  --bg-primary: #1a1b26;
  /* ... semua variables */
}

[data-theme-mode="terminal"] body {
  font-family: var(--font-mono);
}

[data-theme-mode="terminal"] .i3-window {
  /* styles */
}
```

---

### 2. **File yang Tidak Ada** (MINOR)

#### Kesalahan:
```bash
# ❌ File ini tidak ada
mv src/styles/design-system.css src/styles/v1/
```

#### Kenapa Salah:
- File `design-system.css` tidak ada di project
- Command akan error: "No such file or directory"

#### Perbaikan:
```bash
# ✅ Skip file yang tidak ada
# Note: design-system.css doesn't exist, skip it
```

---

## ✅ Status Perbaikan

- [x] Fixed CSS @import issue
- [x] Fixed missing file reference
- [x] Updated DESIGN_STRATEGY.md
- [x] Documented fixes

---

## 📝 Catatan Penting

### Cara Benar Scope CSS:

#### ❌ JANGAN:
```css
/* Ini tidak akan work */
[data-theme-mode="terminal"] {
  @import 'file.css';
}
```

#### ✅ LAKUKAN:
```css
/* Option 1: Wrap manual */
[data-theme-mode="terminal"] {
  --var: value;
}

[data-theme-mode="terminal"] .class {
  property: value;
}

/* Option 2: Nested CSS (jika support) */
[data-theme-mode="terminal"] {
  & {
    --var: value;
  }
  
  & .class {
    property: value;
  }
}

/* Option 3: Separate file + specificity */
/* In I3Layout.astro */
<style is:global>
  [data-theme-mode="terminal"] * {
    font-family: 'Fira Code' !important;
  }
</style>
```

---

## 🎯 Rekomendasi

### Yang Sudah Benar (Tidak Perlu Diubah):
1. ✅ Konsep scoping dengan `data-theme-mode`
2. ✅ Separate font loading per layout
3. ✅ Strategy overview
4. ✅ Implementation steps (setelah diperbaiki)

### Yang Perlu Diperhatikan:
1. ⚠️ Jangan gunakan `@import` dalam selector
2. ⚠️ Verify file existence sebelum mv command
3. ⚠️ Test CSS scoping di browser

---

## 🚀 Implementasi yang Benar

### Quick Win (15 min) - RECOMMENDED:

#### Step 1: Add Mode Attribute
```astro
<!-- Base.astro -->
<html data-theme-mode="blog">

<!-- I3Layout.astro -->
<html data-theme-mode="terminal">
```

#### Step 2: Add Font Scoping
```astro
<!-- I3Layout.astro -->
<style is:global>
  [data-theme-mode="terminal"] body,
  [data-theme-mode="terminal"] * {
    font-family: 'Fira Code', monospace !important;
  }
</style>
```

#### Step 3: Test
```bash
npm run dev
# Test blog pages
# Test terminal pages
```

**Status**: ✅ Already implemented!

---

## 📊 Impact Analysis

### Kesalahan 1 (CSS @import):
- **Severity**: HIGH
- **Impact**: Scoping tidak akan work
- **Fixed**: YES
- **Action**: Gunakan manual wrapping

### Kesalahan 2 (Missing file):
- **Severity**: LOW
- **Impact**: Command error (minor)
- **Fixed**: YES
- **Action**: Skip non-existent files

---

## ✅ Conclusion

DESIGN_STRATEGY.md sekarang sudah diperbaiki:
- ✅ No more invalid CSS
- ✅ No more missing file references
- ✅ Clear implementation steps
- ✅ Working solution documented

**Status**: FIXED ✅
