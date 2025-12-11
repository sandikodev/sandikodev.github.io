# @sandikodev/workspace-framework

🚀 **Revolutionary desktop environment framework - Web DX for native desktop apps**

**Phase 2** of the **SandikoOS Ecosystem** - Building the foundation for native desktop development with web technologies.

## 🌟 Vision

Create a **native desktop environment** where developers can build applications as easily as web development, with:
- **Wayland/Rust compositor** integration
- **Native performance** with web DX  
- **Component-based** desktop applications
- **RedoxOS** compatibility

## ✨ Features

### 🖥️ Desktop Environment Core
- **Window Management** - Tiling, floating, hybrid layouts
- **Application Launcher** - Fuzzy search, categorized apps
- **Workspace System** - Multiple desktops, seamless switching
- **Event System** - Reactive, plugin-friendly architecture

### 🎨 Theming & Customization
- **Terminal-inspired** color schemes
- **CSS Variables** integration
- **Dynamic theming** support
- **Responsive layouts** for any screen size

### 🔌 Plugin Architecture
- **Modular design** - Load only what you need
- **Hot-swappable** plugins
- **Web-to-native** compatibility
- **Community ecosystem** ready

### 🚀 Future-Proof
- **Native bindings** placeholder for Phase 3
- **Wayland compositor** integration planned
- **RedoxOS** compatibility layer
- **Cross-platform** desktop apps

## 🚀 Installation

```bash
npm install @sandikodev/workspace-framework
```

## 📖 Usage

### Astro Integration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import workspaceFramework from '@sandikodev/workspace-framework/astro';

export default defineConfig({
  integrations: [
    workspaceFramework({
      workspace: {
        compositor: {
          backend: 'web', // 'web' | 'wayland' | 'native'
          features: {
            animations: true,
            transparency: true,
            shadows: true,
          }
        },
        windows: {
          layout: 'tiling',
          gaps: { inner: 8, outer: 16 }
        }
      },
      features: {
        devMode: true,
        nativePreview: true, // 🔮 Phase 3 feature
      }
    })
  ]
});
```

### Programmatic Usage

```ts
import { createWorkspace, defaultWorkspaceConfig } from '@sandikodev/workspace-framework';

// Create workspace instance
const workspace = createWorkspace({
  ...defaultWorkspaceConfig,
  compositor: {
    backend: 'web',
    renderer: 'software'
  }
});

// Initialize the workspace
await workspace.initialize();

// Create and manage windows
const window = workspace.windows.createWindow({
  title: 'My App',
  geometry: { x: 100, y: 100, width: 800, height: 600 }
});

// Register applications
workspace.apps.registerApp({
  id: 'terminal',
  name: 'Terminal',
  icon: '🖥️',
  executable: '/usr/bin/alacritty',
  category: 'development'
});

// Launch applications
const appWindow = await workspace.apps.launchApp('terminal');
```

### Component Usage (Astro)

```astro
---
import { 
  WorkspaceProvider, 
  WindowManager, 
  AppLauncher,
  DesktopEnvironment 
} from '@sandikodev/workspace-framework/astro';
---

<WorkspaceProvider config={workspaceConfig}>
  <DesktopEnvironment>
    <WindowManager />
    <AppLauncher />
    
    <!-- Your desktop applications -->
    <slot />
  </DesktopEnvironment>
</WorkspaceProvider>
```

## 🎯 Architecture

### Core Systems
- **WorkspaceCore** - Central orchestrator
- **WindowManager** - Window lifecycle management
- **AppManager** - Application registry and launcher
- **EventManager** - Reactive event system
- **Compositor** - Rendering and visual effects

### Plugin System
```ts
export class MyWorkspacePlugin implements WorkspacePlugin {
  name = 'my-plugin';
  version = '1.0.0';

  async init(workspace: WorkspaceCore) {
    // Plugin initialization
    workspace.events.on('window:created', this.handleWindowCreated);
  }

  private handleWindowCreated = (event) => {
    console.log('New window created:', event.data);
  };
}
```

## 🔮 Roadmap: SandikoOS

### Phase 1: Terminal Code ✅
- `@sandikodev/astro-terminal-code`
- Terminal-style syntax highlighting
- Workspace compatibility

### Phase 2: Workspace Framework ✅ (Current)
- `@sandikodev/workspace-framework`
- Desktop environment core
- Plugin architecture
- Web-based compositor

### Phase 3: Native Desktop Environment 🚀
- **Wayland/Rust compositor**
- **Native window management**
- **RedoxOS compatibility**
- **Cross-platform desktop apps**

## 🎨 Theming

Built-in themes inspired by popular terminal environments:
- **Tokyo Night** (default)
- **Dracula**
- **Gruvbox**
- **Nord**
- **Catppuccin**

Custom theme support:
```ts
const customTheme = {
  name: 'My Theme',
  colors: {
    primary: '#your-color',
    background: '#your-bg',
    // ... full color scheme
  }
};
```

## 🤝 Contributing

Join the **SandikoOS revolution**! We're building the future of desktop development.

### Development Setup
```bash
git clone https://github.com/sandikodev/workspace-framework
cd workspace-framework
npm install
npm run dev
```

### Plugin Development
Create plugins for:
- **File managers**
- **Terminal emulators**  
- **Text editors**
- **Media players**
- **System monitors**

## 📄 License

MIT - Built with ❤️ by [SandikoDev](https://sandikodev.com)

## 🌟 Support

- **GitHub**: [Issues & Discussions](https://github.com/sandikodev/workspace-framework)
- **Discord**: [SandikoOS Community](https://discord.gg/sandikoos)
- **Sponsor**: [GitHub Sponsors](https://github.com/sponsors/sandikodev)

---

**"Making desktop development as easy as web development"** 🚀

*The future of computing is component-based, reactive, and beautiful.*
