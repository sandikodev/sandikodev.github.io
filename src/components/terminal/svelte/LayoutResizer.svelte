<script lang="ts">
  import { onMount } from "svelte";

  // import { systemState } from "./SystemState.svelte";

  onMount(() => {
    // We only want to run this in the browser
    if (typeof window === "undefined") return;

    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let startFlexGrowPrev = 0;
    let startFlexGrowNext = 0;
    let startSizePrev = 0;
    let startSizeNext = 0;

    let direction: "horizontal" | "vertical" = "horizontal";
    let observer: MutationObserver | null = null;
    let _currentSplitter: HTMLElement | null = null;
    let prevEl: HTMLElement | null = null;
    let nextEl: HTMLElement | null = null;

    const createSplitter = (isVertical: boolean) => {
      const div = document.createElement("div");
      div.className = `resize-splitter ${isVertical ? "vertical" : "horizontal"}`;
      div.setAttribute(
        "data-resize-direction",
        isVertical ? "vertical" : "horizontal",
      );

      // Inner visual line - visibility controlled via CSS :hover only
      const line = document.createElement("div");
      line.className = "splitter-line";
      Object.assign(line.style, {
        background: "var(--accent, #7aa2f7)",
        pointerEvents: "none",
        // NO opacity here - CSS handles it!
        transition: "opacity 0.15s ease",
      });

      // Use flexbox for perfect centering
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";

      if (isVertical) {
        div.style.height = "16px"; // Increased from 10px for easier hover
        div.style.width = "100%";
        // No cursor assignment - custom cursor manager handles it
        div.style.left = "0";
        line.style.height = "2px";
        line.style.width = "100%";
      } else {
        div.style.width = "16px"; // Increased from 10px for easier hover
        div.style.height = "100%";
        // No cursor assignment - custom cursor manager handles it
        div.style.top = "0";
        line.style.width = "2px";
        line.style.height = "100%";
      }

      div.appendChild(line);
      div.style.position = "relative";
      div.style.zIndex = "50"; // Above tiled content, but below floating windows (500+)
      // No background color - simpler

      // ONLY mousedown handler - no hover effects to avoid flicker
      div.addEventListener("mousedown", onMouseDown);

      return div;
    };

    const setupSplitters = () => {
      document.querySelectorAll(".resize-splitter").forEach((s) => s.remove());

      const containers = document.querySelectorAll(".i3-split-h, .i3-split-v");
      const gap =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue("--gap"),
        ) || 8;

      containers.forEach((container) => {
        const isH = container.classList.contains("i3-split-h");
        const children = Array.from(container.children).filter((c) => {
          const el = c as HTMLElement;
          if (el.classList.contains("resize-splitter")) return false;
          if (el.classList.contains("floating")) return false;
          // Ignore hidden containers or islands
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden";
        }) as HTMLElement[];

        // If only one child left, ensure it takes full space by resetting flexGrow
        if (children.length === 1) {
          children[0].style.flexGrow = "1";
          return;
        }

        if (children.length < 2) return;

        for (let i = 0; i < children.length - 1; i++) {
          const current = children[i];
          const splitter = createSplitter(!isH);

          if (isH) {
            splitter.style.width = `${gap}px`;
            splitter.style.marginLeft = `-${gap}px`;
            splitter.style.marginRight = `-${gap}px`;
            splitter.style.flexShrink = "0";
            splitter.style.flexGrow = "0";
          } else {
            splitter.style.height = `${gap}px`;
            splitter.style.marginTop = `-${gap}px`;
            splitter.style.marginBottom = `-${gap}px`;
            splitter.style.flexShrink = "0";
            splitter.style.flexGrow = "0";
          }

          current.after(splitter);
        }
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      const splitter = (e.target as HTMLElement).closest(
        ".resize-splitter",
      ) as HTMLElement;
      if (!splitter) {
        return;
      }

      isResizing = true;
      _currentSplitter = splitter;
      const parent = splitter.parentElement;
      if (!parent) return;

      prevEl = splitter.previousElementSibling as HTMLElement;
      nextEl = splitter.nextElementSibling as HTMLElement;

      if (!prevEl || !nextEl) {
        isResizing = false;
        return;
      }

      const isRow = parent.classList.contains("i3-split-h");
      direction = isRow ? "horizontal" : "vertical";

      startX = e.clientX;
      startY = e.clientY;

      const getGrow = (el: HTMLElement) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.flexGrow) || 1;
      };

      startFlexGrowPrev = getGrow(prevEl);
      startFlexGrowNext = getGrow(nextEl);

      const prevRect = prevEl.getBoundingClientRect();
      const nextRect = nextEl.getBoundingClientRect();

      startSizePrev =
        direction === "horizontal" ? prevRect.width : prevRect.height;
      startSizeNext =
        direction === "horizontal" ? nextRect.width : nextRect.height;

      // Visual feedback
      document.body.style.cursor =
        direction === "horizontal" ? "col-resize" : "row-resize";
      document.body.setAttribute("data-resizing", "true");

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing || !prevEl || !nextEl) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const deltaPixels = direction === "horizontal" ? dx : dy;

      const totalSize = startSizePrev + startSizeNext;
      if (totalSize === 0) return;

      const totalGrow = startFlexGrowPrev + startFlexGrowNext;
      const deltaGrow = (deltaPixels / totalSize) * totalGrow;

      let newGrowPrev = startFlexGrowPrev + deltaGrow;
      let newGrowNext = startFlexGrowNext - deltaGrow;

      const minGrow = 0.05;
      if (newGrowPrev < minGrow) {
        newGrowPrev = minGrow;
        newGrowNext = totalGrow - minGrow;
      }
      if (newGrowNext < minGrow) {
        newGrowNext = minGrow;
        newGrowPrev = totalGrow - minGrow;
      }

      prevEl.style.flexGrow = `${newGrowPrev.toFixed(4)}`;
      nextEl.style.flexGrow = `${newGrowNext.toFixed(4)}`;
    };

    const onMouseUp = () => {
      isResizing = false;
      document.body.style.cursor = "";
      document.body.removeAttribute("data-resizing");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    const initObserver = () => {
      const target = document.querySelector(".i3-container");
      if (!target || observer) return;

      let timeout: any;
      observer = new MutationObserver((mutations) => {
        if (isResizing) return;

        let shouldRefresh = false;
        for (const mutation of mutations) {
          if (mutation.type === "childList") shouldRefresh = true;
          if (mutation.type === "attributes") {
            const el = mutation.target as HTMLElement;
            // Only refresh on relevant attribute changes
            if (
              el.classList.contains("hidden-container") ||
              el.tagName === "ASTRO-ISLAND"
            ) {
              shouldRefresh = true;
            }
          }
        }

        if (shouldRefresh) {
          clearTimeout(timeout);
          timeout = window.setTimeout(setupSplitters, 50);
        }
      });

      observer.observe(target, {
        attributeFilter: ["class", "style"],
        attributes: true,
        childList: true,
        subtree: true,
      });
    };

    // Initialize
    setTimeout(() => {
      setupSplitters();
      initObserver();
    }, 100);

    // Re-setup on navigation
    const onPageLoad = () => {
      setupSplitters();
      initObserver();
    };
    document.addEventListener("astro:page-load", onPageLoad);

    return () => {
      document.removeEventListener("astro:page-load", onPageLoad);
      if (observer) observer.disconnect();
    };
  });
</script>

<div style="display: none;" aria-hidden="true" id="layout-resizer-marker"></div>
