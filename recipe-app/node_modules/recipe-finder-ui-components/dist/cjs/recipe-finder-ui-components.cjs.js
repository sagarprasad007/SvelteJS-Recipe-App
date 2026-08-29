'use strict';

var index = require('./index-Chboh0pd.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/*
 Stencil Client Patch Browser v4.44.2 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('recipe-finder-ui-components.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["rf-badge.cjs",[[257,"rf-badge",{"variant":[1],"text":[1]}]]],["rf-modal.cjs",[[257,"rf-modal",{"open":[4],"modalTitle":[1,"modal-title"]}]]],["rf-navbar.cjs",[[257,"rf-navbar",{"brandName":[1,"brand-name"],"activeRoute":[1,"active-route"]}]]],["rf-rating.cjs",[[1,"rf-rating",{"value":[2],"max":[2],"showLabel":[4,"show-label"]}]]],["rf-recipe-card.cjs",[[257,"rf-recipe-card",{"recipeId":[1,"recipe-id"],"recipeTitle":[1,"recipe-title"],"image":[1],"category":[1],"prepTime":[2,"prep-time"],"difficulty":[1],"rating":[2],"isFavorite":[8,"is-favorite"],"isUserCreated":[4,"is-user-created"]}]]],["rf-search-bar.cjs",[[1,"rf-search-bar",{"placeholder":[1],"searchValue":[1,"search-value"],"selectedCategory":[1,"selected-category"],"selectedPrepTime":[2,"selected-prep-time"],"categoriesJson":[1,"categories-json"],"internalQuery":[32],"internalCategory":[32],"internalPrepTime":[32]}]]]], options);
});

exports.setNonce = index.setNonce;
