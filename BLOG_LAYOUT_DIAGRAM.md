# Blog Page Layout - http://127.0.0.1:4321/blog

## 🎨 **Visual Layout Structure**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ [Logo] Navigation Menu                    [Search] [Dark Mode] [V1/V2]  ││
│  │ Home | Blog | About | Contact                                           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                            BLOG HEADER                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ # Blog                                                                  ││
│  │ Latest articles and insights                                            ││
│  │ [Search Bar: "Search articles..."]                                     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           POSTS GRID                                        │
│  ┌─────────────────┬─────────────────┬─────────────────────────────────────┐│
│  │ POST CARD 1     │ POST CARD 2     │ POST CARD 3                         ││
│  │ ┌─────────────┐ │ ┌─────────────┐ │ ┌─────────────────────────────────┐ ││
│  │ │   [IMAGE]   │ │ │   [IMAGE]   │ │ │           [IMAGE]               │ ││
│  │ │             │ │ │             │ │ │                                 │ ││
│  │ └─────────────┘ │ └─────────────┘ │ └─────────────────────────────────┘ ││
│  │ Dec 13 • 5 min  │ Dec 12 • 3 min  │ Dec 11 • 7 min read               ││
│  │ Article Title   │ Another Post    │ Long Article Title Here           ││
│  │ Brief excerpt   │ Short desc...   │ Article description and excerpt   ││
│  │ #react #js      │ #css #design    │ #astro #performance               ││
│  └─────────────────┴─────────────────┴─────────────────────────────────────┘│
│                                                                             │
│  ┌─────────────────┬─────────────────┬─────────────────────────────────────┐│
│  │ POST CARD 4     │ POST CARD 5     │ POST CARD 6                         ││
│  │ [Similar layout as above...]                                            ││
│  └─────────────────┴─────────────────┴─────────────────────────────────────┘│
│                                                                             │
│                        [PAGINATION]                                         │
│                     ← Previous | 1 2 3 | Next →                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              FOOTER                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Links | Social Media | Newsletter | Copyright                           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘

                              FIXED ELEMENTS
                    ┌─────────────────────────────────┐
                    │ [Ctrl+K] CommandPalette         │
                    │ [V1/V2] DesignSystemToggle      │
                    │ [↑] BackToTop (if page is long) │
                    │ [⌨️] KeyboardShortcuts          │
                    └─────────────────────────────────┘
```

## 📱 **Responsive Breakpoints**

### Desktop (>900px) - 3 Columns

```
┌─────────────┬─────────────┬─────────────┐
│ POST CARD 1 │ POST CARD 2 │ POST CARD 3 │
├─────────────┼─────────────┼─────────────┤
│ POST CARD 4 │ POST CARD 5 │ POST CARD 6 │
└─────────────┴─────────────┴─────────────┘
```

### Tablet (640px-900px) - 2 Columns

```
┌─────────────┬─────────────┐
│ POST CARD 1 │ POST CARD 2 │
├─────────────┼─────────────┤
│ POST CARD 3 │ POST CARD 4 │
└─────────────┴─────────────┘
```

### Mobile (<640px) - 1 Column

```
┌─────────────────────────┐
│      POST CARD 1        │
├─────────────────────────┤
│      POST CARD 2        │
├─────────────────────────┤
│      POST CARD 3        │
└─────────────────────────┘
```

## 🎯 **Component Breakdown**

### Layout Structure (Posts.astro)

```astro
Base.astro
├── Header.astro
├── <main>
│   ├── Blog Header Section
│   ├── Posts Grid
│   │   └── PostCard.astro (×N posts)
│   └── Pagination.astro
├── Footer.astro
└── Fixed Components
    ├── CommandPalette.astro
    ├── DesignSystemToggle.astro
    ├── BackToTop.astro (conditional)
    └── KeyboardShortcuts.astro
```

### PostCard Component Details

```
┌─────────────────────────────────┐
│ PostCard (variant="grid")       │
│ ┌─────────────────────────────┐ │
│ │        Featured Image       │ │ ← 400×225px
│ │      (if available)         │ │
│ └─────────────────────────────┘ │
│ Dec 13, 2024 • 5 min read      │ ← Post meta
│ Article Title Here              │ ← h3.post-title
│ Brief article description and   │ ← p.post-excerpt
│ excerpt text here...            │
│ #react #javascript #webdev      │ ← Tags (max 3)
└─────────────────────────────────┘
```

## ⌨️ **Keyboard Shortcuts Available**

| Key      | Action                  |
| -------- | ----------------------- |
| `Ctrl+K` | Open command palette    |
| `j`      | Scroll down             |
| `k`      | Scroll up               |
| `gg`     | Go to top               |
| `G`      | Go to bottom            |
| `?`      | Show keyboard shortcuts |
| `/`      | Focus search            |

## 🎨 **Design System V1 Styling**

### Typography

- **Headings**: Inter font family
- **Body**: Georgia serif
- **Meta text**: Inter, smaller size

### Colors

- **Light mode**: Clean whites and grays
- **Dark mode**: Dark backgrounds with light text
- **Accent**: Blue (#3b82f6) for links and buttons

### Spacing

- **Grid gap**: 2.5rem (desktop), 2rem (tablet)
- **Card padding**: 1.5rem internal
- **Section margins**: Consistent vertical rhythm

## 🔄 **Interactive Elements**

### Hover Effects

- **Post cards**: Subtle lift + shadow
- **Images**: Slight scale (1.03x)
- **Links**: Color transitions

### Loading States

- **Skeleton loaders** for post cards
- **Smooth transitions** between states
- **Progressive enhancement**

## 📊 **Performance Features**

### Optimizations Applied

- **PostCard component** - Unified, reusable
- **Image optimization** - Astro Image component
- **Lazy loading** - Images load as needed
- **Conditional components** - BackToTop only when needed
- **Smart keyboard shortcuts** - Context-aware

This layout provides a clean, performant, and accessible blog listing experience! 🎉
