import type { AstroIntegration } from "astro";
import type { WorkspaceConfig } from "./types/index.js";

export interface WorkspaceIntegrationConfig {
  workspace?: Partial<WorkspaceConfig>;
  features?: {
    devMode?: boolean;
    hotReload?: boolean;
    debugPanel?: boolean;
    nativePreview?: boolean;
  };
  routes?: {
    workspace?: string;
    admin?: string;
    preview?: string;
  };
}

export default function workspaceFramework(
  config: WorkspaceIntegrationConfig = {},
): AstroIntegration {
  const {
    workspace = {},
    features = {
      devMode: true,
      hotReload: true,
      debugPanel: true,
      nativePreview: false,
    },
    routes = {
      workspace: "/workspace",
      admin: "/workspace/admin",
      preview: "/workspace/preview",
    },
  } = config;

  return {
    name: "@sandikodev/workspace-framework",
    hooks: {
      "astro:config:setup": ({ updateConfig, addRenderer, injectRoute }) => {
        console.log("🚀 SandikoOS Workspace Framework initializing...");

        // Add workspace routes
        if (features.devMode) {
          injectRoute({
            pattern: routes.admin!,
            entrypoint: "@sandikodev/workspace-framework/pages/admin.astro",
          });

          injectRoute({
            pattern: routes.preview!,
            entrypoint: "@sandikodev/workspace-framework/pages/preview.astro",
          });
        }

        // Add workspace renderer
        addRenderer({
          name: "workspace-renderer",
          serverEntrypoint: "@sandikodev/workspace-framework/renderer",
        });

        // Update Astro config for workspace compatibility
        updateConfig({
          vite: {
            define: {
              __WORKSPACE_CONFIG__: JSON.stringify(workspace),
              __WORKSPACE_FEATURES__: JSON.stringify(features),
            },
            optimizeDeps: {
              include: ["@sandikodev/workspace-framework"],
            },
          },
        });
      },

      "astro:config:done": () => {
        console.log("🖥️  Workspace Framework: Desktop environment ready");

        if (features.devMode) {
          console.log(`📊 Debug Panel: ${routes.admin}`);
          console.log(`👁️  Preview Mode: ${routes.preview}`);
        }

        if (features.nativePreview) {
          console.log("🔮 Native Preview: Preparing for desktop integration");
        }
      },

      "astro:server:setup": ({ server }) => {
        if (features.hotReload) {
          // Add workspace hot reload middleware
          server.middlewares.use("/workspace-hmr", (req, res, next) => {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            // Send workspace updates
            const send = (data: any) => {
              res.write(`data: ${JSON.stringify(data)}\n\n`);
            };

            send({ type: "workspace:connected" });

            // Cleanup on disconnect
            req.on("close", () => {
              res.end();
            });
          });
        }
      },

      "astro:build:done": ({ dir }) => {
        console.log("📦 Workspace build complete");

        if (features.nativePreview) {
          console.log("🔮 Generating native desktop preview...");
          // Future: Generate native app bundle
        }
      },
    },
  };
}

// TODO: Phase 2 - Create these components when workspace UI is ready
// export { default as WorkspaceProvider } from "./components/WorkspaceProvider.astro";
// export { default as WindowManager } from "./components/WindowManager.astro";
// export { default as AppLauncher } from "./components/AppLauncher.astro";
// export { default as DesktopEnvironment } from "./components/DesktopEnvironment.astro";
