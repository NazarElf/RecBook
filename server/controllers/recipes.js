import { connection, getFilter } from "../sql_connection.js"
import Recipe from "../models/recipeMessage.js";
import * as recipe from "../models/recipeMessage.js"

function arrayFromString(str) {
    return str?.split(',').filter(Number).map(Number) || []
}

export const getRecipes = (req, res) => {
    let queries = req.query;

    let types = arrayFromString(queries.types)
    let products = arrayFromString(queries.products)
    let sql_query_string = getFilter(products, types)

    let str = connection.query(sql_query_string,
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


export const createRecipe = async (req, res) => {
    const recipe = req.body;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newRecipe = new Recipe(recipe.name, recipe.description, recipe.cooking_order, recipe.recipe_type_id, recipe.creatorID);
    connection.query('INSERT INTO `Recipe` SET ?', newRecipe,
        function (error, results, fields) {
            if (error) {
                console.log(error)
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
    const updateRecipe = new Recipe(recipe.name, recipe.description, recipe.cooking_order, recipe.recipe_type_id, recipe.creatorID);

    connection.query('UPDATE `Recipe` SET ? WHERE recipe_id = ?', [updateRecipe, _id],
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
            }
            else {
                res.status(200).json({ message: "ok" })
            }
        })
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

export const fetchOneRecipe = (req, res) => {
    const { id: _id } = req.params;
    connection.query(
        'SELECT recipe_id as id, r.name AS name, description, cooking_order, rt.name AS recipe_type, rt.recipe_type_id FROM recipe AS r ' +
        'LEFT JOIN `Recipe_Type` AS rt ON r.recipe_type_id = rt.recipe_type_id WHERE Recipe_ID = ?', _id,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.status(400).json({ message: error.message })
                return
            }
            if (!results.length) {
                res.status(404).json({ message: "Specific recipe not found" })
                return
            }
            res.status(200).json(results[0])
        })
}