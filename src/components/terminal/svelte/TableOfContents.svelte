<script lang="ts">
  import { onMount, tick } from "svelte";

  export let headings: { depth: number; slug: string; text: string }[] = [];

  let activeSlug = "";
  let observer: IntersectionObserver;
  let tocContainer: HTMLElement;

  onMount(async () => {
    if (typeof window === "undefined" || headings.length === 0) return;

    await tick();
    // Beri waktu konten utama untuk selesai render ID-nya
    await new Promise((r) => setTimeout(r, 500));

    // Targetkan area scroll milik jendela utama (nvim)
    const scrollContainer = document.querySelector(
      ".col-main .terminal-scroll-area",
    );

    const options = {
      root: scrollContainer || null,
      rootMargin: "-10% 0px -80% 0px", // Fokus pada area atas layar
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Ambil elemen yang sedang terlihat di zona fokus
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        // Pilih yang paling atas
        const topMost = visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        )[0];
        activeSlug = topMost.target.id;

        // Scroll otomatis internal TOC agar item aktif tetap terlihat
        // Kita gunakan scroll container milik TerminalWindow outline
        const tocScrollArea = tocContainer?.closest(".terminal-scroll-area");
        const activeEl = tocContainer?.querySelector(
          `[data-slug="${activeSlug}"]`,
        ) as HTMLElement;

        if (tocScrollArea && activeEl) {
          const containerRect = tocScrollArea.getBoundingClientRect();
          const elRect = activeEl.getBoundingClientRect();

          if (
            elRect.top < containerRect.top ||
            elRect.bottom > containerRect.bottom
          ) {
            activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      }
    };

    observer = new IntersectionObserver(handleIntersect, options);

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });

    return () => {
      if (observer) observer.disconnect();
    };
  });

  function scrollToHeading(slug: string) {
    const element = document.getElementById(slug);
    if (element) {
      const scrollArea =
        element.closest(".terminal-scroll-area") ||
        document.querySelector(".col-main .terminal-scroll-area");
      if (scrollArea) {
        const top = element.offsetTop - 20;
        scrollArea.scrollTo({ top, behavior: "smooth" });
      }
      activeSlug = slug;
    }
  }

  function getTreeParts(index: number) {
    const current = headings[index];
    if (current.depth <= 1) return { prefix: "", connector: "" };

    const parts = [];
    for (let d = 2; d < current.depth; d++) {
      let needsPipe = false;
      for (let j = index + 1; j < headings.length; j++) {
        if (headings[j].depth === d) {
          needsPipe = true;
          break;
        }
        if (headings[j].depth < d) break;
      }
      parts.push(needsPipe ? "│  " : "   ");
    }

    let isLastAtDepth = true;
    for (let j = index + 1; j < headings.length; j++) {
      if (headings[j].depth === current.depth) {
        isLastAtDepth = false;
        break;
      }
      if (headings[j].depth < current.depth) break;
    }

    return {
      prefix: parts.join(""),
      connector: isLastAtDepth ? "└─ " : "├─ ",
    };
  }
</script>

<div class="toc-list" bind:this={tocContainer}>
  {#if headings.length === 0}
    <div class="toc-empty">
      <span class="error">[!]</span> No nodes found
    </div>
  {:else}
    {#each headings as heading, i (heading.slug)}
      {@const tree = getTreeParts(i)}
      <a
        href="#{heading.slug}"
        class="toc-item depth-{heading.depth} {activeSlug === heading.slug
          ? 'active'
          : ''}"
        data-slug={heading.slug}
        onclick={(e) => {
          e.preventDefault();
          scrollToHeading(heading.slug);
        }}
      >
        <span class="tree-prefix">{tree.prefix}{tree.connector}</span>
        <span class="marker">
          {#if activeSlug === heading.slug}
            <span class="active-marker">●</span>
          {:else}
            <span class="dot-marker">○</span>
          {/if}
        </span>
        <span class="text" title={heading.text}>{heading.text}</span>
      </a>
    {/each}
  {/if}

  <div class="toc-footer">
    <span class="info">NODE_COUNT: {headings.length}</span>
  </div>
</div>

<style>
  .toc-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    font-family: var(--font-mono, monospace);
    font-size: 0.8125rem;
  }

  .toc-item {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 2px 8px;
    cursor: pointer;
    transition: background 0.1s ease;
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }

  .toc-item:hover {
    background: rgba(122, 162, 247, 0.08);
  }

  .toc-item.active {
    color: var(--blue);
    background: rgba(122, 162, 247, 0.05);
  }

  .tree-prefix {
    color: var(--text-muted);
    opacity: 0.7;
    font-size: 11px;
    white-space: pre;
    flex-shrink: 0;
  }

  .marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    flex-shrink: 0;
    margin-right: 4px;
  }

  .dot-marker {
    font-size: 10px;
    opacity: 0.3;
  }

  .active-marker {
    font-size: 10px;
    color: var(--blue);
    filter: drop-shadow(0 0 3px var(--blue));
  }

  .text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .toc-item.active .text {
    font-weight: 600;
  }

  .depth-1 {
    color: var(--magenta);
    font-weight: 600;
    margin-top: 8px;
  }
  .depth-2 {
    color: var(--text-primary);
  }
  .depth-3 {
    color: var(--text-secondary);
    font-size: 0.75rem;
  }

  .toc-footer {
    margin-top: 16px;
    padding: 8px 12px;
    border-top: 1px dashed var(--border);
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 0.05rem;
    opacity: 0.6;
  }

  .toc-empty {
    color: var(--red);
    padding: 8px;
    font-size: 0.75rem;
  }
</style>
