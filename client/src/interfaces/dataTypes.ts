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

export interface Product {
    product_id: number,
    name: string,
    type_id: number,
    type_name: string,
}

export interface RecipeProduct extends Product {
    quantity: number,
    unit: string
}