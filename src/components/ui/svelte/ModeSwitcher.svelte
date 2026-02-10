<script lang="ts">
  import { navigate } from "astro:transitions/client";
  import { onMount } from "svelte";

  let currentMode = $state("terminal");

  onMount(() => {
    // Sync initial state
    const saved = localStorage.getItem("design-mode");
    if (saved) currentMode = saved;
    else {
      // Infer from URL
      currentMode = window.location.pathname.startsWith("/workspace")
        ? "dev"
        : "blog";
    }
  });

  function getTargetUrl() {
    const path = window.location.pathname;
    const isWorkspace = path.startsWith("/workspace");

    if (isWorkspace) {
      // Dev Mode -> Blog Mode: strip /workspace prefix
      return path.replace("/workspace", "") || "/";
    }
    else {
      // Blog Mode -> Dev Mode: redirect articles to workspace home
      // Blog articles (single posts) don't have workspace equivalents directly mapped in the same way usually
      // But we can try to map them if possible, otherwise default to workspace root
      const isBlogArticle
        = path.match(/^\/[a-z0-9-]+$/)
          && !["/", "/about", "/blog", "/categories", "/now", "/tags"].includes(path);

      if (
        isBlogArticle
        || path.startsWith("/tags/")
        || path.startsWith("/categories/")
      ) {
        // Redirect to workspace home for article pages to avoid 404s if structure differs
        return "/workspace";
      }
      return "/workspace" + (path === "/" ? "" : path);
    }
  }

  function toggleMode(e: Event) {
    e.preventDefault();
    const target = getTargetUrl();
    const nextMode = target.startsWith("/workspace") ? "dev" : "blog";

    // Optimistic UI update
    currentMode = nextMode;
    localStorage.setItem("design-mode", nextMode);

    // Redirect
    setTimeout(() => {
      navigate(target);
    }, 150);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter") {
      toggleMode(e);
    }
  }
</script>

<button
  aria-label="Toggle Design System"
  class="design-toggle"
  onclick={toggleMode}
  onkeydown={handleKeydown}
  title="Switch between Blog and Dev Mode"
>
  <span
    aria-hidden="true"
    class="toggle-icon blog-icon"
    class:visible={currentMode === "terminal" || currentMode === "dev"}
  >
    📝
  </span>
  <span
    aria-hidden="true"
    class="toggle-icon dev-icon"
    class:visible={currentMode === "blog"}
  >
    💻
  </span>
</button>

<style>
  .design-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    border: 2px solid var(--color-border, currentColor);
    background: var(--color-bg, #fff);
    color: var(--color-text-main, #1f2937);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .design-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    border-color: var(--color-primary);
  }

  .toggle-icon {
    position: absolute;
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .toggle-icon.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Dev Mode styling override */
  :global([data-theme-mode="terminal"]) .design-toggle {
    --color-bg: var(--color-terminal-bg, #1a1b26);
    --color-text-main: var(--color-terminal-text, #a9b1d6);
    --color-border: var(--color-terminal-accent, #7aa2f7);
  }

  @media (max-width: 768px) {
    .design-toggle {
      bottom: 1rem;
      right: 1rem;
      width: 3rem;
      height: 3rem;
      font-size: 1.25rem;
    }
  }
</style>
