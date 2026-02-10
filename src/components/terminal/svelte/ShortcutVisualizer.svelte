<script lang="ts">
  import { type Readable } from "svelte/store";
  import { getContext } from "svelte";

  interface Shortcut {
    action: string;
    key: string;
    category?: string;
  }

  interface Props {
    shortcuts?: Shortcut[];
    _title?: string;
  }

  let { shortcuts = [], _title }: Props = $props();

  const isWindowFocused = getContext<Readable<boolean>>("window-focus");
  let activeKeyIndex = $state<null | string>(null);

  // High-quality defaults if none provided
  const defaultShortcuts: Shortcut[] = [
    { action: "switch workspace", category: "Global", key: "Alt+1-9" },
    { action: "kill window", category: "System", key: "Alt+Shift+Q" },
    { action: "launcher", category: "System", key: "Alt+D" },
    { action: "terminal", category: "System", key: "Alt+Enter" },
    { action: "toggle focus", category: "Window", key: "Alt+J/K" },
    { action: "split horizontal", category: "Window", key: "Alt+H" },
    { action: "split vertical", category: "Window", key: "Alt+V" },
  ];

  const displayShortcuts = $derived(
    shortcuts.length > 0 ? shortcuts : defaultShortcuts,
  );

  // Optimized grouping logic
  const groupByCategory = (items: Shortcut[]) => {
    const groups: Record<string, Shortcut[]> = {};
    items.forEach((s) => {
      const cat = s.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return Object.entries(groups).sort((a, b) => {
      // Put Navigation first if exists
      if (a[0] === "Navigation") return -1;
      if (b[0] === "Navigation") return 1;
      return a[0].localeCompare(b[0]);
    });
  };

  const categories = $derived(groupByCategory(displayShortcuts));

  function checkMatch(e: KeyboardEvent, keyString: string): boolean {
    const parts = keyString.split("+");
    const mainKey = parts[parts.length - 1].toLowerCase();

    const needsAlt = parts.includes("Alt") || parts.includes("Mod");
    const needsShift = parts.includes("Shift");
    const needsCtrl = parts.includes("Ctrl");

    if (needsAlt && !e.altKey) return false;
    if (needsShift && !e.shiftKey) return false;
    if (needsCtrl && !e.ctrlKey) return false;

    // If no modifiers needed, but modifiers pressed, don't match simple j/k
    if (
      !needsAlt &&
      !needsShift &&
      !needsCtrl &&
      (e.altKey || e.ctrlKey || e.metaKey)
    )
      return false;

    if (mainKey === "1-9") {
      const parsed = parseInt(e.key);
      return !isNaN(parsed) && parsed >= 1 && parsed <= 9;
    }

    if (mainKey.includes("/")) {
      const options = mainKey.split("/").map((o) => o.toLowerCase());
      return options.includes(e.key.toLowerCase());
    }

    if (mainKey === "?" && e.key === "?") return true;

    return e.key.toLowerCase() === mainKey;
  }

  function handleKeydown(e: KeyboardEvent) {
    const isGlobal = e.altKey || e.ctrlKey || e.metaKey;
    if (!$isWindowFocused && !isGlobal) return;

    const shortcut = displayShortcuts.find((s) => checkMatch(e, s.key));
    if (shortcut) {
      activeKeyIndex = shortcut.key;
      setTimeout(() => {
        if (activeKeyIndex === shortcut.key) activeKeyIndex = null;
      }, 300);
    }
  }

  function formatKey(key: string) {
    return key.split("+").map((p) => p.trim());
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="shortcuts-container">
  {#each categories as [category, group]}
    <div class="section">
      <div class="section-title">
        <span class="icon"></span>
        {category}
      </div>

      <div class="grid">
        {#each group as s}
          <div class="item" class:active={activeKeyIndex === s.key}>
            <div class="combo">
              {#each formatKey(s.key) as k, i}
                <kbd class="key">{k}</kbd>
                {#if i < formatKey(s.key).length - 1}
                  <span class="plus">+</span>
                {/if}
              {/each}
            </div>
            <div class="action">
              <span class="dots"></span>
              <span class="text">{s.action}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <div class="footer">
    <span class="hint">Press <kbd>?</kbd> for full command list</span>
  </div>
</div>

<style>
  .shortcuts-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.25rem;
    font-family: var(--font-mono, monospace);
    height: 100%;
    overflow-y: auto;
    background: transparent;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-title {
    color: var(--blue, #7aa2f7);
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.9;
  }

  .section-title .icon {
    font-size: 0.8rem;
    opacity: 0.6;
  }

  .grid {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.03);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .item:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .item.active {
    background: linear-gradient(
      90deg,
      rgba(122, 162, 247, 0.15) 0%,
      rgba(122, 162, 247, 0.05) 100%
    );
    border-color: var(--blue, #7aa2f7);
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .item.active::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--blue, #7aa2f7);
    box-shadow: 0 0 10px var(--blue);
  }

  .combo {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    z-index: 1;
  }

  .key {
    background: var(--bg-tertiary, #24283b);
    color: var(--cyan, #7dcfff);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    font-size: 0.65rem;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    min-width: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.1s;
  }

  .item.active .key {
    background: var(--blue, #7aa2f7);
    color: var(--bg-primary, #1a1b26);
    border-color: var(--blue, #7aa2f7);
    transform: translateY(1px);
    border-bottom-width: 1px;
    box-shadow: none;
  }

  .plus {
    font-size: 0.7rem;
    color: var(--text-muted, #565f89);
    font-weight: bold;
    opacity: 0.4;
  }

  .action {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 1rem;
    justify-content: flex-end;
    z-index: 1;
  }

  .dots {
    flex: 1;
    height: 1px;
    background: radial-gradient(circle, var(--border) 0%, transparent 100%);
    background-size: 4px 1px;
    opacity: 0.2;
    margin-right: 0.75rem;
  }

  .text {
    color: var(--text-secondary, #9aa5ce);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }

  .item.active .text {
    color: var(--text-primary, #c0caf5);
    font-weight: 600;
  }

  .footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    text-align: center;
  }

  .hint {
    font-size: 0.65rem;
    color: var(--text-muted);
    opacity: 0.7;
  }

  .hint kbd {
    color: var(--yellow);
    font-weight: bold;
    background: rgba(224, 175, 104, 0.1);
    padding: 1px 4px;
    border-radius: 2px;
  }

  /* Scrollbar Styling */
  .shortcuts-container::-webkit-scrollbar {
    width: 4px;
  }
  .shortcuts-container::-webkit-scrollbar-track {
    background: transparent;
  }
  .shortcuts-container::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
  }
  .shortcuts-container::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }
</style>
