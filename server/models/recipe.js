import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        name: String,
        orderOfCreation: String,
        picture: String,
        products:
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