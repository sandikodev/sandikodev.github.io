<script lang="ts">
  import { getContext } from "svelte";
  import { type Readable } from "svelte/store";

  interface Props {
    activeTag?: string;
    limit?: number;
    tags: string[];
  }

  let { activeTag, limit = 15, tags }: Props = $props();
  let displayTags = $derived(tags.slice(0, limit));

  const isWindowFocused = getContext<Readable<boolean>>("window-focus");
  let selectedIndex = $state(-1);

  // Sync initial selection
  $effect(() => {
    if (activeTag) {
      const idx = displayTags.findIndex((t) => t === activeTag);
      if (idx !== -1) selectedIndex = idx;
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (!$isWindowFocused) return;

    if (e.key === "ArrowRight" || e.key === "l") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % displayTags.length;
    } else if (e.key === "ArrowLeft" || e.key === "h") {
      e.preventDefault();
      selectedIndex =
        (selectedIndex - 1 + displayTags.length) % displayTags.length;
    } else if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      // Simple grid navigation logic (assuming ~3 items per row)
      const next = selectedIndex + 3;
      selectedIndex = next < displayTags.length ? next : selectedIndex;
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      const prev = selectedIndex - 3;
      selectedIndex = prev >= 0 ? prev : selectedIndex;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < displayTags.length) {
        window.location.href = `/tags/${displayTags[selectedIndex]}`;
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="tag-cloud">
  {#each displayTags as tag, i}
    <a
      class="tag-item"
      class:active={activeTag === tag}
      class:selected={i === selectedIndex && $isWindowFocused}
      href={`/tags/${tag}`}
    >
      <span class="tag-hash">#</span>
      {tag}
    </a>
  {/each}
</div>

<style>
  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }

  .tag-item {
    font-family: var(--font-mono, monospace);
    font-size: 0.8rem;
    color: var(--text-secondary, #9aa5ce);
    text-decoration: none;
    padding: 0.2rem 0.6rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    transition: all 0.2s;
  }

  .tag-item:hover {
    background: rgba(122, 162, 247, 0.1);
    color: var(--accent, #7aa2f7);
    border-color: rgba(122, 162, 247, 0.2);
    transform: translateY(-1px);
  }

  .tag-item.active {
    background: var(--accent, #7aa2f7);
    color: #1a1b26;
    border-color: var(--accent, #7aa2f7);
  }

  .tag-item.selected {
    border-color: var(--accent, #7aa2f7);
    box-shadow: 0 0 0 2px rgba(122, 162, 247, 0.3);
  }

  .tag-hash {
    opacity: 0.5;
    margin-right: 1px;
  }
</style>
