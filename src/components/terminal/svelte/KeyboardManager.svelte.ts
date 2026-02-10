import { navigate } from "astro:transitions/client";

import { systemState } from "./SystemState.svelte";
import { windowManager } from "./WindowManager.svelte";

/**
 * Modernized Keyboard Management for the Antigravity Workspace.
 * Handles global shortcuts, modal WM states, and scroll navigation.
 */
class KeyboardManager {
  private gTimeout: any;
  private isGDown = false;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => this.handleKeyDown(e));

      // Restore saved theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        console.log(`🎨 Theme restored: ${savedTheme}`);
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Core Guard: Don't trigger shortcuts if typing
    const activeItem = document.activeElement;
    const isTyping =
      activeItem?.tagName === "INPUT" ||
      activeItem?.tagName === "TEXTAREA" ||
      (activeItem as HTMLElement)?.isContentEditable;

    if (isTyping) return;

    const key = e.key.toLowerCase();
    const mod = e.altKey || e.metaKey; // Alt or Cmd/Win

    // --- 1. Workspace Switching (Mod + 1-9) ---
    // Moved inside Mod check below to ensure Alt is pressed

    // --- 2. Window Management (Mod + Keys) ---
    if (mod) {
      // Workspace Switching (1-9)
      const num = parseInt(key);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        e.preventDefault();
        this.switchWorkspace(num);
        return;
      }

      switch (key) {
        case "d": // Launcher (Visual only, logic in CommandPalette)
          // Don't preventDefault here to allow CommandPalette to handle it
          this.notify(
            '<span class="kbd-key">Mod</span>+<span class="kbd-key">d</span> Launcher',
          );
          break;
        case "enter": // Terminal
          e.preventDefault();
          this.notify(
            '<span class="kbd-key">Mod</span>+<span class="kbd-key">Enter</span> Terminal',
          );
          this.switchWorkspace(4);
          break;
        case "f": // Fullscreen
          e.preventDefault();
          this.notify(
            '<span class="kbd-key">Mod</span>+<span class="kbd-key">f</span> Fullscreen',
          );
          break;
        case "h":
          e.preventDefault();
          windowManager.moveFocus("left");
          break;
        case "j":
          e.preventDefault();
          windowManager.moveFocus("down");
          break;
        case "k":
          e.preventDefault();
          windowManager.moveFocus("up");
          break;
        case "l":
          e.preventDefault();
          windowManager.moveFocus("right");
          break;
        case "q": // Close window (Mod+Shift+Q)
          if (e.shiftKey) {
            e.preventDefault();
            this.notify(
              '<span class="kbd-key">Mod</span>+<span class="kbd-key">Shift</span>+<span class="kbd-key">Q</span> Kill',
            );
            windowManager.closeActiveWindow();
          }
          break;
        case "s": // Horizontal split
          e.preventDefault();
          this.notify(
            '<span class="kbd-key">Mod</span>+<span class="kbd-key">s</span> Split Horizontal',
          );
          break;
        case "t":
          this.toggleTheme();
          break;
        case "v": // Vertical split
          e.preventDefault();
          this.notify(
            '<span class="kbd-key">Mod</span>+<span class="kbd-key">v</span> Split Vertical',
          );
          break;
      }
      return;
    }

    // --- 3. Vim-style Scrolling & Navigation ---
    if (!mod && !e.ctrlKey) {
      switch (key) {
        case "a":
          if (this.isGDown) {
            e.preventDefault();
            this.notify(
              '<span class="kbd-key">g</span>+<span class="kbd-key">a</span> Go About',
            );
            window.location.href = "/about";
            this.isGDown = false;
          }
          break;
        case "b":
          if (this.isGDown) {
            e.preventDefault();
            this.notify(
              '<span class="kbd-key">g</span>+<span class="kbd-key">b</span> Go Blog',
            );
            window.location.href = "/blog";
            this.isGDown = false;
          }
          break;
        case "g":
          if (e.shiftKey) {
            // Uppercase G
            e.preventDefault();
            window.scrollTo({
              behavior: "smooth",
              top: document.body.scrollHeight,
            });
            this.notify('<span class="kbd-key">G</span> Scroll to Bottom');
          } else if (this.isGDown) {
            // Double g
            e.preventDefault();
            window.scrollTo({ behavior: "smooth", top: 0 });
            this.notify('<span class="kbd-key">gg</span> Scroll to Top');
            this.isGDown = false;
            clearTimeout(this.gTimeout);
          } else {
            this.isGDown = true;
            this.gTimeout = setTimeout(() => (this.isGDown = false), 1000);
          }
          break;
        case "h":
          if (this.isGDown) {
            e.preventDefault();
            this.notify(
              '<span class="kbd-key">g</span>+<span class="kbd-key">h</span> Go Home',
            );
            window.location.href = "/";
            this.isGDown = false;
          }
          break;
        case "j":
          e.preventDefault();
          window.scrollBy({ behavior: "smooth", top: 100 });
          this.notify('<span class="kbd-key">j</span> Scroll Down');
          break;
        case "k":
          e.preventDefault();
          window.scrollBy({ behavior: "smooth", top: -100 });
          this.notify('<span class="kbd-key">k</span> Scroll Up');
          break;
      }
    }

    if (key === "escape") {
      systemState.setMode("default");
      const helpModal = document.getElementById("help-modal");
      if (helpModal) helpModal.classList.remove("visible");
    }

    // Help Modal (Mod + /)
    if (key === "/" && mod) {
      e.preventDefault();
      const helpModal = document.getElementById("help-modal");
      if (helpModal) helpModal.classList.add("visible");
    }

    // Scratchpad toggle (Ctrl+`)
    if (e.ctrlKey && e.key === "`") {
      e.preventDefault();
      this.notify(
        '<span class="kbd-key">Ctrl</span>+<span class="kbd-key">`</span> Scratchpad',
      );
      (window as any).toggleScratchpad?.();
    }
  }

  private notify(text: string) {
    window.dispatchEvent(new CustomEvent("kbd-notify", { detail: { text } }));
  }

  private switchWorkspace(num: number) {
    // Find path from systemState map
    const path = Object.keys(systemState.workspaceMap).find(
      (key) => systemState.workspaceMap[key] === num,
    );

    if (path) {
      this.notify(
        `<span class="kbd-key">${num}</span> Switching to Workspace ${num}`,
      );
      systemState.setWorkspace(num);
      setTimeout(() => {
        navigate(path);
      }, 100);
    }
  }

  private toggleTheme() {
    const themes = ["tokyo-night", "dracula", "gruvbox", "nord", "matrix"];
    const current =
      document.documentElement.getAttribute("data-theme") || "tokyo-night";
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    this.notify(`<span class="kbd-key">t</span> Theme: ${next}`);
  }
}

export const keyboardManager = new KeyboardManager();
