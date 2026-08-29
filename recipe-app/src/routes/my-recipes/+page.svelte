<script>
  import { recipeStore } from '$lib/stores/recipes.svelte.js';
  import { favoritesStore } from '$lib/stores/favorites.svelte.js';
  import { goto } from '$app/navigation';

  let isModalOpen = $state(false);
  let editingRecipeId = $state(null);

  // Form State
  let title = $state('');
  let category = $state('Breakfast');
  let prepTime = $state(20);
  let difficulty = $state('Easy');
  let servings = $state(2);
  let image = $state('');
  let description = $state('');
  let ingredientsText = $state('');
  let instructionsText = $state('');

  let formErrors = $state({});

  function resetForm() {
    editingRecipeId = null;
    title = '';
    category = 'Breakfast';
    prepTime = 20;
    difficulty = 'Easy';
    servings = 2;
    image = '';
    description = '';
    ingredientsText = '';
    instructionsText = '';
    formErrors = {};
  }

  function openCreateModal() {
    resetForm();
    isModalOpen = true;
  }

  function openEditModal(recipe) {
    editingRecipeId = recipe.id;
    title = recipe.title;
    category = recipe.category;
    prepTime = recipe.prepTime;
    difficulty = recipe.difficulty || 'Easy';
    servings = recipe.servings || 2;
    image = recipe.image || '';
    description = recipe.description || '';
    ingredientsText = Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients;
    instructionsText = Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : recipe.instructions;
    formErrors = {};
    isModalOpen = true;
  }

  function handleSubmit() {
    const recipePayload = {
      title,
      category,
      prepTime,
      difficulty,
      servings,
      image,
      description,
      ingredients: ingredientsText.split('\n').filter(i => i.trim()),
      instructions: instructionsText.split('\n').filter(i => i.trim())
    };

    let result;
    if (editingRecipeId) {
      result = recipeStore.updateUserRecipe(editingRecipeId, recipePayload);
    } else {
      result = recipeStore.addUserRecipe(recipePayload);
    }

    if (!result.isValid) {
      formErrors = result.errors;
    } else {
      isModalOpen = false;
      resetForm();
    }
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this custom recipe?')) {
      recipeStore.deleteUserRecipe(id);
    }
  }

  function handleRecipeSelect(e) {
    const id = e.detail?.recipeId;
    if (id) goto(`/recipes/${id}`);
  }

  function handleFavoriteToggle(e) {
    const { recipeId } = e.detail || {};
    if (recipeId) favoritesStore.toggleFavorite(recipeId);
  }
</script>

<div class="container">
  <div class="header-row">
    <div>
      <h1 class="page-title">My Custom Recipes</h1>
      <p class="page-subtitle">Manage, edit, and create your own private collection of culinary creations.</p>
    </div>
    <button class="btn btn-primary" onclick={openCreateModal}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Add New Recipe
    </button>
  </div>

  {#if recipeStore.userRecipes.length === 0}
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      <h3>No Custom Recipes Yet</h3>
      <p>You haven't created any custom recipes. Click "Add New Recipe" to start building your cookbook!</p>
      <button class="btn btn-primary" onclick={openCreateModal}>Create First Recipe</button>
    </div>
  {:else}
    <div class="recipe-grid">
      {#each recipeStore.userRecipes as recipe (recipe.id)}
        <div class="custom-card-wrapper">
          <rf-recipe-card
            recipe-id={recipe.id}
            recipe-title={recipe.title}
            image={recipe.image}
            category={recipe.category}
            prep-time={recipe.prepTime}
            difficulty={recipe.difficulty}
            rating={recipe.rating}
            is-favorite={favoritesStore.isFavorite(recipe.id)}
            is-user-created={true}
            onrfSelect={handleRecipeSelect}
            onrfFavoriteToggle={handleFavoriteToggle}
          >
            <div slot="actions" class="custom-actions">
              <button class="btn btn-secondary action-btn" onclick={() => openEditModal(recipe)}>
                Edit
              </button>
              <button class="btn btn-danger action-btn" onclick={() => handleDelete(recipe.id)}>
                Delete
              </button>
            </div>
          </rf-recipe-card>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- Create / Edit Recipe Modal using Stencil rf-modal -->
<rf-modal
  open={isModalOpen}
  modal-title={editingRecipeId ? "Edit Custom Recipe" : "Create New Recipe"}
  onrfClose={() => isModalOpen = false}
>
  <div slot="content">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div class="form-group">
        <label for="recipe-title-input">Recipe Title *</label>
        <input id="recipe-title-input" type="text" class="form-control" bind:value={title} placeholder="e.g. Grandma's Special Apple Pie" />
        {#if formErrors.title}
          <span class="error-msg">{formErrors.title}</span>
        {/if}
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="recipe-category-select">Category *</label>
          <select id="recipe-category-select" class="form-control" bind:value={category}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Pasta">Pasta</option>
            <option value="Seafood">Seafood</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Snack">Snack</option>
          </select>
          {#if formErrors.category}
            <span class="error-msg">{formErrors.category}</span>
          {/if}
        </div>

        <div class="form-group">
          <label for="recipe-preptime-input">Prep Time (mins) *</label>
          <input id="recipe-preptime-input" type="number" class="form-control" bind:value={prepTime} min="1" />
          {#if formErrors.prepTime}
            <span class="error-msg">{formErrors.prepTime}</span>
          {/if}
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="recipe-difficulty-select">Difficulty</label>
          <select id="recipe-difficulty-select" class="form-control" bind:value={difficulty}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div class="form-group">
          <label for="recipe-servings-input">Servings</label>
          <input id="recipe-servings-input" type="number" class="form-control" bind:value={servings} min="1" />
        </div>
      </div>

      <div class="form-group">
        <label for="recipe-image-input">Image URL</label>
        <input id="recipe-image-input" type="url" class="form-control" bind:value={image} placeholder="https://images.unsplash.com/..." />
      </div>

      <div class="form-group">
        <label for="recipe-desc-textarea">Short Description</label>
        <textarea id="recipe-desc-textarea" class="form-control" bind:value={description} placeholder="Brief summary of your dish..."></textarea>
      </div>

      <div class="form-group">
        <label for="recipe-ingredients-textarea">Ingredients (One per line) *</label>
        <textarea id="recipe-ingredients-textarea" class="form-control" bind:value={ingredientsText} rows="4" placeholder="2 cups Flour&#10;1 tsp Baking Powder&#10;1/2 cup Milk"></textarea>
        {#if formErrors.ingredients}
          <span class="error-msg">{formErrors.ingredients}</span>
        {/if}
      </div>

      <div class="form-group">
        <label for="recipe-instructions-textarea">Instructions (One step per line) *</label>
        <textarea id="recipe-instructions-textarea" class="form-control" bind:value={instructionsText} rows="4" placeholder="Preheat oven to 350°F.&#10;Mix dry ingredients together.&#10;Bake for 25 minutes."></textarea>
        {#if formErrors.instructions}
          <span class="error-msg">{formErrors.instructions}</span>
        {/if}
      </div>
    </form>
  </div>

  <div slot="footer">
    <button class="btn btn-secondary" onclick={() => isModalOpen = false}>Cancel</button>
    <button class="btn btn-primary" onclick={handleSubmit}>
      {editingRecipeId ? 'Save Changes' : 'Create Recipe'}
    </button>
  </div>
</rf-modal>

<style>
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .custom-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .action-btn {
    flex: 1;
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .error-msg {
    color: #ef4444;
    font-size: 0.78rem;
    font-weight: 600;
    margin-top: 4px;
  }
</style>
