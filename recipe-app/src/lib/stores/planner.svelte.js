import { recipeStore } from './recipes.svelte.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

function getInitialPlan() {
  const defaultPlan = {};
  for (const day of DAYS) {
    defaultPlan[day] = { 'Breakfast': null, 'Lunch': null, 'Snack': null, 'Dinner': null };
  }

  if (typeof window === 'undefined') return defaultPlan;
  const stored = localStorage.getItem('rf_meal_planner');
  return stored ? JSON.parse(stored) : defaultPlan;
}

class PlannerStore {
  plan = $state(getInitialPlan());

  constructor() {
    if (typeof window !== 'undefined') {
      $effect.root(() => {
        $effect(() => {
          localStorage.setItem('rf_meal_planner', JSON.stringify(this.plan));
        });
      });
    }
  }

  // Derived statistics
  totalPlannedMeals = $derived.by(() => {
    let count = 0;
    for (const day of DAYS) {
      for (const meal of MEAL_TYPES) {
        if (this.plan[day] && this.plan[day][meal]) {
          count++;
        }
      }
    }
    return count;
  });

  totalPrepTimeMins = $derived.by(() => {
    let total = 0;
    const all = [...recipeStore.userRecipes, ...recipeStore.apiRecipes];
    for (const day of DAYS) {
      for (const meal of MEAL_TYPES) {
        const recipeId = this.plan[day] ? this.plan[day][meal] : null;
        if (recipeId) {
          const recipe = all.find(r => r.id === recipeId);
          if (recipe) {
            total += recipe.prepTime || 20;
          }
        }
      }
    }
    return total;
  });

  /**
   * @param {string} day
   * @param {string} mealType
   * @param {string} recipeId
   */
  assignMeal(day, mealType, recipeId) {
    if (!this.plan[day]) {
      this.plan[day] = { 'Breakfast': null, 'Lunch': null, 'Snack': null, 'Dinner': null };
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
      cleared[day] = { 'Breakfast': null, 'Lunch': null, 'Snack': null, 'Dinner': null };
    }
    this.plan = cleared;
  }
}

export const plannerStore = new PlannerStore();
export { DAYS, MEAL_TYPES };
