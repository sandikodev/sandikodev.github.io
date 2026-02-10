<script lang="ts">
  import { onMount } from "svelte";

  // import { systemState } from "./SystemState.svelte";

  let visible = $state(false);

  function toggle() {
    visible = !visible;
  }

  function close() {
    visible = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && visible) {
      close();
    }
    // Shift + ? to toggle
    if (e.shiftKey && e.key === "?") {
      e.preventDefault();
      toggle();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    // Expose for external triggers (e.g. Polybar click)
    (window as any).toggleHelp = toggle;
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      delete (window as any).toggleHelp;
    };
  });

  const shortcuts = [
    { desc: "Open Terminal", key: "Mod + Return" },
    { desc: "Command Palette", key: "Mod + D" },
    { desc: "Close Window", key: "Mod + Q" },
    { desc: "Toggle Fullscreen", key: "Mod + F" },
    { desc: "Focus Window", key: "Mod + H/J/K/L" },
    { desc: "Toggle Floating", key: "Mod + Shift + Space" },
    { desc: "Switch Workspace", key: "Mod + 1-9" },
    { desc: "Toggle Scratchpad", key: "Ctrl + `" },
    { desc: "Toggle Help", key: "?" },
  ];
</script>

{#if visible}
  <button
    class="help-modal-backdrop"
    onclick={close}
    onkeydown={(e) => {
      if (e.key === "Escape" || e.key === "Enter") close();
    }}
    aria-label="Close help modal"
    type="button"
  ></button>
  <div class="help-modal">
    <div class="modal-header">
      <span class="title">i3wm Quick Reference</span>
      <button class="close-btn" onclick={close}>×</button>
    </div>
    <div class="modal-content">
      <div class="shortcut-grid">
        {#each shortcuts as s (s.key)}
          <div class="shortcut-item">
            <kbd>{s.key}</kbd>
            <span class="description">{s.desc}</span>
          </div>
        {/each}
      </div>
      <div class="modal-footer">
        <p>Mod key is Alt or Super (Win/Cmd)</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .help-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(2px);
    z-index: 10000;
  }

  .help-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    background: var(--bg-primary, #1a1b26);
    border: 1px solid var(--border, #414868);
    border-radius: 8px;
    z-index: 10001;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-secondary, #24283b);
    border-bottom: 1px solid var(--border, #414868);
  }

  .title {
    font-weight: 600;
    color: var(--accent, #7aa2f7);
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-muted, #565f89);
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 4px;
  }

  .close-btn:hover {
    color: var(--text-primary, #a9b1d6);
  }

  .modal-content {
    padding: 16px;
  }

  .shortcut-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    border-radius: 4px;
  }

  .shortcut-item:hover {
    background: var(--bg-secondary, #24283b);
  }

  kbd {
    background: var(--bg-tertiary, #292e42);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: var(--font-mono);
    border: 1px solid var(--border, #414868);
    font-size: 0.85rem;
    color: var(--text-primary, #c0caf5);
  }

  .description {
    color: var(--text-secondary, #a9b1d6);
    font-size: 0.9rem;
  }

  .modal-footer {
    margin-top: 16px;
    border-top: 1px solid var(--border, #414868);
    text-align: center;
    color: var(--text-muted, #565f89);
    font-size: 0.8rem;
    font-style: italic;
  }
</style>
