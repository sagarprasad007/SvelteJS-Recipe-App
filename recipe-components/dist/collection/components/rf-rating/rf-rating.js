import { h } from "@stencil/core";
export class RfRating {
    constructor() {
        this.value = 4.5;
        this.max = 5;
        this.showLabel = true;
    }
    render() {
        const stars = [];
        const ratingValue = Math.min(Math.max(this.value, 0), this.max);
        for (let i = 1; i <= this.max; i++) {
            let starType = 'empty';
            if (ratingValue >= i) {
                starType = 'full';
            }
            else if (ratingValue >= i - 0.5) {
                starType = 'half';
            }
            stars.push(h("span", { class: `star star-${starType}`, key: i }, "\u2605"));
        }
        return (h("div", { key: 'c051cf5b1fdfaf522d3c87992ba0556eb0293b46', class: "rating-wrapper" }, h("div", { key: 'c22e0585efe69d4b49b2e11d71c84765a62a01c1', class: "stars-container" }, stars), this.showLabel && h("span", { key: '77f373f1b2e66d343d94a5ef662e0f16c86fb8f9', class: "rating-number" }, ratingValue.toFixed(1))));
    }
    static get is() { return "rf-rating"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-rating.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-rating.css"]
        };
    }
    static get properties() {
        return {
            "value": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "value",
                "defaultValue": "4.5"
            },
            "max": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "max",
                "defaultValue": "5"
            },
            "showLabel": {
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
                "attribute": "show-label",
                "defaultValue": "true"
            }
        };
    }
}
