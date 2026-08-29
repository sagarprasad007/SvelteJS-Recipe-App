import type { Components, JSX } from "../types/components";

interface RfBadge extends Components.RfBadge, HTMLElement {}
export const RfBadge: {
    prototype: RfBadge;
    new (): RfBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
