import type { Components, JSX } from "../types/components";

interface RfSearchBar extends Components.RfSearchBar, HTMLElement {}
export const RfSearchBar: {
    prototype: RfSearchBar;
    new (): RfSearchBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
