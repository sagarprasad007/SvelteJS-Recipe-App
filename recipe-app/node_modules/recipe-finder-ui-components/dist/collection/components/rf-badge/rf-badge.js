import { h } from "@stencil/core";
export class RfBadge {
    constructor() {
        this.variant = 'primary';
        this.text = '';
    }
    render() {
        return (h("span", { key: 'b3d2e298f30e36e52dc58d74c53f451da8e0438e', class: `badge badge-${this.variant}` }, this.text || h("slot", { key: '5dc80f830bbeeec771efd39869d2e86f83282a41' })));
    }
    static get is() { return "rf-badge"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-badge.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-badge.css"]
        };
    }
    static get properties() {
        return {
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'primary' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning'",
                    "resolved": "\"accent\" | \"outline\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
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
                "attribute": "variant",
                "defaultValue": "'primary'"
            },
            "text": {
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
                "attribute": "text",
                "defaultValue": "''"
            }
        };
    }
}
