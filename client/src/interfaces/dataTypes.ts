export interface Recipe {
    id?: number,
    name?: string,
    recipe_type_id?: number,
    recipe_type?: string,
    description?: string,
    user_created_id?: number,
}

export interface RecipeDetails extends Recipe {
    cooking_order?: string,
}

export interface RecipeType {
    id?: number,
    name?: string
}