# rf-recipe-card



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute         | Description | Type                | Default     |
| -------------------------- | ----------------- | ----------- | ------------------- | ----------- |
| `category`                 | `category`        |             | `string`            | `'General'` |
| `difficulty`               | `difficulty`      |             | `string`            | `'Easy'`    |
| `image` _(required)_       | `image`           |             | `string`            | `undefined` |
| `isFavorite`               | `is-favorite`     |             | `boolean \| string` | `false`     |
| `isUserCreated`            | `is-user-created` |             | `boolean`           | `false`     |
| `prepTime`                 | `prep-time`       |             | `number`            | `20`        |
| `rating`                   | `rating`          |             | `number`            | `4.5`       |
| `recipeId` _(required)_    | `recipe-id`       |             | `string`            | `undefined` |
| `recipeTitle` _(required)_ | `recipe-title`    |             | `string`            | `undefined` |


## Events

| Event              | Description | Type                                                      |
| ------------------ | ----------- | --------------------------------------------------------- |
| `rfFavoriteToggle` |             | `CustomEvent<{ recipeId: string; isFavorite: boolean; }>` |
| `rfSelect`         |             | `CustomEvent<{ recipeId: string; }>`                      |


## Slots

| Slot        | Description |
| ----------- | ----------- |
| `"actions"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
