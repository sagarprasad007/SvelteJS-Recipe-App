<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { recipeStore } from '$lib/stores/recipes.svelte.js';
  import { favoritesStore } from '$lib/stores/favorites.svelte.js';

  const categories = ["All", "Breakfast", "Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Vegetarian", "Custom"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  let currentPage = $state(1);
  let itemsPerPage = 9;

  let totalRecipes = $derived(recipeStore.filteredRecipes.length);
  let totalPages = $derived(Math.ceil(totalRecipes / itemsPerPage));
  let paginatedRecipes = $derived(
    recipeStore.filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  // Smart Truncated Pagination Window
  let visiblePages = $derived.by(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  });

  onMount(() => {
    recipeStore.search();
  });

  function handleSearch(e) {
    currentPage = 1;
    const { query, category, maxPrepTime } = e.detail || {};
    recipeStore.search(query, category, maxPrepTime, recipeStore.selectedDifficulty);
  }

  function handleClear() {
    currentPage = 1;
    recipeStore.search('', 'All', 0, 'All');
  }

  function handleCategoryFilter(cat) {
    currentPage = 1;
    recipeStore.search(recipeStore.searchQuery, cat, recipeStore.maxPrepTime, recipeStore.selectedDifficulty);
  }

  function handleDifficultyFilter(diff) {
    currentPage = 1;
    recipeStore.search(recipeStore.searchQuery, recipeStore.selectedCategory, recipeStore.maxPrepTime, diff);
  }

  function goToPage(p) {
    if (typeof p === 'number' && p >= 1 && p <= totalPages) {
      currentPage = p;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    }
  }

  function handleRecipeSelect(e) {
    const id = e.detail?.recipeId;
    if (id) goto(`/recipes/${id}`);
  }

  function handleFavoriteToggle(e) {
    const recipeId = e.detail?.recipeId;
    if (recipeId) {
      favoritesStore.toggleFavorite(recipeId);
    }
  }

  function setupSearchBarEvents(node) {
    const onSearch = (e) => handleSearch(e);
    const onClear = () => handleClear();

    node.addEventListener('rfSearch', onSearch);
    node.addEventListener('rfClear', onClear);

    return {
      destroy() {
        node.removeEventListener('rfSearch', onSearch);
        node.removeEventListener('rfClear', onClear);
      }
    };
  }

  function setupRecipeCardEvents(node) {
    const onSelect = (e) => handleRecipeSelect(e);
    const onFavToggle = (e) => handleFavoriteToggle(e);

    node.addEventListener('rfSelect', onSelect);
    node.addEventListener('rfFavoriteToggle', onFavToggle);

    return {
      destroy() {
        node.removeEventListener('rfSelect', onSelect);
        node.removeEventListener('rfFavoriteToggle', onFavToggle);
      }
    };
  }
</script>

<div class="container">
  <header class="hero-section">
    <h1 class="page-title">Discover Delicious Recipes</h1>
    <p class="page-subtitle">Search thousands of gourmet dishes, filter by dietary preferences & prep time, or create your own recipes.</p>

    <!-- Stencil Web Component Integration: rf-search-bar -->
    <rf-search-bar
      use:setupSearchBarEvents
      placeholder="Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)..."
      search-value={recipeStore.searchQuery}
      selected-category={recipeStore.selectedCategory}
      selected-prep-time={recipeStore.maxPrepTime}
      categories-json={JSON.stringify(categories)}
      onrfSearch={handleSearch}
      onrfClear={handleClear}
    ></rf-search-bar>
  </header>

  <!-- Filters Row: Category Pills & Difficulty Pills -->
  <div class="filters-bar">
    <div class="category-pills">
      {#each categories as cat}
        <button 
          class="pill-btn {recipeStore.selectedCategory === cat ? 'active' : ''}"
          aria-label="Filter by {cat}"
          onclick={() => handleCategoryFilter(cat)}
        >
          <rf-badge 
            variant={recipeStore.selectedCategory === cat ? 'primary' : 'secondary'}
            text={cat}
          ></rf-badge>
        </button>
      {/each}
    </div>

    <!-- Quick Difficulty Filter Pills -->
    <div class="difficulty-pills">
      <span class="diff-label">Difficulty:</span>
      {#each difficulties as diff}
        <button 
          class="diff-btn {recipeStore.selectedDifficulty === diff ? 'active' : ''}"
          onclick={() => handleDifficultyFilter(diff)}
        >
          {diff === 'All' ? 'All Skill Levels' : diff}
        </button>
      {/each}
    </div>
  </div>

  <!-- Loading State -->
  {#if recipeStore.isLoading}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Discovering culinary delights...</p>
    </div>
  {:else if totalRecipes === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
      <h3>No Recipes Found</h3>
      <p>We couldn't find any recipes matching your criteria. Try adjusting your search query or filters.</p>
      <button class="btn btn-secondary" onclick={handleClear}>Reset Filters</button>
    </div>
  {:else}
    <div class="recipe-grid">
      {#each paginatedRecipes as recipe (recipe.id)}
        <!-- Stencil Web Component Integration: rf-recipe-card -->
        <rf-recipe-card
          use:setupRecipeCardEvents
          recipe-id={recipe.id}
          recipe-title={recipe.title}
          image={recipe.image}
          category={recipe.category}
          prep-time={recipe.prepTime}
          difficulty={recipe.difficulty}
          rating={recipe.rating}
          is-favorite={favoritesStore.isFavorite(recipe.id)}
          is-user-created={recipe.isUserCreated}
        ></rf-recipe-card>
      {/each}
    </div>

    <!-- Clean Truncated Pagination Bar -->
    {#if totalPages > 1}
      <div class="pagination-container">
        <span class="pagination-info">
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to <strong>{Math.min(currentPage * itemsPerPage, totalRecipes)}</strong> of <strong>{totalRecipes}</strong> recipes
        </span>

        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            disabled={currentPage === 1} 
            onclick={() => goToPage(currentPage - 1)}
          >
            ← Previous
          </button>

          {#each visiblePages as pageItem}
            {#if pageItem === '...'}
              <span class="pagination-ellipsis">...</span>
            {:else}
              <button 
                class="pagination-num {currentPage === pageItem ? 'active' : ''}" 
                onclick={() => goToPage(Number(pageItem))}
              >
                {pageItem}
              </button>
            {/if}
          {/each}

          <button 
            class="pagination-btn" 
            disabled={currentPage === totalPages} 
            onclick={() => goToPage(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .hero-section {
    margin-bottom: 32px;
  }

  .filters-bar {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 36px;
  }

  @media (min-width: 900px) {
    .filters-bar {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .category-pills {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .pill-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .difficulty-pills {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .diff-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-right: 4px;
  }

  .diff-btn {
    padding: 6px 14px;
    border-radius: 9999px;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .diff-btn:hover {
    background: var(--border-color);
    color: var(--text-primary);
  }

  .diff-btn.active {
    background: var(--accent-primary);
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }

  .loading-state {
    text-align: center;
    padding: 80px 0;
    color: var(--text-secondary);
  }

  .spinner {
    width: 44px;
    height: 44px;
    border: 4px solid var(--border-color);
    border-top-color: var(--accent-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Clean Pagination Bar Styles */
  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 48px;
    padding: 20px 24px;
    background: var(--bg-surface);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  @media (min-width: 768px) {
    .pagination-container {
      flex-direction: row;
    }
  }

  .pagination-info {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pagination-btn {
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-primary);
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .pagination-btn:hover:not(:disabled) {
    background: var(--border-color);
  }

  .pagination-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .pagination-num {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-weight: 700;
    font-size: 0.88rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination-num:hover {
    background: var(--border-color);
    color: var(--text-primary);
  }

  .pagination-num.active {
    background: var(--accent-gradient);
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
  }

  .pagination-ellipsis {
    color: var(--text-muted);
    font-weight: 700;
    padding: 0 6px;
    font-size: 1rem;
    user-select: none;
  }
</style>
