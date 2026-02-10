<script lang="ts">
  import { blogState } from "./BlogState.svelte.ts";

  // Derived state from the global store
  let post = $derived(blogState.selectedPost);

  function formatDate(date: Date | string | undefined) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
</script>

<div class="post-preview">
  {#if post}
    <div class="preview-content">
      <header class="preview-header">
        <h2 class="preview-title">{post.data.title}</h2>
        <div class="preview-meta">
          <span class="meta-item">
            <span class="meta-label">Date:</span>
            <span class="meta-value">{formatDate(post.data.date)}</span>
          </span>
          {#if post.data.authors}
            <span class="meta-item">
              <span class="meta-label">Author:</span>
              <span class="meta-value">{post.data.authors[0]}</span>
            </span>
          {/if}
        </div>
      </header>

      {#if post.data.description}
        <section class="preview-section">
          <div class="section-label">--- Description ---</div>
          <p class="preview-description">{post.data.description}</p>
        </section>
      {/if}

      <section class="preview-section">
        <div class="section-label">--- Content Snippet ---</div>
        <div class="snippet-box">
          <div class="snippet-line">
            <span class="line-num">1</span>
            <span class="line-content"># {post.data.title}</span>
          </div>
          <div class="snippet-line">
            <span class="line-num">2</span>
            <span class="line-content"></span>
          </div>
          <div class="snippet-line">
            <span class="line-num">3</span>
            <span class="line-content"
              >Welcome to this post. Press [Enter] to read the full article in
              Nvim mode.</span
            >
          </div>
          <div class="snippet-line">
            <span class="line-num">4</span>
            <span class="line-content"></span>
          </div>
          <div class="snippet-line">
            <span class="line-num">5</span>
            <span class="line-content"
              >In this section, we would normally see a preview of the MDX
              content...</span
            >
          </div>
        </div>
      </section>

      <footer class="preview-footer">
        <div class="action-hint">
          <span class="key-hint">ENTER</span>
          <span class="text-hint">to open |</span>
          <span class="key-hint">J/K</span>
          <span class="text-hint">to navigate</span>
        </div>
      </footer>
    </div>
  {:else}
    <div class="preview-empty">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">Select a post to see preview</p>
      <div class="empty-hint">Use J/K to browse through the list</div>
    </div>
  {/if}
</div>

<style>
  .post-preview {
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    font-family: var(--font-mono, monospace);
    background: var(--bg-primary);
    color: var(--text-secondary);
  }

  .preview-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: 0.5;
  }

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .empty-text {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .empty-hint {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .preview-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }

  .preview-title {
    font-size: 1.5rem;
    color: var(--blue);
    margin: 0 0 12px;
    font-weight: 700;
  }

  .preview-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .meta-item {
    font-size: 0.85rem;
  }

  .meta-label {
    color: var(--text-muted);
    margin-right: 6px;
  }

  .meta-value {
    color: var(--green);
  }

  .preview-section {
    margin-bottom: 24px;
  }

  .section-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .preview-description {
    line-height: 1.6;
    font-size: 0.9375rem;
    color: var(--text-primary);
    margin: 0;
  }

  .snippet-box {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 12px;
  }

  .snippet-line {
    display: flex;
    gap: 16px;
    line-height: 1.5;
    font-size: 0.85rem;
  }

  .line-num {
    color: var(--text-muted);
    min-width: 20px;
    text-align: right;
    user-select: none;
    opacity: 0.5;
  }

  .line-content {
    color: var(--text-secondary);
  }

  .preview-footer {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px dashed var(--border);
  }

  .action-hint {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
  }

  .key-hint {
    background: var(--bg-tertiary);
    color: var(--yellow);
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: 700;
  }

  .text-hint {
    color: var(--text-muted);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .preview-content {
    animation: fadeIn 0.3s ease-out;
  }
</style>
