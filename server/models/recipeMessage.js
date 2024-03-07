class Recipe {
    constructor(name, description, order, typeID, creatorID) {
        this.name = name;
        this.description = description;
        this.cooking_order = order;
        this.recipe_type_id = typeID;
        this.user_created_id = creatorID;
    }
}

export default Recipe;

export const recipe_name_field = "name"
export const recipe_id_field = "id"
export const recipe_cooking_order_field = "cooking order"
export const recipe_type_id_field = "recipe_type_id"
export const recipe_type_name_field = "recipe_type"
export const recipe_description_field = "description"
export const user_created_id_field = "user_created_id"