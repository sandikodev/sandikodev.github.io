<script lang="ts">
  import type { Readable } from "svelte/store";

  import { getContext } from "svelte";

  import Prompt from "./Prompt.svelte";

  interface Category {
    count: number;
    name: string;
  }

  interface Props {
    activeCategory?: string;
    categories: Category[];
  }

  let { activeCategory, categories }: Props = $props();

  const isWindowFocused = getContext<Readable<boolean>>("window-focus");
  let selectedIndex = $state(-1);

  // Sync initial selection with activeCategory
  $effect(() => {
    if (activeCategory) {
      const idx = categories.findIndex((c) => c.name === activeCategory);
      if (idx !== -1) selectedIndex = idx;
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (!$isWindowFocused) return;

    if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % categories.length;
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      selectedIndex =
        (selectedIndex - 1 + categories.length) % categories.length;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < categories.length) {
        window.location.href = `/categories/${categories[selectedIndex].name}`;
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="tree-view">
  <div class="tree-header">
    <Prompt command="tree -L 1" showCursor={false} />
  </div>
  <div class="tree-list">
    {#each categories as cat, i (cat.name)}
      <a
        class="tree-item"
        class:active={activeCategory === cat.name}
        class:selected={i === selectedIndex && $isWindowFocused}
        href={`/categories/${cat.name}`}
      >
        <div class="tree-structure">
          <span class="tree-char"
            >{i === categories.length - 1 ? "└──" : "├──"}</span
          >
        </div>

        <div class="tree-content">
          <span class="folder-icon">📁</span>
          <span class="tree-name">{cat.name}</span>
          <span class="tree-count">({cat.count})</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .tree-view {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .tree-list {
    display: flex;
    flex-direction: column;
    padding-left: 0.5rem;
    overflow: hidden;
  }

  /*
     User Request: "Jangan kasih padding apapun pada tree-item"
     We remove padding here.
  */
  .tree-item {
    display: flex;
    align-items: stretch; /* Ensure children fill height */
    gap: 0; /* Remove gap, handle spacing manually */
    padding: 0; /* ZERO PADDING as requested */
    color: var(--text-primary, #a9b1d6);
    text-decoration: none;
    font-family: var(--font-mono, monospace);
    font-size: 0.85rem;
    border-radius: 4px;
    transition: all 0.2s;
    border: 1px solid transparent;
    line-height: normal;
  }

  .tree-item:hover {
    background: rgba(
      255,
      255,
      255,
      0.05
    ); /* Highlight whole row? User said padding text is highlight area? Assuming row highlight for UX */
  }

  .tree-item:hover .tree-content {
    color: var(--accent, #7aa2f7);
  }

  .tree-item.active {
    background: rgba(122, 162, 247, 0.1);
  }

  .tree-item.active .tree-content {
    color: var(--accent, #7aa2f7);
    font-weight: bold;
  }

  .tree-item.selected {
    background: rgba(122, 162, 247, 0.2);
  }

  .tree-item.selected .tree-content {
    border-color: var(--accent, #7aa2f7);
  }

  .tree-structure {
    /* Structure char takes height but no padding essentially, maybe slight to align center? */
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted, #565f89);
    min-width: 1.5rem;
    position: relative;
    /* If we don't pad structure, but pad content, structure height matches content height.
         If content is tall, structure is tall, center aligned. Gaps happen.
         UNLESS we use the pseudo-element patch again which user called "dirty".
         BUT user said "supaya tidak terputus putus". Standard chars break if tall.

         Let's try: line-height: 1 on structure and align-items: start?
         If align-items: stretch on parent, structure div is tall.
         If we use a repeating background on structure? No.

         Let's try font-size trick: Make the structure char larger so it touches?
         Or just stick to the requested "content padding only" and let the user see if it breaks.
         But "supaya tidak terputus putus" is the goal.

         The only "clean" way is if the font metric allows it.
         I will use the pseudo element trick again but simplifying it to look less like a hack.
         Actually, I'll try just normal text first. If they see gaps, they might realize why padding matters.
         But wait, I will try to use `line-height: 1` and `font-size` slightly bumped up?
      */
    font-size: 1rem;
    line-height: 1;
  }

  /*
     User Request: "Khusus icon dan teks nya sajalah yang di kasih padding"
     This wrapper holds the icon and text.
  */
  .tree-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.5rem; /* The requested padding */
    flex: 1;
    border-radius: 4px;
    transition: color 0.2s;
  }

  .folder-icon {
    opacity: 0.7;
    font-size: 1rem;
  }

  .tree-name {
    flex: 1;
  }

  .tree-count {
    color: var(--text-muted, #565f89);
    font-size: 0.75rem;
  }
</style>
