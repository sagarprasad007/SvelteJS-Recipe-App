import { a as attr, e as escape_html, h as ensure_array_like } from "../../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { D as DAYS, M as MEAL_TYPES } from "../../../../chunks/planner.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let recipe = null;
    let isPlannerModalOpen = false;
    let selectedDay = "Monday";
    let selectedMealType = "Lunch";
    $$renderer2.push(`<div class="container">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-1r2e3yg"><div class="spinner svelte-1r2e3yg"></div> <p>Loading recipe details...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div> <rf-modal${attr("open", isPlannerModalOpen, true)} modal-title="Add to Weekly Meal Plan"><div slot="content"><p style="margin-bottom: 16px;">Choose which day and meal slot to assign <strong>${escape_html(recipe?.title)}</strong>:</p> <div class="form-group"><label for="planner-day-select">Select Day of Week</label> `);
    $$renderer2.select(
      {
        id: "planner-day-select",
        class: "form-control",
        value: selectedDay
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_2 = ensure_array_like(DAYS);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let day = each_array_2[$$index_2];
          $$renderer3.option({ value: day }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(day)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-group"><label for="planner-slot-select">Select Meal Slot</label> `);
    $$renderer2.select(
      {
        id: "planner-slot-select",
        class: "form-control",
        value: selectedMealType
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_3 = ensure_array_like(MEAL_TYPES);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let slot = each_array_3[$$index_3];
          $$renderer3.option({ value: slot }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(slot)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div slot="footer"><button class="btn btn-secondary">Cancel</button> <button class="btn btn-primary">Confirm Assignment</button></div></rf-modal>`);
  });
}
export {
  _page as default
};
