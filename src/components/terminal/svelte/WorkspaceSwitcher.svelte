<script lang="ts">
  import { systemState } from "./SystemState.svelte";

  let visible = $state(false);
  let timeout: any;

  // React to workspace changes
  $effect(() => {
    const _ws = systemState.currentWorkspace;
    // Show indicator
    visible = true;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      visible = false;
    }, 2000);
  });
</script>

<div class="workspace-indicator" class:show={visible}>
  <span class="workspace-text">Workspace:</span>
  <span class="current-workspace">{systemState.currentWorkspace}</span>
</div>

<style>
  .workspace-indicator {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    background: var(--bg-secondary, #1f2335);
    border: 1px solid var(--border, #3b4261);
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--text-primary, #c0caf5);
    z-index: 9999;
    pointer-events: none;

    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  .workspace-indicator.show {
    opacity: 1;
    transform: translateY(0);
  }

  .workspace-text {
    color: var(--text-muted, #565f89);
    margin-right: 0.5rem;
  }

  .current-workspace {
    color: var(--blue, #7aa2f7);
    font-weight: 700;
  }

  /* Mobile - hide on small screens */
  @media (max-width: 768px) {
    .workspace-indicator {
      display: none;
    }
  }
</style>
