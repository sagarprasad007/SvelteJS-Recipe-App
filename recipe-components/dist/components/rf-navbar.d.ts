import type { Components, JSX } from "../types/components";

interface RfNavbar extends Components.RfNavbar, HTMLElement {}
export const RfNavbar: {
    prototype: RfNavbar;
    new (): RfNavbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
