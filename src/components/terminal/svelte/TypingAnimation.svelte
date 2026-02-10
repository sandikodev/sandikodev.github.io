<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    class?: string;
    cursor?: boolean;
    delay?: number;
    onComplete?: () => void;
    speed?: number;
    text: string;
  }

  let {
    class: className = "",
    cursor = true,
    delay = 0,
    onComplete,
    speed = 50,
    text = "",
  }: Props = $props();

  let displayedText = $state("");
  let isTyping = $state(true);
  let showCursor = $derived(cursor);

  onMount(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        if (i < text.length) {
          displayedText += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          isTyping = false;
          if (!cursor) showCursor = false;
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  });
</script>

<span class="typing-animation {className}">
  {displayedText}
  {#if showCursor}
    <span class="cursor" class:typing={isTyping}>_</span>
  {/if}
</span>

<style>
  .cursor {
    display: inline-block;
    width: 0.6em;
    background-color: var(--text-primary, currentColor);
    animation: blink 1s step-end infinite;
    vertical-align: text-bottom;
  }

  .cursor.typing {
    animation: none;
    opacity: 1;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
</style>
