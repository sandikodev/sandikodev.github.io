/**
 * Global reactive state for the Antigravity System.
 * Manages shell stats, sound, workspaces, and WM modes using Svelte 5 Runes.
 */
class SystemState {
  // Shell Stats
  cpuUsage = $state(0);
  currentDate = $state("");
  currentTime = $state("");
  // Workspace & WM State
  currentWorkspace = $state(1);

  memUsage = $state(0);

  // System Preferences
  soundEnabled = $state(true);
  wmMode = $state<"default" | "move" | "resize">("default");

  // URL -> Workspace Mapping
  workspaceMap: Record<string, number> = {
    "/workspace": 1,
    "/workspace/about": 3,
    "/workspace/blog": 2,
    "/workspace/contact": 7,
    "/workspace/projects": 6,
    "/workspace/skills": 5,
    "/workspace/terminal": 4,
  };

  constructor() {
    // Initialize preferences from localStorage if client-side
    if (typeof window !== "undefined") {
      this.soundEnabled = localStorage.getItem("sound-enabled") !== "false";
      this.updateTime();
      this.updateStats();
      this.syncWithUrl();

      // Set intervals for updates
      setInterval(() => this.updateTime(), 1000);
      setInterval(() => this.updateStats(), 5000);
    }
  }

  setMode(mode: "default" | "move" | "resize") {
    this.wmMode = mode;
  }

  setWorkspace(num: number) {
    this.currentWorkspace = num;
  }

  syncWithUrl() {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;

    // Find matching workspace
    // exact match first, then partial
    let match = this.workspaceMap[path];
    if (!match) {
      const key = Object.keys(this.workspaceMap).find(
        (k) => k !== "/workspace" && path.startsWith(k),
      );
      if (key) match = this.workspaceMap[key];
    }

    if (match) {
      this.currentWorkspace = match;
    } else if (path.startsWith("/workspace")) {
      this.currentWorkspace = 1; // Default
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound-enabled", this.soundEnabled.toString());
      // Dispatch event for components still using manual event listeners
      window.dispatchEvent(
        new CustomEvent("sound-toggle", {
          detail: { enabled: this.soundEnabled },
        }),
      );
    }
  }

  updateStats() {
    // Mocking stats for now as in the original Polybar
    this.cpuUsage = Math.floor(Math.random() * 30 + 5);
    this.memUsage = Number((Math.random() * 4 + 2).toFixed(1));
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    this.currentDate = now.toLocaleDateString("en-US", {
      day: "2-digit",
      weekday: "short",
    });
  }
}

export const systemState = new SystemState();
