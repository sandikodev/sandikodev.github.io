<script lang="ts">
  import { onMount } from "svelte";

  let visible = $state(false);
  let logs = $state<string[]>([]);
  let _currentPath = $state("");

  const kernelLogs = [
    "Initializing i3wm-core...",
    "Mounting /system/workspace...",
    "Checking peripherals...",
    "Loading window manager engine...",
    "Syncing layout state from local storage...",
    "Establishing RPC connection [OK]",
    "Initializing UI drivers [OK]",
    "Loading environment modules...",
    "Kernel version: 5.10.x-antigravity",
    "System integrity verified...",
    "Optimizing graphics buffer...",
  ];

  function generateLogs(path: string) {
    const pathLog = `[ OK ] Mounting ${path}...`;

    // Select 4-5 random logs + the path log
    const selected = kernelLogs
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((l) => `[  ${(Math.random() * 0.5).toFixed(6)}] ${l}`);

    selected.push(`[  ${(Math.random() * 0.5 + 0.5).toFixed(6)}] ${pathLog}`);
    logs = selected;
  }

  onMount(() => {
    const startListener = (e: any) => {
      _currentPath = e.detail?.url || window.location.pathname;
      generateLogs(_currentPath);
      visible = true;
    };

    const stopListener = () => {
      // Small delay to let the logs be seen but keep it snappy
      setTimeout(() => {
        visible = false;
        // Notify that the overlay is exiting so flash can trigger
        window.dispatchEvent(new CustomEvent("os-boot-done"));
        // Keep logs for a moment then clear
        setTimeout(() => (logs = []), 300);
      }, 300);
    };

    window.addEventListener("os-boot-start", startListener);
    window.addEventListener("os-boot-stop", stopListener);

    return () => {
      window.removeEventListener("os-boot-start", startListener);
      window.removeEventListener("os-boot-stop", stopListener);
    };
  });
</script>

{#if visible}
  <div class="boot-overlay" class:fade-out={!visible}>
    <div class="log-container">
      {#each logs as log, i (i)}
        <div class="log-line">{log}</div>
      {/each}
      <div class="cursor">_</div>
    </div>
    <div class="scanline"></div>
    <div class="noise"></div>
  </div>
{/if}

<style>
  .boot-overlay {
    position: fixed;
    top: 28px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 28px);
    background: #0d0e14;
    z-index: 20000;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 4rem 2rem 2rem 2rem;
    pointer-events: none;
    font-family: var(--font-mono, monospace);
  }

  .log-container {
    color: #a9b1d6;
    font-size: 0.85rem;
    line-height: 1.4;
    text-shadow: 0 0 5px rgba(122, 162, 247, 0.5);
  }

  .log-line {
    white-space: pre-wrap;
    animation: blink 0.05s steps(1);
  }

  .cursor {
    display: inline-block;
    color: #7aa2f7;
    animation: blink-cursor 0.5s infinite;
  }

  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 51%,
      transparent 100%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scanline 10s linear infinite;
    z-index: 20001;
    opacity: 0.3;
  }

  .noise {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.05;
    pointer-events: none;
    z-index: 20002;
  }

  @keyframes blink-cursor {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @keyframes scanline {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-out {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
</style>
