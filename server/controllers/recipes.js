import { connection } from "../sql_connection.js"
import '../models/recipeMessage.js'
import Recipe from "../models/recipeMessage.js";

export const getRecipes = (req, res) => {
    //res.send("THIS WORKS!!!")
    let a;
    connection.query('SELECT * FROM recipe;',
    function (error, results, fields) {
        if(error)
        {
            res.status(404).json({message: error.message})
            console.log(error)
        }
        else
        {
            res.status(200).send(results)
        }
    })
}


export const createRecipe = (req, res) => {
    const recipe = req.body;

    const newRecipe = new Recipe(recipe.name, recipe.description, recipe.order, recipe.typeID, recipe.creatorID);

    connection.query('INSERT INTO `Recipe` SET ?', newRecipe, 
    function(error, results, fields)
    {
        if(error)
        {
            res.status(409).json({message: error.message})
        }
        else
        {
            res.status(201).json({message: newRecipe})
        }
    })
}