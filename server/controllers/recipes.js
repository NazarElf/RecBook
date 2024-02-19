import { connection } from "../sql_connection.js"
import '../models/recipeMessage.js'
import Recipe from "../models/recipeMessage.js";

export const getRecipes = (req, res) => {
    connection.query('SELECT recipe_id as id, name, description, cooking_order, recipe_type_id FROM recipe;',
        async function (error, results, fields) {
            if (error) {
                res.status(404).json({ message: error.message })
                console.log(error)
            }
            else {
                res.status(200).send(results)
            }
        })
}


export const createRecipe = (req, res) => {
    const recipe = req.body;

    const newRecipe = new Recipe(recipe.name, recipe.description, recipe.cooking_order, recipe.typeID, recipe.creatorID);
    connection.query('INSERT INTO `Recipe` SET ?', newRecipe,
        function (error, results, fields) {
            console.log(results)
            if (error) {
                res.status(409).json({ message: error.message })
            }
            else {
                res.status(201).json({ ...newRecipe, id: results.insertId })
            }
        })
}

export const updateRecipe = (req, res) => {
    const { id: _id } = req.params;
    const recipe = req.body;
    const updateRecipe = new Recipe(recipe.name, recipe.description, recipe.order, recipe.typeID, recipe.creatorID);

    var q = connection.query('UPDATE `Recipe` SET modified = ? WHERE id = ?', updateRecipe)
    console.log(q)
    res.status(501).json({ message: updateRecipe });
}

export const deleteRecipe = (req, res) => {
    const { id: _id } = (req.params);
    connection.query('DELETE FROM `Recipe` WHERE Recipe_ID = ' + connection.escape(_id),
        function (error, results, fields) {
            if (error) {
                res.status(400).json({ message: error.message })
                return
            }
            else {
                res.status(200).json({ message: `deleted with id ${_id}` })
                return
            }
        })
}