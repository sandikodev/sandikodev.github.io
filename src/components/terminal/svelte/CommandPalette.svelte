<script lang="ts">
  import { onMount, tick } from "svelte";

  // import { systemState } from "./SystemState.svelte";

  let isOpen = $state(false);
  let query = $state("");
  let selectedIndex = $state(0);
  let inputElement = $state<HTMLInputElement>();
  let resultsContainer = $state<HTMLElement>();

  // Command Inteface
  interface Command {
    action: () => void;
    category: "Actions" | "Navigation" | "Search" | "System";
    icon: string;
    id: string;
    label: string;
    shortcut?: string;
  }

  // Predefined Commands
  const baseCommands: Command[] = [
    {
      action: () => (window.location.href = "/"),
      category: "Navigation",
      icon: "🏠",
      id: "home",
      label: "Go to Home",
      shortcut: "gh",
    },
    {
      action: () => (window.location.href = "/workspace/blog"),
      category: "Navigation",
      icon: "📝",
      id: "blog",
      label: "Go to Blog",
      shortcut: "gb",
    },
    {
      action: () => (window.location.href = "/workspace/about"),
      category: "Navigation",
      icon: "👤",
      id: "about",
      label: "About",
    },
    {
      action: () => (window.location.href = "/workspace/terminal"),
      category: "Navigation",
      icon: "💻",
      id: "terminal",
      label: "Terminal Playground",
    },
    {
      action: () => {
        const event = new KeyboardEvent("keydown", { key: "t" });
        window.dispatchEvent(event);
      },
      category: "Actions",
      icon: "🎨",
      id: "theme",
      label: "Cycle Theme",
      shortcut: "t",
    },
    {
      action: () => window.scrollTo({ behavior: "smooth", top: 0 }),
      category: "Actions",
      icon: "⬆️",
      id: "scroll-top",
      label: "Scroll to Top",
      shortcut: "gg",
    },
    {
      action: () =>
        window.scrollTo({
          behavior: "smooth",
          top: document.body.scrollHeight,
        }),
      category: "Actions",
      icon: "⬇️",
      id: "scroll-bottom",
      label: "Scroll to Bottom",
      shortcut: "G",
    },
    {
      action: () => window.location.reload(),
      category: "System",
      icon: "🔄",
      id: "reload",
      label: "Reload Window",
    },
  ];

  // Derived filtered commands
  let filteredCommands = $derived.by(() => {
    if (!query.trim()) return baseCommands;

    const lowerQuery = query.toLowerCase();
    return baseCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.category.toLowerCase().includes(lowerQuery),
    );
  });

  // Group commands by category for display
  let groupedCommands = $derived.by(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  });

  function open() {
    isOpen = true;
    query = "";
    selectedIndex = 0;
    tick().then(() => inputElement?.focus());
  }

  function close() {
    isOpen = false;
  }

  function execute(cmd: Command) {
    cmd.action();
    close();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) {
      // Toggle shortcut: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      }
      // Integration with global Alt+D (handled by KeyboardManager generally, but we listen here too for direct toggle if preferred)
      if (e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % filteredCommands.length;
        scrollToSelected();
        break;
      case "ArrowUp":
        e.preventDefault();
        selectedIndex =
          (selectedIndex - 1 + filteredCommands.length) %
          filteredCommands.length;
        scrollToSelected();
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          execute(filteredCommands[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  }

  function scrollToSelected() {
    tick().then(() => {
      const selectedEl = resultsContainer?.querySelector(
        ".result-item.selected",
      );
      selectedEl?.scrollIntoView({ block: "nearest" });
    });
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });
</script>

{#if isOpen}
  <div
    class="command-palette-overlay"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    onclick={(e) => {
      if (e.target === e.currentTarget) close();
    }}
    onkeydown={(e) => {
      if (e.key === "Escape") close();
    }}
  >
    <div class="palette-container">
      <div class="search-header">
        <span class="search-icon">🚀</span>
        <input
          bind:this={inputElement}
          bind:value={query}
          class="search-input"
          placeholder="Type a command..."
          spellcheck="false"
          autocomplete="off"
        />
        {#if query}
          <span class="result-count">{filteredCommands.length} matches</span>
        {/if}
      </div>

      <div class="results-list" bind:this={resultsContainer}>
        {#if filteredCommands.length === 0}
          <div class="no-results">
            No commands found for "{query}"
          </div>
        {:else}
          {#each Object.entries(groupedCommands) as [category, commands] (category)}
            <div class="command-group">
              <div class="group-title">{category}</div>
              {#each commands as cmd (cmd.id)}
                {@const index = filteredCommands.indexOf(cmd)}
                <button
                  class="result-item"
                  class:selected={index === selectedIndex}
                  onclick={() => execute(cmd)}
                  onmouseenter={() => (selectedIndex = index)}
                  type="button"
                >
                  <span class="item-icon">{cmd.icon}</span>
                  <div class="item-info">
                    <span class="item-label">{cmd.label}</span>
                  </div>
                  {#if cmd.shortcut}
                    <kbd class="item-shortcut">{cmd.shortcut}</kbd>
                  {/if}
                </button>
              {/each}
            </div>
          {/each}
        {/if}
      </div>

      <div class="palette-footer">
        <div class="footer-hint">
          <kbd>↑↓</kbd> Navigate
          <kbd>↵</kbd> Select
          <kbd>Esc</kbd> Close
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .command-palette-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.15s ease-out;
  }

  .palette-container {
    width: 90%;
    max-width: 600px;
    background: var(--bg-primary, #1a1b26);
    border: 1px solid var(--border, #414868);
    border-radius: 12px;
    z-index: 9999;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    max-height: 500px;
    /* Reset fixed positioning */
    position: relative;
    top: auto;
    left: auto;
    transform: none;
  }

  .search-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border, #414868);
    gap: 12px;
  }

  .search-icon {
    font-size: 1.2rem;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary, #c0caf5);
    font-family: var(--font-mono, monospace);
    font-size: 1.1rem;
    outline: none;
  }

  .result-count {
    font-size: 0.75rem;
    color: var(--text-muted, #565f89);
    background: var(--bg-secondary, #24283b);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .results-list {
    overflow-y: auto;
    padding: 8px;
    scroll-behavior: smooth;
  }

  .command-group {
    margin-bottom: 8px;
  }

  .group-title {
    font-size: 0.7rem;
    color: var(--text-muted, #565f89);
    padding: 4px 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
  }

  .result-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    gap: 12px;
    transition: all 0.1s;
    color: var(--text-secondary, #a9b1d6);
    background: transparent;
    border: none;
    width: 100%;
    text-align: left;
    font: inherit;
    outline: none;
  }

  .result-item.selected {
    background: var(--bg-tertiary, #292e42);
    color: var(--accent, #7aa2f7);
  }

  .item-icon {
    font-size: 1.1rem;
    width: 24px;
    text-align: center;
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .item-label {
    font-weight: 500;
    font-size: 0.95rem;
  }

  .item-shortcut {
    background: var(--bg-secondary, #24283b);
    border: 1px solid var(--border, #414868);
    color: var(--text-muted, #565f89);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
  }

  .result-item.selected .item-shortcut {
    border-color: var(--accent, #7aa2f7);
    color: var(--accent, #7aa2f7);
  }

  .no-results {
    padding: 2rem;
    text-align: center;
    color: var(--text-muted, #565f89);
  }

  .palette-footer {
    padding: 8px 16px;
    background: var(--bg-secondary, #1f2335);
    border-top: 1px solid var(--border, #414868);
    font-size: 0.75rem;
    color: var(--text-muted, #565f89);
  }

  .footer-hint kbd {
    background: var(--bg-tertiary, #292e42);
    padding: 1px 4px;
    border-radius: 3px;
    margin: 0 2px;
    border: 1px solid var(--border, #414868);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
</style>
