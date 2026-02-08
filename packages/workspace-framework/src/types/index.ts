// Core SandikoOS Workspace Types
export interface WorkspaceConfig {
  compositor: CompositorConfig;
  windows: WindowManagerConfig;
  theming: ThemeConfig;
  plugins: PluginConfig[];
}

export interface CompositorConfig {
  backend: "wayland" | "x11" | "web" | "native";
  renderer: "wgpu" | "opengl" | "software";
  features: {
    animations: boolean;
    transparency: boolean;
    shadows: boolean;
    blur: boolean;
  };
}

export interface WindowManagerConfig {
  layout: "tiling" | "floating" | "hybrid";
  gaps: {
    inner: number;
    outer: number;
  };
  borders: {
    width: number;
    focused: string;
    unfocused: string;
  };
  keybindings: KeyBinding[];
}

export interface KeyBinding {
  key: string;
  modifiers: ("ctrl" | "alt" | "shift" | "super")[];
  action: WorkspaceAction;
}

export interface WorkspaceAction {
  type: "spawn" | "focus" | "move" | "resize" | "workspace" | "custom";
  target?: string;
  params?: Record<string, any>;
}

export interface ThemeConfig {
  name: string;
  colors: ColorScheme;
  fonts: FontConfig;
  spacing: SpacingConfig;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export interface FontConfig {
  mono: string;
  sans: string;
  serif: string;
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
}

export interface SpacingConfig {
  unit: number;
  scale: number[];
}

export interface PluginConfig {
  name: string;
  enabled: boolean;
  config?: Record<string, any>;
}

// Window System Types
export interface WorkspaceWindow {
  id: string;
  title: string;
  appId: string;
  geometry: WindowGeometry;
  state: WindowState;
  properties: WindowProperties;
}

export interface WindowGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowState {
  focused: boolean;
  maximized: boolean;
  minimized: boolean;
  fullscreen: boolean;
  floating: boolean;
}

export interface WindowProperties {
  resizable: boolean;
  movable: boolean;
  closable: boolean;
  minimizable: boolean;
  maximizable: boolean;
}

// Application Types
export interface WorkspaceApp {
  id: string;
  name: string;
  icon: string;
  executable: string;
  category: AppCategory;
  metadata: AppMetadata;
}

export type AppCategory =
  | "development"
  | "productivity"
  | "media"
  | "games"
  | "system"
  | "network"
  | "graphics"
  | "office";

export interface AppMetadata {
  description: string;
  version: string;
  author: string;
  license: string;
  keywords: string[];
}

// Event System Types
export interface WorkspaceEvent {
  type: string;
  timestamp: number;
  source: string;
  data: any;
}

export interface EventHandler<T = any> {
  (event: WorkspaceEvent & { data: T }): void | Promise<void>;
}

// Plugin System Types
export interface WorkspacePlugin {
  name: string;
  version: string;
  init(workspace: WorkspaceCore): Promise<void>;
  destroy?(): Promise<void>;
}

export interface WorkspaceCore {
  config: WorkspaceConfig;
  windows: IWindowManager;
  apps: IAppManager;
  events: IEventManager;
  compositor: ICompositor;
}

// Manager interfaces for proper typing
export interface IWindowManager {
  createWindow(config: Partial<WorkspaceWindow>): WorkspaceWindow;
  focusWindow(id: string): void;
  closeWindow(id: string): void;
  getWindows(): WorkspaceWindow[];
  getFocusedWindow(): WorkspaceWindow | null;
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}

export interface IAppManager {
  registerApp(app: WorkspaceApp): void;
  launchApp(appId: string): Promise<WorkspaceWindow>;
  getApps(): WorkspaceApp[];
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}

export interface IEventManager {
  on<T = any>(event: string, handler: EventHandler<T>): void;
  off(event: string, handler: EventHandler): void;
  emit(event: string, data: any): void;
}

export interface ICompositor {
  initialize(): Promise<void>;
  render(): void;
  destroy(): Promise<void>;
}

// Future Native Integration Types
export interface NativeBinding {
  platform: "linux" | "windows" | "macos" | "redox";
  backend: "wayland" | "x11" | "win32" | "cocoa" | "orbital";
  initialize(): Promise<void>;
  createWindow(config: WindowConfig): Promise<NativeWindow>;
}

export interface WindowConfig {
  title: string;
  width: number;
  height: number;
  resizable: boolean;
  decorations: boolean;
}

export interface NativeWindow {
  id: string;
  show(): void;
  hide(): void;
  close(): void;
  setTitle(title: string): void;
  setSize(width: number, height: number): void;
}
