import { recipeStore } from './recipes.svelte.js';

function getInitialFavorites() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('rf_favorites');
  return stored ? JSON.parse(stored) : [];
}

class FavoritesStore {
  favoriteIds = $state(getInitialFavorites());

  constructor() {
    if (typeof window !== 'undefined') {
      $effect.root(() => {
        $effect(() => {
          localStorage.setItem('rf_favorites', JSON.stringify(this.favoriteIds));
        });
      });
    }
  }

  // Derived favorited recipe objects
  favoriteRecipes = $derived.by(() => {
    const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
    return all.filter(recipe => this.isFavorite(recipe.id));
  });

  /**
   * @param {string} recipeId
   */
  isFavorite(recipeId) {
    if (!recipeId) return false;
    const cleanId = String(recipeId).trim();
    return this.favoriteIds.some((/** @type {string} */ id) => String(id).trim() === cleanId);
  }

  /**
   * @param {string} recipeId
   */
  toggleFavorite(recipeId) {
    if (!recipeId) return;
    const cleanId = String(recipeId).trim();
    if (this.isFavorite(cleanId)) {
      this.favoriteIds = this.favoriteIds.filter((/** @type {string} */ id) => String(id).trim() !== cleanId);
    } else {
      this.favoriteIds = [...this.favoriteIds, cleanId];
    }
  }

  /**
   * @param {string} recipeId
   */
  addFavorite(recipeId) {
    if (!recipeId) return;
    const cleanId = String(recipeId).trim();
    if (!this.isFavorite(cleanId)) {
      this.favoriteIds = [...this.favoriteIds, cleanId];
    }
  }

  /**
   * @param {string} recipeId
   */
  removeFavorite(recipeId) {
    if (!recipeId) return;
    const cleanId = String(recipeId).trim();
    this.favoriteIds = this.favoriteIds.filter((/** @type {string} */ id) => String(id).trim() !== cleanId);
  }
}

export const favoritesStore = new FavoritesStore();
