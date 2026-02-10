<script lang="ts">
  import { onMount } from "svelte";

  import { blogState, type Post } from "./BlogState.svelte.ts";
  import VirtualScroll from "./VirtualScroll.svelte";

  interface Props {
    posts: Post[];
  }

  let { posts = [] }: Props = $props();

  let selectedIndex = $state(0);
  let virtualScroll: any; // VirtualScroll instance

  $effect(() => {
    if (posts[selectedIndex]) {
      blogState.selectedPost = posts[selectedIndex];
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA"
    )
      return;

    const key = e.key.toLowerCase();

    if (key === "j") {
      e.preventDefault();
      if (selectedIndex < posts.length - 1) {
        selectedIndex++;
        scrollToSelection();
      }
    } else if (key === "k") {
      e.preventDefault();
      if (selectedIndex > 0) {
        selectedIndex--;
        scrollToSelection();
      }
    } else if (key === "enter") {
      e.preventDefault();
      if (posts[selectedIndex]) {
        window.location.href = `/workspace/blog/${posts[selectedIndex].id}`;
      }
    }
  }

  function scrollToSelection() {
    if (virtualScroll) {
      virtualScroll.scrollToIndex(startIndexFromSelection());
    }
  }

  function startIndexFromSelection() {
    // Small helper to keep selection in view
    return selectedIndex;
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  function formatDate(date: Date | string | undefined) {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
</script>

<div class="blog-list-container">
  <VirtualScroll
    items={posts}
    itemHeight={112}
    className="post-list-virtual"
    bind:this={virtualScroll}
  >
    {#snippet row(post: Post, index: number)}
      <div class="post-card" class:selected={index === selectedIndex}>
        <a
          href="/workspace/blog/{post.id}"
          class="post-link"
          onclick={() => (selectedIndex = index)}
          onfocus={() => (selectedIndex = index)}
          onkeydown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
              window.location.href = `/workspace/blog/${post.id}`;
            }
          }}
          aria-current={index === selectedIndex ? "true" : undefined}
        >
          <div class="post-header">
            <span class="post-icon">📄</span>
            <h3 class="post-title">{post.data.title}</h3>
          </div>

          <div class="post-meta">
            <span class="post-date">
              📅 {formatDate(post.data.date)}
            </span>
            {#if post.data.authors}
              <span class="post-author">
                👤 {post.data.authors[0]}
              </span>
            {/if}
          </div>

          <div class="post-footer">
            <div class="post-tags">
              {#each (post.data.tags || []).slice(0, 3) as tag (tag)}
                <span class="tag">#{tag}</span>
              {/each}
            </div>
            <span
              class="post-arrow"
              style:opacity={index === selectedIndex ? 1 : 0}>→</span
            >
          </div>
        </a>
      </div>
    {/snippet}
  </VirtualScroll>
</div>

<style>
  .blog-list-container {
    height: 100%;
    overflow: hidden;
    padding: 0; /* REMOVED OUTER PADDING - handled by TerminalWindow flush */
  }

  /* Fixed height cards as requested before, but restoring structural detail */
  .post-card {
    background: var(--bg-secondary, #24283b);
    border: 1px solid var(--border, #414868);
    border-radius: 6px;
    padding: 0;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100px; /* Precise height for virtualization */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 6px 10px; /* Tighter margins */
    position: relative;
    overflow: hidden;
  }

  .post-card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--blue, #7aa2f7);
    transform: scaleY(0);
    transition: transform 0.2s;
  }

  .post-card:hover,
  .post-card.selected {
    background: var(--bg-tertiary, #292e42);
    border-color: var(--blue, #7aa2f7);
    transform: translateX(4px);
  }

  .post-card:hover::before,
  .post-card.selected::before {
    transform: scaleY(1);
  }

  .post-card.selected {
    background: rgba(122, 162, 247, 0.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .post-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    gap: 6px;
    min-width: 0;
    padding: 12px 16px;
    box-sizing: border-box;
  }

  .post-header {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .post-icon {
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  .post-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary, #c0caf5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }

  .post-meta {
    display: flex;
    gap: 16px;
    font-size: 0.75rem;
    color: var(--text-muted, #565f89);
    margin-left: 28px;
    align-items: center;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 28px;
    height: 24px;
    margin-top: 4px;
  }

  .post-tags {
    display: flex;
    gap: 6px;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .tag {
    color: var(--cyan, #7dcfff);
    font-size: 0.7rem;
    background: rgba(125, 207, 255, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid rgba(125, 207, 255, 0.1);
  }

  .post-arrow {
    color: var(--blue, #7aa2f7);
    font-size: 1.1rem;
    opacity: 0;
    transition: all 0.2s;
  }

  .post-card.selected .post-arrow {
    transform: translateX(4px);
  }
</style>
