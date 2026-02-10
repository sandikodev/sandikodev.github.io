# Page Layout Diagrams: Design System V1 vs V2

## 🎨 Design System V1 (Blog Mode) - Page Layouts

### Homepage Layout (`src/pages/index.astro`)

```
┌─────────────────────────────────────────────────────────────┐
│                      Header.astro                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Logo | Navigation | Search | Dark Mode Toggle          ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Hero Section                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Profile Image | Name | Title | Description             ││
│  │ Social Links | CTA Buttons                             ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  Recent Posts Section                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [Post Card] [Post Card] [Post Card]                    ││
│  │ [Post Card] [Post Card] [Post Card]                    ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Footer.astro                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Links | Social | Copyright | Newsletter                ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Fixed Position Components:
• DesignSystemToggle (bottom-right)
• BackToTop (bottom-right, stacked)
• CommandPalette (overlay)
• FontSizeToggle (top-right)
• KeyboardShortcuts (overlay)
```

### Blog Post Layout (`src/layouts/PostSingle.astro`)

```
┌─────────────────────────────────────────────────────────────┐
│                      Header.astro                           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Article Header                           │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Breadcrumb.astro                                        ││
│  │ Title | Date | Author | ReadingTime.astro              ││
│  │ SocialShare.astro                                       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  Article Content                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ TableOfContents.astro (floating)                        ││
│  │ Post Content (MDX)                                      ││
│  │ • TextHighlighter.astro (inline)                       ││
│  │ • CodeBlock.astro (syntax highlighting)                ││
│  │ • BookmarkArticle.astro (floating)                     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Article Footer                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ PrevNext.astro                                          ││
│  │ RelatedPostsEnhanced.astro                              ││
│  │ Comments.astro (Giscus)                                 ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Footer.astro                           │
└─────────────────────────────────────────────────────────────┘

Fixed Position Components:
• ReadingProgressBar.astro (top)
• ReadingProgress.astro (side indicator)
• DesignSystemToggle (bottom-right)
• BackToTop (bottom-right, stacked)
```

### Blog List Layout (`src/layouts/Posts.astro`)

```
┌─────────────────────────────────────────────────────────────┐
│                      Header.astro                           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Blog Header                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ Title | Description | Search Bar                       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Posts Grid                                │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [Post Card] [Post Card] [Post Card]                    ││
│  │ [Post Card] [Post Card] [Post Card]                    ││
│  │ [Post Card] [Post Card] [Post Card]                    ││
│  │                                                         ││
│  │ Pagination.astro                                        ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      Footer.astro                           │
└─────────────────────────────────────────────────────────────┘
```

## 🖥️ Design System V2 (Terminal Mode) - Page Layouts

### Terminal Homepage Layout (`src/pages/workspace/index.astro`)

```
┌─────────────────────────────────────────────────────────────┐
│                    Polybar.astro                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [1:home] [2:blog] [3:about] | CPU RAM | Time | Theme   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  i3-container                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                I3Window.astro                           ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ [×] [□] [−] terminal@sandikodev:~                   │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ $ whoami                                            │││
│  │  │ sandikodev                                          │││
│  │  │ $ cat ~/.profile                                    │││
│  │  │ Full-Stack Developer                                │││
│  │  │ Passionate about clean code & UX                    │││
│  │  │                                                     │││
│  │  │ $ ls ~/projects                                     │││
│  │  │ [portfolio] [blog] [workspace-framework]            │││
│  │  │                                                     │││
│  │  │ $ █                                                 │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Fixed Position Components:
• DesignSystemToggle (bottom-right)
• BackToTop (bottom-right, stacked)
• CommandPaletteEnhanced (overlay)
• CursorEffects (follows mouse)
• TerminalEffects (scanlines, matrix rain)
• WorkspaceSwitcher (keyboard overlay)
```

### Terminal Blog Layout (`src/pages/blog-tiling.astro`)

```
┌─────────────────────────────────────────────────────────────┐
│                    Polybar.astro                            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ [1:home] [2:blog*] [3:about] | CPU RAM | Time | 🎨     ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                i3-split-h (3-column)                        │
│  ┌─────────┬──────────────────────┬─────────────────────────┐│
│  │ Sidebar │    Main Content      │      Right Sidebar     ││
│  │ (20%)   │       (55%)          │         (25%)           ││
│  │         │                      │                         ││
│  │ I3Window│     I3Window         │       I3Window          ││
│  │ ┌─────┐ │ ┌──────────────────┐ │ ┌─────────────────────┐ ││
│  │ │Cat. │ │ │ ranger ~/posts   │ │ │ cat ~/.blog_stats   │ ││
│  │ │├──📁│ │ │ ┌──────────────┐ │ │ │ ┌─────────────────┐ │ ││
│  │ │├──📁│ │ │ │📄 Post Title │ │ │ │ │ 📝 42 Posts     │ │ ││
│  │ │└──📁│ │ │ │📅 Dec 13     │ │ │ │ │ 📁 8 Categories │ │ ││
│  │ │     │ │ │ │#tag #dev      │ │ │ │ │ 🏷️ 24 Tags     │ │ ││
│  │ │Tags │ │ │ │→             │ │ │ │ │ 👁️ 1.2k Views  │ │ ││
│  │ │#dev │ │ │ └──────────────┘ │ │ │ └─────────────────┘ │ ││
│  │ │#js  │ │ │ VirtualScroll    │ │ │                     │ ││
│  │ │#css │ │ │ (120px items)    │ │ │ I3Window            │ ││
│  │ └─────┘ │ └──────────────────┘ │ │ ┌─────────────────┐ │ ││
│  │         │                      │ │ │ tail ~/.activity│ │ ││
│  └─────────┴──────────────────────┴─┴─┴─────────────────────┘│
└─────────────────────────────────────────────────────────────┘

Fixed Position Components:
• Scratchpad.astro (floating terminal, Ctrl+`)
• HelpModal.astro (keyboard shortcuts, ?)
• KeyboardHandler.astro (j/k scroll, t theme)
```

### Terminal Post Layout (`src/pages/workspace/blog/[slug].astro`)

````
┌─────────────────────────────────────────────────────────────┐
│                    Polybar.astro                            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                  i3-container                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                I3Window.astro                           ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │ [×] [□] [−] vim ~/blog/post-title.md               │││
│  │  ├─────────────────────────────────────────────────────┤││
│  │  │ # Post Title                                        │││
│  │  │                                                     │││
│  │  │ Post content in terminal-style rendering...         │││
│  │  │                                                     │││
│  │  │ ```javascript                                       │││
│  │  │ const code = 'highlighted';                         │││
│  │  │ ```                                                 │││
│  │  │                                                     │││
│  │  │ More content...                                     │││
│  │  │                                                     │││
│  │  │ :wq                                                 │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
````

## 🔄 Component Flow Analysis

### V1 (Blog Mode) Component Hierarchy

```
Base.astro
├── Header.astro
│   ├── Logo
│   ├── Navigation
│   ├── Search
│   └── DarkModeToggle
├── <slot> (Page Content)
│   ├── PostSingle.astro
│   │   ├── Breadcrumb.astro
│   │   ├── ReadingTime.astro
│   │   ├── SocialShare.astro
│   │   ├── TableOfContents.astro
│   │   ├── TextHighlighter.astro
│   │   ├── BookmarkArticle.astro
│   │   ├── PrevNext.astro
│   │   ├── RelatedPostsEnhanced.astro
│   │   └── Comments.astro
│   └── Posts.astro
│       ├── SearchBar
│       ├── PostCards[]
│       └── Pagination.astro
├── Footer.astro
└── Global Components
    ├── DesignSystemToggle.astro
    ├── BackToTop.astro
    ├── CommandPalette.astro
    ├── FontSizeToggle.astro
    ├── KeyboardShortcuts.astro
    ├── LoadingStates.astro
    └── PerformanceOptimizer.astro
```

### V2 (Terminal Mode) Component Hierarchy

```
I3Layout.astro
├── Polybar.astro
│   ├── Workspaces[]
│   ├── SystemInfo
│   ├── Clock
│   └── ThemeSwitcher.astro
├── <slot> (i3-container)
│   ├── I3Window.astro[]
│   │   ├── WindowHeader
│   │   └── WindowContent
│   ├── blog-tiling.astro
│   │   ├── VirtualScroll.astro
│   │   ├── Scratchpad.astro
│   │   └── HelpModal.astro
│   └── Terminal Pages
└── Global Components
    ├── DesignSystemToggle.astro
    ├── BackToTop.astro
    ├── CommandPaletteEnhanced.astro
    ├── CursorEffects.astro
    ├── TerminalEffects.astro
    ├── SoundEffects.astro
    ├── GlitchEffect.astro
    ├── EasterEggs.astro
    ├── WorkspaceSwitcher.astro
    └── PerformanceOptimizer.astro
```

## 📊 Layout Complexity Comparison

| Aspect                  | V1 (Blog Mode)    | V2 (Terminal Mode)       |
| ----------------------- | ----------------- | ------------------------ |
| **Layout Paradigm**     | Traditional Web   | i3wm Tiling              |
| **Navigation**          | Header + Footer   | Polybar + Workspaces     |
| **Content Structure**   | Semantic HTML     | Terminal Windows         |
| **Responsive Strategy** | CSS Grid/Flexbox  | Custom Tiling Logic      |
| **Component Count**     | 15+ per page      | 8-12 per page            |
| **CSS Complexity**      | High (responsive) | Medium (fixed layout)    |
| **JavaScript Logic**    | Medium            | High (interactions)      |
| **Accessibility**       | Full WCAG         | Basic (terminal-focused) |

## 🎯 Key Findings

### Strengths of Current Architecture

1. **Clear Separation**: No layout component mixing between systems
2. **Focused Experience**: Each system optimized for its use case
3. **Maintainable**: Components grouped by design system
4. **Performance**: Minimal cross-system dependencies

### Areas for Optimization

1. **SEO Parity**: Terminal mode needs better meta tags
2. **Shared Utilities**: Common functions could be abstracted
3. **Component Documentation**: Better prop interfaces
4. **Testing Coverage**: Both systems need comprehensive tests

### Recommended Next Steps

1. Create shared SEO component for I3Layout
2. Abstract common keyboard handling logic
3. Implement comprehensive TypeScript interfaces
4. Add visual regression testing for both systems
