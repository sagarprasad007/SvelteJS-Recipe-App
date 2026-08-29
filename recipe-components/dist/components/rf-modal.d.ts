import type { Components, JSX } from "../types/components";

interface RfModal extends Components.RfModal, HTMLElement {}
export const RfModal: {
    prototype: RfModal;
    new (): RfModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
