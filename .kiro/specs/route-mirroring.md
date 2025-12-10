# Spec: Route Mirroring

## Status: ✅ Complete

## Goal
Mirror semua blog routes ke `/workspace/*` dengan layout Dev Mode (I3Layout).

## Routes Mirrored

| Blog Mode | Dev Mode | Status |
|-----------|----------|--------|
| `/` | `/workspace/` | [x] Done |
| `/blog/[slug]` | `/workspace/blog/[slug]` | [x] Done |
| `/about` | `/workspace/about` | [x] Done |
| `/contact` | `/workspace/contact` | [x] Done |
| `/now` | `/workspace/now` | [x] Done |
| `/elements` | `/workspace/elements` | [x] Done |
| `/privacy-policy` | `/workspace/privacy-policy` | [x] Done |

## Exclusive Dev Mode Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/workspace/terminal` | i3wm playground | [x] Via existing /terminal |
| `/workspace/ricing` | Theme showcase | [ ] Future |

## Implementation

### Files Created
- `src/pages/workspace/index.astro` - Dev Mode homepage
- `src/pages/workspace/[...slug].astro` - Catch-all mirror route

## Checklist

- [x] Create `src/pages/workspace/` directory
- [x] Create `index.astro` (Dev homepage)
- [x] Create `[...slug].astro` (catch-all mirror)
- [x] Add canonical tags
- [x] Test all mirrored routes (build successful)
- [x] Update toggle button to context-aware
- [x] Update FOUC prevention scripts
