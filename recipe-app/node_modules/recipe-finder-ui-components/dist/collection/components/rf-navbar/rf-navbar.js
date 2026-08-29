import { h } from "@stencil/core";
export class RfNavbar {
    constructor() {
        this.brandName = 'TasteCraft';
        this.activeRoute = '/';
        this.navigate = (path, e) => {
            e.preventDefault();
            this.rfNavigate.emit({ path });
        };
    }
    render() {
        const navItems = [
            { path: '/', label: 'Discover', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
            { path: '/my-recipes', label: 'My Recipes', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
            { path: '/favorites', label: 'Favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
            { path: '/meal-planner', label: 'Meal Planner', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        ];
        return (h("header", { key: 'd7320e2c80702f21434591a5c30008ef7fe80f55', class: "navbar" }, h("div", { key: 'ba87b90df707a5a06e87c4276b38555d255bbcfb', class: "navbar-container" }, h("a", { key: '0c10f4919d1057dc7199123f43431b09f4132b7b', href: "/", class: "brand", onClick: (e) => this.navigate('/', e) }, h("slot", { key: '57c21d51768d6360f2e77e8339a83f0b417a081a', name: "brand" }, h("div", { key: '94a6a46579c14f6f0c993f89271348f220b40c47', class: "brand-logo" }, h("svg", { key: '94a98e1220ada5ab7c70a98e614fb08fadd32595', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5" }, h("path", { key: 'b0db5eb3db05f2b600065e2e6b3ac3950d9a2336', d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }))), h("span", { key: '16bda27bc10d4e32f02958ea0e15d579621602c0', class: "brand-name" }, this.brandName))), h("nav", { key: 'cda1253874f8284bc856bcdfc54c6b471b95fa94', class: "nav-menu" }, navItems.map(item => {
            const isActive = this.activeRoute === item.path || (item.path !== '/' && this.activeRoute.startsWith(item.path));
            return (h("a", { href: item.path, class: `nav-link ${isActive ? 'active' : ''}`, onClick: (e) => this.navigate(item.path, e) }, h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, h("path", { d: item.icon, "stroke-linecap": "round", "stroke-linejoin": "round" })), h("span", null, item.label)));
        })), h("div", { key: 'ea71cc738cc0a316fd7abc00caa106fb470c7804', class: "nav-actions" }, h("slot", { key: '5c3e0946cdd27987c83e0f9baa06a54b7219dbcb', name: "actions" })))));
    }
    static get is() { return "rf-navbar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rf-navbar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rf-navbar.css"]
        };
    }
    static get properties() {
        return {
            "brandName": {
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
                "attribute": "brand-name",
                "defaultValue": "'TasteCraft'"
            },
            "activeRoute": {
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
                "attribute": "active-route",
                "defaultValue": "'/'"
            }
        };
    }
    static get events() {
        return [{
                "method": "rfNavigate",
                "name": "rfNavigate",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ path: string }",
                    "resolved": "{ path: string; }",
                    "references": {}
                }
            }];
    }
}
