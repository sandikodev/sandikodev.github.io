// import { systemState } from "./SystemState.svelte";

interface WindowBounds {
  floating: boolean;
  height: number;
  width: number;
  x: number;
  y: number;
}

/**
 * Centrally managed window state for the i3 workspace.
 * Uses Svelte 5 Runes for reactivity and performance.
 */
class WindowManager {
  get activeWindowId() {
    return this._activeWindowId;
  }

  get layout() {
    return this._layout;
  }

  // Getters for the runes
  get zIndexCounter() {
    return this._zIndexCounter;
  }

  // Track showing windows for focus/active state
  private _activeWindowId = $state<null | string>(null);

  // Persisted layout storage
  private _layout = $state<Record<string, WindowBounds>>({});
  // Current highest z-index
  private _zIndexCounter = $state(500);
  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("i3-layout");
      if (saved) {
        try {
          this._layout = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load layout", e);
        }
      }
    }
  }

  /**
   * Closes the currently active window
   */
  closeActiveWindow() {
    if (!this._activeWindowId) return;

    // Remove from layout state
    delete this._layout[this._activeWindowId];
    if (typeof window !== "undefined") {
      localStorage.setItem("i3-layout", JSON.stringify(this._layout));

      // Dispatch event for components to react (removing from DOM)
      window.dispatchEvent(
        new CustomEvent("i3-close-window", {
          detail: { id: this._activeWindowId },
        }),
      );
    }

    this._activeWindowId = null;
  }

  /**
   * Increments the global z-index and returns the new value.
   */
  getNextZIndex(id: string) {
    this._zIndexCounter += 1;
    this._activeWindowId = id;
    return this._zIndexCounter;
  }

  /**
   * Intelligent focus movement (Mod+h/j/k/l)
   * Finds the nearest window in the specified direction.
   */
  moveFocus(direction: "down" | "left" | "right" | "up") {
    if (!this._activeWindowId || !this._layout[this._activeWindowId]) return;

    const current = this._layout[this._activeWindowId];
    const currentCenterX = current.x + current.width / 2;
    const currentCenterY = current.y + current.height / 2;

    let bestMatch: null | string = null;
    let minDistance = Infinity;

    for (const [id, bounds] of Object.entries(this._layout)) {
      if (id === this._activeWindowId) continue;

      const targetCenterX = bounds.x + bounds.width / 2;
      const targetCenterY = bounds.y + bounds.height / 2;

      let isInRange = false;
      switch (direction) {
        case "down":
          isInRange = targetCenterY > currentCenterY;
          break;
        case "left":
          isInRange = targetCenterX < currentCenterX;
          break;
        case "right":
          isInRange = targetCenterX > currentCenterX;
          break;
        case "up":
          isInRange = targetCenterY < currentCenterY;
          break;
      }

      if (isInRange) {
        const dist = Math.sqrt(
          Math.pow(targetCenterX - currentCenterX, 2) +
            Math.pow(targetCenterY - currentCenterY, 2),
        );
        if (dist < minDistance) {
          minDistance = dist;
          bestMatch = id;
        }
      }
    }

    if (bestMatch) {
      this.setActive(bestMatch);
      // Optionally bring to front if floating
      if (this._layout[bestMatch].floating) {
        this.getNextZIndex(bestMatch);
      }
    }
  }

  /**
   * Sets a window as active without necessarily changing z-index
   */
  setActive(id: string) {
    this._activeWindowId = id;
  }

  /**
   * Updates and persists window bounds
   */
  updateBounds(id: string, bounds: WindowBounds) {
    this._layout[id] = bounds;
    if (typeof window !== "undefined") {
      localStorage.setItem("i3-layout", JSON.stringify(this._layout));
    }
  }
}

// Global instance
export const windowManager = new WindowManager();
