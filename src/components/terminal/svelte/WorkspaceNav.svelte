<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Readable } from "svelte/store";

  let currentPath = $state("");

  onMount(() => {
    currentPath = window.location.pathname;
  });

  import { navigate } from "astro:transitions/client";

  const navItems = [
    { href: "/workspace", icon: "🏠", label: "~/home" },
    { href: "/workspace/blog", icon: "📝", label: "~/blog" },
    { href: "/workspace/about", icon: "👤", label: "~/about" },
    { href: "/workspace/skills", icon: "📊", label: "~/skills" },
    { href: "/workspace/terminal", icon: "💻", label: "~/terminal" },
  ];

  function isActive(href: string) {
    if (href === "/workspace") {
      return currentPath === "/workspace" || currentPath === "/workspace/";
    }
    return currentPath.startsWith(href);
  }

  const is404 = $derived(currentPath.includes("/404"));

  // Keyboard Navigation
  const isWindowFocused = getContext<Readable<boolean>>("window-focus");
  let selectedIndex = $state(-1);

  // Sync initial selection
  $effect(() => {
    const idx = navItems.findIndex((item) => isActive(item.href));
    if (idx !== -1) selectedIndex = idx;
  });

  function handleKeydown(e: KeyboardEvent) {
    if (!$isWindowFocused) return;

    if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % navItems.length;
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + navItems.length) % navItems.length;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < navItems.length) {
        navigate(navItems[selectedIndex].href);
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="workspace-nav">
  {#each navItems as item, i (item.href)}
    <a
      href={item.href}
      class="nav-item"
      class:active={isActive(item.href) && !is404}
      class:selected={i === selectedIndex && $isWindowFocused}
    >
      <span class="nav-label">{item.label}</span>
    </a>
  {/each}
  {#if is404}
    <span class="nav-item active">
      <span class="nav-label">~/404</span>
    </span>
  {/if}
</nav>

<style>
  .workspace-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    color: var(--text-primary, #a9b1d6);
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.2s ease;
    font-family: var(--font-mono, monospace);
    font-size: 0.9rem;
    border: 1px solid transparent;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--accent, #7aa2f7);
    transform: translateX(4px);
  }

  .nav-item.active {
    background: rgba(255, 255, 255, 0.1);
    color: var(--accent, #7aa2f7);
    font-weight: 600;
  }

  .nav-item.selected {
    border-color: var(--accent, #7aa2f7);
    background: rgba(122, 162, 247, 0.2);
  }

  .nav-item.active::before {
    content: "❯";
    margin-right: 8px;
    font-size: 0.8rem;
    color: var(--accent);
  }
</style>
