import type { Components, JSX } from "../types/components";

interface RfRating extends Components.RfRating, HTMLElement {}
export const RfRating: {
    prototype: RfRating;
    new (): RfRating;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
