// SandikoOS Workspace Framework
// Revolutionary desktop environment framework for web-to-native development

// Import for local use
import { SandikoWorkspace } from "./core/workspace.js";
import type { WorkspaceCore } from "./types/index.js";

// Re-export everything
export * from "./types/index.js";
export * from "./core/workspace.js";
// Core Classes
export {
  SandikoWorkspace,
  WindowManager,
  AppManager,
  EventManager,
  Compositor,
} from "./core/workspace.js";

// Astro Integration
export { default as workspaceFramework } from "./astro.js";
export type { WorkspaceIntegrationConfig } from "./astro.js";

// Default workspace configuration
export const defaultWorkspaceConfig = {
  compositor: {
    backend: "web" as const,
    renderer: "software" as const,
    features: {
      animations: true,
      transparency: true,
      shadows: true,
      blur: false,
    },
  },
  windows: {
    layout: "tiling" as const,
    gaps: {
      inner: 8,
      outer: 16,
    },
    borders: {
      width: 2,
      focused: "#7aa2f7",
      unfocused: "#414868",
    },
    keybindings: [
      {
        key: "Enter",
        modifiers: ["super" as const],
        action: {
          type: "spawn" as const,
          target: "terminal",
        },
      },
      {
        key: "d",
        modifiers: ["super" as const],
        action: {
          type: "spawn" as const,
          target: "launcher",
        },
      },
    ],
  },
  theming: {
    name: "SandikoOS Dark",
    colors: {
      primary: "#7aa2f7",
      secondary: "#bb9af7",
      background: "#1a1b26",
      surface: "#24283b",
      text: {
        primary: "#c0caf5",
        secondary: "#9aa5ce",
        muted: "#565f89",
      },
      accent: "#f7768e",
      success: "#9ece6a",
      warning: "#e0af68",
      error: "#f7768e",
    },
    fonts: {
      mono: "JetBrains Mono, Fira Code, monospace",
      sans: "Inter, system-ui, sans-serif",
      serif: "Georgia, serif",
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
      },
    },
    spacing: {
      unit: 4,
      scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
    },
  },
  plugins: [
    {
      name: "terminal-integration",
      enabled: true,
      config: {
        defaultShell: "/bin/zsh",
        fontSize: 14,
      },
    },
    {
      name: "file-manager",
      enabled: true,
      config: {
        defaultPath: "~",
        showHidden: false,
      },
    },
    {
      name: "app-launcher",
      enabled: true,
      config: {
        fuzzySearch: true,
        maxResults: 10,
      },
    },
  ],
};

// Utility functions
export function createWorkspace(config: typeof defaultWorkspaceConfig = defaultWorkspaceConfig): WorkspaceCore {
  // Use workspace.ts classes directly (re-exported at line 5)
  const workspace = new (SandikoWorkspace as any)(config);
  return workspace;
}

export function isNativeEnvironment(): boolean {
  return typeof window === "undefined" || "electronAPI" in window;
}

export function getWorkspaceVersion(): string {
  return "0.1.0-alpha";
}

// Future native bindings placeholder
export async function initializeNativeBindings() {
  if (isNativeEnvironment()) {
    console.log("🔮 Native bindings will be available in Phase 3");
    // Future: Initialize Wayland/Rust compositor
  }
}
