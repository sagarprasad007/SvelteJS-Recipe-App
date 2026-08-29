import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rf-rating',
  styleUrl: 'rf-rating.css',
  shadow: true,
})
export class RfRating {
  @Prop() value: number = 4.5;
  @Prop() max: number = 5;
  @Prop() showLabel: boolean = true;

  render() {
    const stars = [];
    const ratingValue = Math.min(Math.max(this.value, 0), this.max);

    for (let i = 1; i <= this.max; i++) {
      let starType = 'empty';
      if (ratingValue >= i) {
        starType = 'full';
      } else if (ratingValue >= i - 0.5) {
        starType = 'half';
      }

      stars.push(
        <span class={`star star-${starType}`} key={i}>
          ★
        </span>
      );
    }

    return (
      <div class="rating-wrapper">
        <div class="stars-container">{stars}</div>
        {this.showLabel && <span class="rating-number">{ratingValue.toFixed(1)}</span>}
      </div>
    );
  }
}
