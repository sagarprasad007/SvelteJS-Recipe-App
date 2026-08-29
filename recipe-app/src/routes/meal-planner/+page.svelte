<script>
  import { goto } from '$app/navigation';
  import { recipeStore } from '$lib/stores/recipes.svelte.js';
  import { plannerStore, DAYS, MEAL_TYPES } from '$lib/stores/planner.svelte.js';
  import { toastStore } from '$lib/stores/toast.svelte.js';

  let isAssignModalOpen = $state(false);
  let activeDay = $state('Monday');
  let activeMealType = $state('Lunch');
  let selectedRecipeId = $state('');

  function getRecipeForSlot(day, mealType) {
    const recipeId = plannerStore.plan[day] ? plannerStore.plan[day][mealType] : null;
    if (!recipeId) return null;
    const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
    return all.find(r => r.id === recipeId) || null;
  }

  function openAssignModal(day, mealType) {
    activeDay = day;
    activeMealType = mealType;
    selectedRecipeId = plannerStore.plan[day] ? (plannerStore.plan[day][mealType] || '') : '';
    isAssignModalOpen = true;
  }

  function confirmAssignment() {
    if (selectedRecipeId) {
      plannerStore.assignMeal(activeDay, activeMealType, selectedRecipeId);
      toastStore.show(`Assigned meal to ${activeDay} ${activeMealType}!`);
    } else {
      plannerStore.removeMeal(activeDay, activeMealType);
    }
    isAssignModalOpen = false;
  }

  function handleRemoveSlot(day, mealType, e) {
    e.stopPropagation();
    plannerStore.removeMeal(day, mealType);
    toastStore.show(`Removed meal from ${day} ${mealType}`, 'info');
  }

  function handleClearAll() {
    if (confirm('Are you sure you want to clear your entire weekly meal plan?')) {
      plannerStore.clearPlan();
      toastStore.show('Weekly meal plan cleared', 'info');
    }
  }
</script>

<div class="container">
  <div class="planner-header">
    <div>
      <h1 class="page-title">Weekly Meal Planner</h1>
      <p class="page-subtitle">Organize your weekly nutrition, assign recipes to daily slots, and track preparation time.</p>
    </div>

    <div class="header-actions">
      <button class="btn btn-secondary" onclick={handleClearAll}>
        Clear Entire Week
      </button>
    </div>
  </div>

  <!-- Summary Stats Bar using Svelte 5 $derived -->
  <div class="stats-bar">
    <div class="stat-box">
      <span class="box-num">{plannerStore.totalPlannedMeals}</span>
      <span class="box-label">Total Meals Planned</span>
    </div>

    <div class="stat-box">
      <span class="box-num">{plannerStore.totalPrepTimeMins} mins</span>
      <span class="box-label">Est. Weekly Prep Time</span>
    </div>

    <div class="stat-box">
      <span class="box-num">{(plannerStore.totalPrepTimeMins / 60).toFixed(1)} hrs</span>
      <span class="box-label">Kitchen Time Total</span>
    </div>
  </div>

  <!-- Weekly Matrix Grid -->
  <div class="planner-matrix">
    {#each DAYS as day}
      <div class="day-card">
        <div class="day-header">
          <h3>{day}</h3>
        </div>

        <div class="slots-container">
          {#each MEAL_TYPES as slot}
            {@const recipe = getRecipeForSlot(day, slot)}
            <div 
              class="meal-slot {recipe ? 'filled' : 'empty'}" 
              role="button"
              tabindex="0"
              onclick={() => openAssignModal(day, slot)}
              onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAssignModal(day, slot); } }}
            >
              <div class="slot-badge-row">
                <rf-badge variant="outline" text={slot}></rf-badge>
                {#if recipe}
                  <button class="remove-btn" onclick={(e) => handleRemoveSlot(day, slot, e)} title="Remove recipe">×</button>
                {/if}
              </div>

              {#if recipe}
                <div class="assigned-recipe">
                  <img src={recipe.image} alt={recipe.title} />
                  <div class="assigned-info">
                    <h4>{recipe.title}</h4>
                    <span class="prep-meta">⏱ {recipe.prepTime} mins</span>
                  </div>
                </div>
              {:else}
                <div class="empty-slot-prompt">
                  <span>+ Assign Recipe</span>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Assign Recipe Modal using Stencil rf-modal -->
<rf-modal
  open={isAssignModalOpen}
  modal-title={`Assign Meal for ${activeDay} (${activeMealType})`}
  onrfClose={() => isAssignModalOpen = false}
>
  <div slot="content">
    <div class="form-group">
      <label for="select-recipe">Choose Recipe from your collection:</label>
      <select id="select-recipe" class="form-control" bind:value={selectedRecipeId}>
        <option value="">-- No Recipe (Leave Empty) --</option>
        
        <optgroup label="Custom Recipes">
          {#each recipeStore.userRecipes as recipe}
            <option value={recipe.id}>⭐ {recipe.title} ({recipe.prepTime} mins)</option>
          {/each}
        </optgroup>

        <optgroup label="Discovered Recipes">
          {#each recipeStore.apiRecipes as recipe}
            <option value={recipe.id}>{recipe.title} ({recipe.prepTime} mins)</option>
          {/each}
        </optgroup>
      </select>
    </div>
  </div>

  <div slot="footer">
    <button class="btn btn-secondary" onclick={() => isAssignModalOpen = false}>Cancel</button>
    <button class="btn btn-primary" onclick={confirmAssignment}>Save Assignment</button>
  </div>
</rf-modal>

<style>
  .planner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }

  .stat-box {
    background: var(--bg-surface);
    padding: 20px;
    border-radius: 16px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .box-num {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent-primary);
  }

  .box-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .planner-matrix {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }

  .day-card {
    background: var(--bg-surface);
    border-radius: 20px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .day-header {
    background: var(--bg-primary);
    padding: 14px 20px;
    border-bottom: 1px solid var(--border-color);
  }

  .day-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-primary);
  }

  .slots-container {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .meal-slot {
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px dashed var(--border-color);
  }

  .meal-slot.empty {
    background: var(--bg-primary);
  }

  .meal-slot.empty:hover {
    background: var(--border-color);
    border-color: var(--accent-primary);
  }

  .meal-slot.filled {
    background: var(--bg-surface);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
  }

  .meal-slot.filled:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  .slot-badge-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .remove-btn {
    background: var(--border-color);
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: var(--text-muted);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .remove-btn:hover {
    background: #ef4444;
    color: #ffffff;
  }

  .assigned-recipe {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .assigned-recipe img {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    object-fit: cover;
  }

  .assigned-info h4 {
    margin: 0 0 2px 0;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .prep-meta {
    font-size: 0.78rem;
    color: var(--text-secondary);
  }

  .empty-slot-prompt {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-muted);
    text-align: center;
    padding: 8px 0;
  }
</style>
