'use strict';

var index = require('./index-Chboh0pd.js');

const rfModalCss = () => `:host{display:block;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;box-sizing:border-box}.modal-backdrop{position:fixed;inset:0;background:rgba(15, 23, 42, 0.65);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;animation:fadeIn 0.25s ease-out}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.modal-container{background:#ffffff;border-radius:24px;width:100%;max-width:620px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.25);overflow:hidden;animation:slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);border:1px solid rgba(226, 232, 240, 0.8);transition:background 0.3s ease, border-color 0.3s ease}:host-context([data-theme="dark"]) .modal-container{background:#151c2c;border-color:#27354a;box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.6)}@keyframes slideUp{from{transform:translateY(20px) scale(0.97)}to{transform:translateY(0) scale(1)}}.modal-header{padding:20px 24px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between}:host-context([data-theme="dark"]) .modal-header{border-bottom-color:#27354a}.modal-header h2{margin:0;font-size:1.35rem;font-weight:700;color:#0f172a}:host-context([data-theme="dark"]) .modal-header h2{color:#f8fafc}.close-btn{width:36px;height:36px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s ease}:host-context([data-theme="dark"]) .close-btn{background:#1e293b;color:#94a3b8}.close-btn svg{width:18px;height:18px}.close-btn:hover{background:#e2e8f0;color:#0f172a}:host-context([data-theme="dark"]) .close-btn:hover{background:#334155;color:#f8fafc}.modal-body{padding:24px;overflow-y:auto;flex:1;color:#334155;line-height:1.6}:host-context([data-theme="dark"]) .modal-body{color:#cbd5e1}.modal-footer{padding:16px 24px;border-top:1px solid #f1f5f9;background:#f8fafc;display:flex;align-items:center;justify-content:flex-end;gap:12px}:host-context([data-theme="dark"]) .modal-footer{border-top-color:#27354a;background:#0b0f19}`;

const RfModal = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.rfClose = index.createEvent(this, "rfClose");
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
        return (index.h("div", { class: "modal-backdrop", onClick: this.handleBackdropClick }, index.h("div", { class: "modal-container", role: "dialog", "aria-modal": "true" }, index.h("div", { class: "modal-header" }, index.h("slot", { name: "header" }, index.h("h2", null, this.modalTitle)), index.h("button", { class: "close-btn", onClick: this.handleCloseBtn, "aria-label": "Close modal" }, index.h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2" }, index.h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), index.h("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))), index.h("div", { class: "modal-body" }, index.h("slot", { name: "content" }, index.h("slot", null))), index.h("div", { class: "modal-footer" }, index.h("slot", { name: "footer" })))));
    }
};
RfModal.style = rfModalCss();

exports.rf_modal = RfModal;
