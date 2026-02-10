<script lang="ts">
  import { onMount, setContext, type Snippet } from "svelte";
  import { writable } from "svelte/store";

  import { windowManager } from "./WindowManager.svelte";

  interface Props {
    children?: Snippet;
    class?: string;
    floating?: boolean;
    focused?: boolean;
    id?: string;
    noOverflow?: boolean;
    frameless?: boolean;
    onClose?: () => void;
    resizable?: boolean;
    title: string;
    urgent?: boolean;
  }

  let {
    children = undefined,
    class: className = "",
    floating = $bindable(false),
    focused = $bindable(false),
    title = "",
    id = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    frameless = false,
    noOverflow = false,
    onClose = undefined,
    resizable = false,
    urgent = false,
  }: Props = $props();

  let element: HTMLElement;
  let currentZIndex = $state(0);
  let rect = $state({ height: 0, left: 0, top: 0, width: 0 });

  // Load from persistence
  onMount(() => {
    // Capture initial position for returning to tiling
    originalParent = element.parentElement as HTMLElement;
    originalNextSibling = element.nextElementSibling;

    const saved = windowManager.layout[id];
    if (saved) {
      rect = {
        height: saved.height,
        left: saved.x,
        top: saved.y,
        width: saved.width,
      };
      floating = saved.floating;
      if (floating) {
        // Find container to move into if floating
        setTimeout(() => {
          const container = document.querySelector(".i3-container");
          if (container && element) {
            container.appendChild(element);
            updateContainerVisibility(originalParent);
          }
        }, 50);
      }
    }

    // Listen for global close events
    const closeListener = (e: CustomEvent) => {
      if (e.detail.id === id) {
        closeWindow();
      }
    };
    window.addEventListener("i3-close-window", closeListener as EventListener);

    return () => {
      window.removeEventListener(
        "i3-close-window",
        closeListener as EventListener,
      );
    };
  });

  function persist() {
    windowManager.updateBounds(id, {
      floating,
      height: rect.height,
      width: rect.width,
      x: rect.left,
      y: rect.top,
    });
  }

  // Trackers for dragging/resizing
  let isDragging = $state(false);
  let isResizing = $state(false);

  // Original positions for return to tiling
  let originalParent: HTMLElement | null = null;
  let originalNextSibling: Node | null = null;

  function bringToFront() {
    if (floating) {
      currentZIndex = windowManager.getNextZIndex(id);
    } else {
      windowManager.setActive(id);
    }
    focused = true;
  }

  function toggleFloat() {
    const container = document.querySelector(".i3-container") as HTMLElement;
    if (!container) return;

    if (!floating) {
      // Switch to floating
      const currentRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      rect = {
        height: currentRect.height,
        left: currentRect.left - containerRect.left,
        top: currentRect.top - containerRect.top,
        width: currentRect.width,
      };

      // Re-capture parent/sibling before moving if they somehow changed
      originalParent = element.parentElement as HTMLElement;
      originalNextSibling = element.nextElementSibling;

      floating = true;
      // Move in DOM to break stacking context
      container.appendChild(element);
      bringToFront();

      // Update visibility of the hierarchy we just left
      updateContainerVisibility(originalParent);
    } else {
      // Switch back to tiling
      if (originalParent) {
        if (
          originalNextSibling &&
          originalNextSibling.parentNode === originalParent
        ) {
          originalParent.insertBefore(element, originalNextSibling);
        } else {
          originalParent.appendChild(element);
        }
        floating = false;

        // Ensure island is visible again
        if (originalParent.tagName === "ASTRO-ISLAND") {
          originalParent.classList.remove("hidden-container");
        }

        updateContainerVisibility(originalParent);
      }
    }
    persist();
  }

  function updateContainerVisibility(el: HTMLElement | null) {
    if (!el || el.classList.contains("i3-container")) return;

    // Handle astro-islands specifically: hide if they become empty
    if (el.tagName === "ASTRO-ISLAND") {
      const hasContent = Array.from(el.children).some(
        (c) => !c.classList.contains("resize-splitter"),
      );
      if (!hasContent) {
        el.classList.add("hidden-container");
      } else {
        el.classList.remove("hidden-container");
      }
    }

    // Handle split containers: hide if they have no visible children
    const isSplit =
      el.classList.contains("i3-split-h") ||
      el.classList.contains("i3-split-v");
    if (isSplit) {
      const visibleChildren = Array.from(el.children).filter((c) => {
        if (c.classList.contains("resize-splitter")) return false;
        if (c.classList.contains("floating")) return false;
        const style = window.getComputedStyle(c);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      if (visibleChildren.length === 0) {
        el.classList.add("hidden-container");
      } else {
        el.classList.remove("hidden-container");
      }
    }

    // Recursively update parents
    updateContainerVisibility(el.parentElement);
  }

  // --- Dragging Logic ---
  let dragOffset = { x: 0, y: 0 };

  function onMouseDown(e: MouseEvent) {
    if (!floating) return;
    if ((e.target as HTMLElement).closest("[data-action]")) return;

    bringToFront();
    isDragging = true;

    const container = document.querySelector(".i3-container");
    const containerRect = container?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    dragOffset = {
      x: e.clientX - rect.left - containerRect.left,
      y: e.clientY - rect.top - containerRect.top,
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "move";
  }

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;

    const container = document.querySelector(".i3-container");
    const containerRect = container?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };

    rect.left = e.clientX - containerRect.left - dragOffset.x;
    rect.top = e.clientY - containerRect.top - dragOffset.y;
  }

  function onMouseUp() {
    isDragging = false;
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    persist();
  }

  // --- Resizing Logic ---
  let resizeStartDim = { h: 0, w: 0, x: 0, y: 0 };
  let resizeStartPos = { x: 0, y: 0 };
  let currentResizeDir = "";

  function startResize(e: MouseEvent, dir: string) {
    if (!floating) return;
    e.stopPropagation();
    e.preventDefault();

    bringToFront();
    isResizing = true;
    currentResizeDir = dir;

    resizeStartDim = {
      h: rect.height,
      w: rect.width,
      x: rect.left,
      y: rect.top,
    };
    resizeStartPos = { x: e.clientX, y: e.clientY };

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);

    // Custom cursor manager handles cursor display
    // No need to set document.body.style.cursor here
  }

  function handleResize(e: MouseEvent) {
    if (!isResizing) return;
    const dx = e.clientX - resizeStartPos.x;
    const dy = e.clientY - resizeStartPos.y;

    if (currentResizeDir.includes("e")) {
      rect.width = Math.max(200, resizeStartDim.w + dx);
    }
    if (currentResizeDir.includes("s")) {
      rect.height = Math.max(100, resizeStartDim.h + dy);
    }
    if (currentResizeDir.includes("w")) {
      const newWidth = Math.max(200, resizeStartDim.w - dx);
      rect.width = newWidth;
      rect.left =
        resizeStartPos.x +
        dx -
        (resizeStartPos.x - resizeStartDim.x) +
        (resizeStartDim.w - newWidth);
      // Simplified: explicit position update
      rect.left = resizeStartDim.x + (resizeStartDim.w - newWidth);
    }
    if (currentResizeDir.includes("n")) {
      const newHeight = Math.max(100, resizeStartDim.h - dy);
      rect.height = newHeight;
      rect.top = resizeStartDim.y + (resizeStartDim.h - newHeight);
    }
  }

  function stopResize() {
    isResizing = false;
    currentResizeDir = "";
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
    persist();
  }

  function closeWindow() {
    if (onClose) {
      onClose();
    } else {
      element.remove();
      updateContainerVisibility(originalParent || element.parentElement);
    }
  }

  // React to focus changes from breadcrumbs or other windows
  $effect(() => {
    if (windowManager.activeWindowId === id) {
      focused = true;
    } else {
      focused = false;
    }
  });

  const focusedStore = writable(focused);
  $effect(() => {
    focusedStore.set(focused);
  });

  setContext("window-focus", focusedStore);
  setContext("window-actions", {
    close: closeWindow,
    toggleFloat: toggleFloat,
    isFloating: () => floating,
    dragAction: dragAction,
  });

  // Actions for event handling without a11y warnings
  function bringToFrontAction(node: HTMLElement) {
    const handler = () => bringToFront();
    node.addEventListener("mousedown", handler);
    return {
      destroy: () => node.removeEventListener("mousedown", handler),
    };
  }

  function resizeAction(node: HTMLElement, dir: string) {
    const handler = (e: MouseEvent) => startResize(e, dir);
    node.addEventListener("mousedown", handler);
    return {
      destroy: () => node.removeEventListener("mousedown", handler),
    };
  }

  function dragAction(node: HTMLElement) {
    node.addEventListener("mousedown", onMouseDown);
    return {
      destroy: () => node.removeEventListener("mousedown", onMouseDown),
    };
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  bind:this={element}
  role="region"
  aria-label={title}
  class="i3-window {focused ? 'focused' : ''} {floating
    ? 'floating'
    : ''} {urgent ? 'urgent' : ''} {frameless ? 'frameless' : ''} {className}"
  style:left={floating ? `${rect.left}px` : null}
  style:top={floating ? `${rect.top}px` : null}
  style:width={floating ? `${rect.width}px` : null}
  style:height={floating ? `${rect.height}px` : null}
  style:z-index={floating ? currentZIndex : null}
  use:bringToFrontAction
  tabindex="0"
>
  {#if !frameless}
    <div class="i3-titlebar" role="button" tabindex="-1" use:dragAction>
      <div class="i3-titlebar-title">
        <span class="titlebar-icon">▣</span>
        <span class="titlebar-text">{title}</span>
      </div>
      <div class="i3-titlebar-actions">
        {#if floating}
          <button
            class="i3-titlebar-btn"
            data-action="return-tiling"
            title="Return to Tiling"
            onclick={toggleFloat}
          >
            ◱
          </button>
        {:else}
          <button
            class="i3-titlebar-btn"
            data-action="toggle-float"
            title="Toggle Float"
            onclick={toggleFloat}
          >
            ◫
          </button>
        {/if}
        <button
          class="i3-titlebar-btn btn-close"
          data-action="close"
          title="Close"
          onclick={closeWindow}
        >
          ✕
        </button>
      </div>
    </div>
  {/if}

  <div class="i3-content {noOverflow ? 'no-overflow' : ''}">
    {@render children?.()}
  </div>

  {#if floating && resizable}
    <div class="i3-resize-handles">
      <div
        class="i3-resize-handle resize-n"
        role="separator"
        use:resizeAction={"n"}
      ></div>
      <div
        class="i3-resize-handle resize-e"
        role="separator"
        use:resizeAction={"e"}
      ></div>
      <div
        class="i3-resize-handle resize-s"
        role="separator"
        use:resizeAction={"s"}
      ></div>
      <div
        class="i3-resize-handle resize-w"
        role="separator"
        use:resizeAction={"w"}
      ></div>
      <div
        class="i3-resize-handle resize-ne"
        role="separator"
        use:resizeAction={"ne"}
      ></div>
      <div
        class="i3-resize-handle resize-nw"
        role="separator"
        use:resizeAction={"nw"}
      ></div>
      <div
        class="i3-resize-handle resize-se"
        role="separator"
        use:resizeAction={"se"}
      ></div>
      <div
        class="i3-resize-handle resize-sw"
        role="separator"
        use:resizeAction={"sw"}
      ></div>
    </div>
  {/if}
</div>

<style>
  .i3-window {
    transition: border-color 150ms;
  }

  .i3-window.floating {
    transition: z-index 0s; /* Z-index should be instant */
  }

  .i3-window.frameless {
    border: none;
    background: transparent;
    box-shadow: none;
  }

  .i3-window.frameless.focused {
    box-shadow: none;
  }

  .titlebar-icon {
    font-size: 12px;
    opacity: 0.7;
  }

  .titlebar-text {
    font-weight: 500;
  }

  .btn-close:hover {
    background: var(--red, #f7768e);
    color: white;
  }

  /* Titlebar - Below titlebar buttons but above content */
  .i3-titlebar {
    position: relative;
    z-index: 100;
  }

  /* Titlebar buttons - Highest z-index, always clickable */
  .i3-titlebar-btn {
    position: relative;
    z-index: 10000 !important;
    pointer-events: auto !important;
  }

  /* Resize Handles - Native OS Feel */
  .i3-resize-handles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 50; /* Below titlebar */
  }

  .i3-resize-handle {
    position: absolute;
    pointer-events: auto !important;
    background: transparent;
    z-index: 1002;
    transition: background 0.2s;
  }

  .i3-resize-handle:hover {
    background: rgba(122, 162, 247, 0.15);
  }

  /* Corner Handles - AT ACTUAL CORNERS (24x24px for better grab area) */
  .resize-nw {
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
  }

  .resize-ne {
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
  }

  .resize-sw {
    bottom: 0;
    left: 0;
    width: 24px;
    height: 24px;
  }

  .resize-se {
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
  }

  /* Side Handles - Inset from corners */
  .resize-n {
    top: 0;
    left: 24px;
    right: 24px;
    height: 6px;
  }

  .resize-s {
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 10px;
  }

  .resize-e {
    right: 0;
    top: 24px;
    bottom: 24px;
    width: 10px;
  }

  .resize-w {
    left: 0;
    top: 24px;
    bottom: 24px;
    width: 10px;
  }

  /* Visual indicator for bottom-right corner */
  .resize-se::after {
    content: "⋮⋮";
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 9px;
    color: var(--text-muted);
    opacity: 0.7;
    pointer-events: none;
    text-shadow: 0 0 2px black;
  }

  .i3-window:focus {
    outline: none;
  }

  .i3-content.no-overflow {
    overflow: hidden;
  }
</style>
