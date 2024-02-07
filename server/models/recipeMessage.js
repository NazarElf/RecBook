class Recipe
{
    constructor(name, description, order, typeID, creatorID)
    {
        this.name = name;
        this.description = description;
        this.cooking_order = order;
        this.recipe_type_id = typeID;
        this.user_created_id = creatorID;
    }
}

export default Recipe;