import { b as bootstrapLazy } from './index-vyvYwSeW.js';
export { s as setNonce } from './index-vyvYwSeW.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["rf-badge",[[257,"rf-badge",{"variant":[1],"text":[1]}]]],["rf-modal",[[257,"rf-modal",{"open":[4],"modalTitle":[1,"modal-title"]}]]],["rf-navbar",[[257,"rf-navbar",{"brandName":[1,"brand-name"],"activeRoute":[1,"active-route"]}]]],["rf-rating",[[1,"rf-rating",{"value":[2],"max":[2],"showLabel":[4,"show-label"]}]]],["rf-recipe-card",[[257,"rf-recipe-card",{"recipeId":[1,"recipe-id"],"recipeTitle":[1,"recipe-title"],"image":[1],"category":[1],"prepTime":[2,"prep-time"],"difficulty":[1],"rating":[2],"isFavorite":[8,"is-favorite"],"isUserCreated":[4,"is-user-created"]}]]],["rf-search-bar",[[1,"rf-search-bar",{"placeholder":[1],"searchValue":[1,"search-value"],"selectedCategory":[1,"selected-category"],"selectedPrepTime":[2,"selected-prep-time"],"categoriesJson":[1,"categories-json"],"internalQuery":[32],"internalCategory":[32],"internalPrepTime":[32]}]]]], options);
};

export { defineCustomElements };
