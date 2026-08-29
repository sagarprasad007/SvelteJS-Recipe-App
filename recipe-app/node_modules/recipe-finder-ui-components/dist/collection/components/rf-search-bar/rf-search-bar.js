import { h } from "@stencil/core";
export class RfSearchBar {
    constructor() {
        this.placeholder = 'Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)...';
        this.searchValue = '';
        this.selectedCategory = 'All';
        this.selectedPrepTime = 0; // 0 means any
        this.categoriesJson = '["All", "Breakfast", "Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Side", "Starter", "Vegetarian", "Custom"]';
        this.internalQuery = '';
        this.internalCategory = 'All';
        this.internalPrepTime = 0;
        this.handleInput = (e) => {
            this.internalQuery = e.target.value;
            this.emitSearch();
        };
        this.handleCategoryChange = (e) => {
            this.internalCategory = e.target.value;
            this.emitSearch();
        };
        this.handlePrepTimeChange = (e) => {
            this.internalPrepTime = parseInt(e.target.value, 10) || 0;
            this.emitSearch();
        };
        this.handleClear = () => {
            this.internalQuery = '';
            this.internalCategory = 'All';
            this.internalPrepTime = 0;
            this.rfClear.emit();
            this.emitSearch();
        };
        this.emitSearch = () => {
            this.rfSearch.emit({
                query: this.internalQuery,
                category: this.internalCategory,
                maxPrepTime: this.internalPrepTime,
            });
        };
    }
    componentWillLoad() {
        this.internalQuery = this.searchValue;
        this.internalCategory = this.selectedCategory;
        this.internalPrepTime = this.selectedPrepTime;
    }
    render() {
        let categoriesList = ['All'];
        try {
            categoriesList = JSON.parse(this.categoriesJson);
        }
        catch (_a) {
            categoriesList = ['All', 'Breakfast', 'Chicken', 'Dessert', 'Vegetarian'];
        }
        return (h("div", { key: '75b04cdca1662694b11a0ca05ef8a73bc8fd5cc1', class: "search-bar-container" }, h("div", { key: '9df2b15d696f6c34f5a14500e558e40ad6d8295e', class: "search-input-box" }, h("svg", { key: '194e9480c55972a4cec7b51c9648507c4035c068', class: "search-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("circle", { key: '17b5501ce8aa5eb89bd3a41b8545414ce0c5154b', cx: "11", cy: "11", r: "8" }), h("line", { key: 'dc1172ba5f33c54d1f347d53b9836588d0e6d71b', x1: "21", y1: "21", x2: "16.65", y2: "16.65" })), h("input", { key: '16b8f6df3295e6250a1c1e7eb58014839d1bfb13', type: "text", value: this.internalQuery, placeholder: this.placeholder, onInput: this.handleInput }), this.internalQuery && (h("button", { key: '9538bb509a46b6511d980a650f6879410d0cb6e3', class: "clear-btn", onClick: this.handleClear, title: "Clear search" }, h("svg", { key: '6e6fbca8ced542672365df0a3b1a7d5d4b11747c', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("line", { key: '7cfd947ad9fde51da792757e278a2a045d20bf0a', x1: "18", y1: "6", x2: "6", y2: "18" }), h("line", { key: 'd8a64f9535b9a3ac315c955585249382404488e5', x1: "6", y1: "6", x2: "18", y2: "18" }))))), h("div", { key: '7f7dda7d86fa65075741bc66454655db6511a61b', class: "filter-group" }, h("div", { key: '1e3f8e86afdaf1ee84f552cc1b52af6423c01673', class: "select-box-wrapper" }, h("select", { key: 'adda98cafb4d22002998458ef4df4d7a69024531', onChange: this.handleCategoryChange, "aria-label": "Select Category" }, categoriesList.map(cat => (h("option", { value: cat, selected: cat === this.internalCategory }, cat === 'All' ? 'Category: All' : cat))))), h("div", { key: 'f2d1146828f1703412e592ffd6227a21f029ebd1', class: "select-box-wrapper" }, h("select", { key: '545fecb25dbf9ffb9e6b9e11b3a69d7d6c69ad5f', onChange: this.handlePrepTimeChange, "aria-label": "Select Max Prep Time" }, h("option", { key: 'd4baf5209da84b8465e689c4bb9ee91c1101ab81', value: "0", selected: this.internalPrepTime === 0 }, "Prep Time: Any"), h("option", { key: '4469248a898effd1e5ddaff483167137920253ac', value: "15", selected: this.internalPrepTime === 15 }, "Under 15 mins"), h("option", { key: '43b79a5ae4eead8c454fc6b323c57de6489c6b4b', value: "30", selected: this.internalPrepTime === 30 }, "Under 30 mins"), h("option", { key: 'f3ffe83715bef46bef7847a1373e75d91ecc2a4b', value: "45", selected: this.internalPrepTime === 45 }, "Under 45 mins"), h("option", { key: '00e19f8034bea15b1c55ae23e914f1ce34475cd3', value: "60", selected: this.internalPrepTime === 60 }, "Under 60 mins"))))));
    }
    static get is() { return "rf-search-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-search-bar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-search-bar.css"]
        };
    }
    static get properties() {
        return {
            "placeholder": {
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
                "attribute": "placeholder",
                "defaultValue": "'Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)...'"
            },
            "searchValue": {
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
                "attribute": "search-value",
                "defaultValue": "''"
            },
            "selectedCategory": {
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
                "attribute": "selected-category",
                "defaultValue": "'All'"
            },
            "selectedPrepTime": {
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
                "attribute": "selected-prep-time",
                "defaultValue": "0"
            },
            "categoriesJson": {
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
                "attribute": "categories-json",
                "defaultValue": "'[\"All\", \"Breakfast\", \"Beef\", \"Chicken\", \"Dessert\", \"Pasta\", \"Seafood\", \"Side\", \"Starter\", \"Vegetarian\", \"Custom\"]'"
            }
        };
    }
    static get states() {
        return {
            "internalQuery": {},
            "internalCategory": {},
            "internalPrepTime": {}
        };
    }
    static get events() {
        return [{
                "method": "rfSearch",
                "name": "rfSearch",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ query: string; category: string; maxPrepTime: number }",
                    "resolved": "{ query: string; category: string; maxPrepTime: number; }",
                    "references": {}
                }
            }, {
                "method": "rfClear",
                "name": "rfClear",
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
