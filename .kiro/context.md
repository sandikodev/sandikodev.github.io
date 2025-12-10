# Context Recovery

> TL;DR untuk memahami project ini dengan cepat.

## Project

**sandikodev.github.io** - Portfolio blog dengan dual design system.

## Dual Design System

| Mode | Route | Layout | Description |
|------|-------|--------|-------------|
| Blog Mode (📝) | `/` | Base.astro | Clean blog, default |
| Dev Mode (💻) | `/workspace/*` | I3Layout.astro | Terminal/i3wm aesthetic |

## Current Sprint

**Route Mirroring** - Mirror semua blog routes ke `/workspace/*`

### Priority Tasks
1. Create `/workspace/[...slug].astro`
2. Update toggle button (context-aware)
3. Add canonical tags
4. Test & verify

## Key Files

| File | Purpose |
|------|---------|
| `src/layouts/Base.astro` | Blog Mode layout |
| `src/layouts/I3Layout.astro` | Dev Mode layout |
| `src/components/DesignSystemToggle.astro` | Mode switcher |
| `src/pages/workspace/` | Dev Mode routes (to be created) |

## Steering Documents

| Priority | File | Content |
|----------|------|---------|
| 1 | `.kiro/specs/route-mirroring.md` | Current feature spec |
| 2 | `.kiro/steering/architecture.md` | Technical decisions |
| 3 | `.kiro/steering/product.md` | Vision & goals |
| 4 | `.kiro/steering/design-system.md` | UI/UX specs |

## Working Notes

| File | Purpose |
|------|---------|
| `.notes/TODOS.md` | Current sprint tasks |
| `.notes/WORKFLOW.md` | Iteration procedure |

## Commands

```bash
# Dev server
pnpm dev

# Build
pnpm build

# Find TODOs
grep -rE "\[ \]" *.md
```

## Quick Links

- Live: https://sandikodev.github.io
- Repo: https://github.com/sandikodev/sandikodev.github.io
