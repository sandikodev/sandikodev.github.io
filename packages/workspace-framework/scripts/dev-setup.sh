#!/bin/bash
# RENDER Development Setup
# "Ruin your F*cking at door" - Cross-platform development environment

set -e

echo "🔥 RENDER Development Setup"
echo "💀 Preparing to revolutionize desktop development"

# Detect platform
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="macos"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    PLATFORM="windows"
else
    echo "❌ Unsupported platform: $OSTYPE"
    exit 1
fi

echo "🖥️ Platform detected: $PLATFORM"

# Check for WSL on Windows
if [[ "$PLATFORM" == "linux" ]] && grep -qi microsoft /proc/version 2>/dev/null; then
    echo "🪟 WSL detected - Windows refugee mode activated"
    PLATFORM="wsl"
fi

# Platform-specific setup
case $PLATFORM in
    "linux")
        echo "🐧 Setting up Linux development environment"
        
        # Check for Wayland
        if [[ -n "$WAYLAND_DISPLAY" ]]; then
            echo "🚀 Wayland detected - Maximum performance mode available"
        else
            echo "😤 X11 detected - Consider switching to Wayland for better performance"
        fi
        
        # Install dependencies
        if command -v apt &> /dev/null; then
            echo "📦 Installing dependencies via apt..."
            sudo apt update
            sudo apt install -y \
                build-essential \
                pkg-config \
                libwayland-dev \
                libxkbcommon-dev \
                libvulkan-dev \
                libasound2-dev
        elif command -v pacman &> /dev/null; then
            echo "📦 Installing dependencies via pacman..."
            sudo pacman -S --needed \
                base-devel \
                wayland \
                wayland-protocols \
                vulkan-headers \
                alsa-lib
        elif command -v dnf &> /dev/null; then
            echo "📦 Installing dependencies via dnf..."
            sudo dnf install -y \
                gcc \
                pkg-config \
                wayland-devel \
                libxkbcommon-devel \
                vulkan-headers \
                alsa-lib-devel
        fi
        ;;
        
    "wsl")
        echo "🪟 Setting up WSL development environment"
        echo "💡 Tip: Consider switching to native Linux for maximum performance"
        
        # WSL-specific setup
        sudo apt update
        sudo apt install -y \
            build-essential \
            pkg-config \
            libwayland-dev \
            libxkbcommon-dev
            
        # Check for WSLg
        if [[ -n "$WAYLAND_DISPLAY" ]]; then
            echo "🚀 WSLg detected - GUI support available"
        else
            echo "⚠️ No GUI support detected - Install WSLg for better experience"
        fi
        ;;
        
    "macos")
        echo "🍎 Setting up macOS development environment"
        echo "💡 Note: Some features may be limited compared to Linux"
        
        # Check for Homebrew
        if ! command -v brew &> /dev/null; then
            echo "📦 Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        fi
        
        # Install dependencies
        brew install \
            rust \
            nodejs \
            pnpm \
            pkg-config
        ;;
        
    "windows")
        echo "💀 Windows detected - This is not recommended"
        echo "🚨 Please use WSL2 for development"
        echo "📖 Setup guide: https://docs.microsoft.com/en-us/windows/wsl/install"
        exit 1
        ;;
esac

# Install Rust if not present
if ! command -v rustc &> /dev/null; then
    echo "🦀 Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source ~/.cargo/env
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://fnm.vercel.app/install | bash
    source ~/.bashrc
    fnm install --lts
    fnm use lts-latest
fi

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install Tauri CLI
echo "🚀 Installing Tauri CLI..."
cargo install tauri-cli

# Verify installation
echo ""
echo "✅ Installation verification:"
echo "🦀 Rust: $(rustc --version)"
echo "📦 Node.js: $(node --version)"
echo "📦 pnpm: $(pnpm --version)"
echo "🚀 Tauri: $(cargo tauri --version)"

echo ""
echo "🎉 RENDER development environment ready!"
echo "💀 Time to ruin Windows' day"
echo ""
echo "Next steps:"
echo "1. cd packages/workspace-framework"
echo "2. pnpm install"
echo "3. pnpm dev"
echo ""
echo "🔥 Let the revolution begin!"
