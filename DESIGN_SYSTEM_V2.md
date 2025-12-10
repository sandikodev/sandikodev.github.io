# Design System V2: "dev@enigma"
## i3wm / Sway Tiling Window Manager Theme

---

## 🎯 Design Philosophy

**"The terminal is not just a tool, it's a lifestyle."**

### Why This Design System Exists

Memperkenalkan dunia geek (Linux, terminal, tiling WM) kepada awam dengan cara yang approachable dan menyenangkan. Mensimulasikan antarmuka sistem operasi minimal yang customizable - seperti miniatur v0.dev meets i3wm showcase.

**Goal**: Membuktikan bahwa "geek world" tidak menakutkan - justru powerful, estetis, dan accessible untuk siapa saja. Memberikan playground untuk ricing tanpa perlu install Linux.

Design ini terinspirasi dari:
- **i3wm / Sway** - Tiling window manager layout
- **Polybar / Waybar** - Status bar
- **dmenu / rofi** - Application launcher
- **NeoVim** - Text editor aesthetics
- **Alacritty / Kitty** - Terminal emulator

### Core Principles
1. **Tiling Layout** - Windows auto-arrange dalam grid
2. **Keyboard-First** - Semua bisa diakses via keyboard
3. **Minimal Chrome** - Focus pada content
4. **Workspace-Based** - Navigation via workspaces
5. **Monospace Everything** - Fira Code dengan ligatures

---

## 🖥️ Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ [1:home] [2:blog] [3:about] [4:term]  │  dev@enigma  │  12:34  │ <- Polybar
├─────────────────────────────────────────────────────────────────┤
│ run: _                    │ home │ blog │ about │ terminal │    │ <- dmenu (mod+d)
├─────────────────────────────────────────────────────────────────┤
│                           │                                     │
│  ┌─ dev@enigma:~ ───────┐ │ ┌─ find ~/blog ──────────────────┐ │
│  │                      │ │ │                                │ │
│  │  $ neofetch          │ │ │  -rw-r--r-- 2024-12-09 post.md │ │
│  │                      │ │ │  -rw-r--r-- 2024-12-08 post.md │ │
│  │  DEV                 │ │ │                                │ │
│  │  ───────────         │ │ └────────────────────────────────┘ │
│  │  OS: Arch Linux      │ │                                     │
│  │  Shell: zsh          │ │ ┌─ cat ~/.links ─────────────────┐ │
│  │  Editor: NeoVim      │ │ │                                │ │
│  │                      │ │ │  󰊤 github.com/sandikodev       │ │
│  │  $ _                 │ │ │  󰌻 linkedin.com/in/sandikodev  │ │
│  │                      │ │ │  󰇮 sandikodev@gmail.com        │ │
│  └──────────────────────┘ │ │                                │ │
│                           │ └────────────────────────────────┘ │
│                           │                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Components

### 1. Polybar (Top Bar)
- Workspaces (1:home, 2:blog, etc)
- Center: hostname
- Right: time, date

### 2. dmenu (Launcher)
- Triggered by `Mod+d` (Alt+d or Ctrl+d)
- Filter items by typing
- Tab/Arrow to navigate
- Enter to select

### 3. I3Window (Tiling Window)
- Title bar dengan window title
- Float/Tile toggle button
- Close button
- Content area

### 4. Tiling Layouts
- `i3-split-h` - Horizontal split
- `i3-split-v` - Vertical split
- Nested splits untuk complex layouts

---

## ⌨️ Keybindings

| Key | Action |
|-----|--------|
| `Mod+d` | Open dmenu |
| `j/k` | Scroll down/up |
| `gg` | Go to top |
| `G` | Go to bottom |
| `t` | Cycle theme |
| `?` | Show help |

---

## 🎨 Color Themes

### Tokyo Night (Default)
```css
--i3-bg: #1a1b26;
--i3-border-focused: #7aa2f7;
--i3-border-unfocused: #3b4261;
--bar-accent: #7aa2f7;
```

### Also Available
- Dracula
- Gruvbox
- Nord
- Matrix

---

## 🎨 Color Palette

### Base Colors (Inspired by popular terminal themes)

```css
/* Tokyo Night Storm */
--bg-primary: #1a1b26;      /* Deep blue-black */
--bg-secondary: #24283b;    /* Slightly lighter */
--bg-tertiary: #414868;     /* Selection/hover */

/* Text */
--text-primary: #c0caf5;    /* Soft blue-white */
--text-secondary: #9aa5ce;  /* Muted */
--text-muted: #565f89;      /* Comments */

/* Accent Colors (Terminal ANSI) */
--red: #f7768e;             /* Errors, important */
--green: #9ece6a;           /* Success, strings */
--yellow: #e0af68;          /* Warnings, types */
--blue: #7aa2f7;            /* Functions, links */
--magenta: #bb9af7;         /* Keywords */
--cyan: #7dcfff;            /* Classes, special */
--orange: #ff9e64;          /* Numbers, constants */

/* Special */
--cursor: #c0caf5;          /* Blinking cursor */
--selection: #33467c;       /* Text selection */
--border: #3b4261;          /* Subtle borders */
--glow: rgba(122, 162, 247, 0.3); /* Neon glow effect */
```

### Alternative Themes (Switchable)

```css
/* Dracula */
--bg-primary: #282a36;
--text-primary: #f8f8f2;
--accent: #bd93f9;

/* Gruvbox Dark */
--bg-primary: #282828;
--text-primary: #ebdbb2;
--accent: #fe8019;

/* Nord */
--bg-primary: #2e3440;
--text-primary: #eceff4;
--accent: #88c0d0;

/* Catppuccin Mocha */
--bg-primary: #1e1e2e;
--text-primary: #cdd6f4;
--accent: #cba6f7;

/* Matrix Green */
--bg-primary: #0d0d0d;
--text-primary: #00ff00;
--accent: #00ff00;
```

---

## 📝 Typography

### Font Stack

```css
/* Primary - Everything Monospace */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;

/* With Ligatures */
font-feature-settings: "liga" 1, "calt" 1;

/* Font Sizes - Terminal Scale */
--text-xs: 0.75rem;    /* 12px - metadata */
--text-sm: 0.875rem;   /* 14px - secondary */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - emphasis */
--text-xl: 1.25rem;    /* 20px - h3 */
--text-2xl: 1.5rem;    /* 24px - h2 */
--text-3xl: 2rem;      /* 32px - h1 */
--text-4xl: 2.5rem;    /* 40px - hero */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
--leading-code: 1.6;
```

### Text Styles

```css
/* Heading - Like vim section headers */
h1::before { content: "# "; color: var(--magenta); }
h2::before { content: "## "; color: var(--blue); }
h3::before { content: "### "; color: var(--cyan); }

/* Code Comments Style */
.muted::before { content: "// "; }

/* Terminal Prompt Style */
.prompt::before { 
  content: "❯ "; 
  color: var(--green); 
}
```

---

## 🖥️ Layout System

### Terminal Window Structure

```
┌─────────────────────────────────────────────────────────────┐
│ ● ○ ○  dev@enigma:~/blog                              ─ □ × │  <- Title Bar
├─────────────────────────────────────────────────────────────┤
│ [1] home  [2] blog  [3] projects  [4] about    :help ?      │  <- Tab Bar (tmux style)
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ~/blog/posts ❯ cat welcome.md                              │  <- Breadcrumb as command
│                                                             │
│  # Welcome to dev@enigma                                    │
│                                                             │
│  > "Code is poetry written in logic"                        │
│                                                             │
│  ## Recent Posts                                            │
│  ├── 2024-12-09 Building a Terminal Blog                    │
│  ├── 2024-12-08 NeoVim Setup Guide                          │
│  └── 2024-12-07 SSH Tunneling Deep Dive                     │
│                                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ NORMAL │ blog/welcome.md │ utf-8 │ 42L, 1337C │ 69% │ 12:34 │  <- Status Bar (vim style)
└─────────────────────────────────────────────────────────────┘
```

### Grid System

```css
/* Terminal-based grid (80 columns reference) */
--col-1: 8.33%;
--col-2: 16.66%;
--col-3: 25%;
--col-4: 33.33%;
--col-6: 50%;
--col-8: 66.66%;
--col-12: 100%;

/* Max widths */
--max-content: 80ch;      /* 80 character width */
--max-wide: 120ch;        /* Wide content */
--max-full: 100%;         /* Full width */
```

---

## 🧩 Components

### 1. Terminal Window (Card)

```
┌──────────────────────────────────────┐
│ ● ○ ○  ~/projects/awesome-app        │
├──────────────────────────────────────┤
│                                      │
│  Content goes here                   │
│                                      │
└──────────────────────────────────────┘
```

### 2. Command Palette (Search)

```
┌─────────────────────────────────────────────┐
│ >_                                          │
├─────────────────────────────────────────────┤
│   📄 Recent Files                           │
│   ├── welcome.md                            │
│   ├── neovim-setup.md                       │
│   └── ssh-tunneling.md                      │
│                                             │
│   🔍 Search Results                         │
│   ├── [post] Building Terminal Blog         │
│   ├── [tag] terminal                        │
│   └── [page] About                          │
└─────────────────────────────────────────────┘
```

### 3. Navigation (Tmux Tabs)

```
┌─────────────────────────────────────────────────────────────┐
│ [1] home* [2] blog  [3] projects  [4] about  │ :q to quit   │
└─────────────────────────────────────────────────────────────┘
```

### 4. Blog Post Card

```
┌──────────────────────────────────────────────────────────────┐
│ 📄 building-terminal-blog.md                    2024-12-09   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ # Building a Terminal-Themed Blog                            │
│                                                              │
│ > How I created a blog that looks like a terminal            │
│                                                              │
│ ─────────────────────────────────────────────────────────    │
│ 🏷️ #terminal #astro #design    ⏱️ 5 min read    👁️ 1.2k     │
└──────────────────────────────────────────────────────────────┘
```

### 5. Code Block (Enhanced)

```
┌─ javascript ─────────────────────────────── 📋 copy ─┐
│   1 │ const blog = {                                 │
│   2 │   name: 'dev@enigma',                          │
│   3 │   theme: 'tokyo-night',                        │
│   4 │   vibe: 'hacker'                               │
│   5 │ };                                             │
│   6 │                                                │
│   7 │ export default blog;                           │
└──────────────────────────────────────────────────────┘
```

### 6. Buttons

```css
/* Primary - Filled */
┌─────────────────┐
│ ❯ Execute       │  <- Green border, glow on hover
└─────────────────┘

/* Secondary - Outline */
┌─────────────────┐
│ [ Cancel ]      │  <- Border only
└─────────────────┘

/* Ghost - Text only */
  :help           <- Just text with underline
```

### 7. Input Fields

```
┌─ Search ─────────────────────────────────────┐
│ >_ type to search...                     🔍  │
└──────────────────────────────────────────────┘
```

### 8. Tags

```
┌─────────┐ ┌──────────┐ ┌─────────┐
│ #react  │ │ #nodejs  │ │ #linux  │
└─────────┘ └──────────┘ └─────────┘
```

### 9. Blockquote

```
│
│  "The terminal is my canvas, code is my paint."
│
│  — dev@enigma
│
```

### 10. Status Bar (Footer)

```
┌─────────────────────────────────────────────────────────────┐
│ NORMAL │ © 2024 sandikodev │ Built with Astro │ v1.0.0 │ ↑  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Special Effects

### 1. Cursor Blink

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.cursor {
  animation: blink 1s infinite;
  background: var(--cursor);
}
```

### 2. Typing Effect

```css
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

.typing {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(40);
}
```

### 3. Scan Lines (CRT Effect)

```css
.scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### 4. Glow Effect

```css
.glow {
  text-shadow: 
    0 0 5px var(--glow),
    0 0 10px var(--glow),
    0 0 20px var(--glow);
}

.glow-box {
  box-shadow: 
    0 0 5px var(--glow),
    0 0 10px var(--glow),
    inset 0 0 5px var(--glow);
}
```

### 5. Matrix Rain (Background)

```css
.matrix-bg {
  background: 
    linear-gradient(180deg, 
      rgba(0, 255, 0, 0.03) 0%, 
      transparent 100%
    );
}
```

### 6. Glitch Effect

```css
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

.glitch:hover {
  animation: glitch 0.3s infinite;
}
```

### 7. Terminal Boot Sequence

```
[    0.000000] Booting dev@enigma...
[    0.001337] Loading kernel modules...
[    0.042069] Initializing blog engine...
[    0.069420] Mounting /home/dev/blog...
[    1.000000] System ready.

dev@enigma:~ $ _
```

---

## 🎹 Keyboard Shortcuts

```
┌─────────────────────────────────────────────────────────────┐
│                     KEYBOARD SHORTCUTS                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Navigation                                                 │
│  ──────────                                                 │
│  j / k          Scroll down / up                            │
│  g g            Go to top                                   │
│  G              Go to bottom                                │
│  g h            Go to home                                  │
│  g b            Go to blog                                  │
│  g p            Go to projects                              │
│                                                             │
│  Actions                                                    │
│  ───────                                                    │
│  /              Open search                                 │
│  Ctrl+K         Command palette                             │
│  Esc            Close modal / Cancel                        │
│  Enter          Select / Confirm                            │
│                                                             │
│  Theme                                                      │
│  ─────                                                      │
│  t t            Toggle dark/light                           │
│  t 1-5          Switch theme (1=tokyo, 2=dracula, etc)      │
│                                                             │
│  Help                                                       │
│  ────                                                       │
│  ?              Show this help                              │
│  :q             Easter egg 😉                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Full terminal experience
- Side panels visible
- All effects enabled

### Tablet (768px - 1024px)
- Simplified layout
- Collapsible sidebar
- Reduced effects

### Mobile (<768px)
- Single column
- Bottom navigation (like mobile terminal apps)
- Touch-friendly targets
- Swipe gestures

```
Mobile Layout:
┌─────────────────────┐
│ dev@enigma      ≡   │  <- Hamburger menu
├─────────────────────┤
│                     │
│  Content            │
│                     │
├─────────────────────┤
│ 🏠  📝  💼  👤  🔍  │  <- Bottom nav
└─────────────────────┘
```

---

## 🎭 Page Templates

### Homepage

```
┌─────────────────────────────────────────────────────────────┐
│ ● ○ ○  dev@enigma:~                                    ─ □ × │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  $ neofetch                                                 │
│                                                             │
│         ██████╗ ███████╗██╗   ██╗                          │
│         ██╔══██╗██╔════╝██║   ██║                          │
│         ██║  ██║█████╗  ██║   ██║                          │
│         ██║  ██║██╔══╝  ╚██╗ ██╔╝                          │
│         ██████╔╝███████╗ ╚████╔╝                           │
│         ╚═════╝ ╚══════╝  ╚═══╝                            │
│                                                             │
│  dev@enigma                                                 │
│  ──────────────────────                                     │
│  OS: Arch Linux x86_64                                      │
│  Host: The Internet                                         │
│  Shell: zsh 5.9                                             │
│  Editor: NeoVim                                             │
│  Terminal: Alacritty                                        │
│  Skills: React, Node, Python, Go                            │
│                                                             │
│  $ cat /etc/motd                                            │
│                                                             │
│  Welcome to my digital space.                               │
│  I write code, break things, and occasionally blog.         │
│                                                             │
│  $ ls -la ~/recent-posts/                                   │
│                                                             │
│  drwxr-xr-x  2024-12-09  building-terminal-blog.md          │
│  drwxr-xr-x  2024-12-08  neovim-setup-guide.md              │
│  drwxr-xr-x  2024-12-07  ssh-tunneling.md                   │
│                                                             │
│  $ _                                                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ NORMAL │ home │ utf-8 │ 100% │ 18:49                        │
└─────────────────────────────────────────────────────────────┘
```

### Blog Listing

```
┌─────────────────────────────────────────────────────────────┐
│ ● ○ ○  dev@enigma:~/blog                               ─ □ × │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  $ find ~/blog -name "*.md" | head -10                      │
│                                                             │
│  ┌─ 001 ──────────────────────────────────────────────────┐ │
│  │ # Building a Terminal Blog                              │ │
│  │ > 2024-12-09 • 5 min read • #terminal #design          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ 002 ──────────────────────────────────────────────────┐ │
│  │ # NeoVim Setup Guide                                    │ │
│  │ > 2024-12-08 • 8 min read • #neovim #productivity      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─ 003 ──────────────────────────────────────────────────┐ │
│  │ # SSH Tunneling Deep Dive                               │ │
│  │ > 2024-12-07 • 12 min read • #ssh #security            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  [←] prev  page 1 of 3  [→] next                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ NORMAL │ blog/index │ 3 posts │ 18:49                       │
└─────────────────────────────────────────────────────────────┘
```

### Single Post

```
┌─────────────────────────────────────────────────────────────┐
│ ● ○ ○  vim ~/blog/posts/terminal-blog.md               ─ □ × │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1  ---                                                     │
│  2  title: Building a Terminal Blog                         │
│  3  date: 2024-12-09                                        │
│  4  tags: [terminal, design, astro]                         │
│  5  ---                                                     │
│  6                                                          │
│  7  # Building a Terminal Blog                              │
│  8                                                          │
│  9  > "The terminal is not just a tool, it's a lifestyle"   │
│ 10                                                          │
│ 11  ## Introduction                                         │
│ 12                                                          │
│ 13  I've always been fascinated by terminal interfaces...   │
│ 14                                                          │
│ 15  ## The Design Process                                   │
│ 16                                                          │
│ 17  ```javascript                                           │
│ 18  const theme = {                                         │
│ 19    name: 'tokyo-night',                                  │
│ 20    type: 'dark'                                          │
│ 21  };                                                      │
│ 22  ```                                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ NORMAL │ terminal-blog.md │ markdown │ 22L │ 50% │ 18:49    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Implementation Priority

### Phase 1: Foundation ✅ COMPLETE
1. [x] Base CSS variables (colors, fonts, spacing)
2. [x] Terminal window component
3. [x] Typography styles with prefixes
4. [x] Basic layout structure

### Phase 2: Core Components ✅ COMPLETE
5. [x] Navigation (tmux-style tabs)
6. [x] Status bar (vim-style)
7. [x] Blog post cards
8. [x] Code blocks with line numbers

### Phase 3: Interactions ✅ COMPLETE
9. [ ] Command palette (Ctrl+K) - Future
10. [x] Keyboard navigation
11. [x] Theme switcher
12. [ ] Cursor effects - Future

### Phase 4: Polish (Future Features)
13. [ ] Scan lines effect
14. [ ] Glow effects
15. [ ] Typing animations
16. [ ] Boot sequence (optional)

### Phase 5: Advanced (Future Features)
17. [ ] Matrix rain background
18. [ ] Glitch effects
19. [ ] Sound effects (optional)
20. [ ] Easter eggs

---

## 📚 Inspiration & References

- **NeoVim**: UI structure, keybindings, statusline
- **Tmux**: Tab/pane management, status bar
- **Alacritty/Kitty**: Terminal aesthetics
- **Tokyo Night**: Color palette
- **Mr. Robot**: Hacker aesthetic
- **Hyper Terminal**: Modern terminal design
- **Vercel**: Clean dark UI
- **Linear**: Keyboard-first design

---

## 🎯 Success Metrics

1. **Unique Identity**: Instantly recognizable as a dev blog
2. **Functional**: All features work via keyboard
3. **Performant**: No heavy animations on mobile
4. **Accessible**: Screen reader friendly despite visual effects
5. **Memorable**: Visitors remember the experience

---

*"In a world of generic blogs, be a terminal."*

— dev@enigma
