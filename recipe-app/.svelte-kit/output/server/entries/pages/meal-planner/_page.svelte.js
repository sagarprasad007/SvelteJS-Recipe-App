import { e as escape_html, c as ensure_array_like, f as attr_class, a as attr } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { r as recipeStore } from "../../../chunks/recipes.svelte.js";
import { p as plannerStore, D as DAYS, M as MEAL_TYPES } from "../../../chunks/planner.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isAssignModalOpen = false;
    let activeDay = "Monday";
    let activeMealType = "Lunch";
    let selectedRecipeId = "";
    function getRecipeForSlot(day, mealType) {
      const recipeId = plannerStore.plan[day] ? plannerStore.plan[day][mealType] : null;
      if (!recipeId) return null;
      const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
      return all.find((r) => r.id === recipeId) || null;
    }
    $$renderer2.push(`<div class="container"><div class="planner-header svelte-w5949r"><div><h1 class="page-title">Weekly Meal Planner</h1> <p class="page-subtitle">Organize your weekly nutrition, assign recipes to daily slots, and track preparation time.</p></div> <div class="header-actions"><button class="btn btn-secondary">Clear Entire Week</button></div></div> <div class="stats-bar svelte-w5949r"><div class="stat-box svelte-w5949r"><span class="box-num svelte-w5949r">${escape_html(plannerStore.totalPlannedMeals)}</span> <span class="box-label svelte-w5949r">Total Meals Planned</span></div> <div class="stat-box svelte-w5949r"><span class="box-num svelte-w5949r">${escape_html(plannerStore.totalPrepTimeMins)} mins</span> <span class="box-label svelte-w5949r">Est. Weekly Prep Time</span></div> <div class="stat-box svelte-w5949r"><span class="box-num svelte-w5949r">${escape_html((plannerStore.totalPrepTimeMins / 60).toFixed(1))} hrs</span> <span class="box-label svelte-w5949r">Kitchen Time Total</span></div></div> <div class="planner-matrix svelte-w5949r"><!--[-->`);
    const each_array = ensure_array_like(DAYS);
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let day = each_array[$$index_1];
      $$renderer2.push(`<div class="day-card svelte-w5949r"><div class="day-header svelte-w5949r"><h3 class="svelte-w5949r">${escape_html(day)}</h3></div> <div class="slots-container svelte-w5949r"><!--[-->`);
      const each_array_1 = ensure_array_like(MEAL_TYPES);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let slot = each_array_1[$$index];
        const recipe = getRecipeForSlot(day, slot);
        $$renderer2.push(`<div${attr_class(`meal-slot ${recipe ? "filled" : "empty"}`, "svelte-w5949r")} role="button" tabindex="0"><div class="slot-badge-row svelte-w5949r"><rf-badge variant="outline"${attr("text", slot)}></rf-badge> `);
        if (recipe) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<button class="remove-btn svelte-w5949r" title="Remove recipe">×</button>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (recipe) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="assigned-recipe svelte-w5949r"><img${attr("src", recipe.image)}${attr("alt", recipe.title)} class="svelte-w5949r"/> <div class="assigned-info svelte-w5949r"><h4 class="svelte-w5949r">${escape_html(recipe.title)}</h4> <span class="prep-meta svelte-w5949r">⏱ ${escape_html(recipe.prepTime)} mins</span></div></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div class="empty-slot-prompt svelte-w5949r"><span>+ Assign Recipe</span></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <rf-modal${attr("open", isAssignModalOpen, true)}${attr("modal-title", `Assign Meal for ${activeDay} (${activeMealType})`)}><div slot="content"><div class="form-group"><label for="select-recipe">Choose Recipe from your collection:</label> `);
    $$renderer2.select(
      {
        id: "select-recipe",
        class: "form-control",
        value: selectedRecipeId
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`-- No Recipe (Leave Empty) --`);
        });
        $$renderer3.push(`<optgroup label="Custom Recipes"><!--[-->`);
        const each_array_2 = ensure_array_like(recipeStore.userRecipes);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let recipe = each_array_2[$$index_2];
          $$renderer3.option({ value: recipe.id }, ($$renderer4) => {
            $$renderer4.push(`⭐ ${escape_html(recipe.title)} (${escape_html(recipe.prepTime)} mins)`);
          });
        }
        $$renderer3.push(`<!--]--></optgroup><optgroup label="Discovered Recipes"><!--[-->`);
        const each_array_3 = ensure_array_like(recipeStore.apiRecipes);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let recipe = each_array_3[$$index_3];
          $$renderer3.option({ value: recipe.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(recipe.title)} (${escape_html(recipe.prepTime)} mins)`);
          });
        }
        $$renderer3.push(`<!--]--></optgroup>`);
      }
    );
    $$renderer2.push(`</div></div> <div slot="footer"><button class="btn btn-secondary">Cancel</button> <button class="btn btn-primary">Save Assignment</button></div></rf-modal>`);
  });
}
export {
  _page as default
};
