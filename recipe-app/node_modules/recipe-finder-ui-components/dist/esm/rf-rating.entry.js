import { r as registerInstance, h } from './index-vyvYwSeW.js';

const rfRatingCss = () => `:host{display:inline-block;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif}.rating-wrapper{display:inline-flex;align-items:center;gap:6px}.stars-container{display:inline-flex;gap:2px}.star{font-size:1.1rem;line-height:1}.star-full{color:#f59e0b}.star-half{color:#fbbf24;opacity:0.8}.star-empty{color:#cbd5e1}.rating-number{font-size:0.875rem;font-weight:700;color:#475569}`;

const RfRating = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
RfRating.style = rfRatingCss();

export { RfRating as rf_rating };
