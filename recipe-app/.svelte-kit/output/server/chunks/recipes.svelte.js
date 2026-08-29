import { d as derived } from "./root.js";
const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
async function fetchRecipesFromApi(searchQuery = "", category = "") {
  try {
    let rawMeals = [];
    if (!searchQuery && (!category || category === "All")) {
      const categoriesToFetch = ["Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Vegetarian", "Breakfast"];
      const responses = await Promise.all(
        categoriesToFetch.map(
          (c) => fetch(`${MEALDB_BASE_URL}/filter.php?c=${c}`).then((res) => res.json()).then((data) => (data.meals || []).map((m) => ({ ...m, strCategory: c }))).catch(() => [])
        )
      );
      const seenIds = /* @__PURE__ */ new Set();
      for (const list of responses) {
        for (const m of list) {
          if (!seenIds.has(m.idMeal)) {
            seenIds.add(m.idMeal);
            rawMeals.push(m);
          }
        }
      }
    } else {
      let url = `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(searchQuery)}`;
      if (category && category !== "All" && category !== "Custom") {
        url = `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      rawMeals = (data.meals || []).map((m) => ({
        ...m,
        strCategory: category && category !== "All" && category !== "Custom" ? category : m.strCategory || "General"
      }));
    }
    if (!rawMeals || rawMeals.length === 0) {
      return [];
    }
    return rawMeals.map((meal) => transformMealDbMeal(meal));
  } catch (error) {
    console.error("Failed to fetch recipes from public API:", error);
    return [];
  }
}
async function fetchRecipeByIdFromApi(id) {
  try {
    const meal = await fetchMealDetailsById(id);
    if (meal) return meal;
  } catch (error) {
    console.error("Failed to fetch recipe details from public API:", error);
  }
  return null;
}
async function fetchMealDetailsById(id) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return transformMealDbMeal(data.meals[0]);
    }
  } catch (e) {
    console.error("Error looking up meal details:", e);
  }
  return null;
}
function transformMealDbMeal(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure ? measure.trim() : ""} ${ing.trim()}`.trim());
    }
  }
  const idNum = parseInt(meal.idMeal, 10) || 100;
  const derivedPrepTime = idNum % 35 + 15;
  const derivedRating = (idNum % 10 / 10 + 4).toFixed(1);
  const difficulties = ["Easy", "Medium", "Hard"];
  const derivedDifficulty = difficulties[idNum % 3];
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || "General",
    prepTime: derivedPrepTime,
    difficulty: derivedDifficulty,
    rating: Number(derivedRating),
    servings: 4,
    description: meal.strInstructions ? meal.strInstructions.slice(0, 140) + "..." : `Delicious gourmet ${meal.strMeal} prepared with fresh quality ingredients.`,
    ingredients: ingredients.length > 0 ? ingredients : ["Fresh ingredients according to recipe directions."],
    instructions: meal.strInstructions ? meal.strInstructions.split("\r\n").filter((line) => line.trim()) : ["Follow standard cooking steps."],
    isUserCreated: false
  };
}
function getInitialUserRecipes() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("rf_user_recipes");
  return stored ? JSON.parse(stored) : [];
}
class RecipeStore {
  userRecipes = getInitialUserRecipes();
  apiRecipes = [];
  searchQuery = "";
  selectedCategory = "All";
  selectedDifficulty = "All";
  maxPrepTime = 0;
  isLoading = false;
  constructor() {
  }
  #filteredRecipes = derived(
    // Derived filtered recipes list (Default Alphabetical Ascending A-Z Sort)
    () => {
      const all = [...this.userRecipes, ...this.apiRecipes];
      const filtered = all.filter((recipe) => {
        const q = this.searchQuery.trim().toLowerCase();
        const matchesQuery = !q || recipe.title.toLowerCase().includes(q) || recipe.ingredients && recipe.ingredients.some((i) => i.toLowerCase().includes(q));
        const matchesCategory = this.selectedCategory === "All" || (this.selectedCategory === "Custom" ? recipe.isUserCreated : recipe.category.toLowerCase() === this.selectedCategory.toLowerCase());
        const matchesDifficulty = this.selectedDifficulty === "All" || recipe.difficulty.toLowerCase() === this.selectedDifficulty.toLowerCase();
        const matchesPrepTime = this.maxPrepTime === 0 || recipe.prepTime <= this.maxPrepTime;
        return matchesQuery && matchesCategory && matchesDifficulty && matchesPrepTime;
      });
      return filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  );
  get filteredRecipes() {
    return this.#filteredRecipes();
  }
  set filteredRecipes($$value) {
    return this.#filteredRecipes($$value);
  }
  async search(query = "", category = "All", prepTime = 0, difficulty = "All") {
    this.searchQuery = query;
    this.selectedCategory = category;
    this.maxPrepTime = prepTime;
    this.selectedDifficulty = difficulty;
    this.isLoading = true;
    try {
      if (category !== "Custom") {
        const fetched = await fetchRecipesFromApi(query, category);
        this.apiRecipes = fetched;
      }
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      this.isLoading = false;
    }
  }
  /**
   * @param {any} recipe
   */
  validateRecipeInput(recipe) {
    const errors = {};
    if (!recipe.title || recipe.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long.";
    }
    if (!recipe.category) {
      errors.category = "Category is required.";
    }
    if (!recipe.prepTime || Number(recipe.prepTime) <= 0) {
      errors.prepTime = "Prep time must be greater than 0 minutes.";
    }
    if (!recipe.ingredients || recipe.ingredients.length === 0 || recipe.ingredients.length === 1 && !recipe.ingredients[0].trim()) {
      errors.ingredients = "At least one ingredient is required.";
    }
    if (!recipe.instructions || recipe.instructions.length === 0 || recipe.instructions.length === 1 && !recipe.instructions[0].trim()) {
      errors.instructions = "Step-by-step instructions are required.";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  }
  /**
   * @param {any} recipeInput
   */
  addUserRecipe(recipeInput) {
    const validation = this.validateRecipeInput(recipeInput);
    if (!validation.isValid) return validation;
    const newRecipe = {
      id: "user-" + Date.now(),
      title: recipeInput.title.trim(),
      image: recipeInput.image && recipeInput.image.trim() ? recipeInput.image.trim() : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      category: recipeInput.category,
      prepTime: Number(recipeInput.prepTime),
      difficulty: recipeInput.difficulty || "Easy",
      rating: 5,
      servings: Number(recipeInput.servings) || 2,
      description: recipeInput.description || "Delicious home-made creation.",
      ingredients: Array.isArray(recipeInput.ingredients) ? recipeInput.ingredients : recipeInput.ingredients.split("\n").filter((i) => i.trim()),
      instructions: Array.isArray(recipeInput.instructions) ? recipeInput.instructions : recipeInput.instructions.split("\n").filter((i) => i.trim()),
      isUserCreated: true
    };
    this.userRecipes = [newRecipe, ...this.userRecipes];
    return { isValid: true, recipe: newRecipe };
  }
  /**
   * @param {string} id
   * @param {any} recipeInput
   */
  updateUserRecipe(id, recipeInput) {
    const validation = this.validateRecipeInput(recipeInput);
    if (!validation.isValid) return validation;
    const index = this.userRecipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.userRecipes[index] = {
        ...this.userRecipes[index],
        title: recipeInput.title.trim(),
        image: recipeInput.image ? recipeInput.image.trim() : this.userRecipes[index].image,
        category: recipeInput.category,
        prepTime: Number(recipeInput.prepTime),
        difficulty: recipeInput.difficulty,
        servings: Number(recipeInput.servings) || 2,
        description: recipeInput.description,
        ingredients: Array.isArray(recipeInput.ingredients) ? recipeInput.ingredients : recipeInput.ingredients.split("\n").filter((i) => i.trim()),
        instructions: Array.isArray(recipeInput.instructions) ? recipeInput.instructions : recipeInput.instructions.split("\n").filter((i) => i.trim())
      };
      this.userRecipes = [...this.userRecipes];
    }
    return { isValid: true };
  }
  /**
   * @param {string} id
   */
  deleteUserRecipe(id) {
    this.userRecipes = this.userRecipes.filter((r) => r.id !== id);
  }
  /**
   * @param {string} id
   */
  async getRecipeById(id) {
    if (!id) return null;
    const cleanId = String(id).trim();
    const userRecipe = this.userRecipes.find((r) => String(r.id) === cleanId);
    if (userRecipe) return userRecipe;
    const fullApiRecipe = await fetchRecipeByIdFromApi(cleanId);
    if (fullApiRecipe) return fullApiRecipe;
    return this.apiRecipes.find((r) => String(r.id) === cleanId) || null;
  }
}
const recipeStore = new RecipeStore();
export {
  recipeStore as r
};
