# Spec: Design System Toggle Button

## Status: Partially Complete

## Current State
- [x] Component created: `src/components/DesignSystemToggle.astro`
- [x] Added to Base.astro (Blog Mode)
- [x] Added to I3Layout.astro (Dev Mode)
- [x] localStorage persistence
- [x] Basic styling
- [ ] Context-aware navigation (pending route mirroring)

## Behavior

### Current (Temporary)
```
/ → toggle → /terminal
/terminal → toggle → /
```

### Target (After Route Mirroring)
```
/about → toggle → /workspace/about
/workspace/about → toggle → /about
/blog/post-1 → toggle → /workspace/blog/post-1
```

## Implementation

### Toggle Logic (Target)
```js
function getTargetUrl() {
  const path = window.location.pathname;
  const isWorkspace = path.startsWith('/workspace');
  
  if (isWorkspace) {
    return path.replace('/workspace', '') || '/';
  } else {
    return '/workspace' + (path === '/' ? '' : path);
  }
}
```

### FOUC Prevention
```js
// In <head> of both layouts
(function() {
  const saved = localStorage.getItem('design-mode');
  const isWorkspace = location.pathname.startsWith('/workspace');
  
  if (saved === 'dev' && !isWorkspace) {
    location.href = '/workspace' + location.pathname;
  } else if (saved === 'blog' && isWorkspace) {
    location.href = location.pathname.replace('/workspace', '') || '/';
  }
})();
```

## Styling

### Blog Mode
```css
.design-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #fff;
  color: #1f2937;
  border: 2px solid currentColor;
}
```

### Dev Mode
```css
[data-theme-mode="dev"] .design-toggle {
  background: #1a1b26;
  color: #c0caf5;
  border-color: #7aa2f7;
}
```

## Checklist

- [x] Create component
- [x] Add to both layouts
- [x] localStorage save/load
- [x] Basic styling
- [ ] Update to context-aware navigation
- [ ] Update FOUC prevention script
- [ ] Test all scenarios
- [ ] Accessibility (keyboard, ARIA)
