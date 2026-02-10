<script lang="ts">
  import { onMount } from "svelte";

  let visible = $state(false);
  let text = $state("");
  let timeout: any;

  // Global listener for keyboard notifications
  onMount(() => {
    const handleEvent = (e: any) => {
      text = e.detail.text;
      visible = true;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => visible = false, 1500);
    };

    window.addEventListener("kbd-notify", handleEvent);
    return () => window.removeEventListener("kbd-notify", handleEvent);
  });
</script>

{#if visible}
<div class="kbd-indicator show">
  {@html text}
</div>
{/if}

<style>
  .kbd-indicator {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--bg-secondary, #1f2335);
    border: 1px solid var(--border, #3b4261);
    padding: 8px 16px;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--text-primary, #c0caf5);
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .kbd-indicator.show {
    opacity: 1;
  }

  :global(.kbd-key) {
    display: inline-block;
    padding: 2px 6px;
    background: var(--bg-tertiary, #24283b);
    border: 1px solid var(--border, #3b4261);
    border-radius: 3px;
    font-size: 0.75rem;
    margin: 0 2px;
    color: var(--blue, #7aa2f7);
    font-weight: bold;
  }
</style>
