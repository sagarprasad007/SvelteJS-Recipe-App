import { h as ensure_array_like, a as attr } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { f as favoritesStore } from "../../../chunks/favorites.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="container"><div class="header-row svelte-ud7knm"><div><h1 class="page-title">Favorite Recipes</h1> <p class="page-subtitle">Your personal collection of saved gourmet meals and favorite dishes.</p></div></div> `);
    if (favoritesStore.favoriteRecipes.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> <h3>No Favorites Saved Yet</h3> <p>Click the heart icon on any recipe to save it here for quick access!</p> <a href="/" class="btn btn-primary">Browse Recipes</a></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="recipe-grid"><!--[-->`);
      const each_array = ensure_array_like(favoritesStore.favoriteRecipes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let recipe = each_array[$$index];
        $$renderer2.push(`<rf-recipe-card${attr("recipe-id", recipe.id)}${attr("recipe-title", recipe.title)}${attr("image", recipe.image)}${attr("category", recipe.category)}${attr("prep-time", recipe.prepTime)}${attr("difficulty", recipe.difficulty)}${attr("rating", recipe.rating)}${attr("is-favorite", true)}${attr("is-user-created", recipe.isUserCreated)}></rf-recipe-card>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
