import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rf-modal',
  styleUrl: 'rf-modal.css',
  shadow: true,
})
export class RfModal {
  @Prop() open: boolean = false;
  @Prop() modalTitle: string = '';

  @Event() rfClose!: EventEmitter<void>;

  private handleBackdropClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.rfClose.emit();
    }
  };

  private handleCloseBtn = () => {
    this.rfClose.emit();
  };

  render() {
    if (!this.open) return null;

    return (
      <div class="modal-backdrop" onClick={this.handleBackdropClick}>
        <div class="modal-container" role="dialog" aria-modal="true">
          <div class="modal-header">
            <slot name="header">
              <h2>{this.modalTitle}</h2>
            </slot>
            <button class="close-btn" onClick={this.handleCloseBtn} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <slot name="content">
              <slot></slot>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    );
  }
}
