# Recipe Finder & Meal Planner Platform

A modern, enterprise-grade fullstack web application built with **Svelte 5** (utilizing Svelte 5 Runes: `$state`, `$derived`, `$props`), **SvelteKit**, and a custom-built **StencilJS Web Component Library** (`recipe-finder-ui-components`).

---

## Deliverables & Submission Links

| Deliverable | URL / Reference |
| :--- | :--- |
| **Deployed Application URL** | [https://tastecraft-recipes.vercel.app] |
| **GitHub Repository** | [https://github.com/sagarprasad007/SvelteJS-Recipe-App] |
| **NPM Package Link** | [https://www.npmjs.com/package/recipe-finder-ui-components] *(Local Tarball: `recipe-finder-ui-components-1.0.1.tgz`)* |
| **SvelteKit Source Code** | `recipe-app/` directory |
| **StencilJS Component Library Source** | `recipe-components/` directory |

---

## Architecture Overview

The project is structured as a clean monorepo:

1. **`recipe-components/`**: Isolated **StencilJS** Web Component Library.
   - Standard Web Components with Shadow DOM encapsulation.
   - Package name: `recipe-finder-ui-components`.
   - Custom elements: `<rf-recipe-card>`, `<rf-search-bar>`, `<rf-modal>`, `<rf-badge>`, `<rf-rating>`, and `<rf-navbar>`.

2. **`recipe-app/`**: Enterprise **SvelteKit** Web Application.
   - Built on Svelte 5 with modern Runes architecture (`$state`, `$derived`, `$props`).
   - Integrates with TheMealDB REST API and LocalStorage persistence.
   - Consumes the StencilJS web components natively.

---

## Repository Structure

```
c:/NAGP/
├── recipe-components/             # StencilJS Web Component Library
│   ├── src/
│   │   ├── components/
│   │   │   ├── rf-recipe-card/   # Custom card element (Props, Events, Slots)
│   │   │   ├── rf-search-bar/    # Search & Filter bar element
│   │   │   ├── rf-modal/         # Accessible Dialog element
│   │   │   ├── rf-badge/         # Category & tag chip element
│   │   │   ├── rf-rating/        # Star rating element
│   │   │   └── rf-navbar/        # Header navigation element
│   │   └── index.ts
│   ├── stencil.config.ts
│   ├── package.json              # Stencil package config (v1.0.1)
│   └── tsconfig.json
│
├── recipe-app/                    # SvelteKit + Svelte 5 Application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── services/
│   │   │   │   └── api.js        # TheMealDB REST API integration & fallback
│   │   │   └── stores/
│   │   │       ├── recipes.svelte.js  # Recipe store & CRUD
│   │   │       ├── favorites.svelte.js# Saved favorites store
│   │   │       └── planner.svelte.js  # 7-day meal planner store
│   │   ├── routes/
│   │   │   ├── +layout.svelte    # Shell layout & Stencil Web Component registration
│   │   │   ├── +page.svelte      # Discovery view with filters & pagination
│   │   │   ├── recipes/[id]/
│   │   │   │   └── +page.svelte  # Recipe Details & Meal Planner modal
│   │   │   ├── my-recipes/
│   │   │   │   └── +page.svelte  # Recipe Management (Add/Edit/Delete)
│   │   │   ├── favorites/
│   │   │   │   └── +page.svelte  # Saved Favorites view
│   │   │   └── meal-planner/
│   │   │       └── +page.svelte  # 7-Day Weekly Meal Matrix
│   │   ├── app.css               # Design system & CSS tokens
│   │   └── app.html
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── package.json
│
├── scripts/
│   └── build-all.js              # Cross-platform workspace build script
├── vercel.json                    # Vercel deployment configuration & SPA rewrites
├── package.json                   # Monorepo root package configuration
└── README.md                     # Project Documentation & Setup Guide
```

---

## Setup & Development Instructions

### Prerequisites
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

---

### Starting the Development Server Locally

To run the application locally:

```bash
# Navigate to the SvelteKit application folder
cd c:/NAGP/recipe-app

# Start dev server
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

### Building the Workspace & Components

To run a complete production build of both the Stencil component library and the SvelteKit app:

```bash
# From the root directory (C:\NAGP)
npm run build
```

---

## Assumptions Made

1. **SPA Mode for Static Hosting**: The app uses SvelteKit static adapter (`@sveltejs/adapter-static`) configured for Single Page Application (SPA) client-side rendering with fallback to `index.html`.
2. **Persistent Storage**: Client-side LocalStorage (`rf_user_recipes`, `rf_favorites`, `rf_meal_planner`, `rf_theme`) is used for persistence of custom recipes, favorites, meal plan matrix, and theme preference.
3. **API Availability**: Public REST API (`https://www.themealdb.com/api/json/v1/1/`) is used as the primary external data source with built-in fallback data for offline resilience.
4. **Custom Component Bundling**: Stencil components are pre-registered via standalone Web Component exports in SvelteKit's browser initialization hook (`onMount`).

---

## Key Features & Requirements Coverage

| Requirement | Implementation Detail |
| :--- | :--- |
| **Recipe Discovery** | Search by title/ingredients, quick category pills (Breakfast, Seafood, Vegetarian, etc.), Quick Difficulty Pills (Easy, Medium, Hard), truncated windowed pagination. |
| **Recipe Details** | Dynamic route `/recipes/[id]`, ingredients checklist with interactive checkboxes, step-by-step directions, serving sizes, ratings, and meal plan assignment modal. |
| **Recipe Management (CRUD)** | Dedicated `/my-recipes` view. Add new recipes, edit existing custom dishes, delete custom recipes, client-side input validation. |
| **Favorites** | Toggle favorite heart icon via `<rf-recipe-card>` custom events, browse saved collection in `/favorites`, synced with LocalStorage. |
| **Weekly Meal Planner** | Interactive 7-day matrix (Monday–Sunday) across 4 meal slots (Breakfast, Lunch, Snack, Dinner). Computes total weekly prep time and meal count reactively. |
| **Stencil Web Components** | Shadow DOM custom components (`<rf-recipe-card>`, `<rf-search-bar>`, `<rf-modal>`, `<rf-badge>`, `<rf-rating>`, `<rf-navbar>`) emitting custom events (`rfSelect`, `rfSearch`, `rfFavoriteToggle`, `rfClose`, `rfNavigate`) and utilizing slots. |
