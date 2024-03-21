export interface Entity {
    id?: number,
    name?: string,
}

export interface Recipe extends Entity {
    recipe_type_id?: number,
    recipe_type?: string,
    description?: string,
    user_created_id?: number,
}

export interface RecipeDetails extends Recipe {
    cooking_order?: string,
}

export interface SendRecipe extends RecipeDetails {
    products?: RecipeProduct[]
}

export interface RecipeType extends Entity {
}

export interface Product extends Entity {
    type_id?: number,
    type_name?: string,
}

export interface RecipeProduct extends Product {
    quantity?: number,
}