import { EventEmitter } from '../../stencil-public-runtime';
export declare class RfRecipeCard {
    recipeId: string;
    recipeTitle: string;
    image: string;
    category: string;
    prepTime: number;
    difficulty: string;
    rating: number;
    isFavorite: boolean | string;
    isUserCreated: boolean;
    rfSelect: EventEmitter<{
        recipeId: string;
    }>;
    rfFavoriteToggle: EventEmitter<{
        recipeId: string;
        isFavorite: boolean;
    }>;
    private get isFav();
    private handleCardClick;
    private handleFavoriteClick;
    render(): any;
}
