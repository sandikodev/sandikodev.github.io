<script lang="ts">
  import { onMount, tick } from "svelte";

  import I3Window from "./I3Window.svelte";
  // import { systemState } from "./SystemState.svelte";

  let visible = $state(false);
  let inputElement: HTMLInputElement;
  let outputContainer: HTMLElement;

  // Terminal State
  let history: string[] = $state([]);
  let inputValue = $state("");

  // Load history from localStorage
  onMount(() => {
    const saved = localStorage.getItem("scratchpad_history");
    if (saved) {
      try {
        history = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load scratchpad history", e);
      }
    }
  });

  // Save history to localStorage
  $effect(() => {
    localStorage.setItem("scratchpad_history", JSON.stringify(history));
  });

  function toggle() {
    visible = !visible;
    if (visible) {
      tick().then(() => {
        inputElement?.focus();
        scrollToBottom();
      });
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    // Toggle: Ctrl + ` (Backtick)
    if (e.ctrlKey && e.key === "`") {
      e.preventDefault();
      toggle();
    }

    // Close on Escape if focused
    if (visible && e.key === "Escape") {
      // Only close if we are the top-level thing (CommandPalette isn't open)
      // For now simple check
      visible = false;
    }
  }

  async function handleCommand(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const cmd = inputValue.trim();
      history = [...history, `> ${cmd}`];

      // Process command
      const response = processCommand(cmd);
      if (response) {
        if (Array.isArray(response)) {
          history = [...history, ...response];
        } else {
          history = [...history, response];
        }
      }

      inputValue = "";
      await tick();
      scrollToBottom();
    }
  }

  function processCommand(cmd: string): null | string | string[] {
    const lower = cmd.toLowerCase();
    switch (lower) {
      case "":
        return null;
      case "clear":
        history = [];
        return null;
      case "date":
        return new Date().toLocaleString();
      case "exit":
        visible = false;
        return null;
      case "help":
        return [
          "Available commands:",
          "  clear   - Clear history",
          "  date    - Show current date",
          "  todo    - (Mock) List todos",
          "  note    - Add a note (just type anything)",
          "  exit    - Close scratchpad",
        ];
      default:
        // Treat as a note
        return `  Saved note: "${cmd}"`;
    }
  }

  function scrollToBottom() {
    if (outputContainer) {
      outputContainer.scrollTop = outputContainer.scrollHeight;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    // Expose toggle for external calls if needed
    (window as any).toggleScratchpad = toggle;
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      delete (window as any).toggleScratchpad;
    };
  });
</script>

<div class="scratchpad-wrapper" class:visible>
  <I3Window
    title="scratchpad"
    floating={true}
    focused={visible}
    class="scratchpad-window"
    onClose={() => (visible = false)}
  >
    <div class="terminal-content">
      <div class="output" bind:this={outputContainer}>
        <div class="line system">Welcome to Scratchpad v2.0</div>
        <div class="line system">
          Type 'help' for commands or just type to take notes.
        </div>
        <div class="divider">---</div>
        {#each history as line, i (i)}
          <div class="line" class:command={line.startsWith(">")}>
            {line}
          </div>
        {/each}
      </div>
      <div class="input-line">
        <span class="prompt">$</span>
        <input
          bind:this={inputElement}
          bind:value={inputValue}
          onkeydown={handleCommand}
          type="text"
          placeholder="Type..."
          spellcheck="false"
        />
      </div>
    </div>
  </I3Window>
</div>

<style>
  .scratchpad-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5000; /* Below CommandPalette (10000) but above normal windows */
    pointer-events: none; /* Let events pass through when hidden */
    visibility: hidden;
  }

  .scratchpad-wrapper.visible {
    visibility: visible;
    pointer-events: auto;
  }

  /* Position the I3Window roughly in center initially,
       but I3Window handles its own positioning if floating.
       We might need to override/force it for scratchpad.
       Actually I3Window floating defaults to independent positioning.
       We'll let I3Window handle the window frame, we just control visibility.
    */

  :global(.scratchpad-window) {
    width: 600px !important;
    height: 400px !important;
    /* Center it */
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
  }

  .terminal-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 8px;
    background: var(--bg-primary, #1a1b26);
    color: var(--text-primary, #a9b1d6);
    font-family: "Fira Code", monospace;
    font-size: 0.9rem;
  }

  .output {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .line {
    white-space: pre-wrap;
    word-break: break-all;
  }

  .line.command {
    color: var(--accent, #7aa2f7);
    font-weight: 600;
    margin-top: 4px;
  }

  .line.system {
    color: var(--text-muted, #565f89);
    font-style: italic;
  }

  .divider {
    color: var(--border, #414868);
    margin: 4px 0;
  }

  .input-line {
    display: flex;
    align-items: center;
    gap: 8px;
    border-top: 1px solid var(--border, #414868);
    padding-top: 8px;
  }

  .prompt {
    color: var(--green, #9ece6a);
    font-weight: bold;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }
</style>
