import { d as derived } from "./root.js";
import { r as recipeStore } from "./recipes.svelte.js";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
function getInitialPlan() {
  const defaultPlan = {
    "Monday": {
      "Breakfast": "m2",
      "Lunch": "m4",
      "Dinner": "m1",
      "Snack": null
    },
    "Tuesday": {
      "Breakfast": null,
      "Lunch": "m5",
      "Dinner": "m3",
      "Snack": null
    },
    "Wednesday": {
      "Breakfast": "m2",
      "Lunch": null,
      "Dinner": "m5",
      "Snack": "m6"
    },
    "Thursday": {
      "Breakfast": null,
      "Lunch": "m1",
      "Dinner": "m4",
      "Snack": null
    },
    "Friday": {
      "Breakfast": "m2",
      "Lunch": "m3",
      "Dinner": "m1",
      "Snack": "m6"
    },
    "Saturday": {
      "Breakfast": null,
      "Lunch": "m5",
      "Dinner": "m3",
      "Snack": null
    },
    "Sunday": {
      "Breakfast": "m2",
      "Lunch": "m4",
      "Dinner": "m6",
      "Snack": null
    }
  };
  if (typeof window === "undefined") return defaultPlan;
  const stored = localStorage.getItem("rf_meal_planner");
  return stored ? JSON.parse(stored) : defaultPlan;
}
class PlannerStore {
  plan = getInitialPlan();
  constructor() {
  }
  #totalPlannedMeals = derived(
    // Derived statistics
    () => {
      let count = 0;
      for (const day of DAYS) {
        for (const meal of MEAL_TYPES) {
          if (this.plan[day] && this.plan[day][meal]) {
            count++;
          }
        }
      }
      return count;
    }
  );
  get totalPlannedMeals() {
    return this.#totalPlannedMeals();
  }
  set totalPlannedMeals($$value) {
    return this.#totalPlannedMeals($$value);
  }
  #totalPrepTimeMins = derived(() => {
    let total = 0;
    const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
    for (const day of DAYS) {
      for (const meal of MEAL_TYPES) {
        const recipeId = this.plan[day] ? this.plan[day][meal] : null;
        if (recipeId) {
          const recipe = all.find((r) => r.id === recipeId);
          if (recipe) {
            total += recipe.prepTime || 20;
          }
        }
      }
    }
    return total;
  });
  get totalPrepTimeMins() {
    return this.#totalPrepTimeMins();
  }
  set totalPrepTimeMins($$value) {
    return this.#totalPrepTimeMins($$value);
  }
  assignMeal(day, mealType, recipeId) {
    if (!this.plan[day]) {
      this.plan[day] = {
        "Breakfast": null,
        "Lunch": null,
        "Dinner": null,
        "Snack": null
      };
    }
    this.plan[day][mealType] = recipeId;
    this.plan = { ...this.plan };
  }
  /**
   * @param {string} day
   * @param {string} mealType
   */
  removeMeal(day, mealType) {
    if (this.plan[day]) {
      this.plan[day][mealType] = null;
      this.plan = { ...this.plan };
    }
  }
  clearPlan() {
    const cleared = {};
    for (const day of DAYS) {
      cleared[day] = {
        "Breakfast": null,
        "Lunch": null,
        "Dinner": null,
        "Snack": null
      };
    }
    this.plan = cleared;
  }
}
const plannerStore = new PlannerStore();
export {
  DAYS as D,
  MEAL_TYPES as M,
  plannerStore as p
};
