// i3 Window Manager Utilities

export interface I3Window {
  id: string;
  element: HTMLElement;
  focused: boolean;
  floating: boolean;
  minimized: boolean;
  maximized: boolean;
}

export class I3WindowManager {
  private windows: Map<string, I3Window> = new Map();
  private focusedWindow: string | null = null;

  constructor() {
    this.init();
  }

  private init() {
    // Initialize all windows
    document.querySelectorAll('.i3-window').forEach((el, index) => {
      const id = el.id || `window-${index}`;
      el.id = id;
      
      this.windows.set(id, {
        id,
        element: el as HTMLElement,
        focused: el.classList.contains('focused'),
        floating: el.classList.contains('floating'),
        minimized: false,
        maximized: false,
      });
    });

    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  private setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Skip if typing
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') return;

      // Mod+Shift+Q - Close focused window
      if (e.shiftKey && e.key === 'Q') {
        e.preventDefault();
        this.closeFocused();
      }

      // Mod+F - Toggle float
      if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        this.toggleFloat();
      }

      // Mod+Shift+Space - Toggle float (alternative)
      if (e.shiftKey && e.key === ' ' && e.ctrlKey) {
        e.preventDefault();
        this.toggleFloat();
      }

      // Mod+H/J/K/L - Focus windows (vim-style)
      if (e.ctrlKey && ['h', 'j', 'k', 'l'].includes(e.key)) {
        e.preventDefault();
        this.focusDirection(e.key);
      }
    });
  }

  focus(windowId: string) {
    // Unfocus all
    this.windows.forEach(win => {
      win.focused = false;
      win.element.classList.remove('focused');
    });

    // Focus target
    const window = this.windows.get(windowId);
    if (window) {
      window.focused = true;
      window.element.classList.add('focused');
      this.focusedWindow = windowId;
    }
  }

  toggleFloat() {
    if (!this.focusedWindow) return;
    const window = this.windows.get(this.focusedWindow);
    if (!window) return;

    window.floating = !window.floating;
    window.element.classList.toggle('floating');
  }

  closeFocused() {
    if (!this.focusedWindow) return;
    const window = this.windows.get(this.focusedWindow);
    if (window) {
      window.element.style.display = 'none';
      this.windows.delete(this.focusedWindow);
      this.focusedWindow = null;
    }
  }

  private focusDirection(direction: string) {
    // Simple implementation - cycle through windows
    const windowIds = Array.from(this.windows.keys());
    if (windowIds.length === 0) return;

    const currentIndex = this.focusedWindow 
      ? windowIds.indexOf(this.focusedWindow) 
      : -1;

    let nextIndex = 0;
    switch (direction) {
      case 'h': // left
      case 'k': // up
        nextIndex = currentIndex > 0 ? currentIndex - 1 : windowIds.length - 1;
        break;
      case 'l': // right
      case 'j': // down
        nextIndex = currentIndex < windowIds.length - 1 ? currentIndex + 1 : 0;
        break;
    }

    this.focus(windowIds[nextIndex]);
  }

  minimize(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.minimized = true;
      window.element.style.display = 'none';
    }
  }

  maximize(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.maximized = !window.maximized;
      window.element.classList.toggle('maximized');
    }
  }

  restore(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.minimized = false;
      window.element.style.display = '';
    }
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    (window as any).i3wm = new I3WindowManager();
  });
}
