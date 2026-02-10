<script lang="ts">
  import { onMount } from "svelte";

  import { soundState } from "@/lib/stores/sound.svelte";

  onMount(() => {
    soundState.init();

    function handleKeydown(e: KeyboardEvent) {
      if (!e.repeat) {
        soundState.play("keyboard");
      }
    }

    function handleClick(e: MouseEvent) {
      if ((e.target as Element).matches("button, a, .clickable")) {
        soundState.play("beep");
      }
    }

    function handleTypingComplete(e: CustomEvent) {
      if (e.detail?.text?.includes("Welcome")) {
        setTimeout(() => soundState.play("startup"), 500);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("click", handleClick);
    window.addEventListener(
      "typing-complete",
      handleTypingComplete as EventListener,
    );

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener(
        "typing-complete",
        handleTypingComplete as EventListener,
      );
    };
  });
</script>
