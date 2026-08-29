import { g as getContext, a as attr, d as derived, b as store_get, u as unsubscribe_stores } from "../../chunks/root.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let activePath = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname);
    $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><rf-navbar brand-name="TasteCraft"${attr("active-route", activePath())}><div slot="actions"><a href="/my-recipes" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> New Recipe</a></div></rf-navbar> <main class="main-content svelte-12qhfyh">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="app-footer svelte-12qhfyh"><div class="container footer-content"><p>© 2026 TasteCraft Recipe Finder &amp; Meal Planner. Built with Svelte 5, SvelteKit, and StencilJS.</p></div></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
