import { h } from "@stencil/core";
export class RfModal {
    constructor() {
        this.open = false;
        this.modalTitle = '';
        this.handleBackdropClick = (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.rfClose.emit();
            }
        };
        this.handleCloseBtn = () => {
            this.rfClose.emit();
        };
    }
    render() {
        if (!this.open)
            return null;
        return (h("div", { class: "modal-backdrop", onClick: this.handleBackdropClick }, h("div", { class: "modal-container", role: "dialog", "aria-modal": "true" }, h("div", { class: "modal-header" }, h("slot", { name: "header" }, h("h2", null, this.modalTitle)), h("button", { class: "close-btn", onClick: this.handleCloseBtn, "aria-label": "Close modal" }, h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), h("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))), h("div", { class: "modal-body" }, h("slot", { name: "content" }, h("slot", null))), h("div", { class: "modal-footer" }, h("slot", { name: "footer" })))));
    }
    static get is() { return "rf-modal"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-modal.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-modal.css"]
        };
    }
    static get properties() {
        return {
            "open": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "open",
                "defaultValue": "false"
            },
            "modalTitle": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "modal-title",
                "defaultValue": "''"
            }
        };
    }
    static get events() {
        return [{
                "method": "rfClose",
                "name": "rfClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
}
