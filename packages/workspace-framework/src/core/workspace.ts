import type {
  WorkspaceConfig,
  WorkspaceCore,
  WorkspaceWindow,
  WorkspaceApp,
  WorkspaceEvent,
  EventHandler,
  WorkspacePlugin,
} from "../types/index.js";

export class SandikoWorkspace implements WorkspaceCore {
  public config: WorkspaceConfig;
  public windows: WindowManager;
  public apps: AppManager;
  public events: EventManager;
  public compositor: Compositor;

  private plugins: Map<string, WorkspacePlugin> = new Map();
  private initialized = false;

  constructor(config: WorkspaceConfig) {
    this.config = config;
    this.events = new EventManager();
    this.windows = new WindowManager(this.events);
    this.apps = new AppManager(this.events);
    this.compositor = new Compositor(config.compositor, this.events);
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log("🚀 SandikoOS Workspace initializing...");

    // Initialize core systems
    await this.compositor.initialize();
    await this.windows.initialize();
    await this.apps.initialize();

    // Load plugins
    for (const pluginConfig of this.config.plugins) {
      if (pluginConfig.enabled) {
        await this.loadPlugin(pluginConfig.name);
      }
    }

    this.initialized = true;
    this.events.emit("workspace:initialized", {});

    console.log("✅ SandikoOS Workspace ready!");
  }

  async loadPlugin(name: string): Promise<void> {
    try {
      const plugin = await import(`../plugins/${name}.js`);
      const instance = new plugin.default();

      await instance.init(this);
      this.plugins.set(name, instance);

      console.log(`📦 Plugin loaded: ${name}`);
    } catch (error) {
      console.error(`❌ Failed to load plugin: ${name}`, error);
    }
  }

  async destroy(): Promise<void> {
    // Cleanup plugins
    for (const [name, plugin] of this.plugins) {
      if (plugin.destroy) {
        await plugin.destroy();
      }
    }

    // Cleanup core systems
    await this.compositor.destroy();
    await this.windows.destroy();
    await this.apps.destroy();

    this.initialized = false;
    console.log("🛑 SandikoOS Workspace destroyed");
  }
}

export class WindowManager {
  private windows: Map<string, WorkspaceWindow> = new Map();
  private focusedWindow: string | null = null;

  constructor(private events: EventManager) {}

  async initialize(): Promise<void> {
    console.log("🪟 Window Manager initialized");
  }

  createWindow(config: Partial<WorkspaceWindow>): WorkspaceWindow {
    const window: WorkspaceWindow = {
      id: crypto.randomUUID(),
      title: config.title || "Untitled",
      appId: config.appId || "unknown",
      geometry: config.geometry || { x: 0, y: 0, width: 800, height: 600 },
      state: {
        focused: false,
        maximized: false,
        minimized: false,
        fullscreen: false,
        floating: false,
        ...config.state,
      },
      properties: {
        resizable: true,
        movable: true,
        closable: true,
        minimizable: true,
        maximizable: true,
        ...config.properties,
      },
    };

    this.windows.set(window.id, window);
    this.events.emit("window:created", window);

    return window;
  }

  focusWindow(id: string): void {
    const window = this.windows.get(id);
    if (!window) return;

    // Unfocus previous window
    if (this.focusedWindow) {
      const prevWindow = this.windows.get(this.focusedWindow);
      if (prevWindow) {
        prevWindow.state.focused = false;
        this.events.emit("window:unfocused", prevWindow);
      }
    }

    // Focus new window
    window.state.focused = true;
    this.focusedWindow = id;
    this.events.emit("window:focused", window);
  }

  closeWindow(id: string): void {
    const window = this.windows.get(id);
    if (!window) return;

    this.windows.delete(id);
    if (this.focusedWindow === id) {
      this.focusedWindow = null;
    }

    this.events.emit("window:closed", window);
  }

  getWindows(): WorkspaceWindow[] {
    return Array.from(this.windows.values());
  }

  getFocusedWindow(): WorkspaceWindow | null {
    return this.focusedWindow
      ? this.windows.get(this.focusedWindow) || null
      : null;
  }

  async destroy(): Promise<void> {
    this.windows.clear();
    this.focusedWindow = null;
  }
}

export class AppManager {
  private apps: Map<string, WorkspaceApp> = new Map();

  constructor(private events: EventManager) {}

  async initialize(): Promise<void> {
    console.log("📱 App Manager initialized");
  }

  registerApp(app: WorkspaceApp): void {
    this.apps.set(app.id, app);
    this.events.emit("app:registered", app);
  }

  launchApp(appId: string): Promise<WorkspaceWindow> {
    const app = this.apps.get(appId);
    if (!app) {
      throw new Error(`App not found: ${appId}`);
    }

    // Create window for the app
    const window = new WindowManager(this.events).createWindow({
      title: app.name,
      appId: app.id,
    });

    this.events.emit("app:launched", { app, window });
    return Promise.resolve(window);
  }

  getApps(): WorkspaceApp[] {
    return Array.from(this.apps.values());
  }

  async destroy(): Promise<void> {
    this.apps.clear();
  }
}

export class EventManager {
  private handlers: Map<string, EventHandler[]> = new Map();

  on<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  off(event: string, handler: EventHandler): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: string, data: any): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const workspaceEvent: WorkspaceEvent = {
        type: event,
        timestamp: Date.now(),
        source: "workspace",
        data,
      };

      handlers.forEach((handler) => {
        try {
          handler(workspaceEvent);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }
}

export class Compositor {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  constructor(
    private config: any,
    private events: EventManager,
  ) {}

  async initialize(): Promise<void> {
    if (typeof window !== "undefined") {
      // Web environment
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      console.log("🎨 Web Compositor initialized");
    } else {
      // Future: Native compositor initialization
      console.log("🎨 Native Compositor initialized");
    }
  }

  render(): void {
    if (!this.context || !this.canvas) return;

    // Clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render workspace elements
    this.events.emit("compositor:render", { context: this.context });
  }

  async destroy(): Promise<void> {
    this.canvas = null;
    this.context = null;
  }
}
