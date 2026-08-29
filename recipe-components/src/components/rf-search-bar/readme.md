# rf-search-bar



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type     | Default                                                                                                               |
| ------------------ | -------------------- | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `categoriesJson`   | `categories-json`    |             | `string` | `'["All", "Breakfast", "Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Side", "Starter", "Vegetarian", "Custom"]'` |
| `placeholder`      | `placeholder`        |             | `string` | `'Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)...'`                                             |
| `searchValue`      | `search-value`       |             | `string` | `''`                                                                                                                  |
| `selectedCategory` | `selected-category`  |             | `string` | `'All'`                                                                                                               |
| `selectedPrepTime` | `selected-prep-time` |             | `number` | `0`                                                                                                                   |


## Events

| Event      | Description | Type                                                                     |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| `rfClear`  |             | `CustomEvent<void>`                                                      |
| `rfSearch` |             | `CustomEvent<{ query: string; category: string; maxPrepTime: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
