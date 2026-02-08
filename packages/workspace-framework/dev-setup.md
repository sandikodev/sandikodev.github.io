# RENDER Development Setup

**"Ruin your F\*cking at door" - Tunneling the door at everything**

## 🌍 Cross-Platform Support

### Linux (Primary)

```bash
# Native Wayland development
sudo apt install wayland-protocols libwayland-dev
cargo install tauri-cli
```

### Windows (WSL2)

```bash
# WSL2 with GUI support
wsl --install
# In WSL2:
sudo apt update && sudo apt install -y \
  build-essential \
  pkg-config \
  libwayland-dev \
  libxkbcommon-dev
```

### macOS

```bash
# Homebrew setup
brew install rust nodejs pnpm
# For future native integration
brew install --cask tauri
```

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/sandikodev/workspace-framework
cd workspace-framework
pnpm install
```

### 2. Development Mode

```bash
# Web development (all platforms)
pnpm dev

# Native preview (Linux/macOS)
pnpm dev:native

# WSL2 with X11 forwarding
export DISPLAY=:0
pnpm dev:wsl
```

### 3. Build & Test

```bash
# Web build
pnpm build

# Native build (future)
pnpm build:native

# Cross-platform test
pnpm test:all
```

## 🎯 Philosophy Implementation

### "Tunneling the door at everything"

- **Web → Native** seamless transition
- **Framework agnostic** - React, Vue, Svelte, Astro
- **Platform agnostic** - Linux, Windows, macOS, RedoxOS
- **Performance first** - No compromises

### Anti-Capitalist Tech

- **Open Source** - Forever free
- **Community driven** - No corporate control
- **Resource efficient** - Runs on old hardware
- **Privacy focused** - No telemetry, no tracking

## 🛠 Modular Architecture

```
packages/workspace-framework/
├── src/
│   ├── core/           # Core engine
│   ├── web/            # Web compositor
│   ├── native/         # Native bindings
│   ├── plugins/        # Plugin system
│   └── utils/          # Utilities
├── examples/           # Usage examples
├── docs/              # Documentation
└── tests/             # Test suites
```

## 🔥 Revolutionary Goals

1. **Destroy Windows monopoly** with better UX
2. **Empower developers** with web-like DX for native
3. **Democratize desktop development** - anyone can build
4. **Performance revolution** - Rust + Web technologies
5. **Community ownership** - No corporate overlords
