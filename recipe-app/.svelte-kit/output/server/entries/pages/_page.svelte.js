import { a as attr, c as ensure_array_like, f as attr_class, h as stringify } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { r as recipeStore } from "../../chunks/recipes.svelte.js";
import { f as favoritesStore } from "../../chunks/favorites.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const categories = [
      "All",
      "Breakfast",
      "Beef",
      "Chicken",
      "Dessert",
      "Pasta",
      "Seafood",
      "Vegetarian",
      "Custom"
    ];
    $$renderer2.push(`<div class="container"><header class="hero-section svelte-1uha8ag"><h1 class="page-title">Discover Delicious Recipes</h1> <p class="page-subtitle">Search thousands of gourmet dishes, filter by dietary preferences &amp; prep time, or create your own recipes.</p> <rf-search-bar placeholder="Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)..."${attr("search-value", recipeStore.searchQuery)}${attr("selected-category", recipeStore.selectedCategory)}${attr("selected-prep-time", recipeStore.maxPrepTime)}${attr("categories-json", JSON.stringify(categories))}></rf-search-bar></header> <div class="category-pills svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`pill-btn ${recipeStore.selectedCategory === cat ? "active" : ""}`, "svelte-1uha8ag")}${attr("aria-label", `Filter by ${stringify(cat)}`)}><rf-badge${attr("variant", recipeStore.selectedCategory === cat ? "primary" : "secondary")}${attr("text", cat)}></rf-badge></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (recipeStore.isLoading) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-1uha8ag"><div class="spinner svelte-1uha8ag"></div> <p>Discovering culinary delights...</p></div>`);
    } else if (recipeStore.filteredRecipes.length === 0) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <h3>No Recipes Found</h3> <p>We couldn't find any recipes matching your criteria. Try adjusting your search query or filters.</p> <button class="btn btn-secondary">Reset Filters</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="recipe-grid"><!--[-->`);
      const each_array_1 = ensure_array_like(recipeStore.filteredRecipes);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let recipe = each_array_1[$$index_1];
        $$renderer2.push(`<rf-recipe-card${attr("recipe-id", recipe.id)}${attr("recipe-title", recipe.title)}${attr("image", recipe.image)}${attr("category", recipe.category)}${attr("prep-time", recipe.prepTime)}${attr("difficulty", recipe.difficulty)}${attr("rating", recipe.rating)}${attr("is-favorite", favoritesStore.isFavorite(recipe.id))}${attr("is-user-created", recipe.isUserCreated)}></rf-recipe-card>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
