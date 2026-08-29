<script>
  import { goto } from '$app/navigation';
  import { favoritesStore } from '$lib/stores/favorites.svelte.js';

  function handleRecipeSelect(e) {
    const id = e.detail?.recipeId;
    if (id) goto(`/recipes/${id}`);
  }

  function handleFavoriteToggle(e) {
    const recipeId = e.detail?.recipeId;
    if (recipeId) favoritesStore.toggleFavorite(recipeId);
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
  <div class="header-row">
    <div>
      <h1 class="page-title">Favorite Recipes</h1>
      <p class="page-subtitle">Your personal collection of saved gourmet meals and favorite dishes.</p>
    </div>
  </div>

  {#if favoritesStore.favoriteRecipes.length === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
      <h3>No Favorites Saved Yet</h3>
      <p>Click the heart icon on any recipe to save it here for quick access!</p>
      <a href="/" class="btn btn-primary">Browse Recipes</a>
    </div>
  {:else}
    <div class="recipe-grid">
      {#each favoritesStore.favoriteRecipes as recipe (recipe.id)}
        <rf-recipe-card
          use:setupRecipeCardEvents
          recipe-id={recipe.id}
          recipe-title={recipe.title}
          image={recipe.image}
          category={recipe.category}
          prep-time={recipe.prepTime}
          difficulty={recipe.difficulty}
          rating={recipe.rating}
          is-favorite={true}
          is-user-created={recipe.isUserCreated}
        ></rf-recipe-card>
      {/each}
    </div>
  {/if}
</div>

<style>
  .header-row {
    margin-bottom: 28px;
  }
</style>
