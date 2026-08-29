import { fetchRecipesFromApi, fetchRecipeByIdFromApi } from '$lib/services/api.js';

// Helper for LocalStorage
function getInitialUserRecipes() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('rf_user_recipes');
  return stored ? JSON.parse(stored) : [];
}

class RecipeStore {
  userRecipes = $state(getInitialUserRecipes());
  apiRecipes = $state([]);
  searchQuery = $state('');
  selectedCategory = $state('All');
  selectedDifficulty = $state('All');
  maxPrepTime = $state(0);
  isLoading = $state(false);

  constructor() {
    if (typeof window !== 'undefined') {
      $effect.root(() => {
        $effect(() => {
          localStorage.setItem('rf_user_recipes', JSON.stringify(this.userRecipes));
        });
      });
    }
  }

  // Derived filtered recipes list (Default Alphabetical Ascending A-Z Sort)
  filteredRecipes = $derived.by(() => {
    const all = [...this.userRecipes, ...this.apiRecipes];
    const filtered = all.filter(recipe => {
      const q = this.searchQuery.trim().toLowerCase();
      const matchesQuery = !q || recipe.title.toLowerCase().includes(q) || (recipe.ingredients && recipe.ingredients.some(i => i.toLowerCase().includes(q)));
      
      const matchesCategory = this.selectedCategory === 'All' || 
        (this.selectedCategory === 'Custom' ? recipe.isUserCreated : recipe.category.toLowerCase() === this.selectedCategory.toLowerCase());
      
      const matchesDifficulty = this.selectedDifficulty === 'All' || 
        recipe.difficulty.toLowerCase() === this.selectedDifficulty.toLowerCase();

      const matchesPrepTime = this.maxPrepTime === 0 || recipe.prepTime <= this.maxPrepTime;

      return matchesQuery && matchesCategory && matchesDifficulty && matchesPrepTime;
    });

    // Default Ascending Sort (A-Z) by recipe title
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  });

  /**
   * @param {string} query
   * @param {string} category
   * @param {number} prepTime
   * @param {string} difficulty
   */
  async search(query = '', category = 'All', prepTime = 0, difficulty = 'All') {
    this.searchQuery = query;
    this.selectedCategory = category;
    this.maxPrepTime = prepTime;
    this.selectedDifficulty = difficulty;
    this.isLoading = true;

    try {
      if (category !== 'Custom') {
        const fetched = await fetchRecipesFromApi(query, category);
        this.apiRecipes = fetched;
      }
    } catch (e) {
      console.error('Search error:', e);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * @param {any} recipe
   */
  validateRecipeInput(recipe) {
    const errors = {};
    if (!recipe.title || recipe.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long.';
    }
    if (!recipe.category) {
      errors.category = 'Category is required.';
    }
    if (!recipe.prepTime || Number(recipe.prepTime) <= 0) {
      errors.prepTime = 'Prep time must be greater than 0 minutes.';
    }
    if (!recipe.ingredients || recipe.ingredients.length === 0 || (recipe.ingredients.length === 1 && !recipe.ingredients[0].trim())) {
      errors.ingredients = 'At least one ingredient is required.';
    }
    if (!recipe.instructions || recipe.instructions.length === 0 || (recipe.instructions.length === 1 && !recipe.instructions[0].trim())) {
      errors.instructions = 'Step-by-step instructions are required.';
    }
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * @param {any} recipeInput
   */
  addUserRecipe(recipeInput) {
    const validation = this.validateRecipeInput(recipeInput);
    if (!validation.isValid) return validation;

    const newRecipe = {
      id: 'user-' + Date.now(),
      title: recipeInput.title.trim(),
      image: recipeInput.image && recipeInput.image.trim() ? recipeInput.image.trim() : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      category: recipeInput.category,
      prepTime: Number(recipeInput.prepTime),
      difficulty: recipeInput.difficulty || 'Easy',
      rating: 5.0,
      servings: Number(recipeInput.servings) || 2,
      description: recipeInput.description || 'Delicious home-made creation.',
      ingredients: Array.isArray(recipeInput.ingredients) ? recipeInput.ingredients : recipeInput.ingredients.split('\n').filter((/** @type {string} */ i) => i.trim()),
      instructions: Array.isArray(recipeInput.instructions) ? recipeInput.instructions : recipeInput.instructions.split('\n').filter((/** @type {string} */ i) => i.trim()),
      isUserCreated: true
    };

    this.userRecipes = [newRecipe, ...this.userRecipes];
    return { isValid: true, recipe: newRecipe };
  }

  /**
   * @param {string} id
   * @param {any} recipeInput
   */
  updateUserRecipe(id, recipeInput) {
    const validation = this.validateRecipeInput(recipeInput);
    if (!validation.isValid) return validation;

    const index = this.userRecipes.findIndex((/** @type {any} */ r) => r.id === id);
    if (index !== -1) {
      this.userRecipes[index] = {
        ...this.userRecipes[index],
        title: recipeInput.title.trim(),
        image: recipeInput.image ? recipeInput.image.trim() : this.userRecipes[index].image,
        category: recipeInput.category,
        prepTime: Number(recipeInput.prepTime),
        difficulty: recipeInput.difficulty,
        servings: Number(recipeInput.servings) || 2,
        description: recipeInput.description,
        ingredients: Array.isArray(recipeInput.ingredients) ? recipeInput.ingredients : recipeInput.ingredients.split('\n').filter((/** @type {string} */ i) => i.trim()),
        instructions: Array.isArray(recipeInput.instructions) ? recipeInput.instructions : recipeInput.instructions.split('\n').filter((/** @type {string} */ i) => i.trim()),
      };
      this.userRecipes = [...this.userRecipes];
    }
    return { isValid: true };
  }

  /**
   * @param {string} id
   */
  deleteUserRecipe(id) {
    this.userRecipes = this.userRecipes.filter((/** @type {any} */ r) => r.id !== id);
  }

  /**
   * @param {string} id
   */
  async getRecipeById(id) {
    if (!id) return null;
    const cleanId = String(id).trim();

    // 1. Check user recipes (LocalStorage)
    const userRecipe = this.userRecipes.find((/** @type {any} */ r) => String(r.id) === cleanId);
    if (userRecipe) return userRecipe;

    // 2. Fetch full detailed recipe from public API (full ingredients & step-by-step instructions)
    const fullApiRecipe = await fetchRecipeByIdFromApi(cleanId);
    if (fullApiRecipe) return fullApiRecipe;

    // 3. Fallback to in-memory summary recipe if network fails
    return this.apiRecipes.find((/** @type {any} */ r) => String(r.id) === cleanId) || null;
  }
}

export const recipeStore = new RecipeStore();
