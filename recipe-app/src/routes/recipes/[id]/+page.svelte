<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { recipeStore } from '$lib/stores/recipes.svelte.js';
  import { favoritesStore } from '$lib/stores/favorites.svelte.js';
  import { plannerStore, DAYS, MEAL_TYPES } from '$lib/stores/planner.svelte.js';
  import { toastStore } from '$lib/stores/toast.svelte.js';

  let recipe = $state(null);
  let isLoading = $state(true);
  let isPlannerModalOpen = $state(false);
  let selectedDay = $state('Monday');
  let selectedMealType = $state('Lunch');
  let isFavorite = $derived(recipe ? favoritesStore.isFavorite(recipe.id) : false);

  let checkedIngredients = $state({});

  $effect(() => {
    const id = $page.params.id;
    if (id) {
      loadRecipe(id);
    }
  });

  async function loadRecipe(id) {
    isLoading = true;
    recipe = await recipeStore.getRecipeById(id);
    isLoading = false;
  }

  function toggleIngredient(idx) {
    checkedIngredients[idx] = !checkedIngredients[idx];
  }

  function handleAssignToPlanner() {
    if (recipe) {
      plannerStore.assignMeal(selectedDay, selectedMealType, recipe.id);
      isPlannerModalOpen = false;
      toastStore.show(`Assigned "${recipe.title}" to ${selectedDay} ${selectedMealType}!`);
    }
  }

  function shareRecipe() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toastStore.show('Recipe link copied to clipboard!');
    }
  }

  function printRecipe() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
</script>

<div class="container">
  {#if isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading recipe details...</p>
    </div>
  {:else if !recipe}
    <div class="empty-state">
      <h3>Recipe Not Found</h3>
      <p>The requested recipe could not be loaded or may have been removed.</p>
      <a href="/" class="btn btn-primary">Back to Discovery</a>
    </div>
  {:else}
    <nav class="breadcrumb">
      <a href="/">Recipes</a> / <span>{recipe.title}</span>
    </nav>

    <div class="detail-hero">
      <div class="hero-image-wrapper">
        <img src={recipe.image} alt={recipe.title} />
        {#if recipe.isUserCreated}
          <span class="user-badge">Custom Recipe</span>
        {/if}
      </div>

      <div class="hero-info">
        <div class="meta-pills">
          <rf-badge variant="primary" text={recipe.category}></rf-badge>
          <rf-badge variant="secondary" text={'Difficulty: ' + recipe.difficulty}></rf-badge>
        </div>

        <h1 class="recipe-headline">{recipe.title}</h1>
        <p class="recipe-desc">{recipe.description}</p>

        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Prep Time</span>
            <span class="stat-val">{recipe.prepTime} mins</span>
          </div>

          <div class="stat-card">
            <span class="stat-label">Servings</span>
            <span class="stat-val">{recipe.servings || 4} Portions</span>
          </div>

          <div class="stat-card">
            <span class="stat-label">Rating</span>
            <span class="stat-val">
              <rf-rating value={Number(recipe.rating)} show-label={true}></rf-rating>
            </span>
          </div>
        </div>

        <div class="action-bar">
          <button 
            class="btn {isFavorite ? 'btn-secondary' : 'btn-primary'}"
            onclick={() => {
              favoritesStore.toggleFavorite(recipe.id);
              toastStore.show(isFavorite ? 'Removed from Favorites' : 'Saved to Favorites!');
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill={isFavorite ? '#ef4444' : 'none'} stroke={isFavorite ? '#ef4444' : 'currentColor'} stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>

          <button class="btn btn-secondary" onclick={() => isPlannerModalOpen = true}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Add to Meal Plan
          </button>

          <button class="btn btn-secondary" onclick={shareRecipe} title="Copy Recipe Link">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Share
          </button>

          <button class="btn btn-secondary" onclick={printRecipe} title="Print Recipe View">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>

    <div class="content-layout">
      <!-- Ingredients Checklist -->
      <section class="section-card ingredients-section">
        <h2>Ingredients ({recipe.ingredients.length})</h2>
        <ul class="ingredients-list">
          {#each recipe.ingredients as ingredient, idx}
            <label class="ingredient-item {checkedIngredients[idx] ? 'checked' : ''}">
              <input type="checkbox" checked={checkedIngredients[idx]} onchange={() => toggleIngredient(idx)} />
              <span>{ingredient}</span>
            </label>
          {/each}
        </ul>
      </section>

      <!-- Step-by-Step Preparation -->
      <section class="section-card instructions-section">
        <h2>Instructions</h2>
        <ol class="instructions-list">
          {#each recipe.instructions as step, idx}
            <li class="step-item">
              <span class="step-num">{idx + 1}</span>
              <p class="step-text">{step}</p>
            </li>
          {/each}
        </ol>
      </section>
    </div>
  {/if}
</div>

<!-- Meal Planner Assignment Modal using Stencil rf-modal -->
<rf-modal
  open={isPlannerModalOpen}
  modal-title="Add to Weekly Meal Plan"
  onrfClose={() => isPlannerModalOpen = false}
>
  <div slot="content">
    <p style="margin-bottom: 16px;">Choose which day and meal slot to assign <strong>{recipe?.title}</strong>:</p>
    
    <div class="form-group">
      <label for="planner-day-select">Select Day of Week</label>
      <select id="planner-day-select" class="form-control" bind:value={selectedDay}>
        {#each DAYS as day}
          <option value={day}>{day}</option>
        {/each}
      </select>
    </div>

    <div class="form-group">
      <label for="planner-slot-select">Select Meal Slot</label>
      <select id="planner-slot-select" class="form-control" bind:value={selectedMealType}>
        {#each MEAL_TYPES as slot}
          <option value={slot}>{slot}</option>
        {/each}
      </select>
    </div>
  </div>

  <div slot="footer">
    <button class="btn btn-secondary" onclick={() => isPlannerModalOpen = false}>Cancel</button>
    <button class="btn btn-primary" onclick={handleAssignToPlanner}>Confirm Assignment</button>
  </div>
</rf-modal>

<style>
  .breadcrumb {
    margin-bottom: 24px;
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .breadcrumb a {
    color: var(--accent-primary);
    font-weight: 600;
  }

  .detail-hero {
    display: grid;
    grid-template-columns: 1fr;
    gap: 36px;
    background: var(--bg-surface);
    padding: 32px;
    border-radius: 24px;
    box-shadow: var(--shadow-md);
    margin-bottom: 36px;
    border: 1px solid var(--border-color);
  }

  @media (min-width: 900px) {
    .detail-hero {
      grid-template-columns: 460px 1fr;
    }
  }

  .hero-image-wrapper {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    height: 340px;
  }

  .hero-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #ffffff;
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .meta-pills {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }

  .recipe-headline {
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 14px;
  }

  .recipe-desc {
    color: var(--text-secondary);
    font-size: 1.05rem;
    margin-bottom: 24px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    background: var(--bg-primary);
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 28px;
    border: 1px solid var(--border-color);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-muted);
  }

  .stat-val {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-primary);
  }

  .action-bar {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .content-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
  }

  @media (min-width: 900px) {
    .content-layout {
      grid-template-columns: 380px 1fr;
    }
  }

  .section-card {
    background: var(--bg-surface);
    padding: 32px;
    border-radius: 24px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  .section-card h2 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--border-color);
  }

  .ingredients-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ingredient-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background: var(--bg-primary);
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
  }

  .ingredient-item:hover {
    background: var(--border-color);
  }

  .ingredient-item.checked {
    text-decoration: line-through;
    opacity: 0.55;
  }

  .instructions-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .step-item {
    display: flex;
    gap: 20px;
  }

  .step-num {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--accent-gradient);
    color: #ffffff;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-text {
    font-size: 1.05rem;
    color: var(--text-primary);
    line-height: 1.6;
  }

  .loading-state {
    text-align: center;
    padding: 80px 0;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media print {
    :global(rf-navbar), .action-bar, .breadcrumb, :global(rf-modal), :global(.toast-banner), :global(.app-footer) {
      display: none !important;
    }
    .detail-hero, .section-card {
      box-shadow: none !important;
      border: none !important;
    }
  }
</style>
