// i3 Window Manager Utilities

export interface I3Window {
  element: HTMLElement;
  floating: boolean;
  focused: boolean;
  id: string;
  maximized: boolean;
  minimized: boolean;
}

export class I3WindowManager {
  private focusedWindow: null | string = null;
  private windows = new Map<string, I3Window>();

  constructor() {
    this.init();
  }

  closeFocused() {
    if (!this.focusedWindow) return;
    const window = this.windows.get(this.focusedWindow);
    if (window) {
      window.element.style.display = "none";
      this.windows.delete(this.focusedWindow);
      this.focusedWindow = null;
    }
  }

  focus(windowId: string) {
    // Unfocus all
    this.windows.forEach((win) => {
      win.focused = false;
      win.element.classList.remove("focused");
    });

    // Focus target
    const window = this.windows.get(windowId);
    if (window) {
      window.focused = true;
      window.element.classList.add("focused");
      this.focusedWindow = windowId;
    }
  }

  maximize(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.maximized = !window.maximized;
      window.element.classList.toggle("maximized");
    }
  }

  minimize(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.minimized = true;
      window.element.style.display = "none";
    }
  }

  restore(windowId: string) {
    const window = this.windows.get(windowId);
    if (window) {
      window.minimized = false;
      window.element.style.display = "";
    }
  }

  toggleFloat() {
    if (!this.focusedWindow) return;
    const window = this.windows.get(this.focusedWindow);
    if (!window) return;

    window.floating = !window.floating;
    window.element.classList.toggle("floating");
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
      case "h": // left
      case "k": // up
        nextIndex = currentIndex > 0 ? currentIndex - 1 : windowIds.length - 1;
        break;
      case "j": // down
      case "l": // right
        nextIndex = currentIndex < windowIds.length - 1 ? currentIndex + 1 : 0;
        break;
    }

    this.focus(windowIds[nextIndex]);
  }

  private init() {
    // Initialize all windows
    document.querySelectorAll(".i3-window").forEach((el, index) => {
      const id = el.id || `window-${index}`;
      el.id = id;

      this.windows.set(id, {
        element: el as HTMLElement,
        floating: el.classList.contains("floating"),
        focused: el.classList.contains("focused"),
        id,
        maximized: false,
        minimized: false,
      });
    });

    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }

  private setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Skip if typing
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;

      // Mod+Shift+Q - Close focused window
      if (e.shiftKey && e.key === "Q") {
        e.preventDefault();
        this.closeFocused();
      }

      // Mod+F - Toggle float
      if (e.key === "f" && e.ctrlKey) {
        e.preventDefault();
        this.toggleFloat();
      }

      // Mod+Shift+Space - Toggle float (alternative)
      if (e.shiftKey && e.key === " " && e.ctrlKey) {
        e.preventDefault();
        this.toggleFloat();
      }

      // Mod+H/J/K/L - Focus windows (vim-style)
      if (e.ctrlKey && ["h", "j", "k", "l"].includes(e.key)) {
        e.preventDefault();
        this.focusDirection(e.key);
      }
    });
  }
}

// Auto-initialize
if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    (window as any).i3wm = new I3WindowManager();
  });
}
