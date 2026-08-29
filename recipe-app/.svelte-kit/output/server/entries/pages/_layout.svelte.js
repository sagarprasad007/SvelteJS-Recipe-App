import { g as getContext, a as attr, b as attr_class, c as stringify, e as escape_html, d as derived, f as store_get, u as unsubscribe_stores } from "../../chunks/root.js";
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
class ToastStore {
  message = "";
  type = "success";
  visible = false;
  timer = null;
  /**
   * @param {string} msg
   * @param {'success' | 'info' | 'error'} toastType
   */
  show(msg, toastType = "success") {
    if (this.timer) clearTimeout(this.timer);
    this.message = msg;
    this.type = toastType;
    this.visible = true;
    this.timer = setTimeout(
      () => {
        this.visible = false;
      },
      3e3
    );
  }
  dismiss() {
    this.visible = false;
  }
}
const toastStore = new ToastStore();
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let activePath = derived(() => store_get($$store_subs ??= {}, "$page", page).url.pathname);
    $$renderer2.push(`<div class="app-shell svelte-12qhfyh"><rf-navbar brand-name="TasteCraft"${attr("active-route", activePath())}><div slot="actions" class="actions-wrapper svelte-12qhfyh"><div class="theme-switcher"><button${attr_class(`theme-toggle-btn ${"active"}`)} title="Light Mode" aria-label="Light Mode"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></button> <button${attr_class(`theme-toggle-btn ${""}`)} title="Dark Mode" aria-label="Dark Mode"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div> <a href="/my-recipes" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> New Recipe</a></div></rf-navbar> <main class="main-content svelte-12qhfyh">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (toastStore.visible) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class(`toast-banner ${stringify(toastStore.type)}`, "svelte-12qhfyh")}><span class="toast-icon svelte-12qhfyh">✓</span> <span class="toast-text">${escape_html(toastStore.message)}</span> <button class="toast-close svelte-12qhfyh">×</button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <footer class="app-footer svelte-12qhfyh"><div class="container footer-content"><p>© 2026 TasteCraft Recipe Finder &amp; Meal Planner. Built with Svelte 5, SvelteKit, and StencilJS.</p></div></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
