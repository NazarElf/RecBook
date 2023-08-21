import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        name: String,
        order: String,
        picture: String,
        ingridiets:
        {
            type: [
                {
                    type: Number, //Id of ingridient
                }
            ],
            default: [],
        },
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;