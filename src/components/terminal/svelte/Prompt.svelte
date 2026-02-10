<script lang="ts">
  interface Props {
    command?: string;
    host?: string;
    path?: string;
    showCursor?: boolean;
    user?: string;
  }

  let {
    command = "",
    host = "enigma",
    path = "~",
    showCursor = true,
    user = "dev",
  }: Props = $props();
</script>

<div class="prompt-line">
  <span class="prompt-user">{user}</span><span class="prompt-at">@</span><span
    class="prompt-host">{host}</span
  ><span class="prompt-colon">:</span><span class="prompt-path">{path}</span
  ><span class="prompt-symbol">❯</span>
  {#if command}
    <span class="prompt-command">{command}</span>
  {/if}
  {#if showCursor}
    <span class="cursor"></span>
  {/if}
</div>

<style>
  .prompt-line {
    font-family: var(--font-mono);
    margin-bottom: var(--space-2);
  }

  .prompt-user,
  .prompt-host {
    color: var(--green);
    font-weight: 600;
  }
  .prompt-at,
  .prompt-colon {
    color: var(--text-muted);
  }
  .prompt-path {
    color: var(--blue);
  }
  .prompt-symbol {
    color: var(--magenta);
    font-weight: bold;
  }
  .prompt-command {
    color: var(--text-primary);
  }

  .cursor {
    display: inline-block;
    width: 0.5em;
    height: 1.1em;
    background: var(--cursor);
    animation: blink 1s infinite;
    vertical-align: -0.2em;
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
