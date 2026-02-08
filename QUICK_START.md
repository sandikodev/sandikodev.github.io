# Quick Start - Blog Tiling

## 🚀 Run Development Server

```bash
npm run dev
```

Then visit: `http://localhost:4321/blog-tiling`

## ⌨️ Keyboard Shortcuts

| Key   | Action       |
| ----- | ------------ |
| `j`   | Scroll down  |
| `k`   | Scroll up    |
| `g g` | Go to top    |
| `G`   | Go to bottom |
| `g h` | Go home      |
| `g b` | Go to blog   |
| `t`   | Cycle themes |
| `?`   | Show help    |
| `Esc` | Close modal  |

## 🎨 Themes Available

1. 🌃 **Tokyo Night** (default) - Blue-purple dark theme
2. 🧛 **Dracula** - Purple dark theme
3. 🍂 **Gruvbox** - Warm retro theme
4. ❄️ **Nord** - Cool arctic theme
5. 💚 **Matrix** - Green hacker theme

## 📱 Test Responsive

### Desktop

- Full 3-column layout
- All features visible
- Hover effects active

### Tablet (768-1024px)

- 2-column layout
- Right sidebar hidden
- Touch-friendly

### Mobile (<768px)

- 1-column stack
- Main content first
- Compact UI
- Touch optimized

## 🧪 Test Checklist

- [ ] Navigate to `/blog-tiling`
- [ ] Click theme switcher (🎨 button)
- [ ] Try keyboard shortcuts (j/k, gg, G)
- [ ] Press `?` to see help modal
- [ ] Press `t` to cycle themes
- [ ] Click on a post card
- [ ] Test on mobile (resize browser)
- [ ] Check categories/tags links
- [ ] Verify stats display
- [ ] Test smooth scrolling

## 🎯 Key Features

### ✅ Implemented

- Tiling window layout
- Keyboard navigation (j/k/gg/G)
- Theme switcher UI
- Mobile responsive
- Help modal
- Smooth animations
- Touch optimizations

### 🎨 Visual Elements

- i3wm-style windows
- Polybar top bar
- Tree view sidebar
- Tag cloud
- Stats grid
- Activity feed
- Post cards with hover

### 📱 Mobile Optimizations

- Stack layout
- Touch targets (32px min)
- Reduced animations
- Compact spacing
- Hidden non-essential info
- Smooth scrolling

## 🔧 Customization

### Change Default Theme

Edit `src/layouts/I3Layout.astro`:

```html
<html lang="en" data-theme="dracula"></html>
```

### Adjust Layout Ratios

Edit `src/pages/blog-tiling.astro`:

```html
<!-- Sidebar: 20% -->
<div style="flex: 0.6;">
  <!-- Main: 55% -->
  <div style="flex: 1.6;">
    <!-- Right: 25% -->
    <div style="flex: 0.8;"></div>
  </div>
</div>
```

### Add More Keyboard Shortcuts

Edit `src/components/terminal/KeyboardHandler.astro`

## 📂 File Structure

```
src/
├── pages/
│   └── blog-tiling.astro          # Main page
├── components/terminal/
│   ├── ThemeSwitcher.astro        # Theme picker
│   ├── KeyboardHandler.astro      # Keyboard nav
│   ├── HelpModal.astro            # Help overlay
│   ├── Polybar.astro              # Top bar
│   └── I3Window.astro             # Window component
├── layouts/
│   └── I3Layout.astro             # Base layout
└── styles/
    ├── terminal-theme.css         # Base theme
    ├── i3wm-theme.css             # Tiling styles
    └── animations.css             # Effects
```

## 🐛 Troubleshooting

### Theme not persisting?

- Check browser localStorage
- Clear cache and reload

### Keyboard shortcuts not working?

- Make sure you're not in an input field
- Check browser console for errors

### Layout broken on mobile?

- Clear browser cache
- Check viewport meta tag
- Test in different browsers

### Animations too slow?

- Check `prefers-reduced-motion` setting
- Adjust animation durations in CSS

## 💡 Tips

1. **Use keyboard shortcuts** - Much faster than clicking
2. **Try different themes** - Each has unique vibe
3. **Test on real mobile** - Better than browser resize
4. **Check help modal** - Press `?` for all shortcuts
5. **Smooth scroll** - Use j/k for better control

## 🎓 Learning Resources

- **i3wm**: https://i3wm.org/docs/
- **Vim keybindings**: https://vim.rtorr.com/
- **Fira Code**: https://github.com/tonsky/FiraCode
- **Design System**: See `DESIGN_SYSTEM_V2.md`

## 📞 Support

Issues? Check:

1. `BLOG_TILING_FEATURES.md` - Full feature list
2. `DESIGN_SYSTEM_V2.md` - Design reference
3. Browser console - Error messages
4. Network tab - Failed requests

---

**Happy coding! 🚀**
