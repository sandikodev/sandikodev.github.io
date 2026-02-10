<script lang="ts">
  import { onMount, type Snippet } from "svelte";

  interface Props {
    className?: string;
    containerHeight?: number;
    itemHeight?: number;
    items: any[];
    row: Snippet<[any, number]>;
  }

  let {
    className = "",
    containerHeight: initialHeight = 0,
    itemHeight = 50,
    items = [],
    row,
  }: Props = $props();

  let viewport: HTMLElement;
  let scrollTop = $state(0);
  let viewportHeight = $derived(initialHeight);

  let resizeObserver: ResizeObserver;

  // Virtualization logic
  let buffer = 5;

  let visibleCount = $derived(Math.ceil(viewportHeight / itemHeight));
  let startIndex = $derived(
    Math.max(0, Math.floor(scrollTop / itemHeight) - buffer),
  );
  let endIndex = $derived(
    Math.min(items.length - 1, startIndex + visibleCount + buffer * 2),
  );

  let visibleItems = $derived(items.slice(startIndex, endIndex + 1));

  let paddingTop = $derived(startIndex * itemHeight);
  let paddingBottom = $derived(
    Math.max(0, (items.length - endIndex - 1) * itemHeight),
  );

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    scrollTop = target.scrollTop;
  }

  onMount(() => {
    if (initialHeight === 0 && viewport) {
      // Measure parent/self
      viewportHeight = viewport.clientHeight || 400; // Default fallback
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          viewportHeight = entry.contentRect.height;
        }
      });
      resizeObserver.observe(viewport);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  });

  // Expose methods via export is harder with runes in specific setups,
  // but we can bind to the component instance if needed.
  // For now, parent drives everything via props or we rely on internal behavior.

  export function scrollToIndex(index: number) {
    if (viewport) {
      viewport.scrollTop = index * itemHeight;
    }
  }
</script>

<div
  class="virtual-scroll-container {className}"
  style:height={initialHeight ? `${initialHeight}px` : "100%"}
>
  <div
    class="virtual-scroll-viewport"
    bind:this={viewport}
    onscroll={handleScroll}
  >
    <div
      class="virtual-scroll-content"
      style:padding-top="{paddingTop}px"
      style:padding-bottom="{paddingBottom}px"
    >
      {#each visibleItems as item, i (startIndex + i)}
        <div class="virtual-item" style:height="{itemHeight}px">
          {@render row(item, startIndex + i)}
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .virtual-scroll-container {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .virtual-scroll-viewport {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .virtual-scroll-content {
    box-sizing: border-box;
  }

  .virtual-item {
    display: flow-root;
  }

  .virtual-scroll-viewport::-webkit-scrollbar {
    width: 6px;
  }

  .virtual-scroll-viewport::-webkit-scrollbar-track {
    background: transparent;
  }

  .virtual-scroll-viewport::-webkit-scrollbar-thumb {
    background: var(--border-color, #414868);
    border-radius: 3px;
  }

  .virtual-scroll-viewport::-webkit-scrollbar-thumb:hover {
    background: var(--accent-color, #7aa2f7);
  }
</style>
