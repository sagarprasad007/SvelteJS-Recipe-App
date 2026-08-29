import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'rf-badge',
  styleUrl: 'rf-badge.css',
  shadow: true,
})
export class RfBadge {
  @Prop() variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'success' | 'warning' = 'primary';
  @Prop() text: string = '';

  render() {
    return (
      <span class={`badge badge-${this.variant}`}>
        {this.text || <slot></slot>}
      </span>
    );
  }
}
