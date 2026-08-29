import type { Components, JSX } from "../types/components";

interface RfRecipeCard extends Components.RfRecipeCard, HTMLElement {}
export const RfRecipeCard: {
    prototype: RfRecipeCard;
    new (): RfRecipeCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
