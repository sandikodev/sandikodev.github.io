<script lang="ts">
  import { onMount } from "svelte";

  let dot = $state<HTMLDivElement>();
  let trail = $state<HTMLDivElement>();
  let isTerminal = $state(false);
  let currentCursor = $state("default");

  onMount(() => {
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let frameId: number;
    let observer: MutationObserver;
    let prevCursor = "default"; // Track previous cursor to avoid unnecessary DOM updates

    const checkMode = () => {
      if (typeof document !== "undefined") {
        const newMode =
          document.documentElement.getAttribute("data-theme-mode") ===
          "terminal";
        if (newMode !== isTerminal) {
          isTerminal = newMode;
        }
      }
    };

    // Initial check
    checkMode();

    // Watch for attribute changes on html element
    if (typeof document !== "undefined") {
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-theme-mode"
          ) {
            checkMode();
          }
        }
      });
      observer.observe(document.documentElement, { attributes: true });
    }

    const updateCursor = () => {
      if (!isTerminal || window.innerWidth <= 768) {
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(updateCursor); // Keep loop running to check state
        return;
      }

      if (!dot || !trail) {
        frameId = requestAnimationFrame(updateCursor);
        return;
      }

      // Use direct position, centering via CSS transform
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";

      // Smooth trail following (Lerp)
      trailX += (mouseX - trailX) * 0.1;
      trailY += (mouseY - trailY) * 0.1;

      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";

      // Detect cursor from element under cursor - Check for resize handles specifically
      let newCursor = "default"; // Use temp variable to avoid triggering reactivity
      const el = document.elementFromPoint(mouseX, mouseY);
      if (el) {
        // Check if it's a resize handle by class
        if (
          el.classList.contains("i3-resize-handle") ||
          el.classList.contains("resize-splitter") ||
          el.closest(".i3-resize-handle") ||
          el.closest(".resize-splitter")
        ) {
          const resizeEl =
            el.classList.contains("i3-resize-handle") ||
            el.classList.contains("resize-splitter")
              ? el
              : el.closest(".i3-resize-handle") ||
                el.closest(".resize-splitter");

          // Determine cursor type from resize handle classes
          if (resizeEl) {
            if (
              resizeEl.classList.contains("resize-e") ||
              resizeEl.classList.contains("resize-w")
            ) {
              newCursor = "col-resize";
            } else if (
              resizeEl.classList.contains("resize-n") ||
              resizeEl.classList.contains("resize-s")
            ) {
              newCursor = "row-resize";
            } else if (
              resizeEl.classList.contains("resize-ne") ||
              resizeEl.classList.contains("resize-sw")
            ) {
              newCursor = "nesw-resize";
            } else if (
              resizeEl.classList.contains("resize-nw") ||
              resizeEl.classList.contains("resize-se")
            ) {
              newCursor = "nwse-resize";
            } else if (resizeEl.classList.contains("horizontal")) {
              newCursor = "col-resize";
            } else if (resizeEl.classList.contains("vertical")) {
              newCursor = "row-resize";
            } else {
              // Fallback 1: Check data attribute
              const dataDir = resizeEl.getAttribute("data-resize-direction");
              if (dataDir === "horizontal") {
                newCursor = "col-resize";
              } else if (dataDir === "vertical") {
                newCursor = "row-resize";
              } else {
                // Fallback 2: Check computed cursor style
                const computedCursor = window.getComputedStyle(resizeEl).cursor;
                if (
                  computedCursor === "col-resize" ||
                  computedCursor === "row-resize" ||
                  computedCursor === "nwse-resize" ||
                  computedCursor === "nesw-resize"
                ) {
                  newCursor = computedCursor;
                }
              }
            }
          }
        } else {
          // For non-resize elements, check computed style
          const style = window.getComputedStyle(el);
          const cursor = style.cursor;
          if (cursor && cursor !== "none" && cursor !== "default") {
            newCursor = cursor;
          }
        }
      }

      // CRITICAL: Only update state when cursor actually changes
      // This prevents excessive Svelte reactivity and eliminates jitter
      if (newCursor !== prevCursor) {
        currentCursor = newCursor;
        prevCursor = newCursor;
      }

      frameId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!isTerminal) return;
      const target = e.target as HTMLElement;
      if (
        target.matches &&
        target.matches("a, button, input, textarea, select, .clickable")
      ) {
        dot?.classList.add("hover");
        trail?.classList.add("hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (!isTerminal) return;
      const target = e.target as HTMLElement;
      if (
        target.matches &&
        target.matches("a, button, input, textarea, select, .clickable")
      ) {
        dot?.classList.remove("hover");
        trail?.classList.remove("hover");
      }
    };

    const handleMouseDown = () => {
      if (!isTerminal) return;
      dot?.classList.add("click");
      trail?.classList.add("click");
    };

    const handleMouseUp = () => {
      if (!isTerminal) return;
      dot?.classList.remove("click");
      trail?.classList.remove("click");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Initial loop
    updateCursor();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (observer) observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });
</script>

{#if isTerminal}
  <div
    bind:this={dot}
    class="cursor-dot"
    class:resizing={currentCursor.includes("resize")}
    data-cursor={currentCursor}
  ></div>
  <div
    bind:this={trail}
    class="cursor-trail"
    class:resizing={currentCursor.includes("resize")}
  ></div>
{/if}

<style>
  .cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: var(--accent, var(--color-terminal-accent, #7aa2f7));
    border-radius: 50%;
    pointer-events: none;
    z-index: 100000;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
    box-shadow: 0 0 10px var(--accent, var(--color-terminal-accent, #7aa2f7));
    transform: translate(-50%, -50%);
  }

  .cursor-trail {
    position: fixed;
    width: 20px;
    height: 20px;
    border: 1px solid var(--accent, var(--color-terminal-accent, #7aa2f7));
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transition: all 0.3s ease;
    opacity: 0.6;
    transform: translate(-50%, -50%);
  }

  /* Global cursor hiding provided by global CSS or basic body rule */
  :global([data-theme-mode="terminal"] *) {
    cursor: none !important;
  }

  /* CRITICAL: Resize elements need pointer-events but NO explicit cursor */
  /* Custom cursor manager handles visual display to avoid duplication */
  :global([data-theme-mode="terminal"] .resize-splitter),
  :global([data-theme-mode="terminal"] .resize-splitter.horizontal),
  :global([data-theme-mode="terminal"] .resize-splitter.vertical) {
    pointer-events: auto !important;
  }

  :global([data-theme-mode="terminal"] .i3-resize-handle),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-e),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-w),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-n),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-s),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-nw),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-se),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-ne),
  :global([data-theme-mode="terminal"] .i3-resize-handle.resize-sw) {
    pointer-events: auto !important;
  }

  :global([data-theme-mode="terminal"] a),
  :global([data-theme-mode="terminal"] button),
  :global([data-theme-mode="terminal"] input),
  :global([data-theme-mode="terminal"] textarea),
  :global([data-theme-mode="terminal"] select) {
    cursor: none !important; /* Hide native cursor to show custom one */
  }

  /* Morphing logic for resizing - NATIVE OS STYLE */
  .cursor-dot.resizing {
    background: transparent;
    box-shadow: none;
    mix-blend-mode: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Horizontal resize (col-resize, ew-resize) - Left/Right arrows */
  .cursor-dot[data-cursor="col-resize"],
  .cursor-dot[data-cursor="ew-resize"] {
    width: 24px;
    height: 24px;
    border-radius: 0;
    background: transparent;
  }

  .cursor-dot[data-cursor="col-resize"]::after,
  .cursor-dot[data-cursor="ew-resize"]::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 12L3 8M3 8L7 4M3 8H21M17 12L21 16M21 16L17 20M21 16H3' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7 12L3 8M3 8L7 4M3 8H21M17 12L21 16M21 16L17 20M21 16H3' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Vertical resize (row-resize, ns-resize) - Up/Down arrows */
  .cursor-dot[data-cursor="row-resize"],
  .cursor-dot[data-cursor="ns-resize"] {
    width: 24px;
    height: 24px;
    border-radius: 0;
    background: transparent;
  }

  .cursor-dot[data-cursor="row-resize"]::after,
  .cursor-dot[data-cursor="ns-resize"]::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 7L8 3M8 3L4 7M8 3V21M12 17L16 21M16 21L20 17M16 21V3' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 7L8 3M8 3L4 7M8 3V21M12 17L16 21M16 21L20 17M16 21V3' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Diagonal resize NW-SE (top-left to bottom-right) */
  .cursor-dot[data-cursor*="nwse-resize"] {
    width: 24px;
    height: 24px;
    border-radius: 0;
    background: transparent;
  }

  .cursor-dot[data-cursor*="nwse-resize"]::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 7L4 4M4 4L4 8M4 4H8M17 17L20 20M20 20V16M20 20H16M4 4L20 20' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7 7L4 4M4 4L4 8M4 4H8M17 17L20 20M20 20V16M20 20H16M4 4L20 20' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Diagonal resize NE-SW (top-right to bottom-left) */
  .cursor-dot[data-cursor*="nesw-resize"] {
    width: 24px;
    height: 24px;
    border-radius: 0;
    background: transparent;
  }

  .cursor-dot[data-cursor*="nesw-resize"]::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 7L20 4M20 4V8M20 4H16M7 17L4 20M4 20H8M4 20V16M20 4L4 20' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M17 7L20 4M20 4V8M20 4H16M7 17L4 20M4 20H8M4 20V16M20 4L4 20' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .cursor-trail.resizing {
    opacity: 0;
  }

  /* Hover effects */
  :global(.cursor-dot.hover) {
    transform: translate(-50%, -50%) scale(1.5);
    background: var(--green, #9ece6a);
    box-shadow: 0 0 20px var(--green, #9ece6a);
  }

  :global(.cursor-trail.hover) {
    transform: translate(-50%, -50%) scale(1.2);
    border-color: var(--green, #9ece6a);
    opacity: 0.8;
  }

  /* Click effect */
  :global(.cursor-dot.click) {
    transform: translate(-50%, -50%) scale(0.8);
    background: var(--red, #f7768e);
    box-shadow: 0 0 15px var(--red, #f7768e);
  }

  :global(.cursor-trail.click) {
    transform: translate(-50%, -50%) scale(0.9);
    border-color: var(--red, #f7768e);
  }

  @media (max-width: 768px) {
    .cursor-dot,
    .cursor-trail {
      display: none !important;
    }
  }
</style>
