import { a as attr, h as ensure_array_like, b as attr_class, e as escape_html, d as derived, c as stringify } from "../../chunks/root.js";
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
    const difficulties = ["All", "Easy", "Medium", "Hard"];
    let currentPage = 1;
    let itemsPerPage = 9;
    let totalRecipes = derived(() => recipeStore.filteredRecipes.length);
    let totalPages = derived(() => Math.ceil(totalRecipes() / itemsPerPage));
    let paginatedRecipes = derived(() => recipeStore.filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    let visiblePages = derived(() => {
      if (totalPages() <= 7) {
        return Array.from({ length: totalPages() }, (_, i) => i + 1);
      }
      const pages = [];
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages() - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      if (currentPage < totalPages() - 2) {
        pages.push("...");
      }
      if (!pages.includes(totalPages())) {
        pages.push(totalPages());
      }
      return pages;
    });
    $$renderer2.push(`<div class="container"><header class="hero-section svelte-1uha8ag"><h1 class="page-title">Discover Delicious Recipes</h1> <p class="page-subtitle">Search thousands of gourmet dishes, filter by dietary preferences &amp; prep time, or create your own recipes.</p> <rf-search-bar placeholder="Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)..."${attr("search-value", recipeStore.searchQuery)}${attr("selected-category", recipeStore.selectedCategory)}${attr("selected-prep-time", recipeStore.maxPrepTime)}${attr("categories-json", JSON.stringify(categories))}></rf-search-bar></header> <div class="filters-bar svelte-1uha8ag"><div class="category-pills svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`pill-btn ${recipeStore.selectedCategory === cat ? "active" : ""}`, "svelte-1uha8ag")}${attr("aria-label", `Filter by ${stringify(cat)}`)}><rf-badge${attr("variant", recipeStore.selectedCategory === cat ? "primary" : "secondary")}${attr("text", cat)}></rf-badge></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="difficulty-pills svelte-1uha8ag"><span class="diff-label svelte-1uha8ag">Difficulty:</span> <!--[-->`);
    const each_array_1 = ensure_array_like(difficulties);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let diff = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class(`diff-btn ${recipeStore.selectedDifficulty === diff ? "active" : ""}`, "svelte-1uha8ag")}>${escape_html(diff === "All" ? "All Skill Levels" : diff)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (recipeStore.isLoading) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-1uha8ag"><div class="spinner svelte-1uha8ag"></div> <p>Discovering culinary delights...</p></div>`);
    } else if (totalRecipes() === 0) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <h3>No Recipes Found</h3> <p>We couldn't find any recipes matching your criteria. Try adjusting your search query or filters.</p> <button class="btn btn-secondary">Reset Filters</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="recipe-grid"><!--[-->`);
      const each_array_2 = ensure_array_like(paginatedRecipes());
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let recipe = each_array_2[$$index_2];
        $$renderer2.push(`<rf-recipe-card${attr("recipe-id", recipe.id)}${attr("recipe-title", recipe.title)}${attr("image", recipe.image)}${attr("category", recipe.category)}${attr("prep-time", recipe.prepTime)}${attr("difficulty", recipe.difficulty)}${attr("rating", recipe.rating)}${attr("is-favorite", favoritesStore.isFavorite(recipe.id))}${attr("is-user-created", recipe.isUserCreated)}></rf-recipe-card>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (totalPages() > 1) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="pagination-container svelte-1uha8ag"><span class="pagination-info svelte-1uha8ag">Showing <strong>${escape_html((currentPage - 1) * itemsPerPage + 1)}</strong> to <strong>${escape_html(Math.min(currentPage * itemsPerPage, totalRecipes()))}</strong> of <strong>${escape_html(totalRecipes())}</strong> recipes</span> <div class="pagination-controls svelte-1uha8ag"><button class="pagination-btn svelte-1uha8ag"${attr("disabled", currentPage === 1, true)}>← Previous</button> <!--[-->`);
        const each_array_3 = ensure_array_like(visiblePages());
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let pageItem = each_array_3[$$index_3];
          if (pageItem === "...") {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span class="pagination-ellipsis svelte-1uha8ag">...</span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<button${attr_class(`pagination-num ${currentPage === pageItem ? "active" : ""}`, "svelte-1uha8ag")}>${escape_html(pageItem)}</button>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> <button class="pagination-btn svelte-1uha8ag"${attr("disabled", currentPage === totalPages(), true)}>Next →</button></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
