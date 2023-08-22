import Recipe from '../models/recipe.js'

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.aggregate([
            {
                $lookup: {
                    from: "ingridients",
                    localField: "ingridients.id",
                    foreignField: "id",
                    as: "ingridientsNew"
                }
            },
            {
                $project: {
                    _id: 0, ingridients: {
                        $map: {
                            input: "$ingridients",
                            as: "in_one",
                            in: {
                                $mergeObjects: [{ muType: "$$in_one.muType", quantity: "$$in_one.quantity" }, {
                                    $arrayElemAt: [
                                        {
                                            $filter:
                                            {
                                                input: "$ingridientsNew",
                                                as: "new",
                                                cond: { $eq: ["$$new.id", "$$in_one.id"] },
                                                limit: 1
                                            }
                                        }, 0]
                                }]
                            }
                        }
                    }, name: 1, order: 1, picture: 1
                }
            },
        ])

        recipes.forEach(recipe => {
            recipe.ingridients = recipe.ingridients.map(({_id,type, ...rest}) => rest)
        });

        res.status(200).json(recipes)
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
}

export const createRecipe = async (req, res) => {
    const recipe = req.body;

    const newRecipe = new Recipe(recipe)

    try {
         await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(409).json(error)
    }
}