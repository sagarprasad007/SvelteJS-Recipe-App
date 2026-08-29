import { c as ensure_array_like, a as attr, e as escape_html } from "../../../chunks/root.js";
import { r as recipeStore } from "../../../chunks/recipes.svelte.js";
import { f as favoritesStore } from "../../../chunks/favorites.svelte.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isModalOpen = false;
    let title = "";
    let category = "Breakfast";
    let prepTime = 20;
    let difficulty = "Easy";
    let servings = 2;
    let image = "";
    let description = "";
    let ingredientsText = "";
    let instructionsText = "";
    let formErrors = {};
    $$renderer2.push(`<div class="container"><div class="header-row svelte-oq4grp"><div><h1 class="page-title">My Custom Recipes</h1> <p class="page-subtitle">Manage, edit, and create your own private collection of culinary creations.</p></div> <button class="btn btn-primary"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add New Recipe</button></div> `);
    if (recipeStore.userRecipes.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <h3>No Custom Recipes Yet</h3> <p>You haven't created any custom recipes. Click "Add New Recipe" to start building your cookbook!</p> <button class="btn btn-primary">Create First Recipe</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="recipe-grid"><!--[-->`);
      const each_array = ensure_array_like(recipeStore.userRecipes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let recipe = each_array[$$index];
        $$renderer2.push(`<div class="custom-card-wrapper"><rf-recipe-card${attr("recipe-id", recipe.id)}${attr("recipe-title", recipe.title)}${attr("image", recipe.image)}${attr("category", recipe.category)}${attr("prep-time", recipe.prepTime)}${attr("difficulty", recipe.difficulty)}${attr("rating", recipe.rating)}${attr("is-favorite", favoritesStore.isFavorite(recipe.id))}${attr("is-user-created", true)}><div slot="actions" class="custom-actions svelte-oq4grp"><button class="btn btn-secondary action-btn svelte-oq4grp">Edit</button> <button class="btn btn-danger action-btn svelte-oq4grp">Delete</button></div></rf-recipe-card></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <rf-modal${attr("open", isModalOpen, true)}${attr("modal-title", "Create New Recipe")}><div slot="content"><form><div class="form-group"><label for="recipe-title-input">Recipe Title *</label> <input id="recipe-title-input" type="text" class="form-control"${attr("value", title)} placeholder="e.g. Grandma's Special Apple Pie"/> `);
    if (formErrors.title) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="error-msg svelte-oq4grp">${escape_html(formErrors.title)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="form-row svelte-oq4grp"><div class="form-group"><label for="recipe-category-select">Category *</label> `);
    $$renderer2.select(
      {
        id: "recipe-category-select",
        class: "form-control",
        value: category
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "Breakfast" }, ($$renderer4) => {
          $$renderer4.push(`Breakfast`);
        });
        $$renderer3.option({ value: "Lunch" }, ($$renderer4) => {
          $$renderer4.push(`Lunch`);
        });
        $$renderer3.option({ value: "Dinner" }, ($$renderer4) => {
          $$renderer4.push(`Dinner`);
        });
        $$renderer3.option({ value: "Dessert" }, ($$renderer4) => {
          $$renderer4.push(`Dessert`);
        });
        $$renderer3.option({ value: "Pasta" }, ($$renderer4) => {
          $$renderer4.push(`Pasta`);
        });
        $$renderer3.option({ value: "Seafood" }, ($$renderer4) => {
          $$renderer4.push(`Seafood`);
        });
        $$renderer3.option({ value: "Vegetarian" }, ($$renderer4) => {
          $$renderer4.push(`Vegetarian`);
        });
        $$renderer3.option({ value: "Snack" }, ($$renderer4) => {
          $$renderer4.push(`Snack`);
        });
      }
    );
    $$renderer2.push(` `);
    if (formErrors.category) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="error-msg svelte-oq4grp">${escape_html(formErrors.category)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="form-group"><label for="recipe-preptime-input">Prep Time (mins) *</label> <input id="recipe-preptime-input" type="number" class="form-control"${attr("value", prepTime)} min="1"/> `);
    if (formErrors.prepTime) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="error-msg svelte-oq4grp">${escape_html(formErrors.prepTime)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="form-row svelte-oq4grp"><div class="form-group"><label for="recipe-difficulty-select">Difficulty</label> `);
    $$renderer2.select(
      {
        id: "recipe-difficulty-select",
        class: "form-control",
        value: difficulty
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "Easy" }, ($$renderer4) => {
          $$renderer4.push(`Easy`);
        });
        $$renderer3.option({ value: "Medium" }, ($$renderer4) => {
          $$renderer4.push(`Medium`);
        });
        $$renderer3.option({ value: "Hard" }, ($$renderer4) => {
          $$renderer4.push(`Hard`);
        });
      }
    );
    $$renderer2.push(`</div> <div class="form-group"><label for="recipe-servings-input">Servings</label> <input id="recipe-servings-input" type="number" class="form-control"${attr("value", servings)} min="1"/></div></div> <div class="form-group"><label for="recipe-image-input">Image URL</label> <input id="recipe-image-input" type="url" class="form-control"${attr("value", image)} placeholder="https://images.unsplash.com/..."/></div> <div class="form-group"><label for="recipe-desc-textarea">Short Description</label> <textarea id="recipe-desc-textarea" class="form-control" placeholder="Brief summary of your dish...">`);
    const $$body = escape_html(description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="form-group"><label for="recipe-ingredients-textarea">Ingredients (One per line) *</label> <textarea id="recipe-ingredients-textarea" class="form-control" rows="4" placeholder="2 cups Flour 1 tsp Baking Powder 1/2 cup Milk">`);
    const $$body_1 = escape_html(ingredientsText);
    if ($$body_1) {
      $$renderer2.push(`${$$body_1}`);
    }
    $$renderer2.push(`</textarea> `);
    if (formErrors.ingredients) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="error-msg svelte-oq4grp">${escape_html(formErrors.ingredients)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="form-group"><label for="recipe-instructions-textarea">Instructions (One step per line) *</label> <textarea id="recipe-instructions-textarea" class="form-control" rows="4" placeholder="Preheat oven to 350°F. Mix dry ingredients together. Bake for 25 minutes.">`);
    const $$body_2 = escape_html(instructionsText);
    if ($$body_2) {
      $$renderer2.push(`${$$body_2}`);
    }
    $$renderer2.push(`</textarea> `);
    if (formErrors.instructions) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="error-msg svelte-oq4grp">${escape_html(formErrors.instructions)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></form></div> <div slot="footer"><button class="btn btn-secondary">Cancel</button> <button class="btn btn-primary">${escape_html("Create Recipe")}</button></div></rf-modal>`);
  });
}
export {
  _page as default
};
