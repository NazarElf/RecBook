import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
    {
        name: String,
        order: String,
        picture: String,
        ingridients:
        {
            type: [
                {
                    id: Number, //Id of ingridient
                    muType:
                    {
                        type: String,
                        default: "kilo"
                    },
                    quantity:
                    {
                        type:Number,
                        default: 0.5,
                    }
                },
            ],
            default: [],
        },
    }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;