# Recipe Finder & Meal Planner Platform

A modern, enterprise-grade fullstack web application built with **Svelte 5** (utilizing Svelte Runes: `$state`, `$derived`, `$props`, `$effect`), **SvelteKit**, and a custom-built, reusable **StencilJS Web Component Library** published to NPM (`recipe-finder-ui-components`).

---

## Architecture Overview

The solution consists of two primary project repositories:

1. **`recipe-components/`**: Isolated **StencilJS** Web Component Library.
   - Generates standard Custom Web Components with Shadow DOM.
   - Published as NPM package `recipe-finder-ui-components`.
   - Includes components: `<rf-recipe-card>`, `<rf-search-bar>`, `<rf-modal>`, `<rf-badge>`, `<rf-rating>`, and `<rf-navbar>`.

2. **`recipe-app/`**: Enterprise **SvelteKit** Web Application.
   - Built on Svelte 5 with modern Runes architecture.
   - Integrates with public REST API (TheMealDB) and LocalStorage persistence.
   - Consumes the StencilJS custom web components via NPM package imports.

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
│   ├── package.json              # Package config for NPM publishing
│   └── tsconfig.json
│
├── recipe-app/                    # SvelteKit + Svelte 5 Application
│   ├── src/
│   │   ├── lib/
│   │   │   ├── services/
│   │   │   │   └── api.js        # TheMealDB REST API integration & fallback
│   │   │   └── stores/
│   │   │       ├── recipes.svelte.js  # Svelte 5 Rune recipe store & CRUD
│   │   │       ├── favorites.svelte.js# Svelte 5 Rune favorites store
│   │   │       └── planner.svelte.js  # Svelte 5 Rune 7-day meal planner store
│   │   ├── routes/
│   │   │   ├── +layout.svelte    # Shell layout & Stencil loader initialization
│   │   │   ├── +page.svelte      # Discovery / Search & Filter view
│   │   │   ├── recipes/[id]/
│   │   │   │   └── +page.svelte  # Recipe Details & Planner assignment modal
│   │   │   ├── my-recipes/
│   │   │   │   └── +page.svelte  # User Recipe CRUD (Add, Edit, Delete, Validate)
│   │   │   ├── favorites/
│   │   │   │   └── +page.svelte  # Saved Favorites view
│   │   │   └── meal-planner/
│   │   │       └── +page.svelte  # Interactive 7-Day Weekly Meal Matrix
│   │   ├── app.css               # Design system & CSS tokens
│   │   └── app.html
│   ├── svelte.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md                     # Complete Documentation & Execution Guide
```

---

## Step-by-Step Execution Guide

### Prerequisites
- **Node.js**: `v18.x` or higher (tested on Node v24.x)
- **npm**: `v9.x` or higher

---

### Step 1: Build & Package the StencilJS Component Library

```bash
# Navigate to component library directory
cd c:/NAGP/recipe-components

# Install StencilJS dependencies
npm install

# Build the Web Components distribution
npm run build

# Package into NPM tarball (.tgz) for distribution/publishing
npm pack
```

> **Note on NPM Publishing:**
> To publish to the official NPM registry, run:
> ```bash
> npm login
> npm publish --access public
> ```
> *The published package link for this component library is:* `https://www.npmjs.com/package/recipe-finder-ui-components`

---

### Step 2: Install & Run the SvelteKit Application

```bash
# Navigate to application directory
cd c:/NAGP/recipe-app

# Install application dependencies (including the local NPM package tarball)
npm install

# Start the SvelteKit development server
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

### Step 3: Building & Verification

```bash
# Verify SvelteKit application build
cd c:/NAGP/recipe-app
npm run build

# Preview production build locally
npm run preview
```

---

## Features & Functional Coverage

| Requirement | Implementation Detail |
| :--- | :--- |
| **Recipe Discovery** | Real-time query search, category filters (Breakfast, Seafood, Vegetarian, etc.), prep time slider/dropdown filter, responsive grid. |
| **Recipe Details** | Dynamic route `/recipes/[id]`, ingredients checklist with interactive toggle, step-by-step cooking directions, serving sizes, ratings, and meal plan assign modal. |
| **Recipe Management (CRUD)** | Dedicated `/my-recipes` route. Add new recipes, edit existing custom dishes, delete custom recipes, with client-side form validation for required fields, prep time, ingredients, and instructions. |
| **Favorites** | Toggle favorites via `<rf-recipe-card>` custom events, browse saved recipes in `/favorites`, synced with LocalStorage. |
| **Weekly Meal Planner** | Interactive 7-day matrix (Monday–Sunday) across 4 meal slots (Breakfast, Lunch, Dinner, Snack). Computes total weekly prep time and meal count reactively using Svelte 5 `$derived`. |
| **Stencil Web Components** | Shadow DOM encapsulated web components (`<rf-recipe-card>`, `<rf-search-bar>`, `<rf-modal>`, `<rf-badge>`, `<rf-rating>`, `<rf-navbar>`) emitting custom events (`rfSelect`, `rfSearch`, `rfFavoriteToggle`, `rfClose`, `rfNavigate`) and utilizing slots. |

---

## Clean Architecture & Coding Standards

1. **Svelte 5 Modern Runes**: Standardized state management using `$state()` for reactive data, `$derived()` for computed metrics, and `$effect()` for persistence, eliminating legacy writable stores.
2. **Component Encapsulation**: Stencil custom components follow Web Component standards, isolating styles and exposing strictly typed `@Prop()`, `@Event()`, and `<slot>` boundaries.
3. **No Code Duplication**: Unified API service with realistic fallback data, shared rune stores across routes, reusable CSS tokens, and centralized layout components.
4. **Input Validation**: Strict validation rules for custom recipe creation with clear inline user feedback.

---

## Links & Resources
- **NPM Package**: [recipe-finder-ui-components](https://www.npmjs.com/package/recipe-finder-ui-components)
- **Frameworks Used**: Svelte 5, SvelteKit, StencilJS, Vite, TypeScript.
