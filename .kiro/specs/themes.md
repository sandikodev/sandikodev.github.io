# Spec: Terminal Themes

## Status: Complete

## Available Themes

| Theme | Background | Foreground | Accent | Status |
|-------|------------|------------|--------|--------|
| Tokyo Night | `#1a1b26` | `#c0caf5` | `#7aa2f7` | [x] Done |
| Dracula | `#282a36` | `#f8f8f2` | `#bd93f9` | [x] Done |
| Gruvbox | `#282828` | `#ebdbb2` | `#fabd2f` | [x] Done |
| Nord | `#2e3440` | `#eceff4` | `#88c0d0` | [x] Done |
| Matrix | `#0d0d0d` | `#00ff00` | `#00ff00` | [x] Done |

## Implementation

### CSS Variables
```css
[data-theme="tokyo-night"] {
  --bg-primary: #1a1b26;
  --text-primary: #c0caf5;
  --accent: #7aa2f7;
  /* ... */
}
```

### Theme Switching
```js
// Set theme
document.documentElement.setAttribute('data-theme', 'dracula');
localStorage.setItem('theme', 'dracula');

// Get theme
const theme = localStorage.getItem('theme') || 'tokyo-night';
```

### Files
- `src/styles/terminal-theme.css` - Theme definitions
- `src/components/terminal/ThemeSwitcher.astro` - UI component

## Keyboard Shortcut
- `t` - Cycle through themes

## Future Themes (Optional)
- [ ] Catppuccin
- [ ] One Dark
- [ ] Solarized
- [ ] Custom user theme
