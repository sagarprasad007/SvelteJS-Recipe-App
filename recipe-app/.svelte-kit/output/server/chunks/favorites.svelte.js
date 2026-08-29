import { d as derived } from "./root.js";
import { r as recipeStore } from "./recipes.svelte.js";
function getInitialFavorites() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("rf_favorites");
  return stored ? JSON.parse(stored) : [];
}
class FavoritesStore {
  favoriteIds = getInitialFavorites();
  constructor() {
  }
  #favoriteRecipes = derived(
    // Derived favorited recipe objects
    () => {
      const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
      return all.filter((recipe) => this.isFavorite(recipe.id));
    }
  );
  get favoriteRecipes() {
    return this.#favoriteRecipes();
  }
  set favoriteRecipes($$value) {
    return this.#favoriteRecipes($$value);
  }
  isFavorite(recipeId) {
    if (!recipeId) return false;
    const cleanId = String(recipeId).trim();
    return this.favoriteIds.some((id) => String(id).trim() === cleanId);
  }
  /**
   * @param {string} recipeId
   */
  toggleFavorite(recipeId) {
    if (!recipeId) return;
    const cleanId = String(recipeId).trim();
    if (this.isFavorite(cleanId)) {
      this.favoriteIds = this.favoriteIds.filter((id) => String(id).trim() !== cleanId);
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
    this.favoriteIds = this.favoriteIds.filter((id) => String(id).trim() !== cleanId);
  }
}
const favoritesStore = new FavoritesStore();
export {
  favoritesStore as f
};
