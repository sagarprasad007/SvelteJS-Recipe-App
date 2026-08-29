import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'rf-recipe-card',
  styleUrl: 'rf-recipe-card.css',
  shadow: true,
})
export class RfRecipeCard {
  @Prop() recipeId!: string;
  @Prop() recipeTitle!: string;
  @Prop() image!: string;
  @Prop() category: string = 'General';
  @Prop() prepTime: number = 20;
  @Prop() difficulty: string = 'Easy';
  @Prop() rating: number = 4.5;
  @Prop() isFavorite: boolean | string = false;
  @Prop() isUserCreated: boolean = false;

  @Event({ eventName: 'rfSelect', bubbles: true, composed: true }) rfSelect!: EventEmitter<{ recipeId: string }>;
  @Event({ eventName: 'rfFavoriteToggle', bubbles: true, composed: true }) rfFavoriteToggle!: EventEmitter<{ recipeId: string; isFavorite: boolean }>;

  private get isFav(): boolean {
    return this.isFavorite === true || this.isFavorite === 'true';
  }

  private handleCardClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.fav-btn')) {
      return;
    }
    this.rfSelect.emit({ recipeId: this.recipeId });
  };

  private handleFavoriteClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    this.rfFavoriteToggle.emit({ recipeId: this.recipeId, isFavorite: !this.isFav });
  };

  render() {
    const fallbackImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80';

    return (
      <div class="recipe-card" onClick={this.handleCardClick}>
        <div class="image-wrapper">
          <img 
            src={this.image || fallbackImage} 
            alt={this.recipeTitle} 
            onError={(e: any) => { e.target.src = fallbackImage; }} 
          />
          <div class="overlay"></div>

          <button 
            class={`fav-btn ${this.isFav ? 'active' : ''}`}
            onClick={this.handleFavoriteClick}
            title={this.isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            aria-label="Toggle Favorite"
          >
            <svg viewBox="0 0 24 24" fill={this.isFav ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          {this.isUserCreated && (
            <span class="badge user-badge">Custom Recipe</span>
          )}
          <span class="badge category-badge">{this.category}</span>
        </div>

        <div class="card-content">
          <h3 class="title">{this.recipeTitle}</h3>

          <div class="meta-row">
            <span class="meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {this.prepTime} mins
            </span>

            <span class="meta-item rating">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {this.rating}
            </span>
          </div>

          <div class="card-actions">
            <slot name="actions">
              <button class="view-btn">
                View Details
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </slot>
          </div>
        </div>
      </div>
    );
  }
}
