<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { toastStore } from '$lib/stores/toast.svelte.js';
  import '../app.css';

  let { children } = $props();

  let activePath = $derived($page.url.pathname);
  let theme = $state('light');

  onMount(async () => {
    const savedTheme = localStorage.getItem('rf_theme') || 'light';
    theme = savedTheme;
    document.documentElement.setAttribute('data-theme', theme);

    if (typeof window !== 'undefined') {
      try {
        const { defineCustomElements } = await import('recipe-finder-ui-components/loader');
        defineCustomElements(window, { resourcesUrl: '/stencil/' });
      } catch (e) {
        console.warn('Custom element registration:', e);
      }
    }
  });

  function toggleTheme(newTheme) {
    theme = newTheme;
    if (typeof window !== 'undefined') {
      localStorage.setItem('rf_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }

  function handleNavigate(e) {
    const path = e.detail?.path || '/';
    goto(path);
  }
</script>

<div class="app-shell">
  <rf-navbar
    brand-name="TasteCraft"
    active-route={activePath}
    onrfNavigate={handleNavigate}
  >
    <div slot="actions" class="actions-wrapper">
      <!-- Theme Switcher Pill -->
      <div class="theme-switcher">
        <button 
          class="theme-toggle-btn {theme === 'light' ? 'active' : ''}" 
          onclick={() => toggleTheme('light')}
          title="Light Mode"
          aria-label="Light Mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>

        <button 
          class="theme-toggle-btn {theme === 'dark' ? 'active' : ''}" 
          onclick={() => toggleTheme('dark')}
          title="Dark Mode"
          aria-label="Dark Mode"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>

      <a href="/my-recipes" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Recipe
      </a>
    </div>
  </rf-navbar>

  <main class="main-content">
    {@render children()}
  </main>

  <!-- Floating Toast Banner -->
  {#if toastStore.visible}
    <div class="toast-banner {toastStore.type}">
      <span class="toast-icon">✓</span>
      <span class="toast-text">{toastStore.message}</span>
      <button class="toast-close" onclick={() => toastStore.dismiss()}>×</button>
    </div>
  {/if}

  <footer class="app-footer">
    <div class="container footer-content">
      <p>© 2026 TasteCraft Recipe Finder & Meal Planner. Built with Svelte 5, SvelteKit, and StencilJS.</p>
    </div>
  </footer>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .main-content {
    flex: 1;
  }

  .app-footer {
    border-top: 1px solid var(--border-color);
    background: var(--bg-surface);
    padding: 24px 0;
    margin-top: 60px;
    text-align: center;
    color: var(--text-muted);
    font-size: 0.875rem;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  /* Toast Notification Styling */
  .toast-banner {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 14px;
    background: var(--bg-surface);
    color: var(--text-primary);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    font-size: 0.92rem;
    font-weight: 600;
    animation: slideUp 0.3s ease-out;
  }

  .toast-banner.success {
    border-left: 4px solid #10b981;
  }

  .toast-banner.info {
    border-left: 4px solid #6366f1;
  }

  .toast-icon {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #10b981;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .toast-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-muted);
    cursor: pointer;
    margin-left: 8px;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
</style>
