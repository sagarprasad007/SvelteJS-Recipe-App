import { d as derived } from "./root.js";
const MEALDB_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const MOCK_RECIPES = [
  {
    id: "m1",
    title: "Creamy Garlic Butter Salmon",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    category: "Seafood",
    prepTime: 25,
    difficulty: "Medium",
    rating: 4.9,
    servings: 4,
    description: "Tender salmon fillets pan-seared to perfection in a rich garlic butter spinach cream sauce.",
    ingredients: [
      "4 Salmon Fillets (6 oz each)",
      "3 tbsp Unsalted Butter",
      "4 cloves Garlic, minced",
      "1 cup Heavy Cream",
      "2 cups Fresh Baby Spinach",
      "1/2 cup Grated Parmesan Cheese",
      "1 tbsp Lemon Juice",
      "Salt and freshly cracked black pepper to taste"
    ],
    instructions: [
      "Season salmon fillets with salt and pepper on both sides.",
      "Heat 1 tbsp butter in a large skillet over medium-high heat. Sear salmon for 4-5 mins per side until golden brown, then remove and set aside.",
      "In the same skillet, melt remaining butter. Add minced garlic and sauté for 1 minute until fragrant.",
      "Pour in heavy cream and bring to a gentle simmer. Stir in Parmesan cheese until smooth.",
      "Add baby spinach and cook until wilted. Stir in fresh lemon juice.",
      "Return salmon fillets to the skillet and spoon sauce over top. Serve warm!"
    ],
    isUserCreated: false
  },
  {
    id: "m2",
    title: "Avocado Toast with Poached Eggs & Microgreens",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    category: "Breakfast",
    prepTime: 12,
    difficulty: "Easy",
    rating: 4.7,
    servings: 2,
    description: "Crispy sourdough toast topped with mashed ripe avocado, perfectly poached eggs, red pepper flakes, and microgreens.",
    ingredients: [
      "2 slices Artisan Sourdough Bread",
      "1 Large Ripe Hass Avocado",
      "2 Fresh Organic Eggs",
      "1 tbsp Apple Cider Vinegar (for poaching)",
      "1/4 tsp Red Pepper Flakes",
      "1 tbsp Extra Virgin Olive Oil",
      "Handful of Microgreens or Arugula",
      "Flaky Sea Salt & Black Pepper"
    ],
    instructions: [
      "Toast sourdough slices until golden and crispy.",
      "In a bowl, mash avocado with lemon juice, olive oil, salt, and pepper.",
      "Bring a pot of water with apple cider vinegar to a gentle simmer. Swirl water to create a vortex and drop in eggs. Poach for 3 minutes.",
      "Spread mashed avocado generously over toasted bread.",
      "Top each slice with a poached egg, sprinkle red pepper flakes, microgreens, and flaky sea salt."
    ],
    isUserCreated: false
  },
  {
    id: "m3",
    title: "Truffle Mushroom Cream Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=800&q=80",
    category: "Pasta",
    prepTime: 30,
    difficulty: "Medium",
    rating: 4.8,
    servings: 3,
    description: "Fettuccine pasta tossed with wild sautéed mushrooms, thyme, parmesan, and a kiss of white truffle oil.",
    ingredients: [
      "300g Fettuccine or Tagliatelle",
      "300g Mixed Wild Mushrooms (Cremini, Shiitake, Oyster), sliced",
      "3 tbsp Butter",
      "2 Shallots, finely diced",
      "3 cloves Garlic, minced",
      "1/2 cup Heavy Cream",
      "1/2 cup Grated Pecorino Romano",
      "1 tsp White Truffle Oil",
      "Fresh Thyme leaves"
    ],
    instructions: [
      "Cook pasta in salted boiling water until al dente. Reserve 1/2 cup pasta water.",
      "Melt butter in a skillet over high heat. Add mushrooms and sauté without stirring for 3 mins until caramelized.",
      "Add shallots, garlic, and thyme. Cook for another 2 minutes.",
      "Pour in heavy cream and reserved pasta water. Simmer until slightly thickened.",
      "Toss in cooked fettuccine and Pecorino Romano. Drizzle with truffle oil before serving."
    ],
    isUserCreated: false
  },
  {
    id: "m4",
    title: "Classic Mediterranean Greek Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    category: "Vegetarian",
    prepTime: 15,
    difficulty: "Easy",
    rating: 4.6,
    servings: 4,
    description: "Crisp cucumbers, vine-ripened tomatoes, red onion, Kalamata olives, and slab Feta cheese tossed in extra virgin olive oil and oregano.",
    ingredients: [
      "4 Large Vine Tomatoes, cut into wedges",
      "1 English Cucumber, sliced into half-moons",
      "1/2 Red Onion, thinly sliced",
      "1/2 cup Kalamata Olives, pitted",
      "200g Greek Feta Cheese slab",
      "1/4 cup Extra Virgin Olive Oil",
      "1 tbsp Red Wine Vinegar",
      "1 tsp Dried Oregano"
    ],
    instructions: [
      "In a large salad bowl, combine tomatoes, cucumber, red onion, and Kalamata olives.",
      "Whisk together olive oil, red wine vinegar, dried oregano, salt, and pepper.",
      "Pour dressing over salad and gently toss.",
      "Place Feta cheese slab on top, drizzle with extra olive oil, and sprinkle additional oregano."
    ],
    isUserCreated: false
  },
  {
    id: "m5",
    title: "Japanese Chicken Teriyaki Bowl",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    category: "Chicken",
    prepTime: 20,
    difficulty: "Easy",
    rating: 4.8,
    servings: 2,
    description: "Juicy chicken thighs glazed in homemade sweet teriyaki sauce, served over steamed Jasmine rice with steamed broccoli.",
    ingredients: [
      "500g Chicken Thighs (boneless, skin-on)",
      "1/4 cup Soy Sauce",
      "2 tbsp Mirin",
      "2 tbsp Sake or Rice Wine",
      "1.5 tbsp Sugar",
      "1 tsp Fresh Ginger, grated",
      "Steamed Jasmine Rice",
      "Sesame Seeds & Green Onions for garnish"
    ],
    instructions: [
      "Whisk soy sauce, mirin, sake, sugar, and grated ginger to create teriyaki sauce.",
      "Sear chicken thighs skin-side down in a skillet for 6 minutes until crispy. Flip and cook for 4 more minutes.",
      "Pour teriyaki sauce over chicken and simmer until glaze thickens and coats chicken.",
      "Slice chicken and serve over warm Jasmine rice with steamed broccoli and sesame seeds."
    ],
    isUserCreated: false
  },
  {
    id: "m6",
    title: "Decadent Molten Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    category: "Dessert",
    prepTime: 25,
    difficulty: "Medium",
    rating: 4.95,
    servings: 2,
    description: "Warm individual chocolate cakes with a luscious, gooey molten chocolate center, served with vanilla ice cream.",
    ingredients: [
      "100g High-quality Dark Chocolate (70%)",
      "1/2 cup Unsalted Butter",
      "2 Whole Eggs + 2 Egg Yolks",
      "1/4 cup Granulated Sugar",
      "2 tbsp All-purpose Flour",
      "Pinch of Espresso Powder & Sea Salt",
      "Vanilla Bean Ice Cream (for serving)"
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Butter and dust 2 ramekins with cocoa powder.",
      "Melt dark chocolate and butter together in a heatproof bowl set over simmering water until smooth.",
      "In a separate bowl, whisk eggs, egg yolks, and sugar until thick and pale.",
      "Fold chocolate mixture and flour into eggs gently.",
      "Divide batter between ramekins and bake for exactly 12 minutes. Let stand for 1 minute, invert onto plates, and serve with vanilla ice cream!"
    ],
    isUserCreated: false
  }
];
async function fetchRecipesFromApi(searchQuery = "", category = "") {
  try {
    let url = `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(searchQuery)}`;
    if (category && category !== "All") {
      url = `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    if (!data.meals) {
      return filterMockRecipes(searchQuery, category);
    }
    const meals = data.meals.slice(0, 12).map((meal) => transformMealDbMeal(meal));
    return combineWithMock(meals, searchQuery, category);
  } catch (error) {
    console.warn("Network request failed, using fallback recipes:", error);
    return filterMockRecipes(searchQuery, category);
  }
}
async function fetchRecipeByIdFromApi(id) {
  if (id.startsWith("m") || id.startsWith("user-")) {
    return null;
  }
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return transformMealDbMeal(data.meals[0]);
    }
  } catch (error) {
    console.error("Failed to fetch recipe by ID:", error);
  }
  return MOCK_RECIPES.find((r) => r.id === id) || null;
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
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory || "General",
    prepTime: Math.floor(Math.random() * 35) + 15,
    // Synthetic realistic prep time
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
    rating: (4 + Math.random() * 0.9).toFixed(1),
    servings: 4,
    description: meal.strInstructions ? meal.strInstructions.slice(0, 140) + "..." : "A delicious dish full of rich flavor.",
    ingredients: ingredients.length > 0 ? ingredients : ["Ingredients detailed in step-by-step preparation."],
    instructions: meal.strInstructions ? meal.strInstructions.split("\r\n").filter((line) => line.trim()) : ["Follow standard cooking directions."],
    isUserCreated: false
  };
}
function combineWithMock(apiMeals, query, category) {
  const mocks = filterMockRecipes(query, category);
  return [...mocks, ...apiMeals];
}
function filterMockRecipes(query, category) {
  return MOCK_RECIPES.filter((r) => {
    const matchesQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = !category || category === "All" || r.category.toLowerCase() === category.toLowerCase();
    return matchesQuery && matchesCategory;
  });
}
function getInitialUserRecipes() {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("rf_user_recipes");
  return stored ? JSON.parse(stored) : [];
}
class RecipeStore {
  userRecipes = getInitialUserRecipes();
  apiRecipes = MOCK_RECIPES;
  searchQuery = "";
  selectedCategory = "All";
  maxPrepTime = 0;
  isLoading = false;
  constructor() {
  }
  #filteredRecipes = derived(
    // Derived filtered recipes list
    () => {
      const all = [...this.userRecipes, ...this.apiRecipes];
      return all.filter((recipe) => {
        const q = this.searchQuery.trim().toLowerCase();
        const matchesQuery = !q || recipe.title.toLowerCase().includes(q) || recipe.ingredients && recipe.ingredients.some((i) => i.toLowerCase().includes(q));
        const matchesCategory = this.selectedCategory === "All" || (this.selectedCategory === "Custom" ? recipe.isUserCreated : recipe.category.toLowerCase() === this.selectedCategory.toLowerCase());
        const matchesPrepTime = this.maxPrepTime === 0 || recipe.prepTime <= this.maxPrepTime;
        return matchesQuery && matchesCategory && matchesPrepTime;
      });
    }
  );
  get filteredRecipes() {
    return this.#filteredRecipes();
  }
  set filteredRecipes($$value) {
    return this.#filteredRecipes($$value);
  }
  async search(query = "", category = "All", prepTime = 0) {
    this.searchQuery = query;
    this.selectedCategory = category;
    this.maxPrepTime = prepTime;
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
    const userRecipe = this.userRecipes.find((r) => r.id === id);
    if (userRecipe) return userRecipe;
    const mockRecipe = MOCK_RECIPES.find((r) => r.id === id);
    if (mockRecipe) return mockRecipe;
    return await fetchRecipeByIdFromApi(id);
  }
}
const recipeStore = new RecipeStore();
export {
  recipeStore as r
};
