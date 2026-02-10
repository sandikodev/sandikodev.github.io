<script lang="ts">
  import { getContext, type Snippet } from "svelte";

  import I3Window from "./I3Window.svelte";

  interface Props {
    background?: string;
    children?: Snippet;
    class?: string;
    focused?: boolean;
    _minimal?: boolean;
    title?: string;
    url?: string;
  }

  let {
    background = "",
    children,
    class: className = "",
    focused = $bindable(false),
    _minimal = false,
    title = "New Tab",
    url = "",
  }: Props = $props();

  let showProfilePopup = $state(false);

  // Get window actions from parent I3Window context
  const windowActions = getContext<any>("window-actions");

  function toggleProfile() {
    showProfilePopup = !showProfilePopup;
  }

  function closePopup() {
    showProfilePopup = false;
  }

  function handleClose() {
    if (windowActions) windowActions.close();
  }

  function handleToggleFloat() {
    if (windowActions) windowActions.toggleFloat();
  }
</script>

<I3Window
  {title}
  bind:focused
  resizable={true}
  frameless={true}
  class="browser-window-wrapper {className}"
  noOverflow={true}
>
  <div class="browser-window" class:focused>
    {#if _minimal}
      <div
        class="browser-header-minimal"
        use:windowActions.dragAction
        role="button"
        tabindex="-1"
      >
        <div class="traffic-lights">
          <button
            class="light red"
            onclick={handleClose}
            aria-label="Close"
            title="Close"
            data-action="close"
          ></button>
          <button
            class="light yellow"
            onclick={handleToggleFloat}
            aria-label="Toggle Float"
            title="Toggle Float"
            data-action="toggle-float"
          ></button>
          <button
            class="light green"
            aria-label="Maximize"
            title="Maximize"
            data-action="maximize"
          ></button>
        </div>
      </div>
    {/if}

    {#if !_minimal}
      <div
        class="browser-toolbar"
        use:windowActions.dragAction
        role="button"
        tabindex="-1"
      >
        <div class="traffic-lights">
          <button
            class="light red"
            onclick={handleClose}
            aria-label="Close"
            title="Close"
            data-action="close"
          ></button>
          <button
            class="light yellow"
            onclick={handleToggleFloat}
            aria-label="Toggle Float"
            title="Toggle Float"
            data-action="toggle-float"
          ></button>
          <button
            class="light green"
            aria-label="Maximize"
            title="Maximize"
            data-action="maximize"
          ></button>
        </div>

        <div class="nav-buttons">
          <button class="nav-btn" title="Back" data-action="back">←</button>
          <button class="nav-btn" title="Forward" data-action="forward"
            >→</button
          >
          <button class="nav-btn" title="Reload" data-action="reload">↻</button>
        </div>
        <div class="address-bar" data-action="address">
          <span class="lock-icon">🔒</span>
          <span class="url-text">{url}</span>
        </div>
        <div class="browser-actions">
          <button
            class="action-btn extension-btn"
            title="Extensions"
            data-action="extensions">🧩</button
          >

          <div class="profile-container">
            <button
              class="action-btn profile-btn"
              onclick={toggleProfile}
              title="Google Account"
              data-action="profile"
            >
              <div class="profile-icon">S</div>
            </button>

            {#if showProfilePopup}
              <button
                class="popup-overlay"
                onclick={closePopup}
                aria-label="Close popup"
                type="button"
              ></button>
              <div class="profile-popup">
                <div class="popup-header">
                  <div class="popup-avatar">S</div>
                  <div class="popup-user-info">
                    <div class="user-name">Sandiko</div>
                    <div class="user-email">sandiko@kopikonfig.com</div>
                  </div>
                  <button class="manage-account-btn"
                    >Manage your Google Account</button
                  >
                </div>

                <div class="popup-section">
                  <div class="section-title">Other profiles</div>
                  <button class="section-item">
                    <span class="item-icon">👤</span>
                    <span>Guest</span>
                  </button>
                  <button class="section-item">
                    <span class="item-icon">⚙️</span>
                    <span>Manage profiles</span>
                  </button>
                </div>

                <div class="popup-footer">
                  <button class="footer-item">
                    <span class="item-icon">➕</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            {/if}
          </div>

          <button
            class="action-btn"
            title="Customize and control Google Chrome"
            data-action="menu">⋮</button
          >
        </div>
      </div>
    {/if}

    <!-- Content area -->
    <div class="browser-content" style:background>
      {#if children}
        {@render children?.()}
      {/if}
    </div>
  </div>
</I3Window>

<style>
  :global(.browser-window-wrapper .i3-content) {
    padding: 0;
  }

  .browser-window {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-primary);
    border: 2px solid var(--i3-border-unfocused, #3b4261);
    transition: border-color 0.2s;
  }

  .browser-window.focused {
    border-color: var(--i3-border-focused, #7aa2f7);
    box-shadow: 0 0 10px rgba(122, 162, 247, 0.2);
  }

  .browser-header-minimal {
    display: flex;
    align-items: center;
    background: var(--bg-secondary);
    padding: 6px 8px;
    border-bottom: 1px solid var(--border-color);
    cursor: default;
    user-select: none;
  }

  .browser-header-minimal:focus,
  .browser-toolbar:focus {
    outline: none;
  }

  .traffic-lights {
    display: flex;
    gap: 8px;
    padding: 0 8px;
    flex-shrink: 0;
  }

  .light {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0;
    cursor: pointer;
    transition: filter 0.2s;
  }

  .light:hover {
    filter: brightness(1.2);
  }

  .light.red {
    background: #ff5f56;
  }
  .light.yellow {
    background: #ffbd2e;
  }
  .light.green {
    background: #27c93f;
  }

  .browser-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    cursor: default;
    user-select: none;
  }

  .nav-buttons {
    display: flex;
    gap: 4px;
    border-left: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
    padding-left: 12px;
  }

  .nav-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary);
  }

  .address-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-tertiary);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
  }

  .lock-icon {
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .url-text {
    color: var(--text-secondary);
  }

  .browser-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
  }

  .profile-btn {
    padding: 0;
  }

  .profile-container {
    position: relative;
  }

  .profile-icon {
    width: 24px;
    height: 24px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    background: linear-gradient(135deg, var(--blue), var(--magenta));
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }

  /* Profile Popup */
  .profile-popup {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 280px;
    background: #24273a;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: popupFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .popup-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: transparent;
    border: none;
    cursor: default;
    padding: 0;
  }

  @keyframes popupFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .popup-header {
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .popup-avatar {
    width: 64px;
    height: 64px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    background: linear-gradient(135deg, #7aa2f7, #bb9af7);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    margin-bottom: 12px;
  }

  .popup-user-info {
    text-align: center;
    margin-bottom: 16px;
  }

  .user-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .user-email {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .manage-account-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: var(--blue);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
  }

  .popup-section {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .section-title {
    padding: 8px 20px;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .section-item,
  .footer-item {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 0.9rem;
    cursor: pointer;
  }

  .section-item:hover,
  .footer-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .browser-content {
    flex: 1;
    overflow: auto;
  }

  /* Theme-consistent scrollbar for browser content - Refined nuance */
  .browser-content::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .browser-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .browser-content::-webkit-scrollbar-thumb {
    background: rgba(122, 162, 247, 0.2); /* Subtle blue from theme */
    border-radius: 10px;
    transition: background 0.2s;
  }

  .browser-content::-webkit-scrollbar-thumb:hover {
    background: rgba(122, 162, 247, 0.5);
  }

  /* Support for Firefox (nuanced thin scrollbar) */
  .browser-content {
    scrollbar-width: thin;
    scrollbar-color: rgba(122, 162, 247, 0.2) transparent;
  }
</style>
