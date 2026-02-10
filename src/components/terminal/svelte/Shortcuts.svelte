<script lang="ts">
  interface Shortcut {
    action: string;
    key: string;
  }

  interface Props {
    shortcuts?: Shortcut[];
    title?: string;
  }

  let {
    shortcuts = [
      { action: "switch workspace", key: "Alt+1-9" },
      { action: "kill window", key: "Alt+Shift+Q" },
      { action: "launcher", key: "Alt+D" },
      { action: "terminal", key: "Alt+Enter" },
      { action: "focus move", key: "Alt+H/J/K/L" },
    ],
  }: Props = $props();
</script>

<div class="shortcuts-container">
  {#each shortcuts as s}
    <div class="shortcut-row">
      <kbd>{s.key}</kbd>
      <span class="shortcut-action">{s.action}</span>
    </div>
  {/each}
</div>

<style>
  .shortcuts-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.85rem;
    font-family: var(--font-mono, monospace);
  }

  .shortcut-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text-secondary, #9aa5ce);
  }

  kbd {
    background: rgba(255, 255, 255, 0.05);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    color: var(--cyan, #7dcfff);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-width: 60px;
    text-align: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
  }

  .shortcut-action {
    opacity: 0.8;
  }
</style>
