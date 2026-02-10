# Terminal Components

i3wm / Tiling Window Manager themed components for the blog.

## Components

### Core Layout

- **`Polybar.astro`** - Top status bar (i3wm style)
- **`I3Window.astro`** - Tiling window container
- **`Dmenu.astro`** - Application launcher

### Navigation

- **`KeyboardHandler.astro`** - Global keyboard shortcuts
- **`HelpModal.astro`** - Keyboard shortcuts reference
- **`ThemeSwitcher.astro`** - Theme picker UI

### Content

- **`Prompt.astro`** - Terminal prompt (user@host:~$)
- **`AsciiHero.astro`** - ASCII art hero section
- **`BlogCard.astro`** - Blog post card
- **`StatusBar.astro`** - Bottom status bar (vim style)
- **`TabBar.astro`** - Tab navigation (tmux style)

### Utilities

- **`TerminalWindow.astro`** - Simple terminal window
- **`CommandPalette.astro`** - Command search (Ctrl+K)
- **`KeyboardHelp.astro`** - Keyboard help overlay

## Usage

### Basic Layout

```astro
---
import I3Layout from "@/layouts/I3Layout.astro";
import I3Window from "@/components/terminal/I3Window.astro";
---

<I3Layout title="My Page">
  <div class="i3-split-h">
    <I3Window title="Terminal" focused={true}>
      <p>Content here</p>
    </I3Window>
  </div>
</I3Layout>
```

### With Keyboard Navigation

```astro
---
import KeyboardHandler from "@/components/terminal/KeyboardHandler.astro";
import HelpModal from "@/components/terminal/HelpModal.astro";
---

<KeyboardHandler />
<HelpModal />
```

### With Theme Switcher

```astro
---
import ThemeSwitcher from "@/components/terminal/ThemeSwitcher.astro";
---

<ThemeSwitcher />
```

## Keyboard Shortcuts

| Key   | Action       |
| ----- | ------------ |
| `j`   | Scroll down  |
| `k`   | Scroll up    |
| `g g` | Go to top    |
| `G`   | Go to bottom |
| `t`   | Cycle themes |
| `?`   | Show help    |

## Themes

1. Tokyo Night (default)
2. Dracula
3. Gruvbox
4. Nord
5. Matrix

## Styling

All components use CSS variables from:

- `src/styles/terminal-theme.css`
- `src/styles/i3wm-theme.css`
- `src/styles/animations.css`

## Examples

See:

- `/terminal` - Terminal demo
- `/blog-tiling` - Blog with tiling layout
