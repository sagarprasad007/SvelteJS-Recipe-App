import { EventEmitter } from '../../stencil-public-runtime';
export declare class RfSearchBar {
    placeholder: string;
    searchValue: string;
    selectedCategory: string;
    selectedPrepTime: number;
    categoriesJson: string;
    internalQuery: string;
    internalCategory: string;
    internalPrepTime: number;
    rfSearch: EventEmitter<{
        query: string;
        category: string;
        maxPrepTime: number;
    }>;
    rfClear: EventEmitter<void>;
    componentWillLoad(): void;
    private handleInput;
    private handleCategoryChange;
    private handlePrepTimeChange;
    private handleClear;
    private emitSearch;
    render(): any;
}
