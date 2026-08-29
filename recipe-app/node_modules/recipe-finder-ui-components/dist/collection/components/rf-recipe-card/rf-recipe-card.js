import { h } from "@stencil/core";
export class RfRecipeCard {
    constructor() {
        this.category = 'General';
        this.prepTime = 20;
        this.difficulty = 'Easy';
        this.rating = 4.5;
        this.isFavorite = false;
        this.isUserCreated = false;
        this.handleCardClick = (e) => {
            const target = e.target;
            if (target.closest('.fav-btn')) {
                return;
            }
            this.rfSelect.emit({ recipeId: this.recipeId });
        };
        this.handleFavoriteClick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.rfFavoriteToggle.emit({ recipeId: this.recipeId, isFavorite: !this.isFav });
        };
    }
    get isFav() {
        return this.isFavorite === true || this.isFavorite === 'true';
    }
    render() {
        const fallbackImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80';
        return (h("div", { key: 'b95de6953c1f02a728bcef952a91d752e8744626', class: "recipe-card", onClick: this.handleCardClick }, h("div", { key: '10a4af74e9b66c8dc8ab1325ea4ef394103a5f1c', class: "image-wrapper" }, h("img", { key: 'd1bb55e8d2a1d3b0cb50e0117b2a93b59144428f', src: this.image || fallbackImage, alt: this.recipeTitle, onError: (e) => { e.target.src = fallbackImage; } }), h("div", { key: 'cf6703be3310c2fff322e400f803e9db98ab7e7c', class: "overlay" }), h("button", { key: '197b381ae92db4850cd15397b39a8806e35ea723', class: `fav-btn ${this.isFav ? 'active' : ''}`, onClick: this.handleFavoriteClick, title: this.isFav ? 'Remove from Favorites' : 'Add to Favorites', "aria-label": "Toggle Favorite" }, h("svg", { key: 'da8b9c6b536f3de57e32a682effd65e4f51ad24c', viewBox: "0 0 24 24", fill: this.isFav ? 'currentColor' : 'none', stroke: "currentColor", "stroke-width": "2" }, h("path", { key: '47426e3931643640cc616bfc3404e569755d3464', d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }))), this.isUserCreated && (h("span", { key: '6b63b0d073f9e473d18759b2628c7f397d7d0ca6', class: "badge user-badge" }, "Custom Recipe")), h("span", { key: 'b6c81de92c312ba0340ce88330d9872c22404f15', class: "badge category-badge" }, this.category)), h("div", { key: '61887297f5cc43e7d077e0d49265b0947f1d3ae4', class: "card-content" }, h("h3", { key: '698faf0bd8f748417da60a5561cb3bd90ca72f82', class: "title" }, this.recipeTitle), h("div", { key: '275fcb7fd0f9300b193a95e9af744b96173f8148', class: "meta-row" }, h("span", { key: '38803bded03ee4df2e399dc663271a244399eae0', class: "meta-item" }, h("svg", { key: '8cc4e4e2e964c81265fefd4602b667bc2b9fdce6', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("circle", { key: '802a1ee9490164c57ef538f1b1acb333861652a9', cx: "12", cy: "12", r: "10" }), h("polyline", { key: '34212e9d954cc2413564747e16458e8ed646bfc1', points: "12 6 12 12 16 14" })), this.prepTime, " mins"), h("span", { key: 'd6a82da0eb35b738bd855870541701abfa6d9213', class: "meta-item rating" }, h("svg", { key: '3dd011c690524f374363d8d3dec30fab881c1ac9', viewBox: "0 0 24 24", fill: "currentColor" }, h("polygon", { key: '287162ffaf3796f882caf8e355509b175281ca36', points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })), this.rating)), h("div", { key: '00475e7af56ebfffbb7aedb58e6507d45e8bbf59', class: "card-actions" }, h("slot", { key: '5063873de285e7c64298914c1bd300e61a4f471b', name: "actions" }, h("button", { key: 'a2a151e8f780884f7898d33566b06b5308a2f790', class: "view-btn" }, "View Details", h("svg", { key: 'f4968585333ca8644cfb78305b7919dd6a5d57ad', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("line", { key: '4fddd6e28b5a1667ae23ef0d4ef927217f66f06a', x1: "5", y1: "12", x2: "19", y2: "12" }), h("polyline", { key: '0808e14d59a620f30e57d952d50fac9f2738cc50', points: "12 5 19 12 12 19" }))))))));
    }
    static get is() { return "rf-recipe-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-recipe-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-recipe-card.css"]
        };
    }
    static get properties() {
        return {
            "recipeId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "recipe-id"
            },
            "recipeTitle": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "recipe-title"
            },
            "image": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "image"
            },
            "category": {
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
                "attribute": "category",
                "defaultValue": "'General'"
            },
            "prepTime": {
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
                "attribute": "prep-time",
                "defaultValue": "20"
            },
            "difficulty": {
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
                "attribute": "difficulty",
                "defaultValue": "'Easy'"
            },
            "rating": {
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
                "attribute": "rating",
                "defaultValue": "4.5"
            },
            "isFavorite": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "boolean | string",
                    "resolved": "boolean | string",
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
                "attribute": "is-favorite",
                "defaultValue": "false"
            },
            "isUserCreated": {
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
                "attribute": "is-user-created",
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "rfSelect",
                "name": "rfSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ recipeId: string }",
                    "resolved": "{ recipeId: string; }",
                    "references": {}
                }
            }, {
                "method": "rfFavoriteToggle",
                "name": "rfFavoriteToggle",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ recipeId: string; isFavorite: boolean }",
                    "resolved": "{ recipeId: string; isFavorite: boolean; }",
                    "references": {}
                }
            }];
    }
}
