import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

@Component({
  tag: 'rf-search-bar',
  styleUrl: 'rf-search-bar.css',
  shadow: true,
})
export class RfSearchBar {
  @Prop() placeholder: string = 'Search by recipe title or ingredient (e.g. Salmon, Avocado, Pasta)...';
  @Prop() searchValue: string = '';
  @Prop() selectedCategory: string = 'All';
  @Prop() selectedPrepTime: number = 0; // 0 means any
  @Prop() categoriesJson: string = '["All", "Breakfast", "Beef", "Chicken", "Dessert", "Pasta", "Seafood", "Side", "Starter", "Vegetarian", "Custom"]';

  @State() internalQuery: string = '';
  @State() internalCategory: string = 'All';
  @State() internalPrepTime: number = 0;

  @Event({ eventName: 'rfSearch', bubbles: true, composed: true }) rfSearch!: EventEmitter<{ query: string; category: string; maxPrepTime: number }>;
  @Event({ eventName: 'rfClear', bubbles: true, composed: true }) rfClear!: EventEmitter<void>;

  componentWillLoad() {
    this.internalQuery = this.searchValue;
    this.internalCategory = this.selectedCategory;
    this.internalPrepTime = this.selectedPrepTime;
  }

  private handleInput = (e: Event) => {
    this.internalQuery = (e.target as HTMLInputElement).value;
    this.emitSearch();
  };

  private handleCategoryChange = (e: Event) => {
    this.internalCategory = (e.target as HTMLSelectElement).value;
    this.emitSearch();
  };

  private handlePrepTimeChange = (e: Event) => {
    this.internalPrepTime = parseInt((e.target as HTMLSelectElement).value, 10) || 0;
    this.emitSearch();
  };

  private handleClear = () => {
    this.internalQuery = '';
    this.internalCategory = 'All';
    this.internalPrepTime = 0;
    this.rfClear.emit();
    this.emitSearch();
  };

  private emitSearch = () => {
    this.rfSearch.emit({
      query: this.internalQuery,
      category: this.internalCategory,
      maxPrepTime: this.internalPrepTime,
    });
  };

  render() {
    let categoriesList: string[] = ['All'];
    try {
      categoriesList = JSON.parse(this.categoriesJson);
    } catch {
      categoriesList = ['All', 'Breakfast', 'Chicken', 'Dessert', 'Vegetarian'];
    }

    return (
      <div class="search-bar-container">
        <div class="search-input-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={this.internalQuery}
            placeholder={this.placeholder}
            onInput={this.handleInput}
          />
          {this.internalQuery && (
            <button class="clear-btn" onClick={this.handleClear} title="Clear search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div class="filter-group">
          <div class="select-box-wrapper">
            <select onChange={this.handleCategoryChange} aria-label="Select Category">
              {categoriesList.map(cat => (
                <option value={cat} selected={cat === this.internalCategory}>
                  {cat === 'All' ? 'Category: All' : cat}
                </option>
              ))}
            </select>
          </div>

          <div class="select-box-wrapper">
            <select onChange={this.handlePrepTimeChange} aria-label="Select Max Prep Time">
              <option value="0" selected={this.internalPrepTime === 0}>Prep Time: Any</option>
              <option value="15" selected={this.internalPrepTime === 15}>Under 15 mins</option>
              <option value="30" selected={this.internalPrepTime === 30}>Under 30 mins</option>
              <option value="45" selected={this.internalPrepTime === 45}>Under 45 mins</option>
              <option value="60" selected={this.internalPrepTime === 60}>Under 60 mins</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
