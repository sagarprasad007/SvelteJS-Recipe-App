import { d as derived } from "./root.js";
import { r as recipeStore } from "./recipes.svelte.js";
function getInitialFavorites() {
  if (typeof window === "undefined") return ["m1", "m3"];
  const stored = localStorage.getItem("rf_favorites");
  return stored ? JSON.parse(stored) : ["m1", "m3"];
}
class FavoritesStore {
  favoriteIds = getInitialFavorites();
  constructor() {
  }
  #favoriteRecipes = derived(
    // Derived favorited recipe objects
    () => {
      const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
      return all.filter((recipe) => this.favoriteIds.includes(recipe.id));
    }
  );
  get favoriteRecipes() {
    return this.#favoriteRecipes();
  }
  set favoriteRecipes($$value) {
    return this.#favoriteRecipes($$value);
  }
  isFavorite(recipeId) {
    return this.favoriteIds.includes(recipeId);
  }
  /**
   * @param {string} recipeId
   */
  toggleFavorite(recipeId) {
    if (this.favoriteIds.includes(recipeId)) {
      this.favoriteIds = this.favoriteIds.filter((id) => id !== recipeId);
    } else {
      this.favoriteIds = [...this.favoriteIds, recipeId];
    }
  }
  /**
   * @param {string} recipeId
   */
  addFavorite(recipeId) {
    if (!this.favoriteIds.includes(recipeId)) {
      this.favoriteIds = [...this.favoriteIds, recipeId];
    }
  }
  /**
   * @param {string} recipeId
   */
  removeFavorite(recipeId) {
    this.favoriteIds = this.favoriteIds.filter((id) => id !== recipeId);
  }
}
const favoritesStore = new FavoritesStore();
export {
  favoritesStore as f
};
