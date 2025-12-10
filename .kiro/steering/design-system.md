# Design System Steering

## Blog Mode (V1)

### Typography
| Element | Font | Weight |
|---------|------|--------|
| Headings | Inter | 600-700 |
| Body | Georgia | 400 |
| Code | JetBrains Mono | 400 |

### Colors
- Primary: `#3B82F6` (Blue)
- Text: `#1f2937` (Dark gray)
- Background: `#ffffff` (White)

### Components
- Standard blog layout
- Clean navigation header
- Readable article format
- Tailwind CSS utilities

---

## Dev Mode (V2)

### Typography
| Element | Font | Weight |
|---------|------|--------|
| Everything | Fira Code | 400-700 |

### Themes
| Theme | Background | Accent |
|-------|------------|--------|
| Tokyo Night | `#1a1b26` | `#7aa2f7` |
| Dracula | `#282a36` | `#bd93f9` |
| Gruvbox | `#282828` | `#fabd2f` |
| Nord | `#2e3440` | `#88c0d0` |
| Matrix | `#0d0d0d` | `#00ff00` |

### Components
- **Polybar**: Top status bar (workspaces, clock, system info)
- **I3Window**: Tiling window with title bar, borders
- **Dmenu**: Application launcher style
- **ThemeSwitcher**: Theme selection dropdown
- **HelpModal**: Keyboard shortcuts reference

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `j/k` | Scroll down/up |
| `gg/G` | Go to top/bottom |
| `gh/gb` | Navigate home/blog |
| `t` | Cycle themes |
| `?` | Show help modal |
| `Esc` | Close modal |

### i3wm Layout
```
┌─────────────────────────────────────────────┐
│ Polybar (workspaces, title, system info)    │
├─────────────┬─────────────┬─────────────────┤
│ Left        │ Main        │ Right           │
│ Sidebar     │ Content     │ Sidebar         │
│ (stats)     │ (posts)     │ (activity)      │
└─────────────┴─────────────┴─────────────────┘
```

### Responsive Breakpoints
| Breakpoint | Layout |
|------------|--------|
| Desktop (>1024px) | 3-column |
| Tablet (768-1024px) | 2-column |
| Mobile (<768px) | 1-column stack |

---

## Toggle Button

### Appearance
- Fixed position: bottom-right
- Circular button with icon
- Blog Mode shows: 💻 (switch to Dev)
- Dev Mode shows: 📝 (switch to Blog)

### Styling
```css
/* Blog Mode */
.design-toggle {
  background: #fff;
  color: #1f2937;
  border: 2px solid currentColor;
}

/* Dev Mode */
[data-theme-mode="dev"] .design-toggle {
  background: #1a1b26;
  color: #c0caf5;
  border-color: #7aa2f7;
}
```
