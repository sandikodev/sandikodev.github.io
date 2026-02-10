<script lang="ts">
  import type { Snippet } from "svelte";

  import I3Window from "./I3Window.svelte";
  import Prompt from "./Prompt.svelte";

  interface Props {
    children?: Snippet;
    class?: string;
    flush?: boolean;
    focused?: boolean;
    footer?: Snippet;
    header?: Snippet;
    noOverflow?: boolean;
    onClose?: () => void;
    promptPath?: string;
    showCursor?: boolean;
    title: string;
  }

  let {
    children = undefined,
    class: className = "",
    flush = false,
    focused = $bindable(false),
    footer = undefined,
    header = undefined,
    noOverflow = true,
    onClose = undefined,
    promptPath = "",
    showCursor = true,
    title,
  }: Props = $props();
</script>

<I3Window
  bind:focused
  {title}
  {noOverflow}
  {onClose}
  resizable={true}
  class="terminal-window-wrapper {className}"
>
  <div class="terminal-flex-container {flush ? 'flush' : ''}">
    {#if header}
      <div class="terminal-header">
        {@render header?.()}
      </div>
    {:else if promptPath !== ""}
      <div class="terminal-header">
        <Prompt path={promptPath} {showCursor} />
      </div>
    {/if}

    <div class="terminal-scroll-area">
      {@render children?.()}
    </div>

    {#if footer}
      <div class="terminal-footer">
        {@render footer?.()}
      </div>
    {/if}
  </div>
</I3Window>

<style>
  .terminal-flex-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg-primary, #1a1b26);
    color: var(--text-secondary, #a9b1d6);
    font-family: var(--font-mono, monospace);
  }

  .terminal-header {
    flex-shrink: 0;
    padding: 12px 16px 4px 16px;
  }

  .terminal-flex-container.flush .terminal-header {
    padding: 12px 14px 4px 14px;
  }

  .terminal-scroll-area {
    flex: 1;
    overflow-y: auto;
    padding: 4px 16px 16px 16px;
    font-size: 13px;
    line-height: 1.6;
    /* Custom Scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--bg-tertiary) var(--bg-primary);
  }

  .terminal-flex-container.flush .terminal-scroll-area {
    padding: 0;
  }

  .terminal-scroll-area::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .terminal-scroll-area::-webkit-scrollbar-track {
    background: transparent;
  }

  .terminal-scroll-area::-webkit-scrollbar-thumb {
    background: rgba(122, 162, 247, 0.2);
    border-radius: 10px;
  }

  .terminal-scroll-area::-webkit-scrollbar-thumb:hover {
    background: rgba(122, 162, 247, 0.5);
  }

  .terminal-footer {
    flex-shrink: 0;
  }
</style>
