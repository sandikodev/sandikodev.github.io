<script lang="ts">
  // import { onMount } from "svelte";

  import { soundState } from "@/lib/stores/sound.svelte";

  // import { keyboardManager } from "./KeyboardManager.svelte";
  import { systemState } from "./SystemState.svelte";

  const workspaces = [
    { href: "/workspace", icon: "●", id: 1, name: "home" },
    { href: "/workspace/blog", icon: "●", id: 2, name: "blog" },
    { href: "/workspace/about", icon: "●", id: 3, name: "about" },
    { href: "/workspace/terminal", icon: "●", id: 4, name: "term" },
    { href: "/workspace/skills", icon: "●", id: 5, name: "skills" },
  ];
</script>

<header class="polybar">
  <div class="polybar-left">
    {#if systemState.wmMode !== "default"}
      <div class="bar-mode" data-mode={systemState.wmMode}>
        {systemState.wmMode.toUpperCase()} MODE
      </div>
    {/if}

    <!-- Workspaces -->
    <nav class="workspaces">
      {#each workspaces as ws (ws.id)}
        <a
          class="workspace"
          class:active={systemState.currentWorkspace === ws.id}
          data-ws={ws.id}
          href={ws.href}
        >
          {ws.id}:{ws.name}
        </a>
      {/each}
    </nav>
  </div>

  <div class="polybar-center">
    <span class="bar-title">dev@enigma</span>
  </div>

  <div class="polybar-right">
    <!-- CPU -->
    <span class="bar-module" title="CPU">
      <span class="module-icon">⚡</span>
      <span class="module-value">{systemState.cpuUsage}%</span>
    </span>

    <span class="bar-sep">│</span>

    <!-- Memory -->
    <span class="bar-module" title="Memory">
      <span class="module-icon">💾</span>
      <span class="module-value">{systemState.memUsage}G</span>
    </span>

    <span class="bar-sep">│</span>

    <!-- Network -->
    <span class="bar-module" title="Network">
      <span class="module-icon">📶</span>
      <span class="module-value">eth0</span>
    </span>

    <span class="bar-sep">│</span>

    <!-- Volume/Sound -->
    <button
      class="bar-sound-toggle-btn"
      title="Toggle sound"
      onclick={() => soundState.toggle()}
    >
      <span class="module-icon">{soundState.enabled ? "🔊" : "🔇"}</span>
    </button>

    <span class="bar-sep">│</span>

    <!-- Time -->
    <span class="bar-module">
      <span class="module-icon">🕐</span>
      <span class="module-value">{systemState.currentTime}</span>
    </span>

    <span class="bar-sep">│</span>

    <!-- Date -->
    <span class="bar-module">
      <span class="module-icon">📅</span>
      <span class="module-value">{systemState.currentDate}</span>
    </span>
  </div>
</header>

<style>
  .polybar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    padding: 0 8px;
    background: var(--bar-bg);
    border-bottom: 1px solid var(--i3-border-unfocused);
    font-family: var(--font-mono);
    font-size: 12px;
    z-index: 30000;
  }

  .polybar-left,
  .polybar-center,
  .polybar-right {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 100%;
  }

  .polybar-left {
    flex: 1;
  }
  .polybar-center {
    flex: 0;
  }
  .polybar-right {
    flex: 1;
    justify-content: flex-end;
  }

  .bar-mode {
    padding: 2px 8px;
    background: var(--blue);
    color: var(--i3-bg, #1a1b26);
    font-weight: 700;
    font-size: 10px;
    margin-right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .bar-mode[data-mode="resize"] {
    background: var(--yellow);
  }
  .bar-mode[data-mode="move"] {
    background: var(--magenta);
  }

  .workspaces {
    display: flex;
    gap: 2px;
    height: 100%;
  }

  .workspace {
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    background: transparent;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 11px;
    transition: all 0.1s;
  }

  .workspace:hover {
    background: var(--i3-title-bg);
    color: var(--bar-fg);
  }

  .workspace.active {
    background: var(--bar-accent);
    color: var(--i3-bg, #1a1b26);
    font-weight: 600;
  }

  .bar-title {
    color: var(--bar-fg);
    font-weight: 500;
  }

  .bar-module {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--bar-fg);
  }

  .module-icon {
    font-size: 10px;
  }
  .module-value {
    color: var(--text-secondary);
  }

  .bar-sep {
    color: var(--i3-border-unfocused);
    margin: 0 4px;
    opacity: 0.5;
  }

  .bar-sound-toggle-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0 4px;
    color: var(--bar-fg);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
  }

  .bar-sound-toggle-btn:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .polybar-center {
      display: none;
    }
    .bar-module:nth-child(n + 3):nth-child(-n + 6) {
      display: none;
    }
    .bar-sep:nth-child(n + 4):nth-child(-n + 7) {
      display: none;
    }
  }
</style>
