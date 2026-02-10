<script lang="ts">
  import { onMount } from "svelte";

  export let filePath = "README.md";
  export let fileType = "markdown";
  export let mode = "NORMAL";

  let percent = 0;
  let line = 1;
  let col = 1;
  let _totalLines = 100;

  function updateScroll() {
    const win = document.documentElement;
    const height = win.scrollHeight - win.clientHeight;
    percent = Math.round((win.scrollTop / height) * 100) || 0;

    // Simulate line/col based on dummy logic (since we can't truly know line/column in browser)
    line = Math.floor((win.scrollTop + win.clientHeight / 2) / 20) + 1;
    col = Math.floor(Math.random() * 80) + 1; // Pure simulation for effect
  }

  onMount(() => {
    window.addEventListener("scroll", updateScroll);
    updateScroll();

    // Simulate cursor movement occasionally
    const interval = setInterval(() => {
      if (document.hasFocus()) {
        col = Math.floor(Math.random() * 80) + 1;
      }
    }, 2000);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      clearInterval(interval);
    };
  });
</script>

<div class="status-line">
  <div class="mode-section {mode.toLowerCase()}">
    <span class="mode-text">{mode}</span>
  </div>

  <div class="file-section">
    <span class="git-branch"> main</span>
    <span class="file-path">{filePath}</span>
    <span class="file-status">[+]</span>
  </div>

  <div class="spacer"></div>

  <div class="info-section">
    <span class="file-type">{fileType}</span>
    <span class="file-encoding">utf-8</span>
    <span class="file-format">unix</span>
  </div>

  <div class="position-section">
    <span class="percent">{percent}%</span>
    <span class="coords"> {line}:{col}</span>
  </div>
</div>

<style>
  .status-line {
    display: flex;
    align-items: stretch;
    height: 24px;
    background: var(--bg-secondary, #1f2335);
    color: var(--text-secondary, #a9b1d6);
    font-family: var(--font-mono, monospace);
    font-size: 0.75rem;
    border-top: 1px solid var(--border, #3b4261);
    user-select: none;
    overflow: hidden;
  }

  .mode-section {
    padding: 0 12px;
    display: flex;
    align-items: center;
    font-weight: 700;
    color: var(--bg-primary, #1a1b26);
    position: relative;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
    padding-right: 20px;
    z-index: 3;
  }

  .mode-section.normal {
    background: var(--blue, #7aa2f7);
  }

  .mode-section.insert {
    background: var(--green, #9ece6a);
  }

  .mode-section.visual {
    background: var(--magenta, #bb9af7);
  }

  .file-section {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    background: var(--bg-tertiary, #292e42);
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%, 0 0);
    padding-left: 20px;
    padding-right: 24px;
    margin-left: -10px; /* Overlap for powerline effect */
    z-index: 2;
  }

  .file-path {
    color: var(--text-primary, #c0caf5);
    font-weight: 500;
    /* Prevent cutting off on narrow windows */
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .git-branch {
    color: var(--magenta, #bb9af7);
  }

  .spacer {
    flex: 1;
    background: var(--bg-secondary, #1f2335);
  }

  .info-section {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    background: var(--bg-tertiary, #292e42);
    clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
    padding-left: 20px;
    margin-right: -10px;
    z-index: 1;
  }

  .position-section {
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--blue, #7aa2f7);
    color: var(--bg-primary, #1a1b26);
    font-weight: 600;
    clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%);
    padding-left: 20px;
  }

  @media (max-width: 600px) {
    .info-section {
      display: none;
    }
    .git-branch {
      display: none;
    }
  }
</style>
